import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(import.meta.dirname, "src/index.ts"),
      fileName: "index",
      formats: ["es"], // we only support ESM
    },
  },
});
