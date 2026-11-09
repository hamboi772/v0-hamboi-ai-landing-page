import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ArticleShareButton } from "@/components/article-share-button"

export const metadata = {
  title: "The Story Behind Hamboi MindCare | Hamboi MindCare",
  description: "The story of how Abiodun Abdulhameed founded Hamboi MindCare as a youth-led mental health awareness initiative.",
}

const textClass = "text-base text-muted-foreground leading-relaxed font-sans"
const textStyle = { color: "#8B8B8B" }

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-background" style={{ backgroundColor: "#06080F" }}>
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm" style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "rgba(6,8,15,0.9)" }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/"><span className="font-serif text-xl font-bold text-foreground">Hamboi</span></Link>
          <Link href="/" className="flex items-center gap-2 text-sm border border-border px-4 py-2 rounded-none hover:bg-muted transition-colors" style={{ borderColor: "rgba(255,255,255,0.07)", color: "#F5F5F5" }}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>
      </header>

      <section className="py-16 md:py-24 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-8 leading-tight" style={{ color: "#F5F5F5" }}>The Story Behind Hamboi MindCare</h1>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.07)" }}><Image src="/images/abiodun-abdulhameed.jpg" alt="Abiodun Abdulhameed Abolarinwa" width={48} height={48} className="w-full h-full object-cover" /></div>
            <div><p className="font-semibold" style={{ color: "#F5F5F5" }}>Abiodun Abdulhameed Abolarinwa</p><p className="text-sm" style={{ color: "#8B8B8B" }}>Founder, Hamboi MindCare</p></div>
          </div>
          <div className="flex items-center gap-6 text-sm" style={{ color: "#8B8B8B" }}><span>January 2025</span><span>5 min read</span></div>
        </div>
      </section>

      <section className="py-20"><div className="container mx-auto px-4"><article className="max-w-3xl mx-auto">
        <div className="space-y-8">
          <p className="text-xl font-serif font-bold leading-relaxed" style={{ color: "#F5F5F5" }}>An idea, a purpose, and a journey still unfolding.</p>
          <h2 className="text-3xl font-serif font-bold mt-12 mb-6" style={{ color: "#F5F5F5" }}>Where It All Began</h2>
          <p className={textClass} style={textStyle}>My name is Abiodun Abdulhameed Abolarinwa, and I’m the founder of Hamboi MindCare, a youth-led mental health awareness initiative for teenagers.</p>
          <p className={textClass} style={textStyle}>I started building Hamboi MindCare when I was 15. I wanted to use technology and creativity to make mental health conversations easier and help young people, especially in Nigeria and across Africa, access useful information and support.</p>
          <p className={textClass} style={textStyle}>Now, at 16, I’m still learning, growing, and finding new ways to turn that idea into something meaningful. I don’t have everything figured out, but I believe in what I’m building, and I’m committed to seeing how far it can go.</p>
          <h2 className="text-3xl font-serif font-bold mt-12 mb-6" style={{ color: "#F5F5F5" }}>More Than an Idea</h2>
          <p className={textClass} style={textStyle}>My journey with Team Nigeria at the FIRST Global Challenge has also shaped who I am today.</p>
          <p className={textClass} style={textStyle}>In 2025, our team earned a bronze medal for the Dr. Mae Jemison Award for International Unity. In 2026, we achieved another milestone, winning a bronze medal in Engineering Documentation.</p>
          <p className={textClass} style={textStyle}>These experiences taught me the value of teamwork, persistence, and learning through challenges. They reminded me that progress isn’t always easy, but every step can teach you something valuable.</p>
          <p className={textClass} style={textStyle}>Robotics and mental health awareness are two different journeys, but both inspire me to learn, create, and contribute to something bigger than myself.</p>
          <div className="border-l-2 pl-6 py-4 my-10" style={{ borderColor: "#0CF2C8" }}><p className="text-lg font-serif leading-relaxed italic" style={{ color: "#F5F5F5" }}>“I’m not building because I have everything figured out. I’m building because I believe this matters.”</p></div>
          <h2 className="text-3xl font-serif font-bold mt-12 mb-6" style={{ color: "#F5F5F5" }}>The Vision Ahead</h2>
          <p className={textClass} style={textStyle}>Today, Hamboi MindCare is growing through educational articles, digital resources, and efforts to make mental health conversations easier for young people.</p>
          <p className={textClass} style={textStyle}>My goal is to build a trusted youth-led initiative that helps teenagers access reliable information and find appropriate support when they need it. Awareness matters, but professional mental health care cannot be replaced by a website or AI tool.</p>
          <p className={textClass} style={textStyle}>There’s still a lot to learn and build, but I’m committed to the journey.</p>
          <p className="text-lg font-serif font-bold leading-relaxed" style={{ color: "#F5F5F5" }}>This is Hamboi MindCare: an idea that started when I was 15, a purpose I’m pursuing at 16, and a journey that continues.</p>
          <p className="font-serif italic" style={{ color: "#F5F5F5" }}>— Abiodun Abdulhameed Abolarinwa<br />Founder, Hamboi MindCare</p>
        </div>

        <div className="mt-16 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}><p className="text-xs font-semibold uppercase tracking-wider mb-6" style={{ color: "#8B8B8B" }}>About the Author</p><div className="flex items-start gap-4"><div className="w-16 h-16 overflow-hidden border flex-shrink-0" style={{ borderColor: "rgba(255,255,255,0.07)" }}><Image src="/images/abiodun-abdulhameed.jpg" alt="Abiodun Abdulhameed Abolarinwa" width={64} height={64} className="w-full h-full object-cover" /></div><div><p className="font-bold" style={{ color: "#F5F5F5" }}>Abiodun Abdulhameed Abolarinwa</p><p className="text-base mt-2 leading-relaxed font-sans" style={textStyle}>A youth founder building Hamboi MindCare to make mental health awareness and reliable support easier for teenagers to access.</p></div></div></div>
        <div className="mt-8 pt-8 border-t flex items-center justify-between flex-wrap gap-4" style={{ borderColor: "rgba(255,255,255,0.07)" }}><p className="text-sm font-sans" style={textStyle}>Found this inspiring? Share it with others.</p><ArticleShareButton articleUrl="/about/article" /></div>
      </article></div></section>

      <footer className="border-t py-8 text-center" style={{ borderColor: "rgba(255,255,255,0.07)" }}><p className="text-sm font-sans" style={textStyle}>© {new Date().getFullYear()} Hamboi Mindcare. Built for teens everywhere.</p></footer>
    </div>
  )
}
