"use client"

import { usePathname } from "next/navigation"
import Footer from "@/components/footer"

export function FooterWrapper() {
    const pathname = usePathname()
    const isDashboard = pathname?.startsWith("/dashboard")
    const isAuthPage = pathname === "/login" || pathname === "/reset-password"

    if (isDashboard || isAuthPage) {
        return null
    }

    return <Footer />
}
