"use client"

import Navigation from "@/components/navigation"
import { useData } from "@/lib/data-context"

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
  const stats = [
    { value: "500+", label: "Projects Completed" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "50+", label: "Expert Team Members" },
    { value: "15+", label: "Years Experience" },
  ]

  const combinedFeatures = [
    {
      icon: <IconTarget />,
      title: "Innovation First",
      description: "We push boundaries and challenge conventions to deliver breakthrough solutions.",
    },
    {
      icon: <IconUsers />,
      title: "Client-Centric",
      description: "Your success is our mission. We build lasting partnerships, not just projects.",
    },
    {
      icon: <IconAward />,
      title: "Excellence",
      description: "We maintain the highest standards in every line of code and every interaction.",
    },
    {
      icon: <IconBolt />,
      title: "Lightning Performance",
      description: "Optimized solutions that deliver results at unprecedented speed.",
    },
    {
      icon: <IconGlobe />,
      title: "Global Reach",
      description: "Scalable infrastructure serving clients across 50+ countries.",
    },
    {
      icon: <IconStar />,
      title: "Award-Winning",
      description: "Recognized industry leader with multiple innovation awards.",
    },
    {
      icon: <IconCpu />,
      title: "Powerful",
      description: "Enterprise-grade solutions supporting entire development ecosystems.",
    },
    {
      icon: <IconFingerprint />,
      title: "Security",
      description: "Bank-level security protecting your valuable digital assets.",
    },
    {
      icon: <IconPencil />,
      title: "Customization",
      description: "Flexible solutions tailored to your unique business needs.",
    },
    {
      icon: <IconSettings />,
      title: "Control",
      description: "Complete control over your infrastructure and data.",
    },
    {
      icon: <IconSparkles />,
      title: "Built for AI",
      description: "AI-ready infrastructure designed for the future.",
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

      {/* Stats Section - Re-enabled */}
      {/* <Section className="py-16 lg:py-20 border-y border-border/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#7B3FEF]/5 to-[#00D9FF]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6">
                  <div className="font-heading text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
                  <div className="w-12 h-1 bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] mx-auto mt-4 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section> */}

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
              Innovation in Action
            </span>
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Transform Ideas Into Reality
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
                    Our cutting-edge solutions bridge the gap between concept and execution,
                    delivering experiences that redefine what's possible in digital innovation.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] rounded-full"></div>
                    <span className="text-sm font-medium text-foreground">AI-Powered Solutions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] rounded-full"></div>
                    <span className="text-sm font-medium text-foreground">Seamless Integration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] rounded-full"></div>
                    <span className="text-sm font-medium text-foreground">Future-Ready Technology</span>
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
              What We Offer
            </span>
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">Our Core Services</h2>
          <div className="gradient-line w-24 mx-auto my-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive solutions designed to propel your business into the future.
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
              Our DNA
            </span>
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">What Sets Us Apart</h2>
          <div className="gradient-line w-24 mx-auto my-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            The values and capabilities that drive our success and define our commitment to excellence.
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
              How We Work
            </span>
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">Our Proven Process</h2>
          <div className="gradient-line w-24 mx-auto my-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            A systematic approach to delivering exceptional results, every time.
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
              Intelligent Technology
            </span>
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">AI-Powered Solutions</h2>
          <div className="gradient-line w-24 mx-auto my-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Harness the power of artificial intelligence to transform your business operations.
          </p>
        </motion.div>
        <Features />
      </Section>

      {/* Featured Projects Section - Re-enabled */}
      {/* <Section className="py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#00D9FF]/10 to-[#7B3FEF]/10 border border-[#00D9FF]/20 text-sm font-medium text-[#00D9FF]">
              Success Stories
            </span>
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">Featured Projects</h2>
          <div className="gradient-line w-24 mx-auto my-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Real-world examples of how we've helped businesses achieve extraordinary results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {displayedCaseStudies.map((study, index) => (
            <CaseStudyCard key={index} study={study} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-[#00D9FF] text-[#00D9FF] font-medium hover:bg-[#00D9FF] hover:text-white transition-all duration-300 hover:-translate-y-1"
          >
            View All Projects
            <ArrowRight size={20} />
          </Link>
        </div>
      </Section> */}

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
              Client Feedback
            </span>
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">What Our Clients Say</h2>
          <div className="gradient-line w-24 mx-auto my-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Trusted by leading organizations worldwide.
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
            Ready to Build the{" "}
            <span className="bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] bg-clip-text text-transparent">Future</span>
            ?
          </h2>
          <div className="gradient-line w-32 mx-auto my-8" />
          <p className="text-muted-foreground text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
            Transform your vision into reality with TECHNOVA's cutting-edge solutions. Let's create something
            extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] text-white rounded-full hover:shadow-2xl hover:shadow-[#00D9FF]/40 transition-all duration-300 hover:-translate-y-1 font-medium text-lg"
            >
              Start Your Project
              <ArrowRight size={22} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-10 py-5 border-2 border-[#00D9FF] text-[#00D9FF] rounded-full hover:bg-[#00D9FF]/10 transition-all duration-300 hover:-translate-y-1 font-medium text-lg"
            >
              Explore Solutions
            </Link>
          </div>
        </motion.div>
      </Section>

      {/* Partners Marquee */}
      <LogosMarquee />

    </div>
  )
}
