import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["framer-motion", "react-intersection-observer","react-router-dom"],
    },
  },
});
