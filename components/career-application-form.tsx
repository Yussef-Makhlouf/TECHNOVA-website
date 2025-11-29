"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Upload, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { careersAPI } from "@/lib/api-service"
import { useLocale, useTranslations } from "next-intl"

interface CareerApplicationFormProps {
    careerId: string
    careerTitle: string
    onClose: () => void
}

export function CareerApplicationForm({ careerId, careerTitle, onClose }: CareerApplicationFormProps) {
    const locale = useLocale()
    const t = useTranslations("careersPage.applicationForm")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [resumeFile, setResumeFile] = useState<File | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        const formData = new FormData(e.currentTarget)

        // Add the resume file if selected
        if (resumeFile) {
            formData.append("resume", resumeFile)
        }

        try {
            const response = await careersAPI.apply(careerId, formData)
            if (response.success) {
                setIsSuccess(true)
                setTimeout(() => {
                    onClose()
                }, 2000)
            } else {
                setError(response.message || t("error"))
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : t("error"))
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // Validate file type
            const allowedTypes = [".pdf", ".doc", ".docx"]
            const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()

            if (!allowedTypes.includes(fileExtension)) {
                setError(t("invalidFileType"))
                return
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError(t("fileTooLarge"))
                return
            }

            setResumeFile(file)
            setError(null)
        }
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-card border border-border rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
                        <div>
                            <h2 className="font-heading text-2xl font-bold text-foreground">
                                {t("title")}
                            </h2>
                            <p className="text-muted-foreground mt-1">{careerTitle}</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="rounded-full"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Success State */}
                    {isSuccess && (
                        <div className="p-12 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", duration: 0.5 }}
                                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6"
                            >
                                <CheckCircle2 className="h-10 w-10 text-green-500" />
                            </motion.div>
                            <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                                {t("successTitle")}
                            </h3>
                            <p className="text-muted-foreground">
                                {t("successMessage")}
                            </p>
                        </div>
                    )}

                    {/* Form */}
                    {!isSuccess && (
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Error Message */}
                            {error && (
                                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Name */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-foreground">
                                    {t("name")} <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                    placeholder={t("namePlaceholder")}
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-foreground">
                                    {t("email")} <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                    placeholder={t("emailPlaceholder")}
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-medium text-foreground">
                                    {t("phone")} <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    required
                                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                    placeholder={t("phonePlaceholder")}
                                />
                            </div>

                            {/* Resume Upload */}
                            <div className="space-y-2">
                                <label htmlFor="resume" className="text-sm font-medium text-foreground">
                                    {t("resume")} <span className="text-destructive">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        id="resume"
                                        name="resume"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                        required
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="resume"
                                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-background border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-all"
                                    >
                                        <Upload className="h-5 w-5 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">
                                            {resumeFile ? resumeFile.name : t("resumePlaceholder")}
                                        </span>
                                    </label>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {t("resumeHint")}
                                </p>
                            </div>

                            {/* Cover Letter */}
                            <div className="space-y-2">
                                <label htmlFor="coverLetter" className="text-sm font-medium text-foreground">
                                    {t("coverLetter")}
                                </label>
                                <textarea
                                    id="coverLetter"
                                    name="coverLetter"
                                    rows={6}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                                    placeholder={t("coverLetterPlaceholder")}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onClose}
                                    className="flex-1"
                                    disabled={isSubmitting}
                                >
                                    {t("cancel")}
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {t("submitting")}
                                        </>
                                    ) : (
                                        t("submit")
                                    )}
                                </Button>
                            </div>
                        </form>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
