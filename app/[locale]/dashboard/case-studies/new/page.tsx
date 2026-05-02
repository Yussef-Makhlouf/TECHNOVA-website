"use client"

import { CaseStudyForm } from "@/components/dashboard/case-study-form"

export default function NewCaseStudyPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-heading tracking-tight">Add Case Study</h1>
                <p className="text-muted-foreground">Showcase a new success story.</p>
            </div>
            <CaseStudyForm />
        </div>
    )
}
