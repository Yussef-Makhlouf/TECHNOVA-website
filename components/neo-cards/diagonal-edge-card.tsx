"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface DiagonalEdgeCardProps {
  icon: LucideIcon
  title: string
  description: string
  gradient: string
  index?: number
}

export function DiagonalEdgeCard({ icon: Icon, title, description, gradient, index = 0 }: DiagonalEdgeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative h-full"
    >
      <div
        className="relative h-full p-8 bg-white dark:bg-card border border-border overflow-hidden"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)",
        }}
      >
        {/* Gradient glow on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        {/* Neon border effect */}
        <div
          className={`absolute top-0 right-0 w-1 h-full bg-gradient-to-b ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />

        <div className="relative z-10">
          {/* Icon container */}
          <div
            className={`w-16 h-16 bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
            style={{
              clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
            }}
          >
            <Icon size={28} className="text-white" />
          </div>

          <h3 className="font-heading text-xl lg:text-2xl font-bold text-foreground mb-3">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>

          {/* Bottom diagonal accent line */}
          <div
            className={`absolute bottom-0 right-0 h-0.5 w-0 group-hover:w-32 bg-gradient-to-r ${gradient} transition-all duration-500`}
          />
        </div>
      </div>
    </motion.div>
  )
}
