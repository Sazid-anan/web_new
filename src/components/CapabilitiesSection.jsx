import { motion } from "framer-motion";
import Container from "./common/Container";

/**
 * CapabilitiesSection Component
 * Displays end-to-end engineering capabilities with category badges
 */
export default function CapabilitiesSection({ homePage }) {
  const capabilities = [
    {
      title: "PCB Design & Layout",
      category: "Hardware",
      description:
        "Custom circuit board design from concept to production. Multi-layer PCBs, high-speed signals, and power-efficient layouts.",
      icon: "📐",
    },
    {
      title: "Embedded Systems",
      category: "Hardware",
      description:
        "Complete embedded system development with ARM, RISC-V, and custom ASIC solutions tailored to your requirements.",
      icon: "⚙️",
    },
    {
      title: "Firmware Development",
      category: "Firmware",
      description:
        "Real-time firmware for microcontrollers and processors. RTOS, bare-metal, and custom bootloader development.",
      icon: "⚡",
    },
    {
      title: "Edge AI Integration",
      category: "AI",
      description:
        "Deploy machine learning models on edge devices. TensorFlow Lite, optimized neural networks, and custom accelerators.",
      icon: "🧠",
    },
    {
      title: "Wireless Connectivity",
      category: "Hardware",
      description:
        "Integrate WiFi, Bluetooth, LoRa, Zigbee, and cellular connectivity. From protocol selection to antenna design.",
      icon: "📡",
    },
    {
      title: "Security & Encryption",
      category: "Firmware",
      description:
        "Hardware security modules, secure boot, encrypted communication, and compliance with industry standards.",
      icon: "🔒",
    },
    {
      title: "Sensor Integration",
      category: "Hardware",
      description:
        "Multi-sensor fusion, calibration, and signal processing. Environmental, motion, and custom sensor solutions.",
      icon: "📊",
    },
    {
      title: "Power Management",
      category: "Hardware",
      description:
        "Ultra-low power designs, battery management systems, energy harvesting, and power optimization strategies.",
      icon: "🔋",
    },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      Hardware: "bg-blue-100 text-blue-700 border-blue-200",
      Firmware: "bg-purple-100 text-purple-700 border-purple-200",
      AI: "bg-orange-100 text-orange-700 border-orange-200",
    };
    return colors[category] || "bg-slate-100 text-slate-700 border-slate-200";
  };

  const getCategoryIconBg = (category) => {
    const colors = {
      Hardware: "bg-blue-50 border-blue-100",
      Firmware: "bg-purple-50 border-purple-100",
      AI: "bg-orange-50 border-orange-100",
    };
    return colors[category] || "bg-slate-50 border-slate-100";
  };

  return (
    <section className="py-20 bg-transparent">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-muted-foreground bg-white px-4 py-1.5 rounded-full border border-slate-200">
              What We Do
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl lg:text-4xl font-semibold mb-5 text-foreground"
          >
            {homePage?.capabilities_title ||
              "End-to-end engineering capabilities"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base lg:text-lg text-muted-foreground leading-relaxed"
          >
            {homePage?.capabilities_subtitle ||
              "From hardware design to edge AI deployment, we deliver complete engineering solutions that bring intelligent products to life."}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {capabilities.map((capability, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ translateY: -6 }}
              className="group"
            >
              <div className="h-full rounded-xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 p-6 flex flex-col">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-lg border flex items-center justify-center text-2xl mb-4 ${getCategoryIconBg(capability.category)}`}
                >
                  {capability.icon}
                </div>

                {/* Category Badge */}
                <span
                  className={`self-start text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border mb-3 ${getCategoryColor(capability.category)}`}
                >
                  {capability.category}
                </span>

                {/* Title */}
                <h3 className="text-base font-semibold mb-2 text-foreground leading-tight">
                  {capability.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                  {capability.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
