"use client"

import { motion } from "framer-motion"
import { Linkedin, Twitter, Mail, ArrowRight } from "lucide-react"

export function TeamSection() {
  const team = [
    {
      name: "Mubarak Almenhali",
      role: "CEO / Founder – Strategic Vision & Partnerships UAE",
      image: "/bu-Saleh.png",
      bio: "Emirati official with over 20 years of experience in sports management, public relations, and regulatory system development. Currently serving as Director of the Technical Department at UAE Jiu-Jitsu Federation since 2019, leading national teams, clubs, and championships with over 90 athletes. At Technova, he leads institutional partnerships and expansion across key public sectors in the UAE and GCC.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "mubarak@technova.com",
      },
    },
    {
      name: "Salem Alotaibi",
      role: "Co-Founder & Chief Technology Officer (CTO) UAE | GCC Region",
      image: "/salem.png",
      bio: "Recognized AI Strategist and Generative AI Solutions Architect based in Kuwait, leading applied artificial intelligence transformation across government, enterprise, academic, and media sectors in the GCC. With more than 20 years of technology leadership and 5 years specialized in applied AI, he enables organizations to adopt generative and advanced AI capabilities in scalable, sustainable ways aligned with operational impact.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "salem@technova.com",
      },
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  }

  const lineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "100%",
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut" as const,
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: custom * 0.2,
        ease: "easeOut" as const,
      },
    }),
  }

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden bg-gray-50 dark:bg-transparent">
      {/* Animated Background Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#7B3FEF]/10 dark:bg-[#7B3FEF]/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#00D9FF]/10 dark:bg-[#00D9FF]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-4xl lg:text-6xl font-bold text-foreground mb-4">
            Meet Our <span className="bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] bg-clip-text text-transparent">Leadership</span>
          </h2>
          <div className="gradient-line w-24 mx-auto my-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Visionary leaders driving innovation and excellence in AI transformation across the GCC region.
          </p>
        </motion.div>

        {/* Team Members */}
        <div className="space-y-32 max-w-7xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
            >
              {/* Image Section */}
              <motion.div
                variants={imageVariants}
                className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}
              >
                <div className="relative group">
                  {/* Decorative Background */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-[#7B3FEF]/20 to-[#00D9FF]/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

                  {/* Main Image Container */}
                  <div className="relative rounded-3xl overflow-hidden border-2 border-border/50 hover:border-[#00D9FF]/50 transition-all duration-500 shadow-2xl">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Decorative Corner Elements */}
                  <div className="absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-[#7B3FEF] rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-[#00D9FF] rounded-br-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                </div>
              </motion.div>

              {/* Content Section */}
              <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                {/* Connecting Line */}
                <motion.div
                  variants={lineVariants}
                  className="hidden lg:block absolute top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-[#7B3FEF] via-[#00D9FF] to-transparent"
                  style={{
                    left: index % 2 === 1 ? 'auto' : '-8rem',
                    right: index % 2 === 1 ? '-8rem' : 'auto',
                    width: '8rem',
                  }}
                />

                {/* Number Badge */}
                <motion.div
                  custom={0}
                  variants={textVariants}
                  className="inline-flex items-center gap-3 mb-6"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7B3FEF] to-[#00D9FF] flex items-center justify-center shadow-lg">
                    <span className="font-heading text-2xl font-bold text-white">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="h-px w-12 bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF]" />
                </motion.div>

                {/* Name */}
                <motion.h3
                  custom={1}
                  variants={textVariants}
                  className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight"
                >
                  {member.name}
                </motion.h3>

                {/* Role */}
                <motion.div
                  custom={2}
                  variants={textVariants}
                  className="mb-6"
                >
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel border-border">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] animate-pulse" />
                    <p className="text-[#00D9FF] dark:text-[#00D9FF] text-sm font-semibold uppercase tracking-wider">
                      {member.role}
                    </p>
                  </div>
                </motion.div>

                {/* Bio */}
                <motion.p
                  custom={3}
                  variants={textVariants}
                  className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-8"
                >
                  {member.bio}
                </motion.p>

                {/* Divider Line */}
                <motion.div
                  custom={4}
                  variants={textVariants}
                  className="h-px w-full bg-gradient-to-r from-[#7B3FEF] via-[#00D9FF] to-transparent mb-8"
                />

                {/* Social Links */}
                <motion.div
                  custom={5}
                  variants={textVariants}
                  className="flex items-center gap-4"
                >
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Connect
                  </span>
                  <ArrowRight size={16} className="text-[#00D9FF]" />
                  <div className="flex gap-3">
                    <a
                      href={member.social.twitter}
                      className="w-12 h-12 rounded-xl glass-panel border-border flex items-center justify-center hover:border-[#7B3FEF] hover:bg-[#7B3FEF]/10 transition-all duration-300 hover:scale-110 group"
                      aria-label="Twitter"
                    >
                      <Twitter size={20} className="text-muted-foreground group-hover:text-[#7B3FEF] transition-colors" />
                    </a>
                    <a
                      href={member.social.linkedin}
                      className="w-12 h-12 rounded-xl glass-panel border-border flex items-center justify-center hover:border-[#00D9FF] hover:bg-[#00D9FF]/10 transition-all duration-300 hover:scale-110 group"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={20} className="text-muted-foreground group-hover:text-[#00D9FF] transition-colors" />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="w-12 h-12 rounded-xl glass-panel border-border flex items-center justify-center hover:border-[#7B3FEF] hover:bg-[#7B3FEF]/10 transition-all duration-300 hover:scale-110 group"
                      aria-label="Email"
                    >
                      <Mail size={20} className="text-muted-foreground group-hover:text-[#7B3FEF] transition-colors" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
