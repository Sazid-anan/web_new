import { useMemo } from "react";

/**
 * BackgroundParticles Component
 * Floating particle animation for website background
 */
const BackgroundParticles = () => {
  // Generate random particles (memoized to avoid impure function calls during render)
  // Reduced count for better mobile performance
  const particles = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 60;
    return Array.from({ length: particleCount }).map((_, i) => {
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
    <>
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {particles}
      </div>
      <style>{`
        @keyframes float-particle {
          0% { transform: translate(0, 0); opacity: 0.3; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translate(var(--tx), var(--ty)); opacity: 0.3; }
        }
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background-color: #9ca3af;
          border-radius: 50%;
          animation: float-particle 15s linear infinite;
          z-index: -1;
          will-change: transform, opacity;
        }
        @media (prefers-reduced-motion: reduce) {
          .particle {
            animation: none;
            opacity: 0.2;
          }
        }
      `}</style>
    </>
  );
};

export default BackgroundParticles;
