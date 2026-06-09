import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { FounderCardButton } from "@/components/founder-card-button"

const founders = [
  {
    name: "Abiodun Abdulhameed Abolarinwa",
    image: "/images/founder-abdulhameed.webp",
    title: "Founder & CEO",
    bio: "I built Hamboi because I wanted the friend I wished I had. At 15, I know what Nigerian teens face — the pressure, the silence, the moments no one talks about.",
    badges: ["🥉 2025 FIRST Global Bronze Medal", "Dr. Mae Jemison Award", "Team Nigeria"],
  },
  {
    name: "Fareeah Bada",
    image: "/images/authors/fareeah-bada.jpg",
    title: "Co-Founder, Content & Marketing",
    bio: "Head Girl at Ansar-ud-Deen Academy. Writer, strategist, and the voice that makes Hamboi feel real to the teens we serve. She brings the ideas, the innovations, and the content that keeps Hamboi growing — owning everything from articles to social media.",
    badges: ["✍️ Author of 2 published articles on Hamboi"],
  },
]

const values = [
  {
    title: "Compassion First",
    description: "Every feature we build starts with empathy for the teens we serve.",
  },
  {
    title: "Community Driven",
    description: "Built by teens, for teens. We understand because we've been there.",
  },
  {
    title: "Impact Focused",
    description: "Our success is measured by the lives we help improve.",
  },
  {
    title: "Innovation",
    description: "Using AI and technology to make mental health support accessible.",
  },
]

export default function FoundersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <span className="font-serif text-xl font-bold text-foreground">Hamboi</span>
            </Link>
            <Link href="/">
              <button className="flex items-center gap-2 text-sm border border-border px-4 py-2 rounded-none hover:bg-muted transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="container mx-auto px-4 py-20">
        <h1 className="text-6xl font-serif font-bold text-foreground mb-4">
          The people behind Hamboi
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl font-sans">
          Built by teenagers who understand what teenagers go through.
        </p>
      </section>

      {/* Founders Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-16">
          {founders.map((founder, idx) => (
            <div key={idx} className="border border-border" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              {/* Image */}
              <div className="aspect-square overflow-hidden bg-muted">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold text-foreground mb-1">
                  {founder.name}
                </h3>
                <p className="text-sm font-medium mb-6" style={{ color: "#0CF2C8" }}>
                  {founder.title}
                </p>

                {/* Bio */}
                <p className="text-base text-muted-foreground leading-relaxed mb-8">
                  {founder.bio}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {founder.badges.map((badge, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 border"
                      style={{
                        borderColor: "rgba(255,255,255,0.07)",
                        color: "#F5F5F5",
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Read Story Link */}
                {idx === 0 && (
                  <FounderCardButton href="/about/article" text="Read full story" />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-20 border-t border-border" style={{ borderTopColor: "rgba(255,255,255,0.07)" }}>
        <h2 className="text-5xl font-serif font-bold text-foreground mb-16">
          Our values
        </h2>

        <div className="grid grid-cols-2 gap-0">
          {values.map((value, idx) => (
            <div
              key={idx}
              className="p-8 border-r border-b"
              style={{
                borderColor: "rgba(255,255,255,0.07)",
              }}
            >
              {/* Teal accent bar */}
              <div
                className="w-8 h-1 mb-6"
                style={{ backgroundColor: "#0CF2C8" }}
              />

              <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-border" style={{ borderTopColor: "rgba(255,255,255,0.07)" }}>
        <p className="text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} Hamboi Mindcare. Built for teens everywhere.
        </p>
      </footer>
    </div>
  )
}
