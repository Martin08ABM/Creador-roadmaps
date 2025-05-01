// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import clerk from "@clerk/astro";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
    integrations: [clerk()],
    adapter: cloudflare(),
    output: 'server',
    vite: {
        plugins: [tailwindcss()],
    }
});