import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Exo_2 } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import { cn } from "@/lib/utils"
import "../globals.css"
import { DataProvider } from "@/lib/data-context"
import { Toaster } from "sonner"
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

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

// Import Arabic font
const coconArabic = localFont({
  src: "../fonts/Arabic/Cocon_ Next Arabic-Light.otf",
  variable: "--font-arabic",
  display: "swap",
})

export const metadata: Metadata = {
  title: "TECHNOVA | Future-Forward Technology",
  description:
    "Leading the future with innovative technology solutions. Neo-Futurist approach to digital transformation.",

  icons: {
    icon: [
      {
        url: "/logos/logo-10.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logos/logo-10.svg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logos/logo-10.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/logos/logo-10.svg",
  },
}

import { FooterWrapper } from "@/components/footer-wrapper"

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = await params;
  console.log('LocaleLayout running for locale:', locale);

  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Get messages for the locale
  const messages = await getMessages();

  // Determine if RTL
  const isRTL = locale === 'ar';

  // Determine font class
  const fontClass = isRTL
    ? `${coconArabic.variable} font-arabic`
    : `${orbitron.variable} ${exo2.variable} font-sans`;

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} className={fontClass} suppressHydrationWarning>
      <body className={`antialiased min-h-screen relative`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
            <DataProvider>
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
              </div>
              <FooterWrapper />
              <Toaster />
              <Analytics />
            </DataProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

