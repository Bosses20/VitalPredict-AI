# VitalPredict AI - Getting Started Guide

Welcome to VitalPredict AI! This guide will help you set up and start using your application.

## Overview

Your VitalPredict AI project is a Next.js application with the following integrated features:

- Landing page with waitlist signup
- Supabase integration for database and user management
- Stripe integration for payments and checkout
- SEO optimization (implemented)
- Performance enhancements (implemented)
- Analytics tracking (ready for configuration)

The Stripe and Supabase integrations are fully implemented, with just the Stripe webhook configuration needed after deployment.

## Quick Start Checklist

1. Set up your development environment
2. Supabase integration (COMPLETED)
3. Stripe integration for payment processing (COMPLETED)
   - Webhook configuration (PENDING - to be done after deployment)
4. Configure Google Analytics for tracking (OPTIONAL)
5. Deploy your application to Vercel

## Step 1: Set Up Your Development Environment

1. Make sure you have Node.js installed (version 14 or later)
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Step 2: Database Setup (Completed)

The Supabase integration has been completed with:
- Database schema for subscribers and payments
- Secure Row Level Security (RLS) policies
- Utility functions for database operations
- Webhook event logging

### Viewing Data in Supabase
To view your subscribers and payment data:
1. Log in to your [Supabase Dashboard](https://app.supabase.com)
2. Go to the "Table Editor" section
3. Browse the `subscribers` and `payments` tables

## Step 3: Stripe Integration (Completed)

The Stripe integration is fully implemented with:
- Checkout process for payments
- Thank you page for completed purchases
- Webhook handler code (ready for payment events)
- Database integration for tracking payments

### Pending: Post-Deployment Webhook Setup
After deploying your site and obtaining your domain:
1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to "Developers" > "Webhooks"
3. Add an endpoint pointing to your domain: `https://your-site.com/api/webhooks/stripe`
4. Select the events: `checkout.session.completed`, `payment_intent.succeeded`, and `payment_intent.payment_failed`
5. Add the provided Signing Secret to your environment variables as `STRIPE_WEBHOOK_SECRET`

## Setting Up Environment Variables

Create a `.env.local` file in the project root with the following variables:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PRICE_ID=your_stripe_price_id
STRIPE_WEBHOOK_SECRET=your_webhook_signing_secret_here

# Google Analytics Configuration
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_google_analytics_measurement_id
```

### Important notes about environment variables:

1. **Supabase Configuration**: Required for database operations and user authentication.
2. **Stripe Configuration**: Required for payment processing. The webhook secret will be configured after deployment.
3. **Google Analytics**: Required for tracking user interactions. Follow the instructions in `docs/ANALYTICS_SETUP_GUIDE.md` to set up Google Analytics.

## Project Structure

- `/src/app` - Next.js App Router pages and components
- `/src/components` - Reusable UI components
- `/src/sections` - Larger page sections (like Hero, Features, etc.)
- `/src/lib` - Utility functions and service integrations
  - `/src/lib/supabase.ts` - Supabase client and helper functions
  - `/src/lib/stripe.ts` - Stripe integration and checkout functions
- `/database/migrations` - SQL migration files for database setup
  - `/database/migrations/01_stripe_integration.sql` - SQL for payment-related tables

## Testing the Payment Flow

To test the payment flow:
1. Start your development server
2. Navigate to the early access offer section
3. Click "Secure Your Lifetime Access"
4. You'll be redirected to Stripe Checkout
5. Use Stripe's test card numbers (e.g., 4242 4242 4242 4242) for testing
6. After successful payment, you'll be redirected to the thank you page
7. Your payment will be recorded in the database

## Next Steps

See [NEXT_STEPS.md](./NEXT_STEPS.md) for detailed information on:
- Deploying your application
- Setting up analytics
- Post-deployment configurations
- Future enhancements

## Documentation

For more detailed information, refer to these project documents:
- [PROJECT_TIMELINE.md](./PROJECT_TIMELINE.md) - Overview of completed features
- [NEXT_STEPS.md](./NEXT_STEPS.md) - What to do next
- Any questions? Contact your development team for assistance!
