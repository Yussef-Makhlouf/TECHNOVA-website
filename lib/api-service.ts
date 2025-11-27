import {
    APIResponse,
    ServiceAPI,
    CreateServiceRequest,
    UpdateServiceRequest,
    BlogAPI,
    CreateBlogRequest,
    UpdateBlogRequest,
    CaseStudyAPI,
    CreateCaseStudyRequest,
    UpdateCaseStudyRequest,
    JobAPI,
    CreateJobRequest,
    UpdateJobRequest,
    LoginRequest,
    LoginResponse,
    PaginationParams
} from "./api-types"
import {
    createErrorFromResponse,
    NetworkError,
    APIError
} from "./api-errors"

const API_BASE_URL = "http://localhost:8080/api/v1"
// const API_BASE_URL = "https://technoba.vercel.app/api/v1"
const TOKEN_KEY = "technova_auth_token"

/**
 * API Client Configuration
 */
interface RequestConfig extends RequestInit {
    params?: Record<string, string | number | boolean>
}

/**
 * Centralized API Client
 */
class APIClient {
    private baseURL: string

    constructor(baseURL: string) {
        this.baseURL = baseURL
    }

    /**
     * Get authentication token from storage
     */
    private getToken(): string | null {
        if (typeof window === "undefined") return null
        return localStorage.getItem(TOKEN_KEY)
    }

    /**
     * Set authentication token
     */
    setToken(token: string): void {
        if (typeof window !== "undefined") {
            localStorage.setItem(TOKEN_KEY, token)
        }
    }

    /**
     * Remove authentication token
     */
    removeToken(): void {
        if (typeof window !== "undefined") {
            localStorage.removeItem(TOKEN_KEY)
        }
    }

    /**
     * Build headers with authentication
     */
    private buildHeaders(customHeaders?: HeadersInit): HeadersInit {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            ...(customHeaders as Record<string, string>),
        }

        const token = this.getToken()
        if (token) {
            headers["Authorization"] = `Bearer ${token}`
        }

        return headers
    }

    /**
     * Build URL with query parameters
     */
    private buildURL(endpoint: string, params?: Record<string, string | number | boolean>): string {
        const url = new URL(`${this.baseURL}${endpoint}`)

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, String(value))
            })
        }

        return url.toString()
    }

    /**
     * Handle API response
     */
    private async handleResponse<T>(response: Response): Promise<T> {
        // Handle network errors
        if (!response.ok) {
            let errorMessage = "An error occurred"

            try {
                const errorData = await response.json()
                errorMessage = errorData.message || errorData.error || errorMessage
            } catch {
                // If response is not JSON, use status text
                errorMessage = response.statusText || errorMessage
            }

            throw createErrorFromResponse(response.status, errorMessage)
        }

        // Parse successful response
        try {
            const data = await response.json()
            return data
        } catch (error) {
            throw new APIError("Failed to parse response")
        }
    }

    /**
     * Generic request method
     */
    private async request<T>(
        endpoint: string,
        config: RequestConfig = {}
    ): Promise<T> {
        const { params, headers, ...restConfig } = config

        try {
            const url = this.buildURL(endpoint, params)
            const response = await fetch(url, {
                ...restConfig,
                headers: this.buildHeaders(headers),
            })

            return await this.handleResponse<T>(response)
        } catch (error) {
            // Handle network errors
            if (error instanceof TypeError && error.message.includes("fetch")) {
                throw new NetworkError()
            }
            throw error
        }
    }

    /**
     * GET request
     */
    async get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T> {
        return this.request<T>(endpoint, { method: "GET", params })
    }

    /**
     * POST request
     */
    async post<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
        })
    }

    /**
     * PUT request
     */
    async put<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: "PUT",
            body: JSON.stringify(data),
        })
    }

    /**
     * DELETE request
     */
    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: "DELETE" })
    }

    /**
     * Upload file (multipart/form-data)
     */
    async upload<T>(endpoint: string, formData: FormData): Promise<T> {
        const token = this.getToken()
        const headers: Record<string, string> = {}

        if (token) {
            headers["Authorization"] = `Bearer ${token}`
        }

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: "POST",
                headers,
                body: formData,
            })

            return await this.handleResponse<T>(response)
        } catch (error) {
            if (error instanceof TypeError && error.message.includes("fetch")) {
                throw new NetworkError()
            }
            throw error
        }
    }
}

