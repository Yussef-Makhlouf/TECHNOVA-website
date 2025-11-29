# دليل استخدام نظام API المحسّن

## نظرة عامة

تم إعادة هيكلة نظام الـ API بالكامل لتوفير:
- ✅ **أداء محسّن** مع نظام Cache ذكي
- ✅ **منع الطلبات المكررة** (Request Deduplication)
- ✅ **دائماً 200 OK** بدلاً من 304 Not Modified
- ✅ **إعادة المحاولة التلقائية** عند فشل الطلبات
- ✅ **إدارة أفضل للأخطاء** مع رسائل واضحة
- ✅ **Loading States** و **Error States** لكل مورد
- ✅ **Optimistic Updates** مع Rollback عند الفشل
- ✅ **فصل واضح** بين APIs الموقع ولوحة التحكم

---

## البنية الجديدة

```
lib/
├── api-client.ts        # Enhanced API Client مع Caching
├── api-service.ts       # API Endpoints المنظمة
├── api-types.ts         # TypeScript Types
├── api-errors.ts        # Error Handling
├── data-context.tsx     # Global State Management
└── use-api.ts          # Custom React Hooks
```

---

## 1. استخدام Custom Hooks (موصى به للصفحات)

### مثال: جلب Case Study واحد

```tsx
import { useCaseStudy } from "@/lib/use-api"

function CaseStudyPage() {
    const { data, loading, error, refetch } = useCaseStudy("case-study-id")
    
    if (loading) return <LoadingSpinner />
    if (error) return <ErrorMessage error={error} />
    if (!data) return <NotFound />
    
    return (
        <div>
            <h1>{data.title_en}</h1>
            <button onClick={refetch}>Refresh</button>
        </div>
    )
}
```

### مثال: جلب جميع الخدمات

```tsx
import { useServices } from "@/lib/use-api"

function ServicesPage() {
    const { data: services, loading, error, refetch } = useServices()
    
    return (
        <div>
            {loading && <LoadingSpinner />}
            {error && <ErrorMessage error={error} />}
            {services.map(service => (
                <ServiceCard key={service._id} {...service} />
            ))}
        </div>
    )
}
```

### الـ Hooks المتاحة:

- `useService(id, options)` - جلب خدمة واحدة
- `useServices(options)` - جلب جميع الخدمات
- `useBlog(id, options)` - جلب مقال واحد
- `useBlogs(options)` - جلب جميع المقالات
- `useCaseStudy(id, options)` - جلب دراسة حالة واحدة
- `useCaseStudies(options)` - جلب جميع دراسات الحالة
- `useJob(id, options)` - جلب وظيفة واحدة
- `useJobs(options)` - جلب جميع الوظائف

### خيارات الـ Hooks:

```tsx
const options = {
    skipCache: false,    // تجاوز الـ Cache وجلب بيانات جديدة
    autoFetch: true      // جلب البيانات تلقائياً عند التحميل
}

const { data, loading, error, refetch } = useServices(options)
```

---

## 2. استخدام Data Context (للوحة التحكم)

### الوصول للبيانات

```tsx
import { useData } from "@/lib/data-context"

function Dashboard() {
    const { 
        services, 
        insights, 
        caseStudies, 
        jobs,
        loading,
        errors 
    } = useData()
    
    return (
        <div>
            {loading.services && <LoadingSpinner />}
            {errors.services && <ErrorMessage error={errors.services} />}
            {services.map(service => <ServiceCard key={service._id} {...service} />)}
        </div>
    )
}
```

### إضافة بيانات جديدة

```tsx
import { useData } from "@/lib/data-context"

function CreateServiceForm() {
    const { addService } = useData()
    
    const handleSubmit = async (formData, imageFile) => {
        try {
            await addService(formData, imageFile)
            toast.success("Service created!")
        } catch (error) {
            toast.error("Failed to create service")
        }
    }
    
    return <form onSubmit={handleSubmit}>...</form>
}
```

### تحديث البيانات

```tsx
const { updateService } = useData()

const handleUpdate = async (id, updates, imageFile) => {
    try {
        await updateService(id, updates, imageFile)
        // سيتم التحديث تلقائياً في الـ UI (Optimistic Update)
    } catch (error) {
        // سيتم الرجوع للحالة السابقة تلقائياً (Rollback)
        toast.error("Failed to update")
    }
}
```

### حذف البيانات

```tsx
const { deleteService } = useData()

const handleDelete = async (id) => {
    try {
        await deleteService(id)
        // سيتم الحذف من الـ UI فوراً
    } catch (error) {
        // سيتم استرجاع البيانات تلقائياً
        toast.error("Failed to delete")
    }
}
```

