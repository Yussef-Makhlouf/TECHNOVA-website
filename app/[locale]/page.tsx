"use client"

import Navigation from "@/components/navigation"
import { useData } from "@/lib/data-context"
import { useTranslations } from 'next-intl'
import { useEffect } from "react"
import * as fpixel from "@/lib/fpixel"
import { Hero } from "@/components/hero"
import { Link } from "@/i18n/routing"
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
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials"
import Logomarquee from "@/components/logomarquee"
import { SplineScene } from "@/components/ui/splite"
import CircularText from "@/components/ui/circle-text"
import { WhyTechnovaSection } from "@/components/ui/why-technova-section"
import { ProcessSection } from "@/components/ui/process-section"
import { Features3 } from "@/components/ui/features-3"
import LogosMarquee from "@/components/logos-marquee"
import { ImageGallery } from "@/components/ui/image-gallery"
import { HomeCaseStudies } from "@/components/home-case-studies"

export default function HomePage() {
  const t = useTranslations()
  const tInnovation = useTranslations('innovation')
  const tServices = useTranslations('services')
  const tFeatures = useTranslations('features')
  const tProcess = useTranslations('process')
  const tAi = useTranslations('ai')
  const tTestimonials = useTranslations('testimonials')
  const tCta = useTranslations('cta')
  const tGallery = useTranslations('gallery')
  const stats = [
    { value: "500+", label: "Projects Completed" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "50+", label: "Expert Team Members" },
    { value: "15+", label: "Years Experience" },
  ]

  // Track Home Page View
  useEffect(() => {
    fpixel.event("ViewContent", {
      content_name: "Home Page",
      content_category: "General",
      content_ids: ["home"],
      content_type: "product",
    })
  }, [])

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
      <Section className="py-20 lg:py-32 overflow-hidden">
        {/* Header - Outside main container for better mobile flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
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

        {/* Main Container with Robot + Floating Cards */}
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="relative min-h-[700px] lg:min-h-[800px]">

            {/* Central Robot Scene - Base Layer */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative w-full h-full max-w-[600px] max-h-[600px]"
              >
                {/* Circular Text Background */}
                <div
                  className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
                  style={{ "--radius": "220px" } as React.CSSProperties}
                >
                  <div className="w-full h-full max-w-[600px] max-h-[600px] relative hidden md:block opacity-20">
                    <CircularText
                      text="TECHNOVA   INNOVATION   ARTIFICIAL   INTELLIGENCE   "
                      onHover="speedUp"
                      spinDuration={30}
                      className="text-sm font-heading text-[#00D9FF]"
                    />
                  </div>
                </div>

                {/* Spline Robot */}
                <div className="relative h-[400px] md:h-[500px] lg:h-[600px] z-10 pt-20">
                  <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
            </div>

            {/* Floating Content Cards - Absolutely Positioned */}

            {/* Top-Left Card: Description */}
            <motion.div
              initial={{ opacity: 0, x: -40, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute top-0 left-0 lg:top-8 lg:left-8 max-w-xs z-20
                         backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5
                         border border-white/20 rounded-2xl p-6
                         shadow-2xl shadow-purple-500/10
                         hover:scale-105 hover:border-purple-500/30 hover:shadow-purple-500/20
                         transition-all duration-300 "
            >
              <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                {tInnovation('description')}
              </p>
            </motion.div>

            {/* Right Card: Feature 1 */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute top-1/4 right-0 lg:right-8 max-w-[280px] z-20
                         backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5
                         border border-white/20 rounded-2xl p-5
                         shadow-2xl shadow-cyan-500/10
                         hover:scale-105 hover:border-cyan-500/30 hover:shadow-cyan-500/20
                         transition-all duration-300
                         hidden lg:flex flex-col gap-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] rounded-full"></div>
                <span className="text-sm font-semibold text-foreground">{tInnovation('features.ai')}</span>
              </div>
            </motion.div>

            {/* Bottom-Left Card: Feature 2 */}
            <motion.div
              initial={{ opacity: 0, x: -40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="absolute bottom-8 left-0 lg:left-8 max-w-[280px] z-20
                         backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5
                         border border-white/20 rounded-2xl p-5
                         shadow-2xl shadow-purple-500/10
                         hover:scale-105 hover:border-purple-500/30 hover:shadow-purple-500/20
                         transition-all duration-300
                         hidden lg:flex flex-col gap-2 "
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] rounded-full"></div>
                <span className="text-sm font-semibold text-foreground">{tInnovation('features.integration')}</span>
              </div>
            </motion.div>

            {/* Bottom-Right Card: Feature 3 */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="absolute bottom-8 right-0 lg:right-8 max-w-[280px] z-20
                         backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5
                         border border-white/20 rounded-2xl p-5
                         shadow-2xl shadow-cyan-500/10
                         hover:scale-105 hover:border-cyan-500/30 hover:shadow-cyan-500/20
                         transition-all duration-300
                         hidden lg:flex flex-col gap-2"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] rounded-full"></div>
                <span className="text-sm font-semibold text-foreground">{tInnovation('features.technology')}</span>
              </div>
            </motion.div>

            {/* Mobile: Feature Pills Below Robot */}
            <div className="lg:hidden absolute bottom-0 left-0 right-0 flex flex-wrap gap-3 justify-center px-4 z-20">
              {[
                { key: 'ai', label: tInnovation('features.ai') },
                { key: 'integration', label: tInnovation('features.integration') },
                { key: 'technology', label: tInnovation('features.technology') }
              ].map((feature, index) => (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5
                             border border-white/20 rounded-full px-4 py-2
                             shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] rounded-full"></div>
                    <span className="text-xs font-medium text-foreground">{feature.label}</span>
                  </div>
                </motion.div>
              ))}
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

      {/* Case Studies Section */}
      <HomeCaseStudies />

      {/* Gallery Section */}
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
              {tGallery('badge')}
            </span>
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">{tGallery('title')}</h2>
          <div className="gradient-line w-24 mx-auto my-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {tGallery('description')}
          </p>
        </motion.div>
        <ImageGallery />
      </Section>

      {/* CTA Section */}
      <Section className="py-20 lg:py-40 relative overflow-hidden">
        {/* Animated Background Orbs - Solid Colors */}
        <div className="absolute inset-0 pointer-events-none">
        </div>

        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Glassmorphism Card with Solid Border */}
          <div className="relative p-[2px] rounded-3xl bg-[#7B3FEF] overflow-hidden">
            <div className="relative backdrop-blur-xl bg-background/95 rounded-3xl p-10 lg:p-16">
              {/* Decorative Corner Elements */}
              <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-[#00D9FF]/60 rounded-tl-2xl" />
              <div className="absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 border-[#7B3FEF]/60 rounded-tr-2xl" />
              <div className="absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-[#7B3FEF]/60 rounded-bl-2xl" />
              <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-[#00D9FF]/60 rounded-br-2xl" />

              <div className="text-center relative z-10">
                {/* Badge */}

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
                >
                  {tCta('title.part1')}{" "}
                  <span className="relative inline-block">
                    <span className="text-[#7B3FEF]">
                      {tCta('title.part2')}
                    </span>


                  </span>
                  {tCta('title.part3')}
                </motion.h2>

                {/* Decorative Line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "8rem" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="h-[2px] bg-[#7B3FEF] mx-auto my-8"
                />

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-muted-foreground text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto"
                >
                  {tCta('description')}
                </motion.p>

                {/* CTA Buttons */}

                {/* Primary Button - Contact */}
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-3 px-20 py-5 overflow-hidden rounded-full font-semibold text-lg transition-all duration-500 bg-[#7B3FEF] text-white hover:bg-[#6B2FDF] hover:shadow-[0_0_40px_rgba(123,63,239,0.5)] hover:-translate-y-1"
                >
                  {/* Shine Effect */}
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-white/20" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }} />

                  <span className="relative z-10 flex items-center gap-3">
                    {tCta('buttons.primary')}

                    <ArrowRight size={22} />

                  </span>
                </Link>

                {/* Secondary Button - Services */}
                {/* <Link
                    href="/services"
                    className="group relative inline-flex items-center gap-3 px-10 py-5 overflow-hidden rounded-full font-semibold text-lg transition-all duration-500 border-2 border-[#00D9FF] text-[#00D9FF] hover:bg-[#00D9FF]/15 hover:shadow-[0_0_40px_rgba(0,217,255,0.4)] hover:-translate-y-1"
                  >
                    <span className="flex items-center gap-3">
                      {tCta('buttons.secondary')}
                      <SparklesIcon size={20} />
                    </span>
                  </Link> */}


                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="mt-12 flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>{tCta('trust.available') || "متاح للمشاريع"}</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-border" />
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-[#00D9FF]" />
                    <span>{tCta('trust.secure') || "آمن & مسرح"}</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-border" />
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-[#7B3FEF]" />
                    <span>{tCta('trust.fast') || " سريع الرد"}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Partners Marquee */}
      <LogosMarquee />
      {/* Testimonials Section */}
      {/* <Section className="py-20 lg:py-32">
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
      </Section> */}
    </div>
  )
}
