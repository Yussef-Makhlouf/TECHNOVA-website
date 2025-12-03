/**
 * Enhanced API Client with Caching, Request Deduplication, and Optimized Performance
 * 
 * Features:
 * - Request caching with TTL
 * - Request deduplication (prevents multiple identical requests)
 * - Cache-Control headers to prevent 304 responses
 * - Automatic retry logic for failed requests
 * - Request/Response interceptors
 * - Optimistic updates support
 */

import { createErrorFromResponse, NetworkError, APIError } from "./api-errors"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"
// "https://technova-main.vercel.app/api/v1"
const TOKEN_KEY = "technova_auth_token"

// Cache configuration
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes
const MAX_RETRIES = 2
const RETRY_DELAY = 1000 // 1 second

interface CacheEntry<T> {
    data: T
    timestamp: number
    etag?: string
}

interface RequestConfig extends RequestInit {
    params?: Record<string, string | number | boolean>
    skipCache?: boolean
    cacheTTL?: number
    retries?: number
}

interface PendingRequest {
    promise: Promise<any>
    timestamp: number
}

/**
 * Enhanced API Client Class
 */
export class APIClient {
    private baseURL: string
    private cache: Map<string, CacheEntry<any>> = new Map()
    private pendingRequests: Map<string, PendingRequest> = new Map()
    private requestInterceptors: Array<(config: RequestConfig) => RequestConfig> = []
    private responseInterceptors: Array<(response: Response) => Response | Promise<Response>> = []

    constructor(baseURL: string) {
        this.baseURL = baseURL
        this.setupDefaultInterceptors()
    }

    /**
     * Setup default interceptors
     */
    private setupDefaultInterceptors(): void {
        // Request interceptor to add cache-busting headers
        this.addRequestInterceptor((config) => {
            const headers = new Headers(config.headers)

            // Force fresh data (prevent 304)
            headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
            headers.set('Pragma', 'no-cache')
            headers.set('Expires', '0')

            return {
                ...config,
                headers
            }
        })
    }

    /**
     * Add request interceptor
     */
    addRequestInterceptor(interceptor: (config: RequestConfig) => RequestConfig): void {
        this.requestInterceptors.push(interceptor)
    }

