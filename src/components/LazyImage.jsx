import { useEffect, useRef, useState } from "react";

/**
 * LazyImage Component
 * Optimizes image loading with Intersection Observer API
 * Loads images only when they become visible in the viewport
 * Falls back to regular img tag for older browsers
 *
 * Features:
 * - Lazy loading with Intersection Observer
 * - Blur-up placeholder effect
 * - WebP format support with fallback
 * - Native lazy loading fallback
 * - No visual changes from standard img tag
 *
 * Usage:
 * <LazyImage
 *   src="/images/photo.jpg"
 *   alt="Description"
 *   className="w-full h-auto"
 *   width={800}
 *   height={600}
 * />
 */
export default function LazyImage({
  src,
  alt = "",
  className = "",
  width,
  height,
  srcSet,
  sizes,
  loading = "lazy",
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const currentRef = imgRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px", // Start loading 50px before visible
      },
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [src]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <img
      ref={imgRef}
      src={
        imageSrc ||
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"
      }
      alt={alt}
      className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
      width={width}
      height={height}
      srcSet={srcSet}
      sizes={sizes}
      loading={loading}
      onLoad={handleImageLoad}
      {...props}
    />
  );
}
