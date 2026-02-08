import { motion } from "framer-motion";
import Container from "./common/Container";
import BackgroundParticles from "./common/BackgroundParticles";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Hero Text Section
 * Displays the main headline and description on a dark background
 */
export default function HeroTextSection({ homePage }) {
  const headline = homePage?.headline || "Alchemy for the Intelligent Age";
  const headlineLine1 = headline.replace(/intelligent age/i, "").trim();
  const headlineLine2 = "Intelligent Age";

  return (
    <section className="relative bg-primary py-20 lg:py-28 overflow-hidden">
      {/* Background Particles */}
      <BackgroundParticles />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <Container>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-muted-foreground bg-white px-4 py-1.5 rounded-full border border-slate-200 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Welcome to Danvion
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-[1.1] tracking-tight mb-8"
            >
              {headlineLine1}
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(243, 113, 6, 0.95), rgba(167, 73, 36, 0.85))",
                }}
              >
                {headlineLine2}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-base lg:text-lg text-primary-foreground/75 leading-relaxed max-w-2xl mx-auto mb-10"
            >
              {homePage?.description ||
                "At Danvion, we're pushing the boundaries of artificial intelligence at the edge – delivering cutting-edge solutions for the world's most complex challenges. With our expertise in embedded AI, hardware integration, and real-time processing, we're creating smarter, faster, and more efficient products."}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/contact" className="relative group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative px-8 py-3 rounded-full font-semibold text-base bg-white text-primary cursor-pointer orange-pop-hover overflow-hidden transition-all duration-300 inline-flex items-center gap-2"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.div>
              </Link>
              <Link to="/products" className="relative group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative px-8 py-3 rounded-full font-semibold text-base border-2 border-white/30 text-primary-foreground cursor-pointer orange-pop-hover overflow-hidden transition-all duration-300 inline-flex items-center gap-2 hover:border-white/50"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-white/5 opacity-0 group-hover:opacity-100 backdrop-blur-md transition-all duration-300 -z-10"></span>
                  <span className="relative z-10">View Products</span>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
