# 🚀 DEPLOYMENT GUIDE

## Pre-Deployment Checklist

### Code Quality

- [ ] All tests passing: `npm test`
- [ ] Linting passes: `npm run lint`
- [ ] No console errors/warnings
- [ ] No hardcoded credentials
- [ ] Error boundary installed
- [ ] Toast system initialized

### Performance

- [ ] Lighthouse score ≥ 90
- [ ] Core Web Vitals passing
- [ ] Bundle size < 300KB (gzipped)
- [ ] Images optimized
- [ ] CSS tree-shaken (Tailwind unused removed)

### Security

- [ ] .env variables configured
- [ ] Firebase rules reviewed
- [ ] CORS headers set
- [ ] Rate limiting configured
- [ ] Input sanitization enabled

### SEO

- [ ] SEO component on all pages
- [ ] Meta tags configured
- [ ] Sitemap generated
- [ ] robots.txt configured
- [ ] Open Graph tags added
- [ ] Schema markup verified

### Analytics

- [ ] Google Analytics configured
- [ ] Search Console setup
- [ ] Error tracking (Sentry/LogRocket)
- [ ] Performance monitoring enabled
- [ ] Conversion tracking configured

---

## 🔧 Build Optimization

### 1. **Build Size Analysis**

```bash
npm run build

# Check bundle size
ls -lh dist/assets/*.js

# Expected:
# - vendor-react.js: ~50KB
# - vendor-redux.js: ~30KB
# - vendor-firebase.js: ~40KB
# - main.js: ~80KB
```

### 2. **Build Performance**

```bash
# Check build time
time npm run build

# Expected: < 30 seconds
```

### 3. **Code Splitting Verification**

Check `vite.config.js` manualChunks are working:

```bash
# Should see multiple chunk files with hashes
dist/assets/vendor-react-[hash].js
dist/assets/vendor-redux-[hash].js
dist/assets/main-[hash].js
```

---

## 📦 Firebase Deployment

### 1. **Initialize Firebase**

```bash
# If not done already
firebase login
firebase init

# Select:
# - Hosting
# - Firestore
# - Storage
```

### 2. **Configure Firebase Hosting**

Edit `firebase.json`:

```json
{
  "hosting": {
    "public": "dist",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "/index.html",
        "headers": [{ "key": "Cache-Control", "value": "no-cache, no-store, must-revalidate" }]
      }
    ]
  }
}
```

### 3. **Deploy Steps**

```bash
# 1. Build the app
npm run build

# 2. Preview build locally
npm run preview

# 3. Deploy to Firebase
firebase deploy

# 4. View live URL
firebase open hosting
```

### 4. **Update Firestore Rules**

Review and update `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Admin verification
    function isAdmin() {
      return request.auth != null &&
             request.auth.token.admin == true;
    }

    // Contact messages - anyone can create, admins can read
    match /contact_messages/{docId} {
      allow create: if true;
      allow read, update, delete: if isAdmin();
    }

    // Public collections - anyone read, admins write
    match /{document=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

Deploy rules:

```bash
firebase deploy --only firestore:rules
```

### 5. **Set Up Firebase Storage Rules**

Edit `storage.rules`:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Public read access
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null &&
                      request.auth.token.admin == true;
    }
  }
}
```

Deploy:

```bash
firebase deploy --only storage
```

---

## 🌐 Vercel Deployment (Alternative)

### 1. **Connect Repository**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 2. **Configure `vercel.json`**

Already configured, ensure it has:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "outputDirectory": "dist"
}
```

### 3. **Set Environment Variables**

In Vercel Dashboard → Settings → Environment Variables:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
# ... all other vars
```

---

## 🔐 Production Environment Setup

### 1. **Environment Variables**

Create `.env.production` (or configure in platform):

```env
# Firebase
VITE_FIREBASE_API_KEY=prod_key_here
VITE_FIREBASE_AUTH_DOMAIN=danvion-ltd.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=danvion-ltd
VITE_FIREBASE_STORAGE_BUCKET=danvion-ltd.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=774328377216
VITE_FIREBASE_APP_ID=1:774328377216:web:...
VITE_FIREBASE_MEASUREMENT_ID=G-...

# Admin emails
VITE_ADMIN_EMAILS=admin@danvion.com,sazid@danvion.com

# Features
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_TRACKING=true
```

### 2. **Firebase Custom Claims** (for Admin role)

Create a Cloud Function to set admin claims:

