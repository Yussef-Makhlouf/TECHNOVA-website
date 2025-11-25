"use client"

import { PasswordForm } from "@/components/dashboard/password-form"

export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-heading tracking-tight">Profile Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and password.</p>
            </div>
            <div className="max-w-2xl">
                <PasswordForm />
            </div>
        </div>
    )
}
