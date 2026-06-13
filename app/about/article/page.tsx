import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ArticleShareButton } from "@/components/article-share-button"

export const metadata = {
  title: "The Bronze Medal We Won from Our Bedrooms | Hamboi Mindcare",
  description: "How winning a global robotics award from home led to creating Hamboi MindCare - a mental health platform for Nigerian teens.",
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
              The Bronze Medal We Won from Our Bedrooms
            </h1>

            {/* Author Info */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-none overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                <Image
                  src="/images/founder-abdulhameed.webp"
                  alt="Abiodun Abdul Hameed"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-foreground" style={{ color: "#F5F5F5" }}>Abiodun Abdul Hameed</p>
                <p className="text-sm text-muted-foreground" style={{ color: "#8B8B8B" }}>Age 15 | Founder, Hamboi MindCare</p>
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
              {/* Introduction */}
              <p className="text-xl font-serif font-bold text-foreground leading-relaxed" style={{ color: "#F5F5F5" }}>
                In competitive robotics, 2025 was meant to be our year.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                As part of Team Nigeria, my teammates and I spent months coding, building, failing, fixing, and trying 
                again. All that hard work paid off when we won the Dr. Mae Jemison Award for International Unity at 
                the FIRST Global Challenge, earning a Bronze Medal and ranking among teams from around the world.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                On paper, it was a big win.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed font-sans font-bold" style={{ color: "#C0C0C0" }}>
                But we weren't there.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                While students from over 190 countries gathered in Panama City, my teammates and I were still at home 
                in Nigeria. Not because our robot failed. Not because we weren't good enough. But because of visa 
                issues and financial challenges.
              </p>

              {/* Highlight Quote */}
              <div className="border-l-2 pl-6 py-4 my-10" style={{ borderColor: "#0CF2C8" }}>
                <p className="text-lg text-foreground font-serif leading-relaxed italic" style={{ color: "#F5F5F5" }}>
                  "We watched the opening ceremony on our phones. We were global medalists — watching from our bedrooms."
                </p>
              </div>

              {/* Section: What It Felt Like */}
              <h2 className="text-3xl font-serif font-bold text-foreground mt-12 mb-6" style={{ color: "#F5F5F5" }}>
                What It Felt Like to Be "Stuck"
              </h2>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                Being a young Nigerian student comes with a lot of pressure.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                You're expected to do well in school, build skills, dream big, and somehow not get tired. When 
                something finally works out — and then gets taken away — it hurts more than people realize.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                That moment made me think deeply.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                If we — students who had just won an international award — felt frustrated and drained, what about 
                other students who don't get recognition at all?
              </p>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                So many young people are stressed, overwhelmed, and silently struggling, especially students preparing 
                for exams or trying to build something meaningful with very little support.
              </p>

              {/* Section: How Hamboi Started */}
              <h2 className="text-3xl font-serif font-bold text-foreground mt-12 mb-6" style={{ color: "#F5F5F5" }}>
                How Hamboi MindCare Started
              </h2>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                That experience pushed me to act.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                I decided that if I couldn't travel to Panama, I would still build something that matters.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed font-sans font-bold" style={{ color: "#C0C0C0" }}>
                That's how Hamboi MindCare was born.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                I used what I learned from robotics — problem-solving and logic — and applied it to mental health 
                awareness. Hamboi MindCare is a student-led platform created to support young people through articles, 
                reflection tools, and shared experiences.
              </p>

              {/* List Box */}
              <div className="border p-6 my-8" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                <p className="text-base font-semibold text-foreground mb-4" style={{ color: "#F5F5F5" }}>It's for:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 mt-2 flex-shrink-0" style={{ backgroundColor: "#0CF2C8" }}></span>
                    <span className="text-base text-muted-foreground font-sans" style={{ color: "#8B8B8B" }}>Students stressed about exams</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 mt-2 flex-shrink-0" style={{ backgroundColor: "#0CF2C8" }}></span>
                    <span className="text-base text-muted-foreground font-sans" style={{ color: "#8B8B8B" }}>Teens feeling overwhelmed or misunderstood</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 mt-2 flex-shrink-0" style={{ backgroundColor: "#0CF2C8" }}></span>
                    <span className="text-base text-muted-foreground font-sans" style={{ color: "#8B8B8B" }}>Young people who just need to know they're not alone</span>
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4 text-sm italic font-sans" style={{ color: "#8B8B8B" }}>
                  It's not therapy. It's a safe starting place.
                </p>
              </div>

              {/* Section: What Unity Means */}
              <h2 className="text-3xl font-serif font-bold text-foreground mt-12 mb-6" style={{ color: "#F5F5F5" }}>
                What Unity Means to Me Now
              </h2>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                Our award was for International Unity.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                I've learned that unity isn't about being in the same country. It's about understanding each other's 
                struggles and choosing to support one another anyway.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                We may have been grounded, but our ideas were not.
              </p>

              <p className="text-lg text-foreground leading-relaxed font-serif font-bold" style={{ color: "#F5F5F5" }}>
                With Hamboi MindCare, I want to help prove that you don't need to leave your country to make an impact. 
                Sometimes, change starts right where you are — at 15, with a laptop, a phone, and a strong reason to care.
              </p>
            </div>

            {/* Author Box */}
            <div className="mt-16 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-6" style={{ color: "#8B8B8B" }}>About the Author</p>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-none overflow-hidden border flex-shrink-0" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                  <Image
                    src="/images/founder-abdulhameed.webp"
                    alt="Abiodun Abdul Hameed"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-foreground" style={{ color: "#F5F5F5" }}>Abiodun Abdul Hameed</p>
                  <p className="text-base text-muted-foreground mt-2 leading-relaxed font-sans" style={{ color: "#8B8B8B" }}>
                    A 15-year-old Nigerian student, robotics innovator, and 2025 FIRST Global Challenge Bronze Medalist. 
                    After facing travel challenges with his team, he founded Hamboi MindCare, a youth-led platform 
                    focused on mental health awareness and student-written content.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium border rounded-none" style={{ borderColor: "rgba(255,255,255,0.07)", color: "#0CF2C8" }}>
                      🥉 Bronze Medalist
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium border rounded-none" style={{ borderColor: "rgba(255,255,255,0.07)", color: "#0CF2C8" }}>
                      Team Nigeria
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
