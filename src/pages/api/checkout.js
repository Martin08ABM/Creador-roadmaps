import Stripe from 'stripe';
import { loadEnv } from 'vite';

// Definir el endpoint correctamente usando la estructura de Astro para API endpoints
export async function POST() {
    try {
        // Cargar manualmente las variables de entorno si es necesario
        const env = process.env.NODE_ENV !== undefined 
            ? loadEnv(process.env.NODE_ENV, process.cwd(), '')
            : process.env;
            
            // Usar la variable de entorno correcta
            const stripeKey = import.meta.env.STRIPE_SECRET_KEY || env.STRIPE_SECRET_KEY;
            
            if (!stripeKey) {
            console.error('No se encontró la clave de API de Stripe');
            return new Response(
                JSON.stringify({ error: 'Configuración de Stripe no disponible' }),
                {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
                }
            );
        }
        
        const stripe = new Stripe(stripeKey);
        
        const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
            price_data: {
                currency: 'eur',
                product_data: { name: 'Versión Pro – ProgressoDev' },
                unit_amount: 290,
            },  
            quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${import.meta.env.SITE || env.SITE || 'http://localhost:4321'}/exito`,
        cancel_url: `${import.meta.env.SITE || env.SITE || 'http://localhost:4321'}/`,
        });

        console.log('Sesión de Stripe creada correctamente:', session.id);
        
        // Retornar un objeto Response 
        return new Response(
        JSON.stringify({ url: session.url }),
        {
            status: 200,
            headers: {
            "Content-Type": "application/json"
            }
        }
        );
    } catch (err) {
        console.error('Stripe error:', err);
        return new Response(
        JSON.stringify({ error: 'Error creando la sesión', message: err.message }),
        {
            status: 500,
            headers: {
            "Content-Type": "application/json"
            }
        }
        );
    }
}