"use client"

import Navigation from "@/components/navigation"

import { useData } from "@/lib/data-context"
import { ArrowRight, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { CaseStudyCard } from "@/components/ui/case-study-card"
import { useTranslations, useLocale } from "next-intl"

export default function CaseStudiesPage() {
  const t = useTranslations('caseStudiesPage')
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const { caseStudies: caseStudiesData } = useData()

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

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A2463]/10 via-transparent to-transparent" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#7B3FEF]/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-heading text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              {t('hero.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={index} study={study} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 bg-[#0f172a]">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <TrendingUp size={48} className="mx-auto mb-6 text-[#00D9FF]" />
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-foreground/70 text-lg mb-10 leading-relaxed">
              {t('cta.description')}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#7B3FEF] text-white rounded-lg hover:bg-[#6B2FDF] transition-all duration-300 hover:shadow-xl hover:shadow-[#7B3FEF]/30 font-medium"
            >
              {t('cta.button')}
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>


    </div>
  )
}
