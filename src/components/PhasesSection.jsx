import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Cpu,
  Layers,
  Activity,
  Box,
  Factory,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
} from "lucide-react";
import Container from "./common/Container";

const phases = [
  {
    id: 1,
    number: "01",
    title: "Concept Phase",
    icon: Lightbulb,
    color: "bg-blue-500",
    darkColor: "bg-blue-700",
    description:
      "The first step in any design process is to describe and define the functional scope of the product. We will work with you.",
  },
  {
    id: 2,
    number: "02",
    title: "Schematic Capture",
    icon: Cpu,
    color: "bg-cyan-500",
    darkColor: "bg-cyan-700",
    description:
      "We use industry standard circuit simulation tools such as KiCad PSpice and LTSpice to design your schematic and capture it in Altium Designer.",
  },
  {
    id: 3,
    number: "03",
    title: "PCB Design",
    icon: Layers,
    color: "bg-purple-500",
    darkColor: "bg-purple-700",
    description:
      "We design PCBs using Altium Designer, KiCad. Whether it's a high-current, low-noise analog or high-density digital board.",
  },
  {
    id: 6,
    number: "06",
    title: "Prototyping",
    icon: Factory,
    color: "bg-amber-500",
    darkColor: "bg-amber-700",
    description:
      "Designing hardware requires building and testing hardware. We provide both prototype assembly and testing in-house.",
  },

  {
    id: 5,
    number: "05",
    title: "Mechanical Design",
    icon: Box,
    color: "bg-orange-500",
    darkColor: "bg-orange-700",
    description:
      "Our mechanical design workflow brings together all of our expertise from simulations and electronics design.",
  },

  {
    id: 4,
    number: "04",
    title: "Simulation",
    icon: Activity,
    color: "bg-pink-500",
    darkColor: "bg-pink-700",
    description:
      "Simulations are an integral part of our design process. We use both industry standard and open-source simulation tools to model complex systems.",
  },
];

// Phase Card Component - Clean and Organized
const PhaseCard = ({ process, index }) => {
  const IconComponent = process.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group h-full"
    >
      {/* Glass Card Container */}
      <div
        className={`relative h-full min-h-[205px] md:min-h-[225px] lg:min-h-[240px] flex flex-col bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-3 md:p-4 lg:p-5 transition-all duration-300 ${isHovered ? "border-white/40 shadow-2xl shadow-white/10 " : "shadow-xl"}`}
      >
        {/* Number Badge - Top Right */}
        <div
          className={`absolute top-3 sm:top-3 md:top-3.5 right-3 sm:right-3 md:right-3.5 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full ${process.color} flex items-center justify-center font-bold text-xs sm:text-sm md:text-sm lg:text-base shadow-lg transition-transform duration-300 ${isHovered ? "rotate-12" : ""}`}
          style={{ color: "#ffffff" }}
        >
          {process.number}
        </div>

        {/* Icon Container */}
        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-14 xl:h-14 mb-2.5 sm:mb-3 md:mb-3 lg:mb-4 ${process.color} rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 ${isHovered ? "shadow-2xl" : "shadow-lg"}`}
        >
          <IconComponent
            className={`w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 transition-transform duration-300 ${isHovered ? "scale-110 rotate-6" : ""}`}
            strokeWidth={1.5}
            color="#ffffff"
          />
        </div>

        {/* Content */}
        <div className="space-y-1 flex-1 flex flex-col">
          <h3
            className="text-[13px] sm:text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-bold leading-tight"
            style={{ color: "#ffffff" }}
          >
            {process.title}
          </h3>

          <div
            className={`h-0.5 rounded-full transition-all duration-300 ${isHovered ? "w-12" : "w-8"} ${process.color}`}
          ></div>

          <p
            className="text-justify text-xs sm:text-sm md:text-sm lg:text-base xl:text-base leading-relaxed flex-1"
            style={{ color: "#ffffff" }}
          >
            {process.description}
          </p>
        </div>

        {/* Hover Glow Effect */}
        <div
          className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${isHovered ? "opacity-100" : "opacity-0"}`}
          style={{
            background: `radial-gradient(circle at 50% 0%, ${process.color.replace("bg-", "rgba(")}10, 0.1), transparent 70%)`,
          }}
        ></div>
      </div>
    </motion.div>
  );
};

const buildSnakeNextMap = (total, columns) => {
  const order = [];
  const rows = Math.ceil(total / columns);

  for (let row = 0; row < rows; row += 1) {
    const start = row * columns;
    const end = Math.min(start + columns, total);
    const rowIndexes = Array.from({ length: end - start }, (_, i) => start + i);

    if (row % 2 === 1) {
      rowIndexes.reverse();
    }

    order.push(...rowIndexes);
  }

  const nextMap = {};
  order.forEach((current, idx) => {
    nextMap[current] = idx < order.length - 1 ? order[idx + 1] : null;
  });

  return nextMap;
};

const getDirection = (from, to, columns) => {
  if (to === null || to === undefined) return null;

  const fromRow = Math.floor(from / columns);
  const toRow = Math.floor(to / columns);
  const fromCol = from % columns;
  const toCol = to % columns;

  // Same row - horizontal movement
  if (fromRow === toRow) {
    if (toCol > fromCol) {
      return "right";
    } else if (toCol < fromCol) {
      return "left";
    }
  }

  // Different row - vertical movement
  if (toRow > fromRow) {
    return "down";
  }

  return null;
};

