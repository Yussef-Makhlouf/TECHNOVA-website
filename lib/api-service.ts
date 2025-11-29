/**
 * API Service Layer - Organized API endpoints for all resources
 * 
 * This file provides a clean interface for all API operations.
 * Separated into logical sections for better organization.
 */

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
import { apiClient } from "./api-client"

const TOKEN_KEY = "technova_auth_token"

/**
 * ============================================================================
 * AUTHENTICATION API
 * ============================================================================
 */
export const authAPI = {
    /**
     * Login user
     */
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>("/auth/login", credentials)

        // Store token if login successful
        if (response.success && response.token) {
            apiClient.setToken(response.token)
        }

        return response
    },

    /**
     * Logout user
     */
    logout: (): void => {
        apiClient.removeToken()
        apiClient.clearCache() // Clear all cached data on logout
    },

    /**
     * Get current token
     */
    getToken: (): string | null => {
        return apiClient['getToken']()
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated: (): boolean => {
        return !!apiClient['getToken']()
    }
}

/**
 * ============================================================================
 * SERVICES API
 * ============================================================================
 */
export const servicesAPI = {
    /**
     * Get all services
     * @param skipCache - Skip cache and fetch fresh data
     */
    getAll: async (skipCache: boolean = false): Promise<{ success: boolean; services: ServiceAPI[] }> => {
        return apiClient.get("/services", undefined, { skipCache })
    },

    /**
     * Get service by ID
     */
    getById: async (id: string, skipCache: boolean = false): Promise<{ success: boolean; service: ServiceAPI }> => {
        return apiClient.get(`/services/${id}`, undefined, { skipCache })
    },

    /**
     * Get service by slug
     */
    getBySlug: async (slug: string, skipCache: boolean = false): Promise<{ success: boolean; service: ServiceAPI }> => {
        return apiClient.get(`/services/slug/${slug}`, undefined, { skipCache })
    },

    /**
     * Create new service
     */
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

    /**
     * Update service
     */
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

            // Use custom fetch for PUT with FormData
            const token = apiClient['getToken']()
            const headers: Record<string, string> = {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }

            if (token) {
                headers["Authorization"] = `Bearer ${token}`
            }

            const response = await fetch(`https://technoba.vercel.app/api/v1/services/${id}`, {
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
                throw new Error(errorMessage)
            }

            const result = await response.json()

            // Clear cache after update
            apiClient.clearCache()

            return result
        }

        // Fallback to JSON if no image
        return apiClient.put(`/services/${id}`, data)
    },

    /**
     * Delete service
     */
    delete: async (id: string): Promise<{ success: boolean; message: string }> => {
        return apiClient.delete(`/services/${id}`)
    },

    /**
     * Delete multiple services
     */
    deleteMultiple: async (ids: string[]): Promise<{ success: boolean; message: string }> => {
        return apiClient.post("/services/multi", { ids })
    },

    /**
     * Prefetch services (load in background)
     */
    prefetch: async (): Promise<void> => {
        await apiClient.prefetch("/services")
    }
}

/**
 * ============================================================================
 * BLOGS/INSIGHTS API
 * ============================================================================
 */
export const blogsAPI = {
    /**
     * Get all blogs
     */
    getAll: async (skipCache: boolean = false): Promise<{ success: boolean; blogs: BlogAPI[] }> => {
        return apiClient.get("/blogs", undefined, { skipCache })
    },

    /**
     * Get blog by ID
     */
    getById: async (id: string, skipCache: boolean = false): Promise<{ success: boolean; blog: BlogAPI }> => {
        return apiClient.get(`/blogs/${id}`, undefined, { skipCache })
    },

    /**
     * Get blog by slug
     */
    getBySlug: async (slug: string, skipCache: boolean = false): Promise<{ success: boolean; blog: BlogAPI }> => {
        return apiClient.get(`/blogs/slug/${slug}`, undefined, { skipCache })
    },

    /**
     * Create new blog
     */
    create: async (data: CreateBlogRequest): Promise<{ success: boolean; blog: BlogAPI }> => {
        return apiClient.post("/blogs/add", data)
    },

    /**
     * Update blog
     */
    update: async (id: string, data: UpdateBlogRequest): Promise<{ success: boolean; blog: BlogAPI }> => {
        return apiClient.put(`/blogs/${id}`, data)
    },

    /**
     * Delete blog
     */
    delete: async (id: string): Promise<{ success: boolean; message: string }> => {
        return apiClient.delete(`/blogs/${id}`)
    },

    /**
     * Prefetch blogs
     */
    prefetch: async (): Promise<void> => {
        await apiClient.prefetch("/blogs")
    }
}

