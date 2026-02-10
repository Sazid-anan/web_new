import { motion } from "framer-motion";
import Container from "./common/Container";
import { Card } from "./ui/Card";
import Badge from "./ui/Badge";
import {
  CircuitBoard,
  Cpu,
  Code,
  Brain,
  Wifi,
  Shield,
  Activity,
  Battery,
} from "lucide-react";

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
      icon: CircuitBoard,
    },
    {
      title: "Embedded Systems",
      category: "Hardware",
      description:
        "Complete embedded system development with ARM, RISC-V, and custom ASIC solutions tailored to your requirements.",
      icon: Cpu,
    },
    {
      title: "Firmware Development",
      category: "Firmware",
      description:
        "Real-time firmware for microcontrollers and processors. RTOS, bare-metal, and custom bootloader development.",
      icon: Code,
    },
    {
      title: "Edge AI Integration",
      category: "AI",
      description:
        "Deploy machine learning models on edge devices. TensorFlow Lite, optimized neural networks, and custom accelerators.",
      icon: Brain,
    },
    {
      title: "Wireless Connectivity",
      category: "Hardware",
      description:
        "Integrate WiFi, Bluetooth, LoRa, Zigbee, and cellular connectivity. From protocol selection to antenna design.",
      icon: Wifi,
    },
    {
      title: "Security & Encryption",
      category: "Firmware",
      description:
        "Hardware security modules, secure boot, encrypted communication, and compliance with industry standards.",
      icon: Shield,
    },
    {
      title: "Sensor Integration",
      category: "Hardware",
      description:
        "Multi-sensor fusion, calibration, and signal processing. Environmental, motion, and custom sensor solutions.",
      icon: Activity,
    },
    {
      title: "Power Management",
      category: "Hardware",
      description:
        "Ultra-low power designs, battery management systems, energy harvesting, and power optimization strategies.",
      icon: Battery,
    },
  ];

  const getCategoryVariant = (category) => {
    const variants = {
      Hardware: "default",
      Firmware: "secondary",
      AI: "outline",
    };
    return variants[category] || "secondary";
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20">
      <Container>
        <div className="text-center mb-6 sm:mb-10 md:mb-12 lg:mb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-2 sm:mb-3 md:mb-4"
          >
            <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-muted-foreground bg-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-slate-200">
              What We Do
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-tight mb-2 sm:mb-3 md:mb-4 text-foreground leading-tight"
          >
            {homePage?.capabilities_title ||
              "End-to-end engineering capabilities"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-muted-foreground"
          >
            {homePage?.capabilities_subtitle ||
              "From hardware design to edge AI deployment, we deliver complete engineering solutions that bring intelligent products to life."}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              whileHover={{ y: -4, scale: 1.02 }}
              style={{ willChange: "transform, opacity" }}
            >
              <Card className="relative h-full hover:shadow-2xl transition-all duration-300 bg-white/40 md:backdrop-blur-lg border border-white/60 shadow-lg hover:bg-white/50 hover:border-white/80">
                <div className="p-3 sm:p-4 md:p-5">
                  <div className="flex items-center justify-between mb-2 sm:mb-2.5 md:mb-3">
                    <capability.icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
                    <Badge
                      variant={getCategoryVariant(capability.category)}
                      className="text-[8px] sm:text-[9px] md:text-[10px] px-1.5 py-0.5 sm:px-2 sm:py-0.5"
                    >
                      {capability.category}
                    </Badge>
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold mb-1 sm:mb-1.5 text-foreground leading-tight">
                    {capability.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
