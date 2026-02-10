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
      width="100"
      height="115"
      viewBox="0 0 160 180"
      className="drop-shadow-sm transition-transform duration-300 group-hover:scale-105 md:w-[160px] md:h-[180px]"
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
    <section className="w-full bg-transparent pt-10 sm:pt-12 pb-12 sm:pb-16 md:pb-20 font-sans overflow-hidden">
      <Container className="max-w-[1600px] mx-auto w-full">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 px-4">
          <Badge
            variant="secondary"
            className="mb-3 sm:mb-4 inline-block text-xs sm:text-sm"
          >
            Development Process
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground mb-3 sm:mb-4">
            Our Development Phases
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
            A comprehensive approach to designing and delivering exceptional
            hardware solutions
          </p>
        </div>

        {/* The Hexagon Navigation Row */}
        <div className="grid grid-cols-3 md:flex md:flex-wrap justify-center items-start md:items-center gap-2 md:gap-4 mb-8 sm:mb-10 md:mb-12 px-2">
          {phases.map((phase, idx) => (
            <div key={idx} className="flex flex-col items-center">
              {/* Alternating Labels (Top/Bottom) */}
              {idx % 2 === 0 && (
                <div
                  className={`mb-1 md:mb-4 text-[10px] md:text-base font-bold uppercase tracking-wide md:tracking-widest h-auto md:h-12 text-center transition-colors leading-tight ${activeStep === idx ? "text-amber-600" : "text-gray-500"}`}
                >
                  <div className="md:hidden">{phase.title.split(" ")[0]}</div>
                  <div className="hidden md:block">
                    {phase.title.split(" ")[0]}
                    <br />
                    {phase.title.split(" ")[1]}
                  </div>
                  <div
                    className={`w-1 h-3 md:h-6 mx-auto mt-0.5 md:mt-1 ${activeStep === idx ? "bg-amber-500" : "bg-gray-200"}`}
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
                  className={`mt-1 md:mt-4 text-[10px] md:text-base font-bold uppercase tracking-wide md:tracking-widest h-auto md:h-12 text-center transition-colors leading-tight ${activeStep === idx ? "text-amber-600" : "text-gray-500"}`}
                >
                  <div
                    className={`w-1 h-3 md:h-6 mx-auto mb-0.5 md:mb-1 ${activeStep === idx ? "bg-amber-500" : "bg-gray-200"}`}
                  />
                  <div className="md:hidden">{phase.title.split(" ")[0]}</div>
                  <div className="hidden md:block">
                    {phase.title.split(" ")[0]}
                    <br />
                    {phase.title.split(" ")[1]}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Content Box */}
        <div className="max-w-4xl mx-auto bg-amber-50/50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 border border-amber-100 shadow-xl shadow-amber-900/5 relative min-h-[200px] sm:min-h-[260px] md:min-h-[280px] overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-5 md:mb-6">
                <span className="text-2xl sm:text-4xl md:text-5xl font-black text-amber-200/50">
                  0{activeStep + 1}
                </span>
                <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800 uppercase tracking-wide">
                  {phases[activeStep].title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-lg md:text-xl leading-relaxed font-light">
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
