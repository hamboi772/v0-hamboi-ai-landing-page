
"use client"
import { useState, useEffect, useRef } from "react"

export default function AboutPage() {
  const [counted, setCounted] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted) {
          setCounted(true)
        }
      },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [counted])

  const values = [
    {
      icon: "🆓",
      title: "Free Forever",
      desc: "Mental health support should never have a price tag. Hamboi Mindcare is and will always be completely free for every African teenager.",
    },
    {
      icon: "🔒",
      title: "Privacy First",
      desc: "Your conversations are never linked to your identity. What you share stays between you and the platform — always.",
    },
    {
      icon: "🌍",
      title: "African-Built",
      desc: "Built by an African teen, for African teens. We understand your culture, your pressures, and your unique experience.",
    },
    {
      icon: "💬",
      title: "Stigma-Free",
      desc: "No judgment. No shame. Just a safe space where you can talk freely about how you really feel.",
    },
    {
      icon: "👦",
      title: "Teen-Focused",
      desc: "Everything we build is designed with teenagers in mind — the language, the topics, the experience.",
    },
    {
      icon: "❤️",
      title: "Real Support",
      desc: "From AI companionship to mental health articles written by students — every feature is built to genuinely help.",
    },
  ]

  const problems = [
    {
      stat: "75%",
      desc: "of mental health conditions begin before age 25",
    },
    {
      stat: "90%",
      desc: "of African teens have no access to mental health support",
    },
    {
      stat: "1 in 7",
      desc: "teenagers globally experience a mental health disorder",
    },
  ]

  const offerings = [
    {
      icon: "🤖",
      title: "AI Mental Health Companion",
      desc: "Chat with Hamboi anytime — day or night. No appointments, no waiting rooms, no judgment.",
    },
    {
      icon: "📚",
      title: "Student Articles",
      desc: "Real articles written for real teens about stress, anxiety, peer pressure, family struggles and more.",
    },
    {
      icon: "🔐",
      title: "Private & Safe",
      desc: "Your conversations are completely anonymous. We never store or share your personal identity.",
    },
    {
      icon: "📱",
      title: "Always Available",
      desc: "Available 24/7 on any device. Support whenever and wherever you need it most.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0f0a1e] text-white">

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-green-900/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-green-300 text-sm font-medium">🌍 Built in Nigeria, for Africa</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            About{" "}
            <span className="bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
              Hamboi Mindcare
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A free, private, and always-available mental health companion built specifically for African teenagers — by one of their own.
          </p>

          {/* Google Stats Bar */}
          <div className="mt-10 inline-flex items-center gap-6 bg-white/5 border border-white/10 rounded-2xl px-8 py-4">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-lg">⭐</span>
              <span className="font-bold text-white text-lg">5.0</span>
              <span className="text-gray-400 text-sm">on Google</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-lg">✓</span>
              <span className="font-bold text-white text-lg">115+</span>
              <span className="text-gray-400 text-sm">customer interactions</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="text-blue-400 text-lg">🔵</span>
              <span className="text-gray-300 text-sm">Verified on Google</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-24">

        {/* Our Mission */}
        <div>
          <div className="text-center mb-12">
            <p className="text-green-400 text-sm font-medium tracking-widest uppercase mb-3">Why We Exist</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
                Mission
              </span>
            </h2>
          </div>
          <div className="bg-gradient-to-br from-purple-900/30 to-green-900/20 border border-purple-500/20 rounded-2xl p-10 hover:border-purple-400/40 transition-colors">
            <p className="text-2xl text-gray-200 leading-relaxed text-center font-light">
              To make mental health support{" "}
              <span className="text-green-400 font-semibold">free, accessible, and stigma-free</span>{" "}
              for every African teenager — regardless of where they live, what they earn, or what they're going through.
            </p>
            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto">
                Mental health is not a luxury. Every teenager deserves someone to talk to — a safe space with no judgment, no cost, and no barriers. That's exactly what Hamboi Mindcare is built to be.
              </p>
            </div>
          </div>
        </div>

        {/* The Problem */}
        <div>
          <div className="text-center mb-12">
            <p className="text-purple-400 text-sm font-medium tracking-widest uppercase mb-3">The Reality</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The{" "}
              <span className="text-purple-400">Problem</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Teen mental health in Africa is in crisis — and most of it goes unseen, unheard, and untreated.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((item, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-purple-900/40 to-green-900/10 border border-purple-500/20 rounded-2xl p-8 text-center hover:border-purple-400/50 hover:scale-105 transition-all duration-300"
              >
                <p className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent mb-4">
                  {item.stat}
                </p>
                <p className="text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-gray-400 leading-relaxed">
              In Nigeria and across Africa, mental health stigma, lack of resources, and cultural silence leave millions of teenagers suffering alone. <span className="text-white font-medium">Hamboi Mindcare exists to change that.</span>
            </p>
          </div>
        </div>

        {/* What We Offer */}
        <div>
          <div className="text-center mb-12">
            <p className="text-green-400 text-sm font-medium tracking-widest uppercase mb-3">What We Do</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What We{" "}
              <span className="text-green-400">Offer</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Everything on Hamboi Mindcare is designed to be simple, safe, and actually helpful for teens.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offerings.map((item, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-green-500/40 hover:bg-green-900/10 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div>
          <div className="text-center mb-12">
            <p className="text-purple-400 text-sm font-medium tracking-widest uppercase mb-3">What We Stand For</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our{" "}
              <span className="text-purple-400">Values</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              These aren't just words — they're the principles behind every decision we make.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((item, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-purple-900/30 to-green-900/10 border border-purple-500/20 rounded-xl p-6 text-center hover:border-purple-400/50 hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-white mb-2 text-lg">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-purple-900/50 to-green-900/30 border border-purple-500/30 rounded-2xl p-12 hover:border-purple-400/50 transition-colors">
          <h2 className="text-3xl font-bold mb-4">Ready to Start? 💚</h2>
          <p className="text-gray-300 mb-8 max-w-lg mx-auto leading-relaxed">
            You don't have to figure it all out alone. Hamboi Mindcare is here — free, private, and always ready to listen.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/"
              className="bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105"
            >
              Try Chat Demo
            </a>
            <a
              href="/contact"
              className="border border-purple-500/50 hover:border-purple-400 text-purple-300 font-bold px-8 py-3 rounded-full transition-all hover:scale-105"
            >
              Get in Touch
            </a>
          </div>
        </div>

      </div>

      {/* Footer note */}
      <div className="text-center py-8 text-gray-500 text-sm">
        <p>Hamboi Mindcare is a support tool, not a replacement for professional mental health care.</p>
      </div>
    </div>
  )
}
