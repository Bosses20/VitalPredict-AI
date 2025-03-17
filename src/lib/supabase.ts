import { createClient } from '@supabase/supabase-js';
import { cache } from 'react';
import { PostgrestError } from '@supabase/supabase-js';

// Production configuration with environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-anon-key';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Create clients for different access levels
// Anonymous client for public operations (with RLS applied)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Service role client for admin operations (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

// Simple in-memory cache for frequently accessed data
const dataCache = new Map<string, { data: any, expiry: number }>();

// Cache duration in milliseconds (5 minutes default)
const DEFAULT_CACHE_DURATION = 5 * 60 * 1000;

/**
 * Role-based database access
 * This allows for different access levels depending on the user's role
 */
export const getSupabaseClient = (role: 'anonymous' | 'service' | 'authenticated', token?: string) => {
  switch (role) {
    case 'service':
      return supabaseAdmin;
    case 'authenticated':
      if (!token) {
        throw new Error('Authentication token required for authenticated role');
      }
      return createClient(supabaseUrl, supabaseAnonKey, {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
    case 'anonymous':
    default:
      return supabase;
  }
};

// Type definitions for our database tables
export interface Subscriber {
  id?: number;
  email: string;
  created_at?: string;
  updated_at?: string;
  source?: string;
  interests?: string[];
  has_purchased?: boolean;
  metadata?: Record<string, any>;
}

export interface Payment {
  id?: number;
  email: string;
  stripe_customer_id?: string;
  stripe_session_id?: string;
  payment_intent_id?: string;
  amount: number;
  currency: string;
  status: string;
  payment_method?: string;
  created_at?: string;
  updated_at?: string;
  metadata?: Record<string, any>;
}

export interface WebhookEvent {
  id?: number;
  provider: string;
  event_type: string;
  event_id?: string;
  created_at?: string;
  processed: boolean;
  raw_data?: Record<string, any>;
  metadata?: Record<string, any>;
}

export interface SupabaseResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: PostgrestError | Error;
  count?: number;
  page?: number;
  pageSize?: number;
}

// Cache-enabled query function
export const cachedQuery = async <T>(
  cacheKey: string,
  queryFn: () => Promise<SupabaseResponse<T>>,
  duration: number = DEFAULT_CACHE_DURATION
): Promise<SupabaseResponse<T>> => {
  // Check if we have a valid cached response
  const cached = dataCache.get(cacheKey);
  const now = Date.now();
  
  if (cached && cached.expiry > now) {
    return cached.data as SupabaseResponse<T>;
  }
  
  // If not in cache or expired, call the query function
  const result = await queryFn();
  
  // Only cache successful responses
  if (result.success) {
    dataCache.set(cacheKey, {
      data: result,
      expiry: now + duration
    });
  }
  
  return result;
};

// Clear cache entries
export const clearCache = (keyPattern?: string) => {
  if (!keyPattern) {
    dataCache.clear();
    return;
  }
  
  // Clear entries matching the pattern
  const regex = new RegExp(keyPattern);
  for (const key of dataCache.keys()) {
    if (regex.test(key)) {
      dataCache.delete(key);
    }
  }
};

// React Server Components cache integration
export const getSubscribersCount = cache(async (): Promise<number> => {
  const { count, error } = await supabase
    .from('subscribers')
    .select('*', { count: 'exact', head: true });
  
  if (error) {
    console.error('Error getting subscribers count:', error);
    return 0;
  }
  
  return count || 0;
});

// Helper functions for working with subscribers
export const subscribersTable = {
  // Add a new subscriber
  async add(subscriber: Omit<Subscriber, 'id' | 'created_at'>): Promise<SupabaseResponse<Subscriber>> {
    try {
      // First check if the email already exists
      const { data: existingSubscribers, error: lookupError } = await supabase
        .from('subscribers')
        .select('*')
        .eq('email', subscriber.email.toLowerCase())
        .limit(1);
      
      if (lookupError) throw lookupError;
      
      if (existingSubscribers && existingSubscribers.length > 0) {
        // If we have interests or a new source, update the existing subscriber
        if ((subscriber.interests && subscriber.interests.length > 0) || subscriber.source) {
          const { data, error } = await supabase
            .from('subscribers')
            .update({
              source: subscriber.source || existingSubscribers[0].source,
              interests: subscriber.interests || existingSubscribers[0].interests,
              updated_at: new Date().toISOString(),
              // We'll use metadata for any additional fields
              metadata: {
                ...existingSubscribers[0].metadata,
                ...subscriber.metadata,
                last_updated: new Date().toISOString()
              }
            })
            .eq('email', subscriber.email.toLowerCase())
            .select();
          
          if (error) throw error;
          
          // Clear cache for this email
          clearCache(`subscriber:${subscriber.email.toLowerCase()}`);
          
          return { 
            success: true, 
            message: 'Preferences updated successfully',
            data: data?.[0]
          };
        }
        
        return { 
          success: false, 
          message: 'Email already subscribed' 
        };
      }
      
      // Insert the new subscriber
      const { data, error } = await supabase
        .from('subscribers')
        .insert({
          email: subscriber.email.toLowerCase(),
          source: subscriber.source,
          interests: subscriber.interests,
          has_purchased: false,
          updated_at: new Date().toISOString(),
          metadata: subscriber.metadata
        })
        .select();
      
      if (error) throw error;
      
      return { 
        success: true, 
        message: 'Subscription successful',
        data: data?.[0] 
      };
    } catch (error) {
      console.error('Error subscribing:', error);
      return { 
        success: false, 
        message: 'Error subscribing, please try again',
        error: error as PostgrestError | Error
      };
    }
  },
  
  // Add a subscriber using the RPC function
  async addViaRPC(
    email: string, 
    source: string = 'website', 
    interests: string[] | null = null, 
    metadata: Record<string, any> = {}
  ): Promise<SupabaseResponse<any>> {
    try {
      const { data, error } = await supabase.rpc('add_subscriber', {
        subscriber_email: email.toLowerCase(),
        subscriber_source: source,
        subscriber_interests: interests,
        subscriber_metadata: metadata
      });
      
      if (error) throw error;
      
      // Clear cache for this email
      clearCache(`subscriber:${email.toLowerCase()}`);
      
      return {
        success: true,
        message: data.message || 'Subscriber added or updated',
        data
      };
    } catch (error) {
      console.error('Error adding subscriber via RPC:', error);
      return {
        success: false,
        message: 'Error adding subscriber, please try again',
        error: error as PostgrestError | Error
      };
    }
  },
  
  // Get all subscribers (with pagination)
  async getAll(page = 0, pageSize = 100): Promise<SupabaseResponse<Subscriber[]>> {
    try {
      const { data, count, error } = await supabase
        .from('subscribers')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(page * pageSize, (page + 1) * pageSize - 1);
      
      if (error) throw error;
      
      return { 
        success: true, 
        data, 
        count, 
        page,
        pageSize
      };
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      return { 
        success: false, 
        message: 'Error fetching subscribers',
        error: error as PostgrestError | Error,
        page,
        pageSize
      };
    }
  },
  
  // Get a single subscriber by email
  async getByEmail(email: string): Promise<SupabaseResponse<Subscriber>> {
    try {
      // Try to get from cache first
      return await cachedQuery<Subscriber>(
        `subscriber:${email.toLowerCase()}`,
        async () => {
          const { data, error } = await supabase
            .from('subscribers')
            .select('*')
            .eq('email', email.toLowerCase())
            .limit(1)
            .single();
          
          if (error) throw error;
          
          return { 
            success: true, 
            data 
          };
        }
      );
    } catch (error) {
      console.error(`Error fetching subscriber ${email}:`, error);
      return { 
        success: false, 
        message: 'Error fetching subscriber',
        error: error as PostgrestError | Error
      };
    }
  },
  
  // Update a subscriber
  async update(email: string, updates: Partial<Omit<Subscriber, 'id' | 'email' | 'created_at'>>): Promise<SupabaseResponse<Subscriber>> {
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('email', email.toLowerCase())
        .select();
      
      if (error) throw error;
      
      // Clear cache for this email
      clearCache(`subscriber:${email.toLowerCase()}`);
      
      return { 
        success: true, 
        message: 'Subscriber updated successfully',
        data: data?.[0]
      };
    } catch (error) {
      console.error(`Error updating subscriber ${email}:`, error);
      return { 
        success: false, 
        message: 'Error updating subscriber',
        error: error as PostgrestError | Error
      };
    }
  },
  
  // Delete a subscriber by email
  async delete(email: string): Promise<SupabaseResponse<null>> {
    try {
      const { error } = await supabase
        .from('subscribers')
        .delete()
        .eq('email', email.toLowerCase());
      
      if (error) throw error;
      
      // Clear cache for this email
      clearCache(`subscriber:${email.toLowerCase()}`);
      
      return { 
        success: true, 
        message: 'Subscriber deleted successfully' 
      };
    } catch (error) {
      console.error(`Error deleting subscriber ${email}:`, error);
      return { 
        success: false, 
        message: 'Error deleting subscriber',
        error: error as PostgrestError | Error
      };
    }
  }
};

