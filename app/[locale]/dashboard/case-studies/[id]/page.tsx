"use client"

import { CaseStudyForm } from "@/components/dashboard/case-study-form"
import { useData } from "@/lib/data-context"
import { useParams } from "next/navigation"

export default function EditCaseStudyPage() {
    const params = useParams()
    const { caseStudies } = useData()
    const study = caseStudies.find((s) => s.id === params.id)

    if (!study) {
        return <div>Case Study not found</div>
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-heading tracking-tight">Edit Case Study</h1>
                <p className="text-muted-foreground">Update case study details.</p>
            </div>
            <CaseStudyForm initialData={study} isEditing />
        </div>
    )
}
