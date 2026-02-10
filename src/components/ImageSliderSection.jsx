import { useEffect, useState, useRef } from "react";
import Container from "./common/Container";
import Badge from "./ui/Badge";

/**
 * Image Slider Section
 * Displays horizontally scrolling images from right to left with sliding overlay on hover
 *
 * Usage Example:
 * <ImageSliderSection
 *   images={[
 *     { src: "/images/1.jpg", name: "Future Tech", description: "A glimpse into tomorrow's technology." },
 *     { src: "/images/2.jpg", name: "Smart Device", description: "Smart device for modern living." }
 *   ]}
 *   title="Our Designed Products"
 *   badge="Our Products"
 *   autoPlay={true}
 *   interval={35000}
 * />
 *
 * Props:
 * - images: Array of {src, name, description} objects from public folder (required)
 * - title: Slider title (default: "Image Gallery")
 * - badge: Badge text above title (optional)
 * - autoPlay: Enable auto-play (default: true)
 * - interval: Animation duration for one scroll cycle in ms (default: 35000)
 */
export default function ImageSliderSection({
  images = [],
  title = "Image Gallery",
  badge = "Our Products",
  autoPlay = true,
  interval = 35000,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!autoPlay || images.length === 0) return;

    // Disable auto-play on mobile for better performance
    const isMobile = window.innerWidth < 768;
    if (isMobile && autoPlay) {
      setIsPaused(true);
    }

    // Create and inject animation keyframes
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
        
        .animate-image-marquee:hover {
          animation-play-state: paused;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-image-marquee {
            animation: none;
          }
        }
        
        @media (max-width: 640px) {
          .animate-image-marquee {
            gap: 16px;
          }
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      // Don't remove the style to avoid flickering on re-renders
    };
  }, [autoPlay, interval, images.length]);

  // Track active dot based on animation progress
  useEffect(() => {
    if (!autoPlay || images.length === 0 || isPaused) return;

    const updateInterval = interval / images.length;
    let currentIndex = 0;

    const dotInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      setActiveIndex(currentIndex);
    }, updateInterval);

    return () => clearInterval(dotInterval);
  }, [autoPlay, interval, images.length, isPaused]);

  // Handle dot click to navigate to specific image
  const handleDotClick = (index) => {
    setActiveIndex(index);
    setIsPaused(true);

    if (sliderRef.current) {
      const imageWidth = 520; // Width of each image
      const gap = 32; // Gap between images
      const scrollPosition = index * (imageWidth + gap);

      sliderRef.current.style.animation = "none";
      sliderRef.current.style.transform = `translateX(-${scrollPosition}px)`;
    }

    // Resume animation after 5 seconds
    setTimeout(() => {
      setIsPaused(false);
      if (sliderRef.current) {
        sliderRef.current.style.animation = "";
      }
    }, 5000);
  };

  if (!images || images.length === 0) {
    return null;
  }

  // Create duplicate images for seamless loop (2x is enough)
  const duplicatedImages = [...images, ...images];

  return (
    <section className="pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8 md:pb-10 bg-transparent">
      <Container>
        <div className="text-center mb-4 sm:mb-5 md:mb-6 mt-0 pt-0 px-4">
          <Badge
            variant="secondary"
            className="mb-2 sm:mb-3 md:mb-4 inline-block text-xs sm:text-sm"
          >
            {badge}
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground">
            {title}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto leading-relaxed">
            Explore our range of professionally engineered hardware solutions
          </p>
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
                className="shrink-0 w-[280px] h-[180px] sm:w-[380px] sm:h-[250px] md:w-[520px] md:h-[340px] rounded-xl md:rounded-2xl bg-transparent shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group relative cursor-pointer"
              >
                <img
                  src={typeof image === "object" ? image.src : image}
                  alt={
                    typeof image === "object"
                      ? image.name
                      : `Product ${(index % images.length) + 1}`
                  }
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
                {/* Sliding Overlay on Hover */}
                {typeof image === "object" && image.name && (
                  <div className="absolute left-0 right-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-orange-700/90 via-orange-500/80 to-transparent text-white text-center py-2 sm:py-3 md:py-4 px-2 text-sm sm:text-base md:text-lg font-semibold tracking-wide flex flex-col items-center rounded-b-xl md:rounded-b-2xl">
                    <div className="mb-0.5 sm:mb-1 text-base sm:text-lg md:text-[20px] font-bold drop-shadow-lg">
                      {image.name}
                    </div>
                    {image.description && (
                      <div className="text-xs sm:text-sm font-normal drop-shadow-md">
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
