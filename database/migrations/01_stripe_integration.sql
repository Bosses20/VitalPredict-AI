-- Migration script for setting up Stripe integration tables and functions
-- Run this script in your Supabase SQL Editor

-- Create or update the payments table
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL REFERENCES subscribers(email) ON DELETE CASCADE,
    stripe_customer_id TEXT,
    stripe_session_id TEXT,
    payment_intent_id TEXT,
    amount INTEGER NOT NULL,
    currency TEXT NOT NULL,
    status TEXT NOT NULL,
    payment_method TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    metadata JSONB
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS payments_email_idx ON payments(email);
CREATE INDEX IF NOT EXISTS payments_payment_intent_id_idx ON payments(payment_intent_id);
CREATE INDEX IF NOT EXISTS payments_stripe_session_id_idx ON payments(stripe_session_id);
CREATE INDEX IF NOT EXISTS payments_stripe_customer_id_idx ON payments(stripe_customer_id);

-- Create RLS policies for the payments table
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Only allow viewing your own payment data
CREATE POLICY payments_select_policy ON payments 
    FOR SELECT 
    USING (auth.uid() IN (
        SELECT auth.uid() 
        FROM auth.users 
        WHERE email = payments.email
    ));

-- Allow service role to do anything
CREATE POLICY payments_service_policy ON payments 
    FOR ALL 
    TO service_role 
    USING (true);

-- Create or replace add_subscriber function
CREATE OR REPLACE FUNCTION add_subscriber(
    subscriber_email TEXT,
    subscriber_source TEXT DEFAULT 'website',
    subscriber_interests TEXT[] DEFAULT NULL,
    subscriber_metadata JSONB DEFAULT '{}'
) RETURNS JSONB AS $$
DECLARE
    result JSONB;
    existing_subscriber RECORD;
BEGIN
    -- Check if subscriber exists
    SELECT * INTO existing_subscriber 
    FROM subscribers 
    WHERE email = LOWER(subscriber_email) 
    LIMIT 1;
    
    IF existing_subscriber.id IS NOT NULL THEN
        -- Update existing subscriber
        UPDATE subscribers
        SET 
            source = COALESCE(subscriber_source, existing_subscriber.source),
            interests = COALESCE(subscriber_interests, existing_subscriber.interests),
            updated_at = NOW(),
            metadata = existing_subscriber.metadata || subscriber_metadata
        WHERE email = LOWER(subscriber_email)
        RETURNING json_build_object(
            'success', true,
            'message', 'Subscriber updated',
            'subscriber_id', id,
            'email', email
        ) INTO result;
    ELSE
        -- Insert new subscriber
        INSERT INTO subscribers (
            email,
            source,
            interests,
            has_purchased,
            metadata
        )
        VALUES (
            LOWER(subscriber_email),
            subscriber_source,
            subscriber_interests,
            false,
            subscriber_metadata
        )
        RETURNING json_build_object(
            'success', true,
            'message', 'Subscriber added',
            'subscriber_id', id,
            'email', email
        ) INTO result;
    END IF;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to record a payment
CREATE OR REPLACE FUNCTION record_payment(
    customer_email TEXT,
    stripe_customer TEXT,
    stripe_session TEXT,
    payment_intent TEXT,
    payment_amount INTEGER,
    payment_currency TEXT,
    payment_status TEXT,
    payment_method TEXT DEFAULT NULL,
    payment_metadata JSONB DEFAULT '{}'
) RETURNS JSONB AS $$
DECLARE
    result JSONB;
    new_payment_id INTEGER;
BEGIN
    -- Ensure subscriber exists first
    PERFORM add_subscriber(
        customer_email, 
        'stripe_payment', 
        NULL, 
        payment_metadata || json_build_object('last_payment', payment_amount, 'payment_time', NOW())
    );
    
    -- Insert the payment record
    INSERT INTO payments (
        email,
        stripe_customer_id,
        stripe_session_id,
        payment_intent_id,
        amount,
        currency,
        status,
        payment_method,
        metadata
    )
    VALUES (
        LOWER(customer_email),
        stripe_customer,
        stripe_session,
        payment_intent,
        payment_amount,
        payment_currency,
        payment_status,
        payment_method,
        payment_metadata
    )
    RETURNING id INTO new_payment_id;
    
    -- If payment is successful, update subscriber
    IF payment_status = 'completed' OR payment_status = 'succeeded' THEN
        UPDATE subscribers
        SET 
            has_purchased = true,
            updated_at = NOW(),
            metadata = metadata || json_build_object(
                'last_payment_id', new_payment_id,
                'last_payment_time', NOW()
            )
        WHERE email = LOWER(customer_email);
    END IF;
    
    RETURN json_build_object(
        'success', true,
        'message', 'Payment recorded',
        'payment_id', new_payment_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create webhook event log table
CREATE TABLE IF NOT EXISTS webhook_events (
    id SERIAL PRIMARY KEY,
    provider TEXT NOT NULL,
    event_type TEXT NOT NULL,
    event_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    processed BOOLEAN NOT NULL DEFAULT false,
    raw_data JSONB,
    metadata JSONB
);

-- Create index for webhook events
CREATE INDEX IF NOT EXISTS webhook_events_provider_event_id_idx ON webhook_events(provider, event_id);

-- Webhook event processing function
CREATE OR REPLACE FUNCTION log_webhook_event(
    event_provider TEXT,
    event_type TEXT,
    event_id TEXT,
    event_data JSONB,
    event_metadata JSONB DEFAULT '{}'
) RETURNS JSONB AS $$
DECLARE
    result JSONB;
    new_event_id INTEGER;
    existing_event RECORD;
BEGIN
    -- Check if this event has been processed before
    IF event_id IS NOT NULL THEN
        SELECT * INTO existing_event 
        FROM webhook_events 
        WHERE provider = event_provider AND event_id = event_id
        LIMIT 1;
        
        IF existing_event.id IS NOT NULL THEN
            RETURN json_build_object(
                'success', false,
                'message', 'Event already processed',
                'event_id', existing_event.id
            );
        END IF;
    END IF;
    
    -- Insert the webhook event
    INSERT INTO webhook_events (
        provider,
        event_type,
        event_id,
        raw_data,
        metadata
    )
    VALUES (
        event_provider,
        event_type,
        event_id,
        event_data,
        event_metadata
    )
    RETURNING id INTO new_event_id;
    
    RETURN json_build_object(
        'success', true,
        'message', 'Webhook event logged',
        'event_id', new_event_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
