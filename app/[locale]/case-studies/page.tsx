"use client"

import Navigation from "@/components/navigation"
import { useData } from "@/lib/data-context"
import { ArrowRight, Code2, Cpu, Database, Globe2, Layers, Zap } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { ComingSoon } from "@/components/coming-soon"
import { CaseStudyCard } from "@/components/ui/case-study-card"
import FeaturesAccordion from "@/components/ui/features-accordion"
import IntegrationsSection from "@/components/hero-integrations"

export default function CaseStudiesPage() {
  const t = useTranslations('caseStudiesPage')
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const { caseStudies: caseStudiesData, loading } = useData()

  // If no case studies data after loading completes, show Coming Soon
  if (!loading.caseStudies && (!caseStudiesData || caseStudiesData.length === 0)) {
    return <ComingSoon title={t('hero.title')} />
  }

  const caseStudies = caseStudiesData.map(study => ({
    ...study,
    title: isRtl ? study.titleAr || study.title : study.title,
    institute: isRtl ? study.instituteAr || study.institute : study.institute,
    category: isRtl ? study.categoryAr || study.category : study.category,
    description: isRtl ? study.descriptionAr || study.description : study.description,
    status: study.status.map(s => ({
      ...s,
      label: isRtl ? s.labelAr || s.label : s.label
    }))
  }))

  // Tech icons for decoration
  const techIcons = [Code2, Cpu, Database, Globe2, Layers, Zap]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section - Clean & Minimal */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-20 overflow-hidden">
        {/* Subtle Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Accent Line */}
        <div className="absolute left-0 top-1/3 w-1 h-32 bg-primary hidden lg:block" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            {/* Left Column: Text Content */}
            <div className="w-full lg:w-1/2 max-w-2xl">
              {/* Breadcrumb-style Label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="w-12 h-[1px] bg-primary" />
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
                  {isRtl ? 'أعمالنا' : 'Our Work'}
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 leading-[1.1]"
              >
                {t('hero.title')}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl"
              >
                {t('hero.description')}
              </motion.p>

              {/* Tech Icons Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-6 mt-10 pt-10 border-t border-border"
              >
                <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
                  {isRtl ? 'التقنيات' : 'Technologies'}
                </span>
                <div className="flex gap-4">
                  {techIcons.map((Icon, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                      className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-colors duration-300"
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Integration Visual */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="w-full max-w-[500px] scale-90 lg:scale-100">
                <IntegrationsSection />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Counter */}
      <section className="py-8 border-y border-border bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-heading text-4xl font-bold text-primary">
                {String(caseStudies.length).padStart(2, '0')}
              </span>
              <span className="text-sm text-muted-foreground">
                {isRtl ? 'مشروع مكتمل' : 'Completed Projects'}
              </span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
              <span>{isRtl ? 'حلول الذكاء الاصطناعي' : 'AI Solutions'}</span>
              <span>•</span>
              <span>{isRtl ? 'التحول الرقمي' : 'Digital Transformation'}</span>
              <span>•</span>
              <span>{isRtl ? 'تطوير البرمجيات' : 'Software Development'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={index} study={study} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Accordion Section */}
      <FeaturesAccordion />

      {/* CTA Section - Minimal */}
      <section className="py-20 lg:py-28 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Accent Element */}
              <div className="w-16 h-1 bg-primary mx-auto mb-8" />

              <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6">
                {t('cta.title')}
              </h2>

              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                {t('cta.description')}
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-foreground rounded-full text-background font-medium hover:bg-primary hover:text-white transition-colors duration-300 group"
              >
                {t('cta.button')}
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
