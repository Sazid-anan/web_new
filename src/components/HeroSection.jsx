import { Calendar, Phone, Mail } from 'lucide-react';

export default function HeroSection() {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    tx: (Math.random() - 0.5) * 200,
    ty: (Math.random() - 0.5) * 200,
    delay: Math.random() * 5,
  }));

  return (
    <section className="relative bg-white pt-6 sm:pt-8 md:pt-12 lg:pt-16 xl:pt-20 pb-6 sm:pb-8 md:pb-12 lg:pb-16 xl:pb-20 overflow-hidden">
      {/* Animated Particles Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              '--tx': `${particle.tx}px`,
              '--ty': `${particle.ty}px`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
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
      </div>

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content Container */}
      <div className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Left Column - Title and CTA */}
          <div className="flex-1 flex flex-col items-start text-left max-w-3xl">
            <div className="rounded-2xl">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight mb-4 sm:mb-6 md:mb-8">
                <span className="text-gray-900">Alchemy for the</span>
                <br />
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Intelligent Age
                </span>
              </h1>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col items-start justify-start gap-2 mt-4 sm:mt-6 md:mt-8 lg:mt-10">
              <a
                href="https://calendly.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group inline-block"
              >
                <div className="relative px-6 py-2.5 md:px-7 md:py-3 rounded-lg font-semibold text-sm sm:text-base border-2 border-orange-500 text-orange-600 hover:bg-orange-50 transition-all duration-300 flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>Book a Free Consultation</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column - Description */}
          <div className="flex-1 text-left flex flex-col justify-start">
            <div className="rounded-2xl">
              <p className="text-justify text-base font-medium text-gray-700 leading-relaxed">
                At Danvion, we're pushing the boundaries of artificial intelligence at the edge – delivering cutting-edge
                solutions for the world's most complex challenges. With our expertise in embedded AI, hardware integration,
                and real-time processing, we're creating smarter, faster, and more efficient products.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Contact Bar (Right Side) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 hidden lg:flex">
        <button className="w-12 h-12 rounded-lg border-2 border-gray-800 text-gray-800 hover:bg-gray-100 transition-colors flex items-center justify-center">
          <Phone className="w-5 h-5" />
        </button>
        <button className="w-12 h-12 rounded-lg border-2 border-gray-800 text-gray-800 hover:bg-gray-100 transition-colors flex items-center justify-center">
          <Mail className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
