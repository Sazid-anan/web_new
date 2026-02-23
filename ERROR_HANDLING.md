# Error Handling Guide

Comprehensive guide to error handling in the Danvion application.

## Overview

The application includes:

- 🛡️ **Error Boundary** - Catches React component errors
- 🔧 **Error Utilities** - Centralized error handling
- 🪝 **Error Hooks** - Component-level error management
- 📋 **Firebase Error Mapping** - Human-friendly Firebase errors

## Error Boundary

Wraps the entire application to catch component errors.

### Usage

The Error Boundary is already installed in the app. It catches errors and displays a user-friendly page.

### Error Boundary Component

Located in `src/components/common/ErrorBoundary.jsx`

Features:

- ✅ Catches uncaught React errors
- ✅ Displays user-friendly error page
- ✅ Shows detailed error info in development
- ✅ Provides recovery options
- ✅ Tracks error frequency

### Example

When a component throws an error:

```jsx
function BuggyComponent() {
  throw new Error("Something went wrong!");
}

// Error Boundary catches this and displays recovery UI
```

## Error Handling Hook

Use `useErrorHandler` for managing component-level errors.

### Basic Usage

```javascript
import { useErrorHandler } from "@/hooks/useErrorHandler";

function MyComponent() {
  const { error, errorMessage, handleError, clearError } = useErrorHandler();

  const fetchData = async () => {
    try {
      const response = await fetch("/api/data");
      const data = await response.json();
    } catch (err) {
      handleError(err, { component: "MyComponent" });
    }
  };

  return (
    <div>
      {error ? (
        <div className="error-message">
          {errorMessage}
          <button onClick={clearError}>Dismiss</button>
        </div>
      ) : (
        <button onClick={fetchData}>Load Data</button>
      )}
    </div>
  );
}
```

## Error Utilities

Located in `src/utils/errorHandler.ts`

### Handle Error

Universal error handler that routes to appropriate handler:

```typescript
import { handleError } from "@/utils/errorHandler";

try {
  // Some operation
} catch (error) {
  const appError = handleError(error, {
    component: "ProductForm",
    action: "submitForm",
  });

  console.log(appError.message);
  console.log(appError.code);
}
```

### Error Types

```typescript
// Application Error
import { AppErrorHandler } from "@/utils/errorHandler";

throw new AppErrorHandler("Product not found", "PRODUCT_NOT_FOUND", "low");

// Firebase Error
import { handleFirebaseError } from "@/utils/errorHandler";
const appError = handleFirebaseError(firebaseError);

// Network Error
import { handleNetworkError } from "@/utils/errorHandler";
const appError = handleNetworkError(networkError);

// Validation Error
import { handleValidationError } from "@/utils/errorHandler";
const appError = handleValidationError(error, "email");
```

### Error Severity Levels

```typescript
"low"; // User input errors, validation failures
"medium"; // API errors, temporary issues
"high"; // Data loss, critical operations
"critical"; // App-breaking errors, security issues
```

## Firebase Error Handling

Firebase errors are automatically converted to user-friendly messages:

### Auth Errors

```typescript
// Before (Firebase error)
"auth/wrong-password";

// After (User-friendly)
"Incorrect password";
```

### Common Firebase Errors

| Firebase Error                | Friendly Message                           |
| ----------------------------- | ------------------------------------------ |
| `auth/user-not-found`         | User account not found                     |
| `auth/wrong-password`         | Incorrect password                         |
| `auth/email-already-in-use`   | Email already registered                   |
| `auth/invalid-email`          | Invalid email address                      |
| `auth/weak-password`          | Password is too weak                       |
| `firestore/permission-denied` | Permission denied. Please contact support. |
| `storage/unauthorized`        | Not authorized to access this file         |

## Retry Logic

Built-in retry with exponential backoff:

```typescript
import { retryAsync } from "@/utils/errorHandler";

const fetchData = async () => {
  try {
    const result = await retryAsync(
      () => fetch("/api/data").then((r) => r.json()),
      3, // max retries
      1000, // base delay (ms)
    );
    return result;
  } catch (error) {
    console.error("Failed after retries:", error);
  }
};
```

## Async Operation Wrapper

Safe wrapper for async operations:

```typescript
import { executeAsync } from "@/utils/errorHandler";

const { data, error, success } = await executeAsync(() => fetchProducts(), "Fetching products");

if (success) {
  console.log("Products:", data);
} else {
  console.error("Error:", error?.message);
}
```

## Form Validation Errors

Handle form validation with user-friendly messages:

```typescript
import { handleValidationError } from "@/utils/errorHandler";

const validateEmail = (email: string) => {
  if (!email.includes("@")) {
    const error = handleValidationError(new Error("Invalid email format"), "email");
    return error.message; // "Invalid email: Invalid email format"
  }
};
```

## Logging & Monitoring

### Development Logging

Errors are automatically logged in development:

