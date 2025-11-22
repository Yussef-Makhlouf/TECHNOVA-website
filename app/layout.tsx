import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Exo_2 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import { cn } from "@/lib/utils"
import "./globals.css"

import { PartnersMarquee } from "@/components/partners-marquee"
import Footer from "@/components/footer"

// Import custom fonts for Neo-Futurist design
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-heading",
})

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "TECHNOVA | Future-Forward Technology",
  description:
    "Leading the future with innovative technology solutions. Neo-Futurist approach to digital transformation.",

  icons: {
    icon: [
      {
        url: "/logo-12.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo-12.svg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logo-12.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/logo-12.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${exo2.variable}`} suppressHydrationWarning>
      <body className={`font-sans antialiased min-h-screen relative`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <div className="fixed inset-0 z-0 pointer-events-none">
            <AnimatedGridPattern
              numSquares={30}
              maxOpacity={0.1}
              duration={3}
              repeatDelay={1}
              className={cn(
                "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
                "inset-x-0 inset-y-0 h-full w-full skew-y-12 opacity-20 dark:opacity-30",
              )}
            />
          </div>
          <div className="relative z-10">
            {children}
            <PartnersMarquee />
            <Footer />
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
