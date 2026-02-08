import { motion } from "framer-motion";

/**
 * Button Component
 * Reusable button with variants and animations
 */
export default function Button({
  children,
  variant = "primary", // 'primary', 'secondary', 'outline'
  size = "md", // 'sm', 'md', 'lg'
  className = "",
  ...props
}) {
  const baseStyles =
    "font-bold rounded-full transition-all duration-300 cursor-pointer inline-block relative group overflow-hidden orange-pop-hover";

  const variantStyles = {
    primary: "bg-brand-orange text-brand-black shadow-lg hover:shadow-2xl",
    secondary: "bg-brand-black text-white shadow-lg hover:shadow-2xl",
    outline:
      "border-2 border-brand-orange text-brand-orange shadow-md hover:bg-brand-orange hover:text-brand-black",
  };

  const sizeStyles = {
    sm: "px-5 py-2 text-sm",
    md: "px-7 py-2.5 text-sm sm:px-8 sm:py-3 sm:text-base",
    lg: "px-8 py-3 text-base sm:px-10 sm:py-4 sm:text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {/* Glass effect overlay on hover */}
      {variant === "outline" && (
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/50 to-gray-200/70 opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/60 shadow-xl transition-all duration-300"></span>
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
