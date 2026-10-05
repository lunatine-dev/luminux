import adapter from "@sveltejs/adapter-node";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        tailwindcss(),
        sveltekit({
            adapter: adapter(),
            compilerOptions: {
                // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
                runes: ({ filename }) => (filename.split(/[/\\]/).includes("node_modules") ? undefined : true),
            },
        }),
    ],
    ssr: {
        noExternal: ["@luminux/ui"],
    },
    server: {
        port: 5173,
    },
});
