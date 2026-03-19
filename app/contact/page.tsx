
"use client"
import { useState } from "react"

export default function ContactPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      q: "Is Hamboi Mindcare free?",
      a: "Yes! Hamboi Mindcare is completely free for all African teenagers. No subscriptions, no hidden fees.",
    },
    {
      q: "Is my conversation private?",
      a: "Absolutely. Your conversations are not linked to your personal identity and are not shared with anyone.",
    },
    {
      q: "Is this a replacement for therapy?",
      a: "No. Hamboi Mindcare is a supportive tool, not a medical or therapy service. If you need professional help, please reach out to a qualified mental health professional.",
    },
    {
      q: "Who built Hamboi Mindcare?",
      a: "Hamboi Mindcare was built by Abiodun Abdul Hameed, a 15-year-old from Nigeria and 2025 FIRST Global Bronze Medalist 🥉.",
    },
    {
      q: "How can I get involved?",
      a: "Check out our Careers page for volunteer opportunities, or email us directly at abiodunhamboihameed@gmail.com.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0f0a1e] text-white">

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-green-900/20" />
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get in{" "}
            <span className="bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have a question, suggestion, or just want to say hi? We'd love to hear from you. Every message is read personally.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Email */}
        <div className="bg-gradient-to-br from-purple-900/30 to-green-900/20 border border-purple-500/20 rounded-2xl p-8 mb-16 text-center hover:border-purple-400/40 transition-colors">
          <div className="text-4xl mb-4">📧</div>
          <h2 className="text-2xl font-bold mb-2">Email Us</h2>
          <p className="text-gray-400 mb-4">For partnerships, press, volunteering, or general questions:</p>
          <a
            href="mailto:abiodunhamboihameed@gmail.com"
            className="inline-block bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105"
          >
            abiodunhamboihameed@gmail.com
          </a>
        </div>

        {/* Social Media */}
        <h2 className="text-3xl font-bold text-center mb-10">
          Follow{" "}
          <span className="text-green-400">Us</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: "🎵",
              platform: "TikTok",
              handle: "@hamboimindcare",
              url: "https://tiktok.com/@hamboimindcare",
              color: "hover:border-pink-500/60 hover:bg-pink-900/10",
            },
            {
              icon: "▶️",
              platform: "YouTube",
              handle: "@Hamboimindcare",
              url: "https://youtube.com/@Hamboimindcare",
              color: "hover:border-red-500/60 hover:bg-red-900/10",
            },
            {
              icon: "📸",
              platform: "Instagram",
              handle: "@hamboimindcare",
              url: "https://instagram.com/hamboimindcare",
              color: "hover:border-purple-500/60 hover:bg-purple-900/10",
            },
          ].map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-white/5 border border-white/10 rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 ${item.color}`}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-white mb-1">{item.platform}</h3>
              <p className="text-gray-400 text-sm">{item.handle}</p>
            </a>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked{" "}
          <span className="text-purple-400">Questions</span>
        </h2>
        <div className="space-y-4 mb-16">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                openFAQ === i
                  ? "border-purple-500/50 bg-purple-900/20"
                  : "border-white/10 bg-white/5 hover:border-purple-500/30"
              }`}
              onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
            >
              <div className="flex justify-between items-center px-6 py-4">
                <h3 className="font-semibold text-white">{faq.q}</h3>
                <span className="text-purple-400 text-xl transition-transform duration-300" style={{ transform: openFAQ === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
              </div>
              {openFAQ === i && (
                <div className="px-6 pb-4">
                  <p className="text-gray-300 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Footer note */}
      <div className="text-center py-8 text-gray-500 text-sm">
        <p>Hamboi Mindcare is a support tool, not a replacement for professional mental health care.</p>
      </div>
    </div>
  )
}
