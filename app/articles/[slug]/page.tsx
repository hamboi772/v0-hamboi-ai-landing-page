import { Heart, ArrowLeft, Calendar, Clock, User, BookOpen, Smartphone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArticleShareButton } from "@/components/article-share-button"
import { getArticleBySlug, getAllArticles } from "@/lib/data/articles"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles
    .filter((a) => !a.featured)
    .map((article) => ({
      slug: article.slug,
    }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
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
  const article = getArticleBySlug(slug)

  // Redirect featured article to its dedicated page
  if (article?.featured) {
    return notFound()
  }

  if (!article) {
    notFound()
  }

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
            <Link href="/articles">
              <Button variant="outline" className="border-2 border-hamboi-purple bg-transparent text-hamboi-purple hover:bg-hamboi-purple/20 font-bold">
                <ArrowLeft className="h-4 w-4 mr-2" />
                All Articles
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
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight text-balance">
              {article.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center justify-center gap-4 mb-8">
              {article.author.image ? (
                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-hamboi-purple/40 ring-offset-2 ring-offset-hamboi-dark-bg flex-shrink-0">
                  <Image
                    src={article.author.image || "/placeholder.svg"}
                    alt={article.author.name}
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
                <p className="font-bold text-white text-lg">{article.author.name}</p>
                <p className="text-sm text-hamboi-text-muted">
                  {article.author.role}, {article.author.school}
                </p>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex items-center justify-center gap-6 text-sm text-hamboi-text-muted">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {article.publishedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto">
            <div className="bg-hamboi-dark-card border-2 border-hamboi-purple/40 rounded-3xl shadow-xl shadow-hamboi-purple/20 p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                {article.content.map((section, index) => {
                  switch (section.type) {
                    case "heading":
                      return (
                        <h2
                          key={index}
                          className="text-2xl font-bold text-white mt-12 mb-6 first:mt-0"
                        >
                          {section.text}
                        </h2>
                      )
                    case "paragraph":
                      return (
                        <p key={index} className="text-hamboi-text-muted leading-relaxed mb-6">
                          {section.text}
                        </p>
                      )
                    case "quote":
                      return (
                        <div
                          key={index}
                          className="bg-hamboi-purple/20 rounded-2xl p-6 my-10 border-l-4 border-hamboi-purple"
                        >
                          <p className="text-white font-bold italic text-xl leading-relaxed">
                            {section.text}
                          </p>
                        </div>
                      )
                    case "list":
                      return (
                        <ul key={index} className="space-y-3 my-6">
                          {section.items?.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="w-2 h-2 bg-hamboi-green rounded-full mt-2 flex-shrink-0" />
                              <span className="text-hamboi-text-muted">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )
                    default:
                      return null
                  }
                })}
              </div>

              {/* Author Box */}
              <div className="mt-12 pt-8 border-t border-hamboi-purple/40">
                <h3 className="text-sm font-bold text-hamboi-text-muted uppercase tracking-wide mb-6">
                  About the Author
                </h3>
                <div className="bg-gradient-to-br from-[#2a2640] to-[#1E1B2E] border border-hamboi-purple/40 rounded-2xl p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    {article.author.image ? (
                      <div className="w-24 h-24 rounded-2xl overflow-hidden ring-2 ring-hamboi-purple/40 ring-offset-2 ring-offset-hamboi-dark-card flex-shrink-0 shadow-lg">
                        <Image
                          src={article.author.image || "/placeholder.svg"}
                          alt={article.author.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-2xl bg-hamboi-purple/30 flex items-center justify-center flex-shrink-0">
                        <User className="w-10 h-10 text-hamboi-green" />
                      </div>
                    )}
                    <div className="text-center sm:text-left">
                      <p className="font-bold text-white text-xl">{article.author.name}</p>
                      <p className="text-hamboi-green font-bold text-sm mt-0.5">
                        {article.author.role}, {article.author.school}
                      </p>
                      <p className="text-hamboi-text-muted text-sm mt-3 leading-relaxed">
                        {article.author.bio ||
                          `A passionate student voice contributing to mental health awareness through Hamboi Mindcare.`}
                      </p>
                      <span className="inline-flex items-center gap-1.5 bg-hamboi-purple/30 border border-hamboi-purple/50 text-hamboi-green px-3 py-1.5 rounded-full text-xs font-bold mt-4">
                        <BookOpen className="w-3.5 h-3.5" />
                        Student Contributor
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-8 pt-8 border-t border-hamboi-purple/40">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <p className="text-hamboi-text-muted text-sm">Found this helpful? Share it with a friend.</p>
                  <ArticleShareButton title={article.title} description={article.description} />
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 bg-gradient-to-r from-hamboi-purple to-hamboi-green rounded-3xl p-8 md:p-12 text-white text-center">
              <h3 className="text-2xl md:text-3xl font-black mb-4 text-balance">Want to share your own story?</h3>
              <p className="text-white/90 mb-6 max-w-xl mx-auto font-medium">
                Hamboi Mindcare welcomes articles from students everywhere. Your words could help someone who needs to hear them.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/articles">
                  <Button className="bg-white text-hamboi-dark hover:bg-gray-100 font-bold">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read More Articles
                  </Button>
                </Link>
                <a href="mailto:hamboimindcare.help@gmail.com?subject=Article Submission for Hamboi Mindcare">
                  <Button variant="outline" className="border-white text-white hover:bg-white/20 bg-transparent font-bold">
                    Submit an Article
                  </Button>
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-hamboi-dark text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/60">
            © {new Date().getFullYear()} Hamboi Mindcare. Built with{" "}
            <Heart className="h-4 w-4 inline text-red-400" /> for teens everywhere.
          </p>
        </div>
      </footer>
    </div>
  )
}
