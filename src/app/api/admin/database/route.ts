/**
 * VitalPredict AI - Admin Database Operations API
 * 
 * This API handles administrative database operations such as:
 * - Database backup
 * - Database statistics
 * - Checking stale subscribers
 * - Database health check
 * 
 * All endpoints are protected by admin role authentication.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getUserSession } from '@/lib/auth';
import { 
  performDatabaseBackup, 
  checkStaleSubscribers, 
  performMaintenance,
  checkDatabaseHealth,
  getDatabaseStats
} from '@/lib/database';

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
      case 'health':
        // Database health check
        const healthResult = await checkDatabaseHealth();
        return NextResponse.json(healthResult);
      
      case 'stats':
        // Get database statistics
        const statsResult = await getDatabaseStats();
        return NextResponse.json(statsResult);
      
      case 'stale':
        // Get stale subscribers
        const daysThreshold = parseInt(searchParams.get('days') || '90');
        const staleResult = await checkStaleSubscribers(daysThreshold);
        return NextResponse.json(staleResult);
      
      default:
        return NextResponse.json(
          { error: 'Invalid operation. Supported operations: health, stats, stale' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in database admin API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
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
      case 'backup':
        // Perform database backup
        const backupResult = await performDatabaseBackup({
          includeSchema: body.includeSchema !== false,
          includeData: body.includeData !== false,
          tables: body.tables
        });
        return NextResponse.json(backupResult);
      
      case 'maintenance':
        // Perform database maintenance
        const operations = body.operations || ['analyze'];
        const maintenanceResult = await performMaintenance(operations);
        return NextResponse.json(maintenanceResult);
      
      default:
        return NextResponse.json(
          { error: 'Invalid operation. Supported operations: backup, maintenance' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in database admin API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
