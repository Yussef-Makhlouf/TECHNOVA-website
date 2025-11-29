import createMiddleware from 'next-intl/middleware';
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { AUTH_COOKIE_NAME } from "./lib/auth"
import { routing } from './i18n/routing';

// Create the next-intl middleware
const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
    const authCookie = request.cookies.get(AUTH_COOKIE_NAME)
    const isAuth = !!authCookie

    // Extract locale from pathname
    const pathname = request.nextUrl.pathname;
    const pathnameHasLocale = routing.locales.some(
        (locale: string) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    // Get the locale-free path
    let pathWithoutLocale = pathname;
    if (pathnameHasLocale) {
        const locale = pathname.split('/')[1];
        pathWithoutLocale = pathname.slice(locale.length + 1) || '/';
    }

    const isDashboardPage = pathWithoutLocale.startsWith("/dashboard")
    const isLoginPage = pathWithoutLocale.startsWith("/login")

    // Redirect unauthenticated users to login page if they try to access dashboard
    if (isDashboardPage && !isAuth) {
        const locale = pathnameHasLocale ? pathname.split('/')[1] : routing.defaultLocale;
        return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
    }

    // Redirect authenticated users to dashboard if they try to access login page
    if (isLoginPage && isAuth) {
        const locale = pathnameHasLocale ? pathname.split('/')[1] : routing.defaultLocale;
        return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url))
    }

    // Apply next-intl middleware
    return intlMiddleware(request);
}

export const config = {
    matcher: ['/', '/(ar|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
}

