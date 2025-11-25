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
import { Plus, MoreHorizontal, Pencil, Trash, Languages, Eye } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Checkbox } from "@/components/ui/checkbox"
import { BulkActionsBar } from "@/components/dashboard/bulk-actions-bar"
import { toast } from "sonner"

export default function ServicesDashboardPage() {
    const { services, deleteService } = useData()
    const router = useRouter()
    const [showArabic, setShowArabic] = useState(true)
    const [isPending, startTransition] = useTransition()
    const [selectedServices, setSelectedServices] = useState<string[]>([])

    const handleDelete = (id: string) => {
        deleteService(id)
        toast.success("Service deleted successfully")
    }

    const handleBulkDelete = () => {
        selectedServices.forEach(id => deleteService(id))
        setSelectedServices([])
        toast.success(`${selectedServices.length} service(s) deleted successfully`)
    }

    const handleToggleLanguage = () => {
        startTransition(() => {
            setShowArabic(!showArabic)
        })
    }

    const toggleService = (id: string) => {
        setSelectedServices(prev =>
            prev.includes(id) ? prev.filter(serviceId => serviceId !== id) : [...prev, id]
        )
    }

    const toggleAll = () => {
        setSelectedServices(prev =>
            prev.length === services.length ? [] : services.map(s => s._id)
        )
    }

    const clearSelection = () => {
        setSelectedServices([])
    }

    return (
        <div className="space-y-6">
            <BulkActionsBar
                selectedCount={selectedServices.length}
                onClearSelection={clearSelection}
                onDelete={handleBulkDelete}
            />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-heading tracking-tight">Services</h1>
                    <p className="text-muted-foreground">Manage your service offerings.</p>
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
                        <Link href="/dashboard/services/new">
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
                        checked={selectedServices.length === services.length && services.length > 0}
                        onCheckedChange={toggleAll}
                        aria-label="Select all"
                    />
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Language</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            {services.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                        No services found. Add one to get started.
                    </TableCell>
                </TableRow>
            ) : (
                services.map((service) => (
                    <TableRow
                        key={service._id}
                        className={selectedServices.includes(service._id) ? "bg-muted/50" : ""}
                    >
                        {/* Checkbox */}
                        <TableCell>
                            <Checkbox
                                checked={selectedServices.includes(service._id)}
                                onCheckedChange={() => toggleService(service._id)}
                                aria-label={`Select ${service.name_en}`}
                            />
                        </TableCell>

                        {/* Titles EN + AR */}
                        <TableCell className="font-medium">
                            <div className="space-y-1">
                                <div>{service.name_en}</div>

                                {showArabic && (
                                    isPending ? (
                                        <Skeleton className="h-4 w-48" />
                                    ) : service.name_ar ? (
                                        <div className="text-sm text-muted-foreground transition-all duration-300" dir="rtl">
                                            {service.name_ar}
                                        </div>
                                    ) : (
                                        <div className="text-xs text-muted-foreground/60 italic" dir="rtl">
                                            لا يوجد محتوى بالعربية
                                        </div>
                                    )
                                )}
                            </div>
                        </TableCell>

                        {/* Descriptions EN + AR */}
                        <TableCell className="max-w-md">
                            <div className="space-y-1">
                                <div className="truncate">{service.description_en}</div>

                                {showArabic && (
                                    isPending ? (
                                        <Skeleton className="h-4 w-64" />
                                    ) : service.description_ar ? (
                                        <div className="text-sm text-muted-foreground truncate transition-all duration-300" dir="rtl">
                                            {service.description_ar}
                                        </div>
                                    ) : (
                                        <div className="text-xs text-muted-foreground/60 italic truncate" dir="rtl">
                                            لا يوجد وصف بالعربية
                                        </div>
                                    )
                                )}
                            </div>
                        </TableCell>

                        {/* Icon */}
                        <TableCell>{service.icon}</TableCell>

                        {/* Languages */}
                        <TableCell>
                            <div className="flex gap-1">
                                <Badge variant="secondary" className="text-xs">EN</Badge>
                                {service.name_ar && (
                                    <Badge variant="secondary" className="text-xs">AR</Badge>
                                )}
                            </div>
                        </TableCell>

                        {/* Actions */}
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

                                    <DropdownMenuItem onClick={() => router.push(`/dashboard/services/${service._id}`)}>
                                        <Pencil className="mr-2 h-4 w-4" /> Edit
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem
                                        onClick={() => handleDelete(service._id)}
                                        className="text-destructive"
                                    >
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
