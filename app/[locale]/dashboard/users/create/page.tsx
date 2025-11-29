"use client"

import { UserForm } from "@/components/dashboard/user-form"

export default function CreateUserPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-heading tracking-tight">Create New User</h1>
                <p className="text-muted-foreground">Add a new user to the system.</p>
            </div>
            <UserForm />
        </div>
    )
}
