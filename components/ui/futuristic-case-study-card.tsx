"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"

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

interface FuturisticCaseStudyCardProps {
    study: CaseStudy
    index: number
    className?: string
}

export function FuturisticCaseStudyCard({ study, index, className }: FuturisticCaseStudyCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={cn("group relative h-full", className)}
        >
            <Link href={study.href} className="block h-full">
                <div
                    className="relative h-full bg-card backdrop-blur-sm border border-border/50 transition-all duration-300 hover:border-primary/50 group-hover:shadow-[0_0_30px_-5px_var(--accent-color)]"
                    style={{
                        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%)',
                        '--accent-color': study.color || '#7B3FEF',
                    } as React.CSSProperties}
                >
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-10" />
                        <img
                            src={study.image || "/placeholder.svg"}
                            alt={study.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 z-20">
                            <span
                                className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-background/80 backdrop-blur-md border border-border/50"
                                style={{ borderLeft: `3px solid var(--accent-color)` }}
                            >
                                {study.category}
                            </span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 pb-12">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-xs font-medium tracking-wider uppercase text-muted-foreground mb-2">
                                    {study.institute}
                                </p>
                                <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                    {study.title}
                                </h3>
                            </div>
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center border border-border/50 group-hover:bg-primary group-hover:border-primary transition-colors duration-300"
                            >
                                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors duration-300" />
                            </div>
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                            {study.description}
                        </p>
                    </div>

                    {/* Diagonal Corner Cut Effect (Bottom Right) */}
                    <div
                        className="absolute w-16 h-16 bottom-[-2.8rem] right-[-2.8rem] rotate-45 transition-colors duration-300"
                        style={{ background: 'var(--accent-color)', opacity: 0.2 }}
                    />
                    <div
                        className="absolute w-16 h-16 bottom-[-2.8rem] right-[-2.8rem] rotate-45 border-t border-l border-white/20 z-20"
                    />

                </div>
            </Link>
        </motion.div>
    )
}
