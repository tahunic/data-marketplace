import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  if (url.pathname === '/') {
    url.pathname = '/datasets'
    return NextResponse.redirect(url)
  }
}
