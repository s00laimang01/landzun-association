import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  // MapLibre ships its own web worker; Vite's dep optimizer mangles the path.
  optimizeDeps: { exclude: ["maplibre-gl"] },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
