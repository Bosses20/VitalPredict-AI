-- Fix the Supabase authentication issues

-- First, create the users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  metadata JSONB
);

-- Enable Row Level Security on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for the users table
CREATE POLICY "Allow users to read their own data" ON users
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Allow service role full access to users" ON users
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

-- Enable anonymous insert for subscribers table for waitlist form
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert to subscribers" ON subscribers
FOR INSERT TO anon
WITH CHECK (true);

CREATE POLICY "Allow users to read their own subscriber data" ON subscribers
FOR SELECT USING (
  (SELECT email FROM users WHERE id = auth.uid()) = subscribers.email
);

CREATE POLICY "Allow service role full access to subscribers" ON subscribers
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

-- Create user_roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_roles (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role_id)
);

-- Enable RLS on user_roles
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Create policies for user_roles
CREATE POLICY "Allow users to read their own roles" ON user_roles
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow service role full access to user_roles" ON user_roles
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

-- Create a function that allows subscribing to waitlist without auth
CREATE OR REPLACE FUNCTION public.add_subscriber(
  subscriber_email TEXT,
  subscriber_source TEXT DEFAULT NULL,
  subscriber_interests TEXT[] DEFAULT NULL,
  subscriber_metadata JSONB DEFAULT NULL
) RETURNS JSONB AS $$
DECLARE
  existing_record RECORD;
  new_record RECORD;
  result JSONB;
BEGIN
  -- Check if email already exists
  SELECT * INTO existing_record FROM subscribers 
  WHERE email = subscriber_email LIMIT 1;
  
  IF existing_record.id IS NOT NULL THEN
    -- Email already exists
    RETURN json_build_object(
      'success', false,
      'message', 'Email already subscribed'
    );
  END IF;
  
  -- Insert new subscriber
  INSERT INTO subscribers (
    email, 
    source, 
    interests, 
    has_purchased,
    metadata
  ) VALUES (
    subscriber_email,
    subscriber_source,
    subscriber_interests,
    false,
    subscriber_metadata
  )
  RETURNING * INTO new_record;
  
  -- Return success
  RETURN json_build_object(
    'success', true,
    'message', 'Subscribed successfully',
    'data', row_to_json(new_record)
  );
  
EXCEPTION WHEN OTHERS THEN
  -- Return error
  RETURN json_build_object(
    'success', false,
    'message', 'Error: ' || SQLERRM
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
