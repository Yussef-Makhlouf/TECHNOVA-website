"use client"

import { motion } from "framer-motion"
import { Linkedin, Twitter, Mail } from "lucide-react"

export function TeamSection() {
  const team = [
    {
      name: "Mubarak Almenhali",
      role: "CEO / Founder – Strategic Vision & Partnerships UAE",
      image: "/professional-engineering-leader.png",
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
      image: "/professional-man-ai-researcher.jpg",
      bio: "Recognized AI Strategist and Generative AI Solutions Architect based in Kuwait, leading applied artificial intelligence transformation across government, enterprise, academic, and media sectors in the GCC. With more than 20 years of technology leadership and 5 years specialized in applied AI, he enables organizations to adopt generative and advanced AI capabilities in scalable, sustainable ways aligned with operational impact.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "salem@technova.com",
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
