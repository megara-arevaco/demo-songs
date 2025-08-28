import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Keep workspace symlinks so Vite treats linked deps as deps
    preserveSymlinks: true,
    dedupe: ["react", "react-dom"],
  },
  server: {
    host: true, // escucha en 0.0.0.0 dentro del contenedor
    port: 5173,
    strictPort: true,
    // Improve file change detection inside Docker bind mounts
    watch: { usePolling: true, interval: 300 },
  },
});
