/**
 * API Configuration
 * Centralized API endpoint configuration for the application
 */

export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://technova-main.vercel.app";

export const API_ENDPOINTS = {
    // Auth endpoints
    auth: {
        login: `${API_BASE_URL}/auth/login`,
        register: `${API_BASE_URL}/auth/register`,
        forgotPassword: `${API_BASE_URL}/auth/forgot-password`,
        resetPassword: `${API_BASE_URL}/auth/reset-password`,
    },

    // Services endpoints
    services: {
        getAll: `${API_BASE_URL}/services`,
        getById: (id: string) => `${API_BASE_URL}/services/${id}`,
        create: `${API_BASE_URL}/services`,
        update: (id: string) => `${API_BASE_URL}/services/${id}`,
        delete: (id: string) => `${API_BASE_URL}/services/${id}`,
        bulkDelete: `${API_BASE_URL}/services/bulk-delete`,
    },

    // Blogs endpoints
    blogs: {
        getAll: `${API_BASE_URL}/blogs`,
        getById: (id: string) => `${API_BASE_URL}/blogs/${id}`,
        create: `${API_BASE_URL}/blogs`,
        update: (id: string) => `${API_BASE_URL}/blogs/${id}`,
        delete: (id: string) => `${API_BASE_URL}/blogs/${id}`,
        bulkDelete: `${API_BASE_URL}/blogs/bulk-delete`,
    },

    // Case Studies endpoints
    caseStudies: {
        getAll: `${API_BASE_URL}/casestudies`,
        getById: (id: string) => `${API_BASE_URL}/casestudies/${id}`,
        create: `${API_BASE_URL}/casestudies`,
        update: (id: string) => `${API_BASE_URL}/casestudies/${id}`,
        delete: (id: string) => `${API_BASE_URL}/casestudies/${id}`,
        bulkDelete: `${API_BASE_URL}/casestudies/bulk-delete`,
    },

    // Careers endpoints
    careers: {
        getAll: `${API_BASE_URL}/careers`,
        getById: (id: string) => `${API_BASE_URL}/careers/${id}`,
        create: `${API_BASE_URL}/careers`,
        update: (id: string) => `${API_BASE_URL}/careers/${id}`,
        delete: (id: string) => `${API_BASE_URL}/careers/${id}`,
        apply: `${API_BASE_URL}/careers/apply`,
    },

    // Contact endpoint
    contact: `${API_BASE_URL}/contact`,

    // Users endpoints (admin)
    users: {
        getAll: `${API_BASE_URL}/users`,
        getById: (id: string) => `${API_BASE_URL}/users/${id}`,
        create: `${API_BASE_URL}/users`,
        update: (id: string) => `${API_BASE_URL}/users/${id}`,
        delete: (id: string) => `${API_BASE_URL}/users/${id}`,
    },
};