/**
 * ============================================================================
 * CASE STUDIES API
 * ============================================================================
 */
export const caseStudiesAPI = {
    /**
     * Get all case studies
     */
    getAll: async (skipCache: boolean = false): Promise<{ success: boolean; caseStudies: CaseStudyAPI[] }> => {
        return apiClient.get("/case_study", undefined, { skipCache })
    },

    /**
     * Get case study by ID
     */
    getById: async (id: string, skipCache: boolean = false): Promise<{ success: boolean; caseStudy: CaseStudyAPI }> => {
        return apiClient.get(`/case_study/${id}`, undefined, { skipCache })
    },

    /**
     * Create new case study
     */
    create: async (data: CreateCaseStudyRequest): Promise<{ success: boolean; caseStudy: CaseStudyAPI }> => {
        return apiClient.post("/case_study/add", data)
    },

    /**
     * Update case study
     */
    update: async (id: string, data: UpdateCaseStudyRequest): Promise<{ success: boolean; caseStudy: CaseStudyAPI }> => {
        return apiClient.put(`/case_study/${id}`, data)
    },

    /**
     * Delete case study
     */
    delete: async (id: string): Promise<{ success: boolean; message: string }> => {
        return apiClient.delete(`/case_study/${id}`)
    },

    /**
     * Prefetch case studies
     */
    prefetch: async (): Promise<void> => {
        await apiClient.prefetch("/case_study")
    }
}

/**
 * ============================================================================
 * JOBS API
 * ============================================================================
 */
export const jobsAPI = {
    /**
     * Get all jobs
     */
    getAll: async (skipCache: boolean = false): Promise<{ success: boolean; jobs: JobAPI[] }> => {
        return apiClient.get("/jobs", undefined, { skipCache })
    },

    /**
     * Get job by ID
     */
    getById: async (id: string, skipCache: boolean = false): Promise<{ success: boolean; job: JobAPI }> => {
        return apiClient.get(`/jobs/${id}`, undefined, { skipCache })
    },

    /**
     * Create new job
     */
    create: async (data: CreateJobRequest): Promise<{ success: boolean; job: JobAPI }> => {
        return apiClient.post("/jobs", data)
    },

    /**
     * Update job
     */
    update: async (id: string, data: UpdateJobRequest): Promise<{ success: boolean; job: JobAPI }> => {
        return apiClient.put(`/jobs/${id}`, data)
    },

    /**
     * Delete job
     */
    delete: async (id: string): Promise<{ success: boolean; message: string }> => {
        return apiClient.delete(`/jobs/${id}`)
    },

    /**
     * Prefetch jobs
     */
    prefetch: async (): Promise<void> => {
        await apiClient.prefetch("/jobs")
    }
}

/**
 * ============================================================================
 * IMAGE UPLOAD API
 * ============================================================================
 */
export const uploadAPI = {
    /**
     * Upload single image
     */
    uploadImage: async (file: File): Promise<{ success: boolean; imageUrl: string }> => {
        const formData = new FormData()
        formData.append("image", file)

        return apiClient.upload("/upload/image", formData)
    },

    /**
     * Upload multiple images
     */
    uploadImages: async (files: File[]): Promise<{ success: boolean; imageUrls: string[] }> => {
        const formData = new FormData()
        files.forEach((file) => {
            formData.append("images", file)
        })

        return apiClient.upload("/upload/images", formData)
    },
}

/**
 * ============================================================================
 * UTILITY FUNCTIONS
 * ============================================================================
 */

/**
 * Prefetch all common data (useful for initial page load)
 */
export const prefetchAllData = async (): Promise<void> => {
    await Promise.all([
        servicesAPI.prefetch(),
        blogsAPI.prefetch(),
        caseStudiesAPI.prefetch(),
        jobsAPI.prefetch()
    ])
}

/**
 * Clear all API cache
 */
export const clearAllCache = (): void => {
    apiClient.clearCache()
}

/**
 * Get cache statistics
 */
export const getCacheStats = () => {
    return apiClient.getCacheStats()
}

// Export the client for advanced usage
export { apiClient }
export default apiClient
