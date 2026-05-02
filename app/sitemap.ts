import { MetadataRoute } from 'next'

const BASE_URL = 'https://globaltechnova.com'
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.globaltechnova.com/api/v1'

// All available locales
const locales = ['en', 'ar']

// Static pages for the website
const staticPages = [
    '',           // Homepage
    '/about',
    '/services',
    '/contact',
    '/blog',
    '/careers',
    '/case-studies',
    '/insights',
]

// Types for API responses
interface ServiceAPI {
    _id: string
    updatedAt?: string
    createdAt?: string
}

interface BlogAPI {
    _id: string
    updatedAt?: string
    createdAt?: string
}

interface CaseStudyAPI {
    _id: string
    updatedAt?: string
    createdAt?: string
}

/**
 * Fetch services from API
 */
async function fetchServices(): Promise<ServiceAPI[]> {
    try {
        const response = await fetch(`${API_URL}/services`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        })
        if (!response.ok) return []
        const data = await response.json()
        return data.services || []
    } catch (error) {
        console.error('Failed to fetch services for sitemap:', error)
        return []
    }
}

/**
 * Fetch blogs/insights from API
 */
async function fetchBlogs(): Promise<BlogAPI[]> {
    try {
        const response = await fetch(`${API_URL}/blogs`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        })
        if (!response.ok) return []
        const data = await response.json()
        return data.blogs || []
    } catch (error) {
        console.error('Failed to fetch blogs for sitemap:', error)
        return []
    }
}

/**
 * Fetch case studies from API
 */
async function fetchCaseStudies(): Promise<CaseStudyAPI[]> {
    try {
        const response = await fetch(`${API_URL}/case_study`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        })
        if (!response.ok) return []
        const data = await response.json()
        return data.caseStudies || []
    } catch (error) {
        console.error('Failed to fetch case studies for sitemap:', error)
        return []
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const routes: MetadataRoute.Sitemap = []

    // Fetch dynamic content from API
    const [services, blogs, caseStudies] = await Promise.all([
        fetchServices(),
        fetchBlogs(),
        fetchCaseStudies()
    ])

    // Generate URLs for each locale and static page
    for (const locale of locales) {
        for (const page of staticPages) {
            routes.push({
                url: `${BASE_URL}/${locale}${page}`,
                lastModified: new Date(),
                changeFrequency: page === '' ? 'daily' : 'weekly',
                priority: page === '' ? 1.0 : 0.8,
            })
        }
    }

    // Add dynamic service pages from database
    for (const locale of locales) {
        for (const service of services) {
            routes.push({
                url: `${BASE_URL}/${locale}/services/${service._id}`,
                lastModified: service.updatedAt ? new Date(service.updatedAt) : new Date(),
                changeFrequency: 'weekly',
                priority: 0.7,
            })
        }
    }

    // Add dynamic insight/blog pages from database
    for (const locale of locales) {
        for (const blog of blogs) {
            routes.push({
                url: `${BASE_URL}/${locale}/insights/${blog._id}`,
                lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
                changeFrequency: 'weekly',
                priority: 0.6,
            })
        }
    }

    // Add dynamic case study pages from database
    for (const locale of locales) {
        for (const caseStudy of caseStudies) {
            routes.push({
                url: `${BASE_URL}/${locale}/case-studies/${caseStudy._id}`,
                lastModified: caseStudy.updatedAt ? new Date(caseStudy.updatedAt) : new Date(),
                changeFrequency: 'monthly',
                priority: 0.6,
            })
        }
    }

    return routes
}
