"use server"

import { z } from "zod"
import { cookies } from "next/headers"
import { AUTH_COOKIE_NAME } from "@/lib/auth"

const createUserSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    image: z.string().optional(),
    password: z.string().min(6),
})

export async function createUser(data: z.infer<typeof createUserSchema>) {
    // Verify admin
    const cookieStore = await cookies()
    const authCookie = cookieStore.get(AUTH_COOKIE_NAME)

    if (!authCookie) {
        return { success: false, error: "Unauthorized" }
    }

    try {
        const userSession = JSON.parse(authCookie.value)

        // Verify admin role from session
        if (!userSession || userSession.role !== "admin") {
            return { success: false, error: "Unauthorized: Admin access required" }
        }
    } catch (e) {
        return { success: false, error: "Invalid session" }
    }

    // Create user via API
    try {
        const userSession = JSON.parse(authCookie.value)
        const { token } = userSession

        const response = await fetch("http://localhost:8080/api/v1/users/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                userName: data.name,
                email: data.email,
                password: data.password,
                role: "user" // Default role
            })
        })

        const resData = await response.json()

        if (!response.ok) {
            return { success: false, error: resData.message || "Failed to create user" }
        }

        return { success: true }
    } catch (error) {
        console.error("User creation error:", error)
        return { success: false, error: "Something went wrong" }
    }
}

const updatePasswordSchema = z.object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(6),
})

export async function updatePassword(data: z.infer<typeof updatePasswordSchema>) {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get(AUTH_COOKIE_NAME)

    if (!authCookie) {
        return { success: false, error: "Unauthorized" }
    }

    try {
        const userSession = JSON.parse(authCookie.value)
        const { email, token } = userSession

        if (!email || !token) {
            return { success: false, error: "Invalid session data" }
        }

        const response = await fetch("http://localhost:8080/api/v1/change_password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                email: email,
                newPassword: data.newPassword
            })
        })

        const resData = await response.json()

        if (!response.ok) {
            return { success: false, error: resData.message || "Failed to update password" }
        }

        return { success: true }

    } catch (e) {
        console.error("Password update error:", e)
        return { success: false, error: "Something went wrong" }
    }
}
