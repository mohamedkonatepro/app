import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { IronSessionData, sessionOptions } from './sessionConfig';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const publicPaths = ['/', '/login'];
  const paths = ['/signup', '/login', '/forgot-password', '/reset-password'];

  const res = {
    getHeader: () => null,
    setHeader: () => null,
    end: () => null,
    statusCode: 200,
  } as any;
  const session = await getIronSession<IronSessionData>(request as any, res, sessionOptions);

  if (session.user && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin), {
      status: 303,
    });
  }

  if (publicPaths.includes(request.nextUrl.pathname)) {
    return response;
  }

  if (!session.user && !paths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.nextUrl.origin), {
      status: 303,
    });
  }

  return response;
}
