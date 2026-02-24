# Firebase Security Audit & Recommendations

## Current Status

### ✅ Strengths

- Public read access for content collections (appropriate for a public company site)
- Admin-only write access on all sensitive collections
- Contact messages are publicly writable but admin-only readable
- Firestore Rules v2 with proper syntax

### ⚠️ Issues & Recommendations

## Issue #1: Email-Based Admin Verification (SECURITY RISK)

**Severity:** HIGH

### Current Implementation

```javascript
function isAdmin() {
  return request.auth != null && request.auth.token.email == "sazid@danvion.com";
}
```

### Problem

- Email can be changed by users in Firebase Auth console
- Not a secure method for production admin verification
- Relies on client-side token which could be vulnerable

### Recommended Solution: Custom Claims with Firebase Auth

```javascript
function isAdmin() {
  return request.auth != null && request.auth.token.admin == true;
}
```

**Steps to implement:**

1. Use Firebase Admin SDK in a Cloud Function to set custom claims:

```javascript
// Cloud Function
admin
  .auth()
  .setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log("Custom claims set for user");
  });
```

2. Deploy the function and call it when granting admin access
3. Update firestore.rules to use the new claim
4. Test thoroughly before deploying to production

---

## Issue #2: Unrestricted Public Write to Contact Messages

**Severity:** MEDIUM

### Current Risk

- Anyone can create contact messages (including spam bots)
- No rate limiting in Firestore rules
- Potential for database spam/abuse

### Recommended Solutions

#### Option A: Add Rate Limiting in Rules

```javascript
match /contact_messages/{docId} {
  allow create: if
    request.auth != null ||
    (request.time > resource.data.createdAt + duration.value(1, 'h'));
  allow read, update, delete: if isAdmin();
}
```

#### Option B: Implement Server-Side Rate Limiting (Recommended)

- Create a Cloud Function to handle submissions
- Track IP addresses and email submissions
- Implement sliding window rate limit (e.g., 5 messages per hour per IP)
- Add CAPTCHA verification for public submissions

---

## Issue #3: No Data Validation in Rules

**Severity:** MEDIUM

### Current Risk

- Any data structure can be submitted to contact_messages
- No field validation
- Could lead to spam or malformed data

### Recommended Solution

```javascript
match /contact_messages/{docId} {
  allow create: if
    request.resource.data.keys().hasAll(['name', 'email', 'message', 'created_at']) &&
    request.resource.data.name is string &&
    request.resource.data.name.size() > 0 &&
    request.resource.data.name.size() <= 100 &&
    request.resource.data.email is string &&
    request.resource.data.email.matches('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}') &&
    request.resource.data.message is string &&
    request.resource.data.message.size() >= 10 &&
    request.resource.data.message.size() <= 5000 &&
    request.resource.data.created_at is timestamp;
  allow read, update, delete: if isAdmin();
}
```

---

## Issue #4: Missing Data Encryption

**Severity:** MEDIUM-HIGH

### Current Risk

- Contact messages with personal data (name, email, message) stored in plain text
- No field-level encryption
- GDPR/privacy compliance concerns

### Recommended Solutions

1. **Client-side Encryption (for sensitive fields)**
   - Encrypt email/message before submission
   - Store encrypted blobs in Firestore
   - Only decrypt on admin dashboard with proper access logs

2. **Firebase Field-level Encryption (recommended)**
   - Use Firebase Extension: Client-Side Encryption Extension
   - Encrypts specified fields with per-document keys
   - Automatic decryption for authorized users

---

## Issue #5: Insufficient Access Logging

**Severity:** MEDIUM

### Current Risk

- No audit trail of who accessed admin data
- No timestamps for sensitive operations
- Difficult to detect unauthorized access

### Recommended Solutions

1. Create an audit log collection

```javascript
match /audit_logs/{docId} {
  allow create: if request.auth != null;
  allow read: if isAdmin();
  allow delete: if request.auth.token.email == 'sazid@danvion.com'; // only owner
}
```

2. Use Cloud Functions to automatically log sensitive reads

