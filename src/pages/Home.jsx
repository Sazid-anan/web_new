import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fetchContent } from "../redux/slices/contentSlice";
import Container from "../components/common/Container";
import Button from "../components/ui/Button";
import HeroAnimationSection from "../components/HeroAnimationSection";
import HeroTextSection from "../components/HeroTextSection";
import CapabilitiesSection from "../components/CapabilitiesSection";
import ImageSliderSection from "../components/ImageSliderSection";
import { Link } from "react-router-dom";

/**
 * Home Page
 * Modern SaaS landing page with hero section and featured content
 */
export default function Home() {
  const dispatch = useDispatch();
  const { homePage } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  const section2Title = homePage?.section2_title || "";
  const section2TextOne = homePage?.section2_text_one || "";
  const section2TextTwo = homePage?.section2_text_two || "";
  const hero2ImageUrl = homePage?.hero2_image_url || "";
  const hero2ImageDetails = homePage?.hero2_image_details || "";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Text Section */}
      <HeroTextSection homePage={homePage} />

      {/* Hero Section - Design System Animation */}
      <HeroAnimationSection />

      {/* Image Slider Section */}
      <ImageSliderSection />

      {/* Capabilities Section */}
      <CapabilitiesSection homePage={homePage} />

      {/* Second Section */}
      <section className="py-20">
        <Container>
          {section2Title && (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                <h2 className="text-3xl lg:text-4xl font-semibold mb-6 text-foreground">
                  {section2Title}
                </h2>
                <p className="text-base lg:text-lg text-muted-foreground mb-4 leading-relaxed">
                  {section2TextOne}
                </p>
                <p className="text-base lg:text-lg text-muted-foreground mb-8 leading-relaxed">
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
          )}
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl lg:text-5xl font-semibold mb-6">
              Ready to Transform Your Products?
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground mb-10 leading-relaxed">
              Contact our team today to discuss your Edge AI requirements and
              discover how we can help you innovate and scale.
            </p>
            <Link to="/contact">
              <Button size="lg" className="group">
                Start Your Journey
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