// Create singleton instance
const apiClient = new APIClient(API_BASE_URL)

/**
 * Authentication API
 */
export const authAPI = {
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>("/auth/login", credentials)

        // Store token if login successful
        if (response.success && response.token) {
            apiClient.setToken(response.token)
        }

        return response
    },

    logout: (): void => {
        apiClient.removeToken()
    },

    getToken: (): string | null => {
        return apiClient["getToken"]()
    },
}

/**
 * Services API
 */
export const servicesAPI = {
    getAll: async (): Promise<{ success: boolean; services: ServiceAPI[] }> => {
        return apiClient.get("/services")
    },

    getById: async (id: string): Promise<{ success: boolean; service: ServiceAPI }> => {
        return apiClient.get(`/services/${id}`)
    },

    create: async (data: any, imageFile?: File): Promise<{ success: boolean; service: ServiceAPI }> => {
        // If there's an image file, use FormData
        if (imageFile) {
            const formData = new FormData()

            // Append all text fields
            formData.append("name_en", data.name_en)
            formData.append("name_ar", data.name_ar)
            formData.append("description_en", data.description_en)
            formData.append("description_ar", data.description_ar)
            formData.append("shortDescription_en", data.shortDescription_en)
            formData.append("shortDescription_ar", data.shortDescription_ar)
            formData.append("icon", data.icon)
            formData.append("color", data.color)

            // Append features as JSON string
            if (data.features && data.features.length > 0) {
                data.features.forEach((feature: any, index: number) => {
                    formData.append(`feature_ar[${index}]`, feature.feature_ar)
                    formData.append(`feature_en[${index}]`, feature.feature_en)
                })
            }

            // Append the image file
            formData.append("images", imageFile)

            return apiClient.upload("/services/add", formData)
        }

        // Fallback to JSON if no image
        return apiClient.post("/services/add", data)
    },

    update: async (id: string, data: any, imageFile?: File): Promise<{ success: boolean; service: ServiceAPI }> => {
        // If there's an image file, use FormData
        if (imageFile) {
            const formData = new FormData()

            // Append all text fields
            if (data.name_en) formData.append("name_en", data.name_en)
            if (data.name_ar) formData.append("name_ar", data.name_ar)
            if (data.description_en) formData.append("description_en", data.description_en)
            if (data.description_ar) formData.append("description_ar", data.description_ar)
            if (data.shortDescription_en) formData.append("shortDescription_en", data.shortDescription_en)
            if (data.shortDescription_ar) formData.append("shortDescription_ar", data.shortDescription_ar)
            if (data.icon) formData.append("icon", data.icon)
            if (data.color) formData.append("color", data.color)

            // Append features
            if (data.features && data.features.length > 0) {
                data.features.forEach((feature: any, index: number) => {
                    formData.append(`feature_ar[${index}]`, feature.feature_ar)
                    formData.append(`feature_en[${index}]`, feature.feature_en)
                })
            }

            // Append the image file
            formData.append("images", imageFile)

            // Use upload method with PUT
            const token = apiClient["getToken"]()
            const headers: Record<string, string> = {}
            if (token) {
                headers["Authorization"] = `Bearer ${token}`
            }

            const response = await fetch(`${API_BASE_URL}/services/${id}`, {
                method: "PUT",
                headers,
                body: formData,
            })

            if (!response.ok) {
                let errorMessage = "An error occurred"
                try {
                    const errorData = await response.json()
                    errorMessage = errorData.message || errorData.error || errorMessage
                } catch {
                    errorMessage = response.statusText || errorMessage
                }
                throw createErrorFromResponse(response.status, errorMessage)
            }

            return await response.json()
        }

        // Fallback to JSON if no image
        return apiClient.put(`/services/${id}`, data)
    },

    delete: async (id: string): Promise<{ success: boolean; message: string }> => {
        return apiClient.delete(`/services/${id}`)
    },

    deleteMultiple: async (ids: string[]): Promise<{ success: boolean; message: string }> => {
        return apiClient.post("/services/multi", { ids })
    },
}

