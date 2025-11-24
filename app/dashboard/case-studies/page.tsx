"use client"

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
import { Plus, MoreHorizontal, Pencil, Trash } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CaseStudiesDashboardPage() {
    const { caseStudies, deleteCaseStudy } = useData()
    const router = useRouter()

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this case study?")) {
            deleteCaseStudy(id)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-heading tracking-tight">Case Studies</h1>
                    <p className="text-muted-foreground">Manage your success stories.</p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/case-studies/new">
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Link>
                </Button>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Institute</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {caseStudies.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                    No case studies found. Add one to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            caseStudies.map((study) => (
                                <TableRow key={study.id}>
                                    <TableCell className="font-medium">{study.title}</TableCell>
                                    <TableCell>{study.institute}</TableCell>
                                    <TableCell>{study.category}</TableCell>
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
