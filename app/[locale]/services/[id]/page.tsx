"use client"

import { useParams } from "next/navigation"
import { useService } from "@/lib/use-api"
import Navigation from "@/components/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DiagonalCard } from "@/components/diagonal-card"
import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"
import * as LucideIcons from "lucide-react"

export default function ServiceDetailPage() {
  const params = useParams()
  const id = params.id as string
  const locale = useLocale()
  const t = useTranslations("serviceDetailPage")

  // Fetch service data by ID
  const { data: service, loading, error } = useService(id)

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-destructive">{t("error")}</h1>
        <p className="text-muted-foreground">{error || t("serviceNotFound")}</p>
        <Link href={`/${locale}/services`}>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("backToServices")}
          </Button>
        </Link>
      </div>
    )
  }

  // Get localized content
  const title = locale === "ar" ? service.name_ar : service.name_en
  const description = locale === "ar" ? service.description_ar : service.description_en
  const shortDescription = locale === "ar" ? service.shortDescription_ar : service.shortDescription_en
  const features = service.features?.map((f: any) =>
    locale === "ar" ? f.feature_ar : f.feature_en
  ) || []

  // Get icon component dynamically
  const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.Sparkles

  // Mock benefits data (you can extend the backend to include this)
  const benefits = [
    {
      title: t("benefits.efficiency.title"),
      description: t("benefits.efficiency.description"),
      icon: LucideIcons.Zap,
    },
    {
      title: t("benefits.decision.title"),
      description: t("benefits.decision.description"),
      icon: LucideIcons.BarChart3,
    },
    {
      title: t("benefits.risk.title"),
      description: t("benefits.risk.description"),
      icon: LucideIcons.Shield,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div
          className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: service.color || "#7B3FEF" }}
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("backToServices")}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8"
              style={{
                background: `linear-gradient(135deg, ${service.color}20, ${service.color}40)`,
              }}
            >
              <IconComponent size={40} style={{ color: service.color }} />
            </div>
            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {shortDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30 dark:bg-card/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: locale === "ar" ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-6">
                {t("capabilities.title")}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-1 flex-shrink-0"
                      size={20}
                      style={{ color: service.color }}
                    />
                    <span className="text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: locale === "ar" ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div
                className="absolute inset-0 rounded-3xl blur-2xl opacity-20"
                style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}80)` }}
              />
              <div className="relative bg-card border border-border rounded-3xl p-2 overflow-hidden dark:bg-card/50 shadow-2xl">
                <img
                  src={service.images?.[0]?.imageLink || "/placeholder.svg"}
                  alt={title}
                  className="w-full h-auto rounded-2xl object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t("benefits.title")}
            </h2>
            <div
              className="h-1 w-24 mx-auto my-6 rounded-full"
              style={{ background: `linear-gradient(90deg, ${service.color}, ${service.color}80)` }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <DiagonalCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30 dark:bg-card/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-6">
              {t("cta.title", { service: title })}
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              {t("cta.description")}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-xl font-medium"
              style={{
                backgroundColor: service.color,
                color: "#ffffff",
              }}
            >
              {t("cta.button")}
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
