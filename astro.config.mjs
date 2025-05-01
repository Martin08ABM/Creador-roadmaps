import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import clerk from '@clerk/astro';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
    integrations: [clerk()],

    adapter: cloudflare({
        mode: 'directory',
    }),

    output: 'server',

    vite: {
        plugins: [tailwindcss()],

        ssr: {
        // Externaliza módulos built-in de Node para evitar bundling y silenciar advertencias
        external: [
            'fs', 'path', 'url', 'crypto',
            'http', 'https', 'http2', 'stream', 'buffer',
            'zlib', 'child_process', 'os', 'util',
            'module', 'net', 'dns', 'assert',
            'events', 'tty', 'perf_hooks', 'worker_threads',

            // Variantes con prefijo 'node:' para imports explícitos
            'node:fs', 'node:fs/promises', 'node:path', 'node:url',
            'node:crypto', 'node:http', 'node:https',
            'node:http2', 'node:stream', 'node:buffer',
            'node:zlib', 'node:child_process', 'node:os', 'node:util',
            'node:module', 'node:net', 'node:dns', 'node:assert',
            'node:events', 'node:tty', 'node:perf_hooks', 'node:worker_threads',
            'node:readline', 'node:process', 'node:v8', 'node:tls',
            'node:querystring'
        ],
        },
    },
});
