"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Calendar, Clock, ArrowLeft, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function InsightDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const insight = {
    title: "Market Analysis: The Shift to Cloud-Native",
    category: "Industry Insights",
    date: "Jan 20, 2025",
    readTime: "5 min read",
    author: "Market Research Team",
    image: "/fintech-dashboard-ui.jpg",
    content: `
      <p class="mb-6 text-lg leading-relaxed text-muted-foreground">
        The migration to cloud-native architectures is accelerating at an unprecedented pace. Our latest market analysis reveals that 85% of enterprises will have a cloud-first strategy by the end of 2025.
      </p>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Key Drivers of Adoption</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
        <li>Need for scalability and flexibility</li>
        <li>Cost optimization through pay-as-you-go models</li>
        <li>Faster time-to-market for new features</li>
        <li>Enhanced security and compliance capabilities</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Challenges to Overcome</h2>
      <p class="mb-6 text-lg leading-relaxed text-muted-foreground">
        While the benefits are clear, the transition is not without hurdles. Legacy system integration, skills gaps, and cultural resistance remain significant barriers that organizations must address proactively.
      </p>
      
      <div class="bg-muted/30 p-6 rounded-xl border-l-4 border-[#00D9FF] my-8">
        <h3 class="font-bold text-foreground mb-2">Strategic Recommendation</h3>
        <p class="text-muted-foreground">Start with a pilot project to demonstrate value before attempting a full-scale migration. Invest heavily in training and upskilling your existing workforce.</p>
      </div>
    `,
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <article className="pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8 mb-12">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Insights
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium dark:bg-accent/30">
                {insight.category}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground text-sm">
                <TrendingUp size={14} />
                Market Report
              </span>
            </div>

            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {insight.title}
            </h1>

            <div className="flex items-center gap-6 text-muted-foreground border-b border-border pb-8 mb-8">
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {insight.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {insight.readTime}
              </span>
            </div>

            <div
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: insight.content }}
            />
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
