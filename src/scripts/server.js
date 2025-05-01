// This is your test secret API key.
const stripe = require('stripe')('STRIPE_TEST_SECRET_KEY');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4321';

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
        {
            // Provide the exact Price ID (for example, price_1234) of the product you want to sell
            price: '{{PRICE_ID}}',
            quantity: 1,
        },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success.html`,
        cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });

    res.redirect(303, session.url);
});

app.listen(4321, () => console.log('Running on port 4321'));