import { motion } from "framer-motion";
import Container from "./common/Container";

/**
 * Company Stats Section
 * Display company metrics and achievements
 */
export default function CompanyStatsSection() {
  const stats = [
    {
      icon: "🏢",
      value: "50+",
      label: "Enterprise Clients",
    },
    {
      icon: "🚀",
      value: "150+",
      label: "Products Deployed",
    },
    {
      icon: "👥",
      value: "180+",
      label: "Team Members",
    },
    {
      icon: "🌍",
      value: "25+",
      label: "Countries Served",
    },
  ];

  return (
    <div className="bg-brand-orange text-white py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">By The Numbers</h2>
          <p className="text-lg text-white opacity-90 max-w-2xl mx-auto">
            Trusted by leading organizations worldwide
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              custom={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-5xl mb-4 inline-block"
              >
                {stat.icon}
              </motion.div>
              <motion.p
                className="text-5xl font-bold text-white mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-white text-sm font-medium tracking-wide opacity-90">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}
