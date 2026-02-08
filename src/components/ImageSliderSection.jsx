import Container from "./common/Container";
import { motion } from "framer-motion";

/**
 * Image Slider Section
 * Place images in /public and update the imageNames array below.
 */
export default function ImageSliderSection() {
  // Add your public image file names here (e.g. "client-1.png").
  // Files should live in: /public
  const imageNames = ["1.jpg", "2.png"];

  const images = imageNames.map((name) => `/${name}`);
  const loopedImages = [...images, ...images];

  return (
    <section className="py-20 bg-transparent">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-muted-foreground bg-white px-4 py-1.5 rounded-full border border-slate-200 mb-4">
            Our Products
          </span>
          <h2 className="text-3xl lg:text-4xl font-semibold text-foreground">
            Our Designed Products
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
            Explore our range of professionally engineered hardware solutions
          </p>
        </motion.div>

        <div className="overflow-hidden relative rounded-2xl">
          <div className="flex items-center gap-8 animate-image-marquee py-2">
            {loopedImages.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="shrink-0 w-[520px] h-[340px] rounded-2xl bg-transparent shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                <img
                  src={src}
                  alt="Slider item"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
        </div>
      </Container>

      <style>{`
        @keyframes image-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-image-marquee {
          animation: image-marquee 20s linear infinite;
        }
        .animate-image-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
