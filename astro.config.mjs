// @ts-check

import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import clerk from '@clerk/astro';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  integrations: [clerk()],
  adapter: cloudflare({
  }),
  output: 'server',
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: [
        // Solo mantener los módulos absolutamente necesarios
        'fs', 'path', 'url', 'crypto',
        'http', 'https', 'stream', 'buffer',
        'zlib', 'util', 'events'
      ],
      noExternal: ['@clerk/astro']
    }
  }
});