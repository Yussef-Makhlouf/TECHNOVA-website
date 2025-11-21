"use client"

import { motion } from "framer-motion"
import { Calendar, Trophy, Users, Sparkles } from "lucide-react"

export function TimelineSection() {
  const milestones = [
    {
      year: "2019",
      icon: Sparkles,
      title: "Company Founded",
      description: "TECHNOVA was born with a vision to revolutionize digital transformation.",
    },
    {
      year: "2020",
      icon: Users,
      title: "100+ Clients",
      description: "Reached our first major milestone of serving over 100 satisfied clients.",
    },
    {
      year: "2022",
      icon: Trophy,
      title: "Industry Recognition",
      description: "Awarded 'Best Innovation in Tech Solutions' by leading industry bodies.",
    },
    {
      year: "2024",
      icon: Calendar,
      title: "Global Expansion",
      description: "Expanded operations to serve clients across 25+ countries worldwide.",
    },
  ]

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7B3FEF]/10 dark:bg-[#7B3FEF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00D9FF]/10 dark:bg-[#00D9FF]/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">Our Journey</h2>
          <div className="gradient-line w-24 mx-auto my-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Key milestones that shaped our path to becoming industry leaders.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#7B3FEF] via-[#00D9FF] to-[#7B3FEF] opacity-30" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex items-center gap-8 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                  <div className="floating-tile inline-block glass-panel p-6 rounded-3xl border-border hover:border-[#00D9FF]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#00D9FF]/10">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7B3FEF] to-[#00D9FF] flex items-center justify-center shadow-lg ${index % 2 === 0 ? "lg:order-last" : ""}`}
                      >
                        <milestone.icon size={28} className="text-white" />
                      </div>
                      <div
                        className={`font-heading text-3xl font-bold bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] bg-clip-text text-transparent ${index % 2 === 0 ? "lg:order-first" : ""}`}
                      >
                        {milestone.year}
                      </div>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                  </div>
                </div>

                {/* Timeline dot with glow */}
                <div className="hidden lg:block w-6 h-6 rounded-full bg-gradient-to-br from-[#7B3FEF] to-[#00D9FF] border-4 border-background flex-shrink-0 relative z-10 shadow-lg shadow-[#00D9FF]/50" />

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
