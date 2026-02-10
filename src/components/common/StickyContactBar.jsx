import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, Linkedin, Calendar } from "lucide-react";
import { useState } from "react";
import { EXTERNAL_LINKS } from "../../config/links";

/**
 * StickyContactBar Component
 * Fixed contact buttons on the right side of the screen
 * Includes: Phone, Email, LinkedIn
 */
export default function StickyContactBar() {
  const [hoveredItem, setHoveredItem] = useState(null);

  const contactItems = [
    {
      icon: Phone,
      label: "Call Us",
      detail: "+60148914600",
      href: "tel:+60148914600",
      color: "text-brand-orange",
    },
    {
      icon: Mail,
      label: "Email Us",
      detail: "sazid@danvion.com",
      href: "mailto:sazid@danvion.com",
      color: "text-brand-orange",
    },
    {
      icon: Linkedin,
      label: "Follow Us",
      href: EXTERNAL_LINKS.LINKEDIN,
      color: "text-brand-orange",
      target: "_blank",
      rel: "noopener noreferrer",
    },

    {
      icon: Calendar,
      label: "Book Me",
      href: EXTERNAL_LINKS.CALENDLY,
      color: "text-brand-orange",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  const hoverVariants = {
    hover: {
      scale: 1.25,
      x: -15,
      rotate: 5,
      boxShadow: "0 0 20px rgba(255, 140, 0, 0.6)",
      backgroundColor: "rgba(255, 140, 0, 0.3)",
      borderColor: "rgba(255, 140, 0, 0.6)",
    },
  };

  return (
    <motion.div
      className="fixed right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-40 flex flex-col gap-0.5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {contactItems.map((item) => {
        const Icon = item.icon;
        return (
          <motion.a
            key={item.label}
            href={item.href}
            target={item.target}
            rel={item.rel}
            variants={itemVariants}
            whileHover="hover"
            className="group relative"
            title={item.label}
            onMouseEnter={() => setHoveredItem(item.label)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <motion.div
              variants={hoverVariants}
              className="p-2.5 sm:p-3 rounded-lg bg-transparent border-2 border-brand-orange/30 backdrop-blur-sm hover:bg-white/10 hover:border-brand-orange/60 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(255,140,0,0)] hover:shadow-[0_0_15px_rgba(255,140,0,0.3)]"
            >
              <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.color}`} />
            </motion.div>

            {/* Tooltip with Slide Animation */}
            <AnimatePresence>
              {hoveredItem === item.label && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute right-12 sm:right-16 top-1/2 -translate-y-1/2 bg-gradient-to-br from-orange-400 via-orange-300 to-orange-400 backdrop-blur-xl text-white px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl whitespace-nowrap pointer-events-none shadow-[0_8px_32px_rgba(255,140,0,0.5)] border-2 border-orange-300/60 text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <p className="font-bold text-sm text-white uppercase tracking-wider">
                      {item.label}
                    </p>
                  </div>
                  {item.detail && (
                    <p className="text-base font-semibold text-white ml-3.5 tracking-wide">
                      {item.detail}
                    </p>
                  )}
                  {/* Orange accent bar */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white via-orange-200 to-white rounded-l-xl opacity-70" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.a>
        );
      })}

      {/* Decorative line */}
      <div className="w-1 h-16 bg-gradient-to-b from-brand-orange/40 via-brand-orange/20 to-transparent rounded-full mx-auto" />
    </motion.div>
  );
}
