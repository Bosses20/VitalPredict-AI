/**
 * VitalPredict AI - Supabase Integration Tests
 * 
 * These tests validate the Supabase client integration, including:
 * - CRUD operations on subscribers
 * - Role-based access control
 * - Caching functionality
 * - Database operations
 * 
 * Run these tests with: npm test
 */

import { 
  supabase, 
  supabaseAdmin, 
  subscribersTable, 
  paymentsTable, 
  getSupabaseClient,
  cachedQuery,
  clearCache
} from '../lib/supabase';
import { performDatabaseBackup, checkDatabaseHealth } from '../lib/database';
import { createRole, assignRole, removeRole } from '../lib/auth';

// Mock the console.error to prevent noisy test output
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

// Restore console.error after tests
afterAll(() => {
  console.error = originalConsoleError;
});

// Sample test data
const testSubscriber = {
  email: `test-${Date.now()}@example.com`,
  source: 'test',
  interests: ['health', 'technology'],
  metadata: { test: true }
};

// Test suite for Supabase client
describe('Supabase Client', () => {
  // Test basic connectivity
  test('should successfully connect to Supabase', async () => {
    const { data, error } = await supabase.from('roles').select('count(*)', { count: 'exact', head: true });
    expect(error).toBeNull();
    expect(data).not.toBeNull();
  });
  
  // Test role-based client selection
  test('should return the correct client based on role', () => {
    const anonClient = getSupabaseClient('anonymous');
    expect(anonClient).toBe(supabase);
    
    const serviceClient = getSupabaseClient('service');
    expect(serviceClient).toBe(supabaseAdmin);
    
    // Should throw an error for authenticated role without token
    expect(() => getSupabaseClient('authenticated')).toThrow();
  });
});

// Test suite for subscribers table operations
describe('Subscribers Table', () => {
  let addedSubscriberId: number | undefined;
  
  // Test adding a new subscriber
  test('should add a new subscriber', async () => {
    const result = await subscribersTable.add(testSubscriber);
    
    expect(result.success).toBe(true);
    expect(result.message).toBe('Subscribed successfully');
    expect(result.data).toBeDefined();
    expect(result.data?.email).toBe(testSubscriber.email.toLowerCase());
    
    addedSubscriberId = result.data?.id;
  });
  
  // Test getting a subscriber by email
  test('should get a subscriber by email', async () => {
    const result = await subscribersTable.getByEmail(testSubscriber.email);
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data?.email).toBe(testSubscriber.email.toLowerCase());
    expect(result.data?.interests).toEqual(testSubscriber.interests);
  });
  
  // Test getting subscribers with pagination
  test('should get subscribers with pagination', async () => {
    const result = await subscribersTable.getAll(0, 10);
    
    expect(result.success).toBe(true);
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data?.length).toBeGreaterThan(0);
    expect(result.count).toBeGreaterThan(0);
  });
  
  // Test updating a subscriber
  test('should update a subscriber', async () => {
    const updatedInterests = ['fitness', 'nutrition', 'wellness'];
    
    const result = await subscribersTable.update(testSubscriber.email, {
      interests: updatedInterests,
      metadata: { updated: true }
    });
    
    expect(result.success).toBe(true);
    expect(result.message).toBe('Subscriber updated successfully');
    expect(result.data?.interests).toEqual(updatedInterests);
  });
  
  // Test deleting a subscriber
  test('should delete a subscriber', async () => {
    const result = await subscribersTable.delete(testSubscriber.email);
    
    expect(result.success).toBe(true);
    expect(result.message).toBe('Subscriber deleted successfully');
    
    // Verify subscriber is deleted
    const getResult = await subscribersTable.getByEmail(testSubscriber.email);
    expect(getResult.success).toBe(false);
  });
});

// Test suite for caching functionality
describe('Cache Functionality', () => {
  // Test cached query function
  test('should cache query results', async () => {
    const cacheKey = 'test-cache-key';
    let callCount = 0;
    
    // Create a test function that counts calls
    const testQuery = async () => {
      callCount++;
      return {
        success: true,
        data: { value: 'test' }
      };
    };
    
    // First call should execute the query
    const result1 = await cachedQuery(cacheKey, testQuery);
    expect(result1.success).toBe(true);
    expect(callCount).toBe(1);
    
    // Second call should use the cache
    const result2 = await cachedQuery(cacheKey, testQuery);
    expect(result2.success).toBe(true);
    expect(callCount).toBe(1); // Still 1 because it used the cache
    
    // After clearing cache, it should execute again
    clearCache(cacheKey);
    const result3 = await cachedQuery(cacheKey, testQuery);
    expect(result3.success).toBe(true);
    expect(callCount).toBe(2);
  });
});

// Test suite for database operations
describe('Database Operations', () => {
  // Test database backup
  test('should perform database backup', async () => {
    const result = await performDatabaseBackup();
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data?.filename).toBeDefined();
    expect(result.data?.timestamp).toBeDefined();
  });
  
  // Test database health check
  test('should check database health', async () => {
    const result = await checkDatabaseHealth();
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(typeof result.data?.isHealthy).toBe('boolean');
    expect(result.data?.tables).toBeDefined();
  });
});

// Test suite for role management
describe('Role Management', () => {
  const testRoleName = `test-role-${Date.now()}`;
  let roleId: number;
  
  // Test creating a role
  test('should create a new role', async () => {
    const result = await createRole(testRoleName, 'Test role for unit tests');
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data?.name).toBe(testRoleName);
    
    roleId = result.data?.id;
  });
  
  // Clean up test data
  afterAll(async () => {
    // Clean up the test role if it was created
    if (roleId) {
      await supabaseAdmin
        .from('roles')
        .delete()
        .eq('id', roleId);
    }
  });
});
