"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface DiagonalCardProps {
  icon: LucideIcon
  title: string
  description: string
  features?: string[]
  color?: string
  index?: number
  href?: string
  id?: string | number
  className?: string
}

export function DiagonalCard({
  icon: Icon,
  title,
  description,
  features,
  color = "#7B3FEF",
  index = 0,
  href,
  id,
  className,
}: DiagonalCardProps) {
  const CardContent = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={cn(
        "group relative h-full bg-card p-6 backdrop-blur-sm border border-border/50 transition-all duration-300 hover:border-border",
        "after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-20 after:h-20 after:bg-gradient-to-br after:from-transparent after:to-transparent",
        className,
      )}
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%)',
        '--accent-color': color,
      } as React.CSSProperties}
    >
      {/* Octagon Icon Badge */}
      <div className="relative w-16 h-16 mb-6">
        <div
          className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-lg"
          style={{
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            backgroundColor: 'var(--accent-color)',
          }}
        />
        <div
          className="absolute inset-1 bg-card rounded-lg flex items-center justify-center"
          style={{
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
          }}
        >
          <Icon className="w-7 h-7 text-accent transition-colors duration-300" style={{ color: 'var(--accent-color)' }} />
        </div>
      </div>

      <h3 className="font-heading text-2xl font-bold text-foreground mb-3 transition-colors duration-300">
        {title}
      </h3>

      <p className="text-muted-foreground leading-relaxed mb-4">{description}</p>

      {features && features.length > 0 && (
        <ul className="space-y-2 mb-4">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-foreground/70">
              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" style={{ backgroundColor: 'var(--accent-color)' }} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {href && (
        <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all duration-300" style={{ color: 'var(--accent-color)' }}>
          Learn More
          <ArrowRight className="w-4 h-4" />
        </div>
      )}

      {/* Diagonal Corner Cut Effect */}
      <div
        className="absolute w-16 h-16 bottom-[-2.8rem] right-[-2.8rem] rotate-45"
        style={{ background: 'var(--accent-color)' }}
      />
    </motion.div>
  )

  if (href) {
    return <Link href={href}>{CardContent}</Link>
  }

  return CardContent
}
