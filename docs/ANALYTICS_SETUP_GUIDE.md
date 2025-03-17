# Google Analytics Setup Guide for VitalPredict AI

This guide will walk you through setting up Google Analytics 4 (GA4) for your VitalPredict AI application **after deployment**.

> **Note:** While the code for Google Analytics has been fully integrated into the application, the actual Google Analytics account setup should be completed after the site is deployed to its final domain.

## Step 1: Deploy Your Application

Before setting up Google Analytics:
1. Deploy your VitalPredict AI application to its final domain (e.g., using Vercel)
2. Make sure the site is accessible at its production URL

## Step 2: Create a Google Analytics Account

1. Go to [https://analytics.google.com/](https://analytics.google.com/)
2. Click "Start measuring" or sign in if you already have a Google account
3. Fill in the account setup form:
   - Account name (e.g., "VitalPredict AI")
   - Choose your data sharing settings
   - Click "Next"

## Step 3: Create a Property

1. Enter a property name (e.g., "VitalPredict AI Website")
2. Select your reporting time zone and currency
3. Click "Next"
4. Complete the business information form as appropriate
5. Click "Create"

## Step 4: Set Up Data Collection

1. Choose "Web" as your platform
2. Enter your **actual production website URL** (e.g., "https://vitalpredictai.com")
   > Important: Use your actual deployed domain, not localhost or a temporary domain
3. Name your data stream (e.g., "VitalPredict AI Website")
4. Click "Create stream"

## Step 5: Get Your Measurement ID

1. After creating your data stream, you'll see a "Measurement ID" 
   - It starts with "G-" followed by alphanumeric characters (e.g., "G-XXXXXXXXXX")
   - This is your `NEXT_PUBLIC_GA_MEASUREMENT_ID`
2. Copy this Measurement ID

## Step 6: Set Up Environment Variables in Production

1. In your hosting platform (e.g., Vercel):
   - Go to your project settings
   - Find the environment variables section
   - Add a new environment variable:
     ```
     NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
     ```
     (replace G-XXXXXXXXXX with your actual Measurement ID)
2. Save the environment variables
3. Redeploy your application if necessary

> Note: For local development, you can also add this to your `.env.local` file, but real tracking data will only be collected from the production site.

## Step 7: Testing Your Analytics Implementation

Once your site is deployed with the proper Measurement ID:

1. Visit your production website
2. Navigate to the `/admin/test-analytics` page (e.g., https://vitalpredictai.com/admin/test-analytics)
3. The test page will show you:
   - Whether your Measurement ID is properly configured
   - Status of pageview tracking
   - A button to send a test event

4. To verify tracking in Google Analytics:
   - In Google Analytics, go to "Reports" → "Realtime"
   - You should see your active session(s) appear
   - If you clicked "Send Test Event", check the "Events" section for a "test_event"
   - This may take a few minutes to show up

## Analytics Features in Your Application

Your VitalPredict AI application includes several built-in analytics features:

1. **Page View Tracking**: Automatically tracks when users visit different pages
2. **Event Tracking**: Records user interactions such as:
   - Form submissions
   - Button clicks
   - Checkout processes
   - Sign-ups
3. **E-commerce Tracking**: Monitors purchase events and checkout progress
4. **Performance Metrics**: Tracks page load times and user experience metrics

## How Analytics Are Implemented

The analytics implementation consists of several key components:

1. **`analytics.ts`**: Central module in `src/lib` that provides tracking functions
2. **`AnalyticsProvider`**: Component in `src/components` that initializes analytics and tracks page views
3. **Event tracking functions**: Used throughout the codebase to track user interactions

The implementation is designed to:
- Only load analytics in the browser, not during server-side rendering
- Respect user privacy and comply with GDPR requirements
- Provide meaningful data about user behavior and conversion

## Setting Up Custom Events

If you want to track additional custom events, you can use the analytics module:

1. Import the event function in your component:
   ```javascript
   import { event } from '@/lib/analytics';
   ```

2. Call the function when an event occurs:
   ```javascript
   event({
     action: 'button_click',
     category: 'Engagement',
     label: 'Start Trial',
     location: 'hero_section'
   });
   ```

## Setting Up Goals in Google Analytics

To track conversions and goals:

1. In Google Analytics, go to "Admin" → "Events" → "Conversions"
2. Click "New conversion event"
3. Enter the event name you want to track as a conversion (e.g., "completed_signup")
4. Click "Save"

Recommended goals to set up:
- Form submissions (`form_submission` events)
- Waitlist signups (`signup_completed` events)
- Checkout completions (`purchase` events)
- Key page visits (e.g., pricing page)

## Troubleshooting

If you're experiencing issues with Google Analytics:

1. Check that your Measurement ID is correctly set in your production environment variables
2. Make sure JavaScript is enabled in your browser
3. Disable any ad-blockers or privacy extensions that might block Google Analytics
4. Use the test page at `/admin/test-analytics` to diagnose issues
5. Check the browser console for any error messages

For more help, refer to the [Google Analytics 4 documentation](https://support.google.com/analytics/answer/9744165).
