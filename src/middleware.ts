import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  // Admin 경로에 대한 접근 제어
  if (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/api/admin')) {
    try {
      const token = await getToken({ 
        req, 
        secret: process.env.NEXTAUTH_SECRET,
        // Edge Runtime 호환을 위한 설정
        secureCookie: process.env.NODE_ENV === 'production'
      })

      if (!token) {
        const url = new URL('/auth/login', req.url)
        url.searchParams.set('callbackUrl', req.nextUrl.href)
        return NextResponse.redirect(url)
      }

      // 관리자 권한 확인
      if (token.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 403 })
      }
    } catch (error) {
      console.error('Middleware auth error:', error)
      const url = new URL('/auth/error', req.url)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ]
}

// Edge Runtime 명시적 설정
export const runtime = 'experimental-edge'