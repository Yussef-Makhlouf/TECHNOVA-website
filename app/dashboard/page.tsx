import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Briefcase,
    FileText,
    Lightbulb,
    Users,
    ArrowUpRight,
    Activity,
    TrendingUp,
    Clock
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
    const stats = [
        {
            title: "Total Services",
            value: "12",
            change: "+2.5%",
            icon: Briefcase,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            title: "Active Insights",
            value: "24",
            change: "+12%",
            icon: Lightbulb,
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
        },
        {
            title: "Case Studies",
            value: "8",
            change: "+4%",
            icon: FileText,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
        },
        {
            title: "Open Positions",
            value: "5",
            change: "0%",
            icon: Users,
            color: "text-green-500",
            bg: "bg-green-500/10",
        },
    ]

    const quickActions = [
        { title: "Add New Service", href: "/dashboard/services", icon: Briefcase },
        { title: "Write Insight", href: "/dashboard/insights", icon: Lightbulb },
        { title: "Post Job", href: "/dashboard/careers", icon: Users },
    ]

    return (
        <div className="space-y-8 p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                    <p className="text-muted-foreground mt-1">Welcome back, Admin. Here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full border border-border/50">
                    <Clock className="w-4 h-4" />
                    <span>Last updated: Just now</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-full ${stat.bg}`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                <span className="text-green-500 font-medium flex items-center">
                                    <TrendingUp className="w-3 h-3 mr-0.5" />
                                    {stat.change}
                                </span>
                                from last month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-8 md:grid-cols-7">
                {/* Recent Activity / Main Content Area */}
                <Card className="col-span-4 border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="w-5 h-5 text-primary" />
                            System Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <div className="flex items-center">
                                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">All Systems Operational</p>
                                    <p className="text-sm text-muted-foreground">
                                        Website is live and performing optimally.
                                    </p>
                                </div>
                                <div className="ml-auto font-medium text-green-500">99.9% Uptime</div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Quick Actions</h4>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {quickActions.map((action) => (
                                        <Link
                                            key={action.title}
                                            href={action.href}
                                            className="group flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-md bg-muted group-hover:bg-primary/20 transition-colors">
                                                    <action.icon className="w-4 h-4 text-foreground group-hover:text-primary" />
                                                </div>
                                                <span className="font-medium">{action.title}</span>
                                            </div>
                                            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Side Panel / Notifications */}
                <Card className="col-span-3 border-border/50 bg-gradient-to-br from-primary/5 to-secondary/5">
                    <CardHeader>
                        <CardTitle>Recent Updates</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="mt-1 bg-blue-500/20 p-1.5 rounded-full h-fit">
                                    <Briefcase className="w-3 h-3 text-blue-500" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">New Service Added</p>
                                    <p className="text-xs text-muted-foreground">
                                        "AI Consultation" was added to services.
                                    </p>
                                    <p className="text-xs text-muted-foreground pt-1">2 hours ago</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 bg-purple-500/20 p-1.5 rounded-full h-fit">
                                    <FileText className="w-3 h-3 text-purple-500" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Case Study Published</p>
                                    <p className="text-xs text-muted-foreground">
                                        "FinTech Revolution" is now live.
                                    </p>
                                    <p className="text-xs text-muted-foreground pt-1">Yesterday</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
