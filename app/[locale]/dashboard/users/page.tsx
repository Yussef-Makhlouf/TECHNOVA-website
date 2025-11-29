"use client"

import { useState, useTransition } from "react"
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, MoreHorizontal, Pencil, Trash, Mail, Shield, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { BulkActionsBar } from "@/components/dashboard/bulk-actions-bar"
import { toast } from "sonner"

// Mock data - replace with actual data from your context
const mockUsers = [
    {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        status: "Active",
        createdAt: "2024-01-15"
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "Editor",
        status: "Active",
        createdAt: "2024-02-20"
    },
    {
        id: "3",
        name: "Mike Johnson",
        email: "mike@example.com",
        role: "Viewer",
        status: "Inactive",
        createdAt: "2024-03-10"
    },
]

export default function UsersDashboardPage() {
    const router = useRouter()
    const [users, setUsers] = useState(mockUsers)
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])
    const [editingUser, setEditingUser] = useState<typeof mockUsers[0] | null>(null)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [editedName, setEditedName] = useState("")

    const handleDelete = (id: string) => {
        setUsers(prev => prev.filter(user => user.id !== id))
        toast.success("User deleted successfully")
    }

    const handleBulkDelete = () => {
        setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)))
        setSelectedUsers([])
        toast.success(`${selectedUsers.length} user(s) deleted successfully`)
    }

    const toggleUser = (id: string) => {
        setSelectedUsers(prev =>
            prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id]
        )
    }

    const toggleAll = () => {
        setSelectedUsers(prev =>
            prev.length === users.length ? [] : users.map(u => u.id)
        )
    }

    const clearSelection = () => {
        setSelectedUsers([])
    }

    const handleEditClick = (user: typeof mockUsers[0]) => {
        setEditingUser(user)
        setEditedName(user.name)
        setIsEditDialogOpen(true)
    }

    const handleSaveEdit = () => {
        if (editingUser) {
            setUsers(prev => prev.map(user =>
                user.id === editingUser.id ? { ...user, name: editedName } : user
            ))
            toast.success("User name updated successfully")
            setIsEditDialogOpen(false)
            setEditingUser(null)
        }
    }

    return (
        <div className="space-y-6">
            <BulkActionsBar
                selectedCount={selectedUsers.length}
                onClearSelection={clearSelection}
                onDelete={handleBulkDelete}
            />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-heading tracking-tight">Users</h1>
                    <p className="text-muted-foreground">Manage system users and permissions.</p>
                </div>
                <div className="flex gap-2">
                    <Button asChild>
                        <Link href="/dashboard/users/create">
                            <Plus className="mr-2 h-4 w-4" /> Add User
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
                                    checked={selectedUsers.length === users.length && users.length > 0}
                                    onCheckedChange={toggleAll}
                                    aria-label="Select all"
                                />
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                                    No users found. Add one to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRow
                                    key={user.id}
                                    className={selectedUsers.includes(user.id) ? "bg-muted/50" : ""}
                                >
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedUsers.includes(user.id)}
                                            onCheckedChange={() => toggleUser(user.id)}
                                            aria-label={`Select ${user.name}`}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            {user.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            {user.email}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={user.role === "Admin" ? "default" : "secondary"}
                                            className="gap-1"
                                        >
                                            <Shield className="h-3 w-3" />
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={user.status === "Active" ? "default" : "secondary"}
                                        >
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {user.createdAt}
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
                                                <DropdownMenuItem onClick={() => handleEditClick(user)}>
                                                    <Pencil className="mr-2 h-4 w-4" /> Edit Name
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleDelete(user.id)} className="text-destructive">
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

            {/* Edit Name Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit User Name</DialogTitle>
                        <DialogDescription>
                            Update the name for {editingUser?.email}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                                placeholder="Enter user name"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveEdit}>
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
