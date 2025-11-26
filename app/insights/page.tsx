"use client"

import Navigation from "@/components/navigation"

import { useData } from "@/lib/data-context"
import { getIcon } from "@/lib/icons"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { DiagonalCard } from "@/components/diagonal-card"

export default function InsightsPage() {
  const { insights: insightsData } = useData()

  const insights = insightsData.map(insight => ({
    ...insight,
    icon: getIcon(insight.iconName)
  }))

  const categories = ["All", "Market Analysis", "Technology", "Strategy", "Industry Insights", "Security", "Workforce"]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-40 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-block mb-6">
              <span className="px-4 py-2 rounded-full glass-panel border border-border text-sm font-medium text-accent">
                Industry Insights
              </span>
            </div>
            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              TECHNOVA{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Insights</span>
            </h1>
            <div className="h-1 w-32 mx-auto my-6 bg-gradient-to-r from-primary to-accent rounded-full" />
            <p className="text-xl text-muted-foreground leading-relaxed">
              In-depth analysis, research, and thought leadership on technology trends shaping the future of business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-border bg-card/30 dark:bg-card/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${index === 0
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-card border border-border text-muted-foreground hover:border-accent/50 hover:text-foreground dark:bg-card/50"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Insight */}
      {insights.length > 0 && (
        <section className="py-20 lg:py-32 relative overflow-hidden">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
                Featured Insight
              </div>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground">Latest Research</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 dark:bg-card/50"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-80 lg:h-auto overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                  <img
                    src="/technology-research-data-analytics.jpg"
                    alt={insights[0].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium dark:bg-primary/30">
                      {insights[0].category}
                    </span>
                    <div className="flex items-center gap-4 text-muted-foreground text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {insights[0].date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {insights[0].readTime}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
                    {insights[0].title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-6">{insights[0].description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">By {insights[0].author}</span>
                    <Link
                      href={insights[0].href || "#"}
                      className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all duration-300 font-medium group-hover:text-accent"
                    >
                      Read Insight
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* All Insights Grid */}
      <section className="pb-20 lg:pb-32 relative overflow-hidden">
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {insights.slice(1).map((insight, index) => (
              <DiagonalCard key={index} {...insight} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="glass-panel p-12 lg:p-16 rounded-3xl border border-border dark:bg-card/30">
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Stay Ahead of the Curve
              </h2>
              <div className="h-1 w-32 mx-auto my-6 bg-gradient-to-r from-primary to-accent rounded-full" />
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Subscribe to our insights newsletter and receive the latest research and analysis directly in your
                inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 hover:-translate-y-1"
                >
                  Subscribe Now
                </Link>
                <Link
                  href="/case-studies"
                  className="px-8 py-4 rounded-xl glass-panel border border-border hover:border-accent text-foreground font-medium transition-all duration-300 hover:-translate-y-1 dark:bg-card/30"
                >
                  View Case Studies
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


    </div>
  )
}
