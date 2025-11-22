"use client"

import Navigation from "@/components/navigation"

import { Brain, Cloud, Shield, Sparkles, Database, Code, Cpu, Network } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { DiagonalCard } from "@/components/diagonal-card"
import { Features } from "@/components/ui/features-8"
import { ServiceCard } from "@/components/service-card"

export default function ServicesPage() {
  const services = [
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description:
        "Transform your business with intelligent automation, predictive analytics, and advanced machine learning models.",
      features: ["Natural Language Processing", "Computer Vision", "Predictive Analytics", "Deep Learning Models"],
      color: "#7B3FEF",
      image: "/ai-analytics-dashboard.png",
      href: "/services/ai-machine-learning",
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "Build scalable, resilient cloud architectures that grow with your business needs.",
      features: ["Cloud Migration", "Multi-Cloud Strategy", "Infrastructure as Code", "DevOps Integration"],
      color: "#00D9FF",
      image: "/cloud-migration-concept.png",
      href: "/services/cloud-infrastructure",
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your digital assets from evolving threats.",
      features: ["Threat Detection", "Security Audits", "Compliance Management", "Incident Response"],
      color: "#7B3FEF",
      image: "/cybersecurity-digital-protection.png",
      href: "/services/cybersecurity",
    },
    {
      icon: Sparkles,
      title: "Digital Transformation",
      description: "Modernize your business processes with cutting-edge digital solutions and strategies.",
      features: ["Process Automation", "Digital Strategy", "Change Management", "Innovation Consulting"],
      color: "#00D9FF",
      image: "/digital-transformation-technology.png",
      href: "/services/digital-transformation",
    },
    {
      icon: Database,
      title: "Data Engineering",
      description: "Build robust data pipelines and analytics platforms for data-driven decision making.",
      features: ["Data Warehousing", "ETL Pipelines", "Real-time Analytics", "Data Governance"],
      color: "#7B3FEF",
      image: "/data-analytics-visualization.png",
      href: "/services/data-engineering",
    },
    {
      icon: Code,
      title: "Custom Software Development",
      description: "Tailored software solutions designed to meet your unique business requirements.",
      features: ["Web Applications", "Mobile Apps", "API Development", "Legacy Modernization"],
      color: "#00D9FF",
      image: "/software-development-coding.png",
      href: "/services/custom-software",
    },
    {
      icon: Cpu,
      title: "IoT Solutions",
      description: "Connect and optimize your physical assets with intelligent IoT implementations.",
      features: ["Device Integration", "Edge Computing", "IoT Analytics", "Smart Automation"],
      color: "#7B3FEF",
      image: "/iot-smart-devices-connected.png",
      href: "/services/iot-solutions",
    },
    {
      icon: Network,
      title: "Enterprise Integration",
      description: "Seamlessly connect your systems and applications for unified business operations.",
      features: ["API Management", "System Integration", "Microservices", "Event-Driven Architecture"],
      color: "#00D9FF",
      image: "/enterprise-system-integration.png",
      href: "/services/enterprise-integration",
    },
  ]

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
                Our Services
              </span>
            </div>
            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              TECHNOVA{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Services</span>
            </h1>
            <div className="h-1 w-32 mx-auto my-6 bg-gradient-to-r from-primary to-accent rounded-full" />
            <p className="text-xl text-muted-foreground leading-relaxed">
              Comprehensive technology solutions designed to accelerate your digital transformation and drive business
              growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <div className="h-1 w-32 mx-auto my-6 bg-gradient-to-r from-primary to-accent rounded-full" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Explore our comprehensive range of technology solutions designed to transform your business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} index={index} />
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
              Why Choose Our Services
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Experience the difference with our enterprise-grade solutions
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
                Ready to Transform Your Business?
              </h2>
              <div className="h-1 w-32 mx-auto my-6 bg-gradient-to-r from-primary to-accent rounded-full" />
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Let's discuss how our services can help you achieve your digital transformation goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 hover:-translate-y-1"
                >
                  Get Started
                </Link>
                <Link
                  href="/case-studies"
                  className="px-8 py-4 rounded-xl glass-panel border border-border hover:border-accent text-foreground font-medium transition-all duration-300 hover:-translate-y-1 dark:bg-card/30"
                >
                  View Case Studies
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


    </div>
  )
}
