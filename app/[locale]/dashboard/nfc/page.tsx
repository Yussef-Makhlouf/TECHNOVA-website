"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    Smartphone,
    Users,
    Tag,
    Activity,
    ChevronLeft,
    ChevronRight,
    Trash2,
    RefreshCw,
    Filter,
    Calendar,
} from "lucide-react"
import { nfcAPI, NfcScan, NfcStats } from "@/lib/api-service"
import { toast } from "sonner"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function NfcDashboardPage() {
    const [scans, setScans] = useState<NfcScan[]>([])
    const [stats, setStats] = useState<NfcStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [statsLoading, setStatsLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [total, setTotal] = useState(0)
    const [filterTag, setFilterTag] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const fetchScans = async () => {
        try {
            setLoading(true)
            const response = await nfcAPI.getScans({
                page,
                limit: 10,
                tagId: filterTag || undefined,
                startDate: startDate || undefined,
                endDate: endDate || undefined,
            })
            if (response.success) {
                setScans(response.data)
                setTotalPages(response.pagination.pages)
                setTotal(response.pagination.total)
            }
        } catch (error) {
            console.error("Error fetching scans:", error)
            toast.error("Failed to load NFC scans")
        } finally {
            setLoading(false)
        }
    }

    const fetchStats = async () => {
        try {
            setStatsLoading(true)
            const response = await nfcAPI.getStats()
            if (response.success) {
                setStats(response.data)
            }
        } catch (error) {
            console.error("Error fetching stats:", error)
        } finally {
            setStatsLoading(false)
        }
    }

    useEffect(() => {
        fetchScans()
        fetchStats()
    }, [page])

    const handleFilter = () => {
        setPage(1)
        fetchScans()
    }

    const handleClearFilters = () => {
        setFilterTag("")
        setStartDate("")
        setEndDate("")
        setPage(1)
        setTimeout(fetchScans, 0)
    }

    const handleDeleteScan = async (id: string) => {
        try {
            const response = await nfcAPI.deleteScan(id)
            if (response.success) {
                toast.success("Scan deleted successfully")
                fetchScans()
                fetchStats()
            }
        } catch (error) {
            console.error("Error deleting scan:", error)
            toast.error("Failed to delete scan")
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const truncateUserAgent = (ua: string) => {
        if (ua.length > 50) {
            return ua.substring(0, 50) + "..."
        }
        return ua
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">NFC Scan Analytics</h1>
                    <p className="text-muted-foreground mt-1">
                        Track and analyze NFC card scans from your business cards
                    </p>
                </div>
                <Button onClick={() => { fetchScans(); fetchStats(); }} variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Scans
                        </CardTitle>
                        <div className="p-2 rounded-full bg-blue-500/10">
                            <Activity className="h-4 w-4 text-blue-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {statsLoading ? "..." : stats?.totalScans || 0}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            All time NFC scans
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Unique Visitors
                        </CardTitle>
                        <div className="p-2 rounded-full bg-green-500/10">
                            <Users className="h-4 w-4 text-green-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {statsLoading ? "..." : stats?.uniqueVisitors || 0}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Based on unique IP addresses
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Active Tags
                        </CardTitle>
                        <div className="p-2 rounded-full bg-purple-500/10">
                            <Tag className="h-4 w-4 text-purple-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {statsLoading ? "..." : stats?.uniqueTags || 0}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Unique NFC tag IDs
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            NFC Cards
                        </CardTitle>
                        <div className="p-2 rounded-full bg-orange-500/10">
                            <Smartphone className="h-4 w-4 text-orange-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {statsLoading ? "..." : stats?.scansByTag?.length || 0}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Active business cards
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Scans by Tag */}
            {stats?.scansByTag && stats.scansByTag.length > 0 && (
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Tag className="w-5 h-5 text-primary" />
                            Scans by Tag
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-3">
                            {stats.scansByTag.map((tag) => (
                                <div
                                    key={tag._id}
                                    className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-lg border border-border/50"
                                >
                                    <Badge variant="outline" className="font-mono">
                                        {tag._id}
                                    </Badge>
                                    <span className="text-sm font-medium">{tag.count} scans</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Filters */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-primary" />
                        Filters
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="text-sm font-medium mb-1 block">Tag ID</label>
                            <Input
                                placeholder="Filter by tag ID..."
                                value={filterTag}
                                onChange={(e) => setFilterTag(e.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-sm font-medium mb-1 block">Start Date</label>
                            <Input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-sm font-medium mb-1 block">End Date</label>
                            <Input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <div className="flex items-end gap-2">
                            <Button onClick={handleFilter}>
                                Apply
                            </Button>
                            <Button variant="outline" onClick={handleClearFilters}>
                                Clear
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Scans Table */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" />
                        Scan Records
                        <Badge variant="secondary" className="ml-2">
                            {total} total
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
                        </div>
                    ) : scans.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <Smartphone className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No NFC scans recorded yet</p>
                            <p className="text-sm mt-1">
                                Scans will appear here when someone taps your NFC card
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="rounded-md border border-border/50 overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted/30">
                                            <TableHead>Tag ID</TableHead>
                                            <TableHead>Country</TableHead>
                                            <TableHead>IP Address</TableHead>
                                            <TableHead className="hidden md:table-cell">User Agent</TableHead>
                                            <TableHead className="hidden lg:table-cell">Language</TableHead>
                                            <TableHead>Timestamp</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {scans.map((scan) => (
                                            <TableRow key={scan._id} className="hover:bg-muted/20">
                                                <TableCell>
                                                    <Badge variant="outline" className="font-mono">
                                                        {scan.tagId}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {scan.country || "Unknown"}
                                                </TableCell>
                                                <TableCell className="font-mono text-sm">
                                                    {scan.ip}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-xs">
                                                    <span title={scan.userAgent}>
                                                        {truncateUserAgent(scan.userAgent)}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="hidden lg:table-cell text-sm">
                                                    {scan.language.split(",")[0]}
                                                </TableCell>
                                                <TableCell className="text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3 text-muted-foreground" />
                                                        {new Date(scan.timestamp).toLocaleString("en-US", {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                            hour: "numeric",
                                                            minute: "2-digit",
                                                            hour12: true
                                                        })}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Delete Scan Record</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Are you sure you want to delete this scan record? This action cannot be undone.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleDeleteScan(scan._id)}
                                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                                >
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between mt-4">
                                    <p className="text-sm text-muted-foreground">
                                        Page {page} of {totalPages}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                                            disabled={page === 1}
                                        >
                                            <ChevronLeft className="w-4 h-4 mr-1" />
                                            Previous
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                            disabled={page === totalPages}
                                        >
                                            Next
                                            <ChevronRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
