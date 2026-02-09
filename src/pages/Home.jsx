import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import Container from "../components/common/Container";
import Button from "../components/ui/Button";
import HeroAnimationSection from "../components/HeroAnimationSection";
import ImageSliderSection from "../components/ImageSliderSection";
import HeroTextSection from "../components/HeroTextSection";
import CapabilitiesSection from "../components/CapabilitiesSection";
import { Link } from "react-router-dom";
import Badge from "../components/ui/Badge";
import ContactForm from "../components/common/ContactForm";

/**
 * Home Page
 * Modern SaaS landing page with hero section and featured content
 */
export default function Home() {
  const location = useLocation();
  const { homePage, aboutPage } = useSelector((state) => state.content);

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

  // Default: show full Home page
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Text Section */}
      <HeroTextSection homePage={homePage} />
      {/* Hero Section - Design System Animation */}
      <HeroAnimationSection />
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
      {/* Capabilities Section */}
      <CapabilitiesSection homePage={homePage} />
      {/* About Section */}
      <section id="about" className="py-20 lg:py-32 bg-secondary/20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4 inline-block">
              About Danvion Ltd.
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {aboutPage?.title || "Innovating at the Edge"}
            </h1>
            <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {aboutPage?.description ||
                "Leading innovators in Edge AI solutions and product development"}
            </p>
          </motion.div>
          {/* Company Story */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <Badge variant="outline">Our Story</Badge>
              </div>
              <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-8">
                Built on Innovation and Expertise
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {aboutPage?.story_paragraph_1 ||
                    "Founded with a vision to democratize Edge AI technology, Danvion Ltd. has been at the forefront of embedded intelligence innovation."}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {aboutPage?.story_paragraph_2 ||
                    "We work with leading companies across industries to integrate artificial intelligence directly into their products."}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {aboutPage?.story_paragraph_3 ||
                    "Our team of expert engineers, researchers, and product specialists are committed to delivering innovative solutions."}
                </p>
              </div>
            </motion.div>
            {aboutPage?.about_image_url && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src={aboutPage.about_image_url}
                  alt="Our team"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            )}
          </div>
          {/* Mission & Vision */}
          <div className="py-10 bg-secondary/20 rounded-xl">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl lg:text-4xl font-semibold text-foreground mb-16 text-center"
            >
              Our Mission & Vision
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="h-full hover:shadow-xl transition-all bg-white rounded-xl p-8">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Our Mission
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {aboutPage?.mission ||
                      "To empower organizations with intelligent, efficient Edge AI solutions that drive innovation, reduce latency, and enhance user experiences."}
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="h-full hover:shadow-xl transition-all bg-white rounded-xl p-8">
                  <div className="text-4xl mb-4">🌟</div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Our Vision
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {aboutPage?.vision ||
                      "A future where intelligent computing is ubiquitous at the edge, enabling real-time insights and autonomous systems globally."}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-32 bg-secondary/10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4 inline-block">
              Contact Us
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Get In Touch
            </h1>
            <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              We'd love to hear from you!
            </p>
            {/* Contact Info */}
            <div className="relative mb-8">
              <div className="pointer-events-none absolute -inset-8 bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.18),transparent_60%)] blur-3xl"></div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2 relative">
                <div className="group rounded-3xl p-[1px] bg-gradient-to-br from-brand-orange/35 via-white/70 to-slate-200/60 shadow-lg">
                  <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 text-left transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-orange/15 text-brand-orange ring-1 ring-brand-orange/20">
                        <Mail className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                          Email
                        </p>
                        <a
                          href="mailto:sazid@danvion.com"
                          className="mt-1 block text-base font-semibold text-foreground break-all"
                        >
                          sazid@danvion.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group rounded-3xl p-[1px] bg-gradient-to-br from-brand-orange/35 via-white/70 to-slate-200/60 shadow-lg">
                  <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 text-left transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-orange/15 text-brand-orange ring-1 ring-brand-orange/20">
                        <Phone className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                          Phone
                        </p>
                        <a
                          href="tel:01944226494"
                          className="mt-1 block text-base font-semibold text-foreground"
                        >
                          01944226494
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group rounded-3xl p-[1px] bg-gradient-to-br from-brand-orange/35 via-white/70 to-slate-200/60 shadow-lg lg:col-span-2">
                  <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 text-left transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-orange/15 text-brand-orange ring-1 ring-brand-orange/20">
                        <MapPin className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                          Address
                        </p>
                        <p className="mt-1 text-base font-semibold text-foreground">
                          79/Ka Siddiqia Madrasha Sonabangla Lane, Khulna
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ContactForm />
          </motion.div>
        </Container>
      </section>
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
    </div>
  );
}
