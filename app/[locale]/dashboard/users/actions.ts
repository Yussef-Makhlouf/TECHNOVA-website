"use server"

import { z } from "zod"
import { userStore } from "@/lib/user-store"
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
        // In a real app, verify against DB again
        const currentUser = userStore.getById(userSession.id)

        if (!currentUser || currentUser.role !== "admin") {
            return { success: false, error: "Unauthorized: Admin access required" }
        }
    } catch (e) {
        return { success: false, error: "Invalid session" }
    }

    // Check if email exists
    if (userStore.getByEmail(data.email)) {
        return { success: false, error: "Email already exists" }
    }

    userStore.add({
        ...data,
        role: "user", // Default role
    })

    return { success: true }
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
