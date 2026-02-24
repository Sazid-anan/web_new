/**
 * API Request Helper
 * Centralized API client for making requests with error handling
 */

import { errorLogger } from "./errorLogger";

class APIClient {
  baseURL: string;
  defaultHeaders: Record<string, string>;

  constructor(baseURL: string = "") {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  /**
   * Make a request with built-in error handling
   */
  async request(
    path: string,
    options: Record<string, any> = {},
    showToast: (msg: string, type: string) => void = (msg) => console.log(msg),
  ): Promise<any> {
    try {
      const url = this.baseURL ? `${this.baseURL}${path}` : path;
      const config = {
        headers: { ...this.defaultHeaders, ...options.headers },
        ...options,
      };

      const response = await fetch(url, config);

      // Handle non-2xx responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error: any = new Error(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        );
        error.status = response.status;
        error.data = errorData;
        throw error;
      }

      // Handle successful response
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      // Log error
      errorLogger.captureException(error, { path, method: options.method });

      // Show user-friendly message
      const userMessage = this.getUserFriendlyMessage(error);
      if (showToast) {
        showToast(userMessage, "error");
      }

      return { success: false, error, message: userMessage };
    }
  }

  /**
   * GET request
   */
  async get(path: string, options: Record<string, any> = {}): Promise<any> {
    return this.request(path, { method: "GET", ...options });
  }

  /**
   * POST request
   */
  async post(path: string, body: any, options: Record<string, any> = {}): Promise<any> {
    return this.request(path, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    });
  }

  /**
   * PUT request
   */
  async put(path: string, body: any, options: Record<string, any> = {}): Promise<any> {
    return this.request(path, {
      method: "PUT",
      body: JSON.stringify(body),
      ...options,
    });
  }

  /**
   * PATCH request
   */
  async patch(path: string, body: any, options: Record<string, any> = {}): Promise<any> {
    return this.request(path, {
      method: "PATCH",
      body: JSON.stringify(body),
      ...options,
    });
  }

  /**
   * DELETE request
   */
  async delete(path: string, options: Record<string, any> = {}): Promise<any> {
    return this.request(path, { method: "DELETE", ...options });
  }

  /**
   * Get user-friendly error message
   */
  getUserFriendlyMessage(error: any): string {
    if (error.status === 400) return "Invalid request. Please check your input.";
    if (error.status === 401) return "Please log in first.";
    if (error.status === 403) return "You don't have permission.";
    if (error.status === 404) return "Resource not found.";
    if (error.status === 409) return "This item already exists.";
    if (error.status === 429) return "Too many requests. Try again later.";
    if (error.status === 500) return "Server error. Please try again later.";
    if (error.status === 503) return "Service is temporarily unavailable. Try again later.";
    if (error.message === "Failed to fetch") return "Network error. Check your connection.";
    return error.message || "Something went wrong. Please try again.";
  }
}

export const apiClient = new APIClient((import.meta as any).env.VITE_API_BASE_URL || "");
