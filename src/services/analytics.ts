/**
 * Analytics Service
 * Centralized analytics tracking for the application
 *
 * Supported Services:
 * - Google Analytics 4 (GA4)
 * - Sentry (Error Tracking)
 * - Custom Analytics
 *
 * Setup Instructions:
 * 1. Install packages: npm install @sentry/react
 * 2. Add VITE_SENTRY_DSN to .env
 * 3. Initialize in main.jsx before App component
 */

interface AnalyticsEvent {
  name: string;
  category: string;
  label?: string;
  value?: number;
  timestamp: Date;
  userId?: string;
  sessionId?: string;
  properties?: Record<string, any>;
}

interface AnalyticsConfig {
  enableGA4?: boolean;
  enableSentry?: boolean;
  enableCustomAnalytics?: boolean;
  ga4MeasurementId?: string;
  sentryDsn?: string;
  environment?: "development" | "production" | "staging";
}

/**
 * Analytics Service Singleton
 */
class AnalyticsService {
  private config: AnalyticsConfig;
  private sessionId: string;
  private userId: string | null = null;
  private events: AnalyticsEvent[] = [];

  constructor(config: AnalyticsConfig = {}) {
    this.config = {
      enableGA4: true,
      enableSentry: true,
      enableCustomAnalytics: true,
      environment:
        typeof import.meta !== "undefined" && import.meta.env?.PROD ? "production" : "development",
      ...config,
    };
    this.sessionId = this.generateSessionId();
  }

  /**
   * Initialize Analytics Services
   */
  public async initialize(): Promise<void> {
    try {
      // Initialize Sentry for error tracking
      if (this.config.enableSentry && typeof import.meta !== "undefined" && import.meta.env?.PROD) {
        await this.initializeSentry();
      }

      // Initialize Google Analytics
      if (this.config.enableGA4) {
        this.initializeGA4();
      }

      console.log("[Analytics] Initialized successfully");
    } catch (error) {
      console.error("[Analytics] Initialization failed:", error);
    }
  }

  /**
   * Initialize Sentry for Error Tracking
   * Uncomment and configure when ready
   */
  private async initializeSentry(): Promise<void> {
    // Install: npm install @sentry/react
    // Example implementation:
    /*
    import * as Sentry from "@sentry/react";
    
    const dsn = import.meta.env.VITE_SENTRY_DSN;
    if (!dsn) {
      console.warn("[Sentry] DSN not configured");
      return;
    }

    Sentry.init({
      dsn,
      environment: this.config.environment,
      tracesSampleRate: 1.0,
      integrations: [
        new Sentry.Replay({
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
    */
  }

  /**
   * Initialize Google Analytics 4
   * Automatically detects measurement ID from window or env
   */
  private initializeGA4(): void {
    try {
      const ga4MeasurementId =
        (window as any).__VITE_GA_MEASUREMENT_ID__ ||
        this.config.ga4MeasurementId ||
        import.meta.env.VITE_GA_MEASUREMENT_ID;

      if (!ga4MeasurementId) {
        console.warn("[GA4] Measurement ID not configured");
        return;
      }

      // Configure gtag with the measurement ID
      if ((window as any).gtag) {
        (window as any).gtag("config", ga4MeasurementId, {
          page_path: window.location.pathname,
          page_title: document.title,
        });
        console.log(`[GA4] Initialized with measurement ID: ${ga4MeasurementId}`);
      } else {
        console.warn("[GA4] gtag not available - ensure gtag script is loaded in HTML");
      }
    } catch (error) {
      console.error("[GA4] Initialization error:", error);
    }
  }

  /**
   * Track Page View
   */
  public trackPageView(path: string, title?: string): void {
    const event: AnalyticsEvent = {
      name: "page_view",
      category: "engagement",
      label: path,
      timestamp: new Date(),
      userId: this.userId || undefined,
      sessionId: this.sessionId,
      properties: {
        page_title: title || document.title,
        page_path: path,
      },
    };

    this.recordEvent(event);
  }

