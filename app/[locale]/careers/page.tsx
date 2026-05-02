"use client"

import { ComingSoon } from "@/components/coming-soon"
import { useTranslations } from "next-intl"

export default function CareersPage() {
  const t = useTranslations('careersPage')
  return <ComingSoon title={t('hero.title')} />
}

/* ========== ORIGINAL CODE - DISABLED ========== */
/*
"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import { useCareers } from "@/lib/use-api"
import { Briefcase, MapPin, Clock, ArrowRight, Users, Heart, Zap, Trophy } from "lucide-react"
import { motion } from "framer-motion"
import { DiagonalCard } from "@/components/diagonal-card"
import { CareerApplicationForm } from "@/components/career-application-form"
import { useTranslations, useLocale } from "next-intl"

export default function CareersPage() {
  const t = useTranslations('careersPage')
  const locale = useLocale()
  const isRtl = locale === 'ar'

  // Fetch careers from API
  const { data: careersData, loading, error } = useCareers()

  // Application form state
  const [selectedCareer, setSelectedCareer] = useState<{ id: string; title: string } | null>(null)

  // If no careers data after loading, show Coming Soon
  if (!loading && !error && (!careersData || careersData.length === 0)) {
    return <ComingSoon title={t('hero.title')} />
  }

  const benefits = [
    {
      icon: Heart,
      title: t('benefits.items.health.title'),
      description: t('benefits.items.health.description'),
    },
    {
      icon: Zap,
      title: t('benefits.items.growth.title'),
      description: t('benefits.items.growth.description'),
    },
    {
      icon: Users,
      title: t('benefits.items.culture.title'),
      description: t('benefits.items.culture.description'),
    },
    {
      icon: Trophy,
      title: t('benefits.items.compensation.title'),
      description: t('benefits.items.compensation.description'),
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

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

      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">{t('benefits.title')}</h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
              {t('benefits.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <DiagonalCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-muted/30 dark:bg-card/10">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">{t('openPositions.title')}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              {t('openPositions.description')}
            </p>
          </motion.div>

          {loading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}

          {error && (
            <div className="max-w-2xl mx-auto text-center py-12">
              <p className="text-destructive text-lg">{error}</p>
            </div>
          )}

          {!loading && !error && careersData && (
            <div className="max-w-4xl mx-auto space-y-4">
              {careersData.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    {t('openPositions.noPositions')}
                  </p>
                </div>
              ) : (
                careersData.map((career, index) => {
                  const title = isRtl ? career.title_ar || career.title_en : career.title_en
                  const department = isRtl ? career.department_ar || career.department_en : career.department_en
                  const location = isRtl ? career.location_ar || career.location_en : career.location_en
                  const type = isRtl ? career.type_ar || career.type_en : career.type_en
                  const description = isRtl ? career.description_ar || career.description_en : career.description_en

                  return (
                    <motion.div
                      key={career._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="group p-6 bg-card border border-border rounded-xl hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 dark:bg-card/50"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-heading text-xl font-bold text-foreground mb-2">{title}</h3>
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{description}</p>
                          <div className="flex flex-wrap gap-3 text-muted-foreground text-sm">
                            <span className="flex items-center gap-1">
                              <Briefcase size={14} />
                              {department}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={14} />
                              {location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {type}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedCareer({ id: career._id, title })}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 font-medium whitespace-nowrap"
                        >
                          {t('openPositions.apply')}
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  )
                })
              )}
            </div>
          )}
        </div>
      </section>

      {selectedCareer && (
        <CareerApplicationForm
          careerId={selectedCareer.id}
          careerTitle={selectedCareer.title}
          onClose={() => setSelectedCareer(null)}
        />
      )}
    </div>
  )
}
*/
/* ========== END OF ORIGINAL CODE ========== */
