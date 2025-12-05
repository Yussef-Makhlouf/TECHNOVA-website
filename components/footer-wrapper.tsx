"use client"

import { usePathname } from "next/navigation"
import Footer from "@/components/footer"

export function FooterWrapper() {
    const pathname = usePathname()
    const isDashboard = pathname?.includes("/dashboard")
    const isAuthPage = pathname?.includes("/login") || pathname?.includes("/reset-password")

    if (isDashboard || isAuthPage) {
        return null
    }

    return <Footer />
}
