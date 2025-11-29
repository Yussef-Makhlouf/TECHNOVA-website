"use client"

import { InsightForm } from "@/components/dashboard/insight-form"

export default function NewInsightPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-heading tracking-tight">Publish Insight</h1>
                <p className="text-muted-foreground">Share new industry insights.</p>
            </div>
            <InsightForm />
        </div>
    )
}
