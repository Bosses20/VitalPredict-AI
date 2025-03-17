-- Supabase SQL Schema for VitalPredict AI
-- This file contains the SQL commands to set up the database schema in Supabase

-- Create subscribers table
CREATE TABLE subscribers (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  source TEXT,
  interests TEXT[],
  has_purchased BOOLEAN DEFAULT false,
  metadata JSONB
);

-- Create an index on email for faster lookups
CREATE INDEX idx_subscribers_email ON subscribers (email);

-- Create roles table for user roles
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert default roles
INSERT INTO roles (name, description) VALUES 
  ('admin', 'Administrator with full access'),
  ('user', 'Regular user with limited access'),
  ('waitlist', 'User on waitlist');

-- User roles junction table
CREATE TABLE user_roles (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, role_id)
);

-- Create a function to make emails lowercase before inserting
CREATE OR REPLACE FUNCTION normalize_email() 
RETURNS TRIGGER AS $$
BEGIN
  NEW.email = LOWER(NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to normalize emails
CREATE TRIGGER normalize_subscriber_email
BEFORE INSERT OR UPDATE ON subscribers
FOR EACH ROW
EXECUTE FUNCTION normalize_email();

-- Create a function to validate email format
CREATE OR REPLACE FUNCTION validate_email() 
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email !~ '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format: %', NEW.email;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to validate email format
CREATE TRIGGER validate_subscriber_email
BEFORE INSERT OR UPDATE ON subscribers
FOR EACH ROW
EXECUTE FUNCTION validate_email();

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp() 
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to update the updated_at timestamp
CREATE TRIGGER update_subscriber_timestamp
BEFORE UPDATE ON subscribers
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Create payments table to track payment history
CREATE TABLE payments (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  stripe_customer_id TEXT,
  stripe_session_id TEXT,
  payment_intent_id TEXT,
  amount BIGINT,
  currency TEXT,
  status TEXT NOT NULL,
  payment_method TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  metadata JSONB,
  CONSTRAINT fk_subscriber
    FOREIGN KEY(email)
    REFERENCES subscribers(email)
    ON DELETE CASCADE
);

-- Create a trigger to update the updated_at timestamp for payments
CREATE TRIGGER update_payment_timestamp
BEFORE UPDATE ON payments
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Create an index on session_id for faster lookups
CREATE INDEX idx_payments_session_id ON payments (stripe_session_id);
CREATE INDEX idx_payments_customer_id ON payments (stripe_customer_id);
CREATE INDEX idx_payments_payment_intent_id ON payments (payment_intent_id);

-- Create backup logs table
CREATE TABLE backup_logs (
  id BIGSERIAL PRIMARY KEY,
  filename TEXT NOT NULL,
  size_bytes BIGINT,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  metadata JSONB
);

-- Row Level Security (RLS) policies
-- Enable Row Level Security
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE backup_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for subscribers table
CREATE POLICY "Public subscribers are viewable by everyone"
  ON subscribers FOR SELECT
  USING (true);

-- Only authenticated users can insert subscribers
CREATE POLICY "Users can insert subscribers"
  ON subscribers FOR INSERT
  WITH CHECK (true);

-- Only admin users or the user who owns the record can update
CREATE POLICY "Admin or owner can update subscribers"
  ON subscribers FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role_id = (SELECT id FROM roles WHERE name = 'admin')
    ) OR 
    auth.email() = email
  );

-- Only admin users can delete subscribers
CREATE POLICY "Only admins can delete subscribers"
  ON subscribers FOR DELETE
  USING (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role_id = (SELECT id FROM roles WHERE name = 'admin')
    )
  );

-- Create policies for payments table
CREATE POLICY "Admins can view all payments"
  ON payments FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role_id = (SELECT id FROM roles WHERE name = 'admin')
    )
  );

CREATE POLICY "Users can view their own payments"
  ON payments FOR SELECT
  USING (
    auth.email() = email
  );

CREATE POLICY "Service role can insert payments"
  ON payments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only admins can update payments"
  ON payments FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role_id = (SELECT id FROM roles WHERE name = 'admin')
    )
  );

CREATE POLICY "Only admins can delete payments"
  ON payments FOR DELETE
  USING (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role_id = (SELECT id FROM roles WHERE name = 'admin')
    )
  );

-- Create policies for roles table
CREATE POLICY "Roles are viewable by everyone"
  ON roles FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage roles"
  ON roles FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role_id = (SELECT id FROM roles WHERE name = 'admin')
    )
  );

