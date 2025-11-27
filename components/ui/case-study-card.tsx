"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface Stat {
  value: string
  label: string
}

interface CaseStudy {
  title: string
  institute: string
  description: string
  status: Stat[]
  image: string
  category: string
  href: string
  color: string
}

interface CaseStudyCardProps {
  study: CaseStudy
  index: number
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ study, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-card border border-border/50 overflow-hidden"
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%)',
        '--accent-color': study.color,
      } as React.CSSProperties}
    >
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={study.image || "/placeholder.svg"}
          alt={study.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-transparent" />
        <div className="absolute top-4 left-4">
          <span
            className="inline-block px-3 py-1 text-xs font-medium border rounded-full"
            style={{
              color: 'var(--accent-color)',
              borderColor: 'var(--accent-color)',
              backgroundColor: 'hsla(var(--card), 0.5)',
            }}
          >
            {study.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm font-medium text-muted-foreground mb-1">{study.institute}</p>
        <h3 className="font-heading text-2xl font-bold text-foreground mb-2">{study.title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">{study.description}</p>

        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          {study.status?.map((stat, i) => (
            <div key={i}>
              <p className="font-heading text-2xl font-bold" style={{ color: 'var(--accent-color)' }}>
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <Link href={study.href} className="flex items-center gap-2 font-medium" style={{ color: 'var(--accent-color)' }}>
          Read Full Case Study
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Diagonal Corner Cut Effect */}
      <div
        className="absolute w-16 h-16 bottom-[-2.8rem] right-[-2.8rem] rotate-45"
        style={{ background: 'var(--accent-color)' }}
      />
    </motion.div>
  )
}
