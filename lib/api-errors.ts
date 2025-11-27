/**
 * Base API Error class
 */
export class APIError extends Error {
    statusCode: number
    isOperational: boolean

    constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
        super(message)
        this.statusCode = statusCode
        this.isOperational = isOperational
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}

/**
 * 400 Bad Request - Validation errors
 */
export class ValidationError extends APIError {
    constructor(message: string = "Invalid request data") {
        super(message, 400)
    }
}

/**
 * 401 Unauthorized - Authentication required
 */
export class AuthenticationError extends APIError {
    constructor(message: string = "Authentication required. Please log in.") {
        super(message, 401)
    }
}

/**
 * 403 Forbidden - Insufficient permissions
 */
export class ForbiddenError extends APIError {
    constructor(message: string = "You don't have permission to perform this action") {
        super(message, 403)
    }
}

/**
 * 404 Not Found - Resource not found
 */
export class NotFoundError extends APIError {
    constructor(message: string = "The requested resource was not found") {
        super(message, 404)
    }
}

/**
 * 409 Conflict - Resource conflict
 */
export class ConflictError extends APIError {
    constructor(message: string = "Resource conflict occurred") {
        super(message, 409)
    }
}

/**
 * 500 Internal Server Error
 */
export class ServerError extends APIError {
    constructor(message: string = "An unexpected error occurred. Please try again later.") {
        super(message, 500)
    }
}

/**
 * Network Error - No internet connection
 */
export class NetworkError extends APIError {
    constructor(message: string = "Network error. Please check your internet connection.") {
        super(message, 0, false)
    }
}

/**
 * Helper function to create appropriate error from HTTP response
 */
export function createErrorFromResponse(status: number, message?: string): APIError {
    const errorMessage = message || "An error occurred"

    switch (status) {
        case 400:
            return new ValidationError(errorMessage)
        case 401:
            return new AuthenticationError(errorMessage)
        case 403:
            return new ForbiddenError(errorMessage)
        case 404:
            return new NotFoundError(errorMessage)
        case 409:
            return new ConflictError(errorMessage)
        case 500:
        case 502:
        case 503:
        case 504:
            return new ServerError(errorMessage)
        default:
            return new APIError(errorMessage, status)
    }
}

/**
 * Helper to get user-friendly error message
 */
export function getUserFriendlyErrorMessage(error: unknown): string {
    if (error instanceof APIError) {
        return error.message
    }

    if (error instanceof Error) {
        return error.message
    }

    return "An unexpected error occurred. Please try again."
}
