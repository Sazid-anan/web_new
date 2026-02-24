/**
 * Custom React Hook for Performance Monitoring
 * Tracks component render times and lifecycle performance
 */

import { useEffect, useRef } from "react";
import { performanceMonitor } from "../services/performanceMonitor";

export function usePerformanceMonitoring(componentName: string) {
  const startTimeRef = useRef(Date.now());
  const renderCountRef = useRef(0);

  useEffect(() => {
    const renderTime = Date.now() - startTimeRef.current;
    renderCountRef.current += 1;

    performanceMonitor.measureOperation(
      `${componentName} render #${renderCountRef.current}`,
      renderTime,
    );

    return () => {
      // Cleanup if needed
    };
  }, [componentName]);

  return {
    renderCount: renderCountRef.current,
    getElapsedTime: () => Date.now() - startTimeRef.current,
  };
}

/**
 * Hook to measure async operations
 */
export function useMeasureAsync(operationName: string) {
  return async (asyncFn: () => Promise<any>) => {
    const start = performance.now();
    try {
      const result = await asyncFn();
      const duration = performance.now() - start;
      performanceMonitor.measureOperation(operationName, duration);
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      performanceMonitor.measureOperation(`${operationName} (failed)`, duration);
      throw error;
    }
  };
}
