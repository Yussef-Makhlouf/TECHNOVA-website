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

export default function ServicesDashboardPage() {
    const { services, deleteService } = useData()
    const router = useRouter()
    const [showArabic, setShowArabic] = useState(true)
    const [isPending, startTransition] = useTransition()

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this service?")) {
            deleteService(id)
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
                                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                    No services found. Add one to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            services.map((service) => (
                                <TableRow key={service._id}>
                                    <TableCell className="font-medium">{service.name_en}</TableCell>
                                    <TableCell className="max-w-md truncate">{service.shortDescription_en}</TableCell>
                                    <TableCell>{service.icon}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            <Badge variant="secondary" className="text-xs">EN</Badge>
                                            {service.name_en && (
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
                                                <DropdownMenuItem onClick={() => router.push(`/dashboard/services/${service._id}`)}>
                                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleDelete(service._id)} className="text-destructive">
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
