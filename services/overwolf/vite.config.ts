import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [tailwindcss(), svelte()],
  base: "./", // This ensures the HTML can find the JS/CSS files on the local disk
  build: { outDir: "dist" },
});
