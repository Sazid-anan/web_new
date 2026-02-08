import React, { useEffect, useState, useMemo } from "react";

/**
 * Hero Animation Section
 * Displays the 3D floating cards design system animation
 */
export default function HeroAnimationSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-[50vh] min-h-[350px] bg-transparent overflow-hidden flex items-center justify-center font-sans text-slate-600 -mt-16">
      {/* Background Floating Dots */}
      <BackgroundParticles />

      {/* Main Container */}
      <div
        className={`relative w-full max-w-6xl h-full max-h-[800px] transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        {/* SVG Connector Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <ConnectorLine x1="50%" y1="50%" x2="20%" y2="25%" delay="0.2s" />
          <ConnectorLine x1="50%" y1="50%" x2="28%" y2="45%" delay="0.3s" />
          <ConnectorLine x1="50%" y1="50%" x2="25%" y2="75%" delay="0.4s" />
          <ConnectorLine x1="50%" y1="50%" x2="80%" y2="20%" delay="0.5s" />
          <ConnectorLine x1="50%" y1="50%" x2="82%" y2="40%" delay="0.6s" />
          <ConnectorLine x1="50%" y1="50%" x2="75%" y2="75%" delay="0.7s" />
        </svg>

        {/* Central Hub */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-slate-900 rounded-[2rem] opacity-20 animate-ping-slow"></div>
            <div className="w-32 h-32 bg-slate-900 rounded-[2rem] shadow-2xl flex items-center justify-center relative z-10 transition-transform duration-500 hover:scale-105 hover:rotate-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-inner">
                <div className="w-6 h-6 bg-slate-900 rounded-full"></div>
              </div>
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Floating Cards */}
        <FloatingCard className="top-[15%] left-[10%] md:left-[15%]" delay="0s">
          <CardHeader title="Button" />
          <div className="space-y-3 mt-2">
            <div className="h-7 w-20 bg-slate-900 rounded-full shadow-lg"></div>
            <div className="h-7 w-20 bg-slate-100 rounded-full"></div>
          </div>
        </FloatingCard>

        <FloatingCard className="top-[40%] left-[5%] md:left-[18%]" delay="1s">
          <CardHeader title="Docs" />
          <div className="space-y-2 mt-1">
            <div className="h-2 w-full bg-slate-200 rounded-full"></div>
            <div className="h-2 w-3/4 bg-slate-200 rounded-full"></div>
            <div className="h-2 w-5/6 bg-slate-200 rounded-full"></div>
          </div>
        </FloatingCard>

        <FloatingCard className="top-[70%] left-[8%] md:left-[15%]" delay="2s">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold text-slate-400">
              Typography
            </span>
            <span className="text-xs font-semibold text-slate-400">Icons</span>
          </div>
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded bg-slate-500 shadow-sm animate-pulse"></div>
            <div className="w-7 h-7 rounded bg-slate-400 shadow-sm"></div>
            <div className="w-7 h-7 rounded bg-slate-400 shadow-sm"></div>
          </div>
          <div className="mt-3 space-y-2">
            <div className="h-3 w-full bg-slate-800 rounded-full"></div>
            <div className="h-3 w-full bg-slate-600 rounded-full"></div>
            <div className="h-3 w-2/3 bg-slate-500 rounded-full"></div>
          </div>
        </FloatingCard>

        <FloatingCard
          className="top-[12%] right-[10%] md:right-[15%]"
          delay="1.5s"
        >
          <CardHeader title="Versions" />
          <div className="mt-2 space-y-3 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>v2.1.0</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>v2.0.5</span>
            </div>
          </div>
          <div className="absolute -z-10 top-2 -right-4 w-full h-full bg-white rounded-2xl shadow-sm border border-slate-100 opacity-60 scale-95"></div>
        </FloatingCard>

        <FloatingCard
          className="top-[35%] right-[5%] md:right-[12%]"
          delay="0.5s"
        >
          <div className="space-y-2 mb-3">
            <div className="h-2 w-12 bg-slate-800 rounded-full"></div>
            <div className="h-1 w-20 bg-slate-200 rounded-full"></div>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500 shadow-sm hover:scale-110 transition-transform"></div>
            <div className="w-8 h-8 rounded-lg bg-orange-500 shadow-sm hover:scale-110 transition-transform"></div>
            <div className="w-8 h-8 rounded-lg bg-teal-500 shadow-sm hover:scale-110 transition-transform"></div>
            <div className="w-8 h-8 rounded-lg bg-slate-800 shadow-sm hover:scale-110 transition-transform"></div>
          </div>
        </FloatingCard>

        <FloatingCard
          className="top-[65%] right-[8%] md:right-[15%]"
          delay="2.5s"
        >
          <CardHeader title="Components" />
          <div className="space-y-3 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-slate-800"></div>
              <div className="h-2 w-20 bg-slate-200 rounded-full"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-slate-200"></div>
              <div className="h-2 w-20 bg-slate-100 rounded-full"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-slate-200"></div>
              <div className="h-2 w-20 bg-slate-100 rounded-full"></div>
            </div>
          </div>
        </FloatingCard>
      </div>

      <style>{`
        @keyframes float-y {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-particle {
          0% { transform: translate(0, 0); opacity: 0; }
          20% { opacity: 0.5; }
          80% { opacity: 0.5; }
          100% { transform: translate(var(--tx), var(--ty)); opacity: 0; }
        }
        @keyframes draw-line {
          0% { stroke-dashoffset: 1000; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        .animate-float-slow {
          animation: float-y 6s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-y 5s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-y 4s ease-in-out infinite;
        }
        .animate-ping-slow {
          animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background-color: #cbd5e1;
          border-radius: 50%;
          animation: float-particle 15s linear infinite;
        }
      `}</style>
    </section>
  );
}

// Sub Components
const FloatingCard = ({ children, className, delay }) => {
  const randomSpeed = useMemo(() => {
    const floatSpeeds = [
      "animate-float-slow",
      "animate-float-medium",
      "animate-float-fast",
    ];
    return floatSpeeds[Math.floor(Math.random() * floatSpeeds.length)]; // eslint-disable-line react-hooks/purity
  }, []);

  return (
    <div
      className={`absolute bg-white p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 w-44 z-10 ${randomSpeed} ${className}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ title }) => (
  <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">
    {title}
  </div>
);

const ConnectorLine = ({ x1, y1, x2, y2, delay }) => {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#e2e8f0"
      strokeWidth="2"
      strokeDasharray="10"
      className="opacity-0"
      style={{
        animation: `draw-line 1s ease-out forwards ${delay}`,
      }}
    />
  );
};

const BackgroundParticles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const startX = Math.random() * 100; // eslint-disable-line react-hooks/purity
      const startY = Math.random() * 100; // eslint-disable-line react-hooks/purity
      const tx = (Math.random() - 0.5) * 200 + "px"; // eslint-disable-line react-hooks/purity
      const ty = (Math.random() - 0.5) * 200 + "px"; // eslint-disable-line react-hooks/purity
      const delay = Math.random() * 5 + "s"; // eslint-disable-line react-hooks/purity

      return (
        <div
          key={i}
          className="particle"
          style={{
            left: `${startX}%`,
            top: `${startY}%`,
            "--tx": tx,
            "--ty": ty,
            animationDelay: delay,
          }}
        />
      );
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">{particles}</div>
  );
};