### تحديث البيانات يدوياً

```tsx
const { refreshServices, refreshAll } = useData()

// تحديث الخدمات فقط
await refreshServices()

// تحديث جميع البيانات
await refreshAll()
```

---

## 3. استخدام API Service مباشرة

### للعمليات المتقدمة

```tsx
import { servicesAPI, caseStudiesAPI } from "@/lib/api-service"

// جلب البيانات
const response = await servicesAPI.getAll()
if (response.success) {
    console.log(response.services)
}

// جلب بيانات محددة
const service = await servicesAPI.getById("service-id")

// تجاوز الـ Cache
const freshData = await servicesAPI.getAll(true)

// إنشاء جديد
const newService = await servicesAPI.create(data, imageFile)

// تحديث
const updated = await servicesAPI.update(id, data, imageFile)

// حذف
await servicesAPI.delete(id)
```

---

## 4. إدارة الـ Cache

### تنظيف الـ Cache

```tsx
import { clearAllCache, getCacheStats } from "@/lib/api-service"

// مسح جميع الـ Cache
clearAllCache()

// الحصول على إحصائيات الـ Cache
const stats = getCacheStats()
console.log(`Cache size: ${stats.size}`)
console.log(`Cached keys:`, stats.keys)
```

### Prefetching (تحميل مسبق)

```tsx
import { prefetchAllData, servicesAPI } from "@/lib/api-service"

// تحميل جميع البيانات في الخلفية
await prefetchAllData()

// تحميل الخدمات فقط
await servicesAPI.prefetch()
```

---

## 5. معالجة الأخطاء

### استخدام Try-Catch

```tsx
import { APIError, NetworkError } from "@/lib/api-errors"

try {
    await servicesAPI.create(data)
} catch (error) {
    if (error instanceof NetworkError) {
        toast.error("No internet connection")
    } else if (error instanceof APIError) {
        toast.error(error.message)
    } else {
        toast.error("An unexpected error occurred")
    }
}
```

### أنواع الأخطاء المتاحة:

- `ValidationError` (400) - خطأ في البيانات المدخلة
- `AuthenticationError` (401) - يتطلب تسجيل دخول
- `ForbiddenError` (403) - لا توجد صلاحيات
- `NotFoundError` (404) - المورد غير موجود
- `ConflictError` (409) - تعارض في البيانات
- `ServerError` (500) - خطأ في الخادم
- `NetworkError` - لا يوجد اتصال بالإنترنت

---

## 6. المصادقة (Authentication)

### تسجيل الدخول

```tsx
import { authAPI } from "@/lib/api-service"

const handleLogin = async (email, password) => {
    try {
        const response = await authAPI.login({ email, password })
        if (response.success) {
            // تم حفظ الـ Token تلقائياً
            router.push("/dashboard")
        }
    } catch (error) {
        toast.error("Invalid credentials")
    }
}
```

### تسجيل الخروج

```tsx
import { authAPI } from "@/lib/api-service"

const handleLogout = () => {
    authAPI.logout() // سيتم مسح الـ Token والـ Cache
    router.push("/login")
}
```

### التحقق من المصادقة

```tsx
import { authAPI } from "@/lib/api-service"

if (authAPI.isAuthenticated()) {
    // المستخدم مسجل دخول
} else {
    // المستخدم غير مسجل دخول
}
```

---

## 7. أفضل الممارسات

### ✅ استخدم Custom Hooks في الصفحات

```tsx
// ✅ جيد
function ServicePage() {
    const { data, loading, error } = useService(id)
    // ...
}

// ❌ تجنب
function ServicePage() {
    const [data, setData] = useState(null)
    useEffect(() => {
        servicesAPI.getById(id).then(setData)
    }, [id])
}
```

### ✅ استخدم Data Context في لوحة التحكم

```tsx
// ✅ جيد - للوحة التحكم
function DashboardServices() {
    const { services, addService, updateService } = useData()
    // ...
}

// ✅ جيد - للصفحات العامة
function PublicServices() {
    const { data: services } = useServices()
    // ...
}
```

### ✅ معالجة الأخطاء دائماً

```tsx
// ✅ جيد
try {
    await addService(data)
    toast.success("Success!")
} catch (error) {
    toast.error(error.message)
}

// ❌ تجنب
await addService(data) // قد يفشل بدون معالجة
```

### ✅ استخدم Optimistic Updates

```tsx
// ✅ جيد - يتم تلقائياً في Data Context
const { updateService } = useData()
await updateService(id, updates) // UI يتحدث فوراً

// ❌ تجنب - انتظار الاستجابة
const response = await servicesAPI.update(id, updates)
setServices(response.services) // بطيء
```

