"use client"

import { useParams } from "next/navigation"
import { useCaseStudy } from "@/lib/use-api"
import Navigation from "@/components/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Building2, TrendingUp, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslations, useLocale } from "next-intl"

export default function CaseStudyDetailsPage() {
    const params = useParams()
    const id = params.id as string
    const locale = useLocale()
    const t = useTranslations("caseStudyDetailPage")

    // Use the custom hook for better performance and caching
    const { data: caseStudy, loading, error } = useCaseStudy(id)

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                    <p className="text-muted-foreground animate-pulse">Loading case study...</p>
                </div>
            </div>
        )
    }

    if (error || !caseStudy) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold text-destructive">{t("error")}</h1>
                <p className="text-muted-foreground">{error || t("caseStudyNotFound")}</p>
                <Link href={`/${locale}/case-studies`}>
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {t("backToCaseStudies")}
                    </Button>
                </Link>
            </div>
        )
    }

    // Get localized content
    const title = locale === "ar" ? caseStudy.title_ar || caseStudy.title_en : caseStudy.title_en
    const institute = locale === "ar" ? caseStudy.institute_ar || caseStudy.institute_en : caseStudy.institute_en
    const category = locale === "ar" ? caseStudy.category_ar || caseStudy.category_en : caseStudy.category_en
    const description = locale === "ar" ? caseStudy.description_ar || caseStudy.description_en : caseStudy.description_en

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Hero Section with Enhanced Design */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
                <div
                    className="absolute top-20 right-10 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 animate-pulse"
                    style={{ backgroundColor: caseStudy.color || "#7B3FEF" }}
                />
                <div
                    className="absolute bottom-20 left-10 w-[400px] h-[400px] rounded-full blur-3xl opacity-15"
                    style={{ backgroundColor: caseStudy.color || "#7B3FEF" }}
                />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <Link
                        href={`/${locale}/case-studies`}
                        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-all duration-300 hover:gap-3 gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        {t("backToCaseStudies")}
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl"
                    >
                        {/* Category Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-wrap gap-4 mb-8"
                        >
                            <span
                                className="px-4 py-2 rounded-full text-sm font-semibold border-2 backdrop-blur-sm shadow-lg"
                                style={{
                                    borderColor: caseStudy.color || "#7B3FEF",
                                    color: caseStudy.color || "#7B3FEF",
                                    backgroundColor: `${caseStudy.color || "#7B3FEF"}15`
                                }}
                            >
                                {category}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
                            {title}
                        </h1>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-lg">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="flex items-center gap-3 px-4 py-2 rounded-lg bg-card/50 backdrop-blur-sm border border-border"
                            >
                                <Building2 className="h-5 w-5" style={{ color: caseStudy.color }} />
                                <span className="font-medium">{institute}</span>
                            </motion.div>
                            {caseStudy.createdAt && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="flex items-center gap-3 px-4 py-2 rounded-lg bg-card/50 backdrop-blur-sm border border-border"
                                >
                                    <Calendar className="h-5 w-5" style={{ color: caseStudy.color }} />
                                    <span>{new Date(caseStudy.createdAt).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", { year: 'numeric', month: 'long' })}</span>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-12 lg:py-20">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        {/* Left Column: Image and Stats */}
                        <div className="lg:col-span-5 space-y-8">
                            {/* Featured Image with Enhanced Styling */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative group"
                            >
                                <div
                                    className="absolute inset-0 rounded-3xl blur-2xl opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                                    style={{ backgroundColor: caseStudy.color || "#7B3FEF" }}
                                />
                                <div className="relative rounded-3xl overflow-hidden border-2 border-border/50 shadow-2xl">
                                    <img
                                        src={caseStudy.images?.[0]?.imageLink || "/placeholder.svg"}
                                        alt={title}
                                        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </motion.div>

                            {/* Key Results Card */}
                            {caseStudy.status && caseStudy.status.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className="relative"
                                >
                                    <div
                                        className="absolute inset-0 rounded-3xl blur-xl opacity-20"
                                        style={{ backgroundColor: caseStudy.color || "#7B3FEF" }}
                                    />
                                    <div className="relative bg-card/80 backdrop-blur-xl border-2 border-border/50 rounded-3xl p-8 lg:p-10 shadow-xl">
                                        <h3 className="font-heading text-2xl font-bold mb-8 flex items-center gap-3">
                                            <div
                                                className="p-2 rounded-lg"
                                                style={{ backgroundColor: `${caseStudy.color || "#7B3FEF"}20` }}
                                            >
                                                <TrendingUp className="h-6 w-6" style={{ color: caseStudy.color }} />
                                            </div>
                                            {t("keyResults")}
                                        </h3>
                                        <div className="space-y-8">
                                            {caseStudy.status.map((stat, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                                    className="relative pl-6 border-l-4 hover:pl-8 transition-all duration-300"
                                                    style={{ borderColor: caseStudy.color || "#7B3FEF" }}
                                                >
                                                    <p
                                                        className="text-4xl lg:text-5xl font-bold mb-2"
                                                        style={{ color: caseStudy.color || "#7B3FEF" }}
                                                    >
                                                        {stat.value}
                                                    </p>
                                                    <p className="text-muted-foreground text-base">
                                                        {locale === "ar" ? stat.label_ar || stat.label_en : stat.label_en}
                                                    </p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Right Column: Description */}
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="prose prose-lg dark:prose-invert max-w-none"
                            >
                                <div className="mb-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div
                                            className="p-2 rounded-lg"
                                            style={{ backgroundColor: `${caseStudy.color || "#7B3FEF"}20` }}
                                        >
                                            <Sparkles className="h-6 w-6" style={{ color: caseStudy.color }} />
                                        </div>
                                        <h2 className="font-heading text-3xl lg:text-4xl font-bold m-0">{t("overview")}</h2>
                                    </div>
                                    <div
                                        className="h-1 w-24 rounded-full mb-8"
                                        style={{ backgroundColor: caseStudy.color || "#7B3FEF" }}
                                    />
                                </div>
                                <div className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap space-y-4">
                                    {description.split('\n\n').map((paragraph, index) => (
                                        <p key={index} className="mb-4">{paragraph}</p>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 lg:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-10"
                    style={{ backgroundColor: caseStudy.color || "#7B3FEF" }}
                />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="glass-panel p-12 lg:p-16 rounded-3xl border-2 border-border/50 dark:bg-card/30 shadow-2xl">
                            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6">
                                Ready to Write Your Success Story?
                            </h2>
                            <div
                                className="h-1 w-32 mx-auto my-6 rounded-full"
                                style={{ backgroundColor: caseStudy.color || "#7B3FEF" }}
                            />
                            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                Let's discuss how we can help you achieve similar results for your business.
                            </p>
                            <Link
                                href={`/${locale}/contact`}
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                                style={{
                                    backgroundColor: caseStudy.color || "#7B3FEF",
                                    boxShadow: `0 10px 40px ${caseStudy.color || "#7B3FEF"}30`
                                }}
                            >
                                Start Your Project
                                <ArrowLeft className="h-5 w-5 rotate-180" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
