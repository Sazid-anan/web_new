import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Mail, Phone, MapPin } from "lucide-react";
import { fetchContent } from "../redux/slices/contentSlice";
import Container from "../components/common/Container";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { Card, CardContent } from "../components/ui/Card";
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
      icon: Mail,
      href: homePage?.footer_email ? `mailto:${homePage.footer_email}` : "",
    },
    {
      title: "Phone",
      value: homePage?.footer_phone || "",
      icon: Phone,
      href: homePage?.footer_phone ? `tel:${homePage.footer_phone}` : "",
    },
    {
      title: "Address",
      value: homePage?.footer_address || "",
      icon: MapPin,
    },
  ].filter((info) => info.value);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-secondary/20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4 inline-block">
              Let's Connect
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Get in Touch
            </h1>
            <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about our Edge AI solutions? We'd love to hear from
              you. Contact our team anytime and we'll respond within 24 hours.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <Container>
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ translateY: -8 }}
                >
                  <Card className="h-full text-center hover:shadow-xl transition-all">
                    <CardContent className="pt-8 flex flex-col items-center">
                      <div className="bg-primary/10 p-4 rounded-full mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {info.title}
                      </h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-primary hover:text-primary/80 font-medium break-all"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto bg-secondary/30 rounded-2xl p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Send Us a Message
            </h2>
            <ContactForm
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
          </motion.div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary/20">
        <Container>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-16 text-center"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: "What industries do you serve?",
                answer:
                  "We work across multiple sectors including IoT, automotive, healthcare, manufacturing, and consumer electronics.",
              },
              {
                question: "Can you develop custom solutions?",
                answer:
                  "Absolutely! We specialize in custom Edge AI development tailored to your specific requirements and business goals.",
              },
              {
                question: "What is your typical project timeline?",
                answer:
                  "Timelines vary based on complexity. Simple integrations take 2-4 weeks, while comprehensive development spans 2-6 months.",
              },
              {
                question: "Do you provide post-deployment support?",
                answer:
                  "Yes, we offer comprehensive support packages including maintenance, optimization, and updates.",
              },
              {
                question: "What hardware platforms do you support?",
                answer:
                  "We support NVIDIA Jetson, Qualcomm Snapdragon, ARM-based devices, x86 embedded systems, and custom hardware.",
              },
              {
                question: "How do you ensure data security?",
                answer:
                  "We implement industry-standard security practices including encryption, secure boot, and privacy-by-design principles.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Map Section */}
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <iframe
              title="Company Location"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(homePage?.footer_address || "Global")}&output=embed`}
              className="w-full h-96 md:h-[500px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
