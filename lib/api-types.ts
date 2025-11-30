// API Response Types
export interface APIResponse<T = any> {
    success: boolean
    message?: string
    data?: T
}

export interface APIError {
    success: false
    message: string
    error?: string
    statusCode?: number
}

// Service Types (Backend Schema)
export interface ServiceAPI {
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
    createdAt?: string
    updatedAt?: string
}

export interface CreateServiceRequest {
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
}

export interface UpdateServiceRequest extends Partial<CreateServiceRequest> { }

// Blog/Insight Types (Backend Schema)
export interface BlogAPI {
    _id: string
    title: {
        en: string
        ar?: string
    }
    content: {
        en: string
        ar?: string
    }
    author: {
        en: string
        ar?: string
    }
    category: {
        en: string
        ar?: string
    }
    readTime: number
    images: { imageLink: string }[]
    slug?: string
    createdAt: string
    updatedAt?: string
}

export interface CreateBlogRequest {
    title: {
        en: string
        ar?: string
    }
    content: {
        en: string
        ar?: string
    }
    author: {
        en: string
        ar?: string
    }
    category: {
        en: string
        ar?: string
    }
    readTime: number
    images?: { imageLink: string }[]
}

export interface UpdateBlogRequest extends Partial<CreateBlogRequest> { }

// Case Study Types
export interface CaseStudyAPI {
    _id: string
    title_en: string
    title_ar?: string
    institute_en: string
    institute_ar?: string
    category_en: string
    category_ar?: string
    description_en: string
    description_ar?: string
    status: { value: string; label_en: string; label_ar?: string }[]
    images: { imageLink: string; public_id?: string }[]
    customId?: string
    color?: string
    slug?: string
    createdAt?: string
    updatedAt?: string
}

export interface CreateCaseStudyRequest {
    title_en: string
    title_ar?: string
    institute_en: string
    institute_ar?: string
    category_en: string
    category_ar?: string
    description_en: string
    description_ar?: string
    status: { value: string; label_en: string; label_ar?: string }[]
    images: { imageLink: string }[]
    color: string
}

export interface UpdateCaseStudyRequest extends Partial<CreateCaseStudyRequest> { }

// Job Types
export interface JobAPI {
    _id: string
    title_en: string
    title_ar?: string
    department_en: string
    department_ar?: string
    location_en: string
    location_ar?: string
    type_en: string
    type_ar?: string
    description_en: string
    description_ar?: string
    requirements?: string[]
    responsibilities?: string[]
    createdAt?: string
    updatedAt?: string
}

export interface CreateJobRequest {
    title_en: string
    title_ar?: string
    department_en: string
    department_ar?: string
    location_en: string
    location_ar?: string
    type_en: string
    type_ar?: string
    description_en: string
    description_ar?: string
    requirements?: string[]
    responsibilities?: string[]
}

export interface UpdateJobRequest extends Partial<CreateJobRequest> { }

// User Types
export interface UserAPI {
    _id: string
    userName: string
    email: string
    role: string
    isActive: string
    customId?: string
    createdAt: string
    updatedAt: string
    token?: string
}

export interface CreateUserRequest {
    userName: string
    email: string
    password: string
    role?: string
    phone?: string
}

export interface UpdateUserRequest {
    userName?: string
    email?: string
    password?: string
    role?: string
    isActive?: string
}

// Authentication Types
export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    success: boolean
    message: string
    token?: string
    user?: {
        id: string
        email: string
        name?: string
        role?: string
    }
}

export interface AuthUser {
    id: string
    email: string
    name?: string
    role?: string
}

// Pagination Types
export interface PaginationParams {
    page?: number
    limit?: number
    sort?: string
    order?: "asc" | "desc"
}

export interface PaginatedResponse<T> {
    success: boolean
    data: T[]
    pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
    }
}
