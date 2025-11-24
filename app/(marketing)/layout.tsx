import type React from "react"
import { PartnersMarquee } from "@/components/partners-marquee"
import Footer from "@/components/footer"

export default function MarketingLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            {children}
            <PartnersMarquee />
            <Footer />
        </>
    )
}
