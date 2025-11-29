"use client"

import Navigation from "@/components/navigation"

import { Calendar, Clock, ArrowLeft, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { useData } from "@/lib/data-context"

export default function InsightDetailPage() {
    const params = useParams()
    const id = params.id as string
    const t = useTranslations('insightsPage')
    const locale = useLocale()
    const isRtl = locale === 'ar'
    const { insights: insightsData } = useData()

    // Find the insight by ID
    const insightData = insightsData.find(insight => insight._id?.toString() === id)

    if (!insightData) {
        return (
            <div className="min-h-screen bg-background">
                <Navigation />
                <div className="container mx-auto px-4 lg:px-8 pt-32">
                    <p className="text-center text-muted-foreground">
                        {isRtl ? 'الرؤية غير موجودة' : 'Insight not found'}
                    </p>
                </div>
            </div>
        )
    }

    const insight = {
        ...insightData,
        title: isRtl ? insightData.titleAr || insightData.title : insightData.title,
        description: isRtl ? insightData.descriptionAr || insightData.description : insightData.description,
        author: isRtl ? insightData.authorAr || insightData.author : insightData.author,
        category: isRtl ? insightData.categoryAr || insightData.category : insightData.category,
    }

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <article className="pt-32 pb-20 lg:pt-40 lg:pb-24">
                <div className="container mx-auto px-4 lg:px-8 mb-12">
                    <Link
                        href={`/${locale}/insights`}
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8"
                    >
                        <ArrowLeft size={16} />
                        {isRtl ? 'العودة إلى الرؤى' : 'Back to Insights'}
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium dark:bg-accent/30">
                                {insight.category}
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground text-sm">
                                <TrendingUp size={14} />
                                {isRtl ? 'تقرير السوق' : 'Market Report'}
                            </span>
                        </div>

                        <h1 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                            {insight.title}
                        </h1>

                        <div className="flex items-center gap-6 text-muted-foreground border-b border-border pb-8 mb-8">
                            <span className="flex items-center gap-2">
                                <Calendar size={16} />
                                {insight.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock size={16} />
                                {insight.readTime}
                            </span>
                            {insight.author && (
                                <span className="flex items-center gap-2">
                                    {isRtl ? 'بواسطة' : 'By'} {insight.author}
                                </span>
                            )}
                        </div>

                        {insight.image && (
                            <div className="mb-8 rounded-xl overflow-hidden">
                                <img
                                    src={insight.image}
                                    alt={insight.title}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        )}

                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                {insight.description}
                            </p>

                            {/* Add more content here when available from backend */}
                        </div>
                    </motion.div>
                </div>
            </article>


        </div>
    )
}