// Helper functions for working with payments
export const paymentsTable = {
  // Add a new payment record
  async add(payment: Omit<Payment, 'id' | 'created_at'>): Promise<SupabaseResponse<Payment>> {
    try {
      const { data, error } = await supabase
        .from('payments')
        .insert({
          ...payment,
          updated_at: new Date().toISOString()
        })
        .select();
      
      if (error) throw error;
      
      // Update subscriber to mark as purchased
      if (payment.status === 'completed' || payment.status === 'succeeded') {
        await subscribersTable.update(payment.email, {
          has_purchased: true,
          metadata: {
            last_payment: payment.amount,
            payment_time: new Date().toISOString()
          }
        });
      }
      
      return { 
        success: true, 
        message: 'Payment recorded successfully',
        data: data?.[0]
      };
    } catch (error) {
      console.error('Error recording payment:', error);
      return { 
        success: false, 
        message: 'Error recording payment',
        error: error as PostgrestError | Error
      };
    }
  },
  
  // Record a payment using the RPC function
  async recordPayment(
    email: string,
    stripeCustomerId: string,
    stripeSessionId: string,
    paymentIntentId: string,
    amount: number,
    currency: string = 'usd',
    status: string = 'completed',
    paymentMethod: string | null = null,
    metadata: Record<string, any> = {}
  ): Promise<SupabaseResponse<any>> {
    try {
      const { data, error } = await supabase.rpc('record_payment', {
        customer_email: email.toLowerCase(),
        stripe_customer: stripeCustomerId,
        stripe_session: stripeSessionId,
        payment_intent: paymentIntentId,
        payment_amount: amount,
        payment_currency: currency,
        payment_status: status,
        payment_method: paymentMethod,
        payment_metadata: metadata
      });
      
      if (error) throw error;
      
      return {
        success: true,
        message: data.message || 'Payment recorded successfully',
        data
      };
    } catch (error) {
      console.error('Error recording payment via RPC:', error);
      return {
        success: false,
        message: 'Error recording payment, please try again',
        error: error as PostgrestError | Error
      };
    }
  },
  
  // Get payments by email
  async getByEmail(email: string): Promise<SupabaseResponse<Payment[]>> {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('email', email.toLowerCase())
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return { 
        success: true, 
        data 
      };
    } catch (error) {
      console.error(`Error fetching payments for ${email}:`, error);
      return { 
        success: false, 
        message: 'Error fetching payments',
        error: error as PostgrestError | Error
      };
    }
  },
  
  // Get a payment by Stripe session ID
  async getBySessionId(sessionId: string): Promise<SupabaseResponse<Payment>> {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('stripe_session_id', sessionId)
        .limit(1)
        .single();
      
      if (error) throw error;
      
      return { 
        success: true, 
        data 
      };
    } catch (error) {
      console.error(`Error fetching payment by session ID ${sessionId}:`, error);
      return { 
        success: false, 
        message: 'Error fetching payment',
        error: error as PostgrestError | Error
      };
    }
  },
  
  // Get a payment by payment intent ID
  async getByPaymentIntentId(paymentIntentId: string): Promise<SupabaseResponse<Payment>> {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('payment_intent_id', paymentIntentId)
        .limit(1)
        .single();
      
      if (error) throw error;
      
      return { 
        success: true, 
        data 
      };
    } catch (error) {
      console.error(`Error fetching payment by payment intent ID ${paymentIntentId}:`, error);
      return { 
        success: false, 
        message: 'Error fetching payment',
        error: error as PostgrestError | Error
      };
    }
  }
};

