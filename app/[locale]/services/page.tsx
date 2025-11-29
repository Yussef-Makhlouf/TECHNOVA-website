"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

import { useData } from "@/lib/data-context"
import { motion } from "framer-motion"
import Link from "next/link"
import { Features } from "@/components/ui/features-8"
import { ServiceCard } from "@/components/service-card"
import { useTranslations, useLocale } from "next-intl"

export default function ServicesPage() {
  const { services: servicesData } = useData()
  const t = useTranslations('servicesPage')
  const locale = useLocale()
  const isRtl = locale === 'ar'

  const services = servicesData.map((service, index) => ({
    title: isRtl ? service.name_ar : service.name_en,
    description: isRtl ? service.shortDescription_ar : service.shortDescription_en,
    image: service.images[0]?.imageLink || "",
    features: service.features.map(f => isRtl ? f.feature_ar : f.feature_en),
    href: `/services/${service.slug}`,
    color: service.color,
    index
  }))

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-40 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-block mb-6">
              <span className="px-4 py-2 rounded-full glass-panel border border-border text-sm font-medium text-accent">
                {t('hero.badge')}
              </span>
            </div>
            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              {t('hero.title')}{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('hero.titleHighlight')}</span>
            </h1>
            <div className="h-1 w-32 mx-auto my-6 bg-gradient-to-r from-primary to-accent rounded-full" />
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('hero.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-32 relative overflow-hidden">

        <div className="container mx-auto px-4 lg:px-8 relative z-10">


          <div className="grid grid-cols-1 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                image={service.image}
                features={service.features}
                href={service.href}
                index={index}
                color={service.color}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-muted/30 dark:bg-card/10">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t('whyChoose.title')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              {t('whyChoose.description')}
            </p>
          </motion.div>
          <Features />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="glass-panel p-12 lg:p-16 rounded-3xl border border-border dark:bg-card/30">
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6">
                {t('cta.title')}
              </h2>
              <div className="h-1 w-32 mx-auto my-6 rounded-full" />
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {t('cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 hover:-translate-y-1"
                >
                  {t('cta.getStarted')}
                </Link>
                <Link
                  href="/case-studies"
                  className="px-8 py-4 rounded-xl glass-panel border border-border hover:border-accent text-foreground font-medium transition-all duration-300 hover:-translate-y-1 dark:bg-card/30"
                >
                  {t('cta.viewCaseStudies')}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div >
  )
}
