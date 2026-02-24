/**
 * Performance Monitoring Utility - Enhanced Core Web Vitals
 * Silently collects Core Web Vitals and performance metrics
 * Tracks LCP, FID, CLS, TTFB, and resource optimization
 */

// Performance metrics cache
export const performanceMetrics = {
  lcp: null,
  fid: null,
  cls: null,
  fcp: null,
  ttfb: null,
  inp: null,
  resourceMetrics: [],
};

/**
 * Initialize Web Vitals monitoring - Enhanced
 * Collects LCP, FID, CLS, FCP, TTFB + INP (new metric)
 */
export function initPerformanceMonitoring(onMetrics = null) {
  // Monitor Largest Contentful Paint (LCP)
  if ("PerformanceObserver" in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        const lcpTime = lastEntry.renderTime || lastEntry.loadTime;
        performanceMetrics.lcp = {
          value: lcpTime,
          rating: lcpTime > 2500 ? "poor" : lcpTime > 1200 ? "needs-improvement" : "good",
          element: lastEntry.element?.tagName,
          url: lastEntry.url,
        };
        console.debug("LCP:", lcpTime, "ms", performanceMetrics.lcp.rating);
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
    } catch (e) {
      console.debug("LCP monitoring unavailable");
    }

    // Monitor Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        performanceMetrics.cls = {
          value: clsValue,
          rating: clsValue > 0.1 ? "poor" : clsValue > 0.025 ? "needs-improvement" : "good",
          entries: list.getEntries(),
        };
        console.debug("CLS:", clsValue.toFixed(3), performanceMetrics.cls.rating);
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
    } catch (e) {
      console.debug("CLS monitoring unavailable");
    }

    // Monitor First Input Delay (FID) / Interaction to Next Paint (INP)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          performanceMetrics.fid = {
            value: entry.processingDuration,
            rating:
              entry.processingDuration > 100
                ? "poor"
                : entry.processingDuration > 50
                  ? "needs-improvement"
                  : "good",
            eventType: entry.name,
          };
          console.debug("FID:", entry.processingDuration, "ms", performanceMetrics.fid.rating);
        });
      });
      fidObserver.observe({ entryTypes: ["first-input"] });
    } catch (e) {
      console.debug("FID monitoring unavailable");
    }

    // Monitor Interaction to Next Paint (INP) - New metric
    try {
      const inpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const worstEntry = entries.reduce((worst, entry) =>
          entry.duration > (worst?.duration || 0) ? entry : worst,
        );
        performanceMetrics.inp = {
          value: worstEntry.duration,
          rating:
            worstEntry.duration > 500
              ? "poor"
              : worstEntry.duration > 200
                ? "needs-improvement"
                : "good",
          eventType: worstEntry.name,
        };
        console.debug("INP:", worstEntry.duration, "ms", performanceMetrics.inp.rating);
      });
      inpObserver.observe({ entryTypes: ["event"] });
    } catch (e) {
      console.debug("INP monitoring not supported");
    }

    // Monitor First Contentful Paint (FCP)
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entry = list.getEntries().find((e) => e.name === "first-contentful-paint");
        if (entry) {
          performanceMetrics.fcp = {
            value: entry.startTime,
            rating:
              entry.startTime > 1800
                ? "poor"
                : entry.startTime > 1000
                  ? "needs-improvement"
                  : "good",
          };
          console.debug("FCP:", entry.startTime, "ms", performanceMetrics.fcp.rating);
        }
      });
      fcpObserver.observe({ entryTypes: ["paint"] });
    } catch (e) {
      console.debug("FCP monitoring unavailable");
    }
  }

  // Time to First Byte (TTFB)
  try {
    const navigationTiming = performance.getEntriesByType("navigation")[0];
    if (navigationTiming) {
      const ttfb = navigationTiming.responseStart - navigationTiming.requestStart;
      performanceMetrics.ttfb = {
        value: ttfb,
        rating: ttfb > 600 ? "poor" : ttfb > 300 ? "needs-improvement" : "good",
      };
      console.debug("TTFB:", ttfb, "ms", performanceMetrics.ttfb.rating);
    }
  } catch (e) {
    console.debug("TTFB measurement unavailable");
  }

  // Resource optimization metrics
  try {
    const resources = performance.getEntriesByType("resource");
    const totalSize = resources.reduce((sum, r) => sum + r.transferSize, 0);
    const cachedResources = resources.filter(
      (r) => r.transferSize === 0 && r.decodedBodySize > 0,
    ).length;

    performanceMetrics.resourceMetrics = {
      totalResources: resources.length,
      totalSize: (totalSize / 1048576).toFixed(2), // MB
      cachedResources,
      cacheHitRate: ((cachedResources / resources.length) * 100).toFixed(2),
      slowResources: resources
        .filter((r) => r.duration > 1000)
        .sort((a, b) => b.duration - a.duration)
        .slice(0, 5)
        .map((r) => ({ name: r.name.split("/").pop(), duration: r.duration })),
    };
    console.debug("Resources:", performanceMetrics.resourceMetrics);
  } catch (e) {
    console.debug("Resource metrics unavailable");
  }

  if (onMetrics) {
    onMetrics(performanceMetrics);
  }

  return performanceMetrics;
}

