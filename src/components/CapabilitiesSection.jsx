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
    <section className="py-20 bg-gradient-to-b from-slate-50 to-slate-100/50">
      <Container>
        <div className="text-center mb-16">
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
            className="text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4 text-foreground"
          >
            {homePage?.capabilities_title ||
              "End-to-end engineering capabilities"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-muted-foreground"
          >
            {homePage?.capabilities_subtitle ||
              "From hardware design to edge AI deployment, we deliver complete engineering solutions that bring intelligent products to life."}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <Card className="relative h-full hover:shadow-2xl transition-all duration-300 bg-white/40 backdrop-blur-lg border border-white/60 shadow-lg hover:bg-white/50 hover:border-white/80">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <capability.icon className="h-6 w-6 text-primary" />
                    <Badge
                      variant={getCategoryVariant(capability.category)}
                      className="text-[10px]"
                    >
                      {capability.category}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-semibold mb-1.5 text-foreground">
                    {capability.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
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
