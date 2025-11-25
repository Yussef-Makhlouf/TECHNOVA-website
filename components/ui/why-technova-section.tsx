"use client"

import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"
import { Target, Zap, Award, Globe2, Users } from "lucide-react"

const reasons = [
    {
        icon: Target,
        title: "Deep AI Specialization",
        description: "Deep specialization in AI and secure digital infrastructure with proven expertise across government, enterprise, and creative sectors.",
        color: "#7B3FEF",
    },
    {
        icon: Zap,
        title: "Fast & Adaptive Execution",
        description: "Fast and adaptive execution across complex environments, delivering solutions that work in real-world conditions.",
        color: "#00D9FF",
    },
    {
        icon: Award,
        title: "Proven Track Record",
        description: "Proven track record in converting innovation into measurable impact with satisfied clients across the GCC.",
        color: "#FF0080",
    },
    {
        icon: Globe2,
        title: "GCC National Alignment",
        description: "Aligned with GCC national transformation visions, supporting government and enterprise digital initiatives.",
        color: "#FFD700",
    },
    {
        icon: Users,
        title: "Long-term Partnership",
        description: "Long-term partnership and continuous support, working side-by-side from concept to measurable impact.",
        color: "#00FF94",
    },
]

export function WhyTechnovaSection() {
    return (
        <Section className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
            {/* Background Elements */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#7B3FEF]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#00D9FF]/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-[#00D9FF] font-medium tracking-wider uppercase text-sm mb-4 block">
                        Our Advantage
                    </span>
                    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6">
                        Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF]">Technova</span>?
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
                        We position ourselves as a trusted strategic partner delivering integrated digital transformation solutions
                        built on creativity, advanced AI, data protection, and high-quality execution.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative"
                        >
                            <div className="h-full bg-card/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8 hover:bg-card/80 hover:border-white/10 transition-all duration-500 hover:shadow-2xl hover:shadow-[#00D9FF]/10">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                                    style={{
                                        backgroundColor: `${reason.color}20`,
                                        boxShadow: `0 0 20px ${reason.color}30`
                                    }}
                                >
                                    <reason.icon
                                        size={32}
                                        style={{ color: reason.color }}
                                    />
                                </div>

                                <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-[#00D9FF] transition-colors">
                                    {reason.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {reason.description}
                                </p>

                                {/* Bottom accent line */}
                                <div
                                    className="absolute bottom-0 left-0 w-full h-1 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `linear-gradient(90deg, transparent, ${reason.color}, transparent)`
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <div className="inline-block bg-gradient-to-r from-[#7B3FEF]/10 to-[#00D9FF]/10 border border-[#00D9FF]/20 rounded-2xl px-8 py-6 max-w-4xl">
                        <p className="text-foreground font-medium leading-relaxed">
                            We focus on building <span className="text-[#00D9FF] font-bold">measurable</span>, <span className="text-[#7B3FEF] font-bold">scalable</span>, and <span className="text-[#00D9FF] font-bold">future-ready</span> intelligent systems
                            that enable governments and organizations to achieve sustainable growth and strengthen operational efficiency with confidence.
                        </p>
                    </div>
                </motion.div>
            </div>
        </Section>
    )
}