/**
 * Generate performance report
 */
export function getPerformanceReport() {
  const navigationTiming = performance.getEntriesByType("navigation")[0];
  const resources = performance.getEntriesByType("resource");

  if (!navigationTiming) return null;

  return {
    timing: {
      dns: navigationTiming.domainLookupEnd - navigationTiming.domainLookupStart,
      tcp: navigationTiming.connectEnd - navigationTiming.connectStart,
      ttfb: navigationTiming.responseStart - navigationTiming.requestStart,
      download: navigationTiming.responseEnd - navigationTiming.responseStart,
      domInteractive: navigationTiming.domInteractive - navigationTiming.fetchStart,
      domComplete: navigationTiming.domComplete - navigationTiming.fetchStart,
      pageLoadTime: navigationTiming.loadEventEnd - navigationTiming.fetchStart,
    },
    vitals: performanceMetrics,
  };
}

/**
 * Performance helper functions
 */
export const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export const throttle = (fn, duration) => {
  let lastRun = Date.now();
  return (...args) => {
    const timeNow = Date.now();
    if (timeNow - lastRun > duration) {
      fn(...args);
      lastRun = timeNow;
    }
  };
};

/**
 * Request idle callback with fallback
 */
export const idleCallback = (callback) => {
  if ("requestIdleCallback" in window) {
    return requestIdleCallback(callback);
  }
  return setTimeout(callback, 0);
};

/**
 * Preload critical resources
 */
export const preloadResource = (href, as = "script") => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = as;
  link.href = href;
  if (as === "font") {
    link.crossOrigin = "anonymous";
  }
  document.head.appendChild(link);
};

/**
 * Prefetch resources for faster navigation
 */
export const prefetchResource = (href) => {
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = href;
  document.head.appendChild(link);
};

/**
 * Monitor long tasks (>50ms)
 */
export const monitorLongTasks = (callback) => {
  if ("PerformanceObserver" in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.warn("Long task detected:", {
            duration: entry.duration,
            startTime: entry.startTime,
          });
          if (callback) callback(entry);
        }
      });
      observer.observe({ entryTypes: ["longtask"] });
    } catch (e) {
      console.debug("Long task monitoring not supported");
    }
  }
};

/**
 * Create custom performance mark
 */
export const markPerformance = (name) => {
  if ("performance" in window) {
    performance.mark(name);
  }
};

/**
 * Measure time between marks
 */
export const measurePerformance = (name, startMark, endMark) => {
  if ("performance" in window) {
    try {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name)?.[0];
      return measure?.duration;
    } catch (e) {
      console.debug("Performance measure failed");
    }
  }
  return null;
};

export default initPerformanceMonitoring;
