import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const opportunities = [
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
]

const reasons = [
  { icon: "🌍", title: "Real Impact", desc: "Help thousands of Nigerian teenagers access mental health support they desperately need." },
  { icon: "📜", title: "Experience", desc: "Add meaningful volunteer experience to your CV or university application." },
  { icon: "💜", title: "Be Part of Something", desc: "Join a growing movement for teen mental health in Africa from the very beginning." },
]

export default function VolunteerPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#06080F" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b" style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "rgba(6,8,15,0.9)" }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <span className="font-serif text-xl font-bold text-foreground" style={{ color: "#F5F5F5" }}>Hamboi</span>
            </Link>
            <Link href="/">
              <button className="flex items-center gap-2 text-sm border px-4 py-2 rounded-none hover:bg-muted transition-colors" style={{ borderColor: "rgba(255,255,255,0.07)", color: "#F5F5F5" }}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="container mx-auto px-4 py-20 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <h1 className="text-6xl font-serif font-light text-foreground mb-4" style={{ color: "#F5F5F5" }}>
          Volunteer with us
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl" style={{ color: "#8B8B8B" }}>
          Join a movement for teen mental health. No experience necessary — just genuine care.
        </p>
      </section>

      {/* Honest Section */}
      <section className="container mx-auto px-4 py-20 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-serif font-light mb-6" style={{ color: "#F5F5F5" }}>
            Let's be honest
          </h2>
          <div className="space-y-4">
            <p className="text-base leading-relaxed" style={{ color: "#8B8B8B" }}>
              Hamboi Mindcare is currently run entirely by one founder — Abiodun Abdul Hameed, age 15, from Nigeria. There are no paid positions available right now. But this platform is growing, and we genuinely welcome passionate volunteers who believe in what we're building.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "#8B8B8B" }}>
              If you're a Nigerian teenager, student, or young professional who cares about mental health — there's a place for you here.
            </p>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="container mx-auto px-4 py-20 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <h2 className="text-3xl font-serif font-light mb-16" style={{ color: "#F5F5F5" }}>
          Opportunities
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {opportunities.map((item, i) => (
            <div key={i} className="border" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              <div className="p-8">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-serif font-light mb-3" style={{ color: "#F5F5F5" }}>
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed mb-6" style={{ color: "#8B8B8B" }}>
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill, j) => (
                    <span
                      key={j}
                      className="text-xs px-3 py-1 border rounded-none"
                      style={{ borderColor: "rgba(255,255,255,0.07)", color: "#8B8B8B" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                  <a
                    href="mailto:hamboimindcare.help@gmail.com"
                    className="text-sm font-medium transition-colors"
                    style={{ color: "#0CF2C8" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    Apply for this role →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Volunteer */}
      <section className="container mx-auto px-4 py-20 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <h2 className="text-3xl font-serif font-light mb-16" style={{ color: "#F5F5F5" }}>
          Why volunteer
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {reasons.map((item, i) => (
            <div key={i} className="border p-8" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-serif font-light mb-3" style={{ color: "#F5F5F5" }}>
                {item.title}
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "#8B8B8B" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Get In Touch */}
      <section className="container mx-auto px-4 py-20 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="max-w-2xl mx-auto border p-12 text-center" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <h2 className="text-3xl font-serif font-light mb-6" style={{ color: "#F5F5F5" }}>
            Interested? Let's talk
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "#8B8B8B" }}>
            Send us an email telling us who you are, why you care about teen mental health, and how you'd like to help. We read every single message personally.
          </p>
          <a
            href="mailto:hamboimindcare.help@gmail.com"
            className="inline-block px-8 py-3 border rounded-none font-medium transition-all text-sm"
            style={{ borderColor: "#0CF2C8", color: "#0CF2C8", backgroundColor: "transparent" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(12, 242, 200, 0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            📧 hamboimindcare.help@gmail.com
          </a>
          <p className="text-sm mt-8" style={{ color: "#8B8B8B" }}>
            Founded by Abiodun Abdul Hameed, Age 15 🇳🇬 | 2025 FIRST Global Bronze Medalist 🥉
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 text-center border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <p className="text-sm" style={{ color: "#8B8B8B" }}>
          Hamboi Mindcare is a support tool, not a replacement for professional mental health care.
        </p>
      </footer>
    </div>
  )
}
