import { useMemo } from "react";

/**
 * BackgroundParticles Component
 * Floating particle animation for website background
 */
const BackgroundParticles = () => {
  // Generate random particles (memoized to avoid impure function calls during render)
  const particles = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => {
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
          0% { transform: translate(0, 0); opacity: 0; }
          20% { opacity: 0.2; }
          80% { opacity: 0.2; }
          100% { transform: translate(var(--tx), var(--ty)); opacity: 0; }
        }
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background-color: #cbd5e1;
          border-radius: 50%;
          animation: float-particle 15s linear infinite;
          z-index: -1;
        }
      `}</style>
    </>
  );
};

export default BackgroundParticles;
