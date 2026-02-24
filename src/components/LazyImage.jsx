import { useEffect, useRef, useState } from "react";
import { useResponsive } from "../hooks/useResponsive";
import {
  isWebPSupported,
  getPlaceholderDataUrl,
  calculateAspectRatio,
} from "../utils/imageOptimization";

/**
 * LazyImage Component - Enhanced with WebP & Responsive Images
 * Optimizes image loading with Intersection Observer API
 * Loads images only when they become visible in the viewport
 *
 * Features:
 * - Lazy loading with Intersection Observer + native loading attribute
 * - WebP picture element support with JPG fallback
 * - Responsive srcset and sizes
 * - Blur-up placeholder effect
 * - Optimal aspect ratio preservation
 * - Mobile-optimized loading strategy
 *
 * Usage:
 * <LazyImage
 *   src="/images/photo.jpg"
 *   srcWebP="/images/photo.webp"
 *   alt="Description"
 *   className="w-full h-auto"
 *   width={800}
 *   height={600}
 *   srcSet="image-320w.jpg 320w, image-640w.jpg 640w"
 *   sizes="(max-width: 640px) 100vw, 80vw"
 * />
 */
export default function LazyImage({
  src,
  srcWebP,
  alt = "",
  className = "",
  width,
  height,
  srcSet,
  srcSetWebP,
  sizes,
  loading = "lazy",
  usePicture = false,
  placeholder = "blur",
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [webpSupported] = useState(() => isWebPSupported());
  const imgRef = useRef(null);
  const { isMobile } = useResponsive();

  // Adjust root margin based on device - load earlier on desktop
  const rootMargin = isMobile ? "25px" : "50px";

  useEffect(() => {
    const currentRef = imgRef.current;

    if (!currentRef) return;

    // Use native loading if available, otherwise use Intersection Observer
    if (loading === "lazy" && "loading" in HTMLImageElement.prototype) {
      // Native lazy loading - browser handles it
      setImageSrc(src);
      return;
    }

    // Fallback: Intersection Observer for older browsers
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
        rootMargin: rootMargin,
      },
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [src, loading, rootMargin]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  // Generate placeholder
  const placeholderSrc =
    placeholder === "blur"
      ? getPlaceholderDataUrl("#e5e7eb")
      : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";

  // Use picture element for WebP support if srcWebP is provided
  if ((usePicture || srcWebP) && webpSupported && srcWebP) {
    return (
      <picture>
        <source srcSet={srcSetWebP || srcSet} sizes={sizes} type="image/webp" />
        <source srcSet={srcSet} sizes={sizes} type="image/jpeg" />
        <img
          ref={imgRef}
          src={imageSrc || placeholderSrc}
          alt={alt}
          className={`${className} ${isLoaded ? "opacity-100" : "opacity-50"} transition-opacity duration-300`}
          width={width}
          height={height}
          loading={loading}
          onLoad={handleImageLoad}
          {...props}
        />
      </picture>
    );
  }

  // Fallback: Standard img with srcset for responsive images
  return (
    <img
      ref={imgRef}
      src={imageSrc || placeholderSrc}
      alt={alt}
      className={`${className} ${isLoaded ? "opacity-100" : "opacity-50"} transition-opacity duration-300`}
      width={width}
      height={height}
      srcSet={srcSet}
      sizes={sizes}
      loading={loading}
      onLoad={handleImageLoad}
      decoding="async"
      {...props}
    />
  );
}
