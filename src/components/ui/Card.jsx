/**
 * Card Component
 * Container component with modern styling
 */
export function Card({ children, className = "" }) {
  return (
    <div
      className={`
      bg-card text-card-foreground 
      rounded-xl border border-border
      flex flex-col gap-6
      transition-all duration-300 ease-out
      hover:shadow-xl hover:border-orange-200/50
      ${className}
    `}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div
      className={`
      px-6 pb-6
      ${className}
    `}
    >
      {children}
    </div>
  );
}
