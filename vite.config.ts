import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/book-store-assignment/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
