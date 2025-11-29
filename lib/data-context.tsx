"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { Brain, Cloud, Shield, Sparkles, Database, Code, Cpu, Network, TrendingUp, Lightbulb, BookOpen } from "lucide-react"
import { caseStudiesAPI, servicesAPI, blogsAPI,jobsAPI } from "./api-service"
import { CreateBlogRequest } from "./api-types"
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
    images: { imageLink: string }[]   // ✅ remove public_id, _id
    slug: string
}

export type { Service }

export type Insight = {
    _id: string,
    title: string,
    titleAr?: string,
    description: string,
    descriptionAr?: string,
    author: string,
    authorAr?: string,
    date: string,
    readTime: string,
    category: string,
    categoryAr?: string,
    color: string,
    href: string,
    iconName: string,
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
    // 🚀 Support Multiple Images
    images: string[]           // URLs from backend
    imageFiles?: File[] | null;  // ← OPTIONAL, if you add it
    color: string
    href: string
}

export type Careers = {
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
}

type DataContextType = {
    services: Service[]
    insights: Insight[]
    caseStudies: CaseStudy[]
    jobs: Careers[]
    addService: (service: Omit<Service, "_id">, imageFiles?: File[]) => Promise<void>
    updateService: (
    id: string,
    updated: Partial<Service>,
    imageFiles?: File[]
) => Promise<void>;
    deleteService: (id: string) => void
    addInsight: (insight: Omit<Insight, "id">) => void
    updateInsight: (id: string, insight: Partial<Insight>) => void
    deleteInsight: (id: string) => void
    addCaseStudy: (study: Omit<CaseStudy, "id">) => void
    updateCaseStudy: (id: string, study: Partial<CaseStudy>) => void
    deleteCaseStudy: (id: string) => void
    addJob: (job: Omit<Careers, "id">) => void
    updateJob: (id: string, job: Partial<Careers>) => void
    deleteJob: (id: string) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

// Initial Data
const initialServices: Service[] = []
const initialInsights: Insight[] = []
const initialCaseStudies: CaseStudy[] = []
const initialJobs: Careers[] = []

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [services, setServices] = useState<Service[]>(initialServices)
    const [insights, setInsights] = useState<Insight[]>(initialInsights)
    const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(initialCaseStudies)
    const [jobs, setJobs] = useState<Careers[]>(initialJobs)

    // Fetch services from backend
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await servicesAPI.getAll()
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
                        features: s.features.map(f => ({
                            feature_en: f.feature_en,
                            feature_ar: f.feature_ar
                        })),
                        images: s.images.map(i => ({
                            imageLink: i.imageLink,
                        })),
                        slug: s.slug
                    }))
                    setServices(mapped)
                }
            } catch (err) {
                console.error("Failed to fetch services:", err)
            }
        }

        const fetchInsights = async () => {
            try {
                const res = await blogsAPI.getAll()
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
                        color: "#7B3FEF", // Default color as it's not in API
                        href: `/insights/${blog.slug || blog._id}`,
                        iconName: "BookOpen" // Default icon
                    }))
                    setInsights(mapped)
                }
            } catch (err) {
                console.error("Failed to fetch blogs:", err)
            }
        }

        const fetchCaseStudies = async () => {
            try {
                const res = await caseStudiesAPI.getAll()
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

                        // ✅ Correct: array, not string
                        images: study.images?.map(i => i.imageLink) || [],

                        color: study.color || "#7B3FEF",
                        href: `/case-studies/${study._id}`,
                    }))

                    setCaseStudies(mapped)
                }
            } catch (err) {
                console.error("Failed to fetch case studies:", err)
            }
        }

        const fetchCareers = async () => {
            try {
                const res = await jobsAPI.getAll()
                    
                if (res.careers) {
                    const mapped = res.careers.map(c => ({
                        id: c._id,
                        title: c.title_en,
                        titleAr: c.title_ar,
                        department: c.department_en,
                        departmentAr: c.department_ar,
                        location: c.location_en,
                        locationAr: c.location_ar,
                        type: c.type_en,
                        typeAr: c.type_ar,
                        description: c.description_en,
                        descriptionAr: c.description_ar,
                    }))
                    setJobs(mapped)
                }
            } catch (err) {
                console.error("Failed to fetch careers:", err)
            }
        }

        fetchCareers()
        fetchServices()
        fetchInsights()
        fetchCaseStudies()
    }, [])

        const addService = async (service: Omit<Service, "_id">, imageFiles?: File[]) => {
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

                // ❗ FIX: use imageFiles not imageFile
                const res = await servicesAPI.create(apiData, imageFiles)

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
                        images: res.service.images, // full image array
                        slug: res.service.slug
                    }

                    setServices(prev => [...prev, newService])
                    toast.success("Service created successfully")
                }
            } catch (err) {
                console.error("Failed to create service:", err)
                toast.error("Failed to create service")
            }
        }

        const updateService = async (
            id: string,
            updated: Partial<Service>,
            imageFiles?: File[]
        ) => {
            try {
                // Optimistic UI
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

                // ❗ FIX: use imageFiles
                const res = await servicesAPI.update(id, apiData, imageFiles)

                if (res.success) {
                    setServices(prev =>
                        prev.map(s =>
                            s._id === id
                                ? {
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
                                    images: res.service.images, // full updated images array
                                    slug: res.service.slug
                                }
                                : s
                        )
                    )
                }

                toast.success("Service updated successfully")
            } catch (err) {
                console.error("Failed to update service:", err)
                toast.error("Failed to update service")
            }
        }

        const deleteService = async (id: string) => {
            try {
                setServices(prev => prev.filter(s => s._id !== id))
                await servicesAPI.delete(id)
                toast.success("Service deleted successfully")
            } catch (err) {
                console.error("Failed to delete service:", err)
                toast.error("Failed to delete service")
                // Re-fetch or revert
            }
        }

        const addInsight = async (insight: Omit<Insight, "id">) => {
            try {
                const apiData: CreateBlogRequest = {
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
                    readTime: parseInt(insight.readTime) || 5,
                    images: insight.image ? [{ imageLink: insight.image }] : []
                }

                const res = await blogsAPI.create(apiData)
                if (res.success) {
                    const newInsight = {
                        ...insight,
                        _id: res.blog._id,
                        date: res.blog.createdAt,
                        createdAt: res.blog.createdAt
                    }
                    setInsights(prev => [...prev, newInsight])
                    toast.success("Insight created successfully")
                }
            } catch (err) {
                console.error("Failed to create insight:", err)
                toast.error("Failed to create insight")
            }
        }

        const updateInsight = async (id: string, updatedInsight: Partial<Insight>) => {
            try {
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
                if (updatedInsight.image) apiData.images = [{ imageLink: updatedInsight.image }]

                await blogsAPI.update(id, apiData)
                toast.success("Insight updated successfully")
            } catch (err) {
                console.error("Failed to update insight:", err)
                toast.error("Failed to update insight")
            }
        }

        const deleteInsight = async (id: string) => {
            try {
                setInsights(insights.filter((i) => i._id !== id))
                await blogsAPI.delete(id)
                toast.success("Insight deleted successfully")
            } catch (err) {
                console.error("Failed to delete insight:", err)
                toast.error("Failed to delete insight")
            }
        }

        const addCaseStudy = async (study: Omit<CaseStudy, "id">) => {
            try {
                const apiData = {
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
                        label_ar: s.labelAr,
                    })),

                    // 🔥 Correct: array of images
                    images: study.images?.map(link => ({ imageLink: link })) ?? [],

                    color: study.color || "#7B3FEF",
                }

                const response = await caseStudiesAPI.create(apiData)

                if (response.success) {
                    const mapped: CaseStudy = {
                        id: response.caseStudy._id,
                        title: response.caseStudy.title_en || "",
                        titleAr: response.caseStudy.title_ar || "",
                        institute: response.caseStudy.institute_en || "",
                        instituteAr: response.caseStudy.institute_ar || "",
                        category: response.caseStudy.category_en || "",
                        categoryAr: response.caseStudy.category_ar || "",
                        description: response.caseStudy.description_en || "",
                        descriptionAr: response.caseStudy.description_ar || "",
                        // 🔥 Correct: map full array of links
                        images: response.caseStudy.images?.map((img: any) => img.imageLink) || [],
                        // No more imageFile in returned data
                        imageFile: null,
                        color: response.caseStudy.color || "#7B3FEF",
                        href: `/case-studies/${response.caseStudy._id}`,
                    }

                    setCaseStudies([...caseStudies, mapped])
                    toast.success("Case study created successfully")
                }
            } catch (err) {
                console.error("Failed to create case study:", err)
                toast.error("Failed to create case study")
                throw err
            }
        }

        const updateCaseStudy = async (id: string, updatedStudy: Partial<CaseStudy>) => {
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

                // image: correctly map
                if (updatedStudy.images) {
                    apiData.images = [{ imageLink: updatedStudy.images }]
                }

                if (updatedStudy.color) apiData.color = updatedStudy.color

                if (updatedStudy.status) {
                    apiData.status = updatedStudy.status.map(s => ({
                        value: s.value,
                        label_en: s.label,
                        label_ar: s.labelAr
                    }))
                }

                await caseStudiesAPI.update(id, apiData)
                toast.success("Case study updated successfully")
            } catch (err) {
                setCaseStudies(caseStudies)
                console.error("Failed to update case study:", err)
                toast.error("Failed to update case study")
                throw err
            }
        }

        const deleteCaseStudy = async (id: string) => {
            try {
                // Optimistic delete
                setCaseStudies(caseStudies.filter((s) => s.id !== id))
                await caseStudiesAPI.delete(id)
                toast.success("Case study deleted successfully")
            } catch (err) {
                // Revert on error
                setCaseStudies(caseStudies)
                console.error("Failed to delete case study:", err)
                toast.error("Failed to delete case study")
                throw err
            }
        }

        async function addJob(job: any) {
            const res = await fetch("/api/careers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(job),
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.message || "Failed to create job")

            setJobs(prev => [...prev, data.career])
        }

        const updateJob = (id: string, updatedJob: Partial<Careers>) => {
            setJobs(jobs.map((j) => (j.id === id ? { ...j, ...updatedJob } : j)))
        }

        async function deleteJob(id: string) {
        const res = await jobsAPI.delete(id)
        if (!res || res.success === false) throw new Error(res?.message || "Delete failed")
        setJobs(prev => prev.filter(j => j.id !== id))
        }

    return (
        <DataContext.Provider
            value={{
                services,
                insights,
                caseStudies,
                jobs,
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





