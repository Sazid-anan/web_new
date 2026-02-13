import { useEffect, useState, useRef } from "react";
import Container from "./common/Container";

/**
 * Image Slider Section
 * Displays horizontally scrolling images from right to left with sliding overlay on hover
 *
 * Usage Example:
 * <ImageSliderSection
 *   images={[
 *     { src: "/images/1.jpg", name: "Future Tech", description: "A glimpse into tomorrow's technology." },
 *     { src: "/images/2.png", name: "Smart Device", description: "Smart device for modern living." },
 *     { src: "/images/3.jpg", name: "Innovative Design", description: "Sleek and innovative product design." },
 *     { src: "/images/4.jpg", name: "Cutting-Edge", description: "Experience cutting-edge technology." },
 *   ]}
 *   title="Our Designed Products"
 *   autoPlay={true}
 *   interval={35000}
 * />
 *
 * Props:
 * - images: Array of {src, name, description} objects from public folder (required)
 * - title: Slider title (default: "Image Gallery")
 * - autoPlay: Enable auto-play (default: true)
 * - interval: Animation duration for one scroll cycle in ms (default: 35000)
 */
export default function ImageSliderSection({
  images = [],
  title = "Image Gallery",
  autoPlay = true,
  interval = 35000,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [screenSize, setScreenSize] = useState("md");
  const sliderRef = useRef(null);
  const autoPlayTimerRef = useRef(null);
  const dotTimerRef = useRef(null);

  // Detect screen size for responsive dimensions
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 640) setScreenSize("sm");
        else if (window.innerWidth < 768) setScreenSize("md");
        else setScreenSize("lg");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get dynamic image dimensions based on screen size
  const getImageDimensions = () => {
    switch (screenSize) {
      case "sm":
        return { width: 320, gap: 16 };
      case "md":
        return { width: 444, gap: 24 };
      default:
        return { width: 604, gap: 32 };
    }
  };

  // Create and inject animation keyframes
  useEffect(() => {
    if (!autoPlay || images.length === 0) return;

    const styleId = "slider-animation-style";
    let style = document.getElementById(styleId);

    if (!style) {
      style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes image-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-image-marquee {
          display: flex;
          gap: 16px;
          animation: image-marquee ${interval}ms linear infinite;
          will-change: transform;
        }
        
        @media (min-width: 640px) {
          .animate-image-marquee {
            gap: 24px;
          }
        }
        
        @media (min-width: 768px) {
          .animate-image-marquee {
            gap: 32px;
          }
        }
        
        .animate-image-marquee.paused {
          animation-play-state: paused;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-image-marquee {
            animation: none;
          }
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      // Don't remove the style to avoid flickering on re-renders
    };
  }, [autoPlay, interval, images.length]);

  // Auto-update active dot based on animation progress
  useEffect(() => {
    if (!autoPlay || images.length === 0 || isPaused) {
      if (dotTimerRef.current) clearInterval(dotTimerRef.current);
      return;
    }

    const updateInterval = interval / images.length;
    let currentIndex = 0;

    dotTimerRef.current = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      setActiveIndex(currentIndex);
    }, updateInterval);

    return () => {
      if (dotTimerRef.current) clearInterval(dotTimerRef.current);
    };
  }, [autoPlay, interval, images.length, isPaused]);

  // Handle dot click to navigate to specific image
  const handleDotClick = (index) => {
    setActiveIndex(index);
    setIsPaused(true);

    // Clear any existing timers
    if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    if (dotTimerRef.current) clearInterval(dotTimerRef.current);

    if (sliderRef.current) {
      const { width, gap } = getImageDimensions();
      const scrollPosition = index * (width + gap);

      // Pause animation and snap to position
      sliderRef.current.classList.add("paused");
      sliderRef.current.style.animation = "none";
      sliderRef.current.style.transform = `translateX(-${scrollPosition}px)`;
    }

    // Resume animation after 5 seconds
    autoPlayTimerRef.current = setTimeout(() => {
      setIsPaused(false);
      if (sliderRef.current) {
        sliderRef.current.classList.remove("paused");
        sliderRef.current.style.animation = "";
        sliderRef.current.style.transform = "";
      }
    }, 5000);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
      if (dotTimerRef.current) clearInterval(dotTimerRef.current);
    };
  }, []);

  if (!images || images.length === 0) {
    return null;
  }

  // Create duplicate images for seamless loop (2x is enough)
  const duplicatedImages = [...images, ...images];

  return (
    <section className="pt-6 sm:pt-8 md:pt-12 lg:pt-16 xl:pt-20 pb-6 sm:pb-8 md:pb-12 lg:pb-16 xl:pb-20 bg-transparent">
      <Container>
        <div className="text-left mb-8 sm:mb-10 md:mb-12 lg:mb-16 mt-0 pt-0">
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
            <div className="flex-1">
              <h1 className="text-left hero-gradient-text text-h2 font-bold leading-tight tracking-tight">
                {title}
              </h1>
            </div>
            <div className="flex-1">
              <p className="text-justify text-body-sm font-medium text-muted-foreground">
                Stop worrying about design errors or manufacturing delays. Our
                comprehensive approach integrates advanced simulation and
                in-house prototyping to catch issues early, delivering
                high-performance PCB designs that are optimized for cost and
                rapid production.
              </p>
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling Carousel */}
        <div className="overflow-hidden relative rounded-xl md:rounded-2xl">
          <div
            ref={sliderRef}
            className="animate-image-marquee py-2"
            style={{ width: "max-content" }}
          >
            {duplicatedImages.map((image, index) => (
              <div
                key={`${index}-${typeof image === "object" ? image.src : image}`}
                className="shrink-0 w-[320px] h-[180px] sm:w-[444px] sm:h-[250px] md:w-[604px] md:h-[340px] rounded-xl md:rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group relative cursor-pointer"
              >
                <img
                  src={typeof image === "object" ? image.src : image}
                  alt={
                    typeof image === "object"
                      ? image.name
                      : `Product ${(index % images.length) + 1}`
                  }
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                  decoding="async"
                />
                {/* Sliding Overlay on Hover */}
                {typeof image === "object" && image.name && (
                  <div className="absolute left-0 right-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-transparent text-white text-center py-2 sm:py-3 md:py-4 px-2 text-sm sm:text-base md:text-lg font-semibold tracking-wide flex flex-col items-center rounded-b-xl md:rounded-b-2xl">
                    <div className="mb-0.5 sm:mb-1 text-xl sm:text-2xl md:text-3xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      {image.name}
                    </div>
                    {image.description && (
                      <div className="text-xs sm:text-sm font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                        {image.description}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center items-center gap-2 sm:gap-3 mt-4 sm:mt-6 md:mt-8">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-300 rounded-full ${
                activeIndex === index
                  ? "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-orange-600 scale-125"
                  : "w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 hover:bg-orange-400"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