    /**
     * Add response interceptor
     */
    addResponseInterceptor(interceptor: (response: Response) => Response | Promise<Response>): void {
        this.responseInterceptors.push(interceptor)
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
     * Generate cache key for request
     */
    private getCacheKey(url: string, method: string = 'GET'): string {
        return `${method}:${url}`
    }

    /**
     * Get cached data if available and not expired
     */
    private getCachedData<T>(cacheKey: string, ttl: number = CACHE_TTL): T | null {
        const cached = this.cache.get(cacheKey)

        if (!cached) return null

        const isExpired = Date.now() - cached.timestamp > ttl

        if (isExpired) {
            this.cache.delete(cacheKey)
            return null
        }

        return cached.data as T
    }

    /**
     * Set cached data
     */
    private setCachedData<T>(cacheKey: string, data: T, etag?: string): void {
        this.cache.set(cacheKey, {
            data,
            timestamp: Date.now(),
            etag
        })
    }

    /**
     * Clear cache for specific key or all cache
     */
    clearCache(cacheKey?: string): void {
        if (cacheKey) {
            this.cache.delete(cacheKey)
        } else {
            this.cache.clear()
        }
    }

    /**
     * Handle API response
     */
    private async handleResponse<T>(response: Response): Promise<T> {
        // Run response interceptors
        let processedResponse = response
        for (const interceptor of this.responseInterceptors) {
            processedResponse = await interceptor(processedResponse)
        }

        // Handle errors
        if (!processedResponse.ok) {
            let errorMessage = "An error occurred"

            try {
                const errorData = await processedResponse.json()
                errorMessage = errorData.message || errorData.error || errorMessage
            } catch {
                errorMessage = processedResponse.statusText || errorMessage
            }

            throw createErrorFromResponse(processedResponse.status, errorMessage)
        }

        // Parse successful response
        try {
            const data = await processedResponse.json()
            return data
        } catch (error) {
            throw new APIError("Failed to parse response")
        }
    }

    /**
     * Sleep utility for retry delay
     */
    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    /**
     * Generic request method with retry logic
     */
    private async requestWithRetry<T>(
        endpoint: string,
        config: RequestConfig = {},
        attempt: number = 0
    ): Promise<T> {
        const maxRetries = config.retries ?? MAX_RETRIES

        try {
            return await this.executeRequest<T>(endpoint, config)
        } catch (error) {
            // Don't retry on client errors (4xx)
            if (error instanceof APIError && error.statusCode >= 400 && error.statusCode < 500) {
                throw error
            }

            // Retry on network errors or server errors (5xx)
            if (attempt < maxRetries) {
                await this.sleep(RETRY_DELAY * (attempt + 1))
                return this.requestWithRetry<T>(endpoint, config, attempt + 1)
            }

            throw error
        }
    }

    /**
     * Execute request with caching and deduplication
     */
    private async executeRequest<T>(
        endpoint: string,
        config: RequestConfig = {}
    ): Promise<T> {
        const { params, headers, skipCache, cacheTTL, retries, ...restConfig } = config
        const method = config.method || 'GET'
        const url = this.buildURL(endpoint, params)
        const cacheKey = this.getCacheKey(url, method)

        // Check cache for GET requests
        if (method === 'GET' && !skipCache) {
            const cachedData = this.getCachedData<T>(cacheKey, cacheTTL)
            if (cachedData) {
                return cachedData
            }

            // Check for pending identical request (deduplication)
            const pending = this.pendingRequests.get(cacheKey)
            if (pending) {
                return pending.promise
            }
        }

        // Apply request interceptors
        let processedConfig: RequestConfig = {
            ...restConfig,
            headers: headers || {},
            method
        }
        for (const interceptor of this.requestInterceptors) {
            processedConfig = interceptor(processedConfig)
        }

        // Create request promise
        const requestPromise = (async () => {
            try {
                const response = await fetch(url, {
                    ...processedConfig,
                    headers: this.buildHeaders(processedConfig.headers),
                })

                const data = await this.handleResponse<T>(response)

                // Cache GET requests
                if (method === 'GET' && !skipCache) {
                    const etag = response.headers.get('etag') || undefined
                    this.setCachedData(cacheKey, data, etag)
                }

                return data
            } catch (error) {
                throw error
            } finally {
                // Remove from pending requests
                this.pendingRequests.delete(cacheKey)
            }
        })()

        // Store pending request for deduplication
        if (method === 'GET') {
            this.pendingRequests.set(cacheKey, {
                promise: requestPromise,
                timestamp: Date.now()
            })
        }

        return requestPromise
    }

    /**
     * Generic request method
     */
    async request<T>(
        endpoint: string,
        config: RequestConfig = {}
    ): Promise<T> {
        try {
            return await this.requestWithRetry<T>(endpoint, config)
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
    async get<T>(
        endpoint: string,
        params?: Record<string, string | number | boolean>,
        options?: { skipCache?: boolean; cacheTTL?: number }
    ): Promise<T> {
        return this.request<T>(endpoint, {
            method: "GET",
            params,
            skipCache: options?.skipCache,
            cacheTTL: options?.cacheTTL
        })
    }

    /**
     * POST request
     */
    async post<T>(endpoint: string, data?: any): Promise<T> {
        // Clear related cache entries
        this.clearCacheByEndpoint(endpoint)

        return this.request<T>(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
        })
    }

    /**
     * PUT request
     */
    async put<T>(endpoint: string, data?: any): Promise<T> {
        // Clear related cache entries
        this.clearCacheByEndpoint(endpoint)

        return this.request<T>(endpoint, {
            method: "PUT",
            body: JSON.stringify(data),
        })
    }

    /**
     * DELETE request
     */
    async delete<T>(endpoint: string): Promise<T> {
        // Clear related cache entries
        this.clearCacheByEndpoint(endpoint)

        return this.request<T>(endpoint, { method: "DELETE" })
    }

    /**
     * Upload file (multipart/form-data)
     */
    async upload<T>(endpoint: string, formData: FormData): Promise<T> {
        const token = this.getToken()
        const headers: Record<string, string> = {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }

        if (token) {
            headers["Authorization"] = `Bearer ${token}`
        }

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: "POST",
                headers,
                body: formData,
            })

            const data = await this.handleResponse<T>(response)

            // Clear related cache entries
            this.clearCacheByEndpoint(endpoint)

            return data
        } catch (error) {
            if (error instanceof TypeError && error.message.includes("fetch")) {
                throw new NetworkError()
            }
            throw error
        }
    }

    /**
     * Clear cache entries related to an endpoint
     */
    private clearCacheByEndpoint(endpoint: string): void {
        const baseEndpoint = endpoint.split('/')[1] // Get the resource type (e.g., 'services', 'blogs')

        for (const key of this.cache.keys()) {
            if (key.includes(baseEndpoint)) {
                this.cache.delete(key)
            }
        }
    }

    /**
     * Prefetch data (load in background)
     */
    async prefetch<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<void> {
        try {
            await this.get<T>(endpoint, params)
        } catch (error) {
            // Silently fail for prefetch
            console.warn('Prefetch failed:', error)
        }
    }

    /**
     * Get cache statistics
     */
    getCacheStats(): { size: number; keys: string[] } {
        return {
            size: this.cache.size,
            keys: Array.from(this.cache.keys())
        }
    }
}

// Create singleton instance
export const apiClient = new APIClient(API_BASE_URL)

// Export for testing or advanced usage
export default apiClient