  /**
   * Track Custom Event
   */
  public trackEvent(eventName: string, category: string, properties?: Record<string, any>): void {
    const event: AnalyticsEvent = {
      name: eventName,
      category,
      timestamp: new Date(),
      userId: this.userId || undefined,
      sessionId: this.sessionId,
      properties,
    };

    this.recordEvent(event);
  }

  /**
   * Track Error
   */
  public trackError(error: Error | string, errorInfo?: Record<string, any>): void {
    const errorMessage = typeof error === "string" ? error : error.message;

    const event: AnalyticsEvent = {
      name: "error",
      category: "error",
      label: errorMessage,
      timestamp: new Date(),
      userId: this.userId || undefined,
      sessionId: this.sessionId,
      properties: {
        error_message: errorMessage,
        error_stack: error instanceof Error ? error.stack : undefined,
        ...errorInfo,
      },
    };

    this.recordEvent(event);
  }

  /**
   * Track Form Submission
   */
  public trackFormSubmission(formName: string, success: boolean): void {
    this.trackEvent("form_submit", "conversion", {
      form_name: formName,
      success,
    });
  }

  /**
   * Track User Action
   */
  public trackUserAction(action: string, label?: string, value?: number): void {
    this.trackEvent(action, "user_action", {
      label,
      value,
    });
  }

  /**
   * Set User ID
   */
  public setUserId(userId: string): void {
    this.userId = userId;
  }

  /**
   * Get Session ID
   */
  public getSessionId(): string {
    return this.sessionId;
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Record event internally
   */
  private recordEvent(event: AnalyticsEvent): void {
    this.events.push(event);

    if (typeof import.meta !== "undefined" && import.meta.env?.DEV) {
      console.log("[Analytics Event]", event);
    }

    // Send to services
    this.sendToGA4(event);
    this.sendToCustomBackend(event);
  }

  /**
   * Send event to Google Analytics
   */
  private sendToGA4(event: AnalyticsEvent): void {
    try {
      if (!(window as any).gtag) {
        return; // gtag not available
      }

      // Special handling for page_view events
      if (event.name === "page_view") {
        (window as any).gtag("event", "page_view", {
          page_path: event.properties?.page_path,
          page_title: event.properties?.page_title,
          page_location: window.location.href,
        });
      } else if (event.name === "error") {
        // Track errors as GA4 exception events
        (window as any).gtag("event", "exception", {
          description: event.label,
          fatal: false,
          ...event.properties,
        });
      } else {
        // Generic event tracking
        (window as any).gtag("event", event.name, {
          event_category: event.category,
          event_label: event.label,
          value: event.value,
          ...event.properties,
        });
      }
    } catch (error) {
      console.error("[GA4] Event send failed:", error);
    }
  }

  /**
   * Send event to custom backend
   */
  private sendToCustomBackend(_event: AnalyticsEvent): void {
    // Optional: Send events to your own analytics backend
    // Example:
    /*
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(_event),
    }).catch(err => console.warn("[Analytics] Send failed:", err));
    */
  }

  /**
   * Get collected events (useful for debugging)
   */
  public getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  /**
   * Clear events
   */
  public clearEvents(): void {
    this.events = [];
  }
}

// Singleton instance
let analyticsInstance: AnalyticsService | null = null;

/**
 * Get or create Analytics instance
 */
export const getAnalyticsService = (config?: AnalyticsConfig): AnalyticsService => {
  if (!analyticsInstance) {
    analyticsInstance = new AnalyticsService(config);
  }
  return analyticsInstance;
};

/**
 * Initialize Analytics (call this in main.jsx)
 */
export const initializeAnalytics = async (config?: AnalyticsConfig): Promise<AnalyticsService> => {
  const analytics = getAnalyticsService(config);
  await analytics.initialize();
  return analytics;
};

export default getAnalyticsService;
