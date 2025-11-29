"use client"

import Navigation from "@/components/navigation"

import { Calendar, Clock, ArrowLeft, Share2, Bookmark } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string

  // In a real app, you would fetch the post data based on the slug
  const post = {
    title: "The Future of AI in Enterprise: Trends for 2025",
    category: "AI & Machine Learning",
    date: "Jan 15, 2025",
    readTime: "8 min read",
    author: "Sarah Chen",
    authorRole: "Chief Technology Officer",
    image: "/ai-technology-future.png",
    content: `
      <p class="mb-6 text-lg leading-relaxed text-muted-foreground">
        Artificial Intelligence is no longer just a buzzword; it's a fundamental driver of business transformation. As we move into 2025, we're seeing a shift from experimental AI projects to mission-critical deployments that are reshaping entire industries.
      </p>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">1. Generative AI Goes Mainstream</h2>
      <p class="mb-6 text-lg leading-relaxed text-muted-foreground">
        Generative AI has moved beyond text and image generation. Enterprises are now using it for code generation, drug discovery, and complex product design. The ability to generate synthetic data is also solving privacy concerns and data scarcity issues in training models.
      </p>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">2. AI Governance and Ethics</h2>
      <p class="mb-6 text-lg leading-relaxed text-muted-foreground">
        With great power comes great responsibility. Organizations are establishing robust AI governance frameworks to ensure ethical use, transparency, and compliance with emerging regulations. Explainable AI (XAI) is becoming a standard requirement for critical systems.
      </p>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">3. Edge AI Computing</h2>
      <p class="mb-6 text-lg leading-relaxed text-muted-foreground">
        Processing data at the edge—closer to where it's generated—is reducing latency and bandwidth costs. From autonomous vehicles to smart manufacturing sensors, Edge AI is enabling real-time decision-making without constant cloud connectivity.
      </p>
      
      <blockquote class="border-l-4 border-[#7B3FEF] pl-6 py-2 my-8 italic text-xl text-foreground">
        "The most successful companies in 2025 will be those that treat AI not as a tool, but as a teammate."
      </blockquote>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Conclusion</h2>
      <p class="mb-6 text-lg leading-relaxed text-muted-foreground">
        The pace of AI innovation shows no signs of slowing down. For enterprise leaders, the challenge is not just adopting these technologies, but integrating them strategically to create sustainable competitive advantages.
      </p>
    `,
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <article className="pt-32 pb-20 lg:pt-40 lg:pb-24">
        {/* Header */}
        <div className="container mx-auto px-4 lg:px-8 mb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Articles
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium dark:bg-primary/30">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground text-sm">
                <Calendar size={14} />
                {post.date}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground text-sm">
                <Clock size={14} />
                {post.readTime}
              </span>
            </div>

            <h1 className="font-heading text-4xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent p-[2px]">
                <div className="w-full h-full rounded-full bg-card overflow-hidden dark:bg-card/50">
                  <img
                    src="/placeholder.svg?height=100&width=100"
                    alt={post.author}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="text-left">
                <div className="font-bold text-foreground">{post.author}</div>
                <div className="text-sm text-muted-foreground">{post.authorRole}</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Featured Image */}
        <div className="container mx-auto px-4 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-border shadow-2xl dark:shadow-accent/10"
          >
            <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-auto" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-start gap-8">
              {/* Social Share Sidebar */}
              <div className="hidden lg:flex flex-col gap-4 sticky top-32">
                <button className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-all dark:bg-card/50">
                  <Share2 size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all dark:bg-card/50">
                  <Bookmark size={18} />
                </button>
              </div>

              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </div>
      </article>


    </div>
  )
}
