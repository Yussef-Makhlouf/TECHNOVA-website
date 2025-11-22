"use client"

import Navigation from "@/components/navigation"

import { Briefcase, MapPin, Clock, ArrowRight, Users, Heart, Zap, Trophy } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { DiagonalCard } from "@/components/diagonal-card"

export default function CareersPage() {
  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs",
    },
    {
      icon: Zap,
      title: "Growth Opportunities",
      description: "Continuous learning and career development programs",
    },
    {
      icon: Users,
      title: "Collaborative Culture",
      description: "Work with talented teams on cutting-edge projects",
    },
    {
      icon: Trophy,
      title: "Competitive Compensation",
      description: "Industry-leading salaries and performance bonuses",
    },
  ]

  const team = [
    {
      name: "Sarah Chen",
      role: "Chief Technology Officer",
      image: "/professional-woman-tech-executive.png",
      bio: "15+ years leading technology innovation",
    },
    {
      name: "Michael Rodriguez",
      role: "Head of AI Research",
      image: "/professional-man-ai-researcher.jpg",
      bio: "PhD in Machine Learning, 50+ publications",
    },
    {
      name: "Emily Watson",
      role: "Director of Cybersecurity",
      image: "/professional-woman-cybersecurity.jpg",
      bio: "Certified security expert, 12+ years experience",
    },
    {
      name: "David Kim",
      role: "VP of Engineering",
      image: "/professional-engineering-leader.png",
      bio: "Built and scaled engineering teams globally",
    },
  ]

  const jobs = [
    {
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      description:
        "Build cutting-edge AI solutions for enterprise clients using the latest machine learning technologies.",
    },
    {
      title: "Cloud Solutions Architect",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Design and implement scalable cloud architectures for Fortune 500 companies.",
    },
    {
      title: "Cybersecurity Analyst",
      department: "Security",
      location: "New York, NY",
      type: "Full-time",
      description: "Protect our clients from evolving cyber threats with advanced security solutions.",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Lead product strategy and development for our enterprise software solutions.",
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description: "Create beautiful, intuitive user experiences for our technology platforms.",
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Austin, TX",
      type: "Full-time",
      description: "Build and maintain CI/CD pipelines and infrastructure automation.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-heading text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Join Our Team
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Build the future of technology with a team of passionate innovators and industry leaders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">Why Join TECHNOVA?</h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
              We offer more than just a job – we provide a platform for growth, innovation, and impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <DiagonalCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">Meet Our Leadership</h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Learn from industry experts and visionary leaders who are shaping the future of technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative mb-4 overflow-hidden rounded-2xl">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-[#00D9FF] text-sm mb-2">{member.role}</p>
                <p className="text-foreground/60 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 lg:py-24 bg-muted/30 dark:bg-card/10">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">Open Positions</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Find your next opportunity and join our mission to build the future.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {jobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group p-6 bg-card border border-border rounded-xl hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 dark:bg-card/50"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">{job.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-3 text-muted-foreground text-sm">
                      <span className="flex items-center gap-1">
                        <Briefcase size={14} />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 font-medium whitespace-nowrap"
                  >
                    Apply Now
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}
