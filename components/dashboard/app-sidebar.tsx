"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import {
    LayoutDashboard,
    Briefcase,
    Lightbulb,
    FileText,
    Users,
    Settings,
    LogOut,
} from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { logout } from "@/app/login/actions"
import { Logo } from "@/components/ui/logo"

export function AppSidebar() {
    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = async () => {
        await logout()
        router.push("/login")
    }

    const items = [
        {
            title: "Overview",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Services",
            url: "/dashboard/services",
            icon: Briefcase,
        },
        {
            title: "Insights",
            url: "/dashboard/insights",
            icon: Lightbulb,
        },
        {
            title: "Case Studies",
            url: "/dashboard/case-studies",
            icon: FileText,
        },
        {
            title: "Careers",
            url: "/dashboard/careers",
            icon: Users,
        },
    ]

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="border-b border-border/50 p-4">
                <Logo size="md" />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Management</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url || pathname.startsWith(`${item.url}/`)}
                                        tooltip={item.title}
                                    >
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t border-border/50 p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Settings />
                            <span>Settings</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={handleLogout}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                            <LogOut />
                            <span>Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
