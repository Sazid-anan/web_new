import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ImageSlider Component
 * Animated image carousel for hero section
 * Auto-rotates and supports manual navigation
 */
export default function ImageSlider({
  images = [],
  autoPlay = true,
  interval = 5000,
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Default demo images if none provided
  const defaultImages = [
    "https://images.unsplash.com/photo-1633356122544-f134324ef6db?q=80&w=1200",
    "https://images.unsplash.com/photo-1625948515291-69613efd103f?q=80&w=1200",
    "https://images.unsplash.com/photo-1676887720413-e4da6b4bdca3?q=80&w=1200",
  ];

  const displayImages = images && images.length > 0 ? images : defaultImages;

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || displayImages.length === 0) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, displayImages.length]);

  const goToPrevious = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + displayImages.length) % displayImages.length,
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  if (displayImages.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
        No images
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-brand-black">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImageIndex}
          src={displayImages[currentImageIndex]}
          alt={`Slide ${currentImageIndex + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Previous Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={goToPrevious}
        type="button"
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors backdrop-blur-sm"
      >
        ←
      </motion.button>

      {/* Next Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={goToNext}
        type="button"
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors backdrop-blur-sm"
      >
        →
      </motion.button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {displayImages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentImageIndex}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentImageIndex
                ? "bg-brand-orange w-8"
                : "bg-white/50 hover:bg-white"
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </div>
  );
}
