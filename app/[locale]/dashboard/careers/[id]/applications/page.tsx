"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { careersAPI } from "@/lib/api-service"
import { CareerApplication } from "@/lib/api-types"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Mail, Phone, Calendar, Download } from "lucide-react"
import { format } from "date-fns"
import { useTranslations } from "next-intl"

export default function CareerApplicationsPage() {
    const params = useParams()
    const router = useRouter()
    const t = useTranslations("dashboard") // Assuming general dashboard translations
    const [applications, setApplications] = useState<CareerApplication[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await careersAPI.getApplications(params.id as string)
                if (response.success) {
                    setApplications(response.applications)
                } else {
                    setError("Failed to load applications")
                }
            } catch (err) {
                setError("An error occurred while fetching applications")
            } finally {
                setIsLoading(false)
            }
        }

        if (params.id) {
            fetchApplications()
        }
    }, [params.id])

    if (isLoading) {
        return <div className="p-8 text-center">Loading applications...</div>
    }

    if (error) {
        return (
            <div className="p-8 text-center text-destructive">
                <p>{error}</p>
                <Button variant="outline" onClick={() => router.back()} className="mt-4">
                    Go Back
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold font-heading tracking-tight">Job Applications</h1>
                    <p className="text-muted-foreground">
                        Viewing {applications.length} application{applications.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>

            {applications.length === 0 ? (
                <div className="text-center py-12 border rounded-lg bg-card/50">
                    <p className="text-muted-foreground">No applications received yet.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {applications.map((app) => (
                        <div
                            key={app._id}
                            className="bg-card border border-border rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:shadow-md"
                        >
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-lg">{app.name}</h3>
                                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                                        {format(new Date(app.createdAt), "PPP")}
                                    </span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Mail className="h-4 w-4" />
                                        <a href={`mailto:${app.email}`} className="hover:text-primary transition-colors">
                                            {app.email}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Phone className="h-4 w-4" />
                                        <a href={`tel:${app.phone}`} className="hover:text-primary transition-colors">
                                            {app.phone}
                                        </a>
                                    </div>
                                </div>
                                {app.coverLetter && (
                                    <div className="mt-2 text-sm bg-secondary/30 p-3 rounded-md max-w-2xl">
                                        <p className="font-medium text-xs mb-1 text-muted-foreground">Cover Letter:</p>
                                        <p className="whitespace-pre-wrap line-clamp-3 hover:line-clamp-none transition-all">
                                            {app.coverLetter}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <Button asChild variant="outline" size="sm">
                                    <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer">
                                        <FileText className="mr-2 h-4 w-4" />
                                        View Resume
                                    </a>
                                </Button>
                                <Button asChild size="sm">
                                    <a href={app.resumeUrl} download>
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
                                    </a>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