/**
 * Blogs/Insights API
 */
export const blogsAPI = {
    getAll: async (): Promise<{ success: boolean; blogs: BlogAPI[] }> => {
        return apiClient.get("/blogs")
    },

    getById: async (id: string): Promise<{ success: boolean; blog: BlogAPI }> => {
        return apiClient.get(`/blogs/${id}`)
    },

    create: async (data: CreateBlogRequest): Promise<{ success: boolean; blog: BlogAPI }> => {
        return apiClient.post("/blogs/add", data)
    },

    update: async (id: string, data: UpdateBlogRequest): Promise<{ success: boolean; blog: BlogAPI }> => {
        return apiClient.put(`/blogs/${id}`, data)
    },

    delete: async (id: string): Promise<{ success: boolean; message: string }> => {
        return apiClient.delete(`/blogs/${id}`)
    },
}

/**
 * Case Studies API
 */
export const caseStudiesAPI = {
    getAll: async (): Promise<{ success: boolean; caseStudies: CaseStudyAPI[] }> => {
        return apiClient.get("/case_study")
    },

    getById: async (id: string): Promise<{ success: boolean; caseStudy: CaseStudyAPI }> => {
        return apiClient.get(`/case_study/${id}`)
    },

    create: async (data: CreateCaseStudyRequest): Promise<{ success: boolean; caseStudy: CaseStudyAPI }> => {
        return apiClient.post("/case_study/add", data)
    },

    update: async (id: string, data: UpdateCaseStudyRequest): Promise<{ success: boolean; caseStudy: CaseStudyAPI }> => {
        return apiClient.put(`/case_study/${id}`, data)
    },

    delete: async (id: string): Promise<{ success: boolean; message: string }> => {
        return apiClient.delete(`/case_study/${id}`)
    },
}

/**
 * Jobs API
 */
export const jobsAPI = {
    getAll: async (): Promise<{ success: boolean; careers: JobAPI[] }> => {
        return apiClient.get("/career")
    },

    getById: async (id: string): Promise<{ success: boolean; careers: JobAPI }> => {
        return apiClient.get(`/career/${id}`)
    },

    create: async (data: CreateJobRequest): Promise<{ success: boolean; careers: JobAPI }> => {
        return apiClient.post("/career", data)
    },

    update: async (id: string, data: UpdateJobRequest): Promise<{ success: boolean; careers: JobAPI }> => {
        return apiClient.put(`/career/${id}`, data)
    },

    delete: async (id: string): Promise<{ success: boolean; message: string }> => {
        return apiClient.delete(`/career/${id}`)
    },
}

/**
 * Image Upload API
 */
export const uploadAPI = {
    uploadImage: async (file: File): Promise<{ success: boolean; imageUrl: string }> => {
        const formData = new FormData()
        formData.append("image", file)

        return apiClient.upload("/upload/image", formData)
    },

    uploadImages: async (files: File[]): Promise<{ success: boolean; imageUrls: string[] }> => {
        const formData = new FormData()
        files.forEach((file) => {
            formData.append("images", file)
        })

        return apiClient.upload("/upload/images", formData)
    },
}

// Export the client for advanced usage
export { apiClient }
export default apiClient
