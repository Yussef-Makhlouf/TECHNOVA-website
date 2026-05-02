"use client"

import { motion } from "framer-motion"
import { Link } from "@/i18n/routing"
import { ArrowRight, Calendar, Clock } from "lucide-react"

export function BlogPreviewSection() {
  const posts = [
    {
      title: "The Future of AI in Enterprise Software",
      excerpt:
        "Exploring how artificial intelligence is reshaping business operations and creating new opportunities for growth.",
      date: "Mar 15, 2024",
      readTime: "5 min read",
      category: "AI & Machine Learning",
      gradient: "from-[#7B3FEF] to-[#9D5FFF]",
    },
    {
      title: "Building Scalable Cloud Architectures",
      excerpt:
        "Best practices for designing cloud infrastructure that grows with your business needs and maintains peak performance.",
      date: "Mar 12, 2024",
      readTime: "7 min read",
      category: "Cloud Infrastructure",
      gradient: "from-[#00D9FF] to-[#00B8D4]",
    },
    {
      title: "Cybersecurity Trends for 2024",
      excerpt:
        "Stay ahead of emerging threats with our comprehensive guide to the latest cybersecurity strategies and technologies.",
      date: "Mar 10, 2024",
      readTime: "6 min read",
      category: "Security",
      gradient: "from-[#7B3FEF] to-[#00D9FF]",
    },
  ]

  return (
    <section className="py-20 lg:py-32 relative">
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#00D9FF]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#7B3FEF]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-6"
        >
          <div>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">Latest Insights</h2>
            <div className="gradient-line w-24 my-4" />
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Stay informed with our latest thoughts on technology, innovation, and digital transformation.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden lg:inline-flex items-center gap-2 text-[#00D9FF] hover:gap-3 transition-all duration-300 font-medium group"
          >
            View All Posts
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="floating-tile group relative"
            >
              <div className="glass-panel relative h-full p-8 rounded-3xl border-border hover:border-[#00D9FF]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#00D9FF]/10 flex flex-col overflow-hidden">
                <div
                  className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${post.gradient} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div
                  className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${post.gradient} text-white text-xs font-semibold mb-6 self-start shadow-lg uppercase tracking-wide`}
                >
                  {post.category}
                </div>

                <h3 className="font-heading text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-[#00D9FF] transition-colors">
                  {post.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow text-sm">{post.excerpt}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-[#7B3FEF]" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-[#00D9FF]" />
                    {post.readTime}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7B3FEF] via-[#00D9FF] to-[#7B3FEF] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-3xl" />

                <Link
                  href="/blog"
                  className="absolute inset-0 rounded-3xl"
                  aria-label={`Read more about ${post.title}`}
                />
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12 lg:hidden"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7B3FEF] to-[#6B2FDF] text-white rounded-full hover:shadow-lg hover:shadow-[#7B3FEF]/30 transition-all duration-300 font-medium"
          >
            View All Posts
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
