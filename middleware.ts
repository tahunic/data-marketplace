import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  if (url.pathname === '/') {
    url.pathname = '/buy-orders'
    return NextResponse.redirect(url)
  }
}
