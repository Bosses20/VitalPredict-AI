# VitalPredict AI - Supabase Integration

This document provides an overview of the Supabase integration implemented for the VitalPredict AI project, including role-based access control, caching mechanisms, database operations, and API endpoints.

## Table of Contents

1. [Overview](#overview)
2. [Setup Instructions](#setup-instructions)
3. [Database Schema](#database-schema)
4. [Authentication and Authorization](#authentication-and-authorization)
5. [API Endpoints](#api-endpoints)
6. [Caching](#caching)
7. [Database Operations](#database-operations)
8. [Testing](#testing)

## Overview

The VitalPredict AI project uses Supabase for user authentication, subscriber management, payment processing, and access control. The integration includes role-based access control with Row Level Security (RLS) policies, server-side caching for frequently accessed data, and administrative tools for database management.

## Setup Instructions

### Environment Variables

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

The service role key should be kept strictly server-side as it has full database access.

### Database Setup

1. Run the SQL schema file to set up the database tables:

```bash
psql -h your_supabase_host -d postgres -U postgres -f supabase-schema.sql
```

2. Alternatively, you can copy-paste the schema into the Supabase SQL editor.

## Database Schema

The database schema includes the following tables:

1. **subscribers** - Stores email subscribers with metadata
2. **payments** - Records payment information and status
3. **roles** - Defines user roles for access control
4. **user_roles** - Junction table linking users to roles
5. **backup_logs** - Tracks database backup operations

See the `supabase-schema.sql` file for the complete schema definition.

## Authentication and Authorization

### User Roles

The system supports the following roles:

- **admin** - Full access to all data and operations
- **user** - Standard user with access to their own data
- **subscriber** - Limited access to specific subscriber features

### Role Management

Role management is handled through the `auth.ts` module, which provides functions for:

- Assigning roles to users
- Removing roles from users
- Creating new roles
- Checking user roles

Example usage:

```typescript
import { assignRole, hasRole, requireRole } from '@/lib/auth';

// Assign a role to a user
await assignRole(userId, 'admin');

// Check if a user has a role
const isAdmin = await hasRole(userId, 'admin');

// Function that requires a specific role
const protectedFunction = requireRole('admin', async () => {
  // Only runs if user has admin role
  return { success: true };
});
```

## API Endpoints

### Subscriber Management

- `GET /api/subscribers` - Retrieve subscribers (admin only for listing)
- `POST /api/subscribers` - Add a new subscriber
- `PATCH /api/subscribers` - Update subscriber preferences
- `DELETE /api/subscribers` - Delete a subscriber

### Admin Operations

- `GET /api/admin/database` - Database health check and statistics
- `POST /api/admin/database` - Perform database operations (backup, maintenance)
- `GET /api/admin/users` - List users and roles
- `POST /api/admin/users` - Role management operations

### Webhook Handlers

- `POST /api/webhooks/stripe` - Handle Stripe payment webhook events

## Caching

The Supabase integration includes a server-side caching mechanism for frequently accessed data:

```typescript
import { cachedQuery, clearCache } from '@/lib/supabase';

// Use cached query with automatic expiration
const result = await cachedQuery('subscribers:all', () => 
  subscribersTable.getAll(0, 20)
);

// Clear cache when data changes
clearCache('subscribers:all');
```

The caching system supports:

- Key-based caching and invalidation
- Automatic expiration with configurable TTL
- Namespace-based cache clearing

## Database Operations

The `database.ts` module provides utilities for database management:

- **Backups** - Create and restore database backups
- **Health checks** - Verify database connectivity and table status
- **Maintenance** - Perform optimization operations
- **Monitoring** - Track database performance and usage

Example usage:

```typescript
import { performDatabaseBackup, checkDatabaseHealth } from '@/lib/database';

// Create a database backup
const backup = await performDatabaseBackup({
  includeSchema: true,
  includeData: true,
  tables: ['subscribers', 'payments']
});

// Check database health
const health = await checkDatabaseHealth();
```

## Testing

The Supabase integration includes comprehensive tests in the `__tests__/supabase.test.ts` file, which tests:

- Basic connectivity
- CRUD operations on subscribers
- Role-based access control
- Caching functionality
- Database operations

Run the tests with:

```bash
npm test
```

## Security Considerations

1. **Row Level Security** - All tables have RLS policies to prevent unauthorized access
2. **Service Role Usage** - Service role key is only used server-side for admin operations
3. **Input Validation** - All user inputs are validated before database operations
4. **Error Handling** - Errors are logged but not exposed to clients with sensitive details

## Troubleshooting

Common issues and their solutions:

1. **Connection Errors**
   - Verify environment variables are correctly set
   - Check network connectivity to Supabase

2. **Permission Denied Errors**
   - Verify user has correct role assignments
   - Check RLS policies in Supabase schema

3. **Caching Issues**
   - Clear cache using `clearCache()` function
   - Verify TTL settings are appropriate

For additional help, contact the development team.
