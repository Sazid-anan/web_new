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
    <section className="pt-6 sm:pt-8 md:pt-12 lg:pt-16 xl:pt-20 pb-6 sm:pb-8 md:pb-12 lg:pb-16 xl:pb-20">
      <Container>
        <div className="text-left mb-4 sm:mb-6 md:mb-8 lg:mb-10 px-2 sm:px-4">
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="flex-1 rounded-2xl pt-0 pb-0 px-0 md:pt-0 md:pb-0 md:px-0"
            >
              <h1 className="text-left hero-gradient-text text-h2 font-bold leading-tight tracking-tight">
                {homePage?.capabilities_title || "Our Engineering Capabilities"}
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex-1 rounded-2xl pt-0 pb-0 px-0 md:pt-0 md:pb-0 md:px-0"
            >
              <p className="text-justify text-body-sm font-medium text-muted-foreground">
                {homePage?.capabilities_subtitle ||
                  "From hardware design to edge AI deployment, we deliver complete engineering solutions that bring intelligent products to life."}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-1.5 md:gap-2.5">
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
              <Card className="relative h-full hover:shadow-2xl transition-all duration-300 bg-white/50 md:backdrop-blur-lg border border-white/70 shadow-md hover:bg-white/60 hover:border-orange-200/80 hover:-translate-y-2">
                <div className="p-1 sm:p-1.5 md:p-2.5">
                  <div className="flex items-center justify-between mb-0.5 sm:mb-1 md:mb-1.5">
                    <capability.icon className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 text-primary" />
                    <Badge
                      variant={getCategoryVariant(capability.category)}
                      className="text-[5px] sm:text-[6px] md:text-[7px] px-0.5 py-0 sm:px-1 sm:py-0.5"
                    >
                      {capability.category}
                    </Badge>
                  </div>
                  <h3 className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold mb-0.5 text-foreground leading-tight">
                    {capability.title}
                  </h3>
                  <p className="text-[6px] sm:text-[7px] md:text-[11px] lg:text-xs text-muted-foreground leading-snug">
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
