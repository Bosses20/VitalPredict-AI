/**
 * VitalPredict AI - Subscribers API
 * 
 * This API handles operations for managing subscribers:
 * - Adding new subscribers
 * - Getting subscriber information
 * - Updating subscriber preferences
 * - Deleting subscribers (admin only)
 * 
 * Some endpoints are protected by role-based authentication.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getUserSession } from '@/lib/auth';
import { subscribersTable, clearCache } from '@/lib/supabase';
import { logEvent } from '@/lib/analytics';

// Helper function to validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

// Handler for GET requests
export async function GET(request: NextRequest) {
  try {
    // Get user session to check authentication and role
    const session = await getUserSession();
    const isAdmin = session?.isAdmin || false;
    
    // Get operation and parameters from query string
    const { searchParams } = new URL(request.url);
    const operation = searchParams.get('operation');
    const email = searchParams.get('email');
    
    // Admin-only operations
    if (operation === 'list' && isAdmin) {
      const page = parseInt(searchParams.get('page') || '0');
      const pageSize = parseInt(searchParams.get('pageSize') || '20');
      
      const result = await subscribersTable.getAll(page, pageSize);
      return NextResponse.json(result);
    }
    
    // Get a specific subscriber (requires authentication and permission)
    if (operation === 'get' && email) {
      // Users can only look up their own email, admins can look up any
      if (!session) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }
      
      if (!isAdmin && session.email !== email) {
        return NextResponse.json(
          { error: 'Not authorized to access this subscriber' },
          { status: 403 }
        );
      }
      
      const result = await subscribersTable.getByEmail(email);
      return NextResponse.json(result);
    }
    
    return NextResponse.json(
      { error: 'Invalid operation or missing parameters' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error in subscribers API GET:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handler for POST requests
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source, interests, metadata } = body;
    
    // Validate email format
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }
    
    // Add the subscriber
    const result = await subscribersTable.add({
      email,
      source,
      interests,
      metadata
    });
    
    // Log analytics event for new subscriber
    if (result.success) {
      const eventData = {
        email,
        source,
        interests: interests || [],
        timestamp: new Date().toISOString(),
        referrer: request.headers.get('referer') || '',
        isNewSubscriber: result.message === 'Subscribed successfully',
      };
      
      logEvent('new_subscriber', eventData);
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in subscribers API POST:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handler for PATCH requests (updates)
export async function PATCH(request: NextRequest) {
  try {
    // Get user session to check authentication and role
    const session = await getUserSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Parse the request body
    const body = await request.json();
    const { email, interests, source, metadata } = body;
    
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }
    
    // Only allow users to update their own data (admins can update any)
    if (!session.isAdmin && session.email !== email) {
      return NextResponse.json(
        { error: 'Not authorized to update this subscriber' },
        { status: 403 }
      );
    }
    
    // Update the subscriber preferences
    const result = await subscribersTable.update(email, {
      interests,
      source,
      metadata
    });
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in subscribers API PATCH:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handler for DELETE requests
export async function DELETE(request: NextRequest) {
  try {
    // Get user session to check authentication and role
    const session = await getUserSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Get email from query string
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }
    
    // Only allow users to delete their own data (admins can delete any)
    if (!session.isAdmin && session.email !== email) {
      return NextResponse.json(
        { error: 'Not authorized to delete this subscriber' },
        { status: 403 }
      );
    }
    
    // Delete the subscriber
    const result = await subscribersTable.delete(email);
    
    // Log analytics event for unsubscribe
    if (result.success) {
      logEvent('unsubscribe', {
        email,
        timestamp: new Date().toISOString(),
        byAdmin: session.isAdmin && session.email !== email,
      });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in subscribers API DELETE:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
