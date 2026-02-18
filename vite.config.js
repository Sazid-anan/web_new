import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        // Smart code splitting strategy
        manualChunks: {
          // Vendor chunks
          "vendor-react": ["react", "react-dom"],
          "vendor-redux": ["@reduxjs/toolkit", "react-redux"],
          "vendor-firebase": ["firebase"],
          "vendor-router": ["react-router-dom"],
          "vendor-ui": ["framer-motion", "lucide-react"],
          // Common chunks
          "common-utils": ["marked", "dompurify"],
        },
      },
    },
    // Performance optimization
    chunkSizeWarningLimit: 500,
    splitVendorChunkPlugin: true,
    // CSS code splitting
    cssCodeSplit: true,
    // Rollup inlining
    assetsInlineLimit: 4096,
  },
  // Base optimization
  base: "/",
  // Optimization for dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "@reduxjs/toolkit",
      "react-redux",
      "firebase",
      "react-router-dom",
      "framer-motion",
      "lucide-react",
      "marked",
      "dompurify",
      "react-helmet-async",
    ],
  },
});
