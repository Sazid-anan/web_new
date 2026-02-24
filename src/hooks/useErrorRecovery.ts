import { useCallback, useState, useRef } from "react";
import { errorLogger } from "../services/errorLogger";
import { isRetryableError } from "../utils/errorTypes";

interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
  backoffMultiplier?: number;
  onRetry?: (attempt: number) => void;
  onError?: (error: any) => void;
}

/**
 * Hook for executing functions with automatic retry logic
 */
export const useRetry = (options: RetryOptions = {}) => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [error, setError] = useState<any>(null);
  const [attempts, setAttempts] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const { maxAttempts = 3, delayMs = 1000, backoffMultiplier = 2, onRetry, onError } = options;

  const execute = useCallback(
    async (fn: () => Promise<any>) => {
      setIsRetrying(true);
      setError(null);
      let lastError: any;
      let currentDelay = delayMs;

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          setAttempts(attempt);
          onRetry?.(attempt);

          const result = await fn();
          setIsRetrying(false);
          setAttempts(0);
          return result;
        } catch (err) {
          lastError = err;

          // Don't retry if not retryable
          if (!isRetryableError(err)) {
            errorLogger.captureException(err, {
              type: "non_retryable_error",
              attempt,
            });
            setError(err);
            setIsRetrying(false);
            onError?.(err);
            throw err;
          }

          // Last attempt - don't retry
          if (attempt === maxAttempts) {
            errorLogger.captureException(err, {
              type: "max_retries_exceeded",
              attempts: maxAttempts,
            });
            setError(err);
            setIsRetrying(false);
            onError?.(err);
            throw err;
          }

          // Wait before retrying
          await new Promise((resolve) => setTimeout(resolve, currentDelay));
          currentDelay *= backoffMultiplier;
        }
      }

      throw lastError;
    },
    [maxAttempts, delayMs, backoffMultiplier, onRetry, onError],
  );

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsRetrying(false);
  }, []);

  return { execute, isRetrying, error, attempts, cancel };
};

/**
 * Hook for async operations with error handling
 */
export const useAsync = <T>(
  asyncFn: () => Promise<T>,
  onError?: (error: any) => void,
  dependencies: any[] = [],
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await asyncFn();
      setData(result);
      return result;
    } catch (err) {
      errorLogger.captureException(err, { type: "async_operation" });
      setError(err);
      onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, dependencies);

  return { data, loading, error, execute };
};

/**
 * Hook for tracking errors in a component
 */
export const useErrorTracking = (componentName: string) => {
  const trackError = useCallback(
    (error: any, context?: Record<string, any>) => {
      errorLogger.captureException(error, {
        component: componentName,
        ...context,
      });
      errorLogger.addBreadcrumb(`Error in ${componentName}`, { error: error?.message });
    },
    [componentName],
  );

  const trackEvent = useCallback(
    (eventName: string, data?: Record<string, any>) => {
      errorLogger.addBreadcrumb(`${componentName}: ${eventName}`, data);
    },
    [componentName],
  );

  return { trackError, trackEvent };
};

/**
 * Hook for performance monitoring
 */
export const usePerformanceMonitor = (operationName: string) => {
  const startRef = useRef<number>(0);

  const start = useCallback(() => {
    startRef.current = performance.now();
  }, []);

  const end = useCallback(() => {
    if (startRef.current === 0) {
      console.warn("Performance monitor was not started");
      return 0;
    }
    const duration = performance.now() - startRef.current;
    errorLogger.logMetric(operationName, duration, "ms");
    return duration;
  }, [operationName]);

  return { start, end };
};

/**
 * Hook to detect and handle network errors
 */
export const useNetworkErrorHandler = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const checkConnectivity = useCallback(async () => {
    try {
      const response = await fetch(window.location.href, {
        method: "HEAD",
        cache: "no-cache",
      });
      setIsOnline(response.ok);
      return response.ok;
    } catch {
      setIsOnline(false);
      return false;
    }
  }, []);

  return { isOnline, checkConnectivity };
};

/**
 * Hook for safe state updates
 */
export const useSafeSetState = () => {
  const isMountedRef = useRef(true);

  // Cleanup on unmount
  if (typeof window !== "undefined") {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
    }
  }

  const setSafeState = useCallback((setState: (value: any) => void, value: any) => {
    if (isMountedRef.current) {
      setState(value);
    }
  }, []);

  return { setSafeState, isMounted: isMountedRef };
};
