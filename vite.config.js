import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].bundle.js",
        chunkFileNames: "assets/[name].bundle.js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
