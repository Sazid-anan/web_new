import { motion } from "framer-motion";
import Container from "./common/Container";
import { Card } from "./ui/Card";
import { Zap, CircuitBoard, Code, Brain, Smartphone, Signal, Box } from "lucide-react";

/**
 * CapabilitiesSection Component
 * Displays end-to-end engineering capabilities with category badges
 */
export default function CapabilitiesSection({ homePage }) {
  const capabilities = [
    {
      title: "System Architecture",
      icon: Zap,
    },
    {
      title: "PCB Design & Layout",
      icon: CircuitBoard,
    },
    {
      title: "Signal & Power Integrity",
      icon: Signal,
    },
    {
      title: "Firmware Development",
      icon: Code,
    },
    {
      title: "IoT Connectivity",
      icon: Smartphone,
    },
    {
      title: "Edge AI Integration",
      icon: Brain,
    },
    {
      title: "Enclosure Design",
      icon: Box,
    },
  ];

  return (
    <section className="pt-6 sm:pt-3 md:pt-4 lg:pt-6 xl:pt-8 pb-0 sm:pb-4 md:pb-6 lg:pb-8 xl:pb-2 bg-white">
      <Container className="content-maxwidth capabilities-content">
        <div className="mb-3 sm:mb-3 md:mb-4 lg:mb-5">
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-3 md:gap-4">
            {/* Left: Headline */}
            <div className="w-full sm:flex-1 flex flex-col items-start text-left sm:w-auto">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="capabilities-gradient-text font-semibold leading-[1.2] tracking-tight mb-0 sm:mb-3 md:mb-4 lg:mb-6 text-[18px] sm:text-[24px] md:text-[32px] lg:text-[50px]"
                style={{ textAlign: "left" }}
              >
                {homePage?.capabilities_title || "Our Engineering"}
                <br />
                Capabilities
              </motion.h1>
            </div>

            {/* Right: Description */}
            {/* <div className="flex-[1.5] flex flex-col items-start text-left mt-2 md:mt-3">
              <p className="text-justify text-[10px] sm:text-[12px] md:text-[14px] lg:text-[21px] font-semibold text-black mt-2 md:mt-3">
                {homePage?.capabilities_subtitle2 ||
                  "From hardware design to edge AI deployment, we deliver complete engineering solutions that bring intelligent products to life."}
              </p>
            </div> */}
            <div className="w-full sm:flex-[1.5] flex flex-col items-start text-left mt-0 sm:mt-4 sm:w-auto">
              <p className="text-justify text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-black">
                From hardware design to edge AI deployment, we deliver complete engineering
                solutions that bring intelligent products to life.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-0 sm:mb-5 md:mb-7">
          <Card className="relative w-full max-w-[1150px] lg:max-w-[1450px] xl:max-w-[1600px] mx-auto px-3 sm:px-2 md:px-3 lg:px-4 py-3 sm:py-3 md:py-4 lg:py-5 bg-white border-2 border-orange-200/60 shadow-lg shadow-orange-100/50">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3 sm:gap-3 md:gap-4 lg:gap-3">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <Card className="relative aspect-square w-full flex flex-col items-center justify-center gap-2 sm:gap-2 md:gap-2.5 p-4 sm:p-4 md:p-3 lg:p-3 hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 hover:border-orange-500/50 hover:shadow-orange-100/50">
                    <capability.icon className="h-10 w-10 sm:h-10 sm:w-10 md:h-11 md:w-11 lg:h-10 lg:w-10 xl:h-12 xl:w-12 text-orange-500 flex-shrink-0" />
                    <h3 className="text-center text-xs sm:text-xs md:text-sm lg:text-xs xl:text-sm font-semibold text-foreground leading-tight px-0.5">
                      {capability.title}
                    </h3>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
