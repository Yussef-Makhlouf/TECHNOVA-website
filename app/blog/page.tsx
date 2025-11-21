"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Calendar, Clock, ArrowRight, FileText } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { DiagonalCard } from "@/components/diagonal-card"

export default function BlogPage() {
  const categories = ["All", "AI & ML", "Cloud", "Cybersecurity", "Digital Transformation", "IoT"]

  const articles = [
    {
      title: "The Future of AI in Enterprise: Trends for 2025",
      excerpt:
        "Explore the latest trends in artificial intelligence and how enterprises are leveraging AI to drive innovation and competitive advantage.",
      author: "Sarah Chen",
      date: "Jan 15, 2025",
      readTime: "8 min read",
      category: "AI & ML",
      image: "/ai-technology-future.png",
      featured: true,
    },
    {
      title: "Cloud Migration Best Practices: A Complete Guide",
      excerpt:
        "Learn the essential strategies and best practices for successful cloud migration, from planning to execution.",
      author: "Michael Rodriguez",
      date: "Jan 12, 2025",
      readTime: "10 min read",
      category: "Cloud",
      image: "/cloud-migration-concept.png",
    },
    {
      title: "Zero Trust Security: Protecting Modern Enterprises",
      excerpt:
        "Discover how zero trust architecture is revolutionizing cybersecurity and protecting organizations from evolving threats.",
      author: "Emily Watson",
      date: "Jan 10, 2025",
      readTime: "6 min read",
      category: "Cybersecurity",
      image: "/cybersecurity-network.jpg",
    },
    {
      title: "Digital Transformation: Beyond Technology",
      excerpt:
        "Understanding the cultural and organizational changes required for successful digital transformation initiatives.",
      author: "David Kim",
      date: "Jan 8, 2025",
      readTime: "7 min read",
      category: "Digital Transformation",
      image: "/digital-transformation-business.png",
    },
    {
      title: "IoT in Manufacturing: Real-World Applications",
      excerpt:
        "How IoT sensors and smart devices are transforming manufacturing operations and enabling predictive maintenance.",
      author: "Lisa Anderson",
      date: "Jan 5, 2025",
      readTime: "9 min read",
      category: "IoT",
      image: "/iot-manufacturing-sensors.jpg",
    },
    {
      title: "Machine Learning Model Deployment at Scale",
      excerpt: "Best practices for deploying and managing machine learning models in production environments.",
      author: "James Park",
      date: "Jan 3, 2025",
      readTime: "11 min read",
      category: "AI & ML",
      image: "/machine-learning-deployment.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-heading text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Insights & Articles
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Stay updated with the latest trends, insights, and best practices in technology and digital innovation.
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
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  index === 0
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

      {/* Featured Article */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 dark:bg-card/50"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-80 lg:h-auto overflow-hidden">
                <img
                  src={articles[0].image || "/placeholder.svg"}
                  alt={articles[0].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#7B3FEF] text-white rounded-full text-xs font-medium">Featured</span>
                </div>
              </div>

              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-[#7B3FEF]/20 text-[#7B3FEF] rounded-full text-xs font-medium">
                    {articles[0].category}
                  </span>
                  <div className="flex items-center gap-4 text-foreground/60 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {articles[0].date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {articles[0].readTime}
                    </span>
                  </div>
                </div>

                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  {articles[0].title}
                </h2>

                <p className="text-foreground/70 leading-relaxed mb-6">{articles[0].excerpt}</p>

                <div className="flex items-center justify-between">
                  <span className="text-foreground/60 text-sm">By {articles[0].author}</span>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-[#00D9FF] hover:gap-3 transition-all duration-300 font-medium"
                  >
                    Read Article
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(1).map((article, index) => (
              <DiagonalCard
                key={index}
                icon={FileText}
                title={article.title}
                description={article.excerpt}
                href={`/blog/${article.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                index={index}
                className="h-full"
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
