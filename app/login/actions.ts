"use server"

import { cookies } from "next/headers"
import { AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE, FAKE_CREDENTIALS } from "@/lib/auth"
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

    if (email === FAKE_CREDENTIALS.email && password === FAKE_CREDENTIALS.password) {
        // Set cookie
        (await cookies()).set(AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 1 week
        })
        return { success: true }
    }

    return { success: false, error: "Invalid email or password" }
}

export async function logout() {
    (await cookies()).delete(AUTH_COOKIE_NAME)
    return { success: true }
}
