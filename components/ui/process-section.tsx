"use client"

import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"
import { Search, Lightbulb, PenTool, Code2, Rocket, MessageSquare } from "lucide-react"

const steps = [
    {
        icon: Search,
        title: "Discovery & Requirements",
        description: "We dive deep into your requirements, conducting thorough analysis to build a solid foundation for success.",
        color: "#00D9FF",
    },
    {
        icon: Lightbulb,
        title: "Solution Architecture",
        description: "Developing comprehensive technical planning and solution architecture tailored to your specific needs.",
        color: "#7B3FEF",
    },
    {
        icon: PenTool,
        title: "Design & Development",
        description: "Creating intuitive designs and developing robust, scalable solutions using cutting-edge technologies.",
        color: "#FF0080",
    },
    {
        icon: Code2,
        title: "Testing & Optimization",
        description: "Rigorous testing, optimization, and comprehensive security review to ensure excellence.",
        color: "#FFD700",
    },
    {
        icon: Rocket,
        title: "Deployment & Launch",
        description: "Seamless deployment and launch of your solution with careful monitoring and validation.",
        color: "#00FF94",
    },
    {
        icon: MessageSquare,
        title: "Training & Support",
        description: "Comprehensive training for your team and ongoing support to ensure long-term success.",
        color: "#FF4D4D",
    },
]

export function ProcessSection() {
    return (
        <Section className="py-24 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-[#7B3FEF] font-medium tracking-wider uppercase text-sm mb-4 block">
                        How We Work
                    </span>
                    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6">
                        A Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF]">Process</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Building trust through clarity. Here's how we turn your vision into reality, step by step.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#7B3FEF]/30 to-transparent -translate-y-1/2 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative group"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div
                                        className="w-16 h-16 rounded-full bg-card border-2 flex items-center justify-center mb-6 relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(123,63,239,0.3)]"
                                        style={{ borderColor: step.color }}
                                    >
                                        <step.icon size={24} style={{ color: step.color }} />
                                        <div
                                            className="absolute inset-0 rounded-full opacity-20 blur-md transition-opacity duration-500 group-hover:opacity-40"
                                            style={{ backgroundColor: step.color }}
                                        />
                                    </div>

                                    <h3 className="font-heading text-lg font-bold text-foreground mb-3">{step.title}</h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed px-2">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    )
}
