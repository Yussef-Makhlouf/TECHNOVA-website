"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { TeamSection } from "@/components/team-section"
import { Target, Eye, Award, Users, TrendingUp, Lightbulb } from "lucide-react"
import { motion } from "framer-motion"
import { DiagonalCard } from "@/components/diagonal-card"
import { Globe } from "@/components/globe"
import { About3 } from "@/components/ui/about-3"

export default function AboutPage() {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We constantly push boundaries and explore new technologies to deliver cutting-edge solutions.",
      color: "#7B3FEF",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe in the power of teamwork and building strong partnerships with our clients.",
      color: "#00D9FF",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We are committed to delivering the highest quality in everything we do.",
      color: "#7B3FEF",
    },
    {
      icon: TrendingUp,
      title: "Growth",
      description: "We foster continuous learning and development for our team and clients.",
      color: "#00D9FF",
    },
  ]

  const achievements = [
    { value: "500+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "50+", label: "Team Members" },
    { value: "15+", label: "Years in Business" },
    { value: "25+", label: "Countries Served" },
    { value: "100+", label: "Industry Awards" },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A2463]/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#7B3FEF]/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-[#00D9FF]/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-block mb-6">
              <span className="px-4 py-2 rounded-full glass-panel border-border text-sm font-medium text-[#00D9FF]">
                About Us
              </span>
            </div>
            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              About{" "}
              <span className="bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] bg-clip-text text-transparent">
                TECHNOVA
              </span>
            </h1>
            <div className="gradient-line w-32 mx-auto my-6" />
            <p className="text-xl text-muted-foreground leading-relaxed">
              We are a team of passionate technologists dedicated to building the future of digital innovation.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00D9FF]/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group floating-tile"
            >
              <div className="p-8 lg:p-10 glass-panel rounded-3xl border-border hover:border-[#7B3FEF]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#7B3FEF]/20 h-full">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7B3FEF] to-[#7B3FEF]/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-[#7B3FEF]/30">
                  <Eye size={36} className="text-white" />
                </div>
                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">Our Vision</h2>
                <div className="gradient-line w-16 mb-6" />
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To be the global leader in technology innovation, empowering businesses to thrive in the digital age
                  through cutting-edge solutions and transformative strategies that shape the future of industries
                  worldwide.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group floating-tile"
            >
              <div className="p-8 lg:p-10 glass-panel rounded-3xl border-border hover:border-[#00D9FF]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#00D9FF]/20 h-full">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00D9FF] to-[#00D9FF]/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-[#00D9FF]/30">
                  <Target size={36} className="text-white" />
                </div>
                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">Our Mission</h2>
                <div className="gradient-line w-16 mb-6" />
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To deliver innovative, scalable, and secure technology solutions that drive measurable business value.
                  We partner with our clients to understand their unique challenges and create tailored solutions that
                  exceed expectations.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#7B3FEF]/5 rounded-full blur-3xl" />
        
        {/* Globe Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <Globe className="scale-75" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">Our Values</h2>
            <div className="gradient-line w-24 mx-auto my-6" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              The principles that guide everything we do and shape our company culture.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <DiagonalCard key={index} {...value} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#00D9FF]/5 rounded-full blur-3xl" />

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

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#7B3FEF] via-[#00D9FF] to-[#7B3FEF] opacity-30" />

              <div className="space-y-12">
                {[
                  {
                    year: "2010",
                    title: "Founded",
                    description:
                      "TECHNOVA was established with a vision to revolutionize the technology landscape and help businesses embrace digital transformation.",
                    color: "#7B3FEF",
                  },
                  {
                    year: "2015",
                    title: "Global Expansion",
                    description:
                      "Expanded operations to serve clients across 25+ countries, establishing ourselves as a trusted global technology partner.",
                    color: "#00D9FF",
                  },
                  {
                    year: "2020",
                    title: "AI Innovation Hub",
                    description:
                      "Launched our dedicated AI and Machine Learning division, pioneering advanced solutions for enterprise clients.",
                    color: "#7B3FEF",
                  },
                  {
                    year: "2025",
                    title: "Industry Leader",
                    description:
                      "Recognized as a leading technology innovator with 500+ successful projects and 98% client satisfaction rate.",
                    color: "#00D9FF",
                  },
                ].map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative flex gap-6 lg:gap-8"
                  >
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 relative z-10">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{
                          backgroundColor: `${milestone.color}20`,
                          boxShadow: `0 0 20px ${milestone.color}30`,
                        }}
                      >
                        <span className="font-heading text-sm font-bold" style={{ color: milestone.color }}>
                          {milestone.year}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <div className="glass-panel p-6 rounded-2xl border-border hover:border-[#00D9FF]/50 transition-all duration-500 hover:shadow-xl hover:shadow-[#00D9FF]/20">
                        <h3 className="font-heading text-2xl font-bold text-foreground mb-3">{milestone.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TeamSection />

      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7B3FEF]/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">Our Achievements</h2>
            <div className="gradient-line w-24 mx-auto my-6" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Numbers that reflect our commitment to excellence and client success.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="glass-panel p-6 rounded-2xl border-border hover:border-[#00D9FF]/50 transition-all duration-500 hover:shadow-xl hover:shadow-[#00D9FF]/20 text-center h-full flex flex-col justify-center">
                  <div className="font-heading text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-500">
                    {achievement.value}
                  </div>
                  <div className="text-muted-foreground text-sm font-medium">{achievement.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* <About3 
        title="About TECHNOVA"
        description="We are a passionate team of innovators, designers, and developers dedicated to creating cutting-edge digital solutions that transform businesses and shape the future of technology."
        companiesTitle="Trusted by Industry Leaders"
        achievementsTitle="Our Impact in Numbers"
        achievementsDescription="Delivering exceptional results and building lasting partnerships with clients worldwide."
        achievements={achievements}
      /> */}

      <Footer />
    </div>
  )
}
