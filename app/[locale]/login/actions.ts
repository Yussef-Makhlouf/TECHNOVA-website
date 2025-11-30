"use server"

import { cookies } from "next/headers"
import { AUTH_COOKIE_NAME } from "@/lib/auth"
import { z } from "zod"

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
})

export async function login(data: z.infer<typeof loginSchema>) {
    const result = loginSchema.safeParse(data)

    if (!result.success) {
        return { success: false, error: "Invalid input" }
    }

    const { email, password } = result.data

    try {
        const response = await fetch("https://technoba.vercel.app/api/v1/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })

        const responseData = await response.json()

        if (!response.ok || !responseData.userUpdated) {
            return { success: false, error: responseData.message || "Invalid credentials" }
        }

        const user = responseData.userUpdated
        const token = user.token

        // Store token and user info in cookie
        const cookieValue = JSON.stringify({
            id: user._id,
            email: user.email,
            role: user.role,
            token: token
        })

            ; (await cookies()).set(AUTH_COOKIE_NAME, cookieValue, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 7, // 1 week
            })

        return { success: true }

    } catch (error) {
        console.error("Login error:", error)
        return { success: false, error: "Something went wrong" }
    }
}

export async function logout() {
    (await cookies()).delete(AUTH_COOKIE_NAME)
    return { success: true }
}
