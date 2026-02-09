import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

/**
 * Footer Component
 * Displays company info, links, and social media
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const homePage = useSelector((state) => state.content.homePage);

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-brand-black text-white mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-brand-orange">
              DANVION
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {homePage.footer_company_description ||
                "Leading provider of Edge AI solutions and product development services."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                to="/"
                className="text-gray-400 hover:text-brand-orange text-sm transition-colors"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-400 hover:text-brand-orange text-sm transition-colors"
              >
                Products
              </Link>
              <Link
                to="/about"
                className="text-gray-400 hover:text-brand-orange text-sm transition-colors"
              >
                About Us
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">
              Resources
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                to="/contact"
                className="text-gray-400 hover:text-brand-orange text-sm transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <p className="text-gray-400 text-sm">
                <strong>Email:</strong>
                <br />
                <a
                  href={`mailto:${homePage?.footer_email || "info@danvion.com"}`}
                  className="hover:text-brand-orange transition-colors"
                >
                  {homePage?.footer_email || "info@danvion.com"}
                </a>
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Phone:</strong>
                <br />
                <a
                  href={`tel:${homePage?.footer_phone || "+1234567890"}`}
                  className="hover:text-brand-orange transition-colors"
                >
                  {homePage?.footer_phone || "+1 (234) 567-890"}
                </a>
              </p>
              {homePage?.footer_address && (
                <p className="text-gray-400 text-sm">
                  <strong>Address:</strong>
                  <br />
                  {homePage.footer_address}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-gray-400 text-sm text-center">
            &copy; {currentYear} Danvion Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
