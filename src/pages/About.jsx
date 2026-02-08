import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fetchContent } from "../redux/slices/contentSlice";
import Container from "../components/common/Container";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { Card, CardContent } from "../components/ui/Card";
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
              About Danvion Ltd.
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {aboutPage?.title || "Innovating at the Edge"}
            </h1>
            <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
              {aboutPage?.description ||
                "Leading innovators in Edge AI solutions and product development"}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Content */}
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
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

            {/* Image */}
            {aboutPage?.about_image_url && (
              <motion.div
                custom={1}
                variants={contentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
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
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-secondary/20">
        <Container>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-semibold text-foreground mb-16 text-center"
          >
            Our Mission & Vision
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ translateY: -8 }}
            >
              <Card className="h-full hover:shadow-xl transition-all">
                <CardContent className="pt-8">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Our Mission
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {aboutPage?.mission ||
                      "To empower organizations with intelligent, efficient Edge AI solutions that drive innovation, reduce latency, and enhance user experiences."}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              custom={1}
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ translateY: -8 }}
            >
              <Card className="h-full hover:shadow-xl transition-all">
                <CardContent className="pt-8">
                  <div className="text-4xl mb-4">🌟</div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Our Vision
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {aboutPage?.vision ||
                      "A future where intelligent computing is ubiquitous at the edge, enabling real-time insights and autonomous systems globally."}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <Container>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-16 text-center"
          >
            Our Core Values
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                emoji: "💡",
                description:
                  "We constantly push the boundaries of what's possible in Edge AI.",
              },
              {
                title: "Excellence",
                emoji: "✨",
                description:
                  "We deliver high-quality solutions that exceed expectations.",
              },
              {
                title: "Partnership",
                emoji: "🤝",
                description:
                  "We work closely with clients to understand and solve their challenges.",
              },
              {
                title: "Integrity",
                emoji: "🔒",
                description:
                  "We conduct business with honesty, transparency, and accountability.",
              },
              {
                title: "Sustainability",
                emoji: "🌱",
                description:
                  "We develop efficient solutions that minimize environmental impact.",
              },
              {
                title: "Expertise",
                emoji: "🧠",
                description:
                  "Our team brings deep knowledge and experience to every project.",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                custom={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ translateY: -8 }}
              >
                <Card className="h-full text-center hover:shadow-xl transition-all">
                  <CardContent className="pt-8">
                    <div className="text-5xl mb-4">{value.emoji}</div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary/20">
        <Container>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-16 text-center"
          >
            Join Our Growing Team
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {team.length > 0 ? (
              team.map((member, i) => (
                <motion.div
                  key={member.id || i}
                  custom={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ translateY: -8 }}
                >
                  <Card className="overflow-hidden h-full hover:shadow-xl transition-all">
                    <div className="aspect-square overflow-hidden bg-secondary">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-bold text-foreground">
                        {member.name}
                      </h3>
                      <p className="text-primary font-medium text-sm">
                        {member.role}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="md:col-span-3 text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Team updates coming soon.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-foreground text-background">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Let's Work Together
            </h2>
            <p className="text-xl text-background/80 mb-10 leading-relaxed">
              Discover how Danvion can help transform your products with Edge AI
              solutions.
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-background text-background hover:bg-background/10 group"
              >
                Contact Us Today
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
