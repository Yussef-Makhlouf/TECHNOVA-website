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
import { useData, Insight } from "@/lib/data-context"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    titleAr: z.string().optional(),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    descriptionAr: z.string().optional(),
    author: z.string().min(2, {
        message: "Author name is required.",
    }),
    authorAr: z.string().optional(),
    date: z.string().min(1, {
        message: "Date is required.",
    }),
    readTime: z.string().min(1, {
        message: "Read time is required.",
    }),
    category: z.string().min(1, {
        message: "Category is required.",
    }),
    categoryAr: z.string().optional(),
    image: z.string().optional(), // Optional because it's not required when editing
    iconName: z.string().optional(),
    color: z.string().optional(),
})

interface InsightFormProps {
    initialData?: Insight
    isEditing?: boolean
}

export function InsightForm({ initialData, isEditing = false }: InsightFormProps) {
    const { addInsight, updateInsight } = useData()
    const router = useRouter()
    const [imageFile, setImageFile] = useState<File | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || "",
            titleAr: initialData?.titleAr || "",
            description: initialData?.description || "",
            descriptionAr: initialData?.descriptionAr || "",
            author: initialData?.author || "",
            authorAr: initialData?.authorAr || "",
            date: initialData?.date || "",
            readTime: initialData?.readTime || "",
            category: initialData?.category || "",
            categoryAr: initialData?.categoryAr || "",
            // Default values for hidden fields
            iconName: initialData?.iconName || "Lightbulb",
            color: initialData?.color || "#7B3FEF",
            image: initialData?.image || "",
        },
    })

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageFile(file) // Store the actual file
            const imageUrl = URL.createObjectURL(file)
            form.setValue("image", imageUrl) // Store preview URL for display
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // For new insights, image is required
            if (!isEditing && !values.image && !imageFile) {
                toast.error("Please upload an image")
                return
            }

            const insightData = {
                ...values,
                color: values.color || "#7B3FEF",
                iconName: values.iconName || "Lightbulb",
                href: initialData?.href || `/insights/${values.title.toLowerCase().replace(/\s+/g, "-")}`,
            }

            if (isEditing && initialData) {
                // Pass imageFile if a new image was uploaded
                await updateInsight(initialData._id, insightData, imageFile || undefined)
            } else {
                // Pass the file object to addInsight
                await addInsight(insightData, imageFile!)
            }

            router.push("/dashboard/insights")
            router.refresh()
        } catch (error) {
            // Error already handled by data context
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
                <Tabs defaultValue="english" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="english">English</TabsTrigger>
                        <TabsTrigger value="arabic">Arabic</TabsTrigger>
                    </TabsList>

                    <TabsContent value="english" className="space-y-6 mt-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title (English)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Insight Title" {...field} />
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
                                    <FormLabel>Description (English)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Insight Description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="author"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Author (English)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Author Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category (English)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Technology" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="arabic" className="space-y-6 mt-6" dir="rtl">
                        <FormField
                            control={form.control}
                            name="titleAr"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title (Arabic)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="عنوان الرؤية" {...field} className="text-right" />
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
                                    <FormLabel>Description (Arabic)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="وصف الرؤية" {...field} className="text-right" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="authorAr"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Author (Arabic)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="اسم المؤلف" {...field} className="text-right" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="categoryAr"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category (Arabic)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="الفئة" {...field} className="text-right" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                    <Input placeholder="Jan 01, 2025" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="readTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Read Time</FormLabel>
                                <FormControl>
                                    <Input placeholder="5 min read" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Hidden fields for icon and color */}
                <input type="hidden" {...form.register("iconName")} />
                <input type="hidden" {...form.register("color")} />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Insight Image</FormLabel>
                            <FormControl>
                                <div className="space-y-4">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                    {field.value && (
                                        <div className="relative w-full h-48 rounded-lg overflow-hidden border">
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
                                Upload a cover image for the insight.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">{isEditing ? "Update Insight" : "Create Insight"}</Button>
            </form>
        </Form>
    )
}
