/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* Design System Colors */
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        border: "var(--border)",
        ring: "var(--ring)",
        destructive: "#d4183d",
        "destructive-foreground": "#ffffff",

        /* Legacy colors for backward compatibility */
        "dark-gray": "#333333",
        "soft-gray": "#f5f5f5",
        "light-gray": "#e8e8e8",
        "edge-blue": "#0066cc",
        "brand-orange": "#ff6600",
        "brand-black": "#1a1a1a",
        "brand-white": "#ffffff",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.625rem",
      },
      textColor: {
        DEFAULT: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
