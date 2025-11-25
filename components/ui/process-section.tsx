"use client"

import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"
import { Search, Lightbulb, PenTool, Code2, Rocket, MessageSquare } from "lucide-react"

const steps = [
    {
        icon: Search,
        title: "Discovery",
        description: "Deep analysis & requirements.",
        color: "#00D9FF",
    },
    {
        icon: Lightbulb,
        title: "Architecture",
        description: "Tailored technical planning.",
        color: "#7B3FEF",
    },
    {
        icon: PenTool,
        title: "Development",
        description: "Intuitive design & robust code.",
        color: "#FF0080",
    },
    {
        icon: Code2,
        title: "Testing",
        description: "Rigorous optimization.",
        color: "#FFD700",
    },
    {
        icon: Rocket,
        title: "Launch",
        description: "Seamless deployment.",
        color: "#00FF94",
    },
    {
        icon: MessageSquare,
        title: "Support",
        description: "Training & long-term care.",
        color: "#FF4D4D",
    },
]

export function ProcessSection() {
    return (
        <Section className="py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-background">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7B3FEF]/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00D9FF]/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >

                    <h2 className="font-heading text-4xl lg:text-6xl font-bold text-foreground mb-6">
                        Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF]">Ready</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative h-full"
                        >
                            <div
                                className="relative h-full bg-card/30 backdrop-blur-md border border-white/5 p-6 overflow-hidden transition-all duration-500 group-hover:bg-card/50 group-hover:border-white/10 group-hover:-translate-y-2 group-hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.3)]"
                                style={{
                                    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%)',
                                }}
                            >
                                {/* Corner Decoration */}
                                <div
                                    className="absolute w-16 h-16 bottom-[-2.8rem] right-[-2.8rem] rotate-45 bg-white/5 border-t border-l border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-colors z-20"
                                />

                                {/* Hover Glow */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: `radial-gradient(circle at center, ${step.color}, transparent 70%)` }}
                                />

                                {/* Large Number Background */}
                                <div className="absolute -right-4 -bottom-8 text-8xl font-bold text-white/[0.03] select-none pointer-events-none font-heading transition-transform duration-500 group-hover:scale-110 group-hover:text-white/[0.05]">
                                    0{index + 1}
                                </div>

                                <div className="relative z-10 flex flex-col h-full items-center text-center">
                                    <div
                                        className="mb-4 p-3 rounded-xl bg-background/50 border border-white/10 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                                    >
                                        <step.icon size={24} style={{ color: step.color }} />
                                    </div>

                                    <h3 className="font-heading text-base md:text-lg font-bold text-foreground mb-2">
                                        {step.title}
                                    </h3>

                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    )
}
