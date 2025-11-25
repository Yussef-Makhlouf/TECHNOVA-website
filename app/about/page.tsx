"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { TeamSection } from "@/components/team-section"
import { Target, Eye, Award, Users, TrendingUp, Lightbulb } from "lucide-react"
import { motion } from "framer-motion"
import { DiagonalCard } from "@/components/diagonal-card"
import { Globe } from "@/components/globe"
import { About3 } from "@/components/ui/about-3"
import { PartnersMarquee } from "@/components/partners-marquee"

export default function AboutPage() {
  const values = [
    {
      icon: Lightbulb,
      title: "Creativity",
      description: "We believe creativity is the foundation of effective solutions. We develop ideas rooted in cultural and market understanding to create meaningful and distinctive experiences.",
      color: "#7B3FEF",
    },
    {
      icon: TrendingUp,
      title: "Sustainable Innovation",
      description: "We build intelligent solutions that are scalable and long-lasting, designed to evolve and remain valuable over time.",
      color: "#00D9FF",
    },
    {
      icon: Users,
      title: "Ethical Values",
      description: "We believe in AI that enhances human capability, not replaces it. Our priority is the protection of data, transparency, and respect for privacy.",
      color: "#FF0080",
    },
    {
      icon: Award,
      title: "Success Partnership",
      description: "We invest in long-term partnerships built on trust and shared goals. We work side-by-side with our partners from concept to execution to measurable impact.",
      color: "#FFD700",
    },
    {
      icon: Award,
      title: "Excellence in Execution",
      description: "We commit to precision, professionalism, and measurable outcomes. Every project we deliver reflects high standards of quality and institutional rigor.",
      color: "#00FF94",
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
              A leading technology company specializing in integrating artificial intelligence with innovative digital solutions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00D9FF]/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Vision Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex-1 text-center lg:text-left"
            >
              <div className="inline-flex items-center justify-center lg:justify-end gap-3 mb-4">
                <Eye size={32} className="text-[#7B3FEF]" />
                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground">Our Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To lead the integration of AI and innovation in the world, creating smart, sustainable, and secure solutions
                that empower organizations and individuals to thrive in the digital age.
              </p>
            </motion.div>

            {/* Robot Scene Centerpiece */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative w-full max-w-md lg:max-w-lg aspect-square flex-shrink-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#7B3FEF]/20 to-[#00D9FF]/20 rounded-full blur-3xl animate-pulse" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 shadow-2xl shadow-[#00D9FF]/20">
                {/* Using the generated robot image here. I'll use the path from the artifact directory but I need to copy it to public first. 
                     Since I can't copy files easily, I will assume I can use the artifact path directly or I'll use a placeholder if that fails.
                     Wait, I can't use absolute paths in next/image src easily if it's outside public.
                     I will use a placeholder for now and ask the user to move the file, OR I will try to read the file and write it to public.
                     Actually, I can use the `write_to_file` tool to write the binary content if I read it first? No, `read_file` returns text.
                     I will use the artifact path and hope the browser tool can see it, or I'll just use a placeholder and tell the user.
                     Better: I will use the `run_command` to copy the file.
                 */}
                <img
                  src="/robot-scene.png"
                  alt="Futuristic Robot"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Mission Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex-1 text-center lg:text-left"
            >
              <div className="inline-flex items-center justify-center lg:justify-start gap-3 mb-4">
                <Target size={32} className="text-[#00D9FF]" />
                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We design AI-driven solutions that enhance efficiency, increase value, and create measurable impact.
                We transform data into insight, insight into experience, and experience into sustainable success with a firm
                commitment to privacy and human-centered innovation.
              </p>
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




    </div>
  )
}
