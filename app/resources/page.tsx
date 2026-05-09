import { Heart, ArrowLeft, ArrowRight, Calendar, Clock, User, BookOpen, Sparkles, Shield, Phone, AlertTriangle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllMarkdownArticles } from "@/lib/markdown-utils"
import { nigerianMentalHealthResources } from "@/lib/data/nigerian-mental-health-resources"

export const metadata = {
  title: "Resources | Hamboi Mindcare",
  description: "Explore mental health resources, student stories, and crisis support available across Nigeria.",
}

export default function ResourcesPage() {
  const markdownArticles = getAllMarkdownArticles()
  const crisisResources = nigerianMentalHealthResources.filter(r => r.type === "crisis" || r.type === "emergency")
  const counselingResources = nigerianMentalHealthResources.filter(r => r.type === "counseling" || r.type === "substance")

  return (
    <div className="min-h-screen bg-gradient-to-b from-hamboi-dark-bg via-[#1a1a3e] to-hamboi-dark-bg text-white">
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
              <Button variant="outline" className="border-2 border-hamboi-purple bg-transparent text-hamboi-purple hover:bg-hamboi-purple/20 font-bold">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            Support & Stories
          </h1>
          <p className="text-lg md:text-xl text-hamboi-text-muted max-w-2xl mx-auto leading-relaxed">
            Find the help you need, read stories from fellow students, and know that you are never alone.
          </p>
        </div>
      </section>

      {/* Mental Health Hotlines */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="w-8 h-8 text-hamboi-green" />
              <h2 className="text-3xl font-bold">Help & Hotlines</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[...crisisResources, ...counselingResources].map((resource, index) => (
                <Card
                  key={index}
                  className="border-2 border-hamboi-purple/40 bg-hamboi-dark-card backdrop-blur-sm"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 text-white">{resource.name}</CardTitle>
                        <CardDescription className="text-hamboi-text-muted">{resource.description}</CardDescription>
                      </div>
                      <span className="bg-hamboi-purple/20 text-hamboi-green text-xs font-bold px-2 py-1 rounded-full border border-hamboi-purple/30">
                        {resource.type.toUpperCase()}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-hamboi-text-muted">
                      <Clock className="h-4 w-4" />
                      <span>{resource.availability}</span>
                    </div>
                    <div className="space-y-2">
                      {resource.phone.map((number, idx) => (
                        <a
                          key={idx}
                          href={`tel:${number.replace(/\s/g, "")}`}
                          className="flex items-center gap-3 p-4 rounded-xl bg-hamboi-dark-bg hover:bg-hamboi-purple/20 transition-all border border-hamboi-purple/40"
                        >
                          <Phone className="h-4 w-4 text-hamboi-green" />
                          <span className="font-mono font-bold text-white">{number}</span>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-6 bg-red-950/30 border-2 border-red-900/50 rounded-2xl">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-red-200 mb-1">In Case of Emergency</h3>
                  <p className="text-red-100/70 text-sm">
                    If you are in immediate danger, call <strong>112</strong> (National) or <strong>767</strong> (Lagos) immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Articles from Markdown */}
      <section className="pb-24 pt-12 border-t border-hamboi-purple/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <BookOpen className="w-8 h-8 text-hamboi-cyan" />
              <h2 className="text-3xl font-bold">Student Articles</h2>
            </div>

            {markdownArticles.length > 0 ? (
              <div className="grid gap-6">
                {markdownArticles.map((article) => (
                  <Link key={article.slug} href={`/articles/${article.slug}`}>
                    <div className="group relative bg-gradient-to-br from-[#1E1B2E] to-[#2a2640] rounded-2xl border border-hamboi-purple/40 p-6 md:p-8 cursor-pointer hover:border-hamboi-purple/70 transition-all duration-300 hover:shadow-xl hover:shadow-hamboi-purple/20 hover:scale-105">
                      <div className="flex flex-wrap gap-2 mb-5">
                        <span className="inline-flex items-center gap-1.5 border border-hamboi-purple/60 bg-hamboi-purple/15 text-hamboi-green px-3 py-1.5 rounded-full text-xs font-bold">
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

                      <h3 className="text-2xl font-black text-white mb-3 group-hover:text-hamboi-green transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-hamboi-text-muted leading-relaxed mb-6">{article.description}</p>

                      <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-hamboi-purple/30">
                        <div className="flex items-center gap-3">
                          {article.author.image ? (
                            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-hamboi-purple/60">
                              <Image
                                src={article.author.image || "/placeholder.svg"}
                                alt={article.author.name}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-hamboi-purple/30 flex items-center justify-center">
                              <User className="w-5 h-5 text-hamboi-purple" />
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-white text-sm">{article.author.name}</p>
                            <p className="text-xs text-hamboi-text-muted">{article.author.role}</p>
                          </div>
                        </div>
                        <Button className="bg-hamboi-purple hover:bg-violet-600 text-white font-bold text-sm gap-2 rounded-xl py-2 px-4">
                          Read Story
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-hamboi-dark-card rounded-2xl border border-dashed border-hamboi-purple/40">
                <p className="text-hamboi-text-muted">No student articles yet. Add your first Markdown article to see it here!</p>
              </div>
            )}

            <div className="mt-16 bg-gradient-to-r from-hamboi-purple/20 to-hamboi-pink/20 rounded-3xl p-8 text-center border border-hamboi-purple/50">
              <h3 className="text-2xl font-black mb-3">Have a story to share?</h3>
              <p className="text-hamboi-text-muted mb-6">Your voice matters. Submit your article to help others.</p>
              <a href="mailto:hamboimindcare.help@gmail.com?subject=Article Submission">
                <Button className="bg-hamboi-green hover:bg-emerald-500 text-hamboi-dark-bg font-bold rounded-2xl py-3 px-8">
                  Submit Your Article
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a15] text-white py-12 border-t border-hamboi-purple/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-hamboi-text-muted">
            © {new Date().getFullYear()} Hamboi Mindcare. Built for teens everywhere.
          </p>
        </div>
      </footer>
    </div>
  )
}
