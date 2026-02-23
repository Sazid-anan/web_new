/**
 * Accessibility Utilities
 * Helper functions and utilities for improving application accessibility
 * WCAG 2.1 AA compliance
 */

/**
 * Focus Management
 */
export const focusElement = (element: HTMLElement | null | undefined): void => {
  if (element && typeof element.focus === "function") {
    element.focus();
  }
};

export const focusSelector = (selector: string): void => {
  const element = document.querySelector(selector) as HTMLElement;
  focusElement(element);
};

export const focusFirstTabbable = (container: HTMLElement): void => {
  const focusableElements = container.querySelectorAll(
    "a, button, input, select, textarea, [tabindex]:not([tabindex='-1'])",
  );
  const firstElement = focusableElements[0] as HTMLElement;
  focusElement(firstElement);
};

/**
 * Keyboard Navigation
 */
export const isEscapeKey = (event: KeyboardEvent): boolean => {
  return event.key === "Escape" || event.keyCode === 27;
};

export const isEnterKey = (event: KeyboardEvent): boolean => {
  return event.key === "Enter" || event.keyCode === 13;
};

export const isSpaceKey = (event: KeyboardEvent): boolean => {
  return event.key === " " || event.keyCode === 32;
};

export const isArrowKey = (event: KeyboardEvent): "up" | "down" | "left" | "right" | null => {
  const keyMap: Record<string, "up" | "down" | "left" | "right"> = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
  };
  return keyMap[event.key] || null;
};

/**
 * ARIA Attributes
 */
export const setAriaLabel = (element: HTMLElement, label: string): void => {
  if (element) {
    element.setAttribute("aria-label", label);
  }
};

export const setAriaDescribedBy = (element: HTMLElement, id: string): void => {
  if (element) {
    element.setAttribute("aria-describedby", id);
  }
};

export const setAriaLive = (
  element: HTMLElement,
  level: "polite" | "assertive" = "polite",
): void => {
  if (element) {
    element.setAttribute("aria-live", level);
    element.setAttribute("aria-atomic", "true");
  }
};

export const setAriaHidden = (element: HTMLElement, hidden: boolean): void => {
  if (element) {
    element.setAttribute("aria-hidden", String(hidden));
  }
};

export const setAriaPressed = (element: HTMLElement, pressed: boolean): void => {
  if (element) {
    element.setAttribute("aria-pressed", String(pressed));
  }
};

export const setAriaExpanded = (
  element: HTMLElement,
  expanded: boolean,
  controlsId?: string,
): void => {
  if (element) {
    element.setAttribute("aria-expanded", String(expanded));
    if (controlsId) {
      element.setAttribute("aria-controls", controlsId);
    }
  }
};

/**
 * Announce to Screen Readers
 */
export const announceToScreenReaders = (
  message: string,
  level: "polite" | "assertive" = "polite",
): void => {
  // Create or get the live region
  let liveRegion = document.querySelector(`[role="status"][aria-live="${level}"]`) as HTMLElement;

  if (!liveRegion) {
    liveRegion = document.createElement("div");
    liveRegion.setAttribute("role", "status");
    liveRegion.setAttribute("aria-live", level);
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.className = "sr-only"; // visually hidden
    document.body.appendChild(liveRegion);
  }

  // Clear and set new message
  liveRegion.innerHTML = "";
  setTimeout(() => {
    liveRegion.textContent = message;
  }, 100);

  // Clear after announcement
  setTimeout(() => {
    liveRegion.innerHTML = "";
  }, 5000);
};

/**
 * Skip Links Helper
 */
