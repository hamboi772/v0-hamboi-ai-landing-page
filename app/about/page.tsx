"use client"

export default function AboutPage() {
  const values = [
    {
      title: "Free Forever",
      desc: "Mental health support should never have a price tag. Hamboi Mindcare is and will always be completely free for every African teenager.",
    },
    {
      title: "Privacy First",
      desc: "Your conversations are never linked to your identity. What you share stays between you and the platform — always.",
    },
    {
      title: "African-Built",
      desc: "Built by an African teen, for African teens. We understand your culture, your pressures, and your unique experience.",
    },
    {
      title: "Stigma-Free",
      desc: "No judgment. No shame. Just a safe space where you can talk freely about how you really feel.",
    },
    {
      title: "Teen-Focused",
      desc: "Everything we build is designed with teenagers in mind — the language, the topics, the experience.",
    },
    {
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
      title: "AI Mental Health Companion",
      desc: "Chat with Hamboi anytime — day or night. No appointments, no waiting rooms, no judgment.",
    },
    {
      title: "Student Articles",
      desc: "Real articles written for real teens about stress, anxiety, peer pressure, family struggles and more.",
    },
    {
      title: "Private & Safe",
      desc: "Your conversations are completely anonymous. We never store or share your personal identity.",
    },
    {
      title: "Always Available",
      desc: "Available 24/7 on any device. Support whenever and wherever you need it most.",
    },
  ]

  return (
    <div className="min-h-screen bg-background" style={{ backgroundColor: "#06080F" }}>
      {/* Hero */}
      <section className="relative py-24" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <p className="text-sm font-medium tracking-widest uppercase" style={{ color: "#0CF2C8" }}>
            🌍 Built in Nigeria, for Africa
          </p>
          <h1 className="text-5xl md:text-6xl font-serif font-light leading-tight" style={{ color: "#F5F5F5" }}>
            About Hamboi Mindcare
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "#8B8B8B" }}>
            A free, private, and always-available mental health companion built specifically for African teenagers — by one of their own.
          </p>

          {/* Stats Bar */}
          <div className="pt-8 mt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="text-3xl font-serif font-light" style={{ color: "#F5F5F5" }}>5.0</div>
                <div className="text-sm" style={{ color: "#8B8B8B" }}>⭐ on Google</div>
              </div>
              <div style={{ width: "1px", height: "40px", backgroundColor: "rgba(255,255,255,0.07)" }} />
              <div className="text-center">
                <div className="text-3xl font-serif font-light" style={{ color: "#F5F5F5" }}>115+</div>
                <div className="text-sm" style={{ color: "#8B8B8B" }}>✓ customer interactions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-20 space-y-24">
        {/* Our Mission */}
        <section>
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "#0CF2C8" }}>
              Why We Exist
            </p>
            <h2 className="text-4xl font-serif font-light mb-8" style={{ color: "#F5F5F5" }}>Our Mission</h2>
          </div>
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-center" style={{ color: "#8B8B8B" }}>
              To make mental health support <span style={{ color: "#0CF2C8" }}>free, accessible, and stigma-free</span> for every African teenager — regardless of where they live, what they earn, or what they're going through.
            </p>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "24px" }}>
              <p className="text-center leading-relaxed max-w-2xl mx-auto" style={{ color: "#8B8B8B" }}>
                Mental health is not a luxury. Every teenager deserves someone to talk to — a safe space with no judgment, no cost, and no barriers. That's exactly what Hamboi Mindcare is built to be.
              </p>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section>
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "#0CF2C8" }}>
              The Reality
            </p>
            <h2 className="text-4xl font-serif font-light mb-8" style={{ color: "#F5F5F5" }}>The Problem</h2>
            <p style={{ color: "#8B8B8B" }}>Teen mental health in Africa is in crisis — and most of it goes unseen, unheard, and untreated.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0" style={{ borderLeft: "1px solid rgba(255,255,255,0.07)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {problems.map((item, i) => (
              <div
                key={i}
                className="p-8"
                style={{
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="text-4xl font-serif font-light mb-4" style={{ color: "#0CF2C8" }}>
                  {item.stat}
                </div>
                <p style={{ color: "#8B8B8B" }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-center leading-relaxed" style={{ color: "#8B8B8B" }}>
              In Nigeria and across Africa, mental health stigma, lack of resources, and cultural silence leave millions of teenagers suffering alone. <span style={{ color: "#F5F5F5" }}>Hamboi Mindcare exists to change that.</span>
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section>
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "#0CF2C8" }}>
              What We Do
            </p>
            <h2 className="text-4xl font-serif font-light mb-8" style={{ color: "#F5F5F5" }}>What We Offer</h2>
            <p style={{ color: "#8B8B8B" }}>Everything on Hamboi Mindcare is designed to be simple, safe, and actually helpful for teens.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0" style={{ borderLeft: "1px solid rgba(255,255,255,0.07)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {offerings.map((item, i) => (
              <div
                key={i}
                className="p-8"
                style={{
                  borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
                }}
              >
                <h3 className="font-serif text-xl font-light mb-3" style={{ color: "#F5F5F5" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#8B8B8B" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Values */}
        <section>
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "#0CF2C8" }}>
              What We Stand For
            </p>
            <h2 className="text-4xl font-serif font-light mb-8" style={{ color: "#F5F5F5" }}>Our Values</h2>
            <p style={{ color: "#8B8B8B" }}>These aren't just words — they're the principles behind every decision we make.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0" style={{ borderLeft: "1px solid rgba(255,255,255,0.07)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {values.map((item, i) => (
              <div
                key={i}
                className="p-8"
                style={{
                  borderRight: i % 3 !== 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
                }}
              >
                <h3 className="font-serif text-lg font-light mb-3" style={{ color: "#F5F5F5" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#8B8B8B" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-16" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <h2 className="text-4xl font-serif font-light mb-6" style={{ color: "#F5F5F5" }}>Ready to Start?</h2>
          <p className="text-lg leading-relaxed max-w-lg mx-auto mb-8" style={{ color: "#8B8B8B" }}>
            You don't have to figure it all out alone. Hamboi Mindcare is here — free, private, and always ready to listen.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/"
              className="px-8 py-3 font-medium rounded-none transition-all"
              style={{
                backgroundColor: "#0CF2C8",
                color: "#06080F",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Try Chat Demo
            </a>
            <a
              href="/contact"
              className="px-8 py-3 font-medium border rounded-none transition-all"
              style={{
                borderColor: "rgba(255,255,255,0.07)",
                color: "#0CF2C8",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(12, 242, 200, 0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              Get in Touch
            </a>
          </div>
        </section>
      </div>

      {/* Footer note */}
      <div className="text-center py-8" style={{ color: "#8B8B8B" }}>
        <p className="text-sm">Hamboi Mindcare is a support tool, not a replacement for professional mental health care.</p>
      </div>
    </div>
  )
}
