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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useData, Job } from "@/lib/data-context"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    titleAr: z.string().optional(),
    department: z.string().min(2, {
        message: "Department is required.",
    }),
    departmentAr: z.string().optional(),
    location: z.string().min(2, {
        message: "Location is required.",
    }),
    locationAr: z.string().optional(),
    type: z.string().min(2, {
        message: "Job type is required.",
    }),
    typeAr: z.string().optional(),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    descriptionAr: z.string().optional(),
})

interface JobFormProps {
    initialData?: Job
    isEditing?: boolean
}

export function JobForm({ initialData, isEditing = false }: JobFormProps) {
    const { addJob, updateJob } = useData()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || "",
            titleAr: initialData?.titleAr || "",
            department: initialData?.department || "",
            departmentAr: initialData?.departmentAr || "",
            location: initialData?.location || "",
            locationAr: initialData?.locationAr || "",
            type: initialData?.type || "Full-time",
            typeAr: initialData?.typeAr || "",
            description: initialData?.description || "",
            descriptionAr: initialData?.descriptionAr || "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (isEditing && initialData) {
            updateJob(initialData.id, values)
            toast.success("Job updated successfully")
        } else {
            addJob(values)
            toast.success("Job created successfully")
        }

        router.push("/dashboard/careers")
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
                                    <FormLabel>Job Title (English)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Senior Software Engineer" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="department"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Department (English)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Engineering" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location (English)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Remote, New York" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Employment Type (English)</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Full-time">Full-time</SelectItem>
                                            <SelectItem value="Part-time">Part-time</SelectItem>
                                            <SelectItem value="Contract">Contract</SelectItem>
                                            <SelectItem value="Freelance">Freelance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Description (English)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Detailed job description..."
                                            className="min-h-[150px]"
                                            {...field}
                                        />
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
                                    <FormLabel>Job Title (Arabic)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="عنوان الوظيفة" {...field} className="text-right" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="departmentAr"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Department (Arabic)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="القسم" {...field} className="text-right" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="locationAr"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location (Arabic)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="الموقع" {...field} className="text-right" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="typeAr"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Employment Type (Arabic)</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="flex-row-reverse">
                                                <SelectValue placeholder="اختر النوع" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent dir="rtl">
                                            <SelectItem value="Full-time">دوام كامل</SelectItem>
                                            <SelectItem value="Part-time">دوام جزئي</SelectItem>
                                            <SelectItem value="Contract">عقد</SelectItem>
                                            <SelectItem value="Freelance">عمل حر</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="descriptionAr"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Description (Arabic)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="وصف الوظيفة..."
                                            className="min-h-[150px] text-right"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </TabsContent>
                </Tabs>

                <Button type="submit">{isEditing ? "Update Job" : "Post Job"}</Button>
            </form>
        </Form>
    )
}
