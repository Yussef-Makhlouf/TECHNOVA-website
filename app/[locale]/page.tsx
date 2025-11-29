"use client"

import Navigation from "@/components/navigation"
import { useData } from "@/lib/data-context"
import { useTranslations } from 'next-intl'
import { Hero } from "@/components/hero"
import Link from "next/link"
import {
  ArrowRight,
  Target,
  Users,
  Award,
  Star,
  Zap,
  Shield,
  Code,
  Brain,
  Globe,
  Cpu,
  Fingerprint,
  Pencil,
  Settings2,
  SparklesIcon,
} from "lucide-react"
import { motion } from "framer-motion"
import { Features } from "@/components/ui/features-9"
import { FeatureCard } from "@/components/ui/grid-feature-cards"
import DisplayCards from "@/components/ui/display-cards"
import FeaturesAdvanced from "@/components/ui/features-advanced"
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects"
import {
  IconTarget,
  IconUsers,
  IconAward,
  IconBolt,
  IconGlobe,
  IconStar,
  IconCpu,
  IconFingerprint,
  IconPencil,
  IconSettings,
  IconSparkles
} from "@tabler/icons-react"
import IntegrationsSection from "@/components/ui/service-card"
import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background"
import { Section } from "@/components/ui/section"
import { CaseStudyCard } from "@/components/ui/case-study-card"
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials"
import Logomarquee from "@/components/logomarquee"
import { SplineScene } from "@/components/ui/splite"
import CircularText from "@/components/ui/circle-text"
import { WhyTechnovaSection } from "@/components/ui/why-technova-section"
import { ProcessSection } from "@/components/ui/process-section"
import { Features3 } from "@/components/ui/features-3"
import LogosMarquee from "@/components/logos-marquee"