---

## 8. حل المشاكل الشائعة

### المشكلة: البيانات لا تتحدث

```tsx
// الحل: استخدم refresh
const { refreshServices } = useData()
await refreshServices()

// أو تجاوز الـ Cache
const { data } = useServices({ skipCache: true })
```

### المشكلة: 304 Not Modified

```tsx
// الحل: النظام الجديد يمنع 304 تلقائياً
// جميع الطلبات تحتوي على Cache-Control headers
```

### المشكلة: طلبات مكررة

```tsx
// الحل: النظام الجديد يمنع الطلبات المكررة تلقائياً
// Request Deduplication مفعّل افتراضياً
```

### المشكلة: بطء في التحميل

```tsx
// الحل: استخدم Prefetching
import { prefetchAllData } from "@/lib/api-service"

useEffect(() => {
    prefetchAllData() // تحميل في الخلفية
}, [])
```

---

## 9. الفروقات بين الموقع ولوحة التحكم

### الموقع العام (Public Pages)
- استخدم **Custom Hooks** (`useServices`, `useCaseStudies`, etc.)
- البيانات للقراءة فقط
- Cache مفعّل افتراضياً
- أداء محسّن للزوار

### لوحة التحكم (Dashboard)
- استخدم **Data Context** (`useData`)
- عمليات CRUD كاملة
- Optimistic Updates
- Rollback تلقائي عند الفشل

---

## 10. مثال كامل

### صفحة عرض الخدمات (Public)

```tsx
"use client"

import { useServices } from "@/lib/use-api"
import { ServiceCard } from "@/components/service-card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorMessage } from "@/components/error-message"

export default function ServicesPage() {
    const { data: services, loading, error, refetch } = useServices()
    
    if (loading) {
        return <LoadingSpinner />
    }
    
    if (error) {
        return (
            <ErrorMessage 
                error={error} 
                onRetry={refetch}
            />
        )
    }
    
    return (
        <div className="container">
            <h1>Our Services</h1>
            <div className="grid">
                {services.map(service => (
                    <ServiceCard 
                        key={service._id} 
                        {...service} 
                    />
                ))}
            </div>
        </div>
    )
}
```

### صفحة إدارة الخدمات (Dashboard)

```tsx
"use client"

import { useData } from "@/lib/data-context"
import { useState } from "react"
import { toast } from "sonner"

export default function ManageServicesPage() {
    const { 
        services, 
        loading, 
        errors,
        addService, 
        updateService, 
        deleteService,
        refreshServices 
    } = useData()
    
    const [isCreating, setIsCreating] = useState(false)
    
    const handleCreate = async (formData, imageFile) => {
        setIsCreating(true)
        try {
            await addService(formData, imageFile)
            toast.success("Service created successfully!")
        } catch (error) {
            toast.error("Failed to create service")
        } finally {
            setIsCreating(false)
        }
    }
    
    const handleUpdate = async (id, updates, imageFile) => {
        try {
            await updateService(id, updates, imageFile)
            toast.success("Service updated!")
        } catch (error) {
            toast.error("Failed to update service")
        }
    }
    
    const handleDelete = async (id) => {
        if (!confirm("Are you sure?")) return
        
        try {
            await deleteService(id)
            toast.success("Service deleted!")
        } catch (error) {
            toast.error("Failed to delete service")
        }
    }
    
    return (
        <div className="dashboard">
            <div className="header">
                <h1>Manage Services</h1>
                <button onClick={refreshServices}>
                    Refresh
                </button>
            </div>
            
            {loading.services && <LoadingSpinner />}
            {errors.services && <ErrorMessage error={errors.services} />}
            
            <CreateServiceForm 
                onSubmit={handleCreate}
                isLoading={isCreating}
            />
            
            <div className="services-list">
                {services.map(service => (
                    <ServiceItem
                        key={service._id}
                        service={service}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    )
}
```

---

## الخلاصة

النظام الجديد يوفر:

1. **أداء أفضل** - مع Caching و Request Deduplication
2. **تجربة مستخدم محسّنة** - مع Optimistic Updates
3. **كود أنظف** - مع Custom Hooks و Data Context
4. **معالجة أخطاء أفضل** - مع Error States و Retry Logic
5. **فصل واضح** - بين الموقع ولوحة التحكم
6. **دائماً 200 OK** - بدون 304 Not Modified
7. **لا طلبات مكررة** - Request Deduplication تلقائي

استخدم Custom Hooks للصفحات العامة، و Data Context للوحة التحكم، وستحصل على أفضل أداء وتجربة مستخدم! 🚀
