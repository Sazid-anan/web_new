import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Cpu, Layers, Activity, Box, Factory } from "lucide-react";
import Badge from "./ui/Badge";
import Container from "./common/Container";

const phases = [
  {
    title: "Concept Phase",
    icon: <Lightbulb size={28} />,
    description:
      "The first step in any design process is to describe and define the functional scope of the product. We will work with you to develop a specification that best meets your requirements.",
  },
  {
    title: "Schematic Capture",
    icon: <Cpu size={28} />,
    description:
      "We use industry standard circuit simulation tools such as KiCad PSpice and LTSpice to design your schematic and capture it in Altium Designer. Circuit simulation allows us to quickly iterate and ensure the first prototype is a success.",
  },
  {
    title: "PCB Design",
    icon: <Layers size={28} />,
    description:
      "We design PCBs using Altium Designer, KiCad. Whether it's a high-current, low-noise analog or high-density digital board, we have the expertise to meet all the challenges revolving around printed circuit boards.",
  },
  {
    title: "Simulation",
    icon: <Activity size={28} />,
    description:
      "Simulations are an integral part of our design process. We use both industry standard and open-source simulation tools to model complex systems at board or system level.",
  },
  {
    title: "Mechanical Design",
    icon: <Box size={28} />,
    description:
      "Our mechanical design workflow brings together all of our expertise from simulations and electronics design and packages into your next product in a bi-directional workflow.",
  },
  {
    title: "Prototyping",
    icon: <Factory size={28} />,
    description:
      "Designing hardware requires building and testing hardware. We provide both prototype assembly and testing in-house and through our local partner network.",
  },
];

// Rounded Hexagon SVG Component for consistency
const RoundedHexagon = ({ active, children, onClick }) => (
  <div className="relative cursor-pointer group" onClick={onClick}>
    <svg
      width="50"
      height="56"
      viewBox="0 0 160 180"
      className="drop-shadow-sm transition-transform duration-300 group-hover:scale-105 sm:w-[55px] sm:h-[65px] md:w-[70px] md:h-[85px] lg:w-[100px] lg:h-[120px] xl:w-[160px] xl:h-[180px]"
    >
      {/* Outer Border Hexagon */}
      <path
        d="M80 0 L150 40 L150 140 L80 180 L10 140 L10 40 Z"
        fill="transparent"
        stroke={active ? "#f59e0b" : "#e5e7eb"}
        strokeWidth="6"
        strokeLinejoin="round"
        className="transition-colors duration-300"
      />
      {/* Inner Hexagon Shape */}
      <path
        d="M80 10 L140 45 L140 135 L80 170 L20 135 L20 45 Z"
        fill={active ? "#fff7ed" : "#fdfcfb"} // Slight orange vs off-white
        stroke={active ? "#fbbf24" : "#f3f4f6"}
        strokeWidth="2"
        strokeLinejoin="round"
        className="transition-all duration-300"
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
      <div
        className={`transition-colors duration-300 ${active ? "text-amber-600" : "text-gray-400"}`}
      >
        {children}
      </div>
    </div>
  </div>
);

const PhaseSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    // Disable auto-play on mobile for better performance
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % phases.length);
    }, 3000); // Slightly slower for smoother experience

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePhaseClick = (idx) => {
    setActiveStep(idx);
    setIsPaused(true);
    // Resume auto-cycle after 10 seconds of user click
    setTimeout(() => setIsPaused(false), 10000);
  };

  return (
    <section className="w-full bg-transparent pt-6 sm:pt-8 md:pt-12 lg:pt-16 xl:pt-20 pb-6 sm:pb-8 md:pb-12 lg:pb-16 xl:pb-20 font-sans overflow-hidden">
      <Container>
        <div className="text-left mb-6 sm:mb-8 md:mb-8 lg:mb-12 px-1 sm:px-4">
          <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
            <div className="flex-1">
              <h1 className="text-left hero-gradient-text text-h2 font-bold leading-tight tracking-tight">
                Our Development Phases
              </h1>
            </div>
            <div className="flex-1">
              <p className="text-justify text-body-sm font-medium text-muted-foreground">
                We streamline your success by handling every detail from initial
                schematics to rapid in-house prototyping and testing, ensuring
                your product works perfectly in the real world
              </p>
            </div>
          </div>
        </div>

        {/* The Hexagon Navigation Row */}
        <div className="flex flex-wrap justify-center items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 xl:gap-3 mb-2 sm:mb-3 md:mb-4 lg:mb-6 xl:mb-8 px-0.5 sm:px-2 w-full">
          {phases.map((phase, idx) => (
            <div key={idx} className="flex flex-col items-center">
              {/* Alternating Labels (Top/Bottom) */}
              {idx % 2 === 0 && (
                <div
                  className={`mb-0.5 sm:mb-1 md:mb-1.5 lg:mb-2 xl:mb-4 text-[6px] sm:text-[7px] md:text-[9px] lg:text-sm xl:text-base font-bold uppercase tracking-tight md:tracking-wide lg:tracking-widest h-auto md:h-6 lg:h-8 xl:h-12 text-center transition-colors leading-tight ${activeStep === idx ? "text-amber-600" : "text-gray-500"}`}
                >
                  <div>{phase.title.split(" ")[0]}</div>
                  <div
                    className={`w-0.5 h-1 sm:h-1.5 md:h-2 lg:h-4 xl:h-6 mx-auto mt-0.5 md:mt-0.5 lg:mt-1 ${activeStep === idx ? "bg-amber-500" : "bg-gray-200"}`}
                  />
                </div>
              )}

              <RoundedHexagon
                active={activeStep === idx}
                onClick={() => handlePhaseClick(idx)}
              >
                {phase.icon}
              </RoundedHexagon>

              {idx % 2 !== 0 && (
                <div
                  className={`mt-0.5 sm:mt-1 md:mt-1.5 lg:mt-2 xl:mt-4 text-[6px] sm:text-[7px] md:text-[9px] lg:text-sm xl:text-base font-bold uppercase tracking-tight md:tracking-wide lg:tracking-widest h-auto md:h-6 lg:h-8 xl:h-12 text-center transition-colors leading-tight ${activeStep === idx ? "text-amber-600" : "text-gray-500"}`}
                >
                  <div
                    className={`w-0.5 h-1 sm:h-1.5 md:h-2 lg:h-4 xl:h-6 mx-auto mb-0.5 md:mb-0.5 lg:mb-1 ${activeStep === idx ? "bg-amber-500" : "bg-gray-200"}`}
                  />
                  <div>{phase.title.split(" ")[0]}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Content Box */}
        <div className="max-w-4xl mx-auto bg-amber-50/50 rounded-lg sm:rounded-xl md:rounded-3xl p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 border border-amber-100 shadow-md sm:shadow-lg md:shadow-xl shadow-amber-900/5 relative min-h-[140px] sm:min-h-[180px] md:min-h-[220px] lg:min-h-[280px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="h-full flex flex-col"
            >
              <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-6 flex-shrink-0">
                <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-amber-400 flex-shrink-0">
                  0{activeStep + 1}
                </span>
                <h3 className="text-xs sm:text-sm md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-800 uppercase tracking-tight md:tracking-wide line-clamp-2 sm:line-clamp-none">
                  {phases[activeStep].title}
                </h3>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed font-light line-clamp-4 sm:line-clamp-5 md:line-clamp-none">
                {phases[activeStep].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Decorative corner element */}
          <div className="hidden md:block absolute top-0 right-0 p-4">
            <div className="w-12 h-12 border-t-2 border-r-2 border-amber-200 rounded-tr-2xl" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PhaseSection;
