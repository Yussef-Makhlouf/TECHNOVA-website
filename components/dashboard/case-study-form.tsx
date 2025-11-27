"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
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
import { useData, CaseStudy } from "@/lib/data-context"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Plus, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    titleAr: z.string().optional(),
    institute: z.string().min(2, {
        message: "Institute/Client name is required.",
    }),
    instituteAr: z.string().optional(),
    category: z.string().min(2, {
        message: "Category is required.",
    }),
    categoryAr: z.string().optional(),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    descriptionAr: z.string().optional(),
    image: z.string().min(1, {
        message: "Image is required.",
    }),
    color: z.string().optional(),
    status: z.array(
        z.object({
            value: z.string().min(1, "Value is required"),
            label: z.string().min(1, "Label is required"),
            labelAr: z.string().optional(),
        })
    ).min(1, "At least one stat is required"),
})

interface CaseStudyFormProps {
    initialData?: CaseStudy
    isEditing?: boolean
}

export function CaseStudyForm({ initialData, isEditing = false }: CaseStudyFormProps) {
    const { addCaseStudy, updateCaseStudy } = useData()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || "",
            titleAr: initialData?.titleAr || "",
            institute: initialData?.institute || "",
            instituteAr: initialData?.instituteAr || "",
            category: initialData?.category || "",
            categoryAr: initialData?.categoryAr || "",
            description: initialData?.description || "",
            descriptionAr: initialData?.descriptionAr || "",
            // Default values for hidden fields
            color: initialData?.color || "#7B3FEF",
            image: initialData?.image || "",
            status: initialData?.status || [{ value: "", label: "", labelAr: "" }],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "status",
    })

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            form.setValue("image", imageUrl)
        }
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        const caseStudyData = {
            ...values,
            color: values.color || "#7B3FEF",
            href: initialData?.href || `/case-studies/${values.title.toLowerCase().replace(/\s+/g, "-")}`,
        }

        if (isEditing && initialData) {
            updateCaseStudy(initialData.id, caseStudyData)
            toast.success("Case Study updated successfully")
        } else {
            addCaseStudy(caseStudyData)
            toast.success("Case Study created successfully")
        }

        router.push("/dashboard/case-studies")
        router.refresh()
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
                                        <Input placeholder="Case Study Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="institute"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Client/Institute (English)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Client Name" {...field} />
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
                                            <Input placeholder="e.g. Fintech, Healthcare" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description (English)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Case Study Description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </TabsContent>

                    <TabsContent value="arabic" className="space-y-6 mt-6" dir="rtl">
                        <FormField
                            control={form.control}
                            name="titleAr"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title (Arabic)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="عنوان دراسة الحالة" {...field} className="text-right" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="instituteAr"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Client/Institute (Arabic)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="اسم العميل" {...field} className="text-right" />
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

                        <FormField
                            control={form.control}
                            name="descriptionAr"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description (Arabic)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="وصف دراسة الحالة" {...field} className="text-right" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </TabsContent>
                </Tabs>

                {/* Hidden fields for color */}
                <input type="hidden" {...form.register("color")} />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Case Study Image</FormLabel>
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
                                Upload a cover image for the case study.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <FormLabel>Key Statistics</FormLabel>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => append({ value: "", label: "", labelAr: "" })}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Stat
                        </Button>
                    </div>
                    {fields.map((field, index) => (
                        <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                            <div className="flex gap-4 items-start">
                                <FormField
                                    control={form.control}
                                    name={`status.${index}.value`}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel className="text-xs">Value</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. 50%" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="mt-8"
                                    onClick={() => remove(index)}
                                    disabled={fields.length === 1}
                                >
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name={`status.${index}.label`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs">Label (English)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Growth" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`status.${index}.labelAr`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs">Label (Arabic)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="النمو" {...field} className="text-right" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    ))}
                    <FormMessage>{form.formState.errors.status?.root?.message}</FormMessage>
                </div>

                <Button type="submit">{isEditing ? "Update Case Study" : "Create Case Study"}</Button>
            </form>
        </Form>
    )
}

