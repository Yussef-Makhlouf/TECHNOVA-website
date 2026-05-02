"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"

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
    const t = useTranslations('caseStudiesPage')

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative"
        >
            <Link href={study.href} className="block">
                {/* Card Container */}
                <div className="relative bg-card border border-border hover:border-foreground/20 transition-colors duration-300">

                    {/* Image Section */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                        <img
                            src={study.image || "/placeholder.svg"}
                            alt={study.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Category Tag - Top Left */}
                        <div className="absolute top-4 left-4">
                            <span
                                className="inline-block px-3 py-1.5 text-xs font-medium tracking-wider uppercase bg-background/90 backdrop-blur-sm"
                                style={{ borderLeft: `3px solid ${study.color}` }}
                            >
                                {study.category}
                            </span>
                        </div>

                        {/* Hover Overlay with Arrow */}
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300 flex items-center justify-center">
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileHover={{ scale: 1, opacity: 1 }}
                                className="w-16 h-16 rounded-full bg-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                            >
                                <ArrowUpRight className="w-6 h-6" style={{ color: study.color }} />
                            </motion.div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 lg:p-8">
                        {/* Institute */}
                        <p className="text-xs font-medium tracking-wider uppercase text-muted-foreground mb-3">
                            {study.institute}
                        </p>

                        {/* Title */}
                        <h3 className="font-heading text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                            {study.title}
                        </h3>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2">
                            {study.description}
                        </p>

                        {/* Stats Row */}
                        {study.status && study.status.length > 0 && (
                            <div className="flex gap-6 pt-4 border-t border-border">
                                {study.status.slice(0, 3).map((stat, i) => (
                                    <div key={i} className="flex-1">
                                        <p
                                            className="font-heading text-2xl font-bold"
                                            style={{ color: study.color }}
                                        >
                                            {stat.value}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Bottom Accent Line */}
                    <div
                        className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                        style={{ backgroundColor: study.color }}
                    />
                </div>
            </Link>
        </motion.article>
    )
}
