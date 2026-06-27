import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Logger } from "./app/lib/logger";

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};

export interface KVNamespace {
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  get(key: string): Promise<string | null>;
  delete(key: string): Promise<void>;
}

interface Env {
  SESSION_KV: KVNamespace;
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isDashboardRoute = path.startsWith('/dashboard');
  const isLoginRoute = path === '/login';

  const sessionId = request.cookies.get('eco_trace_session')?.value;
  let sessionData = null;

  if (sessionId) {
    // In edge middleware we can't always easily use getRequestContext() depending on the runtime setup.
    // However, @cloudflare/next-on-pages provides process.env.SESSION_KV or similar if configured,
    // but usually we recommend checking sessions in middleware if KV is available on the request.
    // Cloudflare Pages adds `process.env` to edge runtime. Let's try reading it.
    try {
      const kv = process.env.SESSION_KV as unknown as KVNamespace;
      if (kv) {
        const sessionStr = await kv.get(sessionId);
        if (sessionStr) {
          sessionData = JSON.parse(sessionStr);
          if (Date.now() > sessionData.expiresAt) {
            sessionData = null;
          }
        }
      } else {
        // Fallback for local proxy dev:
        // We will allow the request to proceed and be verified by Server Components/Actions 
        // if KV is not directly available in NextRequest middleware scope.
        // Actually, with `@cloudflare/next-on-pages`, standard Next.js middleware is run on the edge.
      }
    } catch (e) {
      Logger.warn("KV check failed in middleware, deferring to layout", e);
    }
  }

  // If we couldn't verify the session in middleware due to KV binding access,
  // we could just rely on layout.tsx or Server Components to do the hard redirect.
  // But let's assume we can at least check if the cookie exists.
  
  if (isDashboardRoute && !sessionId) {
    const url = new URL('/login', request.url);
    url.searchParams.set('error', 'session_expired');
    return NextResponse.redirect(url);
  }

  if (isLoginRoute && sessionId) {
    // If they have a cookie, redirect to dashboard. 
    // If it's invalid, the dashboard layout will catch it and log them out.
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}
