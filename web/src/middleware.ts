import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const signInUrl = new URL('/login', request.url);
  const homeUrl = new URL('/home', request.url);

  const token = request.cookies.get('auth_token');

  if (!token) {
    if (
      request.nextUrl.pathname === '/login' ||
      request.nextUrl.pathname === '/signup'
    )
      return NextResponse.next();
    return NextResponse.redirect(signInUrl);
  }

  if (
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname === '/signup'
  )
    return NextResponse.redirect(homeUrl);
}

export const config = {
  matcher: ['/signup', '/login', '/home'],
};
