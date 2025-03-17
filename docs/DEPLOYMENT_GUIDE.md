# Deployment Guide for VitalPredict AI

This guide will walk you through deploying your VitalPredict AI application to Vercel.

## Step 1: Prepare Your Project for Deployment

1. Make sure all your environment variables are properly set up in `.env.local`
2. Ensure your application runs correctly in development mode (`npm run dev`)
3. Commit all your changes to your Git repository (GitHub, GitLab, or Bitbucket)

## Step 2: Create a Vercel Account

1. Go to [https://vercel.com/signup](https://vercel.com/signup)
2. Choose to sign up with GitHub, GitLab, Bitbucket, or email
3. Complete the signup process and verify your email if needed

## Step 3: Install Git if You Haven't Already

If you don't have Git installed:

1. Download Git from [https://git-scm.com/downloads](https://git-scm.com/downloads)
2. Install it following the instructions for your operating system
3. Configure Git with your name and email:
   ```
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

## Step 4: Create a Git Repository (If Not Already Done)

If your project isn't already in a Git repository:

1. Initialize a new Git repository:
   ```
   git init
   ```
2. Add all files to the repository:
   ```
   git add .
   ```
3. Commit the files:
   ```
   git commit -m "Initial commit for VitalPredict AI"
   ```

## Step 5: Connect to a Git Provider

1. Create a repository on GitHub, GitLab, or Bitbucket
2. Follow the instructions provided by the service to push your existing repository

For GitHub, typically:
```
git remote add origin https://github.com/yourusername/vitalpredictai.git
git branch -M main
git push -u origin main
```

## Step 6: Import Your Project to Vercel

1. Log in to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Choose the Git provider where your repository is hosted
4. Select your VitalPredict AI repository from the list
5. Vercel will automatically detect that it's a Next.js project

## Step 7: Configure Environment Variables

1. In the Vercel project setup, go to the "Environment Variables" section
2. Add all the environment variables from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `STRIPE_PRICE_ID`
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
3. Make sure to mark which variables should be exposed to the browser (those with `NEXT_PUBLIC_` prefix)

## Step 8: Deploy Your Project

1. Click "Deploy"
2. Vercel will build and deploy your application
3. Once completed, you'll get a deployment URL (e.g., `vitalpredictai.vercel.app`)

## Step 9: Configure Custom Domain (Optional)

1. In your Vercel project dashboard, go to "Settings" → "Domains"
2. Click "Add" and enter your domain name
3. Follow the instructions to configure your DNS settings
4. Options include:
   - Using Vercel's nameservers
   - Adding A, CNAME, or TXT records to your existing DNS configuration

## Step 10: Update Webhook URLs

After deployment, update your webhook URLs to point to your production domain:

1. In Stripe Dashboard, go to "Developers" → "Webhooks"
2. Edit your webhook endpoint
3. Update the URL to `https://your-domain.com/api/webhooks/stripe`
4. Click "Update endpoint"

## Step 11: Verify Your Deployment

1. Visit your deployment URL
2. Test all key functionality:
   - Navigation
   - Form submissions
   - Payment processing
   - Analytics tracking
3. Check for any console errors or visual issues

## Continuous Deployment

Vercel automatically sets up continuous deployment:

1. Any new commits to your main branch will trigger a new deployment
2. You can create preview deployments by creating pull requests
3. Each deployment gets a unique URL for testing

## Monitoring and Logs

To monitor your application:

1. In your Vercel dashboard, go to your project
2. Use the "Analytics" tab to view traffic and performance metrics
3. Check the "Logs" tab to troubleshoot any server issues
4. Set up "Monitoring" to receive alerts for errors or performance issues

## Rollbacks

If you need to revert to a previous version:

1. Go to your project in Vercel dashboard
2. Click "Deployments" to see deployment history
3. Find the working deployment and click the three dots menu
4. Select "Promote to Production" to roll back

## Troubleshooting Deployment Issues

### Build Failures

If your build fails:

1. Check the build logs for specific errors
2. Common issues include:
   - Missing dependencies
   - Environment variable problems
   - TypeScript or linting errors

### Runtime Errors

If your application deploys but doesn't work correctly:

1. Check browser console for frontend errors
2. Check Function Logs in Vercel for serverless function errors
3. Verify that all environment variables are correctly set
4. Test API endpoints individually to isolate issues

## Next Steps After Deployment

1. **Configure Stripe Webhooks:**
   - Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
   - Go to "Developers" > "Webhooks"
   - Click "Add endpoint" and enter your production URL with the webhook path:
     ```
     https://your-domain.com/api/webhooks/stripe
     ```
   - Select the events to listen for:
     - `checkout.session.completed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
   - After creating the webhook, copy the Signing Secret
   - Add this secret to your Vercel environment variables as `STRIPE_WEBHOOK_SECRET`
   - Redeploy your application if necessary

2. **Set Up Google Analytics:**
   - Create a Google Analytics 4 account if you don't have one
   - Set up a new property for your website with your production domain
   - Copy the Measurement ID (starts with G-) 
   - Add this ID to your Vercel environment variables as `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - Verify analytics is working by visiting the `/admin/test-analytics` page on your production site
   - Refer to the full instructions in `docs/ANALYTICS_SETUP_GUIDE.md`

3. Set up a regular backup schedule for your Supabase database
4. Configure monitoring alerts for your application
5. Implement a staging environment for testing before production
6. Consider setting up a content delivery network (CDN) for global performance
