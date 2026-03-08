import { NextRequest, NextResponse } from 'next/server';

/**
 * Next.js Proxy - Alternative to middleware for certain use cases
 * This handles authentication redirects in a more modern way
 */
export async function proxy(request: NextRequest) {
  // Skip proxy for static files and API routes
  if (request.nextUrl.pathname.startsWith('/_next/') ||
      request.nextUrl.pathname.startsWith('/api/') ||
      request.nextUrl.pathname.includes('.')) {
    return NextResponse.next();
  }

  // Check for Supabase auth cookies
  const cookieHeader = request.headers.get('cookie') || '';
  
  const hasAuthCookie = /sb-.*-auth-token\.[01]=/.test(cookieHeader) ||
                       /sb-access-token=/.test(cookieHeader) ||
                       /sb:access-token=/.test(cookieHeader) ||
                       /supabase\.auth\.token=/.test(cookieHeader);

  // If no auth cookies and accessing protected route, redirect to login
  const protectedRoutes = ['/profile', '/admin'];
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  if (!hasAuthCookie && isProtectedRoute) {
    const redirectUrl = new URL('/auth/login', request.url);
    redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Allow continuing with current cookies
  return NextResponse.next();
}
