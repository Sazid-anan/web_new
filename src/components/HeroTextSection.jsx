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
    <section className="relative bg-primary py-6 lg:py-12 overflow-hidden">
      <BackgroundParticles />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
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
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            {/* Left: Headline and CTA */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 flex flex-col items-start text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-4"
              >
                <span className="inline-block text-xs font-semibold tracking-wider uppercase text-muted-foreground bg-white px-4 py-1.5 rounded-full border border-slate-200 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Welcome to Danvion
                </span>
              </motion.div>
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
              {/* Move CTA buttons below headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="flex flex-col sm:flex-row items-center justify-start gap-4 mt-2"
              >
                <a
                  href="#about"
                  className="relative group"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("about");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative px-8 py-3 rounded-full font-semibold text-base cursor-pointer transition-all duration-300 inline-flex items-center gap-2 glass-orange"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Get Started
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.div>
                </a>
                <a
                  href="#contact"
                  className="relative group"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("contact");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative px-8 py-3 rounded-full font-semibold text-base cursor-pointer transition-all duration-300 inline-flex items-center gap-2 glass-orange-outline"
                  >
                    <span className="relative z-10">Enquiry</span>
                  </motion.div>
                </a>
              </motion.div>
            </motion.div>
            {/* Right: Description */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 text-left"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="text-base lg:text-lg text-primary-foreground/75 leading-relaxed max-w-xl mb-10"
              >
                {homePage?.description ||
                  "At Danvion, we're pushing the boundaries of artificial intelligence at the edge – delivering cutting-edge solutions for the world's most complex challenges. With our expertise in embedded AI, hardware integration, and real-time processing, we're creating smarter, faster, and more efficient products."}
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
