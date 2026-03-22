import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const PROTECTED = ['/learn', '/study', '/lesson', '/profile', '/review']
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? 'fallback-secret')

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p))

  let response: NextResponse

  if (!isProtected) {
    response = NextResponse.next()
  } else {
    const token = req.cookies.get('nb_token')?.value

    if (!token) {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('from', pathname)
      response = NextResponse.redirect(loginUrl)
    } else {
      try {
        await jwtVerify(token, SECRET)
        response = NextResponse.next()
      } catch {
        const loginUrl = new URL('/login', req.url)
        loginUrl.searchParams.set('from', pathname)
        response = NextResponse.redirect(loginUrl)
      }
    }
  }

  // Set default locale cookie on first visit
  if (!req.cookies.get('NEXT_LOCALE')) {
    response.cookies.set('NEXT_LOCALE', 'en', { path: '/', maxAge: 31536000, sameSite: 'lax' })
  }

  return response
}

export const config = {
  matcher: ['/learn/:path*', '/study/:path*', '/lesson/:path*', '/profile/:path*', '/review/:path*'],
}