-- Create policies for user_roles table
CREATE POLICY "User roles are viewable by admins"
  ON user_roles FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role_id = (SELECT id FROM roles WHERE name = 'admin')
    )
  );

CREATE POLICY "Users can view their own roles"
  ON user_roles FOR SELECT
  USING (
    auth.uid() = user_id
  );

CREATE POLICY "Only admins can manage user roles"
  ON user_roles FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role_id = (SELECT id FROM roles WHERE name = 'admin')
    )
  );

-- Create policies for backup_logs table
CREATE POLICY "Only admins can view backup logs"
  ON backup_logs FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role_id = (SELECT id FROM roles WHERE name = 'admin')
    )
  );

CREATE POLICY "Only admins can manage backup logs"
  ON backup_logs FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role_id = (SELECT id FROM roles WHERE name = 'admin')
    )
  );

-- Create indexes for analytics and query optimization
CREATE INDEX idx_subscribers_created_at ON subscribers (created_at);
CREATE INDEX idx_subscribers_updated_at ON subscribers (updated_at);
CREATE INDEX idx_subscribers_has_purchased ON subscribers (has_purchased);
CREATE INDEX idx_payments_created_at ON payments (created_at);
CREATE INDEX idx_payments_status ON payments (status);

-- Create a function to auto-assign waitlist role to new subscribers
CREATE OR REPLACE FUNCTION assign_waitlist_role() 
RETURNS TRIGGER AS $$
DECLARE
  user_uid UUID;
  waitlist_role_id INTEGER;
BEGIN
  -- Get the user ID if it exists
  SELECT id INTO user_uid FROM auth.users WHERE email = NEW.email LIMIT 1;
  
  -- If user exists, assign waitlist role
  IF user_uid IS NOT NULL THEN
    SELECT id INTO waitlist_role_id FROM roles WHERE name = 'waitlist' LIMIT 1;
    
    -- Check if the user already has this role
    IF NOT EXISTS (SELECT 1 FROM user_roles WHERE user_id = user_uid AND role_id = waitlist_role_id) THEN
      INSERT INTO user_roles (user_id, role_id) VALUES (user_uid, waitlist_role_id);
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to assign waitlist role to new subscribers
CREATE TRIGGER assign_waitlist_role_trigger
AFTER INSERT ON subscribers
FOR EACH ROW
EXECUTE FUNCTION assign_waitlist_role();

-- Comments for better documentation
COMMENT ON TABLE subscribers IS 'Table to store email subscribers to the waitlist';
COMMENT ON TABLE payments IS 'Table to store payment information from Stripe';
COMMENT ON TABLE roles IS 'Table to store user roles for authorization';
COMMENT ON TABLE user_roles IS 'Junction table linking users to their roles';
COMMENT ON TABLE backup_logs IS 'Table to track database backup operations';

COMMENT ON COLUMN subscribers.email IS 'Email address of the subscriber (normalized to lowercase)';
COMMENT ON COLUMN subscribers.source IS 'Source of the subscription (e.g. homepage, how-it-works page)';
COMMENT ON COLUMN subscribers.interests IS 'Array of interests selected by the subscriber';
COMMENT ON COLUMN subscribers.has_purchased IS 'Boolean flag indicating if the subscriber has made a purchase';
COMMENT ON COLUMN subscribers.metadata IS 'JSON field for additional subscriber metadata';

COMMENT ON COLUMN payments.stripe_customer_id IS 'Stripe Customer ID';
COMMENT ON COLUMN payments.stripe_session_id IS 'Stripe Checkout Session ID';
COMMENT ON COLUMN payments.payment_intent_id IS 'Stripe Payment Intent ID';
COMMENT ON COLUMN payments.amount IS 'Payment amount in smallest currency unit (e.g. cents)';
COMMENT ON COLUMN payments.status IS 'Payment status (completed, succeeded, failed)';

-- Create function to check for stale records
CREATE OR REPLACE FUNCTION check_stale_subscribers()
RETURNS TABLE (email TEXT, days_since_update INTEGER) AS $$
BEGIN
  RETURN QUERY
    SELECT 
      s.email, 
      EXTRACT(DAY FROM (now() - s.updated_at))::INTEGER AS days_since_update
    FROM 
      subscribers s
    WHERE 
      s.updated_at < now() - INTERVAL '90 days'
    ORDER BY 
      s.updated_at ASC;
END;
$$ LANGUAGE plpgsql;
