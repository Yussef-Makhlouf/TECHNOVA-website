"use client"
// Force rebuild

import { useParams } from "next/navigation"
import { useCaseStudy } from "@/lib/use-api"
import Navigation from "@/components/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Building2, Tag, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CaseStudyDetailsPage() {
    const params = useParams()
    const id = params.id as string

    // Use the custom hook for better performance and caching
    const { data: caseStudy, loading, error, refetch } = useCaseStudy(id)

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (error || !caseStudy) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold text-destructive">Error</h1>
                <p className="text-muted-foreground">{error || "Case study not found"}</p>
                <Link href="/case-studies">
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Case Studies
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A2463]/10 via-transparent to-transparent" />
                <div
                    className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20"
                    style={{ backgroundColor: caseStudy.color || "#7B3FEF" }}
                />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <Link
                        href="/case-studies"
                        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Case Studies
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <div className="flex flex-wrap gap-4 mb-6">
                            <span
                                className="px-3 py-1 rounded-full text-sm font-medium border"
                                style={{
                                    borderColor: caseStudy.color || "#7B3FEF",
                                    color: caseStudy.color || "#7B3FEF",
                                    backgroundColor: `${caseStudy.color || "#7B3FEF"}10`
                                }}
                            >
                                {caseStudy.category_en}
                            </span>
                        </div>

                        <h1 className="font-heading text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                            {caseStudy.title_en}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-lg">
                            <div className="flex items-center gap-2">
                                <Building2 className="h-5 w-5" />
                                <span>{caseStudy.institute_en}</span>
                            </div>
                            {caseStudy.createdAt && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    <span>{new Date(caseStudy.createdAt).toLocaleDateString()}</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 lg:py-20">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Left Column: Image and Stats */}
                        <div className="lg:col-span-5 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="rounded-2xl overflow-hidden border border-border/50 shadow-2xl"
                            >
                                <img
                                    src={caseStudy.images?.[0]?.imageLink || "/placeholder.svg"}
                                    alt={caseStudy.title_en}
                                    className="w-full h-auto object-cover"
                                />
                            </motion.div>

                            <div className="bg-card border border-border/50 rounded-2xl p-6 lg:p-8">
                                <h3 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                    Key Results
                                </h3>
                                <div className="space-y-6">
                                    {caseStudy.status?.map((stat, index) => (
                                        <div key={index} className="relative pl-4 border-l-2" style={{ borderColor: caseStudy.color || "#7B3FEF" }}>
                                            <p className="text-3xl font-bold mb-1" style={{ color: caseStudy.color || "#7B3FEF" }}>
                                                {stat.value}
                                            </p>
                                            <p className="text-muted-foreground text-sm">
                                                {stat.label_en}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Description */}
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="prose prose-lg dark:prose-invert max-w-none"
                            >
                                <h2 className="font-heading text-3xl font-bold mb-6">Overview</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                    {caseStudy.description_en}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
