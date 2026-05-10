"use client"

import { useEffect, useRef } from "react"
import { MessageCircle, Shield, LineChart, Brain, AlertCircle, Heart } from "lucide-react"

const features = [
  {
    icon: MessageCircle,
    title: "Chat 24/7 💬",
    description: "Someone's always here. 3am existential crisis? We got you.",
    gradient: "from-hamboi-purple to-hamboi-pink",
    glowColor: "hamboi-purple",
    emoji: "💬",
  },
  {
    icon: Shield,
    title: "No Drama Zone 🔒",
    description: "Talk without the judgment. Your words, your rules, completely private.",
    gradient: "from-hamboi-green to-hamboi-cyan",
    glowColor: "hamboi-green",
    emoji: "🔒",
  },
  {
    icon: LineChart,
    title: "Know Your Vibes 📊",
    description: "Track your mood, spot patterns, actually understand yourself better.",
    gradient: "from-hamboi-cyan to-blue-500",
    glowColor: "hamboi-cyan",
    emoji: "📊",
  },
  {
    icon: Brain,
    title: "Real Strategies 🧠",
    description: "Actual coping tools that work. Not fluff, real help.",
    gradient: "from-orange-500 to-hamboi-pink",
    glowColor: "orange",
    emoji: "🧠",
  },
  {
    icon: AlertCircle,
    title: "When It's Bad 🆘",
    description: "Crisis hotlines, resources, pro help. You're not alone in this.",
    gradient: "from-red-500 to-orange-500",
    glowColor: "red",
    emoji: "🆘",
  },
  {
    icon: Heart,
    title: "Made For You 💚",
    description: "Built BY teens, FOR teens. We actually get your vibe.",
    gradient: "from-hamboi-green to-emerald-500",
    glowColor: "hamboi-green",
    emoji: "💚",
  },
]

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function applyTilt(cx: number, cy: number) {
      const rect = el!.getBoundingClientRect()
      const dx = (cx - (rect.left + rect.width / 2)) / (rect.width / 2)
      const dy = (cy - (rect.top + rect.height / 2)) / (rect.height / 2)
      const MAX = 8
      el!.style.transform = `perspective(900px) rotateX(${-dy * MAX}deg) rotateY(${dx * MAX}deg) scale3d(1.03,1.03,1.03)`
    }
    function reset() {
      el!.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)"
    }

    const mm = (e: MouseEvent) => applyTilt(e.clientX, e.clientY)
    const ml = () => reset()
    const tm = (e: TouchEvent) => { if (e.touches[0]) applyTilt(e.touches[0].clientX, e.touches[0].clientY) }
    const te = () => reset()

    el.addEventListener("mousemove", mm)
    el.addEventListener("mouseleave", ml)
    el.addEventListener("touchmove", tm, { passive: true })
    el.addEventListener("touchend", te)
    return () => {
      el.removeEventListener("mousemove", mm)
      el.removeEventListener("mouseleave", ml)
      el.removeEventListener("touchmove", tm)
      el.removeEventListener("touchend", te)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{ transition: "transform 0.15s ease", willChange: "transform", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  )
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-gradient-to-b from-hamboi-dark-bg via-[#1a1a3e] to-hamboi-dark-bg">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-20 reveal">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
            Everything You Need 💚
          </h2>
          <p className="text-lg md:text-xl text-hamboi-text-muted max-w-3xl mx-auto leading-relaxed">
            Real tools for real life. We've got mood tracking, 24/7 support, and strategies that actually work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger">
          {features.map((feature, index) => (
            <TiltCard
              key={feature.title}
              className="group relative h-full reveal"
            >
              {/* Glow background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />

              {/* Card */}
              <div className={`relative bg-gradient-to-br ${feature.gradient} p-px rounded-2xl group-hover:shadow-2xl transition-shadow duration-300`}>
                <div className="relative bg-hamboi-dark-card rounded-2xl p-8 h-full flex flex-col space-y-6">
                  {/* Icon container with gradient bg */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white">{feature.title}</h3>

                  {/* Description */}
                  <p className="text-hamboi-text-muted leading-relaxed flex-grow">{feature.description}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
