/**
 * Container Component - Mobile-First Responsive
 * Centered content wrapper with full-width responsive approach
 *
 * Breakpoints handled by CSS media queries:
 * - Mobile: Full width with padding
 * - Tablet: Full width with increased padding
 * - Laptop: Responsive width managed by CSS
 * - Desktop: Full content utilization
 */
export default function Container({ children, className = "" }) {
  return (
    <div
      className={`
        w-full mx-auto
        px-4 
        sm:px-6
        md:px-8
        lg:px-10
        ${className}
      `}
    >
      {children}
    </div>
  );
}
