"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface HexagonCardProps {
  icon: LucideIcon
  title: string
  description: string
  gradient: string
  index?: number
}

export function HexagonCard({ icon: Icon, title, description, gradient, index = 0 }: HexagonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative h-full flex items-center justify-center"
    >
      <div
        className="relative w-full p-8 bg-white dark:bg-card border-2 border-border group-hover:border-transparent transition-all duration-500"
        style={{
          clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
          minHeight: "320px",
        }}
      >
        {/* Neon outline on hover */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${gradient}`}
          style={{
            clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
            padding: "2px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Inner shadow */}
        <div
          className="absolute inset-4 opacity-5"
          style={{
            clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
            boxShadow: "inset 0 0 30px rgba(0, 0, 0, 0.3)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center h-full justify-center">
          {/* Hexagonal icon container */}
          <div
            className={`w-20 h-20 bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 group-hover:rotate-180 transition-transform duration-700`}
            style={{
              clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
            }}
          >
            <Icon size={32} className="text-white group-hover:rotate-180 transition-transform duration-700" />
          </div>

          <h3 className="font-heading text-xl lg:text-2xl font-bold text-foreground mb-3 px-4">{title}</h3>
          <p className="text-muted-foreground leading-relaxed px-6">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}
