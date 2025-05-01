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
        external: [
            'fs', 'path', 'url', 'crypto',
            'http', 'https', 'stream', 'buffer',
            'zlib', 'child_process', 'os', 'util',
            'module', 'net', 'dns', 'assert',
            'events', 'tty', 'perf_hooks', 'worker_threads',
            // variantes con prefijo 'node:' para capturar imports explícitos
            'node:fs', 'node:path', 'node:url', 'node:crypto',
            'node:http', 'node:https', 'node:stream', 'node:buffer',
            'node:zlib', 'node:child_process', 'node:os', 'node:util',
            'node:module', 'node:net', 'node:dns', 'node:assert',
            'node:events', 'node:tty', 'node:perf_hooks', 'node:worker_threads',
        ],
        },
    },
});
