/**
 * Error Handling Utilities
 * Centralized error handling across the application
 */

export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  severity: "low" | "medium" | "high" | "critical";
  context?: {
    component?: string;
    action?: string;
    userId?: string;
  };
}

export class AppErrorHandler extends Error {
  code: string;
  details?: any;
  severity: "low" | "medium" | "high" | "critical";
  context?: AppError["context"];
  timestamp: Date;

  constructor(
    message: string,
    code: string = "UNKNOWN_ERROR",
    severity: "low" | "medium" | "high" | "critical" = "medium",
    details?: any,
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.severity = severity;
    this.details = details;
    this.timestamp = new Date();
  }

  toJSON(): AppError {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
      timestamp: this.timestamp,
      severity: this.severity,
      context: this.context,
    };
  }
}

/**
 * Error Type Guards
 */
export const isAppError = (error: any): error is AppErrorHandler => {
  return error instanceof AppErrorHandler;
};

export const isFirebaseError = (error: any): boolean => {
  return error?.code?.startsWith("auth/") || error?.code?.startsWith("firestore/");
};

/**
 * Firebase Error Handler
 */
export const handleFirebaseError = (error: any): AppErrorHandler => {
  const firebaseErrorMap: Record<
    string,
    { message: string; severity: "low" | "medium" | "high" | "critical" }
  > = {
    "auth/user-not-found": {
      message: "User account not found",
      severity: "low",
    },
    "auth/wrong-password": {
      message: "Incorrect password",
      severity: "low",
    },
    "auth/email-already-in-use": {
      message: "Email already registered",
      severity: "low",
    },
    "auth/invalid-email": {
      message: "Invalid email address",
      severity: "low",
    },
    "auth/weak-password": {
      message: "Password is too weak",
      severity: "low",
    },
    "firestore/permission-denied": {
      message: "Permission denied. Please contact support.",
      severity: "medium",
    },
    "firestore/not-found": {
      message: "Resource not found",
      severity: "low",
    },
    "storage/object-not-found": {
      message: "File not found",
      severity: "low",
    },
    "storage/unauthorized": {
      message: "Not authorized to access this file",
      severity: "medium",
    },
  };

  const errorCode = error?.code || "unknown";
  const mapping = firebaseErrorMap[errorCode] || {
    message: error?.message || "An unexpected error occurred",
    severity: "high" as const,
  };

  return new AppErrorHandler(mapping.message, errorCode, mapping.severity, error?.message);
};

/**
 * Network Error Handler
 */
export const handleNetworkError = (error: any): AppErrorHandler => {
  if (!navigator.onLine) {
    return new AppErrorHandler(
      "No internet connection. Please check your network.",
      "NETWORK_OFFLINE",
      "high",
    );
  }

  if (error?.message?.includes("timeout")) {
    return new AppErrorHandler("Request timeout. Please try again.", "NETWORK_TIMEOUT", "medium");
  }

  return new AppErrorHandler("Network error. Please try again.", "NETWORK_ERROR", "medium");
};

/**
 * Form Validation Error Handler
 */
export const handleValidationError = (error: any, fieldName?: string): AppErrorHandler => {
  const message = fieldName
    ? `Invalid ${fieldName}: ${error?.message || "Please check your input"}`
    : error?.message || "Form validation failed";

  return new AppErrorHandler(message, "VALIDATION_ERROR", "low", error);
};

/**
 * Generic Error Handler
 * Routes to appropriate handler based on error type
 */
export const handleError = (error: any, context?: AppError["context"]): AppErrorHandler => {
  let appError: AppErrorHandler;

  if (isAppError(error)) {
    appError = error;
  } else if (isFirebaseError(error)) {
    appError = handleFirebaseError(error);
  } else if (error?.message?.includes("Network") || error?.message?.includes("fetch")) {
    appError = handleNetworkError(error);
  } else {
    appError = new AppErrorHandler(
      error?.message || "An unexpected error occurred",
      "UNKNOWN_ERROR",
      "high",
    );
  }

  appError.context = context;

  // Log error in development
  if (typeof import.meta !== "undefined" && import.meta.env?.DEV) {
    console.error("[AppError]", appError.toJSON());
  }

  // Could send to error tracking service here
  // Example: Sentry.captureException(appError);

  return appError;
};

/**
 * Error Message Formatter
 * Formats error for user display
 */
export const formatErrorMessage = (error: AppErrorHandler | Error | any): string => {
  if (isAppError(error)) {
    return error.message;
  }

  if (error?.message) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
};

/**
 * Error Retry Handler
 * Implements retry logic with exponential backoff
 */
export enum RetryConfig {
  MAX_RETRIES = 3,
  BASE_DELAY = 1000, // ms
  MAX_DELAY = 10000, // ms
}

export const retryAsync = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = RetryConfig.MAX_RETRIES,
  baseDelay: number = RetryConfig.BASE_DELAY,
): Promise<T> => {
  let lastError: any;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt < maxRetries - 1) {
        const delay = Math.min(baseDelay * Math.pow(2, attempt), RetryConfig.MAX_DELAY);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
};

/**
 * Async Operation Wrapper
 * Wraps async operations with error handling
 */
export const executeAsync = async <T>(
  operation: () => Promise<T>,
  errorMessage?: string,
): Promise<{ data?: T; error?: AppErrorHandler; success: boolean }> => {
  try {
    const data = await operation();
    return { data, success: true };
  } catch (error) {
    const appError = handleError(error, { action: errorMessage });
    return { error: appError, success: false };
  }
};

/**
 * Safe JSON Parse
 */
export const safeJsonParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    console.warn("JSON parse error:", error);
    return fallback;
  }
};
