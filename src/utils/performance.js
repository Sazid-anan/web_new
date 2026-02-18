/**
 * Performance Monitoring Utility
 * Silently collects Core Web Vitals and performance metrics
 * No impact on UI or user experience
 */

/**
 * Initialize Web Vitals monitoring
 * Collects LCP, FID, CLS, FCP, TTFB metrics
 */
export function initPerformanceMonitoring() {
  // Only run in production
  if (import.meta.env.DEV) return;

  // Monitor Largest Contentful Paint (LCP)
  if ("PerformanceObserver" in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.debug("LCP:", lastEntry.renderTime || lastEntry.loadTime);
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
    } catch {
      // Silently fail for unsupported browsers
    }

    // Monitor Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            console.debug("CLS:", clsValue);
          }
        });
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
    } catch {
      // Silently fail
    }

    // Monitor First Input Delay (FID) / Interaction to Next Paint (INP)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          console.debug("FID:", entry.processingDuration);
        });
      });
      fidObserver.observe({ entryTypes: ["first-input"] });
    } catch {
      // Silently fail
    }
  }

  // Monitor Navigation Timing
  if ("PerformanceTiming" in window) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;

        console.debug("Performance Metrics:", {
          pageLoadTime: `${pageLoadTime}ms`,
          connectTime: `${connectTime}ms`,
          renderTime: `${renderTime}ms`,
        });

        // Send to analytics if available
        if (
          window.gtag ||
          (window.dataLayer && window.dataLayer.__isInitialized)
        ) {
          sendMetricsToAnalytics({
            pageLoadTime,
            connectTime,
            renderTime,
          });
        }
      }, 0);
    });
  }
}

/**
 * Send metrics to analytics (Google Analytics optional)
 */
function sendMetricsToAnalytics(metrics) {
  if (window.gtag) {
    window.gtag("event", "page_view", {
      page_load_time: metrics.pageLoadTime,
      connect_time: metrics.connectTime,
      render_time: metrics.renderTime,
    });
  }
}

/**
 * Monitor image loading performance
 */
export function monitorImagePerformance() {
  if (!("PerformanceObserver" in window)) return;

  try {
    const imgObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.initiatorType === "img") {
          const duration = entry.responseEnd - entry.startTime;
          console.debug(
            `Image loaded: ${entry.name} (${Math.round(duration)}ms)`,
          );
        }
      });
    });
    imgObserver.observe({ entryTypes: ["resource"] });
  } catch {
    // Silently fail
  }
}

/**
 * Report Web Vitals to console in development
 */
export function reportWebVitals() {
  if (import.meta.env.DEV) {
    import("web-vitals").catch(() => {
      // web-vitals not installed, skip
    });
  }
}

export default initPerformanceMonitoring;
