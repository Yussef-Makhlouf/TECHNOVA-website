"use client"

import { useParams } from "next/navigation"
import { useCaseStudy } from "@/lib/use-api"
import Navigation from "@/components/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Building2, Calendar, ChevronLeft, ChevronRight, Target, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslations, useLocale } from "next-intl"
import { useState } from "react"

export default function CaseStudyDetailsPage() {
    const params = useParams()
    const id = params.id as string
    const locale = useLocale()
    const isRtl = locale === 'ar'
    const t = useTranslations("caseStudyDetailPage")

    const { data: caseStudy, loading, error } = useCaseStudy(id)
    const [selectedImage, setSelectedImage] = useState<number | null>(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-2 border-border border-t-primary animate-spin" />
                    <p className="text-sm text-muted-foreground">{isRtl ? 'جاري التحميل...' : 'Loading...'}</p>
                </div>
            </div>
        )
    }

    if (error || !caseStudy) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 p-4">
                <h1 className="text-2xl font-bold text-destructive">{t("error")}</h1>
                <p className="text-muted-foreground">{error || t("caseStudyNotFound")}</p>
                <Link href={`/${locale}/case-studies`}>
                    <Button variant="outline" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        {t("backToCaseStudies")}
                    </Button>
                </Link>
            </div>
        )
    }

    const title = locale === "ar" ? caseStudy.title_ar || caseStudy.title_en : caseStudy.title_en
    const institute = locale === "ar" ? caseStudy.institute_ar || caseStudy.institute_en : caseStudy.institute_en
    const category = locale === "ar" ? caseStudy.category_ar || caseStudy.category_en : caseStudy.category_en
    const description = locale === "ar" ? caseStudy.description_ar || caseStudy.description_en : caseStudy.description_en
    const accentColor = caseStudy.color || "#7B3FEF"
    const images = caseStudy.images || []

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length)
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Hero Section - Minimal */}
            <section className="relative pt-32 pb-12 lg:pt-44 lg:pb-16">
                {/* Subtle Background */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Accent Line */}
                <div
                    className="absolute left-0 top-1/3 w-1 h-24 hidden lg:block"
                    style={{ backgroundColor: accentColor }}
                />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    {/* Back Link */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Link
                            href={`/${locale}/case-studies`}
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            {t("backToCaseStudies")}
                        </Link>
                    </motion.div>

                    <div className="max-w-5xl">
                        {/* Category & Meta */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="flex flex-wrap items-center gap-4 mb-6"
                        >
                            <span
                                className="inline-block px-3 py-1.5 text-xs font-medium tracking-wider uppercase"
                                style={{ borderLeft: `3px solid ${accentColor}`, backgroundColor: `${accentColor}08` }}
                            >
                                {category}
                            </span>
                            <span className="text-muted-foreground text-sm flex items-center gap-2">
                                <Building2 className="w-4 h-4" />
                                {institute}
                            </span>
                            {caseStudy.createdAt && (
                                <span className="text-muted-foreground text-sm flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(caseStudy.createdAt).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", { year: 'numeric', month: 'long' })}
                                </span>
                            )}
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-[1.1] mb-6"
                        >
                            {title}
                        </motion.h1>

                        {/* Short Description / Tagline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-lg text-muted-foreground max-w-3xl"
                        >
                            {description.split('\n\n')[0]}
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Image Gallery Section */}
            {images.length > 0 && (
                <section className="py-8 lg:py-12">
                    <div className="container mx-auto px-4 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="relative"
                        >
                            {/* Main Image */}
                            <div
                                className="relative aspect-video bg-muted overflow-hidden cursor-pointer group"
                                onClick={() => setSelectedImage(currentImageIndex)}
                            >
                                <img
                                    src={images[currentImageIndex]?.imageLink || "/placeholder.svg"}
                                    alt={title}
                                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                                />

                                {/* Accent Border */}
                                <div
                                    className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                                    style={{ backgroundColor: accentColor }}
                                />

                                {/* Navigation Arrows */}
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </>
                                )}

                                {/* Image Counter */}
                                {images.length > 1 && (
                                    <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-background/80 backdrop-blur-sm text-xs font-medium">
                                        {currentImageIndex + 1} / {images.length}
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail Strip */}
                            {images.length > 1 && (
                                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                                    {images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`flex-shrink-0 w-20 h-14 overflow-hidden border-2 transition-all ${currentImageIndex === index
                                                    ? 'opacity-100'
                                                    : 'opacity-50 hover:opacity-80'
                                                }`}
                                            style={{
                                                borderColor: currentImageIndex === index ? accentColor : 'transparent'
                                            }}
                                        >
                                            <img src={img.imageLink} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Content Section */}
            <section className="py-12 lg:py-20">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        {/* Left: Results */}
                        <div className="lg:col-span-4">
                            {caseStudy.status && caseStudy.status.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="sticky top-32"
                                >
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-8 h-[1px]" style={{ backgroundColor: accentColor }} />
                                        <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
                                            {t("keyResults")}
                                        </h2>
                                    </div>

                                    <div className="space-y-8">
                                        {caseStudy.status.map((stat, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                                viewport={{ once: true }}
                                                className="relative"
                                            >
                                                <div
                                                    className="absolute left-0 top-0 bottom-0 w-[2px]"
                                                    style={{ backgroundColor: accentColor }}
                                                />
                                                <div className="pl-6">
                                                    <p
                                                        className="font-heading text-4xl lg:text-5xl font-bold mb-1"
                                                        style={{ color: accentColor }}
                                                    >
                                                        {stat.value}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {locale === "ar" ? stat.label_ar || stat.label_en : stat.label_en}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Right: Description */}
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-8 h-[1px]" style={{ backgroundColor: accentColor }} />
                                    <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
                                        {t("overview")}
                                    </h2>
                                </div>

                                <div className="prose prose-lg dark:prose-invert max-w-none">
                                    <div className="text-muted-foreground leading-relaxed space-y-6">
                                        {description.split('\n\n').slice(1).map((paragraph, index) => (
                                            <p key={index}>{paragraph}</p>
                                        ))}
                                        {description.split('\n\n').length === 1 && (
                                            <p>{description}</p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 lg:py-28 border-t border-border">
                <div className="container mx-auto px-4 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <div
                            className="w-16 h-1 mx-auto mb-8"
                            style={{ backgroundColor: accentColor }}
                        />

                        <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6">
                            {t("ctaTitle")}
                        </h2>

                        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                            {t("ctaDescription")}
                        </p>

                        <Link
                            href={`/${locale}/contact`}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-medium hover:opacity-90 transition-opacity group"
                        >
                            {t("ctaButton")}
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Lightbox */}
            {selectedImage !== null && images.length > 0 && (
                <div
                    className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 w-12 h-12 border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <img
                        src={images[selectedImage]?.imageLink}
                        alt={title}
                        className="max-w-full max-h-[85vh] object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />

                    {images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImage((prev) => prev !== null ? (prev - 1 + images.length) % images.length : 0);
                                }}
                                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 border border-border flex items-center justify-center hover:bg-muted transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImage((prev) => prev !== null ? (prev + 1) % images.length : 0);
                                }}
                                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 border border-border flex items-center justify-center hover:bg-muted transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </>
                    )}

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
                        {selectedImage + 1} / {images.length}
                    </div>
                </div>
            )}
        </div>
    )
}
