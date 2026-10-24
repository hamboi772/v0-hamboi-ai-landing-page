import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ArticleShareButton } from "@/components/article-share-button"

export const metadata = {
  title: "The Story Behind Hamboi MindCare | Hamboi Mindcare",
  description: "Hamboi MindCare began as an idea from a 15-year-old founder who wanted to create a safer, more supportive space for young people to learn about mental health and find help.",
}

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-background" style={{ backgroundColor: "#06080F" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm" style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "rgba(6,8,15,0.9)" }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <span className="font-serif text-xl font-bold text-foreground">Hamboi</span>
            </Link>
            <Link href="/">
              <button className="flex items-center gap-2 text-sm border border-border px-4 py-2 rounded-none hover:bg-muted transition-colors" style={{ borderColor: "rgba(255,255,255,0.07)", color: "#F5F5F5" }}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Article Hero */}
      <section className="py-16 md:py-24 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-8 leading-tight" style={{ color: "#F5F5F5" }}>
              The Story Behind Hamboi MindCare
            </h1>

            {/* Author Info */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-none overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                <Image
                  src="/images/founder-abdulhameed.webp"
                  alt="Abiodun Abdulhameed Abolarinwa"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-foreground" style={{ color: "#F5F5F5" }}>Abiodun Abdulhameed Abolarinwa</p>
                <p className="text-sm text-muted-foreground" style={{ color: "#8B8B8B" }}>Founder, Hamboi MindCare</p>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground" style={{ color: "#8B8B8B" }}>
              <span>January 2025</span>
              <span>5 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <p className="text-xl font-serif font-bold text-foreground leading-relaxed" style={{ color: "#F5F5F5" }}>
                An idea, a purpose, and a journey still unfolding.
              </p>

              <h2 className="text-3xl font-serif font-bold text-foreground mt-12 mb-6" style={{ color: "#F5F5F5" }}>
                Where It All Began
              </h2>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                My name is <span style={{ color: "#F5F5F5" }}>Abiodun Abdulhameed Abolarinwa</span>, and I’m the founder of Hamboi MindCare, a youth-led mental health awareness initiative for teenagers.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                I started building Hamboi MindCare when I was 15. I wanted to use technology and creativity to make mental health conversations easier and help young people, especially in Nigeria and across Africa, access useful information and support.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                Now, at 16, I’m still learning, growing, and finding new ways to turn that idea into something meaningful.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                I don't have everything figured out, but I believe in what I'm building, and I'm committed to seeing how far it can go.
              </p>

              <h2 className="text-3xl font-serif font-bold text-foreground mt-12 mb-6" style={{ color: "#F5F5F5" }}>
                More Than an Idea
              </h2>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                My journey with Team Nigeria at the FIRST Global Challenge has also shaped who I am today.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                In 2025, our team earned a bronze medal for the <span style={{ color: "#F5F5F5" }}>Dr. Mae Jemison Award for International Unity</span>. In 2026, we achieved another milestone, winning a <span style={{ color: "#F5F5F5" }}>bronze medal in Engineering Documentation</span>.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                These experiences taught me the value of teamwork, persistence, and learning through challenges. They reminded me that progress isn’t always easy, but every step can teach you something valuable.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                Robotics and mental health awareness are two different journeys, but both inspire me to learn, create, and contribute to something bigger than myself.
              </p>

              <div className="border-l-2 pl-6 py-4 my-10" style={{ borderColor: "#0CF2C8" }}>
                <p className="text-lg text-foreground font-serif leading-relaxed italic" style={{ color: "#F5F5F5" }}>
                  “I’m not building because I have everything figured out. I’m building because I believe this matters.”
                </p>
              </div>

              <h2 className="text-3xl font-serif font-bold text-foreground mt-12 mb-6" style={{ color: "#F5F5F5" }}>
                The Vision Ahead
              </h2>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                Today, Hamboi MindCare is growing through educational articles, digital resources, and efforts to make mental health conversations easier for young people.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                My goal is to build a trusted youth-led initiative that helps teenagers access reliable information and find appropriate support when they need it. I believe awareness matters, but professional mental health care cannot be replaced by a website or AI tool.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                There’s still a lot to learn and build, but I’m committed to the journey.
              </p>

              <p className="text-lg text-foreground leading-relaxed font-serif font-bold" style={{ color: "#F5F5F5" }}>
                This is Hamboi MindCare: an idea that started when I was 15, a purpose I’m pursuing at 16, and a journey that continues.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                — <span style={{ color: "#F5F5F5" }}>Abiodun Abdulhameed Abolarinwa</span><br />
                Founder, Hamboi MindCare
              </p>

              <p className="text-sm text-muted-foreground italic font-sans" style={{ color: "#8B8B8B" }}>
                Hamboi MindCare provides mental health awareness and educational resources. It does not replace professional diagnosis, treatment, or care.
              </p>
            </div>

            {/* Author Box */}
            <div className="mt-16 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-6" style={{ color: "#8B8B8B" }}>About the Founder</p>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-none overflow-hidden border flex-shrink-0" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                  <Image
                    src="/images/founder-abdulhameed.webp"
                    alt="Abiodun Abdulhameed Abolarinwa"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-foreground" style={{ color: "#F5F5F5" }}>Abiodun Abdulhameed Abolarinwa</p>
                  <p className="text-base text-muted-foreground mt-2 leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                    Founder, Hamboi MindCare
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium border rounded-none" style={{ borderColor: "rgba(255,255,255,0.07)", color: "#0CF2C8" }}>
                      Date of birth: 12 October 2010
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium border rounded-none" style={{ borderColor: "rgba(255,255,255,0.07)", color: "#0CF2C8" }}>
                      Started Hamboi at age 15
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-8 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-sm text-muted-foreground font-sans" style={{ color: "#8B8B8B" }}>Found this inspiring? Share it with others.</p>
                <ArticleShareButton articleUrl="/about/article" />
              </div>
            </div>
          </article>

          {/* CTA Section */}
          <div className="mt-16 border p-12 text-center" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <h3 className="text-3xl font-serif font-bold text-foreground mb-4" style={{ color: "#F5F5F5" }}>Ready to Start Your Journey?</h3>
            <p className="text-base text-muted-foreground mb-8 max-w-xl mx-auto font-sans" style={{ color: "#8B8B8B" }}>
              Hamboi MindCare is here for you. Chat with our AI companion, track your mood, or explore helpful resources.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/">
                <button className="px-6 py-3 bg-foreground text-background font-medium rounded-none transition-opacity hover:opacity-80" style={{ backgroundColor: "#0CF2C8", color: "#06080F" }}>
                  Try Hamboi Now
                </button>
              </Link>
              <Link href="/about/founders">
                <button className="px-6 py-3 border font-medium rounded-none transition-colors" style={{ borderColor: "rgba(255,255,255,0.07)", color: "#F5F5F5" }}>
                  Meet the Founders
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <p className="text-sm text-muted-foreground font-sans" style={{ color: "#8B8B8B" }}>
          © {new Date().getFullYear()} Hamboi Mindcare. Built for teens everywhere.
        </p>
      </footer>
    </div>
  )
}
