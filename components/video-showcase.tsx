"use client"

import { motion } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"
import { Play, Sparkles, UtensilsCrossed, LayoutDashboard, Volume2, VolumeX } from "lucide-react"
import { useState, useRef } from "react"

interface Project {
    id: string
    videoSrc: string
    icon: React.ElementType
    gradient: string
    accentColor: string
}

const projects: Project[] = [
    {
        id: "natai",
        videoSrc: "/videos/natai.mp4",
        icon: Sparkles,
        gradient: "from-[#7B3FEF] via-[#9D5FFF] to-[#00D9FF]",
        accentColor: "#7B3FEF"
    },
    {
        id: "foodai",
        videoSrc: "/videos/foodai.mp4",
        icon: UtensilsCrossed,
        gradient: "from-[#FF6B6B] via-[#FF8E53] to-[#FFD93D]",
        accentColor: "#FF6B6B"
    },
    {
        id: "dashboardai",
        videoSrc: "/videos/dashboardai.mp4",
        icon: LayoutDashboard,
        gradient: "from-[#00D9FF] via-[#00B8D4] to-[#7B3FEF]",
        accentColor: "#00D9FF"
    }
]

function VideoCard({ project, index }: { project: Project; index: number }) {
    const t = useTranslations('videoShowcase')
    const locale = useLocale()
    const isRtl = locale === 'ar'
    const [isHovered, setIsHovered] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const videoRef = useRef<HTMLVideoElement>(null)

    const Icon = project.icon
    const features = t.raw(`projects.${project.id}.features`) as string[]

    const handleMuteToggle = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    const handleMouseEnter = () => {
        setIsHovered(true)
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Video play failed:", error)
            })
        }
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.currentTime = 0 // Reset to start
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group relative"
        >
            {/* Card Container */}
            <div
                className="relative overflow-hidden bg-card border border-border/50 transition-all duration-500 hover:border-primary/50"
                style={{
                    aspectRatio: '9/16',
                    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 1.5rem), calc(100% - 1.5rem) 100%, 0 100%)',
                    boxShadow: isHovered ? `0 0 40px -10px ${project.accentColor}` : 'none'
                }}
            >
                {/* Video Background */}
                <video
                    ref={videoRef}
                    src={project.videoSrc}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loop
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${project.gradient} backdrop-blur-md`}
                    >
                        <Icon className="w-4 h-4 text-white" />
                        <span className="text-xs font-semibold text-white uppercase tracking-wider">
                            {t(`projects.${project.id}.badge`)}
                        </span>
                    </motion.div>

                    {/* Mute Toggle */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0.6 }}
                        onClick={handleMuteToggle}
                        className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
                    >
                        {isMuted ? (
                            <VolumeX className="w-4 h-4 text-white" />
                        ) : (
                            <Volume2 className="w-4 h-4 text-white" />
                        )}
                    </motion.button>
                </div>

                {/* Content Overlay - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                    {/* Project Title */}
                    <motion.h3
                        className="font-heading text-2xl font-bold text-white mb-3"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                    >
                        {t(`projects.${project.id}.title`)}
                    </motion.h3>

                    {/* Short Description */}
                    <motion.p
                        className="text-white/80 text-sm mb-4 leading-relaxed line-clamp-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                    >
                        {t(`projects.${project.id}.description`)}
                    </motion.p>

                    {/* Features List */}
                    <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isHovered ? 1 : 0.7, y: isHovered ? 0 : 5 }}
                        transition={{ duration: 0.3 }}
                    >
                        {features.slice(0, 3).map((feature: string, idx: number) => (
                            <div
                                key={idx}
                                className="flex items-center gap-2 text-xs text-white/90"
                            >
                                <div
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ backgroundColor: project.accentColor }}
                                />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Decorative Corner */}
                <div
                    className="absolute w-12 h-12 bottom-[-1.7rem] right-[-1.7rem] rotate-45 transition-opacity duration-300"
                    style={{ background: project.accentColor, opacity: 0.3 }}
                />

                {/* Play Indicator */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 0 : 0.5 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30">
                        <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export function VideoShowcase() {
    const t = useTranslations('videoShowcase')
    const locale = useLocale()
    const isRtl = locale === 'ar'

    return (
        <section className="py-20 lg:py-28 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    {/* Badge */}
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#7B3FEF]/10 to-[#00D9FF]/10 border border-[#7B3FEF]/20 text-sm font-medium text-[#7B3FEF]">
                            {t('badge')}
                        </span>
                    </div>

                    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        {t('title')}
                    </h2>

                    <div className="gradient-line w-24 mx-auto my-6" />

                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                        {t('description')}
                    </p>
                </motion.div>

                {/* Video Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {projects.map((project, index) => (
                        <VideoCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
