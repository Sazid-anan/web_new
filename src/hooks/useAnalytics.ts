import { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { getAnalyticsService } from "../services/analytics";

/**
 * usePageTracking Hook
 * Automatically tracks page views when route changes
 *
 * Usage:
 * export default function Home() {
 *   usePageTracking("Home");
 *   return <div>...</div>;
 * }
 */
export const usePageTracking = (pageName: string): void => {
  const location = useLocation();

  useEffect(() => {
    const analytics = getAnalyticsService();
    analytics.trackPageView(location.pathname, pageName);
  }, [location.pathname, pageName]);
};

/**
 * useEventTracking Hook
 * Provides tracking methods for component events
 *
 * Usage:
 * const { trackEvent, trackError } = useEventTracking();
 */
export const useEventTracking = () => {
  const analytics = getAnalyticsService();

  const trackEvent = useCallback(
    (eventName: string, category: string, properties?: Record<string, any>) => {
      analytics.trackEvent(eventName, category, properties);
    },
    [analytics],
  );

  const trackError = useCallback(
    (error: Error | string, errorInfo?: Record<string, any>) => {
      analytics.trackError(error, errorInfo);
    },
    [analytics],
  );

  const trackUserAction = useCallback(
    (action: string, label?: string, value?: number) => {
      analytics.trackUserAction(action, label, value);
    },
    [analytics],
  );

  const trackFormSubmission = useCallback(
    (formName: string, success: boolean) => {
      analytics.trackFormSubmission(formName, success);
    },
    [analytics],
  );

  return {
    trackEvent,
    trackError,
    trackUserAction,
    trackFormSubmission,
  };
};

export default {
  usePageTracking,
  useEventTracking,
};
