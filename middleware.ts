import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { AUTH_COOKIE_NAME } from "./lib/auth"

export function middleware(request: NextRequest) {
    const authCookie = request.cookies.get(AUTH_COOKIE_NAME)
    const isAuth = !!authCookie

    const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard")
    const isLoginPage = request.nextUrl.pathname.startsWith("/login")

    // Redirect unauthenticated users to login page if they try to access dashboard
    if (isDashboardPage && !isAuth) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    // Redirect authenticated users to dashboard if they try to access login page
    if (isLoginPage && isAuth) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*", "/login"],
}
