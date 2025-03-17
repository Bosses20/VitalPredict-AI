import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    // Get the request body as text for signature verification
    const body = await request.text();
    
    // Get the Stripe signature from headers
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      console.error('Webhook Error: No Stripe signature provided');
      return NextResponse.json(
        { error: 'No Stripe signature provided' },
        { status: 400 }
      );
    }

    // Validate configuration
    if (!process.env.STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET) {
      console.error('Stripe is not properly configured with environment variables');
      return NextResponse.json(
        { error: 'Stripe configuration error' },
        { status: 500 }
      );
    }
    
    // Verify the webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      const error = err as Error;
      console.error(`Webhook signature verification failed: ${error.message}`);
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${error.message}` },
        { status: 400 }
      );
    }

    // Handle the event
    console.log(`Received Stripe webhook: ${event.type}`);

    // Process based on event type
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        // Save order information to your database
        await handleCheckoutSessionCompleted(session);
        break;
      }
      
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        await handlePaymentIntentSucceeded(paymentIntent);
        break;
      }
      
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        await handlePaymentIntentFailed(paymentIntent);
        break;
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    // Return a response to acknowledge receipt of the event
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handler functions for specific event types
async function handleCheckoutSessionCompleted(session) {
  console.log('Processing completed checkout session:', session.id);
  
  try {
    // Get customer email from session
    const customerEmail = session.customer_email;
    const metadata = session.metadata || {};
    
    if (!customerEmail && !metadata.email) {
      console.warn('No customer email found in the session.');
      return;
    }
    
    const email = customerEmail || metadata.email;
    
    // Update the subscriber in the database to set has_purchased = true
    try {
      // First, call our RPC function to ensure the subscriber exists
      const { data: subscriberData, error: subscriberError } = await supabase.rpc('add_subscriber', {
        subscriber_email: email.toLowerCase(),
        subscriber_source: 'stripe_checkout',
        subscriber_interests: metadata.interests ? JSON.parse(metadata.interests) : null,
        subscriber_metadata: {
          customer_name: metadata.userName || '',
          checkout_session_id: session.id,
          checkout_completed: new Date().toISOString(),
          ...metadata
        }
      });
      
      if (subscriberError) {
        console.error('Error adding subscriber via RPC:', subscriberError);
      }
      
      // Now update the subscriber to set has_purchased = true
      const { data: updateData, error: updateError } = await supabase
        .from('subscribers')
        .update({ 
          has_purchased: true,
          updated_at: new Date().toISOString()
        })
        .eq('email', email.toLowerCase());
      
      if (updateError) {
        console.error('Error updating subscriber purchase status:', updateError);
      }
    } catch (e) {
      console.error('Error updating subscriber:', e);
    }
    
    // Record the payment in the payments table
    try {
      const { data: paymentData, error: paymentError } = await supabase
        .from('payments')
        .insert({
          email: email.toLowerCase(),
          stripe_customer_id: session.customer,
          stripe_session_id: session.id,
          payment_intent_id: session.payment_intent,
          amount: session.amount_total || 0,
          currency: session.currency || 'usd',
          status: 'completed',
          payment_method: session.payment_method_types?.[0] || 'unknown',
          metadata: {
            customer_name: metadata.userName || '',
            checkout_completed: new Date().toISOString(),
            ...metadata
          }
        });
        
      if (paymentError) {
        console.error('Error recording payment:', paymentError);
      }
    } catch (e) {
      console.error('Error inserting payment record:', e);
    }
    
    // Log analytics for payment completion
    console.log('Payment completed', {
      event: 'purchase',
      sessionId: session.id,
      customerId: session.customer,
      email: email,
      amount: session.amount_total,
      currency: session.currency,
    });
  } catch (error) {
    console.error('Error processing checkout session:', error);
  }
}

async function handlePaymentIntentSucceeded(paymentIntent) {
  console.log('Processing successful payment intent:', paymentIntent.id);
  
  try {
    // Extract customer information
    const customerId = paymentIntent.customer;
    const metadata = paymentIntent.metadata || {};
    
    if (!customerId && !metadata.email) {
      console.warn('No customer information found in the payment intent.');
      return;
    }
    
    // Get customer details if a customer ID is available
    let customerEmail = metadata.email;
    
    if (customerId && !customerEmail) {
      try {
        const customer = await stripe.customers.retrieve(customerId);
        if (customer && !customer.deleted && customer.email) {
          customerEmail = customer.email;
        }
      } catch (error) {
        console.error('Error retrieving customer from Stripe:', error);
      }
    }
    
    if (!customerEmail) {
      console.warn('Could not determine customer email for payment intent:', paymentIntent.id);
      return;
    }
    
    // Update payment record if it exists
    try {
      const { data: payments, error: searchError } = await supabase
        .from('payments')
        .select('id')
        .eq('payment_intent_id', paymentIntent.id)
        .limit(1);
      
      if (searchError) {
        console.error('Error searching for existing payment:', searchError);
      }
      
      if (payments && payments.length > 0) {
        // Update existing payment record
        const { data, error: updateError } = await supabase
          .from('payments')
          .update({
            status: 'succeeded',
            updated_at: new Date().toISOString(),
            metadata: {
              ...metadata,
              payment_succeeded: new Date().toISOString()
            }
          })
          .eq('payment_intent_id', paymentIntent.id);
          
        if (updateError) {
          console.error('Error updating payment record:', updateError);
        }
      } else {
        // Create a new payment record
        const { data, error: insertError } = await supabase
          .from('payments')
          .insert({
            email: customerEmail.toLowerCase(),
            stripe_customer_id: customerId,
            payment_intent_id: paymentIntent.id,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            status: 'succeeded',
            payment_method: paymentIntent.payment_method_type || 'unknown',
            metadata: {
              ...metadata,
              payment_succeeded: new Date().toISOString()
            }
          });
          
        if (insertError) {
          console.error('Error creating payment record:', insertError);
        }
      }
    } catch (e) {
      console.error('Error handling payment record:', e);
    }
  } catch (error) {
    console.error('Error processing payment intent success:', error);
  }
}

async function handlePaymentIntentFailed(paymentIntent) {
  console.log('Processing failed payment intent:', paymentIntent.id);
  
  try {
    // Extract customer information
    const customerId = paymentIntent.customer;
    const metadata = paymentIntent.metadata || {};
    
    // Update payment record if it exists
    try {
      const { data: payments, error: searchError } = await supabase
        .from('payments')
        .select('id')
        .eq('payment_intent_id', paymentIntent.id)
        .limit(1);
      
      if (searchError) {
        console.error('Error searching for existing payment:', searchError);
      }
      
      if (payments && payments.length > 0) {
        // Update existing payment record
        const { data, error: updateError } = await supabase
          .from('payments')
          .update({
            status: 'failed',
            updated_at: new Date().toISOString(),
            metadata: {
              ...metadata,
              payment_failed: new Date().toISOString(),
              failure_message: paymentIntent.last_payment_error?.message || 'Unknown error'
            }
          })
          .eq('payment_intent_id', paymentIntent.id);
          
        if (updateError) {
          console.error('Error updating failed payment record:', updateError);
        }
      }
    } catch (e) {
      console.error('Error handling failed payment record:', e);
    }
    
    // Log analytics for payment failure
    console.log('Payment failed', {
      event: 'payment_failed',
      paymentIntentId: paymentIntent.id,
      customerId: customerId,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      failureMessage: paymentIntent.last_payment_error?.message || 'Unknown error'
    });
  } catch (error) {
    console.error('Error processing payment intent failure:', error);
  }
}
