"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { Brain, Cloud, Shield, Sparkles, Database, Code, Cpu, Network, TrendingUp, Lightbulb, BookOpen } from "lucide-react"

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
    stats: { value: string; label: string; labelAr?: string }[]
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
}

type DataContextType = {
    services: Service[]
    insights: Insight[]
    caseStudies: CaseStudy[]
    jobs: Job[]
    addService: (service: Omit<Service, "id">) => void
    updateService: (id: string, service: Partial<Service>) => void
    deleteService: (id: string) => void
    addInsight: (insight: Omit<Insight, "id">) => void
    updateInsight: (id: string, insight: Partial<Insight>) => void
    deleteInsight: (id: string) => void
    addCaseStudy: (study: Omit<CaseStudy, "id">) => void
    updateCaseStudy: (id: string, study: Partial<CaseStudy>) => void
    deleteCaseStudy: (id: string) => void
    addJob: (job: Omit<Job, "id">) => void
    updateJob: (id: string, job: Partial<Job>) => void
    deleteJob: (id: string) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

// Initial Data
const initialServices: Service[] = []


 const initialInsights: Insight[] = []
// [
//     {
//         id: "1",
//         iconName: "TrendingUp",
//         title: "Market Trends 2025",
//         description:
//             "Comprehensive analysis of emerging technology trends that will shape the enterprise landscape in 2025.",
//         author: "Research Team",
//         date: "Jan 18, 2025",
//         readTime: "12 min read",
//         category: "Market Analysis",
//         color: "#7B3FEF",
//         href: "/insights/market-trends-2025",
//         image: "/technology-research-data-analytics.jpg",
//     },
//     {
//         id: "2",
//         iconName: "Lightbulb",
//         title: "Innovation in Cloud Computing",
//         description: "How next-generation cloud technologies are enabling unprecedented scalability and performance.",
//         author: "Cloud Team",
//         date: "Jan 16, 2025",
//         readTime: "10 min read",
//         category: "Technology",
//         color: "#00D9FF",
//         href: "/insights/innovation-cloud-computing",
//         image: "/cloud-migration-concept.png",
//     },
//     {
//         id: "3",
//         iconName: "BookOpen",
//         title: "Digital Transformation Framework",
//         description:
//             "A strategic framework for organizations embarking on comprehensive digital transformation initiatives.",
//         author: "Strategy Team",
//         date: "Jan 14, 2025",
//         readTime: "15 min read",
//         category: "Strategy",
//         color: "#7B3FEF",
//         href: "/insights/digital-transformation-framework",
//         image: "/digital-transformation-business.png",
//     },
//     {
//         id: "4",
//         iconName: "TrendingUp",
//         title: "AI Adoption in Healthcare",
//         description: "Examining the impact of artificial intelligence on healthcare delivery and patient outcomes.",
//         author: "Industry Analysts",
//         date: "Jan 12, 2025",
//         readTime: "11 min read",
//         category: "Industry Insights",
//         color: "#00D9FF",
//         href: "/insights/ai-healthcare",
//         image: "/medical-ai.png",
//     },
//     {
//         id: "5",
//         iconName: "Lightbulb",
//         title: "Cybersecurity Best Practices",
//         description: "Essential security strategies for protecting enterprise assets in an increasingly connected world.",
//         author: "Security Team",
//         date: "Jan 10, 2025",
//         readTime: "9 min read",
//         category: "Security",
//         color: "#7B3FEF",
//         href: "/insights/cybersecurity-best-practices",
//         image: "/cybersecurity-network.jpg",
//     },
//     {
//         id: "6",
//         iconName: "BookOpen",
//         title: "The Future of Work",
//         description: "How technology is reshaping workplace dynamics, collaboration, and employee experiences.",
//         author: "Future of Work Team",
//         date: "Jan 8, 2025",
//         readTime: "13 min read",
//         category: "Workforce",
//         color: "#00D9FF",
//         href: "/insights/future-of-work",
//         image: "/professional-woman-ceo-tech.jpg",
//     },
// ]

const initialCaseStudies: CaseStudy[] = [
    {
        id: "1",
        title: "Global Bank Digital Transformation",
        institute: "Fortune 500 Financial Institution",
        category: "Digital Transformation",
        description: "Complete digital overhaul of legacy banking systems, implementing cloud infrastructure and AI-powered customer service.",
        stats: [
            { value: "60%", label: "Cost Reduction" },
            { value: "3x", label: "Faster Processing" },
            { value: "95%", label: "Customer Satisfaction" },
        ],
        image: "/modern-banking-technology.jpg",
        color: "#7B3FEF",
        href: "/case-studies/global-bank-transformation",
    },
    {
        id: "2",
        title: "E-Commerce Platform Scaling",
        institute: "Leading Retail Brand",
        category: "Cloud Infrastructure",
        description: "Migrated e-commerce platform to cloud, implementing auto-scaling and microservices architecture.",
        stats: [
            { value: "10x", label: "Traffic Capacity" },
            { value: "99.99%", label: "Uptime" },
            { value: "40%", label: "Cost Savings" },
        ],
        image: "/e-commerce-cloud-platform.jpg",
        color: "#00D9FF",
        href: "/case-studies/ecommerce-scaling",
    },
    {
        id: "3",
        title: "Healthcare AI Diagnostics",
        institute: "Medical Research Institute",
        category: "AI & Machine Learning",
        description: "Developed AI-powered diagnostic system for early disease detection using deep learning models.",
        stats: [
            { value: "94%", label: "Accuracy Rate" },
            { value: "70%", label: "Faster Diagnosis" },
            { value: "50K+", label: "Patients Helped" },
        ],
        image: "/medical-ai.png",
        color: "#7B3FEF",
        href: "/case-studies/healthcare-ai",
    },
    {
        id: "4",
        title: "Smart Manufacturing IoT",
        institute: "Industrial Manufacturing Corp",
        category: "IoT Solutions",
        description: "Implemented IoT sensors and predictive maintenance system across manufacturing facilities.",
        stats: [
            { value: "45%", label: "Downtime Reduction" },
            { value: "$2M", label: "Annual Savings" },
            { value: "85%", label: "Efficiency Gain" },
        ],
        image: "/smart-factory-iot.jpg",
        color: "#00D9FF",
        href: "/case-studies/smart-manufacturing",
    },
    {
        id: "5",
        title: "Cybersecurity Infrastructure",
        institute: "Tech Startup Unicorn",
        category: "Cybersecurity",
        description: "Built comprehensive security infrastructure with threat detection and incident response systems.",
        stats: [
            { value: "100%", label: "Threat Prevention" },
            { value: "24/7", label: "Monitoring" },
            { value: "0", label: "Security Breaches" },
        ],
        image: "/cybersecurity-network.jpg",
        color: "#7B3FEF",
        href: "/case-studies/cybersecurity-infrastructure",
    },
    {
        id: "6",
        title: "Supply Chain Optimization",
        institute: "Global Logistics Company",
        category: "Data Engineering",
        description: "Created real-time analytics platform for supply chain visibility and optimization.",
        stats: [
            { value: "35%", label: "Faster Delivery" },
            { value: "25%", label: "Cost Reduction" },
            { value: "100%", label: "Visibility" },
        ],
        image: "/supply-chain-analytics.jpg",
        color: "#00D9FF",
        href: "/case-studies/supply-chain-optimization",
    },
]

const initialJobs: Job[] = [
    {
        id: "1",
        title: "Senior AI Engineer",
        department: "Engineering",
        location: "San Francisco, CA",
        type: "Full-time",
        description:
            "Build cutting-edge AI solutions for enterprise clients using the latest machine learning technologies.",
    },
    {
        id: "2",
        title: "Cloud Solutions Architect",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        description: "Design and implement scalable cloud architectures for Fortune 500 companies.",
    },
    {
        id: "3",
        title: "Cybersecurity Analyst",
        department: "Security",
        location: "New York, NY",
        type: "Full-time",
        description: "Protect our clients from evolving cyber threats with advanced security solutions.",
    },
    {
        id: "4",
        title: "Product Manager",
        department: "Product",
        location: "San Francisco, CA",
        type: "Full-time",
        description: "Lead product strategy and development for our enterprise software solutions.",
    },
    {
        id: "5",
        title: "UX/UI Designer",
        department: "Design",
        location: "Remote",
        type: "Full-time",
        description: "Create beautiful, intuitive user experiences for our technology platforms.",
    },
    {
        id: "6",
        title: "DevOps Engineer",
        department: "Engineering",
        location: "Austin, TX",
        type: "Full-time",
        description: "Build and maintain CI/CD pipelines and infrastructure automation.",
    },
]

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [services, setServices] = useState<Service[]>(initialServices)
    const [insights, setInsights] = useState<Insight[]>(initialInsights)
    const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(initialCaseStudies)
    const [jobs, setJobs] = useState<Job[]>(initialJobs)

        const API_BASE = "http://localhost:8080/api/v1"
  // 🔥 Fetch services from backend
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch(`${API_BASE}/services`)
                const data = await res.json()
                if (data.success) {
                    console.log(data.services);
                    setServices(data.services)
                }
            } catch (err) {
                console.error("Failed to fetch services:", err)
            }
        };
        const fetchInsites = async () => {
            try {
                const res = await fetch(`${API_BASE}/blogs`)
                const data = await res.json()
              if (data.success && data.blogs) {
                console.log(data.blogs);
                
                const mapped = data.blogs.map((blog: any) => ({
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

                    image: blog.images?.[0]?.imageLink || ""
                }))

                setInsights(mapped)
                }
            } catch (err) {
                console.error("Failed to fetch blogs:", err)
            }
        }

        fetchServices(),
        fetchInsites()
    }, [])

    const addService = (service: Omit<Service, "_id">) => {
        setServices(prev => [...prev, { ...service, _id: crypto.randomUUID() }])
    }

    const updateService = (id: string, updated: Partial<Service>) => {
        setServices(prev =>
            prev.map(s => (s._id === id ? { ...s, ...updated } : s))
        )
    }

    const deleteService = (id: string) => {
        setServices(prev => prev.filter(s => s._id !== id))
    }

    const addInsight = (insight: Omit<Insight, "id">) => {
        const newInsight = { ...insight, id: Math.random().toString(36).substr(2, 9) }
        setInsights([...insights, newInsight])
    }

    const updateInsight = (id: string, updatedInsight: Partial<Insight>) => {
        setInsights(insights.map((i) => (i._id === id ? { ...i, ...updatedInsight } : i)))
    }

    const deleteInsight = (id: string) => {
        setInsights(insights.filter((i) => i._id !== id))
    }

    const addCaseStudy = (study: Omit<CaseStudy, "id">) => {
        const newStudy = { ...study, id: Math.random().toString(36).substr(2, 9) }
        setCaseStudies([...caseStudies, newStudy])
    }

    const updateCaseStudy = (id: string, updatedStudy: Partial<CaseStudy>) => {
        setCaseStudies(caseStudies.map((s) => (s.id === id ? { ...s, ...updatedStudy } : s)))
    }

    const deleteCaseStudy = (id: string) => {
        setCaseStudies(caseStudies.filter((s) => s.id !== id))
    }

    const addJob = (job: Omit<Job, "id">) => {
        const newJob = { ...job, id: Math.random().toString(36).substr(2, 9) }
        setJobs([...jobs, newJob])
    }

    const updateJob = (id: string, updatedJob: Partial<Job>) => {
        setJobs(jobs.map((j) => (j.id === id ? { ...j, ...updatedJob } : j)))
    }

    const deleteJob = (id: string) => {
        setJobs(jobs.filter((j) => j.id !== id))
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
