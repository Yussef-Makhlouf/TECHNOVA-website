"use client"

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import React from "react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const pathSegments = pathname.split("/").filter((segment) => segment !== "")

    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex flex-col flex-1 min-h-screen bg-background">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            {pathSegments.map((segment, index) => {
                                const href = `/${pathSegments.slice(0, index + 1).join("/")}`
                                const isLast = index === pathSegments.length - 1
                                const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")

                                return (
                                    <React.Fragment key={href}>
                                        <BreadcrumbItem className="hidden md:block">
                                            {isLast ? (
                                                <BreadcrumbPage>{title}</BreadcrumbPage>
                                            ) : (
                                                <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
                                            )}
                                        </BreadcrumbItem>
                                        {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
                                    </React.Fragment>
                                )
                            })}
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <main className="flex-1 p-4 md:p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}
