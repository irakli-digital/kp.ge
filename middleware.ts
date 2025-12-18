import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = 'admin_session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect admin routes (except the login page)
  if (pathname.startsWith('/admin/dashboard') || pathname.startsWith('/admin/edit')) {
    const session = request.cookies.get(SESSION_COOKIE_NAME);

    if (!session?.value) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*', '/admin/edit/:path*'],
};
