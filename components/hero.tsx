"use client"

import { useEffect } from "react"
import Link from "next/link"
import { renderCanvas } from "@/components/ui/canvas"
import { ArrowRight, Sparkles, Zap, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from 'next-intl'

export function Hero() {
  const t = useTranslations('hero')

  useEffect(() => {
    renderCanvas()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#7B3FEF]/20 dark:bg-[#7B3FEF]/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#00D9FF]/20 dark:bg-[#00D9FF]/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#7B3FEF]/10 dark:border-[#7B3FEF]/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#00D9FF]/10 dark:border-[#00D9FF]/20 rounded-full" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 text-center">
        <div className="animate-fade-up flex flex-col items-center justify-center gap-6">
          <div className="glass-panel inline-flex items-center rounded-full px-4 py-2 text-sm backdrop-blur-sm mb-4 border-[#7B3FEF]/30">
            <span className="flex h-2 w-2 rounded-full bg-[#00D9FF] mr-2 animate-pulse shadow-[0_0_10px_rgba(0,217,255,0.8)]"></span>
            <span className="font-medium text-foreground">{t('badge')}</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight max-w-5xl mx-auto leading-tight">
            <span className="text-foreground">{t('title.part1')}</span>
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF]">
              {t('title.part2')}
            </span>
          </h1>

          <div className="gradient-line w-32 my-4" />

          {/* Subtext */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light px-4">
            {t('subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#7B3FEF] to-[#6B2FDF] hover:from-[#6B2FDF] hover:to-[#5B1FCF] text-white rounded-full px-8 h-12 text-base shadow-lg hover:shadow-xl hover:shadow-[#7B3FEF]/30 transition-all duration-300"
              >
                {t('cta.primary')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button
                variant="outline"
                size="lg"
                className="border-[#00D9FF]/50 text-[#00D9FF] hover:bg-[#00D9FF]/10 rounded-full px-8 h-12 text-base glass-panel bg-transparent"
              >
                {t('cta.secondary')}
              </Button>
            </Link>
          </div>

        </div>
      </div>

      {/* Canvas Background */}
      <canvas className="pointer-events-none absolute inset-0 mx-auto opacity-20 dark:opacity-30" id="canvas"></canvas>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none"></div>
    </section>
  )
}

