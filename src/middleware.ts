/**
 * VitalPredict AI - Middleware
 * 
 * This middleware handles:
 * - Authentication for protected routes
 * - Role-based access control
 * - API request validation
 */

import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(request: NextRequest) {
  // Check if it's a known public page that should never be redirected
  const isPublicPage = 
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname === '/sitemap.xml' ||
    request.nextUrl.pathname === '/robots.txt' ||
    request.nextUrl.pathname === '/how-it-works' ||
    request.nextUrl.pathname === '/privacy' ||
    request.nextUrl.pathname === '/privacy-policy' ||
    request.nextUrl.pathname === '/terms' ||
    request.nextUrl.pathname === '/thank-you';
  
  // Don't process redirects for public pages to avoid Google indexing issues
  if (isPublicPage) {
    return NextResponse.next();
  }
  
  // Create a Supabase client for the middleware
  const supabase = createMiddlewareClient({ req: request, res: NextResponse.next() });
  
  // Refresh session if expired
  const { data: { session } } = await supabase.auth.getSession();
  
  // Check if the path requires authentication
  const isApiRoute = request.nextUrl.pathname.startsWith('/api/');
  const isAdminRoute = 
    request.nextUrl.pathname.startsWith('/admin') || 
    request.nextUrl.pathname.startsWith('/api/admin');
  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth');
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');
  
  // Skip auth check for public routes that aren't explicitly listed above
  if (!isAdminRoute && !isDashboardRoute && !isApiRoute) {
    return NextResponse.next();
  }
  
  // Skip auth check for auth routes (login, register, etc.)
  if (isAuthRoute) {
    // If user is already authenticated, redirect to dashboard
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }
  
  // Check if user is authenticated for protected routes
  if ((isDashboardRoute || isAdminRoute) && !session) {
    // Redirect to login page with return URL
    const redirectUrl = new URL('/auth/login', request.url);
    redirectUrl.searchParams.set('returnUrl', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }
  
  // For admin routes, check if user has admin role
  if (isAdminRoute && session) {
    try {
      // Get user roles from database
      const { data: userRoles } = await supabase
        .from('user_roles')
        .select('roles(name)')
        .eq('user_id', session.user.id);
      
      // Check if user has admin role
      const isAdmin = userRoles?.some(
        (roleData) => roleData.roles?.name === 'admin'
      );
      
      if (!isAdmin) {
        // Redirect to unauthorized page
        return NextResponse.redirect(new URL('/auth/unauthorized', request.url));
      }
    } catch (error) {
      console.error('Error checking admin role:', error);
      // Redirect to error page
      return NextResponse.redirect(new URL('/auth/error', request.url));
    }
  }
  
  // Continue with the request
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|fonts|public).*)',
    '/api/:path*',
    '/admin/:path*',
    '/dashboard/:path*',
    '/auth/:path*',
  ],
};