```javascript
// firebase/functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.setAdminClaim = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Must be logged in");
  }

  const uid = data.uid;
  await admin.auth().setCustomUserClaims(uid, { admin: true });

  return { message: "Admin claim set" };
});
```

Deploy:

```bash
firebase deploy --only functions
```

---

## 📊 Testing Before Deploy

### 1. **Local Testing**

```bash
# Build and preview
npm run build
npm run preview

# Test at http://localhost:4173
# - Check all pages load
# - Check responsive design
# - Check forms work
# - Check navigation works
# - Check admin panel (if accessible)
```

### 2. **Lighthouse Audit**

```bash
# In Chrome DevTools:
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Run audit
4. Score should be > 90
5. Check mobile & desktop
```

### 3. **Performance Testing**

```bash
# Install web-vitals
npm install web-vitals

# In browser console, check:
# - LCP (Largest Contentful Paint) < 2.5s
# - FID (First Input Delay) < 100ms
# - CLS (Cumulative Layout Shift) < 0.1
```

---

## 🔍 Post-Deployment Validation

### 1. **Smoke Tests** (30 min after deploy)

- [ ] Visit homepage - loads without errors
- [ ] Click navigation - all routes work
- [ ] View products page - data loads
- [ ] View blogs - data loads
- [ ] Submit contact form - data saved
- [ ] Check admin login page - accessible
- [ ] Check images load - no 404s
- [ ] Check console - no errors

### 2. **SEO Validation**

```bash
# Check in Google Search Console:
- Sitemap submitted
- robots.txt accessible
- No crawl errors
- Submit URLs for indexing
```

### 3. **Analytics Verification**

```bash
# In Google Analytics:
1. Visit site
2. Check Real Time > Overview
3. Should show 1 active user
4. Check Events are firing
```

### 4. **Performance Validation**

```bash
# Tools:
- https://pagespeed.web.dev/
- https://www.webpagetest.org/
- Chrome DevTools Lighthouse

# Targets:
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- Lighthouse > 90
```

---

## 🚨 Rollback Procedure

### If deploy has issues:

#### Firebase Hosting

```bash
# View deployment history
firebase hosting:channel:list

# Rollback to previous version
firebase deploy --only hosting --release-tag PREVIOUS_BUILD

# Or manually
firebase hosting:clone nanvion-prod nanvion-prod --include=hosting
```

#### Vercel

```bash
# In Vercel Dashboard:
1. Go to Deployments
2. Find previous working deployment
3. Click "Promote to Production"
```

---

## 📞 Monitoring & Support

### 1. **Continuous Monitoring**

- GitHub Actions for automated tests
- Firebase monitoring dashboard
- Sentry error tracking
- Google Analytics real-time

### 2. **Alerts Setup**

Configure alerts for:

- High error rate (> 1% errors)
- Slow response times (> 5s)
- Firebase quota limits
- Failed deployments

### 3. **Support Channels**

- Email: support@danvion.com
- WhatsApp: +44...
- Slack channel: #production-issues

---

## 🔄 Continuous Deployment (CI/CD)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Install dependencies
        run: npm install

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy to Firebase
        uses: w9jds/firebase-action@master
        with:
          args: deploy
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

---

## 📋 Deployment Checklist Template

```md
# Deployment: [Date]

# Environment: [Production/Staging]

## Pre-Deploy

- [ ] Code reviewed & merged
- [ ] All tests passing
- [ ] Build succeeds without warnings
- [ ] Environment variables configured
- [ ] Firebase rules reviewed

## Deploy

- [ ] Built locally: `npm run build`
- [ ] Previewed build: `npm run preview`
- [ ] Deployment started: `firebase deploy`
- [ ] Deployment completed successfully

## Post-Deploy (30 min)

- [ ] Homepage loads
- [ ] Navigation works
- [ ] Forms functional
- [ ] No console errors
- [ ] Analytics working
- [ ] No high error rate

## QA Sign-off

- [ ] QA tested on mobile
- [ ] QA tested on desktop
- [ ] QA tested admin panel
- [ ] QA approved for release

## Notes

- Deployed by: \_\_\_
- Issues found: \_\_\_
- Rollback procedure: \_\_\_
```

---

## 🎯 Deployment Tips

1. **Deploy during low-traffic hours** - typically 2-4 AM UTC
2. **Always test builds locally first** - catches 90% of issues
3. **Monitor first 30 minutes** - catch issues early
4. **Have rollback ready** - keep previous version accessible
5. **Document what changed** - for troubleshooting later
6. **Team notification** - inform stakeholders of deployment

---

**Last Updated**: February 24, 2026
