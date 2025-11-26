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

export default function InsightsDashboardPage() {
    const { insights, deleteInsight } = useData()
    const router = useRouter()
    const [showArabic, setShowArabic] = useState(true)
    const [isPending, startTransition] = useTransition()
    const [selectedInsights, setSelectedInsights] = useState<string[]>([])

    const handleDelete = (id: string) => {
        deleteInsight(id)
        toast.success("Insight deleted successfully")
    }

    const handleBulkDelete = () => {
        selectedInsights.forEach(id => deleteInsight(id))
        setSelectedInsights([])
        toast.success(`${selectedInsights.length} insight(s) deleted successfully`)
    }

    const handleToggleLanguage = () => {
        startTransition(() => {
            setShowArabic(!showArabic)
        })
    }

    const toggleInsight = (id: string) => {
        setSelectedInsights(prev =>
            prev.includes(id) ? prev.filter(insightId => insightId !== id) : [...prev, id]
        )
    }

    const toggleAll = () => {
        setSelectedInsights(prev =>
            prev.length === insights.length ? [] : insights.map(i => i._id)
        )
    }

    const clearSelection = () => {
        setSelectedInsights([])
    }

    return (
        <div className="space-y-6">
            <BulkActionsBar
                selectedCount={selectedInsights.length}
                onClearSelection={clearSelection}
                onDelete={handleBulkDelete}
            />
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-heading tracking-tight">Insights</h1>
                    <p className="text-muted-foreground">Manage your industry insights and articles.</p>
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
                        <Link href="/dashboard/insights/new">
                            <Plus className="mr-2 h-4 w-4" /> Add New
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
                                    checked={selectedInsights.length === insights.length && insights.length > 0}
                                    onCheckedChange={toggleAll}
                                    aria-label="Select all"
                                />
                            </TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Language</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {insights.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                                    No insights found. Add one to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            insights.map((insight) => (
                                <TableRow
                                    key={insight._id}
                                    className={selectedInsights.includes(insight._id) ? "bg-muted/50" : ""}
                                >
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedInsights.includes(insight._id)}
                                            onCheckedChange={() => toggleInsight(insight._id)}
                                            aria-label={`Select ${insight.title}`}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{insight.title}</TableCell>
                                    <TableCell>{insight.category}</TableCell>
                                    <TableCell>{insight.author}</TableCell>
                                    <TableCell>{insight.createdAt}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            <Badge variant="secondary" className="text-xs">EN</Badge>
                                            {insight.titleAr && (
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
                                                <DropdownMenuItem onClick={() => router.push(`/dashboard/insights/${insight._id}`)}>
                                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleDelete(insight._id)} className="text-destructive">
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

