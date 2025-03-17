# VitalPredict AI - Setup Guide

This document provides instructions for setting up and configuring the VitalPredict AI project for deployment.

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_PRICE_ID=your_stripe_price_id
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Analytics (Optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_id
```

## Supabase Setup

1. Create a new Supabase project at [https://app.supabase.com/](https://app.supabase.com/)
2. Go to Project Settings > API to get your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. In the SQL Editor, run the contents of the `supabase-schema.sql` file to set up your database schema
4. Test your connection by running:

```bash
curl -X GET "https://your-supabase-url/rest/v1/subscribers?select=*" \
-H "apikey: your-anon-key" \
-H "Authorization: Bearer your-anon-key"
```

## Stripe Setup

1. Create a Stripe account at [https://stripe.com](https://stripe.com)
2. Set up a product and price in the Stripe Dashboard
   - Go to Products > Add Product
   - Add a name, description, and price
   - Save the product
   - Copy the Price ID to use as `STRIPE_PRICE_ID`
3. Get your API keys from the Developers > API keys section:
   - `STRIPE_SECRET_KEY`: Use the Secret key
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Use the Publishable key
4. Set up a webhook:
   - Go to Developers > Webhooks
   - Add an endpoint (your production URL + `/api/webhooks/stripe`)
   - Select events to listen for:
     - `checkout.session.completed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
   - Once created, click "Reveal" to get your Signing Secret for `STRIPE_WEBHOOK_SECRET`
5. For testing webhooks locally, use the Stripe CLI or ngrok

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Production Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add all environment variables in the Vercel project settings
4. Deploy your project

### Custom Domain Setup

1. Add your custom domain in Vercel
2. Update DNS settings with your domain registrar
3. Verify ownership and wait for propagation

## Updating the Schema

If you need to modify the database schema:

1. Make changes to the `supabase-schema.sql` file
2. Run the new migrations in the Supabase SQL Editor
3. Update the TypeScript interfaces in `src/lib/supabase.ts` to match your schema changes

## Testing the Integration

1. Test the email subscription form
2. Test the payment flow with Stripe test cards
3. Verify that data is being saved to Supabase
4. Check that webhooks are working properly

## Troubleshooting

- **Webhook Issues**: Check Stripe Dashboard > Developers > Webhooks > Recent Events to see if webhooks are being sent and their response status
- **Database Connection Issues**: Verify your Supabase URL and API keys
- **Payment Processing Errors**: Check the Stripe Dashboard > Payments for details on failed payments
