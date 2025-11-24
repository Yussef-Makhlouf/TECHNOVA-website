"use client"

import { ServiceForm } from "@/components/dashboard/service-form"
import { useData } from "@/lib/data-context"
import { useParams } from "next/navigation"

export default function EditServicePage() {
    const params = useParams()
    const { services } = useData()
    const service = services.find((s) => s.id === params.id)

    if (!service) {
        return <div>Service not found</div>
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-heading tracking-tight">Edit Service</h1>
                <p className="text-muted-foreground">Update service details.</p>
            </div>
            <ServiceForm initialData={service} isEditing />
        </div>
    )
}
