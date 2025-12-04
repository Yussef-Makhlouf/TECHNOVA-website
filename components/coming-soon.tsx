"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Navigation from "@/components/navigation"

export function ComingSoon({ title = "Coming Soon" }: { title?: string }) {
    return (
        <>
            <Navigation />
            <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-8 inline-flex items-center justify-center"
                    >
                        <div className="relative w-24 h-24 md:w-32 md:h-32">
                            <img
                                src="/logos/logo-12.svg"
                                alt="TECHNOVA Logo"
                                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(123,63,239,0.5)]"
                            />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6"
                    >
                        {title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        We're crafting something extraordinary. This experience is currently under development and will be unveiled soon.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 font-medium group"
                        >
                            Contact Us
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </>
    )
}