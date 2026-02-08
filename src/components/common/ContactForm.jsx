import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "./Button";

/**
 * ContactForm Component
 * Reusable contact form for inquiries
 */
export default function ContactForm({
  title = "Contact Us",
  onSubmit = null,
  initialMessage = "",
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!initialMessage) return;
    setFormData((prev) =>
      prev.message
        ? prev
        : {
            ...prev,
            message: initialMessage,
          },
    );
  }, [initialMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError("");

    try {
      if (onSubmit) {
        await onSubmit(formData);
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });

      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        error?.message || "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="max-w-2xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-brand-black mb-8 text-center">
        {title}
      </h2>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          role="status"
          className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
        >
          Thank you for your message! We'll get back to you soon.
        </motion.div>
      )}

      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
        >
          {submitError}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <motion.div
          custom={0}
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <label
            htmlFor="name"
            className="block text-sm font-medium text-brand-black mb-2"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-6 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 bg-white shadow-sm hover:shadow-md orange-pop-hover"
            placeholder="Your full name"
          />
        </motion.div>

        {/* Email */}
        <motion.div
          custom={1}
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <label
            htmlFor="email"
            className="block text-sm font-medium text-brand-black mb-2"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-6 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 bg-white shadow-sm hover:shadow-md orange-pop-hover"
            placeholder="your@email.com"
          />
        </motion.div>

        {/* Message */}
        <motion.div
          custom={2}
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <label
            htmlFor="message"
            className="block text-sm font-medium text-brand-black mb-2"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-6 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 bg-white shadow-sm hover:shadow-md resize-none orange-pop-hover"
            placeholder="Tell us about your inquiry..."
          ></textarea>
        </motion.div>

        {/* Phone */}
        <motion.div
          custom={3}
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-brand-black mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-6 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 bg-white shadow-sm hover:shadow-md orange-pop-hover"
            placeholder="+1 (555) 000-0000"
          />
        </motion.div>

        {/* Company */}
        <motion.div
          custom={4}
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <label
            htmlFor="company"
            className="block text-sm font-medium text-brand-black mb-2"
          >
            Company/Organization
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-6 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 bg-white shadow-sm hover:shadow-md orange-pop-hover"
            placeholder="Your company name"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div
          custom={5}
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
