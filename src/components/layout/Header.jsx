import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useResponsive } from "../../hooks/useResponsive";

/**
 * Header Component
 * Main navigation for the website
 * Desktop navigation only - Mobile uses bottom navigation bar
 * Enhanced with responsive utilities for better device-specific behavior
 */
export default function Header() {
  const location = useLocation();
  const { isMobile, isTablet } = useResponsive();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "#contact", label: "Contact" },
    { path: "/products", label: "Products" },
    { path: "/blogs", label: "Blogs" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: isMobile ? 0.3 : 0.5 }} // Faster animation on mobile
      className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1280px] px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-2"
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  window.location.href = "/";
                }
              }}
            >
              <motion.img
                src="/logo.png"
                alt="Danvion Logo"
                className="h-8 w-8 sm:h-10 sm:w-10"
                whileHover={
                  !isMobile
                    ? {
                        scale: 1.1,
                        rotate: [0, -10, 10, -10, 0],
                      }
                    : { scale: 1.05 } // Simpler animation on mobile
                }
                transition={{
                  scale: { duration: 0.2 },
                  rotate: { duration: isMobile ? 0 : 0.6 },
                }}
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="font-bold text-brand-black text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px]"
              >
                DANVION
              </motion.div>
            </Link>

            {/* Desktop Navigation - Hidden on small mobile, visible on sm and up (tablets+) */}
            <div className="hidden sm:flex items-center gap-2 md:gap-4 lg:gap-8">
              <nav className="flex gap-1 md:gap-2">
                {navLinks.map((link) => {
                  if (link.label === "Home") {
                    return (
                      <a
                        key={link.path}
                        href={link.path}
                        className="relative group"
                        onClick={(e) => {
                          e.preventDefault();
                          if (location.pathname === "/") {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          } else {
                            window.location.href = "/";
                          }
                        }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-medium transition-all duration-300 glass-orange-outline text-xs sm:text-sm md:text-base lg:text-lg`}
                        >
                          <span className="relative z-10 font-semibold">{link.label}</span>
                        </motion.div>
                      </a>
                    );
                  }
                  if (link.path.startsWith("#")) {
                    return (
                      <a
                        key={link.path}
                        href={link.path}
                        className="relative group"
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(link.path.substring(1));
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth" });
                          }
                          if (location.pathname !== "/") {
                            window.location.href = `/${link.path}`;
                          }
                        }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-medium transition-all duration-300 glass-orange-outline text-xs sm:text-sm md:text-base lg:text-lg`}
                        >
                          <span className="relative z-10 font-semibold">{link.label}</span>
                        </motion.div>
                      </a>
                    );
                  }
                  return (
                    <Link key={link.path} to={link.path} className="relative group">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-medium transition-all duration-300 glass-orange-outline text-xs sm:text-sm md:text-base lg:text-lg`}
                      >
                        <span className="relative z-10 font-semibold">{link.label}</span>
                      </motion.div>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
