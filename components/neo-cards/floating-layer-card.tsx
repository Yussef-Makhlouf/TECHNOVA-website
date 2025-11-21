"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface FloatingLayerCardProps {
  icon: LucideIcon
  title: string
  description: string
  accentColor: string
  index?: number
}

export function FloatingLayerCard({ icon: Icon, title, description, accentColor, index = 0 }: FloatingLayerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative h-full"
    >
      {/* Back layer */}
      <div
        className="absolute inset-0 rounded-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-sm"
        style={{ backgroundColor: accentColor, transform: "translate(8px, 8px)" }}
      />

      {/* Middle layer */}
      <div
        className="absolute inset-0 rounded-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"
        style={{ backgroundColor: accentColor, transform: "translate(4px, 4px)" }}
      />

      {/* Front layer - main content */}
      <div className="relative bg-white dark:bg-card border border-border rounded-2xl p-8 transition-transform duration-300 group-hover:-translate-y-2">
        {/* Top accent strip */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
          style={{
            background: `linear-gradient(90deg, ${accentColor}, transparent)`,
          }}
        />

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
          style={{ backgroundColor: `${accentColor}20` }}
        >
          <Icon size={26} style={{ color: accentColor }} />
        </div>

        <h3 className="font-heading text-xl lg:text-2xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>

        {/* Glowing corner accent */}
        <div
          className="absolute bottom-4 right-4 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
          style={{
            backgroundColor: accentColor,
            boxShadow: `0 0 20px ${accentColor}`,
          }}
        />
      </div>
    </motion.div>
  )
}
