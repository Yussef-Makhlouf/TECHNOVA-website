import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function ServicePreviewPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    return (
        <div className="min-h-screen bg-background">
            {/* Preview Header */}
            <div className="border-b bg-muted/30 sticky top-0 z-50 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/dashboard/services">
                        <Button variant="ghost" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Preview Mode</span>
                    </div>
                </div>
            </div>

            {/* Preview Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold font-heading mb-4">Service Preview</h1>
                    <p className="text-muted-foreground">
                        Service ID: {id}
                    </p>

                    <div className="mt-8 p-8 border rounded-lg bg-card">
                        <p className="text-center text-muted-foreground">
                            Preview content will be displayed here
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
