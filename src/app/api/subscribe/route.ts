import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

// Define schema for validation
const schema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
  interests: z.array(z.string()).optional(),
});

type Subscriber = {
  email: string;
  timestamp: string;
  source?: string;
  interests?: string[];
};

// Initialize data directory and file if they don't exist
function initializeDataStorage() {
  // Removed as it's not needed with Supabase integration
}

// Read subscribers from file
function getSubscribers(): Subscriber[] {
  // Removed as it's not needed with Supabase integration
  return [];
}

// Write subscribers to file
function saveSubscribers(subscribers: Subscriber[]) {
  // Removed as it's not needed with Supabase integration
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate input
    const validationResult = schema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid email format' 
      }, { status: 400 });
    }
    
    const { email, source, interests } = validationResult.data;
    
    // Use the add_subscriber function instead of direct table access
    const { data, error } = await supabase.rpc('add_subscriber', {
      subscriber_email: email,
      subscriber_source: source || null,
      subscriber_interests: interests || null,
      subscriber_metadata: {
        signup_url: request.headers.get('referer') || 'unknown',
        user_agent: request.headers.get('user-agent') || 'unknown',
        timestamp: new Date().toISOString()
      }
    });
    
    if (error) {
      console.error('Error adding subscriber:', error);
      return NextResponse.json({ 
        success: false, 
        message: 'Server error, please try again later' 
      }, { status: 500 });
    }
    
    const result = data;
    
    if (!result.success) {
      return NextResponse.json({ 
        success: false, 
        message: result.message 
      }, { status: result.message === 'Email already subscribed' ? 409 : 500 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: result.message
    });
    
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Server error, please try again later' 
    }, { status: 500 });
  }
}
