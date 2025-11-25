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

export default function CaseStudiesDashboardPage() {
    const { caseStudies, deleteCaseStudy } = useData()
    const router = useRouter()
    const [showArabic, setShowArabic] = useState(true)
    const [isPending, startTransition] = useTransition()

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this case study?")) {
            deleteCaseStudy(id)
        }
    }

    const handleToggleLanguage = () => {
        startTransition(() => {
            setShowArabic(!showArabic)
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-heading tracking-tight">Case Studies</h1>
                    <p className="text-muted-foreground">Manage your success stories.</p>
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
                        <Link href="/dashboard/case-studies/new">
                            <Plus className="mr-2 h-4 w-4" /> Add New
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Institute</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Language</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {caseStudies.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                    No case studies found. Add one to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            caseStudies.map((study) => (
                                <TableRow key={study.id}>
                                    <TableCell className="font-medium">
                                        <div className="space-y-1">
                                            <div>{study.title}</div>
                                            {showArabic && (
                                                isPending ? (
                                                    <Skeleton className="h-4 w-48" />
                                                ) : study.titleAr ? (
                                                    <div className="text-sm text-muted-foreground transition-all duration-300" dir="rtl">
                                                        {study.titleAr}
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
                                            <div>{study.institute}</div>
                                            {showArabic && (
                                                isPending ? (
                                                    <Skeleton className="h-4 w-32" />
                                                ) : study.instituteAr ? (
                                                    <div className="text-sm text-muted-foreground transition-all duration-300" dir="rtl">
                                                        {study.instituteAr}
                                                    </div>
                                                ) : (
                                                    <div className="text-xs text-muted-foreground/60 italic" dir="rtl">-</div>
                                                )
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div>{study.category}</div>
                                            {showArabic && (
                                                isPending ? (
                                                    <Skeleton className="h-4 w-32" />
                                                ) : study.categoryAr ? (
                                                    <div className="text-sm text-muted-foreground transition-all duration-300" dir="rtl">
                                                        {study.categoryAr}
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
                                            {study.titleAr && (
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
                                                <DropdownMenuItem onClick={() => router.push(`/dashboard/case-studies/${study.id}`)}>
                                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleDelete(study.id)} className="text-destructive">
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
