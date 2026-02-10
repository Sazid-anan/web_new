import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Linkedin, ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { EXTERNAL_LINKS, INTERNAL_LINKS } from "../../config/links";

/**
 * Footer Component
 * Professional glass-morphism footer with social media, links, and contact info
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  const handleSectionClick = (event, sectionId) => {
    event.preventDefault();
    const el = document.getElementById(sectionId);
    if (location.pathname === "/") {
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const linkHoverVariants = {
    hover: { x: 4, color: "#FF8C00" },
  };

  const socialIconVariants = {
    hover: { scale: 1.15, rotate: 5 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative mt-12 md:mt-16 lg:mt-20"
    >
      {/* Content */}
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent mb-8 md:mb-12" />

        {/* Main Footer Content */}
        <div className="py-6 sm:py-8 md:py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 mb-6 sm:mb-8 md:mb-12">
            {/* Company Info */}
            <motion.div
              className="lg:col-span-1"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-black tracking-wide">
                DANVION
              </h3>
              <div className="h-1 w-10 sm:w-12 bg-gradient-to-r from-brand-orange to-orange-500 mb-3 sm:mb-4 rounded-full" />
              <p className="text-black text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
                Leading provider of Edge AI solutions and product development
                services.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-2 sm:gap-3">
                <p className="text-xs sm:text-sm uppercase tracking-widest text-black font-semibold">
                  Connect
                </p>
                <motion.a
                  href={EXTERNAL_LINKS.LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="p-2.5 rounded-lg bg-white/10 hover:bg-brand-orange/20 backdrop-blur-sm border border-white/10 hover:border-brand-orange/30 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6 sm:w-8 sm:h-8 text-brand-orange" />
                </motion.a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="md:col-span-1"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-xs sm:text-sm font-bold mb-3 sm:mb-4 uppercase tracking-widest text-black">
                Navigation
              </h4>
              <div className="h-1 w-10 sm:w-12 bg-gradient-to-r from-brand-orange to-orange-500 mb-3 sm:mb-5 rounded-full" />
              <nav className="flex flex-col gap-2 sm:gap-3">
                <motion.div variants={linkHoverVariants} whileHover="hover">
                  <Link
                    to="/"
                    className="text-black hover:text-brand-orange text-xs sm:text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                    Home
                  </Link>
                </motion.div>
                <motion.div variants={linkHoverVariants} whileHover="hover">
                  <Link
                    to="/products"
                    className="text-black hover:text-brand-orange text-xs sm:text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                    Products
                  </Link>
                </motion.div>
                <motion.div variants={linkHoverVariants} whileHover="hover">
                  <Link
                    to="/blogs"
                    className="text-black hover:text-brand-orange text-xs sm:text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                    Blog
                  </Link>
                </motion.div>
                <motion.div variants={linkHoverVariants} whileHover="hover">
                  <a
                    href={INTERNAL_LINKS.CONTACT}
                    onClick={(event) => handleSectionClick(event, "contact")}
                    className="text-black hover:text-brand-orange text-xs sm:text-sm transition-colors flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                    Contact
                  </a>
                </motion.div>
              </nav>
            </motion.div>

            {/* Resources */}
            <motion.div
              className="md:col-span-1"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-xs sm:text-sm font-bold mb-3 sm:mb-4 uppercase tracking-widest text-black">
                Resources
              </h4>
              <div className="h-1 w-10 sm:w-12 bg-gradient-to-r from-brand-orange to-orange-500 mb-3 sm:mb-5 rounded-full" />
              <nav className="flex flex-col gap-2 sm:gap-3">
                <motion.div variants={linkHoverVariants} whileHover="hover">
                  <a
                    href={INTERNAL_LINKS.CONTACT}
                    onClick={(event) => handleSectionClick(event, "contact")}
                    className="text-black hover:text-brand-orange text-xs sm:text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                    Get in Touch
                  </a>
                </motion.div>
                <motion.div variants={linkHoverVariants} whileHover="hover">
                  <a
                    href="https://www.linkedin.com/company/danvion"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-brand-orange text-xs sm:text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                    About Us
                  </a>
                </motion.div>
              </nav>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="md:col-span-1"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-xs sm:text-sm font-bold mb-3 sm:mb-4 uppercase tracking-widest text-black">
                Get in Touch
              </h4>
              <div className="h-1 w-10 sm:w-12 bg-gradient-to-r from-brand-orange to-orange-500 mb-3 sm:mb-5 rounded-full" />
              <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
                {/* Email */}
                <a
                  href="mailto:sazid@danvion.com"
                  className="flex items-start gap-2 group"
                >
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <p className="text-2xs sm:text-xs text-black uppercase tracking-wider leading-none">
                      Email
                    </p>
                    <p className="text-xs sm:text-sm text-black group-hover:text-brand-orange transition-colors leading-none break-all">
                      sazid@danvion.com
                    </p>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+60148914600"
                  className="flex items-start gap-2 group"
                >
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <p className="text-2xs sm:text-xs text-black uppercase tracking-wider leading-none">
                      Phone
                    </p>
                    <p className="text-xs sm:text-sm text-black group-hover:text-brand-orange transition-colors leading-none">
                      +60148914600
                    </p>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <p className="text-2xs sm:text-xs text-black uppercase tracking-wider leading-none">
                      Location
                    </p>
                    <p className="text-xs sm:text-sm text-black leading-tight">
                      79/Ka Siddiqia, Sonabangla Lane, Khulna
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom Footer */}
        <div className="py-4 sm:py-6 md:py-8">
          <div className="flex flex-col gap-3 sm:gap-4 text-center">
            <p className="text-2xs sm:text-xs text-black">
              &copy; {currentYear} Danvion Ltd. All rights reserved.
            </p>
            <div className="flex items-center justify-center gap-3 sm:gap-4 text-2xs sm:text-xs text-black flex-wrap">
              <a href="#" className="hover:text-brand-orange transition-colors">
                Privacy Policy
              </a>
              <span className="w-0.5 h-0.5 rounded-full bg-black" />
              <a href="#" className="hover:text-brand-orange transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