```typescript
// Console output
[AppError] {
  code: "PRODUCT_NOT_FOUND",
  message: "Product not found",
  severity: "low",
  timestamp: "2026-02-20T10:30:00Z"
}
```

### Production Monitoring

For production error tracking:

1. **Setup Sentry** (configured in analytics service)
2. **Send to Backend** (implement custom backend)
3. **Error Reports** (email notifications)

```typescript
// Future: Send to error tracking service
if (appError.severity === "high" || appError.severity === "critical") {
  await reportError(appError); // Send to Sentry or backend
}
```

## Best Practices

### 1. Always Catch Async Errors

```typescript
// ❌ Bad - unhandled promise rejection
fetchData();

// ✅ Good
try {
  await fetchData();
} catch (error) {
  handleError(error);
}
```

### 2. Provide Context

```typescript
// ❌ Bad - no context
handleError(error);

// ✅ Good - with context
handleError(error, {
  component: "CheckoutForm",
  action: "processPayment",
  userId: currentUser.id,
});
```

### 3. User-Friendly Messages

```typescript
// ❌ Bad - technical
"TypeError: Cannot read property 'name' of undefined";

// ✅ Good - user-friendly
"Unable to load user information. Please try again.";
```

### 4. Log Appropriately

```typescript
// Development
console.error(error); // Full details

// Production
console.warn(error.message); // Minimal info
```

### 5. Graceful Fallbacks

```typescript
const fetchProducts = async () => {
  try {
    return await getProducts();
  } catch (error) {
    handleError(error);
    return []; // Return fallback data
  }
};
```

## Common Patterns

### API Error Handling

```typescript
async function fetchApi(url: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new AppErrorHandler(
        `API Error: ${response.statusText}`,
        `HTTP_${response.status}`,
        response.status === 500 ? "high" : "medium",
      );
    }

    return await response.json();
  } catch (error) {
    throw handleNetworkError(error);
  }
}
```

### Firebase Operation

```typescript
async function updateProduct(id: string, data: Product) {
  try {
    await setDoc(doc(db, "products", id), data);
  } catch (error) {
    throw handleFirebaseError(error);
  }
}
```

### Form Submission

```typescript
const handleSubmit = async (formData: FormData) => {
  try {
    setLoading(true);

    // Validate
    if (!formData.email.includes("@")) {
      throw handleValidationError(new Error("Invalid email"), "email");
    }

    // Submit
    await submitForm(formData);

    // Success
    setSuccess(true);
  } catch (error) {
    handleError(error, { component: "ContactForm" });
    setFormError(error.message);
  } finally {
    setLoading(false);
  }
};
```

## Testing Error Handling

```typescript
import { describe, it, expect } from "vitest";
import { handleError, AppErrorHandler } from "@/utils/errorHandler";

describe("Error Handling", () => {
  it("creates app error correctly", () => {
    const error = handleError(new Error("Test"), { component: "Test" });

    expect(error).toBeInstanceOf(AppErrorHandler);
    expect(error.context?.component).toBe("Test");
  });

  it("handles Firebase errors", () => {
    const fbError = { code: "auth/wrong-password" };
    const error = handleError(fbError);

    expect(error.message).toBe("Incorrect password");
    expect(error.severity).toBe("low");
  });

  it("retries failed operations", async () => {
    let attempts = 0;

    const { data, error } = await executeAsync(() => {
      attempts++;
      if (attempts < 3) throw new Error("Fail");
      return { success: true };
    });

    expect(attempts).toBe(3);
    expect(data?.success).toBe(true);
  });
});
```

## Error Recovery

### Automatic Recovery

```typescript
const [retryCount, setRetryCount] = useState(0);

const handleRetry = async () => {
  try {
    setRetryCount(0);
    await fetchData();
  } catch (error) {
    if (retryCount < 3) {
      setRetryCount((prev) => prev + 1);
      // Retry automatically
      setTimeout(handleRetry, 1000 * Math.pow(2, retryCount));
    }
  }
};
```

### Manual Recovery

```typescript
const { error, handleError, clearError } = useErrorHandler();

return (
  <div>
    {error && (
      <div className="error-alert">
        <p>{error.message}</p>
        <button onClick={clearError}>Dismiss</button>
        <button onClick={retryOperation}>Retry</button>
      </div>
    )}
  </div>
);
```

## Troubleshooting

### White Screen (No Error Message)

Errors might be suppressed. Check:

1. Browser console for errors
2. Network tab for failed requests
3. React DevTools for error boundaries

### Unhandled Promise Rejection

Add error handler to window:

```typescript
window.addEventListener("unhandledrejection", (event) => {
  handleError(event.reason);
});
```

### Silent Failures

Enable debug logging:

```typescript
// In development
if (import.meta.env.DEV) {
  console.log("Operation result:", result);
}
```

## Resources

- [Error Boundary Documentation](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Firebase Error Codes](https://firebase.google.com/docs/auth/admin/manage-sessions#detect_id_token_revocation)
- [Web API Error Events](https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent)

## Support

For error handling questions: support@danvion.com