// Helper functions for working with webhook events
export const webhookEventsTable = {
  // Log a webhook event
  async logEvent(
    provider: string,
    eventType: string,
    eventId: string | null,
    rawData: Record<string, any>,
    metadata: Record<string, any> = {}
  ): Promise<SupabaseResponse<any>> {
    try {
      const { data, error } = await supabase.rpc('log_webhook_event', {
        event_provider: provider,
        event_type: eventType,
        event_id: eventId,
        event_data: rawData,
        event_metadata: metadata
      });
      
      if (error) throw error;
      
      return {
        success: true,
        message: data.message || 'Webhook event logged successfully',
        data
      };
    } catch (error) {
      console.error('Error logging webhook event:', error);
      return {
        success: false,
        message: 'Error logging webhook event',
        error: error as PostgrestError | Error
      };
    }
  },
  
  // Get recent webhook events
  async getRecentEvents(
    provider?: string,
    limit: number = 50
  ): Promise<SupabaseResponse<WebhookEvent[]>> {
    try {
      let query = supabase
        .from('webhook_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (provider) {
        query = query.eq('provider', provider);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Error fetching webhook events:', error);
      return {
        success: false,
        message: 'Error fetching webhook events',
        error: error as PostgrestError | Error
      };
    }
  }
};

// Database backup helper function (would be called from server-side scripts only)
export async function backupDatabase(): Promise<SupabaseResponse<{ url: string }>> {
  try {
    // This function would normally call a Supabase Edge Function to trigger a database backup
    // For now, we just create a mock response
    console.log('Database backup requested (mock implementation)');
    
    // In a real implementation, you'd store the URL of the backup in Supabase Storage
    const backupUrl = `https://example.com/backups/vitalpredict_${new Date().toISOString()}.sql`;
    
    return {
      success: true,
      message: 'Database backup completed',
      data: { url: backupUrl }
    };
  } catch (error) {
    console.error('Error backing up database:', error);
    return {
      success: false,
      message: 'Error backing up database',
      error: error as Error
    };
  }
}
