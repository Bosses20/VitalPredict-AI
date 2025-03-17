-- Quick fix for permission denied error
-- This allows public access to the subscribers table
-- WARNING: For development purposes only

-- Enable RLS on subscribers table
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for public access
-- This is the simplest fix but NOT recommended for production
CREATE POLICY "Allow public access to subscribers" ON subscribers
FOR ALL USING (true) WITH CHECK (true);

-- Recreate the users reference table if needed
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
