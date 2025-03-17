import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
// For security, use environment variables in production
const STRIPE_SECRET_KEY = 'sk_test_51R0Ep3IiRzaHtU7d6E2u78vKForCf3L4AJRnsrxbOBzsmqIk49pErktkaPB8fKZu6hTGRrGdFtefJ6UsF3ZJc6Hf00hhmx9Aji';
const STRIPE_WEBHOOK_SECRET = 'whsec_your_webhook_secret'; // Replace with your webhook signing secret

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

    // Initialize Stripe
    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15', // Using a compatible API version for Stripe v17
    });
    
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
        const session = event.data.object as Stripe.Checkout.Session;
        // Save order information to your database
        await handleCheckoutSessionCompleted(session);
        break;
      }
      
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentSucceeded(paymentIntent);
        break;
      }
      
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
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
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  // Implementation depends on your database and business logic
  console.log('Processing completed checkout session:', session.id);
  
  // Get customer email
  const customerEmail = session.customer_email;
  
  // Get customer metadata
  const metadata = session.metadata || {};
  
  // TODO: Save order information to your database
  
  // TODO: Send order confirmation email to customer
  
  console.log(`Checkout completed for: ${customerEmail}`);
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log('Processing successful payment intent:', paymentIntent.id);
  
  // TODO: Update order status in your database
  
  // Get any metadata from the payment intent
  const metadata = paymentIntent.metadata || {};
  
  console.log(`Payment succeeded for intent: ${paymentIntent.id}`);
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log('Processing failed payment intent:', paymentIntent.id);
  
  // TODO: Update order status in your database
  // TODO: Send payment failure notification to customer if needed
  
  console.log(`Payment failed for intent: ${paymentIntent.id}`);
}
