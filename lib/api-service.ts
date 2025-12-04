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
    UserAPI,
    CreateUserRequest,
    UpdateUserRequest,
    LoginRequest,
    LoginResponse,
    PaginationParams,
    ContactFormRequest,
    ContactFormResponse,
    CareerApplication
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
        const response = await apiClient.post<any>("/users/login", credentials)

        // Store token if login successful - token is in userUpdated.token
        if (response.userUpdated && response.userUpdated.token) {
            apiClient.setToken(response.userUpdated.token)
        }

        return {
            success: true,
            message: response.message,
            token: response.userUpdated?.token,
            user: response.userUpdated
        }
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
    },

    /**
     * Forgot password
     */
    forgotPassword: async (email: string): Promise<{ success: boolean; message: string }> => {
        return apiClient.post("/users/forget", { email })
    },

    /**
     * Reset password
     */
    resetPassword: async (token: string, password: string): Promise<{ success: boolean; message: string }> => {
        return apiClient.post(`/users/reset/${token}`, { password })
    },

    /**
     * Get current user from token
     */
    getCurrentUser: (): any | null => {
        const token = authAPI.getToken()
        if (!token) return null

        try {
            const base64Url = token.split('.')[1]
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            }).join(''))

            return JSON.parse(jsonPayload)
        } catch (error) {
            console.error("Error decoding token:", error)
            return null
        }

    },

    /**
     * Change password
     */
    changePassword: async (newPassword: string): Promise<{ success: boolean; message: string }> => {
        return apiClient.post("/users/change_password", { newPassword })
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

            const response = await fetch(`https://technova-main.vercel.app/api/v1/services/${id}`, {
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
    create: async (data: any, imageFile?: File): Promise<{ success: boolean; blog: BlogAPI }> => {
        // If there's an image file, use FormData
        if (imageFile) {
            const formData = new FormData()

            // Append all text fields
            if (data.title?.en) formData.append("title_en", data.title.en)
            if (data.title?.ar) formData.append("title_ar", data.title.ar)
            if (data.content?.en) formData.append("content_en", data.content.en)
            if (data.content?.ar) formData.append("content_ar", data.content.ar)
            if (data.author?.en) formData.append("author_en", data.author.en)
            if (data.author?.ar) formData.append("author_ar", data.author.ar)
            if (data.category?.en) formData.append("category_en", data.category.en)
            if (data.category?.ar) formData.append("category_ar", data.category.ar)
            if (data.readTime) formData.append("readTime", String(data.readTime))

            // Append the image file
            formData.append("images", imageFile)

            return apiClient.upload("/blogs/add", formData)
        }

        // Fallback to JSON if no image
        return apiClient.post("/blogs/add", data)
    },

    /**
     * Update blog
     */
    update: async (id: string, data: any, imageFile?: File): Promise<{ success: boolean; blog: BlogAPI }> => {
        // If there's an image file, use FormData
        if (imageFile) {
            const formData = new FormData()

            // Append all text fields
            if (data.title?.en) formData.append("title_en", data.title.en)
            if (data.title?.ar) formData.append("title_ar", data.title.ar)
            if (data.content?.en) formData.append("content_en", data.content.en)
            if (data.content?.ar) formData.append("content_ar", data.content.ar)
            if (data.author?.en) formData.append("author_en", data.author.en)
            if (data.author?.ar) formData.append("author_ar", data.author.ar)
            if (data.category?.en) formData.append("category_en", data.category.en)
            if (data.category?.ar) formData.append("category_ar", data.category.ar)
            if (data.readTime) formData.append("readTime", String(data.readTime))

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

            const response = await fetch(`https://technova-main.vercel.app/api/v1/blogs/${id}`, {
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
    create: async (data: any, imageFile?: File): Promise<{ success: boolean; caseStudy: CaseStudyAPI }> => {
        // If there's an image file, use FormData
        if (imageFile) {
            const formData = new FormData()

            // Append all text fields
            if (data.title_en) formData.append("title_en", data.title_en)
            if (data.title_ar) formData.append("title_ar", data.title_ar)
            if (data.institute_en) formData.append("institute_en", data.institute_en)
            if (data.institute_ar) formData.append("institute_ar", data.institute_ar)
            if (data.category_en) formData.append("category_en", data.category_en)
            if (data.category_ar) formData.append("category_ar", data.category_ar)
            if (data.description_en) formData.append("description_en", data.description_en)
            if (data.description_ar) formData.append("description_ar", data.description_ar)
            if (data.color) formData.append("color", data.color)

            // Append status array
            if (data.status && data.status.length > 0) {
                data.status.forEach((stat: any, index: number) => {
                    formData.append(`status[${index}][value]`, stat.value)
                    formData.append(`status[${index}][label_en]`, stat.label_en)
                    if (stat.label_ar) formData.append(`status[${index}][label_ar]`, stat.label_ar)
                })
            }

            // Append the image file
            formData.append("images", imageFile)

            return apiClient.upload("/case_study/add", formData)
        }

        // Fallback to JSON if no image
        return apiClient.post("/case_study/add", data)
    },

    /**
     * Update case study
     */
    update: async (id: string, data: any, imageFile?: File): Promise<{ success: boolean; caseStudy: CaseStudyAPI }> => {
        // If there's an image file, use FormData
        if (imageFile) {
            const formData = new FormData()

            // Append all text fields
            if (data.title_en) formData.append("title_en", data.title_en)
            if (data.title_ar) formData.append("title_ar", data.title_ar)
            if (data.institute_en) formData.append("institute_en", data.institute_en)
            if (data.institute_ar) formData.append("institute_ar", data.institute_ar)
            if (data.category_en) formData.append("category_en", data.category_en)
            if (data.category_ar) formData.append("category_ar", data.category_ar)
            if (data.description_en) formData.append("description_en", data.description_en)
            if (data.description_ar) formData.append("description_ar", data.description_ar)
            if (data.color) formData.append("color", data.color)

            // Append status array
            if (data.status && data.status.length > 0) {
                data.status.forEach((stat: any, index: number) => {
                    formData.append(`status[${index}][value]`, stat.value)
                    formData.append(`status[${index}][label_en]`, stat.label_en)
                    if (stat.label_ar) formData.append(`status[${index}][label_ar]`, stat.label_ar)
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

            const response = await fetch(`https://technova-main.vercel.app/api/v1/case_study/${id}`, {
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
 * CAREERS API
 * ============================================================================
 */
export const careersAPI = {
    /**
     * Get all careers
     */
    getAll: async (skipCache: boolean = false): Promise<{ success: boolean; careers: JobAPI[] }> => {
        return apiClient.get("/career", undefined, { skipCache })
    },

    /**
     * Get career by ID
     */
    getById: async (id: string, skipCache: boolean = false): Promise<{ success: boolean; career: JobAPI }> => {
        return apiClient.get(`/career/${id}`, undefined, { skipCache })
    },

    /**
     * Create new career
     */
    create: async (data: CreateJobRequest): Promise<{ success: boolean; career: JobAPI }> => {
        return apiClient.post("/career", data)
    },

    /**
     * Update career
     */
    update: async (id: string, data: UpdateJobRequest): Promise<{ success: boolean; career: JobAPI }> => {
        return apiClient.put(`/career/${id}`, data)
    },

    /**
     * Delete career
     */
    delete: async (id: string): Promise<{ success: boolean; message: string }> => {
        return apiClient.delete(`/career/${id}`)
    },

    /**
     * Apply for a career position
     */
    apply: async (careerId: string, applicationData: FormData): Promise<{ success: boolean; message: string }> => {
        return apiClient.upload(`/career/${careerId}/apply`, applicationData)
    },

    /**
     * Get applications for a career
     */
    getApplications: async (careerId: string): Promise<{ success: boolean; applications: CareerApplication[] }> => {
        return apiClient.get(`/career/${careerId}/applications`)
    },

    /**
     * Prefetch careers
     */
    prefetch: async (): Promise<void> => {
        await apiClient.prefetch("/career")
    }
}

// Keep jobsAPI as alias for backward compatibility
export const jobsAPI = careersAPI

/**
 * ============================================================================
 * USERS API
 * ============================================================================
 */
export const usersAPI = {
    /**
     * Get all users
     */
    getAll: async (skipCache: boolean = false): Promise<{ success: boolean; users: UserAPI[] }> => {
        return apiClient.get("/users", undefined, { skipCache })
    },

    /**
     * Get user by ID
     */
    getById: async (id: string, skipCache: boolean = false): Promise<{ success: boolean; user: UserAPI }> => {
        return apiClient.get(`/users/${id}`, undefined, { skipCache })
    },

    /**
     * Create new user
     */
    create: async (data: CreateUserRequest): Promise<{ success: boolean; user: UserAPI }> => {
        return apiClient.post("/users/add", data)
    },

    /**
     * Update user
     */
    update: async (id: string, data: UpdateUserRequest): Promise<{ success: boolean; user: UserAPI }> => {
        return apiClient.put(`/users/${id}`, data)
    },

    /**
     * Delete user
     */
    delete: async (id: string): Promise<{ success: boolean; message: string }> => {
        return apiClient.delete(`/users/${id}`)
    },

    /**
     * Prefetch users
     */
    prefetch: async (): Promise<void> => {
        await apiClient.prefetch("/users")
    }
}

/**
 * ============================================================================
 * CONTACT API
 * ============================================================================
 */
export const contactAPI = {
    /**
     * Send contact form message
     */
    send: async (data: ContactFormRequest): Promise<ContactFormResponse> => {
        return apiClient.post("/contact/send", data)
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
 * NFC SCANS API
 * ============================================================================
 */

export interface NfcScan {
    _id: string;
    ip: string;
    userAgent: string;
    language: string;
    country?: string;
    timestamp: string;
    tagId: string;
}

export interface NfcStats {
    totalScans: number;
    uniqueVisitors: number;
    uniqueTags: number;
    scansByTag: Array<{ _id: string; count: number; lastScan: string }>;
    dailyScans: Array<{ _id: string; count: number }>;
    recentScans: NfcScan[];
}

export interface NfcPaginatedResponse {
    success: boolean;
    data: NfcScan[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export const nfcAPI = {
    /**
     * Get all NFC scans with pagination
     */
    getScans: async (params?: {
        page?: number;
        limit?: number;
        startDate?: string;
        endDate?: string;
        tagId?: string;
    }): Promise<NfcPaginatedResponse> => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', String(params.page));
        if (params?.limit) queryParams.append('limit', String(params.limit));
        if (params?.startDate) queryParams.append('startDate', params.startDate);
        if (params?.endDate) queryParams.append('endDate', params.endDate);
        if (params?.tagId) queryParams.append('tagId', params.tagId);

        const query = queryParams.toString();
        return apiClient.get(`/nfc${query ? `?${query}` : ''}`);
    },

    /**
     * Get NFC scan statistics
     */
    getStats: async (): Promise<{ success: boolean; data: NfcStats }> => {
        return apiClient.get('/nfc/stats');
    },

    /**
     * Get scans by tag ID
     */
    getScansByTag: async (tagId: string, params?: {
        page?: number;
        limit?: number;
    }): Promise<NfcPaginatedResponse> => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', String(params.page));
        if (params?.limit) queryParams.append('limit', String(params.limit));

        const query = queryParams.toString();
        return apiClient.get(`/nfc/tag/${tagId}${query ? `?${query}` : ''}`);
    },

    /**
     * Delete a scan
     */
    deleteScan: async (id: string): Promise<{ success: boolean; message: string }> => {
        return apiClient.delete(`/nfc/${id}`);
    },

    /**
     * Delete all scans
     */
    deleteAllScans: async (): Promise<{ success: boolean; message: string; deletedCount: number }> => {
        return apiClient.delete('/nfc/all');
    },
};

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
        careersAPI.prefetch()
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

