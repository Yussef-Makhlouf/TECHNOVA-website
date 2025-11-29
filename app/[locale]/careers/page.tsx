"use client"

import Navigation from "@/components/navigation"

import { useData } from "@/lib/data-context"
import { Briefcase, MapPin, Clock, ArrowRight, Users, Heart, Zap, Trophy } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { DiagonalCard } from "@/components/diagonal-card"
import { useTranslations, useLocale } from "next-intl"

export default function CareersPage() {
  const t = useTranslations('careersPage')
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const { jobs: jobsData } = useData()

  const jobs = jobsData.map(job => ({
    ...job,
    title: isRtl ? job.titleAr || job.title : job.title,
    department: isRtl ? job.departmentAr || job.department : job.department,
    location: isRtl ? job.locationAr || job.location : job.location,
    type: isRtl ? job.typeAr || job.type : job.type,
    description: isRtl ? job.descriptionAr || job.description : job.description,
  }))

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

      {/* Hero Section */}
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

      {/* Benefits */}
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

      {/* Open Positions */}
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

          <div className="max-w-4xl mx-auto space-y-4">
            {jobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group p-6 bg-card border border-border rounded-xl hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 dark:bg-card/50"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">{job.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-3 text-muted-foreground text-sm">
                      <span className="flex items-center gap-1">
                        <Briefcase size={14} />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 font-medium whitespace-nowrap"
                  >
                    {t('openPositions.apply')}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}
