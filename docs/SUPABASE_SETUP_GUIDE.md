# Supabase Setup Guide for VitalPredict AI

This guide will walk you through the process of setting up your Supabase account and connecting it to your VitalPredict AI application.

## Step 1: Create a Supabase Account

1. Go to [https://app.supabase.com/](https://app.supabase.com/)
2. Sign up for a new account (you can use GitHub, GitLab, or email)
3. Verify your email if you signed up with email

## Step 2: Create a New Project

1. After logging in, click "New Project"
2. Choose an organization (create one if needed)
3. Enter a name for your project (e.g., "VitalPredict AI")
4. Set a password for the database (make sure to save this securely)
5. Choose a region closest to your target audience
6. Click "Create new project"
7. Wait for your project to be created (this may take a few minutes)

## Step 3: Get Your API Keys

1. In your new project, go to "Project Settings" (gear icon in the sidebar)
2. Click "API" in the Project Settings menu
3. You'll see two important keys:
   - `URL`: This is your `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public`: This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role`: This is your `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)
4. Copy these values for the next step

## Step 4: Set Up Environment Variables

1. In your VitalPredict AI project folder, create a file named `.env.local`
2. Add the following lines to the file, replacing the placeholders with your actual values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```
3. Save the file

## Step 5: Set Up Database Schema

1. In your Supabase dashboard, go to the "SQL Editor" (in the sidebar)
2. Click "New Query"
3. In your project files, open the file `supabase-schema.sql`
4. Copy all the contents of this file
5. Paste this SQL into the Supabase SQL Editor
6. Click "Run" to execute the SQL and create your database tables

## Step 6: Test the Connection

1. In your terminal/command prompt, navigate to your project directory
2. Start your development server:
   ```
   npm run dev
   ```
3. Go to [http://localhost:3000](http://localhost:3000) in your browser
4. Test the waitlist form by submitting an email
5. Check your Supabase dashboard's "Table Editor" to verify that the subscriber data was saved

## Troubleshooting

### Connection Issues

If your application can't connect to Supabase:

1. Double-check your API keys and URL in the `.env.local` file
2. Make sure your Supabase project is active
3. Check your browser console for error messages

### Database Schema Issues

If you see database-related errors:

1. Make sure you've run the `supabase-schema.sql` file successfully
2. Check the "Table Editor" in Supabase to ensure all tables were created
3. Look for any error messages in the SQL Editor result when you ran the schema

### Other Issues

If you encounter other problems:

1. Check the Supabase documentation: [https://supabase.com/docs](https://supabase.com/docs)
2. Check your project's logs in the Supabase dashboard
3. Make sure you're using the latest version of the VitalPredict AI codebase

## Next Steps

After successfully setting up Supabase:

1. Set up Stripe integration (see the STRIPE_SETUP_GUIDE.md file)
2. Configure Google Analytics (see the ANALYTICS_SETUP_GUIDE.md file)
3. Deploy your application to Vercel (see the DEPLOYMENT_GUIDE.md file)
