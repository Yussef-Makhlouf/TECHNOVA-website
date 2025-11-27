import { authAPI } from "./api-service"

export const AUTH_COOKIE_NAME = "technova_auth_token"

/**
 * Default credentials for development/testing
 * @deprecated Use real authentication via login() function
 */
export const FAKE_CREDENTIALS = {
    email: "admin@technova.com",
    password: "password123",
}

/**
 * Login with credentials
 */
export async function login(email: string, password: string) {
    try {
        const response = await authAPI.login({ email, password })
        return response
    } catch (error) {
        throw error
    }
}

/**
 * Logout user
 */
export function logout() {
    authAPI.logout()
    // Clear cookie if using cookies
    if (typeof document !== "undefined") {
        document.cookie = `${AUTH_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
    }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
    const token = authAPI.getToken()
    return !!token
}

/**
 * Get current auth token
 */
export function getAuthToken(): string | null {
    return authAPI.getToken()
}
