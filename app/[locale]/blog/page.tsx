"use client"

import Navigation from "@/components/navigation"

import { Calendar, Clock, ArrowRight, FileText, User } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { DiagonalCard } from "@/components/diagonal-card"
import { useTranslations, useLocale } from "next-intl"
import { useData } from "@/lib/data-context"
import { useState, useMemo } from "react"

export default function BlogPage() {
  const t = useTranslations('blogPage')
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const { insights: blogsData } = useData() // Using insights data for blogs as per data context structure
  const [selectedCategory, setSelectedCategory] = useState(0)

  const articles = blogsData.map(blog => ({
    ...blog,
    title: isRtl ? blog.titleAr || blog.title : blog.title,
    description: isRtl ? blog.descriptionAr || blog.description : blog.description,
    author: isRtl ? blog.authorAr || blog.author : blog.author,
    category: isRtl ? blog.categoryAr || blog.category : blog.category,
    href: `/${locale}/blog/${blog._id}`
  }))

  const categories = [
    t('categories.all'),
    t('categories.ai'),
    t('categories.cloud'),
    t('categories.cybersecurity'),
    t('categories.digitalTransformation'),
    t('categories.iot')
  ]

  // Filter articles based on selected category
  const filteredArticles = useMemo(() => {
    if (selectedCategory === 0) {
      return articles // Show all articles
    }
    const selectedCategoryName = categories[selectedCategory]
    return articles.filter(article =>
      article.category?.toLowerCase() === selectedCategoryName?.toLowerCase()
    )
  }, [selectedCategory, articles, categories])

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
              {t('hero.title')}
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              {t('hero.description')}
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
                onClick={() => setSelectedCategory(index)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === index
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
      {filteredArticles.length > 0 && (
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
                    src={filteredArticles[0].image || "/placeholder.svg"}
                    alt={filteredArticles[0].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#7B3FEF] text-white rounded-full text-xs font-medium">{t('featured.badge')}</span>
                  </div>
                </div>

                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-[#7B3FEF]/20 text-[#7B3FEF] rounded-full text-xs font-medium">
                      {filteredArticles[0].category}
                    </span>
                    <div className="flex items-center gap-4 text-foreground/60 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {filteredArticles[0].date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {filteredArticles[0].readTime}
                      </span>
                    </div>
                  </div>

                  <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    {filteredArticles[0].title}
                  </h2>

                  <p className="text-foreground/70 leading-relaxed mb-6 line-clamp-3">{filteredArticles[0].description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-foreground/60 text-sm flex items-center gap-1">
                      <User size={14} />
                      {t('featured.by')} {filteredArticles[0].author}
                    </span>
                    <Link
                      href={filteredArticles[0].href}
                      className="inline-flex items-center gap-2 text-[#00D9FF] hover:gap-3 transition-all duration-300 font-medium"
                    >
                      {t('featured.readMore')}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <section className="pb-20 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {filteredArticles.length > 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.slice(1).map((article, index) => (
                <DiagonalCard
                  key={index}
                  icon={FileText}
                  title={article.title}
                  description={article.description}
                  href={article.href}
                  index={index}
                  className="h-full"
                />
              ))}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-foreground/60 text-lg">{t('noResults') || 'No articles found in this category'}</p>
            </div>
          ) : null}
        </div>
      </section>


    </div>
  )
}
