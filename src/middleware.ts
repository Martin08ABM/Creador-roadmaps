// Importa la librería clerkMiddleware desde el paquete @clerk/astro/server
// y la exporta como onRequest para su uso en el servidor de Astro.
import { clerkMiddleware } from "@clerk/astro/server";

export const onRequest = clerkMiddleware();