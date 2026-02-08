import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchContent } from "../redux/slices/contentSlice";
import Container from "../components/common/Container";
import ContactForm from "../components/common/ContactForm";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebaseClient";
import { useLocation } from "react-router-dom";

/**
 * Contact Us Page
 * Contact form and company contact information
 */
export default function Contact() {
  const dispatch = useDispatch();
  const homePage = useSelector((state) => state.content.homePage);
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  const initialMessage = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const product = params.get("product") || "";
    const intent = params.get("intent") || "";
    if (!product && !intent) return "";

    const intentLabel = intent === "demo" ? "a demo request" : "an inquiry";
    if (product) {
      return `Hi, I'm interested in ${product}. This is ${intentLabel}.`;
    }
    return `Hi, this is ${intentLabel}.`;
  }, [location.search]);

  const contactInfo = [
    {
      title: "Email",
      value: homePage?.footer_email || "",
      icon: "✉️",
      href: homePage?.footer_email ? `mailto:${homePage.footer_email}` : "",
    },
    {
      title: "Phone",
      value: homePage?.footer_phone || "",
      icon: "📞",
      href: homePage?.footer_phone ? `tel:${homePage.footer_phone}` : "",
    },
    {
      title: "Address",
      value: homePage?.footer_address || "",
      icon: "📍",
    },
  ].filter((info) => info.value);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-edge-blue/10 to-blue-200/10 py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-brand-black mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about our Edge AI solutions? We'd love to hear from
              you. Contact our team anytime.
            </p>
          </motion.div>
        </Container>
      </div>

      {/* Contact Info Cards */}
      <Container className="py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {contactInfo.map((info, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="text-center bg-white rounded-2xl p-8 relative group cursor-pointer overflow-hidden border-2 border-gray-200 shadow-lg orange-pop-hover"
            >
              {/* Glass effect overlay on hover */}
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-gray-100/70 opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/60 shadow-2xl transition-all duration-300"></span>
              <div className="relative z-10">
                <div className="text-4xl mb-4">{info.icon}</div>
                <h3 className="text-xl font-bold text-brand-black mb-2">
                  {info.title}
                </h3>
                {info.href ? (
                  <a
                    href={info.href}
                    className="text-brand-orange hover:text-brand-orange font-medium"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-gray-600">{info.value}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 rounded-none p-12 mb-20">
          <ContactForm
            title="Send Us a Message"
            initialMessage={initialMessage}
            onSubmit={async (data) => {
              const payload = {
                name: data.name,
                email: data.email,
                phone: data.phone || null,
                company: data.company || null,
                message: data.message,
                created_at: serverTimestamp(),
              };

              await addDoc(collection(db, "contact_messages"), payload);
            }}
          />
        </div>
      </Container>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-20">
        <Container>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-brand-black mb-12 text-center"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "What industries do you serve?",
                answer:
                  "We work across multiple sectors including IoT, automotive, healthcare, manufacturing, and consumer electronics, bringing Edge AI expertise to any industry requiring intelligent edge computing solutions.",
              },
              {
                question: "Can you develop custom solutions?",
                answer:
                  "Absolutely! We specialize in custom Edge AI development tailored to your specific requirements, business goals, and technical constraints.",
              },
              {
                question: "What is your typical project timeline?",
                answer:
                  "Timelines vary based on complexity. Simple integrations might take 2-4 weeks, while comprehensive product development typically spans 2-6 months.",
              },
              {
                question: "Do you provide post-deployment support?",
                answer:
                  "Yes, we offer comprehensive support packages including maintenance, optimization, and updates to ensure your Edge AI solutions perform optimally.",
              },
              {
                question: "What hardware platforms do you support?",
                answer:
                  "We support various platforms including NVIDIA Jetson, Qualcomm Snapdragon, ARM-based devices, x86 embedded systems, and custom hardware solutions.",
              },
              {
                question: "How do you ensure data security?",
                answer:
                  "We implement industry-standard security practices including encryption, secure boot, and privacy-by-design principles in all our solutions.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="bg-white rounded-lg p-6"
              >
                <h3 className="text-lg font-bold text-brand-black mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>

      {/* Map Section */}
      <Container className="py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-lg overflow-hidden"
        >
          <iframe
            title="Company Location"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(homePage?.footer_address || "Global")}&output=embed`}
            className="w-full h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </Container>
    </div>
  );
}
