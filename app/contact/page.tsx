"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

const TEAL = "#0CF2C8"
const HAIRLINE = "rgba(255,255,255,0.07)"

const faqs = [
  {
    q: "Is Hamboi Mindcare free?",
    a: "Yes. Hamboi Mindcare is completely free for all African teenagers. No subscriptions, no hidden fees.",
  },
  {
    q: "Is my conversation private?",
    a: "Absolutely. Your conversations are not linked to your personal identity and are never shared with anyone.",
  },
  {
    q: "Is this a replacement for therapy?",
    a: "No. Hamboi Mindcare is a supportive tool, not a medical or therapy service. If you need professional help, please reach out to a qualified mental health professional.",
  },
  {
    q: "Who built Hamboi Mindcare?",
    a: "Hamboi Mindcare was built by Abiodun Abdul Hameed, a 15-year-old from Nigeria and 2025 FIRST Global Bronze Medalist.",
  },
  {
    q: "How can I get involved?",
    a: "Check out our Volunteer page for opportunities, or email us directly at hamboimindcare.help@gmail.com.",
  },
]

const socials = [
  {
    platform: "TikTok",
    handle: "@hamboimindcare",
    url: "https://tiktok.com/@hamboimindcare",
  },
  {
    platform: "YouTube",
    handle: "@Hamboimindcare",
    url: "https://youtube.com/@Hamboimindcare",
  },
  {
    platform: "Instagram",
    handle: "@hamboimindcare",
    url: "https://instagram.com/hamboimindcare",
  },
]

export default function ContactPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: "#06080F", color: "#F5F5F5" }}
    >
      {/* Nav */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          borderBottom: `1px solid ${HAIRLINE}`,
          backgroundColor: "rgba(6,8,15,0.9)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Link href="/">
          <span className="font-serif text-xl font-semibold" style={{ color: "#F5F5F5" }}>
            Hamboi
          </span>
        </Link>
        <Link href="/">
          <button
            className="flex items-center gap-2 text-sm transition-colors"
            style={{ color: "#8B8B8B" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#F5F5F5")}
            onMouseLeave={e => (e.currentTarget.style.color = "#8B8B8B")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </Link>
      </header>

      {/* Hero */}
      <section
        className="px-6 py-24 md:py-32"
        style={{ borderBottom: `1px solid ${HAIRLINE}` }}
      >
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-6"
            style={{ color: TEAL }}
          >
            Contact
          </p>
          <h1
            className="font-serif leading-tight mb-6"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 400, color: "#F5F5F5" }}
          >
            Let&apos;s talk.
          </h1>
          <p
            className="text-base leading-relaxed max-w-xl"
            style={{ color: "#8B8B8B", lineHeight: 1.75 }}
          >
            Have a question, suggestion, or just want to say hi? Every message is read personally.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6">

        {/* Email */}
        <section
          className="py-16"
          style={{ borderBottom: `1px solid ${HAIRLINE}` }}
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-8"
            style={{ color: "#8B8B8B" }}
          >
            Email
          </p>
          <p className="text-base mb-6" style={{ color: "#8B8B8B", lineHeight: 1.75 }}>
            For partnerships, press, volunteering, or general questions:
          </p>
          <a
            href="mailto:hamboimindcare.help@gmail.com"
            className="inline-flex items-center gap-2 text-base font-medium transition-opacity hover:opacity-70"
            style={{ color: TEAL }}
          >
            hamboimindcare.help@gmail.com
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </section>

        {/* Social */}
        <section
          className="py-16"
          style={{ borderBottom: `1px solid ${HAIRLINE}` }}
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-8"
            style={{ color: "#8B8B8B" }}
          >
            Follow Us
          </p>
          <div className="flex flex-col" style={{ borderTop: `1px solid ${HAIRLINE}` }}>
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-5 group transition-colors"
                style={{ borderBottom: `1px solid ${HAIRLINE}` }}
              >
                <div>
                  <span
                    className="font-serif text-xl font-normal transition-colors group-hover:text-white"
                    style={{ color: "#F5F5F5" }}
                  >
                    {s.platform}
                  </span>
                  <span
                    className="block text-sm mt-0.5"
                    style={{ color: "#8B8B8B" }}
                  >
                    {s.handle}
                  </span>
                </div>
                <ArrowUpRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: "#8B8B8B" }}
                />
              </a>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-8"
            style={{ color: "#8B8B8B" }}
          >
            FAQ
          </p>
          <h2
            className="font-serif mb-10"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, color: "#F5F5F5" }}
          >
            Frequently asked questions
          </h2>
          <div style={{ borderTop: `1px solid ${HAIRLINE}` }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{ borderBottom: `1px solid ${HAIRLINE}` }}
              >
                <button
                  className="w-full flex items-center justify-between py-5 text-left group"
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                >
                  <span
                    className="text-base font-medium pr-8 transition-colors"
                    style={{ color: openFAQ === i ? "#F5F5F5" : "#C0C0C0" }}
                  >
                    {faq.q}
                  </span>
                  <span
                    className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-lg transition-transform duration-300"
                    style={{
                      color: TEAL,
                      transform: openFAQ === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: openFAQ === i ? "200px" : "0",
                    opacity: openFAQ === i ? 1 : 0,
                  }}
                >
                  <p
                    className="pb-5 text-sm leading-relaxed"
                    style={{ color: "#8B8B8B", lineHeight: 1.75 }}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Footer note */}
      <div
        className="px-6 py-8 text-center"
        style={{ borderTop: `1px solid ${HAIRLINE}` }}
      >
        <p className="text-xs" style={{ color: "#8B8B8B" }}>
          Hamboi Mindcare is a support tool, not a replacement for professional mental health care.
        </p>
      </div>
    </div>
  )
}
