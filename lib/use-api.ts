/**
 * Custom React Hooks for API Data Fetching
 * 
 * These hooks provide a clean interface for fetching data from the API
 * with built-in loading states, error handling, and caching.
 * 
 * Use these hooks in pages that need to fetch data independently
 * from the global DataContext.
 */

import { useState, useEffect, useCallback } from "react"
import {
    servicesAPI,
    blogsAPI,
    caseStudiesAPI,
    careersAPI,
    jobsAPI
} from "./api-service"
import {
    ServiceAPI,
    BlogAPI,
    CaseStudyAPI,
    JobAPI
} from "./api-types"

interface UseAPIOptions {
    skipCache?: boolean
    autoFetch?: boolean
}

interface APIState<T> {
    data: T | null
    loading: boolean
    error: string | null
}

interface APIListState<T> {
    data: T[]
    loading: boolean
    error: string | null
}

/**
 * Hook for fetching a single service by ID
 */
export function useService(id: string | null, options: UseAPIOptions = {}) {
    const { skipCache = false, autoFetch = true } = options
    const [state, setState] = useState<APIState<ServiceAPI>>({
        data: null,
        loading: autoFetch && !!id,
        error: null
    })

    const fetchService = useCallback(async () => {
        if (!id) return

        setState(prev => ({ ...prev, loading: true, error: null }))

        try {
            const response = await servicesAPI.getById(id, skipCache)
            if (response.success) {
                setState({ data: response.service, loading: false, error: null })
            } else {
                setState({ data: null, loading: false, error: "Failed to fetch service" })
            }
        } catch (err) {
            setState({
                data: null,
                loading: false,
                error: err instanceof Error ? err.message : "An error occurred"
            })
        }
    }, [id, skipCache])

    useEffect(() => {
        if (autoFetch && id) {
            fetchService()
        }
    }, [autoFetch, id, fetchService])

    return {
        ...state,
        refetch: fetchService
    }
}

/**
 * Hook for fetching all services
 */
export function useServices(options: UseAPIOptions = {}) {
    const { skipCache = false, autoFetch = true } = options
    const [state, setState] = useState<APIListState<ServiceAPI>>({
        data: [],
        loading: autoFetch,
        error: null
    })

    const fetchServices = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true, error: null }))

        try {
            const response = await servicesAPI.getAll(skipCache)
            if (response.success) {
                setState({ data: response.services, loading: false, error: null })
            } else {
                setState({ data: [], loading: false, error: "Failed to fetch services" })
            }
        } catch (err) {
            setState({
                data: [],
                loading: false,
                error: err instanceof Error ? err.message : "An error occurred"
            })
        }
    }, [skipCache])

    useEffect(() => {
        if (autoFetch) {
            fetchServices()
        }
    }, [autoFetch, fetchServices])

    return {
        ...state,
        refetch: fetchServices
    }
}

/**
 * Hook for fetching a single blog/insight by ID
 */
export function useBlog(id: string | null, options: UseAPIOptions = {}) {
    const { skipCache = false, autoFetch = true } = options
    const [state, setState] = useState<APIState<BlogAPI>>({
        data: null,
        loading: autoFetch && !!id,
        error: null
    })

    const fetchBlog = useCallback(async () => {
        if (!id) return

        setState(prev => ({ ...prev, loading: true, error: null }))

        try {
            const response = await blogsAPI.getById(id, skipCache)
            if (response.success) {
                setState({ data: response.blog, loading: false, error: null })
            } else {
                setState({ data: null, loading: false, error: "Failed to fetch blog" })
            }
        } catch (err) {
            setState({
                data: null,
                loading: false,
                error: err instanceof Error ? err.message : "An error occurred"
            })
        }
    }, [id, skipCache])

    useEffect(() => {
        if (autoFetch && id) {
            fetchBlog()
        }
    }, [autoFetch, id, fetchBlog])

    return {
        ...state,
        refetch: fetchBlog
    }
}

/**
 * Hook for fetching all blogs/insights
 */
export function useBlogs(options: UseAPIOptions = {}) {
    const { skipCache = false, autoFetch = true } = options
    const [state, setState] = useState<APIListState<BlogAPI>>({
        data: [],
        loading: autoFetch,
        error: null
    })

    const fetchBlogs = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true, error: null }))

        try {
            const response = await blogsAPI.getAll(skipCache)
            if (response.success) {
                setState({ data: response.blogs, loading: false, error: null })
            } else {
                setState({ data: [], loading: false, error: "Failed to fetch blogs" })
            }
        } catch (err) {
            setState({
                data: [],
                loading: false,
                error: err instanceof Error ? err.message : "An error occurred"
            })
        }
    }, [skipCache])

    useEffect(() => {
        if (autoFetch) {
            fetchBlogs()
        }
    }, [autoFetch, fetchBlogs])

    return {
        ...state,
        refetch: fetchBlogs
    }
}