```javascript
// Log when admins access contact messages
exports.logContactMessageAccess = functions.firestore
  .document("contact_messages/{docId}")
  .onRead((change, context) => {
    // Log access with timestamp, user ID, IP
  });
```

---

## Issue #6: No Rate Limiting on Public Read

**Severity:** LOW-MEDIUM

### Current Risk

- Unlimited public read access could enable DDoS-style attacks
- No query limits for data export

### Recommended Solution

```javascript
match /products/{docId} {
  allow read: if
    request.query.limit <= 100 && // limit query size
    request.time > resource.data.lastReadTime + duration.value(1, 's');
}
```

Or use Firebase Security Rules with request.auth for read throttling.

---

## GDPR Compliance Issues

### Issue #7: No Data Retention Policy

**Severity:** MEDIUM-HIGH

### Current Risk

- Contact messages stored indefinitely
- GDPR requires data minimization and retention limits

### Recommended Solution

1. Add auto-delete Cloud Function

```javascript
exports.deleteOldContactMessages = functions.pubsub
  .schedule("every day 03:00")
  .onRun(async (context) => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const snapshot = await admin
      .firestore()
      .collection("contact_messages")
      .where("created_at", "<", thirtyDaysAgo)
      .get();

    const batch = admin.firestore().batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));

    return batch.commit();
  });
```

2. Add data retention metadata to collections

```javascript
// Add to contact_messages documents
{
  ttl: serverTimestamp() + 30 days
}
```

---

## Issue #8: Missing Privacy Policy Integration

**Severity:** MEDIUM

### Current Risk

- No user consent tracking
- No privacy policy acceptance logs
- GDPR non-compliance

### Recommended Solution

1. Add consent collection

```javascript
match /user_consents/{docId} {
  allow create: if request.auth != null;
  allow read: if request.auth.uid == docId;
}
```

2. Track consent with contact submissions

```javascript
match /contact_messages/{docId} {
  allow create: if
    // ... existing rules ...
    request.resource.data.consent_timestamp is timestamp;
}
```

---

## Security Checklist - ACTION ITEMS

### Priority 1 (Critical - Implement Immediately)

- [ ] Migrate from email-based to custom claims for admin verification
- [ ] Implement server-side rate limiting for contact submissions
- [ ] Add input validation to firestore.rules
- [ ] Create audit logging system

### Priority 2 (High - Implement This Sprint)

- [ ] Add data retention policies and auto-delete functions
- [ ] Implement field-level encryption for sensitive data
- [ ] Add GDPR consent tracking
- [ ] Set up privacy policy confirmation

### Priority 3 (Medium - Implement Next Sprint)

- [ ] Add query rate limiting for public reads
- [ ] Implement access logging for admin operations
- [ ] Create security monitoring dashboard
- [ ] Document security procedures

---

## Testing Recommendations

### Unit Tests for Firestore Rules

```javascript
// Use firebase-rules-tests
describe("Firestore Security Rules", () => {
  it("should allow anyone to create contact messages", () => {
    assertSucceeds(
      db.collection("contact_messages").add({
        name: "Test User",
        email: "test@example.com",
        message: "Test message content here",
        created_at: now,
      }),
    );
  });

  it("should prevent non-admins from reading contact messages", () => {
    assertFails(db.collection("contact_messages").get());
  });

  it("should allow admins to read contact messages", () => {
    assertSucceeds(db.collection("contact_messages").get());
  });
});
```

---

## Deployment Steps

1. **Update firestore.rules** with new security rules
2. **Deploy Cloud Functions** for admin claim setup and logging
3. **Test thoroughly** in development environment
4. **Deploy to production** with monitoring
5. **Update documentation** for admin onboarding
6. **Schedule regular security audits** (quarterly)

---

## Additional Resources

- [Firebase Security Best Practices](https://firebase.google.com/docs/firestore/security/rules-structure)
- [Cloud Firestore Security Rules Cheat Sheet](https://googleapis.dev/nodejs/firestore/latest/)
- [GDPR Compliance Guide for Firebase](https://cloud.google.com/firestore/docs/safeguarding-user-data)
- [OWASP Security Guidelines](https://owasp.org/)
