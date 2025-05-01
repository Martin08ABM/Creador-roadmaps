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
    // Agrega la integración de Clerk para autenticación de usuarios
    integrations: [clerk()],

    // Usa el adaptador de Cloudflare, especificando el modo 'directory'
    adapter: cloudflare({
        mode: 'directory', // Esto hace que el proyecto se genere como un directorio en lugar de un bundle único
    }),

    // Configura Astro para que genere salida en modo 'server' (necesario para SSR en Cloudflare Workers)
    output: 'server',

    // Configuraciones específicas para Vite, el bundler que usa Astro internamente
    vite: {
        // Registra el plugin de Tailwind CSS para que Vite lo utilice durante la construcción
        plugins: [tailwindcss()],

        // Configuraciones para el entorno de Server-Side Rendering
        ssr: {
        // Se externalizan módulos nativos de Node.js para evitar que Vite intente empaquetarlos
        external: [
            'fs', 'path', 'url', 'crypto',
            'http', 'https', 'http2', 'stream', 'buffer',
            'zlib', 'child_process', 'os', 'util',
            'module', 'net', 'dns', 'assert',
            'events', 'tty', 'perf_hooks', 'worker_threads',
            'vm', // Necesario para compatibilidad con bibliotecas como 'jiti'

            // Las mismas dependencias pero usando el prefijo 'node:' para compatibilidad con ciertos entornos
            'node:fs', 'node:fs/promises', 'node:path', 'node:url',
            'node:crypto', 'node:http', 'node:https',
            'node:http2', 'node:stream', 'node:buffer',
            'node:zlib', 'node:child_process', 'node:os', 'node:util',
            'node:module', 'node:net', 'node:dns', 'node:assert',
            'node:events', 'node:tty', 'node:perf_hooks', 'node:worker_threads',
            'node:readline', 'node:process', 'node:v8', 'node:tls',
            'node:querystring', 'node:vm', // Incluido explícitamente para evitar errores relacionados con jiti
        ],
        },
    },
});
