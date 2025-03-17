import { NextRequest, NextResponse } from 'next/server';
import { stripe, createCheckoutSession } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

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

    // If no API key is configured, return an error
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PRICE_ID) {
      console.error('Missing Stripe configuration. STRIPE_SECRET_KEY and STRIPE_PRICE_ID must be set in environment variables.');
      return NextResponse.json(
        {
          success: false,
          message: 'Payment processing is not configured. Please contact support.',
        },
        { status: 500 }
      );
    }

    // Set up customer data
    const customerName = name || email?.split('@')[0];
    
    // Save customer in Stripe if email is provided
    let customerId: string | undefined = undefined;
    
    if (email) {
      // Check if the customer already exists
      const customers = await stripe.customers.list({
        email,
        limit: 1,
      });
      
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        
        // Update customer if we have new info
        if (name || customData) {
          await stripe.customers.update(customerId, {
            name: customerName,
            metadata: {
              ...customData,
              updated_at: new Date().toISOString(),
            }
          });
        }
      } else {
        // Create a new customer
        const customer = await stripe.customers.create({
          email,
          name: customerName,
          metadata: {
            ...customData,
            created_at: new Date().toISOString(),
          }
        });
        
        customerId = customer.id;
      }
    }
    
    // Prepare line items
    const lineItems = [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ];

    // Create a Checkout Session
    console.log('Creating Stripe checkout session...');
    const sessionConfig = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}?canceled=true`,
      metadata: {
        ...(email && { email }),
        ...(customerName && { userName: customerName }),
        ...customData,
      },
    };

    // Add customer_id if available
    if (customerId) {
      sessionConfig.customer = customerId;
    } 
    // Only add customer_email if no customer_id but email was provided
    else if (email) {
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

    // If the customer provided an email, also add them to the subscribers list in Supabase
    if (email) {
      try {
        // Call the Supabase RPC function to add a subscriber
        const { data, error } = await supabase.rpc('add_subscriber', {
          subscriber_email: email,
          subscriber_source: 'checkout',
          subscriber_interests: customData?.interests || null,
          subscriber_metadata: {
            name: customerName,
            checkout_session_id: session.id,
            timestamp: new Date().toISOString()
          }
        });
        
        if (error) {
          // Log the error but continue with checkout
          console.error('Error adding subscriber to database:', error);
        }
      } catch (dbError) {
        // Log the error but continue with checkout
        console.error('Failed to add subscriber to database:', dbError);
      }
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
        message: 'Server error, please try again later.',
      },
      { status: 500 }
    );
  }
}
