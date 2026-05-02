"use client"

import { InsightForm } from "@/components/dashboard/insight-form"
import { useData } from "@/lib/data-context"
import { useParams } from "next/navigation"

export default function EditInsightPage() {
    const params = useParams()
    const { insights } = useData()
    const insight = insights.find((i) => i._id === params.id)

    if (!insight) {
        return <div>Insight not found</div>
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-heading tracking-tight">Edit Insight</h1>
                <p className="text-muted-foreground">Update insight details.</p>
            </div>
            <InsightForm initialData={insight} isEditing />
        </div>
    )
}
