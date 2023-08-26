/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  envDir: "../",
  plugins: [react()],
  build: {
    outDir: "./dist",
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: process.env.FRONTEND_PORT,
    proxy: {
      "/api": {
        target: `http://${process.env.SERVER_HOST}:${process.env.BACKEND_PORT}`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
