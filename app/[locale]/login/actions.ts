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

    // Use userStore to verify credentials
    // We need to import userStore dynamically or ensure it's available on server
    // Since this is a server action, it runs on server.
    // However, importing from a file that has global state might be tricky in Next.js server actions due to isolation.
    // But for a simple demo with "use server", module level variables might persist or might not depending on deployment.
    // For local dev, it usually works but might reset on recompile.

    // We'll import it at the top level, but for now let's assume standard import works.
    const { userStore } = await import("@/lib/user-store")

    const user = userStore.verifyCredentials(email, password)

    if (user) {
        // Set cookie with user email/id to identify them
        // In a real app, use a signed JWT or session ID
        const cookieValue = JSON.stringify({ id: user.id, email: user.email, role: user.role })

            ; (await cookies()).set(AUTH_COOKIE_NAME, cookieValue, {
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