const getGridColumnCount = (gridElement) => {
  if (!gridElement) return 1;
  const templateColumns = window
    .getComputedStyle(gridElement)
    .gridTemplateColumns.trim();
  if (!templateColumns) return 1;
  return Math.max(1, templateColumns.split(" ").length);
};

const PhaseSection = () => {
  const total = phases.length;
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  const [connectors, setConnectors] = useState([]);
  const connectorPadding = 1.5;

  useEffect(() => {
    const gridElement = gridRef.current;
    if (!gridElement) return undefined;

    const updateConnectors = () => {
      const columns = getGridColumnCount(gridElement);
      const nextMap = buildSnakeNextMap(total, columns);
      const gridRect = gridElement.getBoundingClientRect();
      const nextConnectors = [];

      for (let index = 0; index < total; index += 1) {
        const nextIndex = nextMap[index];
        if (nextIndex === null || nextIndex === undefined) continue;

        const fromElement = cardRefs.current[index];
        const toElement = cardRefs.current[nextIndex];
        if (!fromElement || !toElement) continue;

        const fromRect = fromElement.getBoundingClientRect();
        const toRect = toElement.getBoundingClientRect();
        const direction = getDirection(index, nextIndex, columns);

        if (direction === "right" || direction === "left") {
          const y = fromRect.top + fromRect.height / 2 - gridRect.top;
          const x1 =
            direction === "right"
              ? fromRect.right - gridRect.left + connectorPadding
              : fromRect.left - gridRect.left - connectorPadding;
          const x2 =
            direction === "right"
              ? toRect.left - gridRect.left - connectorPadding
              : toRect.right - gridRect.left + connectorPadding;

          if (Math.abs(x2 - x1) > 8) {
            nextConnectors.push({
              id: `${index}-${nextIndex}`,
              direction,
              x: (x1 + x2) / 2,
              y,
            });
          }
        }

        if (direction === "down") {
          const x = fromRect.left + fromRect.width / 2 - gridRect.left;
          const y1 = fromRect.bottom - gridRect.top + connectorPadding;
          const y2 = toRect.top - gridRect.top - connectorPadding;

          if (Math.abs(y2 - y1) > 8) {
            nextConnectors.push({
              id: `${index}-${nextIndex}`,
              direction,
              x,
              y: (y1 + y2) / 2,
            });
          }
        }
      }

      setConnectors(nextConnectors);
    };

    updateConnectors();

    const rafUpdate = () => window.requestAnimationFrame(updateConnectors);
    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            rafUpdate();
          });

    if (resizeObserver) {
      resizeObserver.observe(gridElement);
      cardRefs.current.forEach((element) => {
        if (element) resizeObserver.observe(element);
      });
    }

    window.addEventListener("resize", rafUpdate);

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", rafUpdate);
    };
  }, [total]);

  return (
    <section className="w-full bg-black font-sans pt-2 sm:pt-3 md:pt-4 lg:pt-6 xl:pt-8 pb-2 sm:pb-3 md:pb-4 lg:pb-5 xl:pb-6">
      <Container className="content-maxwidth w-full">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-7 md:mb-8 lg:mb-10"
        >
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-4">
            {/* Left: Headline
            <div className="flex flex-col items-start text-left">
              <h1 className="animated-gradient-text font-bold leading-[1.25] tracking-tight text-[24px] sm:text-[28px] md:text-[32px] lg:text-[48px] xl:text-[60px]">
               
              </h1>
            </div> */}

            <div className="w-full sm:flex-1 flex flex-col items-start text-left sm:w-auto">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="animated-gradient-text font-semibold leading-[1.25] tracking-tight mb-2 sm:mb-3 md:mb-4 lg:mb-6 text-[18px] sm:text-[24px] md:text-[32px] lg:text-[50px]"
              >
                Our Development Phases
              </motion.h1>
            </div>

            {/* Right: Description */}
            <div className="w-full sm:flex-[1.5] flex flex-col items-start text-left mt-4 sm:mt-0 sm:w-auto">
              <p
                className="text-justify text-sm sm:text-base md:text-lg lg:text-xl font-semibold"
                style={{ color: "#ffffff" }}
              >
                We streamline your success by handling every detail from initial
                schematics to in-house prototyping and testing
              </p>
            </div>
          </div>
        </motion.div>

        {/* Phase Cards Grid with Snake Pattern */}
        <div
          ref={gridRef}
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
        >
          {connectors.map((connector) => {
            const Icon =
              connector.direction === "left"
                ? ArrowLeft
                : connector.direction === "down"
                  ? ArrowDown
                  : ArrowRight;

            return (
              <div
                key={connector.id}
                className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${connector.x}px`, top: `${connector.y}px` }}
              >
                <Icon
                  className="phase-flow-arrow text-orange-500"
                  strokeWidth={2.7}
                />
              </div>
            );
          })}

          {phases.map((process, index) => {
            // For scroll: assign each phase a unique id
            const phaseId = `phase-section-${index}`;

            return (
              <div
                key={process.id}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className="relative"
                id={phaseId}
              >
                <PhaseCard process={process} index={index} />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default PhaseSection;
