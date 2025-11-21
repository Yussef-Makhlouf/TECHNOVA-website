"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface SplitPanelCardProps {
  icon: LucideIcon
  title: string
  description: string
  color: string
  index?: number
}

export function SplitPanelCard({ icon: Icon, title, description, color, index = 0 }: SplitPanelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative h-full"
    >
      <div className="relative h-full bg-white dark:bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500">
        <div className="flex h-full">
          {/* Left icon panel */}
          <div
            className="w-24 flex items-center justify-center relative overflow-hidden group-hover:w-28 transition-all duration-500"
            style={{
              background: `linear-gradient(180deg, ${color}, ${color}dd)`,
            }}
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-1 bg-white/50 animate-pulse" />
              <div
                className="absolute bottom-0 left-0 w-full h-1 bg-white/50 animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
            </div>

            <Icon
              size={36}
              className="text-white relative z-10 group-hover:scale-125 transition-transform duration-500"
            />
          </div>

          {/* Right content panel */}
          <div className="flex-1 p-6 flex flex-col justify-center">
            <h3 className="font-heading text-xl lg:text-2xl font-bold text-foreground mb-3">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>

            {/* Bottom accent line */}
            <div
              className="h-1 mt-4 w-0 group-hover:w-full transition-all duration-700 rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>

        {/* Glowing border effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 30px ${color}40`,
          }}
        />
      </div>
    </motion.div>
  )
}
