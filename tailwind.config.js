/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-gray": "#333333",
        "soft-gray": "#f5f5f5",
        "light-gray": "#e8e8e8",
        "edge-blue": "#0066cc",
        "brand-orange": "#ff6600",
        "brand-black": "#1a1a1a",
        "brand-white": "#ffffff",
      },
      fontFamily: {
        sans: ["Comfortaa", "cursive"],
      },
      textColor: {
        DEFAULT: "#1a1a1a",
      },
    },
  },
  plugins: [],
};
