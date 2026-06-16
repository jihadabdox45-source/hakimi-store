import { NextRequest, NextResponse } from "next/server"

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isLoginPage = pathname === "/admin/login"

  if (pathname.startsWith("/admin") && !isLoginPage) {
    const authCookie = req.cookies.getAll().find((c) => c.name.startsWith("authjs.session-token"))
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
