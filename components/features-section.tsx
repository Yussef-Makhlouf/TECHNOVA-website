"use client"

import { motion } from "framer-motion"
import { Rocket, Cpu, Network, Zap, Shield, Globe } from "lucide-react"
import { HexagonCard } from "./neo-cards/hexagon-card"

export function FeaturesSection() {
  const features = [
    {
      icon: Rocket,
      title: "Lightning Fast Performance",
      description: "Experience unparalleled speed with our optimized infrastructure built for the future.",
      gradient: "from-[#7B3FEF] to-[#9D5FFF]",
    },
    {
      icon: Cpu,
      title: "Advanced AI Integration",
      description: "Leverage cutting-edge artificial intelligence to automate and enhance your workflows.",
      gradient: "from-[#00D9FF] to-[#00B8D4]",
    },
    {
      icon: Network,
      title: "Seamless Connectivity",
      description: "Connect all your systems effortlessly with our unified platform architecture.",
      gradient: "from-[#7B3FEF] to-[#00D9FF]",
    },
    {
      icon: Zap,
      title: "Real-Time Analytics",
      description: "Make data-driven decisions with instant insights and comprehensive analytics.",
      gradient: "from-[#00D9FF] to-[#7B3FEF]",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security protocols protect your data with advanced encryption.",
      gradient: "from-[#9D5FFF] to-[#7B3FEF]",
    },
    {
      icon: Globe,
      title: "Global Scalability",
      description: "Scale your operations worldwide with our distributed infrastructure.",
      gradient: "from-[#00B8D4] to-[#00D9FF]",
    },
  ]

  return (
    <section className="py-20 lg:py-32 relative">
      <div className="absolute top-0 left-0 right-0 gradient-line" />

      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">Powerful Features</h2>
          <div className="gradient-line w-24 mx-auto my-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to accelerate your digital transformation and stay ahead of the curve.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <HexagonCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
