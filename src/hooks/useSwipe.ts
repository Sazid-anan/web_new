import { useEffect, useRef, useCallback } from "react";

/**
 * useSwipe Hook
 * Detects swipe gestures on touch devices
 *
 * @param {Function} onSwipeLeft - Callback when swiped left
 * @param {Function} onSwipeRight - Callback when swiped right
 * @param {number} minSwipeDistance - Minimum distance to register swipe (default: 50px)
 * @returns {Object} - { ref } - Ref to attach to swipeable element
 */
export function useSwipe(
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  minSwipeDistance = 50,
) {
  const elementRef = useRef<HTMLElement>(null);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const isVerticalSwipeRef = useRef(false);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartRef.current = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };
    isVerticalSwipeRef.current = false;
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      const touchEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };

      const deltaX = touchStartRef.current.x - touchEnd.x;
      const deltaY = touchStartRef.current.y - touchEnd.y;

      // Ignore if mostly vertical movement
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return;
      }

      // Swipe threshold
      if (Math.abs(deltaX) < minSwipeDistance) {
        return;
      }

      // Determine direction
      if (deltaX > 0) {
        // Swiped left
        onSwipeLeft?.();
      } else {
        // Swiped right
        onSwipeRight?.();
      }
    },
    [onSwipeLeft, onSwipeRight, minSwipeDistance],
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    } as EventListenerOptions);
    element.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    } as EventListenerOptions);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);

  return { ref: elementRef };
}

export default useSwipe;
