/**
 * VitalPredict AI - Admin User Management API
 * 
 * This API handles administrative user operations such as:
 * - User role assignment
 * - User listing
 * - User role management
 * 
 * All endpoints are protected by admin role authentication.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getUserSession, assignRole, removeRole } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

// Handler for GET requests
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication first
    const session = await getUserSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    if (!session.isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    // Get operation type from query parameter
    const { searchParams } = new URL(request.url);
    const operation = searchParams.get('operation');
    
    // Execute the requested operation
    switch (operation) {
      case 'list_users': {
        // Get pagination parameters
        const page = parseInt(searchParams.get('page') || '0');
        const pageSize = parseInt(searchParams.get('pageSize') || '20');
        
        // Get users from Supabase Auth
        const { data: users, error } = await supabaseAdmin.auth.admin.listUsers({
          page: page + 1, // Supabase uses 1-indexed pages
          perPage: pageSize,
        });
        
        if (error) throw error;
        
        // Get roles for each user
        const userIds = users.users.map(user => user.id);
        
        const { data: userRoles, error: rolesError } = await supabaseAdmin
          .from('user_roles')
          .select('user_id, roles(id, name, description)')
          .in('user_id', userIds);
        
        if (rolesError) throw rolesError;
        
        // Map roles to users
        const usersWithRoles = users.users.map(user => {
          const roles = userRoles
            ?.filter(role => role.user_id === user.id)
            .map(role => role.roles);
          
          return {
            id: user.id,
            email: user.email,
            created_at: user.created_at,
            last_sign_in_at: user.last_sign_in_at,
            roles: roles || [],
          };
        });
        
        return NextResponse.json({
          success: true,
          data: usersWithRoles,
          count: users.users.length,
          totalCount: users.count, // Total number of users
          page,
          pageSize,
        });
      }
      
      case 'list_roles': {
        // Get all available roles
        const { data: roles, error } = await supabaseAdmin
          .from('roles')
          .select('*')
          .order('id', { ascending: true });
        
        if (error) throw error;
        
        return NextResponse.json({
          success: true,
          data: roles,
        });
      }
      
      default:
        return NextResponse.json(
          { error: 'Invalid operation. Supported operations: list_users, list_roles' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in user admin API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: (error as Error).message },
      { status: 500 }
    );
  }
}

// Handler for POST requests
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication first
    const session = await getUserSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    if (!session.isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    // Get operation type and body from request
    const { searchParams } = new URL(request.url);
    const operation = searchParams.get('operation');
    const body = await request.json();
    
    // Execute the requested operation
    switch (operation) {
      case 'assign_role': {
        // Required parameters
        const { userId, roleName } = body;
        
        if (!userId || !roleName) {
          return NextResponse.json(
            { error: 'userId and roleName are required' },
            { status: 400 }
          );
        }
        
        // Assign the role to the user
        const result = await assignRole(userId, roleName);
        
        return NextResponse.json(result);
      }
      
      case 'remove_role': {
        // Required parameters
        const { userId, roleName } = body;
        
        if (!userId || !roleName) {
          return NextResponse.json(
            { error: 'userId and roleName are required' },
            { status: 400 }
          );
        }
        
        // Remove the role from the user
        const result = await removeRole(userId, roleName);
        
        return NextResponse.json(result);
      }
      
      case 'create_role': {
        // Required parameters
        const { name, description } = body;
        
        if (!name) {
          return NextResponse.json(
            { error: 'role name is required' },
            { status: 400 }
          );
        }
        
        // Create a new role
        const { data, error } = await supabaseAdmin
          .from('roles')
          .insert({
            name,
            description,
          })
          .select()
          .single();
        
        if (error) throw error;
        
        return NextResponse.json({
          success: true,
          message: 'Role created successfully',
          data,
        });
      }
      
      default:
        return NextResponse.json(
          { error: 'Invalid operation. Supported operations: assign_role, remove_role, create_role' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in user admin API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: (error as Error).message },
      { status: 500 }
    );
  }
}
