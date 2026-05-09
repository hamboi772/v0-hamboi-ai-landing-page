import { Heart, ArrowLeft, Calendar, Clock, User, BookOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArticleContent } from "@/components/article-content"
import { StorySubmissionForm } from "@/components/story-submission-form"
import { Footer } from "@/components/footer"
import { getArticleBySlug, getAllArticles } from "@/lib/data/articles"
import { getMarkdownArticleBySlug, getAllMarkdownArticles } from "@/lib/markdown-utils"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export async function generateStaticParams() {
  const staticArticles = getAllArticles()
  const markdownArticles = getAllMarkdownArticles()

  const allSlugs = [
    ...staticArticles.filter((a) => !a.featured).map((a) => ({ slug: a.slug })),
    ...markdownArticles.map((a) => ({ slug: a.slug }))
  ]

  return allSlugs
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  // Try markdown first
  const mdArticle = await getMarkdownArticleBySlug(slug)
  if (mdArticle) {
    return {
      title: `${mdArticle.title} | Hamboi Mindcare`,
      description: mdArticle.description,
    }
  }

  // Fallback to static
  const article = getArticleBySlug(slug)
  if (!article) return { title: "Article Not Found" }
  return {
    title: `${article.title} | Hamboi Mindcare`,
    description: article.description,
  }
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const mdArticle = await getMarkdownArticleBySlug(slug)
  const staticArticle = getArticleBySlug(slug)

  if (!mdArticle && (!staticArticle || staticArticle.featured)) {
    notFound()
  }

  const articleData = mdArticle || staticArticle!

  return (
    <div className="min-h-screen bg-gradient-to-b from-hamboi-dark-bg via-[#1a1a3e] to-hamboi-dark-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-br from-hamboi-dark-bg/95 to-[#1a1a2e]/95 backdrop-blur-md border-b border-hamboi-purple/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-hamboi-green to-hamboi-cyan flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-hamboi-green to-hamboi-cyan bg-clip-text text-transparent">Hamboi</span>
            </Link>
            <Link href="/resources">
              <Button variant="outline" className="border-2 border-hamboi-purple bg-transparent text-hamboi-purple hover:bg-hamboi-purple/20 font-bold">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Resources
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Article Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="flex justify-center gap-2 mb-8">
              <span className="inline-flex items-center gap-1.5 bg-hamboi-purple/20 border border-hamboi-purple/50 text-hamboi-green px-3 py-1.5 rounded-full text-sm font-bold">
                <BookOpen className="w-4 h-4" />
                {articleData.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight text-balance">
              {articleData.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center justify-center gap-4 mb-8">
              {articleData.author.image ? (
                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-hamboi-purple/40 ring-offset-2 ring-offset-hamboi-dark-bg flex-shrink-0">
                  <Image
                    src={articleData.author.image || "/placeholder.svg"}
                    alt={articleData.author.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-full bg-hamboi-purple/30 flex items-center justify-center flex-shrink-0">
                  <User className="w-7 h-7 text-hamboi-green" />
                </div>
              )}
              <div className="text-left">
                <p className="font-bold text-white text-lg">{articleData.author.name}</p>
                <p className="text-sm text-hamboi-text-muted">
                  {articleData.author.role}, {articleData.author.school}
                </p>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex items-center justify-center gap-6 text-sm text-hamboi-text-muted">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {articleData.publishedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {articleData.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <ArticleContent
            title={articleData.title}
            description={articleData.description}
            category={articleData.category}
            publishedDate={articleData.publishedDate}
            readTime={articleData.readTime}
            author={articleData.author}
            contentHtml={mdArticle?.contentHtml}
            content={staticArticle?.content}
          />

          {/* CTA Section */}
          <StorySubmissionForm />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
