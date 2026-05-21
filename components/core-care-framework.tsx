"use client"

import { useState } from "react"
import { MessageCircle, BookOpen, Phone } from "lucide-react"

const frameworks = [
  {
    title: "Companion Chat",
    badge: "#SafeSpace",
    emoji: "💬",
    description:
      "An always-available, private conversational space to express your thoughts freely, decompress after school, or safely process stressful emotions.",
    icon: MessageCircle,
    accentColor: "from-amber-400/20 to-rose-400/10",
  },
  {
    title: "Peer Columns",
    badge: "#TeenVoices",
    emoji: "📚",
    description:
      "Authentic, raw articles and deep reflections written directly by and for Nigerian teenagers navigating the modern high school experience.",
    icon: BookOpen,
    accentColor: "from-emerald-400/20 to-cyan-400/10",
  },
  {
    title: "Immediate Bridge",
    badge: "#DirectHelp",
    emoji: "🤝",
    description:
      "Direct, fast connections to verified physical hotlines and localized professional mental healthcare systems throughout the country when you need urgent support.",
    icon: Phone,
    accentColor: "from-cyan-400/20 to-blue-400/10",
  },
]

export function CoreCareFramework() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Gradient background that morphs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-900/5 to-cyan-900/5" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="space-y-6 text-center">
          <p className="text-[10px] tracking-[0.2em] font-bold uppercase text-rose-400/80">
            // THE CORE FRAMEWORK
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight">
            A dynamic ecosystem built around{" "}
            <em className="not-italic font-light italic text-amber-100">lived</em> experiences.
          </h2>
        </div>

        {/* 3-Card Stack */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {frameworks.map((framework, index) => {
            const IconComponent = framework.icon
            return (
              <div
                key={index}
                className={`liquid-glass group rounded-3xl p-8 transition-all duration-300 cursor-pointer ${
                  hoveredIndex === index ? "ring-2 ring-white/20" : ""
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Subtle gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${framework.accentColor} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                <div className="relative z-10 space-y-4">
                  {/* Icon and Badge */}
                  <div className="flex items-start justify-between">
                    <div className="text-4xl">{framework.emoji}</div>
                    <span className="text-[8px] tracking-[0.15em] font-bold uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                      {framework.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-light text-white tracking-tight">{framework.title}</h3>

                  {/* Description */}
                  <p className="text-white/60 text-sm leading-relaxed font-light">{framework.description}</p>

                  {/* Subtle footer hint */}
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[10px] text-white/40 uppercase tracking-[0.1em] group-hover:text-white/60 transition-colors">
                      Always accessible
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
