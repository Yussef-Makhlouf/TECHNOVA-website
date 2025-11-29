"use client"

import Navigation from "@/components/navigation"

import { Brain, CheckCircle2, ArrowRight, Zap, Shield, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useParams } from "next/navigation"
import { DiagonalCard } from "@/components/diagonal-card"

export default function ServiceDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  // Mock data - in a real app, fetch based on slug
  const service = {
    title: "AI & Machine Learning",
    description:
      "Transform your business with intelligent automation, predictive analytics, and advanced machine learning models.",
    icon: Brain,
    features: [
      "Natural Language Processing (NLP)",
      "Computer Vision & Image Recognition",
      "Predictive Analytics & Forecasting",
      "Recommendation Engines",
      "Process Automation (RPA)",
      "Generative AI Solutions",
    ],
    benefits: [
      {
        title: "Increased Efficiency",
        description: "Automate repetitive tasks and reduce operational costs by up to 40%.",
        icon: Zap,
      },
      {
        title: "Better Decision Making",
        description: "Data-driven insights help you make smarter, faster strategic decisions.",
        icon: BarChart3,
      },
      {
        title: "Risk Mitigation",
        description: "Identify potential risks and anomalies before they impact your business.",
        icon: Shield,
      },
    ],
  }

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
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-8">
              <service.icon size={40} className="text-accent" />
            </div>
            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              {service.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">{service.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30 dark:bg-card/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Capabilities & Features
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Our comprehensive suite of AI services covers the entire spectrum of machine learning capabilities, from
                basic automation to complex neural networks.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span className="text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
              <div className="relative bg-card border border-border rounded-3xl p-2 overflow-hidden dark:bg-card/50">
                <img src="/ai-analytics-dashboard.png" alt="Service Dashboard" className="w-full h-auto rounded-2xl" />
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
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">Key Benefits</h2>
            <div className="h-1 w-24 mx-auto my-6 bg-gradient-to-r from-primary to-accent rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.benefits.map((benefit, index) => (
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
              Ready to leverage {service.title}?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Schedule a consultation with our experts to discuss your specific needs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 font-medium"
            >
              Get Started
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>


    </div>
  )
}
