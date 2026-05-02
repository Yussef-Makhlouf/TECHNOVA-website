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
import FacebookPixel from "@/components/FacebookPixel"

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
  metadataBase: new URL('https://globaltechnova.com'),

  title: {
    default: "TECHNOVA | AI & Digital Transformation Solutions",
    template: "%s | TECHNOVA",
  },

  description: "TECHNOVA - Leading technology company specializing in AI solutions, cloud computing, cybersecurity, digital transformation, and custom software development. Transform your business with cutting-edge innovation.",

  keywords: [
    "AI solutions",
    "Digital transformation",
    "Big Data",
    "Data analytics",
    "AI development",
    "Software AI",
    "Tech consulting",
    "Machine learning",
    "ML models",
    "AI platforms",
    "AI audio",
    "Voice cloning",
    "Text-to-Speech",
    "Speech synthesis",
    "Digital twins",
    "Virtual avatars",
    "Ethical AI",
    "AI ethics",
    "Data privacy",
    "Predictive AI",
    "Business intelligence",
    "Smart dashboards",
    "Human-centered AI",
    "Secure AI",
    "B2G tech",
    "Government AI",
    "Public sector AI",
    "UAE Vision 2031",
    "Vision 2031",
    "Saudi Vision 2030",
    "Vision 2030",
    "GCC tech",
    "KSA AI",
    "UAE AI",
    "Riyadh tech",
    "Abu Dhabi AI",
    "Dubai tech",
    "Middle East AI",
    "Gulf innovation",
    "AI integration",
    "Cloud AI",
    "API AI",
    "SaaS AI",
    "Multi-tenant AI",
    "AI infrastructure",
    "Digital backbone",
    "AI compliance",
    "GDPR AI",
    "SDAIA compliant",
    "AI for government",
    "AI for enterprises",
    "Trusted AI",
    "Official AI partner",
    "AI vendor",
    "Tech partner UAE",
    "Technova",
    "AI company",
    "AI company UAE",
    "AI company KSA",
    "AI company Saudi Arabia",
    "AI company Middle East",
    "AI company Gulf",
    "chatbot services"

  ],

  // Google Search Console & Other Verifications
  verification: {
    google: "vJeDtBp62EusbECKkE_9KIiobGZc8SZyg7lYEUZMHsc",
  },

  // Open Graph for Social Sharing
  // Open Graph (Facebook, LinkedIn, WhatsApp, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_SA",
    url: "https://globaltechnova.com",
    siteName: "TECHNOVA",
    title: "TECHNOVA | AI Solutions for Government & Enterprise in Saudi Arabia & UAE",
    description: "Trusted AI partner for digital transformation in the Middle East. Specializing in ethical AI, voice cloning, digital twins, and secure cloud solutions for government and enterprise.",
    images: [
      {
        url: "https://globaltechnova.com/ai-technology-future.png",
        width: 1200,
        height: 630,
        alt: "TECHNOVA – Ethical AI & Digital Transformation for Saudi Arabia and UAE",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@technova", // أفضل من "creator" للعلامات التجارية
    title: "TECHNOVA | AI & Digital Transformation for GCC Governments",
    description: "Official AI technology partner for digital innovation in Saudi Arabia & UAE. Voice cloning, digital twins, and ethical AI solutions.",
    images: ["https://globaltechnova.com/ai-technology-future.png"],
  },

  // Robots & Indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Alternates for multi-language
  alternates: {
    canonical: "https://globaltechnova.com",
    languages: {
      "en": "https://globaltechnova.com/en",
      "ar": "https://globaltechnova.com/ar",
    },
  },

  // Icons
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

  // Other
  category: "technology",
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
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="vJeDtBp62EusbECKkE_9KIiobGZc8SZyg7lYEUZMHsc" />

        {/* Schema.org Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://globaltechnova.com/#organization",
              "name": "TECHNOVA",
              "alternateName": ["تكنوفا", "TECHNOVA AI"],
              "url": "https://globaltechnova.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://globaltechnova.com/logos/logo-10.svg",
                "width": 512,
                "height": 512
              },
              "image": "https://globaltechnova.com/ai-technology-future.png",
              "description": "TECHNOVA - Leading AI & Digital Transformation company specializing in ethical AI solutions, voice cloning, digital twins, and cloud computing for government and enterprise in Saudi Arabia, UAE, and the Middle East.",
              "foundingDate": "2025",
              "areaServed": [
                { "@type": "Country", "name": "Saudi Arabia" },
                { "@type": "Country", "name": "United Arab Emirates" },
                { "@type": "GeoShape", "name": "Middle East" },
                { "@type": "GeoShape", "name": "GCC" }
              ],
              "knowsAbout": [
                "Artificial Intelligence",
                "Machine Learning",
                "Digital Transformation",
                "Cloud Computing",
                "Cybersecurity",
                "Voice Cloning",
                "Digital Twins",
                "Data Analytics",
                "IoT Solutions",
                "Ethical AI"
              ],
              "sameAs": [
                "https://twitter.com/technova",
                "https://www.linkedin.com/company/technova-company/",
                "https://www.facebook.com/profile.php?id=61583198664243",
                "https://www.instagram.com/globaltechnova?igsh=MTYzd3FiOTFuaXFxcA%3D%3D",

              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+971502717411",
                  "contactType": "sales",
                  "areaServed": ["SA", "AE"],
                  "availableLanguage": ["English", "Arabic"]
                },
                {
                  "@type": "ContactPoint",
                  "email": "info@globaltechnova.com",
                  "contactType": "customer service",
                  "availableLanguage": ["English", "Arabic"]
                }
              ]
            })
          }}
        />

        {/* Schema.org WebSite with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://globaltechnova.com/#website",
              "name": "TECHNOVA",
              "url": "https://globaltechnova.com",
              "publisher": { "@id": "https://globaltechnova.com/#organization" },
              "inLanguage": ["en", "ar"],
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://globaltechnova.com/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* Schema.org ProfessionalService */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "@id": "https://globaltechnova.com/#service",
              "name": "TECHNOVA AI Solutions",
              "image": "https://globaltechnova.com/ai-technology-future.png",
              "priceRange": "$$$",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "SA",
                "addressRegion": "Abu Dhabi"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 24.7136,
                "longitude": 46.6753
              },
              "url": "https://globaltechnova.com",
              "telephone": "+971502717411",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
                "opens": "09:00",
                "closes": "18:00"
              },
              "serviceType": [
                "AI Development",
                "Digital Transformation",
                "Cloud Solutions",
                "Cybersecurity",
                "Data Analytics",
                "Voice Cloning",
                "Digital Twins"
              ],
              "areaServed": ["Saudi Arabia", "UAE", "Middle East"],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "AI & Technology Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "AI Solutions",
                      "description": "Custom AI and machine learning solutions for enterprise"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Digital Transformation",
                      "description": "End-to-end digital transformation consulting and implementation"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Cloud Computing",
                      "description": "Secure cloud infrastructure and migration services"
                    }
                  }
                ]
              }
            })
          }}
        />



      </head>
      <body className={`antialiased min-h-screen relative`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
            <DataProvider>
              <FacebookPixel />
              <div className="fixed inset-0 z-0 pointer-events-none">
                <AnimatedGridPattern
                  numSquares={15}
                  maxOpacity={0.1}
                  duration={5}
                  repeatDelay={2}
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

