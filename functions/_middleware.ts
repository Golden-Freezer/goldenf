// Cloudflare Pages Functions middleware for API routes
import { NextRequest } from 'next/server';

interface Env {
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  NEXTAUTH_SECRET: string;
  DATABASE_URL: string;
}

export async function onRequest(context: {
  request: Request;
  env: Env;
  params: any;
  waitUntil: (promise: Promise<any>) => void;
  next: () => Promise<Response>;
}): Promise<Response> {
  const { request, env, next } = context;
  
  // Add CORS headers for API routes
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  // Security headers for Korean content
  const response = await next();
  
  // Clone response to modify headers
  const modifiedResponse = new Response(response.body, response);
  
  // Add security headers
  modifiedResponse.headers.set('X-Frame-Options', 'DENY');
  modifiedResponse.headers.set('X-Content-Type-Options', 'nosniff');
  modifiedResponse.headers.set('X-XSS-Protection', '1; mode=block');
  modifiedResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Korean content optimization
  if (request.url.includes('/api/') || request.url.includes('/ko/')) {
    modifiedResponse.headers.set('Content-Language', 'ko');
  }
  
  // Rate limiting for API routes
  const clientIP = request.headers.get('CF-Connecting-IP') || 
                  request.headers.get('X-Forwarded-For') || 
                  'unknown';
  
  // Add rate limiting headers (implement actual rate limiting as needed)
  modifiedResponse.headers.set('X-RateLimit-Limit', '100');
  modifiedResponse.headers.set('X-RateLimit-Remaining', '99');
  
  return modifiedResponse;
}