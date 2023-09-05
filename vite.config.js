import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@apis": path.resolve(__dirname, "./src/apis"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@fonts": path.resolve(__dirname, "./src/assets/fonts"),
      "@icons": path.resolve(__dirname, "./src/assets/icons"),
      "@images": path.resolve(__dirname, "./src/assets/images"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@locale": path.resolve(__dirname, "./src/locale"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  plugins: [react()],
  // automatic load scss variables
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@assets/scss/_styles";`,
      },
    },
  },
  server: {
    hmr: {
      overlay: true,
    },
  },
});
