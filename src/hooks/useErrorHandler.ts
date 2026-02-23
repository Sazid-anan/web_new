import { useState, useCallback } from "react";
import { AppErrorHandler, handleError, AppError } from "../utils/errorHandler";

interface UseErrorHandlerReturn {
  error: AppErrorHandler | null;
  hasError: boolean;
  errorMessage: string;
  clearError: () => void;
  handleError: (error: any, context?: AppError["context"]) => void;
  handleApiError: (error: any) => void;
}

/**
 * useErrorHandler Hook
 * Manages component-level error state
 *
 * Usage:
 * const { error, errorMessage, handleError, clearError } = useErrorHandler();
 *
 * try {
 *   await someAsyncOperation();
 * } catch (err) {
 *   handleError(err, { component: "MyComponent" });
 * }
 */
export const useErrorHandler = (): UseErrorHandlerReturn => {
  const [error, setError] = useState<AppErrorHandler | null>(null);

  const handleErrorFn = useCallback((err: any, context?: AppError["context"]) => {
    const appError = handleError(err, context);
    setError(appError);
  }, []);

  const handleApiError = useCallback(
    (err: any) => {
      handleErrorFn(err, { action: "API_CALL" });
    },
    [handleErrorFn],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    hasError: error !== null,
    errorMessage: error?.message || "",
    handleError: handleErrorFn,
    handleApiError,
    clearError,
  };
};

/**
 * useAsyncError Hook
 * Manages async operation states with error handling
 */
interface UseAsyncReturn<T> {
  data: T | null;
  error: AppErrorHandler | null;
  loading: boolean;
  execute: (asyncFn: () => Promise<T>) => Promise<void>;
}

export const useAsync = <T>(): UseAsyncReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AppErrorHandler | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async (asyncFn: () => Promise<T>) => {
    setLoading(true);
    setError(null);

    try {
      const result = await asyncFn();
      setData(result);
    } catch (err) {
      const appError = handleError(err);
      setError(appError);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, execute };
};

export default useErrorHandler;
