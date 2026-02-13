import { motion } from "framer-motion";
import { useState } from "react";
import Container from "./common/Container";
import BackgroundParticles from "./common/BackgroundParticles";
import { Linkedin, Calendar } from "lucide-react";
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
  variant = "primary",
  expandText = null,
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

  const buttonClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    tertiary: "btn-tertiary",
  };

  return (
    <a
      className="relative group inline-block"
      {...linkProps}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={!expandText ? { scale: 1.02 } : {}}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`relative px-6 py-2.5 md:px-7 md:py-3 rounded-lg font-semibold text-sm sm:text-base md:text-base cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 ${
          buttonClasses[variant] || buttonClasses.primary
        }`}
        style={{ willChange: "transform" }}
        animate={
          expandText ? { paddingRight: isHovered ? "7rem" : "1.25rem" } : {}
        }
      >
        <span className="relative z-10 flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5" />}
          {label}
        </span>

        {/* Expandable text for hover state */}
        {expandText && (
          <motion.span
            className="absolute right-1 md:right-1.5 z-10 text-xs sm:text-sm font-semibold whitespace-nowrap"
            initial={{ opacity: 0, x: -10 }}
            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {expandText}
          </motion.span>
        )}
      </motion.div>
    </a>
  );
};

export default function HeroTextSection() {
  return (
    <section className="relative bg-primary pt-6 sm:pt-8 md:pt-12 lg:pt-16 xl:pt-20 pb-6 sm:pb-8 md:pb-12 lg:pb-16 xl:pb-20 overflow-hidden">
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
            className="flex flex-col md:flex-row items-start gap-4"
          >
            {/* Left: Headline and CTA */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 flex flex-col items-start text-left max-w-3xl"
            >
              <div className="mt-1" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="rounded-2xl"
              >
                <h1 className="hero-gradient-text font-bold leading-[1.25] tracking-tight mb-4 sm:mb-6 md:mb-8 text-5xl">
                  Alchemy for the
                  <br />
                  Intelligent Age
                </h1>
              </motion.div>
              {/* CTA buttons below headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="flex flex-col items-start justify-start gap-2 mt-4 sm:mt-6 md:mt-8 lg:mt-10"
              >
                <CTAButton
                  href={EXTERNAL_LINKS.CALENDLY}
                  label="Book a Free Consultation"
                  icon={Calendar}
                  isExternal={true}
                  variant="tertiary"
                  expandText="For 30 Minutes"
                />
              </motion.div>
            </motion.div>

            {/* Right: Description */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex-1 text-left flex flex-col justify-start"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="rounded-2xl"
              >
                <p className="text-justify text-body-sm font-medium text-muted-foreground">
                  At Danvion, we're pushing the boundaries of artificial
                  intelligence at the edge – delivering cutting-edge solutions
                  for the world's most complex challenges. With our expertise in
                  embedded AI, hardware integration, and real-time processing,
                  we're creating smarter, faster, and more efficient products.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
