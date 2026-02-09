import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/index.js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: ({ name }) => {
          if (name && name.endsWith(".css")) return "assets/index.css";
          return "assets/[name][extname]";
        },
        manualChunks: {
          // Vendor chunks
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-redux": ["redux", "react-redux", "@reduxjs/toolkit"],
          "vendor-firebase": [
            "firebase/app",
            "firebase/auth",
            "firebase/firestore",
            "firebase/storage",
          ],
          "vendor-ui": ["framer-motion", "lucide-react"],

          // Page chunks
          "page-home": ["./src/pages/Home.jsx"],
          "page-products": ["./src/pages/Products.jsx"],
          "page-blogs": ["./src/pages/Blogs.jsx"],
          "page-admin": [
            "./src/admin/pages/AdminDashboard.jsx",
            "./src/admin/pages/AdminLogin.jsx",
          ],

          // Component chunks
          "components-layout": [
            "./src/components/layout/Header.jsx",
            "./src/components/layout/Footer.jsx",
          ],
          "components-sections": [
            "./src/components/HeroTextSection.jsx",
            "./src/components/HeroAnimationSection.jsx",
            "./src/components/ImageSliderSection.jsx",
            "./src/components/CapabilitiesSection.jsx",
          ],
        },
      },
    },
  },
});
