# Stripe Setup Guide for VitalPredict AI

This guide will walk you through the process of setting up your Stripe account and connecting it to your VitalPredict AI application.

## Step 1: Create a Stripe Account

1. Go to [https://stripe.com](https://stripe.com)
2. Click "Start now" or "Create account"
3. Enter your email address and create a password
4. Complete the initial setup form with your business information
5. Verify your email address

## Step 2: Set Up Your Stripe Dashboard

1. After logging in, you'll be in the Stripe Dashboard
2. Go to the "Developers" section in the left sidebar
3. Click on "API keys"
4. You'll see two important keys:
   - `Publishable key`: This is your `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `Secret key`: This is your `STRIPE_SECRET_KEY` (keep this secret!)
5. Copy these values for later use
   - Note: If you're in test mode, you'll see test keys. That's fine for development.

## Step 3: Create a Product and Price

1. In the Stripe Dashboard, go to "Products" in the left sidebar
2. Click "Add product"
3. Fill in the product details:
   - Name (e.g., "VitalPredict AI Early Access")
   - Description (e.g., "Priority access to VitalPredict AI platform")
   - Image (optional)
4. In the "Pricing" section:
   - Choose "One time" or "Recurring" depending on your business model
   - Enter the price amount and currency
5. Click "Save product"
6. After saving, find and copy the "Price ID" (starts with "price_")
   - This will be your `STRIPE_PRICE_ID`

## Step 4: Set Up Webhook Endpoint

1. In the Stripe Dashboard, go to "Developers" → "Webhooks"
2. Click "Add endpoint"
3. For the endpoint URL:
   - During development: You can use a tool like ngrok to expose your local server
   - For production: Use `https://your-domain.com/api/webhooks/stripe`
4. Select the events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click "Add endpoint"
6. After creating the endpoint, you'll see a "Signing secret"
   - Click "Reveal" to see it
   - This is your `STRIPE_WEBHOOK_SECRET`
   - Copy this value for later use

## Step 5: Set Up Environment Variables

1. In your VitalPredict AI project folder, open the `.env.local` file (create it if you haven't already)
2. Add the following lines, replacing the placeholders with your actual values:
   ```
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
   STRIPE_PRICE_ID=your_stripe_price_id_here
   ```
3. Save the file

## Step 6: Test the Integration

1. Start your development server:
   ```
   npm run dev
   ```
2. Go to [http://localhost:3000](http://localhost:3000) in your browser
3. Try making a test payment:
   - Use the waitlist form or any payment button on your site
   - When redirected to the Stripe checkout, use these test card details:
     - Card number: `4242 4242 4242 4242`
     - Expiration date: Any future date (e.g., 12/25)
     - CVC: Any 3 digits (e.g., 123)
     - Name and address: Any values
4. After completing the test payment, you should be redirected back to your site
5. Check your Stripe Dashboard under "Payments" to verify the test payment was recorded

## Testing Webhooks Locally

To test webhooks during local development:

1. Install the Stripe CLI:
   - Instructions at [https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)

2. Log in to your Stripe account via the CLI:
   ```
   stripe login
   ```

3. Forward webhooks to your local server:
   ```
   stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
   ```

4. The CLI will show a webhook signing secret. Update your `.env.local` file with this temporary secret.

## Troubleshooting

### Payment Processing Issues

If payments aren't being processed correctly:

1. Check your browser console for error messages
2. Verify your Stripe API keys in the `.env.local` file
3. Make sure you're using a valid test card number
4. Check the Stripe Dashboard for any failed payment attempts

### Webhook Issues

If webhooks aren't working:

1. Check that your webhook endpoint is correctly set up in the Stripe Dashboard
2. Verify your webhook signing secret in the `.env.local` file
3. Look at the "Webhooks" section in the Stripe Dashboard to see if webhooks are being sent and their status
4. Check your server logs for any webhook-related errors

## Next Steps

After successfully setting up Stripe:

1. Configure Google Analytics (see the ANALYTICS_SETUP_GUIDE.md file)
2. Deploy your application to Vercel (see the DEPLOYMENT_GUIDE.md file)
3. Test the full payment flow in a production-like environment
