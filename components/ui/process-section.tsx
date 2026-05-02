"use client"

import { motion } from "framer-motion"
import { Search, Lightbulb, PenTool, Code2, Rocket, MessageSquare } from "lucide-react"
import { useTranslations } from "next-intl"

export function ProcessSection() {
    const t = useTranslations('processSteps')
    const stepsData = t.raw('steps') as { title: string; description: string }[]

    const icons = [Search, Lightbulb, PenTool, Code2, Rocket, MessageSquare]
    const colors = ["#00D9FF", "#7B3FEF", "#FF0080", "#FFD700", "#00FF94", "#FF4D4D"]

    const steps = stepsData.map((step, index) => ({
        ...step,
        icon: icons[index] || Search,
        color: colors[index] || "#00D9FF"
    }))

    return (
        <div className="container mx-auto px-4 relative">
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
    )
}
