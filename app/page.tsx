"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
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

export default function HomePage() {
  const stats = [
    { value: "500+", label: "Projects Completed" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "50+", label: "Expert Team Members" },
    { value: "15+", label: "Years Experience" },
  ]

  const services = [
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description: "Advanced artificial intelligence solutions that transform data into actionable insights.",
      gradient: "from-[#7B3FEF] to-[#9D5FFF]",
      color: "#7B3FEF",
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Enterprise-grade security solutions protecting your digital assets 24/7.",
      gradient: "from-[#00D9FF] to-[#00B8D4]",
      color: "#00D9FF",
    },
    {
      icon: Code,
      title: "Custom Development",
      description: "Tailored software solutions built with cutting-edge technologies.",
      gradient: "from-[#7B3FEF] to-[#00D9FF]",
      color: "#7B3FEF",
    },
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

  const caseStudies = [
    {
      title: "Healthcare AI Diagnostics",
      institute: "Medical Research Institute",
      description: "Developed an AI-powered diagnostic system for early disease detection using deep learning models.",
      stats: [
        { value: "94%", label: "Accuracy Rate" },
        { value: "70%", label: "Faster Diagnosis" },
        { value: "50K+", label: "Patients Helped" },
      ],
      image: "/ai-analytics-dashboard.png",
      category: "AI & Machine Learning",
      href: "/case-studies/healthcare-ai",
      color: "#7B3FEF",
    },
    {
      title: "Smart Manufacturing IoT",
      institute: "Industrial Manufacturing Corp",
      description: "Implemented IoT sensors and a predictive maintenance system across manufacturing facilities.",
      stats: [
        { value: "45%", label: "Downtime Reduction" },
        { value: "$2M", label: "Annual Savings" },
        { value: "85%", label: "Efficiency Gain" },
      ],
      image: "/neon-ecommerce-website.jpg",
      category: "IoT Solutions",
      href: "/case-studies/smart-manufacturing",
      color: "#00D9FF",
    },
    {
      title: "FinTech Revolution",
      institute: "Global Bank Inc.",
      description: "Engineered a secure, scalable, and high-performance trading platform, increasing transaction speed by 300%.",
      stats: [
        { value: "300%", label: "Faster Transactions" },
        { value: "99.9%", label: "Uptime" },
        { value: "10M+", label: "Daily Transactions" },
      ],
      image: "/fintech-dashboard-ui.jpg",
      category: "Financial Technology",
      href: "/case-studies/fintech-revolution",
      color: "#7B3FEF",
    },
  ]

  const testimonials = [
    {
      quote: "TECHNOVA transformed our entire digital infrastructure. The results exceeded all expectations.",
      author: "Sarah Johnson",
      role: "CEO, TechCorp",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote: "Their AI solutions gave us a competitive edge we never thought possible. Truly next-generation.",
      author: "Michael Chen",
      role: "CTO, InnovateAI",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote: "Working with TECHNOVA was seamless. They delivered beyond our requirements and on time.",
      author: "Emily Rodriguez",
      role: "VP of Engineering, DataFlow",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="min-h-screen relative">
      <AnimatedGradientBackground />
      <Navigation />

      <Hero />



      <Section className="bg-gradient-to-b from-background to-muted/30 border-y border-border">
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
      </Section>

            {/* <IntegrationsSection /> */}

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">Our Core Principles</h2>
          <div className="gradient-line w-24 mx-auto my-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            The values and capabilities that drive our success and define our commitment to excellence.
          </p>
        </motion.div>
        <FeaturesSectionWithHoverEffects features={combinedFeatures} />
      </Section>

      <Features />

      <Section className="bg-gradient-to-b from-muted/20 to-background">
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
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {caseStudies.map((study, index) => (
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
      </Section>

      <Section className="py-20 border-y border-border bg-muted/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-muted-foreground font-medium">Trusted by Industry Leaders</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center max-w-6xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="flex items-center justify-center p-6 rounded-xl glass-panel border-border hover:border-[#00D9FF]/30 transition-all duration-300 group"
            >
              <div className="text-4xl font-bold text-muted-foreground/30 group-hover:text-[#00D9FF]/50 transition-colors duration-300 font-heading">
                LOGO
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">What Our Clients Say</h2>
          <div className="gradient-line w-24 mx-auto my-6" />
        </motion.div>
        <StaggerTestimonials />
      </Section>

      <Footer />
    </div>
  )
}
