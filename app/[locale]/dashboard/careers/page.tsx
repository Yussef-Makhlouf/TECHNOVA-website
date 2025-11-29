"use client"

import { useState, useTransition } from "react"
import { useData } from "@/lib/data-context"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Pencil, Trash, Languages } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Checkbox } from "@/components/ui/checkbox"
import { BulkActionsBar } from "@/components/dashboard/bulk-actions-bar"
import { toast } from "sonner"

export default function CareersDashboardPage() {
    const { jobs, deleteJob } = useData()
    const router = useRouter()
    const [showArabic, setShowArabic] = useState(true)
    const [isPending, startTransition] = useTransition()
    const [selectedJobs, setSelectedJobs] = useState<string[]>([])

    const handleDelete = (id: string) => {
        deleteJob(id)
        toast.success("Job deleted successfully")
    }

    const handleBulkDelete = () => {
        selectedJobs.forEach(id => deleteJob(id))
        setSelectedJobs([])
        toast.success(`${selectedJobs.length} job(s) deleted successfully`)
    }

    const handleToggleLanguage = () => {
        startTransition(() => {
            setShowArabic(!showArabic)
        })
    }

    const toggleJob = (id: string) => {
        setSelectedJobs(prev =>
            prev.includes(id) ? prev.filter(jobId => jobId !== id) : [...prev, id]
        )
    }

    const toggleAll = () => {
        setSelectedJobs(prev =>
            prev.length === jobs.length ? [] : jobs.map(j => j.id)
        )
    }

    const clearSelection = () => {
        setSelectedJobs([])
    }

    return (
        <div className="space-y-6">
            <BulkActionsBar
                selectedCount={selectedJobs.length}
                onClearSelection={clearSelection}
                onDelete={handleBulkDelete}
            />
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-heading tracking-tight">Careers</h1>
                    <p className="text-muted-foreground">Manage job openings.</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleToggleLanguage}
                        className="gap-2"
                        disabled={isPending}
                    >
                        <Languages className="h-4 w-4" />
                        {showArabic ? "عربي" : "EN"}
                    </Button>
                    <Button asChild>
                        <Link href="/dashboard/careers/new">
                            <Plus className="mr-2 h-4 w-4" /> Post Job
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">
                                <Checkbox
                                    checked={selectedJobs.length === jobs.length && jobs.length > 0}
                                    onCheckedChange={toggleAll}
                                    aria-label="Select all"
                                />
                            </TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Language</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                                    No job openings found. Post one to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            jobs.map((job) => (
                                <TableRow
                                    key={job.id}
                                    className={selectedJobs.includes(job.id) ? "bg-muted/50" : ""}
                                >
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedJobs.includes(job.id)}
                                            onCheckedChange={() => toggleJob(job.id)}
                                            aria-label={`Select ${job.title}`}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <div className="space-y-1">
                                            <div>{job.title}</div>
                                            {showArabic && (
                                                isPending ? (
                                                    <Skeleton className="h-4 w-48" />
                                                ) : job.titleAr ? (
                                                    <div className="text-sm text-muted-foreground transition-all duration-300" dir="rtl">
                                                        {job.titleAr}
                                                    </div>
                                                ) : (
                                                    <div className="text-xs text-muted-foreground/60 italic" dir="rtl">
                                                        لا يوجد عنوان بالعربية
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div>{job.department}</div>
                                            {showArabic && (
                                                isPending ? (
                                                    <Skeleton className="h-4 w-32" />
                                                ) : job.departmentAr ? (
                                                    <div className="text-sm text-muted-foreground transition-all duration-300" dir="rtl">
                                                        {job.departmentAr}
                                                    </div>
                                                ) : (
                                                    <div className="text-xs text-muted-foreground/60 italic" dir="rtl">-</div>
                                                )
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div>{job.location}</div>
                                            {showArabic && (
                                                isPending ? (
                                                    <Skeleton className="h-4 w-32" />
                                                ) : job.locationAr ? (
                                                    <div className="text-sm text-muted-foreground transition-all duration-300" dir="rtl">
                                                        {job.locationAr}
                                                    </div>
                                                ) : (
                                                    <div className="text-xs text-muted-foreground/60 italic" dir="rtl">-</div>
                                                )
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div>{job.type}</div>
                                            {showArabic && (
                                                isPending ? (
                                                    <Skeleton className="h-4 w-32" />
                                                ) : job.typeAr ? (
                                                    <div className="text-sm text-muted-foreground transition-all duration-300" dir="rtl">
                                                        {job.typeAr}
                                                    </div>
                                                ) : (
                                                    <div className="text-xs text-muted-foreground/60 italic" dir="rtl">-</div>
                                                )
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            <Badge variant="secondary" className="text-xs">EN</Badge>
                                            {job.titleAr && (
                                                <Badge variant="secondary" className="text-xs">AR</Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => router.push(`/dashboard/careers/${job.id}`)}>
                                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleDelete(job.id)} className="text-destructive">
                                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
