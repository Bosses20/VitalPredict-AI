-- Enable Row Level Security on the subscribers table
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies for the subscribers table
-- Allow anonymous users to insert into subscribers
CREATE POLICY "Allow anonymous insert to subscribers" ON subscribers
FOR INSERT TO anon
WITH CHECK (true);

-- Allow authenticated users to read their own subscriber data
CREATE POLICY "Allow authenticated users to read their own data" ON subscribers
FOR SELECT TO authenticated
USING (auth.uid() IN (
  SELECT auth.uid() FROM auth.users WHERE email = subscribers.email
));

-- Allow service role to do everything
CREATE POLICY "Allow service role full access to subscribers" ON subscribers
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

-- Create a function to check if a user has admin rights
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS boolean AS $$
DECLARE
  is_admin boolean;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = $1 
    AND role_id IN (SELECT id FROM roles WHERE name = 'admin')
  ) INTO is_admin;
  
  RETURN is_admin;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Allow admins to manage all subscribers
CREATE POLICY "Allow admins to manage all subscribers" ON subscribers
FOR ALL TO authenticated
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));
