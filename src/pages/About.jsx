import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchContent } from "../redux/slices/contentSlice";
import Container from "../components/common/Container";
import Button from "../components/common/Button";
import TestimonialsSection from "../components/TestimonialsSection";
import { Link } from "react-router-dom";

/**
 * About Us Page
 * Company information, mission, vision, and team
 */
export default function About() {
  const dispatch = useDispatch();
  const { aboutPage, teamMembers } = useSelector((state) => state.content);

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

  // Use Redux teamMembers only (no fallback placeholders)
  const team = teamMembers || [];

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
              {aboutPage?.title || "About Danvion Ltd."}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {aboutPage?.description ||
                "Leading innovators in Edge AI solutions and product development"}
            </p>
          </motion.div>
        </Container>
      </div>

      {/* Company Overview */}
      <Container className="py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Content */}
          <motion.div
            custom={0}
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-brand-black mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {aboutPage?.story_paragraph_1 ||
                "Founded with a vision to democratize Edge AI technology, Danvion Ltd. has been at the forefront of embedded intelligence innovation for over a decade."}
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {aboutPage?.story_paragraph_2 ||
                "We work with leading companies across industries to integrate artificial intelligence directly into their products, enabling real-time decision-making at the edge of networks."}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {aboutPage?.story_paragraph_3 ||
                "Our team of expert engineers, researchers, and product specialists are committed to delivering innovative solutions that transform how businesses leverage AI."}
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            custom={1}
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            {aboutPage?.about_image_url && (
              <img
                src={aboutPage.about_image_url}
                alt="Our team"
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
        </div>
      </Container>

      {/* Mission & Vision */}
      <div className="bg-gray-50 py-20">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl p-8 shadow-lg relative group cursor-pointer overflow-hidden border-2 border-gray-200 orange-pop-hover"
            >
              {/* Glass effect overlay on hover */}
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-gray-100/70 opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/60 shadow-2xl transition-all duration-300"></span>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-brand-orange mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {aboutPage?.mission ||
                    "To empower organizations with intelligent, efficient Edge AI solutions that drive innovation, reduce latency, and enhance user experiences while maintaining data privacy and security."}
                </p>
              </div>
            </motion.div>

            <motion.div
              custom={1}
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl p-8 shadow-lg relative group cursor-pointer overflow-hidden border-2 border-gray-200 orange-pop-hover"
            >
              {/* Glass effect overlay on hover */}
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-gray-100/70 opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/60 shadow-2xl transition-all duration-300"></span>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-brand-orange mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {aboutPage?.vision ||
                    "A future where intelligent computing is ubiquitous at the edge, enabling real-time insights and autonomous systems that improve human life and business outcomes globally."}
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Core Values */}
      <Container className="py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-brand-black mb-12 text-center"
        >
          Our Core Values
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Innovation",
              description:
                "We constantly push the boundaries of what's possible in Edge AI.",
            },
            {
              title: "Excellence",
              description:
                "We deliver high-quality solutions that exceed expectations.",
            },
            {
              title: "Partnership",
              description:
                "We work closely with our clients to understand and solve their challenges.",
            },
            {
              title: "Integrity",
              description:
                "We conduct business with honesty, transparency, and accountability.",
            },
            {
              title: "Sustainability",
              description:
                "We develop efficient solutions that minimize environmental impact.",
            },
            {
              title: "Expertise",
              description:
                "Our team brings deep knowledge and experience to every project.",
            },
          ].map((value, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="text-center relative group cursor-pointer p-6 rounded-2xl overflow-hidden"
            >
              {/* Glass effect overlay on hover */}
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-gray-100/60 opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/50 shadow-xl transition-all duration-300"></span>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl">✓</div>
                </div>
                <h3 className="text-xl font-bold text-brand-black mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Team Section */}
      <div className="bg-gray-50 py-20">
        <Container>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-brand-black mb-12 text-center"
          >
            Join our growing team of Edge AI experts
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {team.length > 0 ? (
              team.map((member, i) => (
                <motion.div
                  key={member.id || i}
                  custom={i}
                  variants={contentVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="text-center relative group cursor-pointer"
                >
                  <div className="rounded-2xl overflow-hidden mb-4 shadow-lg border-2 border-gray-200 relative">
                    {/* Glass effect overlay on hover */}
                    <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-gray-100/50 opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/40 shadow-2xl transition-all duration-300 z-10"></span>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-brand-black mb-1">
                    {member.name}
                  </h3>
                  <p className="text-brand-orange font-semibold">
                    {member.role}
                  </p>
                </motion.div>
              ))
            ) : (
              <div className="md:col-span-3 text-center text-gray-600">
                Team updates coming soon.
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <div className="bg-brand-orange text-brand-black py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-lg mb-8 leading-relaxed">
              Discover how Danvion can help transform your products with Edge AI
              solutions.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-brand-orange font-bold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Contact Us Today
              </motion.button>
            </Link>
          </motion.div>
        </Container>
      </div>
    </div>
  );
}
