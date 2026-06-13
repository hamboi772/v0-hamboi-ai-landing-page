"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"


export default function CareersPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#06080F" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b" style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "rgba(6,8,15,0.9)" }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <span className="font-serif text-xl font-bold" style={{ color: "#F5F5F5" }}>Hamboi</span>
            </Link>
            <Link href="/">
              <button className="flex items-center gap-2 text-sm border px-4 py-2 rounded-none hover:opacity-80 transition-opacity" style={{ borderColor: "rgba(255,255,255,0.07)", color: "#F5F5F5" }}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-6xl font-serif font-normal mb-6" style={{ color: "#F5F5F5" }}>
            Join the Mission
          </h1>
          <p className="text-xl mb-8" style={{ color: "#8B8B8B", fontFamily: "'DM Sans', sans-serif" }}>
            Hamboi Mindcare is a student-led platform built by one 15-year-old with a big vision. We're not a corporation — we're a movement. And we'd love your help.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#opportunities"
              className="px-6 py-3 font-medium text-sm rounded-none transition-all"
              style={{
                backgroundColor: "#0CF2C8",
                color: "#06080F",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1"
              }}
            >
              See Opportunities ↓
            </a>
            <a
              href="mailto:hamboimindcare.help@gmail.com"
              className="px-6 py-3 font-medium text-sm border rounded-none transition-all"
              style={{
                borderColor: "rgba(255,255,255,0.07)",
                color: "#0CF2C8",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(12, 242, 200, 0.08)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
              }}
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* Let's Be Honest Section */}
      <section className="py-20 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-serif font-normal mb-6" style={{ color: "#F5F5F5" }}>
            Let's Be Honest
          </h2>
          <div className="space-y-4" style={{ color: "#8B8B8B", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.8 }}>
            <p>
              Hamboi Mindcare is currently run entirely by one founder — Abiodun Abdul Hameed, age 15, from Nigeria. There are no paid positions available right now. But this platform is growing, and we genuinely welcome passionate volunteers who believe in what we're building.
            </p>
            <p>
              If you're a Nigerian teenager, student, or young professional who cares about mental health — there's a place for you here.
            </p>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-20 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 id="opportunities" className="text-4xl font-serif font-normal mb-16" style={{ color: "#F5F5F5" }}>
            Volunteer Opportunities
          </h2>

          <div className="grid md:grid-cols-2 gap-0" style={{ borderRight: `1px solid rgba(255,255,255,0.07)` }}>
            {[
              {
                icon: "✍️",
                title: "Student Writer",
                desc: "Write mental health articles for Nigerian teenagers. Topics include exam stress, peer pressure, anxiety, family pressure and more.",
                skills: ["Good writing skills", "Passion for mental health", "Nigerian teen perspective"],
              },
              {
                icon: "📢",
                title: "Mental Health Advocate",
                desc: "Help spread awareness about Hamboi Mindcare in your school or community. Be a voice for teen mental health in Nigeria.",
                skills: ["Good communication", "Active on social media", "Based in Nigeria"],
              },
              {
                icon: "📱",
                title: "Social Media Volunteer",
                desc: "Help create and share content about Hamboi Mindcare on Instagram, TikTok or Twitter/X to reach more Nigerian teenagers.",
                skills: ["Social media savvy", "Creative mindset", "Consistent poster"],
              },
              {
                icon: "🤝",
                title: "Community Ambassador",
                desc: "Represent Hamboi Mindcare in your school, university or community. Help us connect with teens who need support.",
                skills: ["Leadership skills", "Trustworthy", "Care for others"],
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 border-b border-l"
                style={{
                  borderColor: "rgba(255,255,255,0.07)",
                  borderLeft: i % 2 === 1 ? "none" : `1px solid rgba(255,255,255,0.07)`,
                }}
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-serif font-normal mb-3" style={{ color: "#F5F5F5" }}>
                  {item.title}
                </h3>
                <p className="text-base mb-4" style={{ color: "#8B8B8B", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill, j) => (
                    <span
                      key={j}
                      className="text-xs px-3 py-1 border rounded-none"
                      style={{
                        borderColor: "rgba(255,255,255,0.07)",
                        color: "#8B8B8B",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Volunteer */}
      <section className="py-20 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-serif font-normal mb-16" style={{ color: "#F5F5F5" }}>
            Why Volunteer?
          </h2>

          <div className="grid md:grid-cols-3 gap-0">
            {[
              { icon: "🌍", title: "Real Impact", desc: "Help thousands of Nigerian teenagers access mental health support they desperately need." },
              { icon: "📜", title: "Experience", desc: "Add meaningful volunteer experience to your CV or university application." },
              { icon: "💜", title: "Be Part of Something", desc: "Join a growing movement for teen mental health in Africa from the very beginning." },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 border-r border-b"
                style={{
                  borderColor: "rgba(255,255,255,0.07)",
                  borderRight: i === 2 ? "none" : `1px solid rgba(255,255,255,0.07)`,
                }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-serif font-normal mb-3" style={{ color: "#F5F5F5" }}>
                  {item.title}
                </h3>
                <p className="text-sm" style={{ color: "#8B8B8B", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get In Touch */}
      <section className="py-20 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-4xl font-serif font-normal mb-6" style={{ color: "#F5F5F5" }}>
            Interested? Let's Talk
          </h2>
          <p className="text-base mb-6" style={{ color: "#8B8B8B", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.8 }}>
            Send us an email telling us who you are, why you care about teen mental health, and how you'd like to help. We read every single message personally.
          </p>
          <a
            href="mailto:hamboimindcare.help@gmail.com"
            className="inline-block px-8 py-3 font-medium text-sm rounded-none transition-all"
            style={{
              backgroundColor: "#0CF2C8",
              color: "#06080F",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.9"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1"
            }}
          >
            hamboimindcare.help@gmail.com
          </a>
          <p className="text-xs mt-8" style={{ color: "#8B8B8B", fontFamily: "'DM Sans', sans-serif" }}>
            Founded by Abiodun Abdul Hameed, Age 15 🇳🇬 | 2025 FIRST Global Bronze Medalist 🥉
          </p>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="py-8 text-center" style={{ color: "#8B8B8B", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem" }}>
        <p>Hamboi Mindcare is a support tool, not a replacement for professional mental health care.</p>
      </footer>
    </div>
  )
}
