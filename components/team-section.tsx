"use client"

import { motion } from "framer-motion"
import { Linkedin, Twitter, Mail } from "lucide-react"

export function TeamSection() {
  const team = [
    {
      name: "Sarah Chen",
      role: "Chief Executive Officer",
      image: "/professional-woman-ceo-tech.jpg",
      bio: "Visionary leader with 15+ years in tech innovation",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah@technova.com",
      },
    },
    {
      name: "Marcus Rodriguez",
      role: "Chief Technology Officer",
      image: "/professional-man-cto-technology.jpg",
      bio: "Expert in AI and cloud architecture solutions",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "marcus@technova.com",
      },
    },
    {
      name: "Aisha Patel",
      role: "Head of Design",
      image: "/professional-woman-designer-creative.jpg",
      bio: "Award-winning designer specializing in UX innovation",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "aisha@technova.com",
      },
    },
    {
      name: "James Kim",
      role: "VP of Engineering",
      image: "/professional-man-engineer-technology.jpg",
      bio: "Leading engineering teams to build scalable solutions",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "james@technova.com",
      },
    },
    {
      name: "Elena Volkov",
      role: "Head of AI Research",
      image: "/professional-woman-scientist-ai-researcher.jpg",
      bio: "PhD in Machine Learning, pioneering AI innovations",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "elena@technova.com",
      },
    },
    {
      name: "David Okonkwo",
      role: "Chief Security Officer",
      image: "/professional-man-cybersecurity-expert.jpg",
      bio: "Cybersecurity expert protecting digital assets",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "david@technova.com",
      },
    },
  ]

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#7B3FEF]/10 dark:bg-[#7B3FEF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#00D9FF]/10 dark:bg-[#00D9FF]/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">Meet Our Team</h2>
          <div className="gradient-line w-24 mx-auto my-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Talented individuals driving innovation and excellence in everything we do.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="glass-panel rounded-3xl overflow-hidden border-border hover:border-[#00D9FF]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#00D9FF]/20 hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-[#7B3FEF]/20 to-[#00D9FF]/20">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Social Links - Appear on Hover */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <a
                      href={member.social.linkedin}
                      className="w-10 h-10 rounded-full glass-panel border-border flex items-center justify-center hover:border-[#00D9FF] transition-colors"
                    >
                      <Linkedin size={18} className="text-foreground" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="w-10 h-10 rounded-full glass-panel border-border flex items-center justify-center hover:border-[#00D9FF] transition-colors"
                    >
                      <Twitter size={18} className="text-foreground" />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="w-10 h-10 rounded-full glass-panel border-border flex items-center justify-center hover:border-[#00D9FF] transition-colors"
                    >
                      <Mail size={18} className="text-foreground" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-[#00D9FF] text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
