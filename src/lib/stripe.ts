/**
 * VitalPredict AI - Stripe Integration Utilities
 * 
 * This module provides utilities for integrating with Stripe for payment processing.
 */

import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe API client (server-side)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16', // Use the latest API version
});

// Initialize Stripe client (client-side)
let stripePromise: Promise<Stripe | null> | null = null;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

// Create a checkout session
export async function createCheckoutSession(email: string, metadata: Record<string, any> = {}) {
  try {
    // Create a checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}?canceled=true`,
      customer_email: email,
      metadata: {
        ...metadata,
        source: 'vitalpredict_ai_checkout',
        timestamp: new Date().toISOString(),
      },
    });

    return { 
      success: true, 
      sessionId: session.id,
      url: session.url,
    };
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return { 
      success: false, 
      error: error.message || 'Something went wrong' 
    };
  }
}

// Retrieve a checkout session
export async function getCheckoutSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'customer', 'line_items'],
    });
    
    return { success: true, session };
  } catch (error: any) {
    console.error('Error retrieving checkout session:', error);
    return { 
      success: false, 
      error: error.message || 'Something went wrong' 
    };
  }
}

// Mark a subscriber as paid in the database
export async function markSubscriberAsPaid(email: string, checkoutSessionId: string) {
  // This will be implemented with Supabase integration
  // Update the subscribers table to set has_purchased = true and store checkout_session_id
}
