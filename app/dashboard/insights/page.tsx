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

export default function InsightsDashboardPage() {
    const { insights, deleteInsight } = useData()
    const router = useRouter()

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this insight?")) {
            deleteInsight(id)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-heading tracking-tight">Insights</h1>
                    <p className="text-muted-foreground">Manage your industry insights and articles.</p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/insights/new">
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Link>
                </Button>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {insights.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                    No insights found. Add one to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            insights.map((insight) => (
                                <TableRow key={insight.id}>
                                    <TableCell className="font-medium">{insight.title}</TableCell>
                                    <TableCell>{insight.category}</TableCell>
                                    <TableCell>{insight.author}</TableCell>
                                    <TableCell>{insight.date}</TableCell>
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
                                                <DropdownMenuItem onClick={() => router.push(`/dashboard/insights/${insight.id}`)}>
                                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleDelete(insight.id)} className="text-destructive">
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
