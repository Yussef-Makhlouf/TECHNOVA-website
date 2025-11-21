"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface UniversalCardProps {
  icon: LucideIcon
  title: string
  description: string
  index?: number
  className?: string
  gradient?: string
  color?: string
}

export function UniversalCard({
  icon: Icon,
  title,
  description,
  index = 0,
  className,
  gradient,
  color = "#00D9FF",
}: UniversalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={cn("group relative", className)}
    >
      <div
        className="relative h-full bg-card dark:bg-card border-2 border-border overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 0)",
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: gradient || `linear-gradient(135deg, ${color}10, transparent)`,
          }}
        />

        <div className="relative z-10 p-8">
          <div
            className="w-16 h-16 mb-6 flex items-center justify-center transition-all duration-500 group-hover:scale-110"
            style={{
              clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
              backgroundColor: `${color}30`,
              boxShadow: `0 0 20px ${color}20`,
            }}
          >
            <Icon size={28} style={{ color }} />
          </div>

          <h3 className="font-heading text-xl lg:text-2xl font-bold text-foreground mb-3">{title}</h3>

          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>

        <div
          className="absolute bottom-0 right-0 w-12 h-12 opacity-30"
          style={{
            background: `linear-gradient(135deg, transparent 50%, ${color} 50%)`,
          }}
        />
      </div>
    </motion.div>
  )
}
