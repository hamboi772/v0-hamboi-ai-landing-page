import Image from "next/image"
import Link from "next/link"
import { FareeahBioExpand } from "@/components/fareeah-bio-expand"

const HAIRLINE = "1px solid rgba(255,255,255,0.07)"
const TEAL = "#0CF2C8"
const MUTED = "#8B8B8B"
const WHITE = "#F5F5F5"

const abiodunBadges = [
  "🏅 2025 FIRST Global Bronze Medalist",
  "🌍 Team Nigeria",
  "Dr. Mae Jemison Award",
]

const fareeahBadges = ["✍️ Author of 2 published articles on Hamboi"]

export function OurStorySection() {
  return (
    <section
      style={{
        backgroundColor: "#06080F",
        borderTop: HAIRLINE,
        borderBottom: HAIRLINE,
        padding: "96px 0",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        {/* ── Section label ── */}
        <p
          style={{
            fontSize: 11,
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: TEAL,
            marginBottom: 20,
          }}
        >
          Our Story
        </p>

        {/* ── Main heading ── */}
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 400,
            color: WHITE,
            lineHeight: 1.1,
            marginBottom: 12,
          }}
        >
          Built From Real Experiences
        </h2>

        {/* ── Subtitle ── */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            color: MUTED,
            marginBottom: 48,
          }}
        >
          The story behind Hamboi Mindcare
        </p>

        {/* ── Story paragraph ── */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 17,
            color: MUTED,
            lineHeight: 1.85,
            maxWidth: 680,
            marginBottom: 40,
          }}
        >
          Hamboi started with a question. Why is it so hard to talk about how you feel? Abiodun built it because he
          wanted the friend he wished he had at 15. Fareeah joined because she believed in that question too and knew
          exactly how to make the answer feel real. Together they built Hamboi. Not an app. Not a helpline. A space
          that actually gets you.
        </p>

        {/* ── Hairline + pull quote ── */}
        <div style={{ borderTop: HAIRLINE, paddingTop: 36, marginBottom: 64 }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(26px, 4vw, 42px)",
              fontWeight: 400,
              color: WHITE,
              lineHeight: 1.25,
              maxWidth: 600,
            }}
          >
            &ldquo;We built Hamboi because we needed it too.&rdquo;
          </p>
        </div>

        {/* ── HAMBOI STANDS FOR ── */}
        <div
          style={{
            borderTop: HAIRLINE,
            borderBottom: HAIRLINE,
            padding: "28px 0",
            marginBottom: 72,
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: MUTED,
              marginBottom: 10,
            }}
          >
            Hamboi stands for
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(20px, 3vw, 30px)",
              fontWeight: 400,
              color: WHITE,
              lineHeight: 1.3,
            }}
          >
            Hope And Mind Balance: Outreach Initiative
          </p>
        </div>

        {/* ── Founder cards — two columns ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 0,
          }}
        >
          {/* ── Founder 1: Abiodun ── */}
          <div
            style={{
              borderRight: HAIRLINE,
              paddingRight: 48,
              paddingBottom: 16,
            }}
          >
            {/* Image */}
            <div
              style={{
                width: "100%",
                aspectRatio: "4 / 5",
                overflow: "hidden",
                marginBottom: 28,
                border: HAIRLINE,
              }}
            >
              <Image
                src="/images/founder-abdulhameed.webp"
                alt="Abiodun Abdulhameed Abolarinwa — Founder & CEO"
                width={480}
                height={600}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Name */}
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 26,
                fontWeight: 500,
                color: WHITE,
                marginBottom: 4,
                lineHeight: 1.2,
              }}
            >
              Abiodun Abdulhameed Abolarinwa
            </h3>

            {/* Title */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: TEAL,
                marginBottom: 20,
                fontWeight: 500,
              }}
            >
              Founder &amp; CEO, Age 15
            </p>

            {/* Bio */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                color: MUTED,
                lineHeight: 1.8,
                marginBottom: 24,
              }}
            >
              A young, smart and thoughtful researcher who built Hamboi because he wanted the friend he wished he had
              at 15. He owns the vision, the product, and every moment no one talks about. Driven by curiosity,
              purpose, and a deep belief that teenagers deserve better.
            </p>

            {/* Badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
              {abiodunBadges.map((b) => (
                <span
                  key={b}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    color: WHITE,
                    border: "1px solid rgba(255,255,255,0.12)",
                    padding: "5px 12px",
                    borderRadius: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  {b}
                </span>
              ))}
            </div>

            {/* Link to full article */}
            <Link
              href="/about/article"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: TEAL,
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Read full story &rarr;
            </Link>
          </div>

          {/* ── Founder 2: Fareeah ── */}
          <div style={{ paddingLeft: 48, paddingBottom: 16 }}>
            {/* Image */}
            <div
              style={{
                width: "100%",
                aspectRatio: "4 / 5",
                overflow: "hidden",
                marginBottom: 28,
                border: HAIRLINE,
              }}
            >
              <Image
                src="/images/authors/fareeah-bada.jpg"
                alt="Fareeah Bada — Co-Founder, Content & Marketing"
                width={480}
                height={600}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
              />
            </div>

            {/* Name */}
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 26,
                fontWeight: 500,
                color: WHITE,
                marginBottom: 4,
                lineHeight: 1.2,
              }}
            >
              Fareeah Bada
            </h3>

            {/* Title */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: TEAL,
                marginBottom: 20,
                fontWeight: 500,
              }}
            >
              Co-Founder, Content &amp; Marketing
            </p>

            {/* Expandable bio — client component */}
            <FareeahBioExpand />

            {/* Badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 }}>
              {fareeahBadges.map((b) => (
                <span
                  key={b}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    color: WHITE,
                    border: "1px solid rgba(255,255,255,0.12)",
                    padding: "5px 12px",
                    borderRadius: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
