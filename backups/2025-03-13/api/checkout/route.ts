import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Stripe configuration
const STRIPE_SECRET_KEY = 'sk_test_51R0Ep3IiRzaHtU7d6E2u78vKForCf3L4AJRnsrxbOBzsmqIk49pErktkaPB8fKZu6hTGRrGdFtefJ6UsF3ZJc6Hf00hhmx9Aji';
const STRIPE_PRICE_ID = 'price_1R12LKIiRzaHtU7dIw7tTRZx';

// Email validation helper function
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body (email, name, custom data, etc.)
    const body = await request.json();
    const { email, name, customData } = body;

    console.log(`Creating checkout for: ${email || 'no email provided'}`);
    
    // Email validation is only required if provided
    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'If provided, email must be a valid email address.',
        },
        { status: 400 }
      );
    }

    // If no API key is configured, return a demo checkout URL for testing
    if (!STRIPE_SECRET_KEY) {
      console.warn('No Stripe API key found. Using demo checkout URL.');
      return NextResponse.json({
        success: true,
        checkoutUrl: `https://example.com/demo-checkout?email=${encodeURIComponent(email)}`,
      });
    }

    // Initialize Stripe
    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15', // Using a compatible API version for Stripe v17
    });

    // Set up customer data
    const customerName = name || email?.split('@')[0];
    
    // Prepare line items
    const lineItems = [
      {
        price: STRIPE_PRICE_ID,
        quantity: 1,
      },
    ];

    // Create a Checkout Session
    console.log('Creating Stripe checkout session...');
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}?canceled=true`,
      client_reference_id: customData?.userId || email || 'anonymous',
      metadata: {
        ...(email && { email }),
        ...(customerName && { userName: customerName }),
        ...customData,
      },
    };

    // Only add customer_email if a valid email was provided
    if (email) {
      sessionConfig.customer_email = email;
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    if (!session || !session.url) {
      console.error('Failed to create Stripe checkout session:', session);
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to create checkout session.',
        },
        { status: 500 }
      );
    }

    // Return the checkout URL to the client
    return NextResponse.json({
      success: true,
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while creating the checkout.',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