export default function HomePage() {
  const t = useTranslations()
  const tInnovation = useTranslations('innovation')
  const tServices = useTranslations('services')
  const tFeatures = useTranslations('features')
  const tProcess = useTranslations('process')
  const tAi = useTranslations('ai')
  const tTestimonials = useTranslations('testimonials')
  const tCta = useTranslations('cta')
  const stats = [
    { value: "500+", label: "Projects Completed" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "50+", label: "Expert Team Members" },
    { value: "15+", label: "Years Experience" },
  ]

  const combinedFeatures = [
    {
      icon: <IconTarget />,
      title: tFeatures('items.innovation.title'),
      description: tFeatures('items.innovation.description'),
    },
    {
      icon: <IconUsers />,
      title: tFeatures('items.clientCentric.title'),
      description: tFeatures('items.clientCentric.description'),
    },
    {
      icon: <IconAward />,
      title: tFeatures('items.excellence.title'),
      description: tFeatures('items.excellence.description'),
    },
    {
      icon: <IconBolt />,
      title: tFeatures('items.performance.title'),
      description: tFeatures('items.performance.description'),
    },
    {
      icon: <IconGlobe />,
      title: tFeatures('items.global.title'),
      description: tFeatures('items.global.description'),
    },
    {
      icon: <IconStar />,
      title: tFeatures('items.award.title'),
      description: tFeatures('items.award.description'),
    },
    {
      icon: <IconCpu />,
      title: tFeatures('items.powerful.title'),
      description: tFeatures('items.powerful.description'),
    },
    {
      icon: <IconFingerprint />,
      title: tFeatures('items.security.title'),
      description: tFeatures('items.security.description'),
    },
    {
      icon: <IconPencil />,
      title: tFeatures('items.customization.title'),
      description: tFeatures('items.customization.description'),
    },
    {
      icon: <IconSettings />,
      title: tFeatures('items.control.title'),
      description: tFeatures('items.control.description'),
    },
    {
      icon: <IconSparkles />,
      title: tFeatures('items.ai.title'),
      description: tFeatures('items.ai.description'),
    },
  ]

  const { caseStudies } = useData()
  const displayedCaseStudies = caseStudies.slice(0, 3)

  return (
    <div className="min-h-screen relative">
      <AnimatedGradientBackground />
      <Navigation />

      {/* Hero Section */}
      <Hero />



      {/* Innovation in Action Section */}
      <Section className="py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#7B3FEF]/10 to-[#00D9FF]/10 border border-[#7B3FEF]/20 text-sm font-medium text-[#7B3FEF]">
              {tInnovation('badge')}
            </span>
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {tInnovation('title')}
          </h2>
          <div className="gradient-line w-24 mx-auto my-6" />
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div className="relative p-8 lg:p-12">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div>
                  <p className="text-muted-foreground leading-relaxed">
                    {tInnovation('description')}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] rounded-full"></div>
                    <span className="text-sm font-medium text-foreground">{tInnovation('features.ai')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] rounded-full"></div>
                    <span className="text-sm font-medium text-foreground">{tInnovation('features.integration')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] rounded-full"></div>
                    <span className="text-sm font-medium text-foreground">{tInnovation('features.technology')}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden flex items-center justify-center">
                  {/* Circular Text - Behind the scene */}
                  <div
                    className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
                    style={{ "--radius": "220px" } as React.CSSProperties}
                  >
                    <div className="w-full h-full max-w-[600px] max-h-[600px] relative hidden md:block opacity-30">
                      <CircularText
                        text="TECHNOVA   INNOVATION   ARTIFICIAL   INTELLIGENCE   "
                        onHover="speedUp"
                        spinDuration={30}
                        className="text-sm font-heading text-[#00D9FF]"
                      />
                    </div>
                    {/* Mobile version */}
                    <div
                      className="w-full h-full max-w-[400px] max-h-[400px] relative md:hidden opacity-30"
                      style={{ "--radius": "160px" } as React.CSSProperties}
                    >
                      <CircularText
                        text="TECHNOVA   INNOVATION   ARTIFICIAL   INTELLIGENCE   "
                        onHover="speedUp"
                        spinDuration={30}
                        className="text-xs font-heading text-[#00D9FF]"
                      />
                    </div>
                  </div>

                  <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full relative z-10"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* Our Core Services Section */}
      <Section className="py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#00D9FF]/10 to-[#7B3FEF]/10 border border-[#00D9FF]/20 text-sm font-medium text-[#00D9FF]">
              {tServices('badge')}
            </span>
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">{tServices('title')}</h2>
          <div className="gradient-line w-24 mx-auto my-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {tServices('description')}
          </p>
        </motion.div>
        <Features3 />
      </Section>

      {/* What Sets Us Apart Section */}
      <Section className="py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#7B3FEF]/10 to-[#00D9FF]/10 border border-[#7B3FEF]/20 text-sm font-medium text-[#7B3FEF]">
              {tFeatures('badge')}
            </span>
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">{tFeatures('title')}</h2>
          <div className="gradient-line w-24 mx-auto my-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {tFeatures('description')}
          </p>
        </motion.div>
        <FeaturesSectionWithHoverEffects features={combinedFeatures} />
      </Section>

      {/* Our Proven Process Section */}
      <Section className="py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#00D9FF]/10 to-[#7B3FEF]/10 border border-[#00D9FF]/20 text-sm font-medium text-[#00D9FF]">
              {tProcess('badge')}
            </span>
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">{tProcess('title')}</h2>
          <div className="gradient-line w-24 mx-auto my-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {tProcess('description')}
          </p>
        </motion.div>
        <ProcessSection />
      </Section>

      {/* AI-Powered Solutions Section */}
      <Section className="py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#7B3FEF]/10 to-[#00D9FF]/10 border border-[#7B3FEF]/20 text-sm font-medium text-[#7B3FEF]">
              {tAi('badge')}
            </span>
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">{tAi('title')}</h2>
          <div className="gradient-line w-24 mx-auto my-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {tAi('description')}
          </p>
        </motion.div>
        <Features />
      </Section>

      {/* Testimonials Section */}
      <Section className="py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#7B3FEF]/10 to-[#00D9FF]/10 border border-[#7B3FEF]/20 text-sm font-medium text-[#7B3FEF]">
              {tTestimonials('badge')}
            </span>
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">{tTestimonials('title')}</h2>
          <div className="gradient-line w-24 mx-auto my-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {tTestimonials('description')}
          </p>
        </motion.div>
        <StaggerTestimonials />
      </Section>

      {/* CTA Section */}
      <Section className="py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-heading text-4xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
            {tCta('title.part1')}{" "}
            <span className="bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] bg-clip-text text-transparent">{tCta('title.part2')}</span>
            {tCta('title.part3')}
          </h2>
          <div className="gradient-line w-32 mx-auto my-8" />
          <p className="text-muted-foreground text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
            {tCta('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] text-white rounded-full hover:shadow-2xl hover:shadow-[#00D9FF]/40 transition-all duration-300 hover:-translate-y-1 font-medium text-lg"
            >
              {tCta('buttons.primary')}
              <ArrowRight size={22} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-10 py-5 border-2 border-[#00D9FF] text-[#00D9FF] rounded-full hover:bg-[#00D9FF]/10 transition-all duration-300 hover:-translate-y-1 font-medium text-lg"
            >
              {tCta('buttons.secondary')}
            </Link>
          </div>
        </motion.div>
      </Section>

      {/* Partners Marquee */}
      <LogosMarquee />

    </div>
  )
}
