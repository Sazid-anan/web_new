import { useEffect } from "react";
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
  useEffect(() => {
    if (!autoPlay || images.length === 0) return;

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
          gap: 2rem;
          animation: image-marquee ${interval}ms linear infinite;
        }
        
        .animate-image-marquee:hover {
          animation-play-state: paused;
        }
        
        @media (max-width: 640px) {
          .animate-image-marquee {
            gap: 1rem;
          }
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      // Don't remove the style to avoid flickering on re-renders
    };
  }, [autoPlay, interval, images.length]);

  if (!images || images.length === 0) {
    return null;
  }

  // Create duplicate images for seamless loop (2x is enough)
  const duplicatedImages = [...images, ...images];

  return (
    <section className="pt-0 pb-10 bg-transparent">
      <Container>
        <div className="text-center mb-6 mt-0 pt-0">
          <Badge variant="secondary" className="mb-4 inline-block">
            {badge}
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-semibold text-foreground">
            {title}
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
            Explore our range of professionally engineered hardware solutions
          </p>
        </div>

        {/* Horizontal Scrolling Carousel */}
        <div className="overflow-hidden relative rounded-2xl">
          <div
            className="animate-image-marquee py-2"
            style={{ width: "max-content" }}
          >
            {duplicatedImages.map((image, index) => (
              <div
                key={`${index}-${typeof image === "object" ? image.src : image}`}
                className="shrink-0 w-[520px] h-[340px] rounded-2xl bg-transparent shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group relative cursor-pointer"
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
                />
                {/* Sliding Overlay on Hover */}
                {typeof image === "object" && image.name && (
                  <div className="absolute left-0 right-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-orange-700/90 via-orange-500/80 to-transparent text-white text-center py-4 px-2 text-lg font-semibold tracking-wide flex flex-col items-center rounded-b-2xl">
                    <div className="mb-1 text-xl font-bold drop-shadow-lg">
                      {image.name}
                    </div>
                    {image.description && (
                      <div className="text-sm font-normal drop-shadow-md">
                        {image.description}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
