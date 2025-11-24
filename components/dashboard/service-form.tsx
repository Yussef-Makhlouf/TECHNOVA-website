"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useData, Service } from "@/lib/data-context"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, X, Save } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    titleAr: z.string().optional(),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    descriptionAr: z.string().optional(),
    features: z.array(z.string()).min(1, "At least one feature is required"),
    featuresAr: z.array(z.string()).optional(),
    iconName: z.string().optional(),
    color: z.string().optional(),
    image: z.string().min(1, {
        message: "Image is required.",
    }),
})

interface ServiceFormProps {
    initialData?: Service
    isEditing?: boolean
}

function FeatureInput({
    value = [],
    onChange,
    placeholder,
    dir = "ltr",
}: {
    value: string[]
    onChange: (value: string[]) => void
    placeholder?: string
    dir?: "ltr" | "rtl"
}) {
    const [inputValue, setInputValue] = useState("")

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addFeature()
        }
    }

    const addFeature = () => {
        if (inputValue.trim()) {
            const newValue = [...value, inputValue.trim()]
            onChange(newValue)
            setInputValue("")
        }
    }

    const removeFeature = (index: number) => {
        onChange(value.filter((_, i) => i !== index))
    }

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap gap-2 min-h-[2.5rem] p-1 rounded-md border border-dashed bg-muted/30">
                {value.length === 0 && (
                    <span className="text-sm text-muted-foreground p-2 italic">
                        {dir === "rtl" ? "لا توجد ميزات مضافة" : "No features added yet"}
                    </span>
                )}
                {value.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1 text-sm flex items-center gap-1 bg-background border shadow-sm">
                        {feature}
                        <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="ml-1 hover:text-destructive focus:outline-none rounded-full p-0.5 transition-colors"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </Badge>
                ))}
            </div>
            <div className="flex gap-2">
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className={dir === "rtl" ? "text-right" : ""}
                />
                <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    onClick={addFeature}
                    className="shrink-0"
                >
                    <Plus className="w-4 h-4" />
                </Button>
            </div>
            <p className="text-[0.8rem] text-muted-foreground">
                {dir === "rtl" ? "اضغط Enter لإضافة ميزة" : "Press Enter to add a feature"}
            </p>
        </div>
    )
}

export function ServiceForm({ initialData, isEditing = false }: ServiceFormProps) {
    const { addService, updateService } = useData()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || "",
            titleAr: initialData?.titleAr || "",
            description: initialData?.description || "",
            descriptionAr: initialData?.descriptionAr || "",
            features: initialData?.features || [],
            featuresAr: initialData?.featuresAr || [],
            // Default values for hidden fields
            iconName: initialData?.iconName || "Brain",
            color: initialData?.color || "#7B3FEF",
            image: initialData?.image || "",
        },
    })

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            form.setValue("image", imageUrl)
        }
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        const cleanValues = {
            ...values,
            features: values.features.filter(f => f.trim() !== ""),
            featuresAr: (values.featuresAr?.filter((f): f is string => !!f && f.trim() !== "") || []),
            href: initialData?.href || `/services/${values.title.toLowerCase().replace(/\s+/g, "-")}`,
            color: values.color || "#7B3FEF",
            iconName: values.iconName || "Brain",
        }

        if (isEditing && initialData) {
            updateService(initialData.id, cleanValues)
            toast.success("Service updated successfully")
        } else {
            addService(cleanValues)
            toast.success("Service created successfully")
        }

        router.push("/dashboard/services")
        router.refresh()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto">
                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Service Details</CardTitle>
                            <CardDescription>
                                Manage your service information in both English and Arabic.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="english" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 mb-6">
                                    <TabsTrigger value="english">English Content</TabsTrigger>
                                    <TabsTrigger value="arabic">Arabic Content</TabsTrigger>
                                </TabsList>

                                <TabsContent value="english" className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Service Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. AI & Machine Learning" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Brief description of the service..."
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="features"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Key Features</FormLabel>
                                                <FormControl>
                                                    <FeatureInput
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        placeholder="Type a feature and press Enter..."
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TabsContent>

                                <TabsContent value="arabic" className="space-y-6" dir="rtl">
                                    <FormField
                                        control={form.control}
                                        name="titleAr"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>عنوان الخدمة</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="مثال: الذكاء الاصطناعي" {...field} className="text-right" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="descriptionAr"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>الوصف</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="وصف مختصر للخدمة..."
                                                        className="text-right min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="featuresAr"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>الميزات الرئيسية</FormLabel>
                                                <FormControl>
                                                    <FeatureInput
                                                        value={field.value || []}
                                                        onChange={field.onChange}
                                                        placeholder="اكتب ميزة واضغط Enter..."
                                                        dir="rtl"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Media & Appearance</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Hidden fields for icon and color */}
                            <input type="hidden" {...form.register("iconName")} />
                            <input type="hidden" {...form.register("color")} />

                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cover Image</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-4">
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                        className="cursor-pointer"
                                                    />
                                                </div>
                                                {field.value && (
                                                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border bg-muted">
                                                        <img
                                                            src={field.value}
                                                            alt="Preview"
                                                            className="object-cover w-full h-full"
                                                        />
                                                    </div>
                                                )}
                                                {/* Hidden input to store the URL */}
                                                <input type="hidden" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            Recommended size: 1920x1080px. Max size: 5MB.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => router.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" className="min-w-[150px]">
                            <Save className="w-4 h-4 mr-2" />
                            {isEditing ? "Save Changes" : "Create Service"}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}

