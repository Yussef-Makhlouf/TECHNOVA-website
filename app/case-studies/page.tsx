"use client"

import Navigation from "@/components/navigation"

import { ArrowRight, TrendingUp, BarChart3, Globe, Activity, Shield, Database, Cpu } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { CaseStudyCard } from "@/components/ui/case-study-card"

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      title: "Global Bank Digital Transformation",
      institute: "Fortune 500 Financial Institution",
      category: "Digital Transformation",
      description: "Complete digital overhaul of legacy banking systems, implementing cloud infrastructure and AI-powered customer service.",
      stats: [
        { value: "60%", label: "Cost Reduction" },
        { value: "3x", label: "Faster Processing" },
        { value: "95%", label: "Customer Satisfaction" },
      ],
      image: "/modern-banking-technology.jpg",
      color: "#7B3FEF",
      href: "/case-studies/global-bank-transformation",
    },
    {
      title: "E-Commerce Platform Scaling",
      institute: "Leading Retail Brand",
      category: "Cloud Infrastructure",
      description: "Migrated e-commerce platform to cloud, implementing auto-scaling and microservices architecture.",
      stats: [
        { value: "10x", label: "Traffic Capacity" },
        { value: "99.99%", label: "Uptime" },
        { value: "40%", label: "Cost Savings" },
      ],
      image: "/e-commerce-cloud-platform.jpg",
      color: "#00D9FF",
      href: "/case-studies/ecommerce-scaling",
    },
    {
      title: "Healthcare AI Diagnostics",
      institute: "Medical Research Institute",
      category: "AI & Machine Learning",
      description: "Developed AI-powered diagnostic system for early disease detection using deep learning models.",
      stats: [
        { value: "94%", label: "Accuracy Rate" },
        { value: "70%", label: "Faster Diagnosis" },
        { value: "50K+", label: "Patients Helped" },
      ],
      image: "/medical-ai.png",
      color: "#7B3FEF",
      href: "/case-studies/healthcare-ai",
    },
    {
      title: "Smart Manufacturing IoT",
      institute: "Industrial Manufacturing Corp",
      category: "IoT Solutions",
      description: "Implemented IoT sensors and predictive maintenance system across manufacturing facilities.",
      stats: [
        { value: "45%", label: "Downtime Reduction" },
        { value: "$2M", label: "Annual Savings" },
        { value: "85%", label: "Efficiency Gain" },
      ],
      image: "/smart-factory-iot.jpg",
      color: "#00D9FF",
      href: "/case-studies/smart-manufacturing",
    },
    {
      title: "Cybersecurity Infrastructure",
      institute: "Tech Startup Unicorn",
      category: "Cybersecurity",
      description: "Built comprehensive security infrastructure with threat detection and incident response systems.",
      stats: [
        { value: "100%", label: "Threat Prevention" },
        { value: "24/7", label: "Monitoring" },
        { value: "0", label: "Security Breaches" },
      ],
      image: "/cybersecurity-network.jpg",
      color: "#7B3FEF",
      href: "/case-studies/cybersecurity-infrastructure",
    },
    {
      title: "Supply Chain Optimization",
      institute: "Global Logistics Company",
      category: "Data Engineering",
      description: "Created real-time analytics platform for supply chain visibility and optimization.",
      stats: [
        { value: "35%", label: "Faster Delivery" },
        { value: "25%", label: "Cost Reduction" },
        { value: "100%", label: "Visibility" },
      ],
      image: "/supply-chain-analytics.jpg",
      color: "#00D9FF",
      href: "/case-studies/supply-chain-optimization",
    },
  ]

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
              Case Studies
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Real-world success stories showcasing how we've helped businesses achieve their digital transformation
              goals.
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
              Ready to Write Your Success Story?
            </h2>
            <p className="text-foreground/70 text-lg mb-10 leading-relaxed">
              Let's discuss how we can help you achieve similar results for your business.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#7B3FEF] text-white rounded-lg hover:bg-[#6B2FDF] transition-all duration-300 hover:shadow-xl hover:shadow-[#7B3FEF]/30 font-medium"
            >
              Start Your Project
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>


    </div>
  )
}
