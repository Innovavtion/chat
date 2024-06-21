import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@/pages": "/src/pages/",
    },
  },
  server: {
    // react client ports
    port: 3000,
    // local nest server
    proxy: {
      "/server": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
