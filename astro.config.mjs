// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import clerk from "@clerk/astro";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
    integrations: [clerk()],
    adapter: cloudflare({
        mode: 'directory',
        enableSession: false
    }),
    output: 'server',
    vite: {
        plugins: [tailwindcss()],
    }
});