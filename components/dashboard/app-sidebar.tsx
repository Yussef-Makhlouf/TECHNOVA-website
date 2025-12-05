"use client"

import { useState, useEffect } from "react"
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
    Moon,
    Sun,
    Smartphone,
} from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { logout } from "@/app/[locale]/login/actions"
import { Logo } from "@/components/ui/logo"
import { useTheme } from "next-themes"
import { useSidebar } from "@/components/ui/sidebar"

export function AppSidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const { state } = useSidebar()

    useEffect(() => {
        setMounted(true)
    }, [])

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
        {
            title: "NFC Scans",
            url: "/dashboard/nfc",
            icon: Smartphone,
        },
        {
            title: "Users",
            url: "/dashboard/users",
            icon: Users,
        },
    ]

    return (
        <Sidebar collapsible="icon" className="border-r border-border/50">
            <SidebarHeader className="border-b border-border/50 p-4">
                {state === "collapsed" ? (
                    <div className="flex items-center justify-center">
                        <img
                            src="/logos/logo-12.svg"
                            alt="TECHNOVA"
                            className="w-8 h-8 transition-transform hover:scale-110"
                        />
                    </div>
                ) : (
                    <Logo size="md" />
                )}
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
                                        className="transition-all duration-200"
                                    >
                                        <Link href={item.url}>
                                            <item.icon className="shrink-0" />
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
                    {mounted && (
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                tooltip={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                            >
                                {theme === "dark" ? (
                                    <Sun className="transition-transform duration-200" />
                                ) : (
                                    <Moon className="transition-transform duration-200" />
                                )}
                                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Profile Settings">
                            <Link href="/dashboard/profile">
                                <Settings />
                                <span>Profile Settings</span>
                            </Link>
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
