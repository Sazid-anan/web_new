import Container from "../components/common/Container";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchContent } from "../redux/slices/contentSlice";

/**
 * Product Development Page
 * Showcases Edge AI product development services
 */
export default function ProductDevelopment() {
  const dispatch = useDispatch();
  const { servicesPage } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  // Build services from Redux state
  const services = [1, 2, 3, 4, 5, 6]
    .map((num) => ({
      icon: servicesPage?.[`service_${num}_icon`] || "⚙️",
      title: servicesPage?.[`service_${num}_title`] || "",
      description: servicesPage?.[`service_${num}_desc`] || "",
    }))
    .filter((s) => s.title); // Only show services with titles

  // Build process steps from Redux state
  const process = [1, 2, 3, 4]
    .map((num) => ({
      step: num,
      title: servicesPage?.[`process_${num}_title`] || "",
      description: servicesPage?.[`process_${num}_desc`] || "",
    }))
    .filter((p) => p.title); // Only show steps with titles

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-edge-blue/10 to-blue-200/10 py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-brand-black mb-6">
              {servicesPage?.hero_title || "Edge AI Product Development"}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {servicesPage?.hero_description ||
                "From concept to deployment, we deliver cutting-edge AI solutions optimized for edge devices and embedded systems."}
            </p>
          </motion.div>
        </Container>
      </div>

      {/* Services Grid */}
      <Container className="py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-brand-black mb-12 text-center"
        >
          {servicesPage?.services_section_title || "Our Services"}
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="bg-white p-8 rounded-2xl relative group cursor-pointer overflow-hidden border-2 border-gray-200 shadow-lg orange-pop-hover"
            >
              {/* Glass effect overlay on hover */}
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-gray-100/70 opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/60 shadow-2xl transition-all duration-300"></span>
              <div className="relative z-10">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-brand-black mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Development Process */}
      <div className="bg-gray-50 py-20">
        <Container>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-brand-black mb-12 text-center"
          >
            {servicesPage?.process_section_title || "Our Development Process"}
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={contentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative"
              >
                {/* Connector Line */}
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-brand-orange/30 z-0"></div>
                )}

                {/* Card */}
                <div className="relative z-10 bg-white rounded-2xl p-6 shadow-md group cursor-pointer overflow-hidden border-2 border-gray-200">
                  {/* Glass effect overlay on hover */}
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-gray-100/70 opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/60 shadow-2xl transition-all duration-300"></span>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-brand-orange text-brand-black rounded-full flex items-center justify-center text-lg font-bold mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-bold text-brand-black mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="bg-brand-orange text-brand-black py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              {servicesPage?.cta_title || "Ready to Develop?"}
            </h2>
            <p className="text-lg mb-8 leading-relaxed">
              {servicesPage?.cta_description ||
                "Let's discuss your Edge AI product development needs and create a roadmap for success."}
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                className="!bg-white !text-brand-orange font-bold hover:!bg-gray-50"
              >
                {servicesPage?.cta_button_text || "Get Started Today"}
              </Button>
            </Link>
          </motion.div>
        </Container>
      </div>
    </div>
  );
}
