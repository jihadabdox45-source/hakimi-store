import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextAuthRequest } from "next-auth"

export default auth((req: NextAuthRequest) => {
  const { pathname } = req.nextUrl
  const isAdminRoute = pathname.startsWith("/admin")
  const isLoginPage = pathname === "/admin/login"

  if (!req.auth && isAdminRoute && !isLoginPage) {
    const loginUrl = new URL("/admin/login", req.url)
    return NextResponse.redirect(loginUrl)
  }

  if (req.auth && isLoginPage) {
    const adminUrl = new URL("/admin", req.url)
    return NextResponse.redirect(adminUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/admin/:path*"],
}
