/* eslint-disable no-undef */
import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode,resolve(__dirname, "../")) };
  
  return defineConfig({
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
      port: process.env.VITE_FRONTEND_PORT,
      proxy: {
        "/api": {
          target: `http://${process.env.VITE_SERVER_HOST}:${process.env.VITE_BACKEND_PORT}`,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  });
};
