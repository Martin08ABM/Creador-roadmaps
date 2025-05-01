// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import clerk from '@clerk/astro';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
    integrations: [clerk()],
    adapter: cloudflare({
        mode: 'directory',
    }),
    output: 'server',
    vite: {
        plugins: [tailwindcss()],
        ssr: {
        // Externaliza módulos built-in de Node para silenciar advertencias de Vite
        external: [
            'fs',
            'path',
            'url',
            'crypto',
            'http',
            'https',
            'stream',
            'buffer',
            'zlib',
            'child_process',
            'os',
            'util',
            'module',
            'net',
            'dns',
            'assert',
            'events',
            'tty',
        ],
        },
    },
});
