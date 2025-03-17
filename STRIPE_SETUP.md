# Stripe Integration Setup Guide

This document provides instructions for setting up the Stripe payment integration for VitalPredict AI.

## Prerequisites

1. A Stripe account (sign up at [stripe.com](https://stripe.com/))
2. A product created in your Stripe dashboard
3. API keys from your Stripe dashboard

## Step 1: Set Up Your Stripe Account 

1. Create a Stripe account if you don't have one: [stripe.com/register](https://stripe.com/register)
2. Navigate to the Stripe Dashboard
3. Make sure you're in "Test Mode" for development (toggle in the dashboard)

## Step 2: Create a Product and Price 

1. Go to Products > Add Product
2. Fill in the product details:
   - Name: "VitalPredict AI - Early Access"
   - Description: "Lifetime access to VitalPredict AI - Limited Early Access Offer"
3. Add a price:
   - Set your desired price (e.g., $199.00)
   - Select "One time"
4. Save the product
5. Price ID: `price_1R12LKIiRzaHtU7dIw7tTRZx`

## Step 3: Get Your API Keys 

1. In the Stripe Dashboard, go to Developers > API keys
2. Copy your test publishable key and secret key:
   - Publishable Key: `pk_test_51R0Ep3IiRzaHtU7dBPJzL5PHIMiRnwa5EgBtNvPAxBFAaEpt6OhjdbQIdWqqENvnyvBGhub8ndPXoLvMSq5Iopvu006tjIII0F`
   - Secret Key: `sk_test_51R0Ep3IiRzaHtU7d6E2u78vKForCf3L4AJRnsrxbOBzsmqIk49pErktkaPB8fKZu6hTGRrGdFtefJ6UsF3ZJc6Hf00hhmx9Aji`

## Step 4: Configure Environment Variables 

For local development, we've directly placed the keys in the code for testing purposes:

```typescript
// In checkout/route.ts and webhooks/stripe/route.ts
const STRIPE_SECRET_KEY = 'sk_test_51R0Ep3IiRzaHtU7d6E2u78vKForCf3L4AJRnsrxbOBzsmqIk49pErktkaPB8fKZu6hTGRrGdFtefJ6UsF3ZJc6Hf00hhmx9Aji';
const STRIPE_PRICE_ID = 'price_1R12LKIiRzaHtU7dIw7tTRZx';
```

For production, create a `.env.local` file in the root of your project with:

```
STRIPE_PUBLISHABLE_KEY=pk_test_51R0Ep3IiRzaHtU7dBPJzL5PHIMiRnwa5EgBtNvPAxBFAaEpt6OhjdbQIdWqqENvnyvBGhub8ndPXoLvMSq5Iopvu006tjIII0F
STRIPE_SECRET_KEY=sk_test_51R0Ep3IiRzaHtU7d6E2u78vKForCf3L4AJRnsrxbOBzsmqIk49pErktkaPB8fKZu6hTGRrGdFtefJ6UsF3ZJc6Hf00hhmx9Aji
STRIPE_PRICE_ID=price_1R12LKIiRzaHtU7dIw7tTRZx
```

## Step 5: Set Up Stripe Webhooks

1. In the Stripe Dashboard, go to Developers > Webhooks
2. Click "Add endpoint"
3. Enter your webhook URL: `https://your-domain.com/api/webhooks/stripe`
4. Select events to listen for:
   - checkout.session.completed
   - payment_intent.succeeded
   - payment_intent.payment_failed
5. Click "Add endpoint"
6. Copy the "Signing secret" - this is your webhook secret
7. Add it to your code or environment variables

## Step 6: Update Your Code

1. Make sure the `api/checkout/route.ts` file uses your environment variables:
   ```typescript
   const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
   const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID;
   ```

2. Make sure the `api/webhooks/stripe/route.ts` file uses your environment variables:
   ```typescript
   const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
   const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
   ```

## Step 7: Testing

1. Start your development server
2. Try making a test purchase using your website
3. Use one of Stripe's test card numbers for testing:
   - 4242 4242 4242 4242 (Visa, succeeds)
   - 4000 0000 0000 0002 (Visa, declined)
4. Check the Stripe Dashboard > Events to confirm the payment was processed
5. Verify that your webhook received the events

## Step 8: Going Live

When you're ready to go live:

1. Complete Stripe's account activation process
2. Switch to live mode in the Stripe Dashboard
3. Update your environment variables with the live keys
4. Set up the webhook endpoint for your production environment

## Troubleshooting

- **Checkout not working**: Make sure your PRICE_ID is correct and the product is active
- **Webhook failures**: Check that your webhook secret is correct and the URL is accessible
- **Payment failures**: Look at the Stripe Dashboard > Events for detailed error messages

For more details, refer to the [Stripe API Documentation](https://stripe.com/docs/api).
