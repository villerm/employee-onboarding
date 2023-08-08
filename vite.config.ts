import { fileURLToPath, URL } from "node:url";
import VueTypeImports from "vite-plugin-vue-type-imports";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueTypeImports()],
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/abstracts/__abstracts-all.scss";`,
      },
    },
  },
});
