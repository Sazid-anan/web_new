import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchContent } from "../redux/slices/contentSlice";
import ImageSlider from "../components/common/ImageSlider";
import Container from "../components/common/Container";
import Button from "../components/common/Button";
import CompanyStatsSection from "../components/CompanyStatsSection";
import { Link } from "react-router-dom";

/**
 * Home Page
 * Hero section with image slider and featured content
 */
export default function Home() {
  const dispatch = useDispatch();
  const { homePage, sliders } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  const sliderImages = sliders?.map((s) => s.image_url) || [];
  const heroImageUrl = homePage?.hero_image_url || "";
  const heroImageDetails = homePage?.hero_image_details || "";
  const sectionTitle = homePage?.section_title || "Edge AI Excellence";
  const sectionTextOne =
    homePage?.section_text_one ||
    "At Danvion, we specialize in bringing artificial intelligence to the edge of your networks and devices. Our solutions enable real-time processing, reduced latency, and enhanced privacy protocols.";
  const sectionTextTwo =
    homePage?.section_text_two ||
    "Whether you're looking to optimize existing hardware or develop new AI-powered products, our team of experts is ready to help you innovate and scale.";
  const sectionCtaText = "Learn More";
  const sectionCtaLink = homePage?.section_cta_link || "/products";
  const capabilitiesTitle = homePage?.capabilities_title || "Our Capabilities";

  // Second section data
  const section2Title = homePage?.section2_title || "";
  const section2TextOne = homePage?.section2_text_one || "";
  const section2TextTwo = homePage?.section2_text_two || "";
  const section2CtaText = "Learn More";
  const section2CtaLink = homePage?.section2_cta_link || "/products";
  const hero2ImageUrl = homePage?.hero2_image_url || "";
  const hero2ImageDetails = homePage?.hero2_image_details || "";
  const capabilities = [
    {
      title: homePage?.capability_1_title || "Embedded AI",
      description:
        homePage?.capability_1_desc ||
        "Deploy intelligent algorithms directly on edge devices with minimal latency and maximum efficiency.",
    },
    {
      title: homePage?.capability_2_title || "Hardware Integration",
      description:
        homePage?.capability_2_desc ||
        "Seamless integration with IoT devices and embedded systems for comprehensive AI solutions.",
    },
    {
      title: homePage?.capability_3_title || "Real-Time Processing",
      description:
        homePage?.capability_3_desc ||
        "Process data at the source for instant responses and improved user experiences.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Image Slider */}
      <div className="h-[500px] md:h-[600px] relative">
        <ImageSlider images={sliderImages} autoPlay={true} interval={5000} />

        {/* Hero Text Overlay */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center text-white"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {homePage?.headline || "Edge AI Solutions"}
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
                {homePage?.description ||
                  "Transform your products with intelligent edge computing"}
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link to="/products">
                  <Button
                    size="lg"
                    className="!bg-brand-orange/70 !text-white font-bold shadow-2xl hover:!bg-brand-orange hover:!text-white hover:!shadow-2xl hover:!shadow-brand-orange/70 hover:scale-105 transition-all backdrop-blur-xl"
                  >
                    Explore Products
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="!bg-brand-orange/70 !text-white font-bold shadow-2xl hover:!bg-brand-orange hover:!text-white hover:!shadow-2xl hover:!shadow-brand-orange/70 hover:scale-105 transition-all backdrop-blur-xl"
                  >
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </motion.div>
          </Container>
        </div>
      </div>

      {/* Main Content Section */}
      <Container className="py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Content */}
          <motion.div
            custom={0}
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-brand-black mb-6">
              {sectionTitle}
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {sectionTextOne}
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {sectionTextTwo}
            </p>
            <Link to={sectionCtaLink}>
              <Button>{sectionCtaText}</Button>
            </Link>
          </motion.div>

          {/* Right Image */}
          <motion.div
            custom={1}
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={heroImageUrl}
              alt="Edge AI Solutions"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            {heroImageDetails && (
              <div className="p-4 bg-white border-t text-sm text-gray-600">
                {heroImageDetails}
              </div>
            )}
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-50 rounded-lg p-12 mb-20"
        >
          <h2 className="text-4xl font-bold text-brand-black mb-12 text-center">
            {capabilitiesTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {capabilities.map((feature, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={contentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-8 relative group cursor-pointer overflow-hidden border-2 border-gray-200 shadow-md orange-pop-hover"
              >
                {/* Glass effect overlay on hover */}
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-gray-100/70 opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/60 shadow-2xl transition-all duration-300"></span>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-brand-orange mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Second Hero & Middle Section */}
        {section2Title && (
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            {/* Left Image */}
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden shadow-lg order-2 md:order-1"
            >
              <img
                src={hero2ImageUrl}
                alt="Section 2"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              {hero2ImageDetails && (
                <div className="p-4 bg-white border-t text-sm text-gray-600">
                  {hero2ImageDetails}
                </div>
              )}
            </motion.div>

            {/* Right Content */}
            <motion.div
              custom={1}
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <h2 className="text-5xl font-bold text-brand-black mb-6">
                {section2Title}
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {section2TextOne}
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {section2TextTwo}
              </p>
              <Link to={section2CtaLink}>
                <Button>{section2CtaText}</Button>
              </Link>
            </motion.div>
          </div>
        )}

        {/* Company Stats Section */}
        <CompanyStatsSection />

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center py-12"
        >
          <h2 className="text-4xl font-bold text-brand-black mb-6">
            Ready to Transform Your Products?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact our team today to discuss your Edge AI requirements and
            discover how we can help.
          </p>
          <Link to="/contact">
            <Button size="lg">Start Your Journey</Button>
          </Link>
        </motion.div>
      </Container>
    </div>
  );
}
