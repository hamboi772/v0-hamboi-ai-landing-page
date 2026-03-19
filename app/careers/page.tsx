
"use client"
import { useState } from "react"

export default function CareersPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#0f0a1e] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-green-900/20" />
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-6 animate-pulse">
            <span className="text-green-300 text-sm font-medium">🌱 Student-Led & Growing</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Join the{" "}
            <span className="bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
              Mission
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Hamboi Mindcare is a student-led platform built by one 15-year-old with a big vision.
            We're not a corporation — we're a movement. And we'd love your help.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="#opportunities" className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-full transition-all hover:scale-105">
              See Opportunities ↓
            </a>
            <a href="mailto:abiodunhamboihameed@gmail.com" className="border border-green-500/50 hover:border-green-400 text-green-300 font-bold px-6 py-3 rounded-full transition-all hover:scale-105">
              Email Us Directly
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Honest Section */}
        <div className="bg-gradient-to-br from-purple-900/30 to-green-900/20 border border-purple-500/20 rounded-2xl p-8 mb-16 hover:border-purple-400/40 transition-colors">
          <h2 className="text-2xl font-bold text-purple-300 mb-4">Let's Be Honest 💜</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Hamboi Mindcare is currently run entirely by one founder — Abiodun Abdul Hameed, age 15,
            from Nigeria. There are no paid positions available right now. But this platform is growing,
            and we genuinely welcome passionate volunteers who believe in what we're building.
          </p>
          <p className="text-gray-300 leading-relaxed">
            If you're a Nigerian teenager, student, or young professional who cares about mental health
            — there's a place for you here.
          </p>
        </div>

        {/* Volunteer Opportunities */}
        <h2 id="opportunities" className="text-3xl font-bold text-center mb-10">
          Volunteer{" "}
          <span className="text-green-400">Opportunities</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
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
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`bg-white/5 border rounded-xl p-6 transition-all duration-300 cursor-pointer ${
                hoveredCard === i
                  ? "border-green-500/60 bg-green-900/10 scale-[1.02] shadow-lg shadow-green-900/20"
                  : "border-white/10"
              }`}
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.desc}</p>
              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill, j) => (
                  <span key={j} className="bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
              {hoveredCard === i && (
                <div className="mt-4">
                  <a
                    href="mailto:abiodunhamboihameed@gmail.com"
                    className="text-green-400 text-sm font-medium hover:underline"
                  >
                    Apply for this role →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Why Volunteer */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why{" "}
            <span className="text-purple-400">Volunteer?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🌍", title: "Real Impact", desc: "Help thousands of Nigerian teenagers access mental health support they desperately need." },
              { icon: "📜", title: "Experience", desc: "Add meaningful volunteer experience to your CV or university application." },
              { icon: "💜", title: "Be Part of Something", desc: "Join a growing movement for teen mental health in Africa from the very beginning." },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-purple-900/40 to-green-900/20 border border-purple-500/20 rounded-xl p-6 text-center hover:border-purple-400/50 hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Get In Touch */}
        <div className="text-center bg-gradient-to-r from-purple-900/50 to-green-900/30 border border-purple-500/30 rounded-2xl p-10 hover:border-purple-400/50 transition-colors">
          <h2 className="text-2xl font-bold mb-4">Interested? Let's Talk! 💚</h2>
          <p className="text-gray-300 mb-2">
            Send us an email telling us who you are, why you care about teen mental health,
            and how you'd like to help.
          </p>
          <p className="text-gray-400 text-sm mb-6">We read every single message personally.</p>
          <a
            href="mailto:abiodunhamboihameed@gmail.com"
            className="inline-block bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105 mb-4"
          >
            📧 abiodunhamboihameed@gmail.com
          </a>
          <p className="text-gray-500 text-sm mt-4">
            Founded by Abiodun Abdul Hameed, Age 15 🇳🇬 | 2025 FIRST Global Bronze Medalist 🥉
          </p>
        </div>

      </div>

      {/* Footer note */}
      <div className="text-center py-8 text-gray-500 text-sm">
        <p>Hamboi Mindcare is a support tool, not a replacement for professional mental health care.</p>
      </div>
    </div>
  )
}
