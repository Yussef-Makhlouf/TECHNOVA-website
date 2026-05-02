"use client"

import { JobForm } from "@/components/dashboard/job-form"
import { useData } from "@/lib/data-context"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function EditJobPage() {
    const params = useParams()
    const { jobs } = useData()
    const job = jobs.find((j) => j.id === params.id)

    if (!job) {
        return <div>Job not found</div>
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-heading tracking-tight">Edit Job Opening</h1>
                <p className="text-muted-foreground">Update job details.</p>
            </div>
            <div className="flex justify-end">
                <Button asChild variant="outline">
                    <a href={`/dashboard/careers/${params.id}/applications`}>
                        View Applications
                    </a>
                </Button>
            </div>
            <JobForm initialData={job} isEditing />
        </div>
    )
}
