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
    { path: "/products", label: "Products" },
    { path: "/product-development", label: "Services" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-md border-b-2 border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
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
              className="text-2xl font-bold text-brand-black"
            >
              DANVION
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-2">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className="relative group">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`px-5 py-2 rounded-full font-medium transition-all duration-300 orange-pop-hover ${
                      isActive(link.path)
                        ? "bg-brand-orange text-brand-black shadow-lg"
                        : "bg-transparent text-brand-orange hover:text-brand-black"
                    }`}
                  >
                    {/* Glass effect background on hover for inactive links */}
                    {!isActive(link.path) && (
                      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-100/80 to-gray-200/90 opacity-0 group-hover:opacity-100 backdrop-blur-md border border-gray-300 shadow-lg transition-all duration-300 -z-10"></span>
                    )}
                    <span className="relative z-10 font-semibold">
                      {link.label}
                    </span>
                  </motion.div>
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span
              className={`w-6 h-0.5 bg-brand-black transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-brand-black transition-all ${mobileMenuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-brand-black transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            id="mobile-nav"
            className="md:hidden py-4 flex flex-col gap-2 border-t border-gray-200"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="relative group"
              >
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className={`px-5 py-3 rounded-full font-semibold transition-all duration-300 orange-pop-hover ${
                    isActive(link.path)
                      ? "bg-brand-orange text-brand-black shadow-lg"
                      : "bg-transparent text-brand-orange hover:text-brand-black"
                  }`}
                >
                  {/* Glass effect background on hover/tap for inactive links */}
                  {!isActive(link.path) && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-100/80 to-gray-200/90 opacity-0 group-hover:opacity-100 backdrop-blur-md border border-gray-300 shadow-lg transition-all duration-300 -z-10"></span>
                  )}
                  <span className="relative z-10">{link.label}</span>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
