"use server"

import { cookies } from "next/headers"
import { AUTH_COOKIE_NAME } from "@/lib/auth"
import { z } from "zod"

const changePasswordSchema = z.object({
    newPassword: z.string().min(6),
})

export async function changePassword(newPassword: string) {
    const result = changePasswordSchema.safeParse({ newPassword })

    if (!result.success) {
        return { success: false, message: "Invalid password format" }
    }

    try {
        const cookieStore = await cookies()
        const authCookie = cookieStore.get(AUTH_COOKIE_NAME)

        if (!authCookie) {
            return { success: false, message: "Not authenticated" }
        }

        let token = authCookie.value
        try {
            // Try to parse if it's a JSON object
            if (token.startsWith('{')) {
                const parsed = JSON.parse(token)
                token = parsed.token
            }
        } catch (e) {
            // Use raw value if parsing fails
        }

        const response = await fetch("http://localhost:8080/api/v1/users/change_password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ newPassword }),
        })

        const data = await response.json()

        if (!response.ok) {
            return { success: false, message: data.message || "Failed to change password" }
        }

        return { success: true, message: "Password changed successfully" }

    } catch (error) {
        console.error("Change password error:", error)
        return { success: false, message: "Something went wrong" }
    }
}
