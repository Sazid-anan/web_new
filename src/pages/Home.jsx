import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "../components/common/Container";
import Button from "../components/ui/Button";
import ImageSliderSection from "../components/ImageSliderSection";
import HeroTextSection from "../components/HeroTextSection";
import CapabilitiesSection from "../components/CapabilitiesSection";
import PhasesSection from "../components/PhasesSection";
import { Link } from "react-router-dom";
import Badge from "../components/ui/Badge";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebaseClient";

/**
 * Home Page
 * Modern SaaS landing page with hero section and featured content
 */
export default function Home() {
  const location = useLocation();
  const { homePage } = useSelector((state) => state.content);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Section 2 variables
  const section2Title = homePage?.section2_title || "";
  const section2TextOne = homePage?.section2_text_one || "";
  const section2TextTwo = homePage?.section2_text_two || "";
  const hero2ImageUrl = homePage?.hero2_image_url || "";
  const hero2ImageDetails = homePage?.hero2_image_details || "";

  // Scroll to section if hash is present in URL
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.substring(1));
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100); // Delay to ensure DOM is ready
      }
    }
  }, [location.hash]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message,
        created_at: serverTimestamp(),
      };

      await addDoc(collection(db, "contact_messages"), payload);
      setFormSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setFormSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  // Default: show full Home page
  return (
    <div className="min-h-screen">
      {/* Hero Text Section */}
      <HeroTextSection />
      {/* Capabilities Section */}
      <CapabilitiesSection homePage={homePage} />
      {/* Phases Section */}
      <PhasesSection />
      {/* Image Slider Section */}
      <ImageSliderSection
        images={[
          {
            src: "/images/1.jpg",
            name: "Future Tech",
            description: "A glimpse into tomorrow's technology.",
          },
          {
            src: "/images/2.png",
            name: "Smart Device",
            description: "Smart device for modern living.",
          },
          {
            src: "/images/3.jpg",
            name: "Innovative Design",
            description: "Sleek and innovative product design.",
          },
          {
            src: "/images/4.jpg",
            name: "Cutting-Edge",
            description: "Pushing the boundaries of technology.",
          },
        ]}
        badge="Our Products"
        title="Our Designed Products"
        autoPlay={true}
        interval={35000}
      />
      {/* Contact Section */}
      <section
        id="contact"
        className="py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24 font-sans"
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-14 lg:mb-16 px-4"
          >
            <span className="inline-flex items-center justify-center rounded-md border px-2.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 bg-brand-orange/10 text-brand-orange border-brand-orange/20 mb-3 sm:mb-4 inline-block">
              Contact Us
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-5 md:mb-6">
              Get In Touch
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
              We'd love to hear from you!
            </p>
          </motion.div>

          {/* Two Column Layout: Cards + Form */}
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            {/* Left Column: Innovation Message */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex items-start justify-start w-full"
            >
              <div className="w-full text-left">
                <h2
                  className="font-bold leading-[0.9] tracking-tighter"
                  style={{ fontSize: "clamp(48px, 10vw, 132px)" }}
                >
                  <span
                    className="block mb-2"
                    style={{
                      background:
                        "linear-gradient(90deg, #030213 0%, #f37106 50%, #030213 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Let's Innovate
                  </span>
                  <span
                    className="block"
                    style={{
                      background:
                        "linear-gradient(90deg, #f37106 0%, #d4560e 50%, #f37106 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    With Danvion
                  </span>
                </h2>
              </div>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6 sm:mb-7 md:mb-8 text-center md:text-left mt-2 sm:mt-3 md:mt-4">
                  Send a Message
                </h2>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 sm:space-y-6"
                >
                  {/* Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-4 sm:mt-5 md:mt-6"
                  >
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder=""
                      className="w-full px-4 sm:px-5 md:px-6 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 bg-white shadow-sm hover:shadow-md text-base"
                    />
                  </motion.div>
                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                  >
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder=""
                      className="w-full px-4 sm:px-5 md:px-6 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 bg-white shadow-sm hover:shadow-md text-base"
                    />
                  </motion.div>
                  {/* Phone */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                  >
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder=""
                      className="w-full px-4 sm:px-5 md:px-6 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 bg-white shadow-sm hover:shadow-md text-base"
                    />
                  </motion.div>
                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder=""
                      className="w-full px-4 sm:px-5 md:px-6 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 bg-white shadow-sm hover:shadow-md resize-none text-base"
                    />
                  </motion.div>
                  {/* Submit Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full glass-orange font-bold rounded-full py-3.5 px-8 transition-all duration-300 disabled:opacity-70 text-base sm:text-lg"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </motion.button>
                  {/* Success Message */}
                  {formSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-green-50 border border-green-200 rounded-lg text-center text-green-800 font-medium"
                    >
                      Thank you! We'll get back to you soon.
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Second Section */}
      {section2Title && (
        <section className="py-12 sm:py-16 md:py-20">
          <Container>
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
              {/* Left Image */}
              {hero2ImageUrl && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1"
                >
                  <img
                    src={hero2ImageUrl}
                    alt={hero2ImageDetails || "Solutions"}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
              )}
              {/* Right Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 lg:order-2"
              >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-5 md:mb-6 text-foreground">
                  {section2Title}
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                  {section2TextOne}
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-7 md:mb-8 leading-relaxed">
                  {section2TextTwo}
                </p>
                <Link to="/products">
                  <Button size="lg" className="group">
                    Discover More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
