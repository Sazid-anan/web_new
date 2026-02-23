# Analytics Setup Guide

This document explains how to configure and use analytics in the Danvion application.

## Overview

The analytics service supports:

- Google Analytics 4 (GA4)
- Sentry (Error Tracking)
- Custom Analytics Backend

## Installation

### Required Dependencies

```bash
npm install @sentry/react
npm install web-vitals  # optional for web performance tracking
```

## Configuration

### 1. Environment Variables

Add the following to your `.env.local`:

```env
# Google Analytics 4
VITE_GA4_MEASUREMENT_ID=G_YOUR_MEASUREMENT_ID

# Sentry Error Tracking
VITE_SENTRY_DSN=https://key@sentry.io/project-id
```

### 2. Initialize Analytics

In `src/main.jsx`, add:

```javascript
import { initializeAnalytics } from "./services/analytics";

// Initialize analytics before mounting React
await initializeAnalytics({
  enableGA4: true,
  enableSentry: true,
  ga4MeasurementId: import.meta.env.VITE_GA4_MEASUREMENT_ID,
  sentryDsn: import.meta.env.VITE_SENTRY_DSN,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

## Usage

### Automatic Page Tracking

```javascript
import { usePageTracking } from "@/hooks/useAnalytics";

export default function Home() {
  // Automatically tracks page view when component mounts
  usePageTracking("Home");

  return <div>Home Page</div>;
}
```

### Manual Event Tracking

```javascript
import { useEventTracking } from "@/hooks/useAnalytics";

export default function ProductCard() {
  const { trackEvent, trackUserAction } = useEventTracking();

  const handleViewProduct = () => {
    // Track product view
    trackEvent("product_view", "engagement", {
      product_id: "12345",
      product_name: "AI Solution",
    });
  };

  return <button onClick={handleViewProduct}>View Product</button>;
}
```

### Form Submission Tracking

```javascript
import { useEventTracking } from "@/hooks/useAnalytics";

export default function ContactForm() {
  const { trackFormSubmission } = useEventTracking();

  const handleSubmit = async (data) => {
    try {
      // Submit form
      await submitForm(data);

      // Track successful submission
      trackFormSubmission("contact_form", true);
    } catch (error) {
      trackFormSubmission("contact_form", false);
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Error Tracking

```javascript
import { useEventTracking } from "@/hooks/useAnalytics";

export default function DataComponent() {
  const { trackError } = useEventTracking();

  const fetchData = async () => {
    try {
      // Fetch data
    } catch (error) {
      trackError(error, {
        component: "DataComponent",
        action: "fetchData",
      });
    }
  };

  return <div>...</div>;
}
```

## Google Analytics 4 Setup

### Step 1: Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new GA4 property
3. Copy your Measurement ID (format: G_XXXXXXXXXX)

### Step 2: Enable Event Tracking

In Google Analytics:

1. Go to Admin > Events > Create Event
2. Set up custom event tracking (optional)

### Step 3: View Reports

- Real-time: Admin > Real-time
- Events: Reports > Engagement > Events
- Users: Reports > User

## Sentry Error Tracking Setup

### Step 1: Create Sentry Account

1. Sign up at [sentry.io](https://sentry.io)
2. Create a new project (React)
3. Copy your DSN

### Step 2: Configure Sentry

The DSN is configured automatically in the analytics service when initialized.

### Step 3: Test Sentry

```javascript
import * as Sentry from "@sentry/react";

// Test error capture
try {
  throw new Error("Test error");
} catch (error) {
  Sentry.captureException(error);
}
```

### Step 4: View Issues

- Go to Sentry Dashboard > Issues
- View error details, stack traces, and user context

## Custom Analytics Backend

To send events to your own backend:

1. Update `sendToCustomBackend()` in `src/services/analytics.ts`
2. Implement API endpoint for analytics:

```javascript
// Example backend implementation
app.post("/api/analytics", (req, res) => {
  const event = req.body;
  // Store event in database
  db.analytics.insert(event);
  res.json({ success: true });
});
```

## Best Practices

### 1. Use Meaningful Event Names

```javascript
// ✅ Good
trackEvent("subscription_started", "conversion");

// ❌ Bad
trackEvent("click", "general");
```

### 2. Include Context

```javascript
// ✅ Good
trackEvent("product_purchased", "conversion", {
  product_id: "123",
  price: 99.99,
  currency: "USD",
});
```

### 3. Track User Journeys

```javascript
const { trackUserAction } = useEventTracking();

// Track funnel
trackUserAction("checkout_step_1", "checkout");
trackUserAction("checkout_step_2", "checkout");
trackUserAction("checkout_complete", "checkout");
```

### 4. Error Context

```javascript
const { trackError } = useEventTracking();

try {
  // Operation
} catch (error) {
  trackError(error, {
    component: "PaymentForm",
    action: "processPayment",
    userId: currentUser.id,
  });
}
```

## Development vs Production

Analytics is disabled in development for easier testing. To enable in development:

```javascript
initializeAnalytics({
  enableGA4: true,
  enableSentry: true,
  environment: "development", // Shows in Sentry
});
```

## Debugging

View collected events in development:

```javascript
import { getAnalyticsService } from "@/services/analytics";

const analytics = getAnalyticsService();
console.log(analytics.getEvents()); // View all tracked events
```

## Common Issues

### GA4 Events Not Showing

- Check Measurement ID in .env
- Wait 24-48 hours for initial data
- Verify script is loaded: Check Network tab for gtag script

### Sentry Not Capturing Errors

- Check DSN is valid
- Verify Sentry is initialized before App
- Check Browser DevTools for errors

## Additional Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics)
- [Sentry Documentation](https://docs.sentry.io)
- [Web Vitals Guide](https://web.dev/vitals)

## Support

For issues or questions about analytics setup, contact: support@danvion.com
