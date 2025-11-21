"use client"

import { motion } from "framer-motion"
import { type LucideIcon, ArrowRight } from "lucide-react"
import { useState } from "react"

interface RevealTileCardProps {
  icon: LucideIcon
  title: string
  description: string
  details: string[]
  gradient: string
  index?: number
}

export function RevealTileCard({ icon: Icon, title, description, details, gradient, index = 0 }: RevealTileCardProps) {
  const [isRevealed, setIsRevealed] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative h-full"
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
    >
      <div className="relative h-full bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
        {/* Main content layer */}
        <div
          className={`relative z-10 p-8 transition-transform duration-500 ${
            isRevealed ? "-translate-y-full" : "translate-y-0"
          }`}
        >
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500`}
          >
            <Icon size={28} className="text-white" />
          </div>

          <h3 className="font-heading text-xl lg:text-2xl font-bold text-foreground mb-3">{title}</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">{description}</p>

          <div
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: gradient.includes("7B3FEF") ? "#7B3FEF" : "#00D9FF" }}
          >
            Learn More <ArrowRight size={16} />
          </div>
        </div>

        {/* Reveal layer that slides up */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} p-8 flex flex-col justify-center transition-transform duration-500 ${
            isRevealed ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <h4 className="font-heading text-xl font-bold text-white mb-4">Key Features:</h4>
          <ul className="space-y-3">
            {details.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-3 text-white/90">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                <span className="leading-relaxed">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}