export const createSkipLinks = (): void => {
  const skipLinksContainer = document.querySelector('[role="navigation"][aria-label="Skip links"]');

  if (!skipLinksContainer) {
    const nav = document.createElement("nav");
    nav.setAttribute("role", "navigation");
    nav.setAttribute("aria-label", "Skip links");
    nav.innerHTML = `
      <ul class="sr-only">
        <li><a href="#main-content">Skip to main content</a></li>
        <li><a href="#navigation">Skip to navigation</a></li>
        <li><a href="#footer">Skip to footer</a></li>
      </ul>
    `;
    document.body.insertBefore(nav, document.body.firstChild);
  }
};

/**
 * Color Contrast Check
 */
export const getContrastRatio = (rgb1: string, rgb2: string): number => {
  const getLuminance = (rgb: string): number => {
    const [r, g, b] = rgb
      .match(/\d+/g)!
      .map((n) => parseInt(n) / 255)
      .map((c) => {
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const l1 = getLuminance(rgb1);
  const l2 = getLuminance(rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

export const isContrastCompliant = (ratio: number, level: "AA" | "AAA" = "AA"): boolean => {
  if (level === "AAA") {
    return ratio >= 7; // High contrast
  }
  return ratio >= 4.5; // Standard contrast
};

/**
 * Text Size and Zoom
 */
export const getTextZoomLevel = (): number => {
  return (window.devicePixelRatio || 1) * 100;
};

/**
 * Reduced Motion Check
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Color Mode Check
 */
export const prefersDarkMode = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

/**
 * High Contrast Mode Check
 */
export const prefersHighContrast = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-contrast: more)").matches;
};

/**
 * Accessibility Audit Helper
 * Checks for common accessibility issues
 */
export interface AccessibilityAudit {
  hasImages: { issue: boolean; elements: HTMLElement[] };
  hasHeadings: { issue: boolean; elements: HTMLElement[] };
  hasLandmarks: { issue: boolean; elements: HTMLElement[] };
  hasLabels: { issue: boolean; elements: HTMLElement[] };
  hasAltText: { issue: boolean; elements: HTMLElement[] };
}

export const auditAccessibility = (): AccessibilityAudit => {
  return {
    hasImages: {
      issue: document.querySelectorAll("img:not([alt])").length > 0,
      elements: Array.from(document.querySelectorAll("img:not([alt])")),
    },
    hasHeadings: {
      issue: document.querySelectorAll("h1").length === 0,
      elements: Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6")),
    },
    hasLandmarks: {
      issue: document.querySelectorAll("main, nav, [role='main']").length === 0,
      elements: Array.from(document.querySelectorAll("main, nav, [role='main'], footer")),
    },
    hasLabels: {
      issue: document.querySelectorAll("input:not([aria-label]):not([id])").length > 0,
      elements: Array.from(document.querySelectorAll("input:not([aria-label]):not([id])")),
    },
    hasAltText: {
      issue: document.querySelectorAll("img[src]:not([alt])").length > 0,
      elements: Array.from(document.querySelectorAll("img[src]:not([alt])")),
    },
  };
};

/**
 * Print audit results (development only)
 */
export const logAccessibilityAudit = (): void => {
  if (typeof import.meta !== "undefined" && import.meta.env?.DEV) {
    const audit = auditAccessibility();
    console.group("♿ Accessibility Audit");

    Object.entries(audit).forEach(([key, value]) => {
      const status = value.issue ? "❌" : "✅";
      console.log(`${status} ${key}: ${value.elements.length} elements`);
    });

    console.groupEnd();
  }
};

export default {
  focusElement,
  focusSelector,
  focusFirstTabbable,
  isEscapeKey,
  isEnterKey,
  isSpaceKey,
  isArrowKey,
  setAriaLabel,
  setAriaDescribedBy,
  setAriaLive,
  setAriaHidden,
  setAriaPressed,
  setAriaExpanded,
  announceToScreenReaders,
  createSkipLinks,
  getContrastRatio,
  isContrastCompliant,
  getTextZoomLevel,
  prefersReducedMotion,
  prefersDarkMode,
  prefersHighContrast,
  auditAccessibility,
  logAccessibilityAudit,
};
