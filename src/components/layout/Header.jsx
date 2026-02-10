import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * Header Component
 * Main navigation for the website
 * Responsive with mobile menu
 */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

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
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white md:bg-white/95 md:backdrop-blur-sm shadow-sm border-b border-gray-100/60"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
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
              className="h-10 w-10"
              whileHover={{
                scale: 1.1,
                rotate: [0, -10, 10, -10, 0],
              }}
              transition={{
                scale: { duration: 0.2 },
                rotate: { duration: 0.6 },
              }}
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-[24px] font-bold text-brand-black"
            >
              DANVION
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-2">
              {navLinks.map((link) => {
                if (link.label === "Home") {
                  return (
                    <a
                      key={link.path}
                      href={link.path}
                      className="relative group"
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        if (location.pathname === "/") {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } else {
                          window.location.href = "/";
                        }
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`px-5 py-2 rounded-full font-medium transition-all duration-300 glass-orange-outline`}
                      >
                        <span className="relative z-10 font-semibold">
                          {link.label}
                        </span>
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
                        const el = document.getElementById(
                          link.path.substring(1),
                        );
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth" });
                        }
                        setMobileMenuOpen(false);
                        if (location.pathname !== "/") {
                          window.location.href = `/${link.path}`;
                        }
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`px-5 py-2 rounded-full font-medium transition-all duration-300 glass-orange-outline`}
                      >
                        <span className="relative z-10 font-semibold">
                          {link.label}
                        </span>
                      </motion.div>
                    </a>
                  );
                }
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`px-5 py-2 rounded-full font-medium transition-all duration-300 glass-orange-outline`}
                    >
                      <span className="relative z-10 font-semibold">
                        {link.label}
                      </span>
                    </motion.div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            className="md:hidden flex flex-col gap-2 p-3.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span
              className={`w-8 h-1 bg-[#FF6F00] transition-all ${mobileMenuOpen ? "rotate-45 translate-y-3" : ""}`}
            ></span>
            <span
              className={`w-8 h-1 bg-[#FF6F00] transition-all ${mobileMenuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`w-8 h-1 bg-[#FF6F00] transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-3" : ""}`}
            ></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            id="mobile-nav"
            className="md:hidden py-5 flex flex-col gap-4 border-t border-gray-200 bg-white"
          >
            {navLinks.map((link) => {
              if (link.label === "Home") {
                return (
                  <a
                    key={link.path}
                    href={link.path}
                    className="relative group"
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      if (location.pathname === "/") {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        window.location.href = "/";
                      }
                    }}
                  >
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ scale: 1.02 }}
                      className={`px-6 py-4 rounded-full font-semibold text-base transition-all duration-300 glass-orange-outline text-center`}
                    >
                      <span className="relative z-10">{link.label}</span>
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
                      const el = document.getElementById(
                        link.path.substring(1),
                      );
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                      setMobileMenuOpen(false);
                      if (location.pathname !== "/") {
                        window.location.href = `/${link.path}`;
                      }
                    }}
                  >
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ scale: 1.02 }}
                      className={`px-6 py-4 rounded-full font-semibold text-base transition-all duration-300 glass-orange-outline text-center`}
                    >
                      <span className="relative z-10">{link.label}</span>
                    </motion.div>
                  </a>
                );
              }
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="relative group"
                >
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.02 }}
                    className={`px-6 py-4 rounded-full font-semibold text-base transition-all duration-300 glass-orange-outline text-center`}
                  >
                    <span className="relative z-10">{link.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
