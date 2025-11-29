"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
// import { TeamSection } from "@/components/team-section"
import { Target, Eye, Award, Users, TrendingUp, Lightbulb } from "lucide-react"
import { motion } from "framer-motion"
import { DiagonalCard } from "@/components/diagonal-card"
import { Globe } from "@/components/globe"
import { About3 } from "@/components/ui/about-3"
import { PartnersMarquee } from "@/components/partners-marquee"
import LogosMarquee from "@/components/logos-marquee"
import { useTranslations } from "next-intl"

export default function AboutPage() {
  const t = useTranslations('aboutPage')

  const values = [
    {
      icon: Lightbulb,
      title: t('values.items.creativity.title'),
      description: t('values.items.creativity.description'),
      color: "#7B3FEF",
    },
    {
      icon: TrendingUp,
      title: t('values.items.sustainableInnovation.title'),
      description: t('values.items.sustainableInnovation.description'),
      color: "#00D9FF",
    },
    {
      icon: Users,
      title: t('values.items.ethicalValues.title'),
      description: t('values.items.ethicalValues.description'),
      color: "#FF0080",
    },
    {
      icon: Award,
      title: t('values.items.successPartnership.title'),
      description: t('values.items.successPartnership.description'),
      color: "#FFD700",
    },
    {
      icon: Award,
      title: t('values.items.excellence.title'),
      description: t('values.items.excellence.description'),
      color: "#00FF94",
    },
  ]

  const milestones = [
    {
      year: "2010",
      title: t('journey.milestones.0.title'),
      description: t('journey.milestones.0.description'),
      color: "#7B3FEF",
    },
    {
      year: "2015",
      title: t('journey.milestones.1.title'),
      description: t('journey.milestones.1.description'),
      color: "#00D9FF",
    },
    {
      year: "2020",
      title: t('journey.milestones.2.title'),
      description: t('journey.milestones.2.description'),
      color: "#7B3FEF",
    },
    {
      year: "2025",
      title: t('journey.milestones.3.title'),
      description: t('journey.milestones.3.description'),
      color: "#00D9FF",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A2463]/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#7B3FEF]/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-[#00D9FF]/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-block mb-6">
              <span className="px-4 py-2 rounded-full glass-panel border-border text-sm font-medium text-[#00D9FF]">
                {t('hero.badge')}
              </span>
            </div>
            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              {t('hero.title')}{" "}
              <span className="bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] bg-clip-text text-transparent">
                {t('hero.titleHighlight')}
              </span>
            </h1>
            <div className="gradient-line w-32 mx-auto my-6" />
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('hero.description')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00D9FF]/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Vision Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex-1 text-center lg:text-left"
            >
              <div className="inline-flex items-center justify-center lg:justify-end gap-3 mb-4">
                <Eye size={32} className="text-[#7B3FEF]" />
                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground">{t('vision.title')}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t('vision.description')}
              </p>
            </motion.div>

            {/* Robot Scene Centerpiece */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative w-full max-w-md lg:max-w-lg aspect-square flex-shrink-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#7B3FEF]/20 to-[#00D9FF]/20 rounded-full blur-3xl animate-pulse" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 shadow-2xl shadow-[#00D9FF]/20">
                <img
                  src="/robot-scene.png"
                  alt="Futuristic Robot"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Mission Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex-1 text-center lg:text-left"
            >
              <div className="inline-flex items-center justify-center lg:justify-start gap-3 mb-4">
                <Target size={32} className="text-[#00D9FF]" />
                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground">{t('mission.title')}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t('mission.description')}
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#7B3FEF]/5 rounded-full blur-3xl" />

        {/* Globe Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <Globe className="scale-75" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">{t('values.title')}</h2>
            <div className="gradient-line w-24 mx-auto my-6" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              {t('values.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <DiagonalCard key={index} {...value} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#00D9FF]/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">{t('journey.title')}</h2>
            <div className="gradient-line w-24 mx-auto my-6" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              {t('journey.description')}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#7B3FEF] via-[#00D9FF] to-[#7B3FEF] opacity-30" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative flex gap-6 lg:gap-8"
                  >
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 relative z-10">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{
                          backgroundColor: `${milestone.color}20`,
                          boxShadow: `0 0 20px ${milestone.color}30`,
                        }}
                      >
                        <span className="font-heading text-sm font-bold" style={{ color: milestone.color }}>
                          {milestone.year}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <div className="glass-panel p-6 rounded-2xl border-border hover:border-[#00D9FF]/50 transition-all duration-500 hover:shadow-xl hover:shadow-[#00D9FF]/20">
                        <h3 className="font-heading text-2xl font-bold text-foreground mb-3">{milestone.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <LogosMarquee />

    </div>
  )
}
