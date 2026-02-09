import { Heart, ArrowLeft, ArrowRight, Calendar, Clock, User, BookOpen, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { articles } from "@/lib/data/articles"

export const metadata = {
  title: "Student Articles | Hamboi Mindcare",
  description:
    "Read inspiring articles written by students on mental health, resilience, and personal growth. Real voices, real experiences.",
}

export default function ArticlesPage() {
  const founderArticle = articles.find((a) => a.featured)
  const studentArticles = articles.filter((a) => !a.featured)

  return (
    <div className="min-h-screen bg-gradient-to-b from-hamboi-light via-background to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-hamboi-purple/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-hamboi-purple to-hamboi-blue flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-hamboi-dark">Hamboi Mindcare</span>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-hamboi-purple/20 bg-transparent text-hamboi-dark">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-hamboi-purple/10 text-hamboi-purple px-4 py-2 rounded-full text-sm font-medium">
              <BookOpen className="w-4 h-4" />
              Student Voices
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-hamboi-dark mb-6 leading-tight text-balance">
            Articles by Students, for Students
          </h1>
          <p className="text-lg md:text-xl text-hamboi-dark/60 max-w-2xl mx-auto leading-relaxed">
            Real stories, real experiences, and real advice from young people who understand what you are going through.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {founderArticle && (
        <section className="pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-sm font-semibold text-hamboi-dark/40 uppercase tracking-wider mb-6">
                Featured Story
              </h2>
              <Link href="/about/article">
                <div className="group bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl p-8 md:p-12 text-white cursor-pointer smooth-hover">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                      <Sparkles className="w-3.5 h-3.5" />
                      {founderArticle.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {founderArticle.readTime}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold mb-4 group-hover:underline decoration-2 underline-offset-4 text-balance">
                    {founderArticle.title}
                  </h3>
                  <p className="text-white/80 text-lg mb-6 max-w-2xl leading-relaxed">{founderArticle.description}</p>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold">{founderArticle.author.name}</p>
                        <p className="text-sm text-white/70">
                          {founderArticle.author.school} | {founderArticle.author.role}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 font-medium">
                      Read Story
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Student Articles */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm font-semibold text-hamboi-dark/40 uppercase tracking-wider mb-6">
              Student Articles
            </h2>
            <div className="grid gap-6">
              {studentArticles.map((article) => (
                <Link key={article.slug} href={`/articles/${article.slug}`}>
                  <div className="group bg-white rounded-2xl border border-hamboi-purple/10 p-6 md:p-8 cursor-pointer smooth-hover hover:shadow-lg hover:border-hamboi-purple/20 transition-all">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center gap-1.5 bg-hamboi-purple/10 text-hamboi-purple px-3 py-1 rounded-full text-xs font-medium">
                        <BookOpen className="w-3 h-3" />
                        {article.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-hamboi-calm/10 text-hamboi-calm px-3 py-1 rounded-full text-xs font-medium">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-hamboi-dark/40 px-3 py-1 rounded-full text-xs">
                        <Calendar className="w-3 h-3" />
                        {article.publishedDate}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-hamboi-dark mb-3 group-hover:text-hamboi-purple transition-colors text-balance">
                      {article.title}
                    </h3>
                    <p className="text-hamboi-dark/60 leading-relaxed mb-6">{article.description}</p>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        {article.author.image ? (
                          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-hamboi-purple/10 flex-shrink-0">
                            <Image
                              src={article.author.image || "/placeholder.svg"}
                              alt={article.author.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-hamboi-purple/10 flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-hamboi-purple" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-hamboi-dark text-sm">{article.author.name}</p>
                          <p className="text-xs text-hamboi-dark/50">
                            {article.author.role}, {article.author.school}
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-2 text-hamboi-purple font-medium text-sm">
                        Read Article
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty state / CTA */}
            <div className="mt-12 bg-hamboi-purple/5 rounded-2xl p-8 md:p-12 text-center border border-dashed border-hamboi-purple/20">
              <BookOpen className="w-10 h-10 text-hamboi-purple/40 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-hamboi-dark mb-2">Want to share your story?</h3>
              <p className="text-hamboi-dark/60 max-w-md mx-auto mb-6">
                We believe every student has a story worth sharing. If you have written an article on mental health,
                resilience, or personal growth, we would love to feature it here.
              </p>
              <a href="mailto:hamboiteam@gmail.com?subject=Article Submission for Hamboi Mindcare">
                <Button className="bg-hamboi-purple hover:bg-hamboi-purple/90 text-white">
                  Submit Your Article
                </Button>
              </a>
            </div>
          </div>
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
