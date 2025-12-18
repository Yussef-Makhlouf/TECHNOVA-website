"use client"

import { motion } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"
import { ArrowRight, SparklesIcon } from "lucide-react"
import { useData } from "@/lib/data-context"
import { FuturisticCaseStudyCard } from "@/components/ui/futuristic-case-study-card"
import { FuturisticButton } from "@/components/ui/futuristic-button"
import { Link } from "@/i18n/routing"

export function HomeCaseStudies() {
    const t = useTranslations('homeCaseStudies')
    const locale = useLocale()
    const isRtl = locale === 'ar'

    const { caseStudies } = useData()
    const displayCount = 4
    const rawStudies = caseStudies.slice(0, displayCount)

    const displayedStudies = rawStudies.map(study => ({
        ...study,
        title: isRtl ? study.titleAr || study.title : study.title,
        institute: isRtl ? study.instituteAr || study.institute : study.institute,
        category: isRtl ? study.categoryAr || study.category : study.category,
        description: isRtl ? study.descriptionAr || study.description : study.description,
        status: study.status.map(s => ({
            ...s,
            label: isRtl ? s.labelAr || s.label : s.label
        }))
    }))


    return (
        <section className="py-20 lg:py-32 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#7B3FEF]/10 to-[#00D9FF]/10 border border-[#7B3FEF]/20 text-sm font-medium text-[#7B3FEF]">
                            {t('badge')}
                        </span>
                    </div>

                    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        {t('title')}
                    </h2>

                    <div className="gradient-line w-24 mx-auto my-6" />

                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                        {t('description')}
                    </p>
                </motion.div>

                {/* Case Studies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {displayedStudies.map((study, index) => (
                        <FuturisticCaseStudyCard
                            key={index}
                            study={study}
                            index={index}
                            className={index === 1 || index === 3 ? "md:mt-12" : ""} // Staggered layout effect
                        />
                    ))}
                </div>

                {/* Bottom CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <Link href="/case-studies">
                        <FuturisticButton size="lg" className="group">
                            <span className="flex items-center gap-2">
                                {t('viewAll')}
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                            </span>
                        </FuturisticButton>
                    </Link>
                </motion.div>

            </div>
        </section>
    )
}
