/**
 * VitalPredict AI - Authentication and Authorization Utilities
 * 
 * This module provides utilities for authentication and role-based access control.
 */

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { createClient } from '@supabase/supabase-js';
import { getSupabaseClient, supabase, SupabaseResponse } from './supabase';

// Type definitions for auth-related data
export interface UserRole {
  id: number;
  name: string;
  description?: string;
}

export interface UserSession {
  userId: string;
  email: string;
  roles: UserRole[];
  isAdmin: boolean;
  isAuthenticated: boolean;
}

/**
 * Get the current user session from cookies (server-side)
 * This is cached to avoid multiple database calls in a single request
 */
export const getUserSession = cache(async (): Promise<UserSession | null> => {
  try {
    const cookieStore = cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    // Create a new Supabase client using the cookies
    const supabase = createClient(supabaseUrl, supabaseKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    });
    
    // Get the user session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return null;
    }
    
    // Get the user's roles
    const { data: userRoles } = await supabase
      .from('user_roles')
      .select('roles(id, name, description)')
      .eq('user_id', session.user.id);
    
    const roles = userRoles?.map((role) => role.roles) || [];
    const isAdmin = roles.some((role) => role.name === 'admin');
    
    return {
      userId: session.user.id,
      email: session.user.email || '',
      roles,
      isAdmin,
      isAuthenticated: true,
    };
  } catch (error) {
    console.error('Error getting user session:', error);
    return null;
  }
});

/**
 * Server-side middleware to require authentication
 * Use this in server components to restrict access
 */
export async function requireAuth() {
  const session = await getUserSession();
  
  if (!session) {
    redirect('/auth/login');
  }
  
  return session;
}

/**
 * Server-side middleware to require admin role
 * Use this in server components to restrict access to admin-only routes
 */
export async function requireAdmin() {
  const session = await getUserSession();
  
  if (!session || !session.isAdmin) {
    redirect('/auth/unauthorized');
  }
  
  return session;
}

/**
 * Client-side function to check if the user has a specific role
 */
export async function hasRole(role: string): Promise<boolean> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return false;
    }
    
    const { data: userRoles } = await supabase
      .from('user_roles')
      .select('roles(name)')
      .eq('user_id', session.user.id);
    
    return userRoles?.some((userRole) => userRole.roles.name === role) || false;
  } catch (error) {
    console.error('Error checking user role:', error);
    return false;
  }
}

/**
 * Assign a role to a user
 */
export async function assignRole(
  userId: string,
  roleName: string
): Promise<SupabaseResponse<null>> {
  try {
    // First get the role ID
    const { data: role, error: roleError } = await supabase
      .from('roles')
      .select('id')
      .eq('name', roleName)
      .single();
    
    if (roleError) throw roleError;
    
    // Check if the user already has this role
    const { data: existingRole, error: existingRoleError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', userId)
      .eq('role_id', role.id);
    
    if (existingRoleError) throw existingRoleError;
    
    if (existingRole && existingRole.length > 0) {
      return {
        success: true,
        message: `User already has the ${roleName} role`,
      };
    }
    
    // Assign the role to the user
    const { error } = await supabase
      .from('user_roles')
      .insert({
        user_id: userId,
        role_id: role.id,
      });
    
    if (error) throw error;
    
    return {
      success: true,
      message: `${roleName} role assigned successfully`,
    };
  } catch (error) {
    console.error('Error assigning role:', error);
    return {
      success: false,
      message: 'Failed to assign role',
      error: error as Error,
    };
  }
}

/**
 * Remove a role from a user
 */
export async function removeRole(
  userId: string,
  roleName: string
): Promise<SupabaseResponse<null>> {
  try {
    // First get the role ID
    const { data: role, error: roleError } = await supabase
      .from('roles')
      .select('id')
      .eq('name', roleName)
      .single();
    
    if (roleError) throw roleError;
    
    // Remove the role from the user
    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId)
      .eq('role_id', role.id);
    
    if (error) throw error;
    
    return {
      success: true,
      message: `${roleName} role removed successfully`,
    };
  } catch (error) {
    console.error('Error removing role:', error);
    return {
      success: false,
      message: 'Failed to remove role',
      error: error as Error,
    };
  }
}

/**
 * Create a new role
 */
export async function createRole(
  name: string,
  description?: string
): Promise<SupabaseResponse<UserRole>> {
  try {
    const { data, error } = await supabase
      .from('roles')
      .insert({
        name,
        description,
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      success: true,
      message: 'Role created successfully',
      data,
    };
  } catch (error) {
    console.error('Error creating role:', error);
    return {
      success: false,
      message: 'Failed to create role',
      error: error as Error,
    };
  }
}
