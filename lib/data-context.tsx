"use client"

/**
 * Enhanced Data Context with Optimized Loading and Error Handling
 * 
 * Features:
 * - Centralized data management
 * - Loading states for each resource
 * - Error handling with retry capability
 * - Optimistic updates
 * - Automatic data refresh
 * - Background data prefetching
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { caseStudiesAPI, servicesAPI, blogsAPI, jobsAPI, prefetchAllData } from "./api-service"
import { CreateBlogRequest, JobAPI, CreateJobRequest, UpdateJobRequest } from "./api-types"
import { toast } from "sonner"

// Define types
type Service = {
    _id: string
    name_en: string
    name_ar: string
    description_en: string
    description_ar: string
    shortDescription_en: string
    shortDescription_ar: string
    icon: string
    color: string
    features: { feature_en: string; feature_ar: string }[]
    images: { imageLink: string }[]
    slug: string
}

export type { Service }

export type Insight = {
    _id: string
    title: string
    titleAr?: string
    description: string
    descriptionAr?: string
    author: string
    authorAr?: string
    date: string
    readTime: string
    category: string
    categoryAr?: string
    color: string
    href: string
    iconName: string
    image?: string
    createdAt?: string
}

export type CaseStudy = {
    id: string
    title: string
    titleAr?: string
    institute: string
    instituteAr?: string
    category: string
    categoryAr?: string
    description: string
    descriptionAr?: string
    status: { value: string; label: string; labelAr?: string }[]
    image: string
    color: string
    href: string
}

export type Job = {
    id: string
    title: string
    titleAr?: string
    department: string
    departmentAr?: string
    location: string
    locationAr?: string
    type: string
    typeAr?: string
    description: string
    descriptionAr?: string
    requirements?: string[]
    responsibilities?: string[]
}

type LoadingState = {
    services: boolean
    insights: boolean
    caseStudies: boolean
    jobs: boolean
}

type ErrorState = {
    services: string | null
    insights: string | null
    caseStudies: string | null
    jobs: string | null
}

type DataContextType = {
    // Data
    services: Service[]
    insights: Insight[]
    caseStudies: CaseStudy[]
    jobs: Job[]

    // Loading states
    loading: LoadingState

    // Error states
    errors: ErrorState

    // Refresh functions
    refreshServices: () => Promise<void>
    refreshInsights: () => Promise<void>
    refreshCaseStudies: () => Promise<void>
    refreshJobs: () => Promise<void>
    refreshAll: () => Promise<void>

    // Service operations
    addService: (service: Omit<Service, "_id">, imageFile?: File) => Promise<void>
    updateService: (id: string, service: Partial<Service>, imageFile?: File) => Promise<void>
    deleteService: (id: string) => Promise<void>

    // Insight operations
    addInsight: (insight: Omit<Insight, "_id">, imageFile?: File) => Promise<void>
    updateInsight: (id: string, insight: Partial<Insight>, imageFile?: File) => Promise<void>
    deleteInsight: (id: string) => Promise<void>

    // Case study operations
    addCaseStudy: (study: Omit<CaseStudy, "id">, imageFile?: File) => Promise<void>
    updateCaseStudy: (id: string, study: Partial<CaseStudy>, imageFile?: File) => Promise<void>
    deleteCaseStudy: (id: string) => Promise<void>

    // Job operations
    addJob: (job: Omit<Job, "id">) => Promise<void>
    updateJob: (id: string, job: Partial<Job>) => Promise<void>
    deleteJob: (id: string) => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
    // State
    const [services, setServices] = useState<Service[]>([])
    const [insights, setInsights] = useState<Insight[]>([])
    const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
    const [jobs, setJobs] = useState<Job[]>([])

    // Loading states
    const [loading, setLoading] = useState<LoadingState>({
        services: true,
        insights: true,
        caseStudies: true,
        jobs: true
    })

    // Error states
    const [errors, setErrors] = useState<ErrorState>({
        services: null,
        insights: null,
        caseStudies: null,
        jobs: null
    })

    /**
     * Fetch services from backend
     */
    const fetchServices = useCallback(async (skipCache: boolean = false) => {
        try {
            setLoading(prev => ({ ...prev, services: true }))
            setErrors(prev => ({ ...prev, services: null }))

            const res = await servicesAPI.getAll(skipCache)

            if (res.success) {
                const mapped = res.services.map(s => ({
                    _id: s._id,
                    name_en: s.name_en,
                    name_ar: s.name_ar,
                    description_en: s.description_en,
                    description_ar: s.description_ar,
                    shortDescription_en: s.shortDescription_en,
                    shortDescription_ar: s.shortDescription_ar,
                    icon: s.icon,
                    color: s.color,
                    features: s.features.map(f => ({ feature_en: f.feature_en, feature_ar: f.feature_ar })),
                    images: s.images.map(i => ({ imageLink: i.imageLink })),
                    slug: s.slug
                }))
                setServices(mapped)
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to fetch services"
            setErrors(prev => ({ ...prev, services: errorMessage }))
            console.error("Failed to fetch services:", err)
        } finally {
            setLoading(prev => ({ ...prev, services: false }))
        }
    }, [])

    /**
     * Fetch insights from backend
     */
    const fetchInsights = useCallback(async (skipCache: boolean = false) => {
        try {
            setLoading(prev => ({ ...prev, insights: true }))
            setErrors(prev => ({ ...prev, insights: null }))

            const res = await blogsAPI.getAll(skipCache)

            if (res.success) {
                const mapped = res.blogs.map((blog) => ({
                    _id: blog._id,
                    title: blog.title?.en || "",
                    titleAr: blog.title?.ar || "",
                    description: blog.content?.en || "",
                    descriptionAr: blog.content?.ar || "",
                    author: blog.author?.en || "",
                    authorAr: blog.author?.ar || "",
                    category: blog.category?.en || "",
                    categoryAr: blog.category?.ar || "",
                    readTime: blog.readTime ? `${blog.readTime} min` : "0 min",
                    date: blog.createdAt,
                    createdAt: blog.createdAt,
                    image: blog.images?.[0]?.imageLink || "",
                    color: "#7B3FEF",
                    href: `/insights/${blog.slug || blog._id}`,
                    iconName: "BookOpen"
                }))
                setInsights(mapped)
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to fetch insights"
            setErrors(prev => ({ ...prev, insights: errorMessage }))
            console.error("Failed to fetch insights:", err)
        } finally {
            setLoading(prev => ({ ...prev, insights: false }))
        }
    }, [])

    /**
     * Fetch case studies from backend
     */
    const fetchCaseStudies = useCallback(async (skipCache: boolean = false) => {
        try {
            setLoading(prev => ({ ...prev, caseStudies: true }))
            setErrors(prev => ({ ...prev, caseStudies: null }))

            const res = await caseStudiesAPI.getAll(skipCache)

            if (res.success) {
                const mapped = res.caseStudies.map((study) => ({
                    id: study._id,
                    title: study.title_en || "",
                    titleAr: study.title_ar || "",
                    institute: study.institute_en || "",
                    instituteAr: study.institute_ar || "",
                    category: study.category_en || "",
                    categoryAr: study.category_ar || "",
                    description: study.description_en || "",
                    descriptionAr: study.description_ar || "",
                    status: study.status?.map((s) => ({
                        value: s.value,
                        label: s.label_en,
                        labelAr: s.label_ar
                    })) || [],
                    image: study.images?.[0]?.imageLink || "",
                    color: study.color || "#7B3FEF",
                    href: `/case-studies/${study._id}`,
                }))
                setCaseStudies(mapped)
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to fetch case studies"
            setErrors(prev => ({ ...prev, caseStudies: errorMessage }))
            console.error("Failed to fetch case studies:", err)
        } finally {
            setLoading(prev => ({ ...prev, caseStudies: false }))
        }
    }, [])

    /**
     * Fetch jobs from backend
     */
    const fetchJobs = useCallback(async (skipCache: boolean = false) => {
        try {
            setLoading(prev => ({ ...prev, jobs: true }))
            setErrors(prev => ({ ...prev, jobs: null }))

            const res = await jobsAPI.getAll(skipCache)

            if (res.success) {
                const mapped = res.careers.map((job) => ({
                    id: job._id,
                    title: job.title_en || "",
                    titleAr: job.title_ar || "",
                    department: job.department_en || "",
                    departmentAr: job.department_ar || "",
                    location: job.location_en || "",
                    locationAr: job.location_ar || "",
                    type: job.type_en || "",
                    typeAr: job.type_ar || "",
                    description: job.description_en || "",
                    descriptionAr: job.description_ar || "",
                    requirements: job.requirements || [],
                    responsibilities: job.responsibilities || []
                }))
                setJobs(mapped)
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to fetch jobs"
            setErrors(prev => ({ ...prev, jobs: errorMessage }))
            console.error("Failed to fetch jobs:", err)
        } finally {
            setLoading(prev => ({ ...prev, jobs: false }))
        }
    }, [])

    /**
     * Initial data fetch
     */
    useEffect(() => {
        // Fetch all data in parallel
        Promise.all([
            fetchServices(),
            fetchInsights(),
            fetchCaseStudies(),
            fetchJobs()
        ])

        // Prefetch data in background for better performance
        prefetchAllData().catch(err => {
            console.warn("Background prefetch failed:", err)
        })
    }, [fetchServices, fetchInsights, fetchCaseStudies, fetchJobs])

    /**
     * Refresh functions
     */
    const refreshServices = useCallback(() => fetchServices(true), [fetchServices])
    const refreshInsights = useCallback(() => fetchInsights(true), [fetchInsights])
    const refreshCaseStudies = useCallback(() => fetchCaseStudies(true), [fetchCaseStudies])
    const refreshJobs = useCallback(() => fetchJobs(true), [fetchJobs])

    const refreshAll = useCallback(async () => {
        await Promise.all([
            refreshServices(),
            refreshInsights(),
            refreshCaseStudies(),
            refreshJobs()
        ])
    }, [refreshServices, refreshInsights, refreshCaseStudies, refreshJobs])

    /**
     * Service operations
     */
    const addService = async (service: Omit<Service, "_id">, imageFile?: File) => {
        try {
            const apiData = {
                name_en: service.name_en,
                name_ar: service.name_ar,
                description_en: service.description_en,
                description_ar: service.description_ar,
                shortDescription_en: service.shortDescription_en,
                shortDescription_ar: service.shortDescription_ar,
                icon: service.icon,
                color: service.color,
                features: service.features,
                slug: service.slug
            }

            const res = await servicesAPI.create(apiData, imageFile)

            if (res.success) {
                const newService: Service = {
                    _id: res.service._id,
                    name_en: res.service.name_en,
                    name_ar: res.service.name_ar,
                    description_en: res.service.description_en,
                    description_ar: res.service.description_ar,
                    shortDescription_en: res.service.shortDescription_en,
                    shortDescription_ar: res.service.shortDescription_ar,
                    icon: res.service.icon,
                    color: res.service.color,
                    features: res.service.features,
                    images: res.service.images,
                    slug: res.service.slug
                }
                setServices(prev => [...prev, newService])
                toast.success("Service created successfully")
            }
        } catch (err) {
            console.error("Failed to create service:", err)
            toast.error(err instanceof Error ? err.message : "Failed to create service")
            throw err
        }
    }

    const updateService = async (id: string, updated: Partial<Service>, imageFile?: File) => {
        // Store original for rollback
        const original = services.find(s => s._id === id)

        try {
            // Optimistic update
            setServices(prev =>
                prev.map(s => (s._id === id ? { ...s, ...updated } : s))
            )

            const apiData: any = {}
            if (updated.name_en) apiData.name_en = updated.name_en
            if (updated.name_ar) apiData.name_ar = updated.name_ar
            if (updated.description_en) apiData.description_en = updated.description_en
            if (updated.description_ar) apiData.description_ar = updated.description_ar
            if (updated.shortDescription_en) apiData.shortDescription_en = updated.shortDescription_en
            if (updated.shortDescription_ar) apiData.shortDescription_ar = updated.shortDescription_ar
            if (updated.icon) apiData.icon = updated.icon
            if (updated.color) apiData.color = updated.color
            if (updated.features) apiData.features = updated.features
            if (updated.slug) apiData.slug = updated.slug

            const res = await servicesAPI.update(id, apiData, imageFile)

            if (res.success) {
                setServices(prev =>
                    prev.map(s => s._id === id ? {
                        _id: res.service._id,
                        name_en: res.service.name_en,
                        name_ar: res.service.name_ar,
                        description_en: res.service.description_en,
                        description_ar: res.service.description_ar,
                        shortDescription_en: res.service.shortDescription_en,
                        shortDescription_ar: res.service.shortDescription_ar,
                        icon: res.service.icon,
                        color: res.service.color,
                        features: res.service.features,
                        images: res.service.images,
                        slug: res.service.slug
                    } : s)
                )
                toast.success("Service updated successfully")
            }
        } catch (err) {
            // Rollback on error
            if (original) {
                setServices(prev => prev.map(s => s._id === id ? original : s))
            }
            console.error("Failed to update service:", err)
            toast.error(err instanceof Error ? err.message : "Failed to update service")
            throw err
        }
    }

    const deleteService = async (id: string) => {
        // Store original for rollback
        const original = [...services]

        try {
            // Optimistic delete
            setServices(prev => prev.filter(s => s._id !== id))

            await servicesAPI.delete(id)
            toast.success("Service deleted successfully")
        } catch (err) {
            // Rollback on error
            setServices(original)
            console.error("Failed to delete service:", err)
            toast.error(err instanceof Error ? err.message : "Failed to delete service")
            throw err
        }
    }

    /**
     * Insight operations
     */
    const addInsight = async (insight: Omit<Insight, "_id">, imageFile?: File) => {
        try {
            // For new insights, image is required
            if (!imageFile && !insight.image) {
                toast.error("Please upload an image")
                throw new Error("Image is required for new insights")
            }

            const apiData: any = {
                title: {
                    en: insight.title,
                    ar: insight.titleAr
                },
                content: {
                    en: insight.description,
                    ar: insight.descriptionAr
                },
                author: {
                    en: insight.author,
                    ar: insight.authorAr
                },
                category: {
                    en: insight.category,
                    ar: insight.categoryAr
                },
                readTime: parseInt(insight.readTime) || 5
            }

            // Only include images array if no file is being uploaded
            if (!imageFile && insight.image) {
                apiData.images = [{ imageLink: insight.image }]
            }

            const res = await blogsAPI.create(apiData, imageFile)

            if (res.success) {
                const newInsight = {
                    ...insight,
                    _id: res.blog._id,
                    date: res.blog.createdAt,
                    createdAt: res.blog.createdAt,
                    image: res.blog.images?.[0]?.imageLink || insight.image || ""
                }
                setInsights(prev => [...prev, newInsight])
                toast.success("Insight created successfully")
            }
        } catch (err) {
            console.error("Failed to create insight:", err)
            toast.error(err instanceof Error ? err.message : "Failed to create insight")
            throw err
        }
    }

    const updateInsight = async (id: string, updatedInsight: Partial<Insight>, imageFile?: File) => {
        const original = insights.find(i => i._id === id)

        try {
            // Optimistic update
            setInsights(insights.map((i) => (i._id === id ? { ...i, ...updatedInsight } : i)))

            const apiData: any = {}
            if (updatedInsight.title || updatedInsight.titleAr) {
                apiData.title = {
                    en: updatedInsight.title,
                    ar: updatedInsight.titleAr
                }
            }
            if (updatedInsight.description || updatedInsight.descriptionAr) {
                apiData.content = {
                    en: updatedInsight.description,
                    ar: updatedInsight.descriptionAr
                }
            }
            if (updatedInsight.author || updatedInsight.authorAr) {
                apiData.author = {
                    en: updatedInsight.author,
                    ar: updatedInsight.authorAr
                }
            }
            if (updatedInsight.category || updatedInsight.categoryAr) {
                apiData.category = {
                    en: updatedInsight.category,
                    ar: updatedInsight.categoryAr
                }
            }
            // Only include images array if no file is being uploaded
            if (!imageFile && updatedInsight.image) {
                apiData.images = [{ imageLink: updatedInsight.image }]
            }

            const res = await blogsAPI.update(id, apiData, imageFile)

            if (res.success) {
                setInsights(prev => prev.map(i => i._id === id ? {
                    ...i,
                    ...updatedInsight,
                    image: res.blog.images?.[0]?.imageLink || updatedInsight.image || i.image
                } : i))
            }

            toast.success("Insight updated successfully")
        } catch (err) {
            // Rollback
            if (original) {
                setInsights(prev => prev.map(i => i._id === id ? original : i))
            }
            console.error("Failed to update insight:", err)
            toast.error(err instanceof Error ? err.message : "Failed to update insight")
            throw err
        }
    }

    const deleteInsight = async (id: string) => {
        const original = [...insights]

        try {
            setInsights(insights.filter((i) => i._id !== id))
            await blogsAPI.delete(id)
            toast.success("Insight deleted successfully")
        } catch (err) {
            setInsights(original)
            console.error("Failed to delete insight:", err)
            toast.error(err instanceof Error ? err.message : "Failed to delete insight")
            throw err
        }
    }

    /**
     * Case study operations
     */
    const addCaseStudy = async (study: Omit<CaseStudy, "id">, imageFile?: File) => {
        try {
            // For new case studies, image is required
            if (!imageFile && !study.image) {
                toast.error("Please upload an image")
                throw new Error("Image is required for new case studies")
            }

            const apiData: any = {
                title_en: study.title,
                title_ar: study.titleAr,
                institute_en: study.institute,
                institute_ar: study.instituteAr,
                category_en: study.category,
                category_ar: study.categoryAr,
                description_en: study.description,
                description_ar: study.descriptionAr,
                status: (study.status || []).map(s => ({
                    value: s.value,
                    label_en: s.label,
                    label_ar: s.labelAr
                })),
                color: study.color || "#7B3FEF",
            }

            // Only include images array if no file is being uploaded
            if (!imageFile && study.image) {
                apiData.images = [{ imageLink: study.image }]
            }

            const response = await caseStudiesAPI.create(apiData, imageFile)

            if (response.success) {
                const mapped = {
                    id: response.caseStudy._id,
                    title: response.caseStudy.title_en || "",
                    titleAr: response.caseStudy.title_ar || "",
                    institute: response.caseStudy.institute_en || "",
                    instituteAr: response.caseStudy.institute_ar || "",
                    category: response.caseStudy.category_en || "",
                    categoryAr: response.caseStudy.category_ar || "",
                    description: response.caseStudy.description_en || "",
                    descriptionAr: response.caseStudy.description_ar || "",
                    status: response.caseStudy.status?.map((s: { value: string; label_en: string; label_ar?: string }) => ({
                        value: s.value,
                        label: s.label_en,
                        labelAr: s.label_ar
                    })) || [],
                    image: response.caseStudy.images?.[0]?.imageLink || study.image || "",
                    color: response.caseStudy.color || "#7B3FEF",
                    href: `/case-studies/${response.caseStudy._id}`,
                }
                setCaseStudies([...caseStudies, mapped])
                toast.success("Case study created successfully")
            }
        } catch (err) {
            console.error("Failed to create case study:", err)
            toast.error(err instanceof Error ? err.message : "Failed to create case study")
            throw err
        }
    }

    const updateCaseStudy = async (id: string, updatedStudy: Partial<CaseStudy>, imageFile?: File) => {
        const original = caseStudies.find(s => s.id === id)

        try {
            // Optimistic update
            setCaseStudies(caseStudies.map((s) => (s.id === id ? { ...s, ...updatedStudy } : s)))

            const apiData: any = {}
            if (updatedStudy.title) apiData.title_en = updatedStudy.title
            if (updatedStudy.titleAr) apiData.title_ar = updatedStudy.titleAr
            if (updatedStudy.institute) apiData.institute_en = updatedStudy.institute
            if (updatedStudy.instituteAr) apiData.institute_ar = updatedStudy.instituteAr
            if (updatedStudy.category) apiData.category_en = updatedStudy.category
            if (updatedStudy.categoryAr) apiData.category_ar = updatedStudy.categoryAr
            if (updatedStudy.description) apiData.description_en = updatedStudy.description
            if (updatedStudy.descriptionAr) apiData.description_ar = updatedStudy.descriptionAr
            if (updatedStudy.color) apiData.color = updatedStudy.color
            if (updatedStudy.status) {
                apiData.status = updatedStudy.status.map(s => ({
                    value: s.value,
                    label_en: s.label,
                    label_ar: s.labelAr
                }))
            }
            // Only include images array if no file is being uploaded
            if (!imageFile && updatedStudy.image) {
                apiData.images = [{ imageLink: updatedStudy.image }]
            }

            const res = await caseStudiesAPI.update(id, apiData, imageFile)

            if (res.success) {
                setCaseStudies(prev => prev.map(s => s.id === id ? {
                    ...s,
                    ...updatedStudy,
                    image: res.caseStudy.images?.[0]?.imageLink || updatedStudy.image || s.image
                } : s))
            }

            toast.success("Case study updated successfully")
        } catch (err) {
            // Rollback
            if (original) {
                setCaseStudies(prev => prev.map(s => s.id === id ? original : s))
            }
            console.error("Failed to update case study:", err)
            toast.error(err instanceof Error ? err.message : "Failed to update case study")
            throw err
        }
    }

    const deleteCaseStudy = async (id: string) => {
        const original = [...caseStudies]

        try {
            setCaseStudies(caseStudies.filter((s) => s.id !== id))
            await caseStudiesAPI.delete(id)
            toast.success("Case study deleted successfully")
        } catch (err) {
            setCaseStudies(original)
            console.error("Failed to delete case study:", err)
            toast.error(err instanceof Error ? err.message : "Failed to delete case study")
            throw err
        }
    }

    /**
     * Job operations
     */
    const addJob = async (job: Omit<Job, "id">) => {
        try {
            const apiData: CreateJobRequest = {
                title_en: job.title,
                title_ar: job.titleAr,
                department_en: job.department,
                department_ar: job.departmentAr,
                location_en: job.location,
                location_ar: job.locationAr,
                type_en: job.type,
                type_ar: job.typeAr,
                description_en: job.description,
                description_ar: job.descriptionAr,
                requirements: job.requirements,
                responsibilities: job.responsibilities
            }

            const res = await jobsAPI.create(apiData)

            if (res.success) {
                const newJob: Job = {
                    id: res.career._id,
                    title: res.career.title_en || "",
                    titleAr: res.career.title_ar || "",
                    department: res.career.department_en || "",
                    departmentAr: res.career.department_ar || "",
                    location: res.career.location_en || "",
                    locationAr: res.career.location_ar || "",
                    type: res.career.type_en || "",
                    typeAr: res.career.type_ar || "",
                    description: res.career.description_en || "",
                    descriptionAr: res.career.description_ar || "",
                    requirements: res.career.requirements || [],
                    responsibilities: res.career.responsibilities || []
                }
                setJobs(prev => [...prev, newJob])
                toast.success("Job created successfully")
            }
        } catch (err) {
            console.error("Failed to create job:", err)
            toast.error(err instanceof Error ? err.message : "Failed to create job")
            throw err
        }
    }

    const updateJob = async (id: string, updatedJob: Partial<Job>) => {
        const original = jobs.find(j => j.id === id)

        try {
            // Optimistic update
            setJobs(jobs.map((j) => (j.id === id ? { ...j, ...updatedJob } : j)))

            const apiData: UpdateJobRequest = {}
            if (updatedJob.title) apiData.title_en = updatedJob.title
            if (updatedJob.titleAr) apiData.title_ar = updatedJob.titleAr
            if (updatedJob.department) apiData.department_en = updatedJob.department
            if (updatedJob.departmentAr) apiData.department_ar = updatedJob.departmentAr
            if (updatedJob.location) apiData.location_en = updatedJob.location
            if (updatedJob.locationAr) apiData.location_ar = updatedJob.locationAr
            if (updatedJob.type) apiData.type_en = updatedJob.type
            if (updatedJob.typeAr) apiData.type_ar = updatedJob.typeAr
            if (updatedJob.description) apiData.description_en = updatedJob.description
            if (updatedJob.descriptionAr) apiData.description_ar = updatedJob.descriptionAr
            if (updatedJob.requirements) apiData.requirements = updatedJob.requirements
            if (updatedJob.responsibilities) apiData.responsibilities = updatedJob.responsibilities

            await jobsAPI.update(id, apiData)
            toast.success("Job updated successfully")
        } catch (err) {
            // Rollback
            if (original) {
                setJobs(prev => prev.map(j => j.id === id ? original : j))
            }
            console.error("Failed to update job:", err)
            toast.error(err instanceof Error ? err.message : "Failed to update job")
            throw err
        }
    }

    const deleteJob = async (id: string) => {
        const original = [...jobs]

        try {
            setJobs(jobs.filter((j) => j.id !== id))
            await jobsAPI.delete(id)
            toast.success("Job deleted successfully")
        } catch (err) {
            setJobs(original)
            console.error("Failed to delete job:", err)
            toast.error(err instanceof Error ? err.message : "Failed to delete job")
            throw err
        }
    }

    return (
        <DataContext.Provider
            value={{
                services,
                insights,
                caseStudies,
                jobs,
                loading,
                errors,
                refreshServices,
                refreshInsights,
                refreshCaseStudies,
                refreshJobs,
                refreshAll,
                addService,
                updateService,
                deleteService,
                addInsight,
                updateInsight,
                deleteInsight,
                addCaseStudy,
                updateCaseStudy,
                deleteCaseStudy,
                addJob,
                updateJob,
                deleteJob,
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export function useData() {
    const context = useContext(DataContext)
    if (context === undefined) {
        throw new Error("useData must be used within a DataProvider")
    }
    return context
}
