import { Heart, ArrowLeft, ArrowRight, Calendar, Clock, User, BookOpen, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { articles } from "@/lib/data/articles"
import { getAllMarkdownArticles } from "@/lib/markdown-utils"

export const metadata = {
  title: "Student Articles | Hamboi Mindcare",
  description:
    "Read inspiring articles written by students on mental health, resilience, and personal growth. Real voices, real experiences.",
}

export default function ArticlesPage() {
  const markdownArticles = getAllMarkdownArticles()

  // Combine static and markdown articles
  const allStudentArticles = [
    ...articles.filter((a) => !a.featured && a.content.length > 0),
    ...markdownArticles
  ].sort((a, b) => {
    // Prefer the 'date' field if available (from markdown), otherwise fallback
    const dateA = (a as any).date ? new Date((a as any).date).getTime() : 0
    const dateB = (b as any).date ? new Date((b as any).date).getTime() : 0
    return dateB - dateA
  })

  const founderArticle = articles.find((a) => a.featured && a.content.length > 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-hamboi-dark-bg via-[#1a1a3e] to-hamboi-dark-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-br from-hamboi-dark-bg/95 to-[#1a1a2e]/95 backdrop-blur-lg border-b border-hamboi-purple/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-hamboi-green to-hamboi-cyan flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-hamboi-green to-hamboi-cyan bg-clip-text text-transparent">Hamboi</span>
            </Link>
            <Link href="/">
              <Button className="border-2 border-hamboi-purple bg-transparent text-hamboi-purple hover:bg-hamboi-purple/20 font-bold">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 bg-hamboi-purple/20 border border-hamboi-purple/50 text-hamboi-green px-4 py-2 rounded-full text-sm font-bold">
              <BookOpen className="w-4 h-4" />
              Student Voices
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight text-balance">
            Stories by Students
          </h1>
          <p className="text-lg md:text-xl text-hamboi-text-muted max-w-2xl mx-auto leading-relaxed">
            Real experiences, real advice from people who actually get it. No fluff, just real talk about what matters.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {founderArticle && (
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-sm font-bold text-hamboi-green uppercase tracking-wider mb-8">
                Featured Story ✨
              </h2>
              <Link href="/about/article">
                <div className="group relative bg-gradient-to-br from-hamboi-purple/80 to-hamboi-pink/80 rounded-3xl p-8 md:p-12 text-white cursor-pointer overflow-hidden hover:shadow-2xl hover:shadow-hamboi-purple/40 transition-all duration-300 hover:scale-105">
                  <div className="relative z-10">
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="inline-flex items-center gap-1.5 border border-hamboi-purple/50 bg-white/10 px-3 py-1.5 rounded-full text-sm font-bold">
                        <Sparkles className="w-3.5 h-3.5" />
                        {founderArticle.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 border border-white/30 bg-white/10 px-3 py-1.5 rounded-full text-sm font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        {founderArticle.readTime}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black mb-6 leading-tight text-balance">
                      {founderArticle.title}
                    </h3>
                    <p className="text-white/90 text-lg mb-8 max-w-2xl leading-relaxed">{founderArticle.description}</p>
                    <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-white/20">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-white">{founderArticle.author.name}</p>
                          <p className="text-sm text-white/80">
                            {founderArticle.author.school} • {founderArticle.author.role}
                          </p>
                        </div>
                      </div>
                      <Button className="bg-white text-hamboi-purple hover:bg-gray-100 font-bold gap-2">
                        Read Story
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Student Articles */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm font-bold text-hamboi-green uppercase tracking-wider mb-8">
              Articles From The Community
            </h2>
            <div className="grid gap-6">
              {allStudentArticles.map((article) => (
                <Link key={article.slug} href={`/articles/${article.slug}`}>
                  <div className="group relative bg-gradient-to-br from-[#1E1B2E] to-[#2a2640] rounded-2xl border border-hamboi-purple/40 p-6 md:p-8 cursor-pointer hover:border-hamboi-purple/70 transition-all duration-300 hover:shadow-xl hover:shadow-hamboi-purple/20 hover:scale-105">
                    {/* Category and metadata badges */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      <span className="inline-flex items-center gap-1.5 border border-hamboi-purple/60 bg-hamboi-purple/15 text-hamboi-green px-3 py-1.5 rounded-full text-xs font-bold">
                        <BookOpen className="w-3 h-3" />
                        {article.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 border border-hamboi-cyan/40 bg-hamboi-cyan/10 text-hamboi-cyan px-3 py-1.5 rounded-full text-xs font-bold">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-hamboi-text-muted px-3 py-1.5 rounded-full text-xs font-medium">
                        <Calendar className="w-3 h-3" />
                        {article.publishedDate}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-black text-white mb-3 group-hover:text-hamboi-green transition-colors text-balance leading-tight">
                      {article.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-hamboi-text-muted leading-relaxed mb-6">{article.description}</p>
                    
                    {/* Author and CTA */}
                    <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-hamboi-purple/30">
                      <div className="flex items-center gap-3">
                        {article.author.image ? (
                          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-hamboi-purple/60 flex-shrink-0">
                            <Image
                              src={article.author.image || "/placeholder.svg"}
                              alt={article.author.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-hamboi-purple/30 flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-hamboi-purple" />
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-white text-sm">{article.author.name}</p>
                          <p className="text-xs text-hamboi-text-muted">
                            {article.author.role} • {article.author.school}
                          </p>
                        </div>
                      </div>
                      <Button className="bg-hamboi-purple hover:bg-violet-600 text-white font-bold text-sm gap-2 rounded-xl h-auto py-2.5 px-4">
                        Read Article
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Share Your Story CTA */}
            <div className="mt-16 bg-gradient-to-r from-hamboi-purple/20 to-hamboi-pink/20 rounded-3xl p-8 md:p-12 text-center border border-hamboi-purple/50">
              <BookOpen className="w-12 h-12 text-hamboi-green mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3">Want to Share Your Story?</h3>
              <p className="text-hamboi-text-muted max-w-xl mx-auto mb-8 text-lg">
                Got a story? We're here for it. Real articles from real students. No judgment, just genuine voices making a difference.
              </p>
              <a href="mailto:hamboimindcare.help@gmail.com?subject=Article Submission for Hamboi Mindcare">
                <Button className="bg-hamboi-green hover:bg-emerald-500 text-hamboi-dark-bg font-bold text-base gap-2 rounded-2xl h-auto py-3 px-8">
                  Submit Your Article
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-hamboi-dark-bg to-[#0a0a15] text-white py-12 border-t border-hamboi-purple/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-hamboi-text-muted">
            © {new Date().getFullYear()} Hamboi Mindcare. Built with{" "}
            <Heart className="h-4 w-4 inline text-hamboi-green" /> for teens everywhere.
          </p>
        </div>
      </footer>
    </div>
  )
}
