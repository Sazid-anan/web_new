import { useState, useEffect } from "react";

/**
 * useResponsive Hook
 * Detects current device type and provides responsive utilities
 *
 * @returns {Object} - { isMobile, isTablet, isDesktop, width, height, breakpoint }
 */
export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Device type detection based on Tailwind breakpoints
  const isMobile = windowSize.width < 576; // xs: 0-575px
  const isTablet = windowSize.width >= 576 && windowSize.width < 992; // sm-md: 576-991px
  const isDesktop = windowSize.width >= 992; // lg+: 992px+

  // Precise breakpoint detection
  const getBreakpoint = () => {
    if (windowSize.width < 576) return "xs";
    if (windowSize.width < 750) return "sm";
    if (windowSize.width < 992) return "md";
    if (windowSize.width < 1200) return "lg";
    if (windowSize.width < 1400) return "xl";
    return "xxl";
  };

  return {
    isMobile,
    isTablet,
    isDesktop,
    width: windowSize.width,
    height: windowSize.height,
    breakpoint: getBreakpoint(),
  };
}

/**
 * useMediaQuery Hook
 * Custom media query hook for specific breakpoints
 *
 * @param {string} query - Media query string (e.g., '(min-width: 768px)')
 * @returns {boolean} - Whether the media query matches
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Set initial value
    setMatches(media.matches);

    // Define listener
    const listener = (e) => setMatches(e.matches);

    // Add listener
    if (media.addEventListener) {
      media.addEventListener("change", listener);
    } else {
      media.addListener(listener); // Fallback for older browsers
    }

    // Cleanup
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", listener);
      } else {
        media.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
}

export default useResponsive;
