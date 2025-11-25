"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"

interface ServiceCardProps {
  title: string
  description: string
  image: string
  features: string[]
  href: string
  index: number
  color: string
}

export function ServiceCard({ title, description, image, features, href, index, color }: ServiceCardProps) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
    >
      {/* Enhanced Card Content */}
      <div className="relative bg-background backdrop-blur-sm rounded-3xl overflow-hidden p-8 lg:p-12 border border-border/20 hover:border-[#7B3FEF]/30 transition-all duration-500">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#7B3FEF]/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#00D9FF]/5 to-transparent rounded-full blur-3xl" />
        </div>

        <div className={`relative z-10 flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}>
          {/* Content Section with Enhanced Typography */}
          <div className="lg:w-3/5 flex flex-col space-y-6">
            {/* Service Number */}
            <div className="flex items-center gap-4">
              <span
                className="text-4xl lg:text-5xl font-bold opacity-20"
                style={{ color }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border/50" />
            </div>

            {/* Enhanced Title */}
            <h3 className="font-heading text-3xl lg:text-5xl font-bold text-foreground group-hover:text-[#7B3FEF] transition-colors duration-300 leading-tight">
              {title}
            </h3>

            {/* Enhanced Description */}
            <p className="text-muted-foreground leading-relaxed text-lg lg:text-xl max-w-lg">
              {description}
            </p>

            {/* Interactive Features Grid */}
            <div className="grid grid-cols-2 gap-3">
              {features.slice(0, 4).map((feature, featureIndex) => (
                <div
                  key={featureIndex}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#7B3FEF]/5 hover:bg-[#7B3FEF]/10 transition-colors duration-300 group/item"
                >
                  <div
                    className="w-2 h-2 rounded-full opacity-60 group-hover/item:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm font-medium text-foreground/80 group-hover/item:text-foreground transition-colors duration-300">
                    {feature}
                  </span>
                </div>
              ))}
              {features.length > 4 && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30">
                  <span className="text-sm font-medium text-muted-foreground">
                    +{features.length - 4} more
                  </span>
                </div>
              )}
            </div>

            {/* Enhanced Button */}
            <Link
              href={href}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] text-white font-semibold text-lg hover:translate-y-[-4px] transition-all duration-300 group/btn w-fit ${isEven ? '' : 'ml-auto'}`}
            >
              <span>Explore Service</span>
              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover/btn:translate-x-2"
              />
            </Link>
          </div>

          {/* Visual Element with 3D Image */}
          <div className="lg:w-2/5 flex justify-center">
            <div className="relative w-32 h-32 lg:w-48 lg:h-48">
              {/* Animated circles - Background */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 rounded-full border-2 border-dashed opacity-20"
                style={{ borderColor: color }}
              />
              <motion.div
                animate={{
                  scale: [1.1, 1, 1.1],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-4 rounded-full border border-dashed opacity-10"
                style={{ borderColor: color }}
              />

              {/* 3D Floating Image Above Circles */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotateY: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-20 h-20 lg:w-28 lg:h-28 rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  transform: 'translate(-50%, -50%) translateZ(50px)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                />
                {/* 3D depth overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </motion.div>

              {/* Center dot - Behind image */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full z-0"
                style={{ backgroundColor: color }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
