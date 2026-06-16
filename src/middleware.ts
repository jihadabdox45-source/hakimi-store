import { NextRequest, NextResponse } from "next/server"

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isLoginPage = pathname === "/admin/login"

  if (pathname.startsWith("/admin") && !isLoginPage) {
    const sessionCookie = req.cookies.get("__Secure-authjs.session-token")?.value || req.cookies.get("authjs.session-token")?.value
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/admin/login", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
