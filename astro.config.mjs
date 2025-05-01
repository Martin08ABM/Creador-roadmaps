// @ts-check

// Importa la función de configuración principal de Astro
import { defineConfig } from 'astro/config';

// Importa el plugin de Tailwind CSS adaptado para Vite
import tailwindcss from '@tailwindcss/vite';

// Importa la integración de Clerk para autenticación
import clerk from '@clerk/astro';

// Importa el adaptador de Cloudflare para desplegar en Workers
import cloudflare from '@astrojs/cloudflare';

// Exporta la configuración principal de Astro
export default defineConfig({
  // Integra Clerk para autenticación de usuarios
  integrations: [clerk()],

  // Usa el adaptador de Cloudflare en modo 'directory'
  adapter: cloudflare({
    mode: 'directory', // Genera salida como directorio en lugar de bundle
  }),

  // Configura Astro para SSR en Cloudflare Workers
  output: 'server',

  // Ajustes de Vite (bundler interno de Astro)
  vite: {
    // Plugin de Tailwind CSS
    plugins: [tailwindcss()],

    // Configuración de resolución de módulos
    resolve: {
      // Fallbacks o alias si necesitas redirigir módulos nativos
      alias: {
        // Por ejemplo, si quieres mapear 'tls' a un polyfill, añade aquí
        // 'tls': 'path/to/tls-polyfill'
      },
    },

    ssr: {
      // Externaliza módulos nativos de Node.js y librerías problemáticas
      external: [
        // CommonJS built-ins
        'fs','path','url','crypto',
        'http','https','http2','stream','buffer',
        'zlib','child_process','os','util',
        'module','net','dns','assert',
        'events','tty','perf_hooks','worker_threads',
        'vm','tls',
        // Variantes con prefijo 'node:'
        'node:fs','node:fs/promises','node:path','node:url',
        'node:crypto','node:http','node:https','node:http2',
        'node:stream','node:buffer','node:zlib','node:child_process',
        'node:os','node:util','node:module','node:net',
        'node:dns','node:assert','node:events','node:tty',
        'node:perf_hooks','node:worker_threads','node:readline',
        'node:process','node:v8','node:tls','node:querystring','node:vm',
        // Excluye jiti para evitar empaquetar import dinámicas que fallan
        'jiti',
      ],
      // No externaliza jiti internamente, para que Vite no intente procesarlo
      noExternal: ['jiti'],
    },
  },
});