/**
 * Hook for fetching a single case study by ID
 */
export function useCaseStudy(id: string | null, options: UseAPIOptions = {}) {
    const { skipCache = false, autoFetch = true } = options
    const [state, setState] = useState<APIState<CaseStudyAPI>>({
        data: null,
        loading: autoFetch && !!id,
        error: null
    })

    const fetchCaseStudy = useCallback(async () => {
        if (!id) return

        setState(prev => ({ ...prev, loading: true, error: null }))

        try {
            const response = await caseStudiesAPI.getById(id, skipCache)
            if (response.success) {
                setState({ data: response.caseStudy, loading: false, error: null })
            } else {
                setState({ data: null, loading: false, error: "Failed to fetch case study" })
            }
        } catch (err) {
            setState({
                data: null,
                loading: false,
                error: err instanceof Error ? err.message : "An error occurred"
            })
        }
    }, [id, skipCache])

    useEffect(() => {
        if (autoFetch && id) {
            fetchCaseStudy()
        }
    }, [autoFetch, id, fetchCaseStudy])

    return {
        ...state,
        refetch: fetchCaseStudy
    }
}

/**
 * Hook for fetching all case studies
 */
export function useCaseStudies(options: UseAPIOptions = {}) {
    const { skipCache = false, autoFetch = true } = options
    const [state, setState] = useState<APIListState<CaseStudyAPI>>({
        data: [],
        loading: autoFetch,
        error: null
    })

    const fetchCaseStudies = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true, error: null }))

        try {
            const response = await caseStudiesAPI.getAll(skipCache)
            if (response.success) {
                setState({ data: response.caseStudies, loading: false, error: null })
            } else {
                setState({ data: [], loading: false, error: "Failed to fetch case studies" })
            }
        } catch (err) {
            setState({
                data: [],
                loading: false,
                error: err instanceof Error ? err.message : "An error occurred"
            })
        }
    }, [skipCache])

    useEffect(() => {
        if (autoFetch) {
            fetchCaseStudies()
        }
    }, [autoFetch, fetchCaseStudies])

    return {
        ...state,
        refetch: fetchCaseStudies
    }
}

/**
 * Hook for fetching a single career by ID
 */
export function useCareer(id: string | null, options: UseAPIOptions = {}) {
    const { skipCache = false, autoFetch = true } = options
    const [state, setState] = useState<APIState<JobAPI>>({
        data: null,
        loading: autoFetch && !!id,
        error: null
    })

    const fetchCareer = useCallback(async () => {
        if (!id) return

        setState(prev => ({ ...prev, loading: true, error: null }))

        try {
            const response = await careersAPI.getById(id, skipCache)
            if (response.success) {
                setState({ data: response.career, loading: false, error: null })
            } else {
                setState({ data: null, loading: false, error: "Failed to fetch career" })
            }
        } catch (err) {
            setState({
                data: null,
                loading: false,
                error: err instanceof Error ? err.message : "An error occurred"
            })
        }
    }, [id, skipCache])

    useEffect(() => {
        if (autoFetch && id) {
            fetchCareer()
        }
    }, [autoFetch, id, fetchCareer])

    return {
        ...state,
        refetch: fetchCareer
    }
}

/**
 * Hook for fetching all careers
 */
export function useCareers(options: UseAPIOptions = {}) {
    const { skipCache = false, autoFetch = true } = options
    const [state, setState] = useState<APIListState<JobAPI>>({
        data: [],
        loading: autoFetch,
        error: null
    })

    const fetchCareers = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true, error: null }))

        try {
            const response = await careersAPI.getAll(skipCache)
            if (response.success) {
                setState({ data: response.careers, loading: false, error: null })
            } else {
                setState({ data: [], loading: false, error: "Failed to fetch careers" })
            }
        } catch (err) {
            setState({
                data: [],
                loading: false,
                error: err instanceof Error ? err.message : "An error occurred"
            })
        }
    }, [skipCache])

    useEffect(() => {
        if (autoFetch) {
            fetchCareers()
        }
    }, [autoFetch, fetchCareers])

    return {
        ...state,
        refetch: fetchCareers
    }
}

// Keep old names as aliases for backward compatibility
export const useJob = useCareer
export const useJobs = useCareers
