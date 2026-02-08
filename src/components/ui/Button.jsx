/**
 * Button Component
 * Modern button with multiple variants and sizes
 */
export default function Button({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) {
  const variants = {
    default:
      "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
    outline:
      "border border-border bg-background text-foreground hover:bg-accent",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-10 px-4 py-2 text-base",
    sm: "h-8 rounded-md px-3 text-sm",
    lg: "h-12 rounded-lg px-6 text-base",
    icon: "h-10 w-10 rounded-md p-0",
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        whitespace-nowrap rounded-md font-medium
        transition-all disabled:opacity-50 disabled:cursor-not-allowed
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        ${variants[variant] || variants.default}
        ${sizes[size] || sizes.default}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
