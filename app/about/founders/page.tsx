import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { FounderCardButton } from "@/components/founder-card-button"

const founders = [
  {
    name: "Abiodun Abdulhameed Abolarinwa",
    image: "/images/founder-abdulhameed.webp",
    title: "Founder & CEO",
    bio: "A young, smart and thoughtful researcher who built Hamboi because he wanted the friend he wished he had at 15. He owns the vision, the product, and every moment no one talks about — driven by curiosity, purpose, and a deep belief that teenagers deserve better.",
    badges: ["🏅 2025 FIRST Global Bronze Medal", "Dr. Mae Jemison Award", "Team Nigeria"],
    readMore: true,
  },
  {
    name: "Fareeah Bada",
    image: "/images/authors/fareeah-bada.jpg",
    title: "Co-Founder, Content & Social media manager",
    bio: "A curious and thoughtful individual with a strong interest in learning, research, and creativity. She enjoys exploring new ideas, writing, and contributing to meaningful projects. With a calm and open-minded approach, she values growth, originality, and continuous learning — and brings all of that to everything she builds at Hamboi.",
    badges: ["✍️ Author of 2 published articles on Hamboi"],
    readMore: false,
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

const HAIRLINE = "rgba(255,255,255,0.07)"
const TEAL = "#0CF2C8"
const FG = "#F5F5F5"
const MUTED = "#8B8B8B"
const BG = "#06080F"

export default function FoundersPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: BG, fontFamily: "'DM Sans', sans-serif", color: FG }}>

      {/* ── Nav ── */}
      <header
        className="sticky top-0 z-50 backdrop-blur-sm"
        style={{ borderBottom: `1px solid ${HAIRLINE}`, backgroundColor: "rgba(6,8,15,0.85)" }}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: FG }}>
              Hamboi
            </span>
          </Link>
          <Link href="/">
            <button
              className="flex items-center gap-2 text-sm transition-colors hover:bg-white/5"
              style={{ border: `1px solid ${HAIRLINE}`, color: MUTED, padding: "8px 16px" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          </Link>
        </div>
      </header>

      {/* ── Page Header ── */}
      <section className="container mx-auto px-6 pt-20 pb-16" style={{ borderBottom: `1px solid ${HAIRLINE}` }}>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 700,
            color: FG,
            lineHeight: 1.08,
            marginBottom: 20,
            maxWidth: 800,
          }}
        >
          The people behind Hamboi
        </h1>
        <p style={{ fontSize: 20, color: MUTED, maxWidth: 540, lineHeight: 1.6 }}>
          Built by teenagers who understand what teenagers go through.
        </p>
      </section>

      {/* ── How It Started ── */}
      <section className="container mx-auto px-6 py-20" style={{ borderBottom: `1px solid ${HAIRLINE}` }}>
        <div className="max-w-2xl">
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 600,
              fontStyle: "italic",
              color: FG,
              marginBottom: 32,
            }}
          >
            How it started
          </h2>
          <p style={{ fontSize: 17, color: MUTED, lineHeight: 1.85, marginBottom: 40 }}>
            Hamboi started with a question — why is it so hard to talk about how you feel?
            Abiodun built it because he wanted the friend he wished he had at 15.
            Not an app. Not a helpline. A space that actually gets you.
          </p>

          {/* Pull quote */}
          <div style={{ borderTop: `1px solid ${HAIRLINE}`, paddingTop: 40 }}>
            <blockquote
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                fontWeight: 500,
                fontStyle: "italic",
                color: FG,
                lineHeight: 1.3,
              }}
            >
              &ldquo;We built Hamboi because we needed it too.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── Founder Cards ── */}
      <section className="container mx-auto px-6 py-20" style={{ borderBottom: `1px solid ${HAIRLINE}` }}>
        <div className="grid md:grid-cols-2" style={{ gap: 0 }}>
          {founders.map((founder, idx) => (
            <div
              key={idx}
              style={{
                borderRight: idx === 0 ? `1px solid ${HAIRLINE}` : "none",
                paddingRight: idx === 0 ? 56 : 0,
                paddingLeft: idx === 1 ? 56 : 0,
              }}
            >
              {/* Photo */}
              <div
                className="w-full overflow-hidden"
                style={{
                  aspectRatio: "4 / 5",
                  marginBottom: 32,
                  border: `1px solid ${HAIRLINE}`,
                }}
              >
                <Image
                  src={founder.image}
                  alt={founder.name}
                  width={600}
                  height={750}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Name */}
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 28,
                  fontWeight: 700,
                  color: FG,
                  marginBottom: 6,
                  lineHeight: 1.15,
                }}
              >
                {founder.name}
              </h3>

              {/* Title */}
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: TEAL,
                  marginBottom: 20,
                  letterSpacing: "0.02em",
                }}
              >
                {founder.title}
              </p>

              {/* Bio */}
              <p
                style={{
                  fontSize: 15,
                  color: MUTED,
                  lineHeight: 1.8,
                  marginBottom: 24,
                }}
              >
                {founder.bio}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2" style={{ marginBottom: 24 }}>
                {founder.badges.map((badge, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: 11,
                      color: FG,
                      border: `1px solid ${HAIRLINE}`,
                      padding: "4px 10px",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Read story link */}
              {founder.readMore && (
                <FounderCardButton href="/about/article" text="Read full story" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Values ── */}
      <section className="container mx-auto px-6 py-20" style={{ borderBottom: `1px solid ${HAIRLINE}` }}>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 700,
            color: FG,
            marginBottom: 60,
          }}
        >
          Our values
        </h2>

        <div className="grid grid-cols-2" style={{ borderTop: `1px solid ${HAIRLINE}`, borderLeft: `1px solid ${HAIRLINE}` }}>
          {values.map((value, idx) => (
            <div
              key={idx}
              style={{
                padding: 40,
                borderRight: `1px solid ${HAIRLINE}`,
                borderBottom: `1px solid ${HAIRLINE}`,
              }}
            >
              <div style={{ width: 32, height: 2, backgroundColor: TEAL, marginBottom: 24 }} />
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: FG,
                  marginBottom: 12,
                }}
              >
                {value.title}
              </h3>
              <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.75 }}>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="container mx-auto px-6 py-10 text-center">
        <p style={{ fontSize: 13, color: MUTED }}>
          &copy; {new Date().getFullYear()} Hamboi Mindcare. Built for teens everywhere.
        </p>
      </footer>

    </div>
  )
}
