import { useEffect, useRef, useCallback, useState } from "react";
import {
  prefersReducedMotion,
  prefersDarkMode,
  prefersHighContrast,
  announceToScreenReaders,
} from "../utils/accessibility";

/**
 * useAccessibilityPreferences Hook
 * Detects user accessibility preferences
 */
export const useAccessibilityPreferences = () => {
  const [reducedMotion, setReducedMotion] = useState<boolean>(prefersReducedMotion());
  const [darkMode, setDarkMode] = useState<boolean>(prefersDarkMode());
  const [highContrast, setHighContrast] = useState<boolean>(prefersHighContrast());

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const contrastQuery = window.matchMedia("(prefers-contrast: more)");

    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    const handleDarkChange = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    const handleContrastChange = (e: MediaQueryListEvent) => setHighContrast(e.matches);

    motionQuery.addEventListener("change", handleMotionChange);
    darkQuery.addEventListener("change", handleDarkChange);
    contrastQuery.addEventListener("change", handleContrastChange);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      darkQuery.removeEventListener("change", handleDarkChange);
      contrastQuery.removeEventListener("change", handleContrastChange);
    };
  }, []);

  return { reducedMotion, darkMode, highContrast };
};

/**
 * useAnnouncement Hook
 * Announces messages to screen readers
 *
 * Usage:
 * const announce = useAnnouncement();
 * announce("Form submitted successfully", "polite");
 */
export const useAnnouncement = () => {
  return useCallback((message: string, level: "polite" | "assertive" = "polite") => {
    announceToScreenReaders(message, level);
  }, []);
};

/**
 * useFocusManagement Hook
 * Helps manage focus for modals, dialogs, etc.
 */
export const useFocusManagement = (isOpen: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store the element that had focus before opening
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Focus the container
      if (containerRef.current) {
        containerRef.current.focus();
      }
    } else {
      // Restore focus to the previous element
      if (previousActiveElement.current?.focus) {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen]);

  return containerRef;
};

export default {
  useAccessibilityPreferences,
  useAnnouncement,
  useFocusManagement,
};
