"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Activity, BarChart3, MessageSquare, Network, Shield, Zap } from "lucide-react"
import { useState } from "react"

export default function FeaturesAdvanced() {
  const [activeTab, setActiveTab] = useState(0)

  const features = [
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Track system performance with advanced analytics",
      color: "from-[#7B3FEF] to-[#00D9FF]",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Military-grade encryption and protection",
      color: "from-[#00D9FF] to-[#7B3FEF]",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance for instant response",
      color: "from-[#7B3FEF] to-[#00D9FF]",
    },
    {
      icon: Network,
      title: "Global Network",
      description: "Distributed infrastructure worldwide",
      color: "from-[#00D9FF] to-[#7B3FEF]",
    },
    {
      icon: MessageSquare,
      title: "24/7 Support",
      description: "Round-the-clock expert assistance",
      color: "from-[#7B3FEF] to-[#00D9FF]",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep insights into your data",
      color: "from-[#00D9FF] to-[#7B3FEF]",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          onMouseEnter={() => setActiveTab(index)}
          className={cn(
            "group relative p-6 border border-border bg-card backdrop-blur-sm transition-all duration-300 hover:border-transparent hover:shadow-xl",
            activeTab === index && "border-transparent shadow-xl",
          )}
          style={{
            boxShadow: activeTab === index ? "0 20px 50px rgba(123, 63, 239, 0.3)" : undefined,
            clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%)',
          }}
        >
          {/* Corner Decoration */}
          <div
            className="absolute w-16 h-16 bottom-[-2.8rem] right-[-2.8rem] rotate-45 bg-primary/10 border-t border-l border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 transition-colors z-20"
          />
          <div
            className={cn(
              "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br",
              feature.color,
            )}
            style={{ padding: "2px" }}
          >
            <div className="w-full h-full rounded-2xl bg-card" />
          </div>

          <div className="relative z-10">
            <div
              className={cn(
                "w-14 h-14 rounded-xl bg-gradient-to-br mb-4 flex items-center justify-center",
                feature.color,
              )}
            >
              <feature.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
