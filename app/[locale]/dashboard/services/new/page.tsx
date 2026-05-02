"use client"

import { ServiceForm } from "@/components/dashboard/service-form"

export default function NewServicePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-heading tracking-tight">Add New Service</h1>
                <p className="text-muted-foreground">Create a new service offering.</p>
            </div>
            <ServiceForm />
        </div>
    )
}
