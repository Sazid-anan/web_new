import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Container from "./common/Container";
import BackgroundParticles from "./common/BackgroundParticles";
import { ArrowRight, Linkedin, Calendar } from "lucide-react";
import { EXTERNAL_LINKS, INTERNAL_LINKS } from "../config/links";

/**
 * Hero Text Section
 * Displays the main headline and description on a dark background
 */

// Reusable CTA Button Component
const CTAButton = ({
  href,
  label,
  isExternal = false,
  onClick,
  icon: Icon,
  isSocial = false,
  tooltip = null,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  const linkProps = isExternal
    ? {
        href,
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {
        href,
        onClick: handleClick,
      };

  return (
    <a
      className="relative group inline-block"
      {...linkProps}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`relative w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full font-semibold text-sm sm:text-base md:text-lg lg:text-xl cursor-pointer transition-all duration-300 flex items-center justify-center sm:inline-flex gap-2 ${
          isSocial ? "glass-orange-outline" : "glass-orange"
        }`}
        style={{ willChange: "transform" }}
      >
        <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
          {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5" />}
          {label}
          {!isSocial && !tooltip && (
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          )}

          {/* Expanding Tooltip Text */}
          <AnimatePresence>
            {tooltip && isHovered && (
              <motion.span
                initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                animate={{ opacity: 1, width: "auto", marginLeft: "0.5rem" }}
                exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="overflow-hidden whitespace-nowrap text-xs sm:text-sm md:text-base lg:text-lg text-white"
              >
                - {tooltip}
              </motion.span>
            )}
          </AnimatePresence>

          {!isSocial && tooltip && (
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          )}
        </span>
      </motion.div>
    </a>
  );
};

export default function HeroTextSection() {
  const handleContactScroll = (e) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-start md:items-center gap-12"
          >
            {/* Left: Headline and CTA */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 flex flex-col items-start text-left max-w-3xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-3 md:mb-4"
              >
                <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-muted-foreground bg-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-slate-200 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Welcome to Danvion
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[56px] sm:text-[80px] md:text-[120px] lg:text-[180px] xl:text-[240px] font-bold leading-[1.1] tracking-tight mb-8 bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(243, 113, 6, 0.95), rgba(167, 73, 36, 0.85))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                Alchemy for the
                <br />
                Intelligent Age
              </motion.h1>
              {/* CTA buttons below headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="flex flex-col items-start justify-start gap-2 mt-6 md:mt-10"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full">
                  <CTAButton
                    href={INTERNAL_LINKS.CONTACT}
                    label="Get Started"
                    onClick={handleContactScroll}
                  />
                  <CTAButton
                    href={EXTERNAL_LINKS.LINKEDIN}
                    label="LinkedIn"
                    icon={Linkedin}
                    isExternal={true}
                    isSocial={true}
                  />
                </div>
                <CTAButton
                  href={EXTERNAL_LINKS.CALENDLY}
                  label="Book Me"
                  icon={Calendar}
                  isExternal={true}
                  tooltip="Get free consultation for 30 minutes"
                />
              </motion.div>
            </motion.div>

            {/* Right: Description */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex-1 text-left"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="text-primary-foreground/90 leading-tight max-w-full text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-[80px] 2xl:text-[100px] font-black"
              >
                At Danvion, we're pushing the boundaries of artificial
                intelligence at the edge – delivering cutting-edge solutions for
                the world's most complex challenges. With our expertise in
                embedded AI, hardware integration, and real-time processing,
                we're creating smarter, faster, and more efficient products.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
