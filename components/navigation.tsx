"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslations } from "next-intl"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('navigation')

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const navLinks = [
    { href: "/", label: t('home') },
    { href: "/services", label: t('services') },
    { href: "/about", label: t('about') },
    { href: "/case-studies", label: t('caseStudies') },
    { href: "/blog", label: t('insights') },
    { href: "/careers", label: t('careers') },
    { href: "/contact", label: t('contact') },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg ">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 transition-transform group-hover:scale-110">
              <img
                src="/logos/logo-12.svg"
                alt="TECHNOVA Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-heading text-xl font-bold text-foreground tracking-wider">TECHNOVA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/80 hover:text-[#00D9FF] transition-colors duration-300 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}

            {/* Theme Toggle */}
            {mounted && (
              <>
                <LanguageSwitcher />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full"
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  <span className="sr-only">{t('toggleTheme')}</span>
                </Button>
              </>
            )}

            <Link
              href="/contact"
              className="px-6 py-2.5 bg-[#7B3FEF] text-white rounded-lg hover:bg-[#6B2FDF] transition-all duration-300 hover:shadow-lg hover:shadow-[#7B3FEF]/30 text-sm font-medium"
            >
              {t('getStarted')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 lg:hidden">
            {mounted && (
              <>
                <LanguageSwitcher />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full"
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  <span className="sr-only">{t('toggleTheme')}</span>
                </Button>
              </>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground p-2" aria-label={t('toggleMenu')}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-foreground/80 hover:text-[#00D9FF] transition-colors duration-300 py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 bg-[#7B3FEF] text-white rounded-lg hover:bg-[#6B2FDF] transition-all duration-300 text-center"
              >
                {t('getStarted')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
