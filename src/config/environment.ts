/**
 * Environment Configuration Validator
 * Validates required environment variables at runtime
 * Helps catch configuration issues early
 */

interface EnvConfig {
  VITE_FIREBASE_API_KEY: string;
  VITE_FIREBASE_AUTH_DOMAIN: string;
  VITE_FIREBASE_PROJECT_ID: string;
  VITE_FIREBASE_STORAGE_BUCKET: string;
  VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  VITE_FIREBASE_APP_ID: string;
  VITE_FIREBASE_MEASUREMENT_ID?: string;
  VITE_ADMIN_EMAILS?: string;
}

/**
 * Required environment variables for the application
 */
const REQUIRED_ENV_VARS = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
];

/**
 * Optional environment variables
 */
const OPTIONAL_ENV_VARS = ["VITE_FIREBASE_MEASUREMENT_ID", "VITE_ADMIN_EMAILS"];

/**
 * Validation result
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  config: Partial<EnvConfig>;
}

/**
 * Validate environment configuration
 */
export const validateEnvironment = (): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const config: Partial<EnvConfig> = {};

  // Check required variables
  REQUIRED_ENV_VARS.forEach((varName) => {
    const value = import.meta.env?.[varName];

    if (!value || value === "") {
      errors.push(`Missing required environment variable: ${varName}`);
    } else {
      config[varName as keyof EnvConfig] = value;
    }
  });

  // Check optional variables
  OPTIONAL_ENV_VARS.forEach((varName) => {
    const value = import.meta.env?.[varName];

    if (value) {
      config[varName as keyof EnvConfig] = value;
    } else if (varName === "VITE_FIREBASE_MEASUREMENT_ID") {
      warnings.push(`Optional variable ${varName} not set. Analytics may not work.`);
    }
  });

  // Validate Firebase config format
  const projectId = config.VITE_FIREBASE_PROJECT_ID;
  if (projectId && !isValidProjectId(projectId)) {
    warnings.push(`Firebase project ID may be invalid: ${projectId}`);
  }

  // Validate email format if admin emails provided
  const adminEmails = config.VITE_ADMIN_EMAILS;
  if (adminEmails) {
    const emails = adminEmails.split(",").map((e) => e.trim());
    const invalidEmails = emails.filter((e) => !isValidEmail(e));
    if (invalidEmails.length > 0) {
      errors.push(`Invalid admin emails: ${invalidEmails.join(", ")}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    config,
  };
};

/**
 * Initialize and validate environment at app startup
 */
export const initializeEnvironment = (): void => {
  const validation = validateEnvironment();

  if (!validation.isValid) {
    const errorMessage = `Environment validation failed:\n${validation.errors.join("\n")}`;
    console.error(errorMessage);
    // In production, you might want to prevent app initialization
    if (typeof import.meta !== "undefined" && !import.meta.env?.DEV) {
      throw new Error(errorMessage);
    }
  }

  if (validation.warnings.length > 0) {
    console.warn("Environment warnings:", validation.warnings.join("\n"));
  }

  if (typeof import.meta !== "undefined" && import.meta.env?.DEV) {
    console.log("Environment validation passed ✓");
  }
};

/**
 * Get validated environment config
 */
export const getEnvConfig = (): Partial<EnvConfig> => {
  const validation = validateEnvironment();
  return validation.config;
};

/**
 * Get environment status
 */
export const getEnvironmentStatus = (): ValidationResult => {
  return validateEnvironment();
};

/**
 * Utility functions
 */

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidProjectId(projectId: string): boolean {
  // Firebase project IDs are lowercase alphanumeric with hyphens
  const projectIdRegex = /^[a-z0-9\-]+$/;
  return projectIdRegex.test(projectId) && projectId.length > 0;
}

/**
 * Environment type guard
 */
export const isProduction = (): boolean => {
  return typeof import.meta !== "undefined" && import.meta.env?.PROD ? true : false;
};

export const isDevelopment = (): boolean => {
  return typeof import.meta !== "undefined" && import.meta.env?.DEV ? true : false;
};

/**
 * Feature flags based on environment
 */
export const featureFlags = {
  enableDebugLogging: isDevelopment(),
  enableErrorBoundary: true,
  enablePerformanceMonitoring: isProduction(),
  enableAnalytics: true,
  enableCrashReporting: isProduction(),
};

export default {
  validateEnvironment,
  initializeEnvironment,
  getEnvConfig,
  getEnvironmentStatus,
  isProduction,
  isDevelopment,
  featureFlags,
};
