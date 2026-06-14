"use client"

import { useEffect, useRef } from "react"
import { MessageCircle, Shield, LineChart, Brain, AlertCircle, Heart } from "lucide-react"

const HAIRLINE = "1px solid rgba(255,255,255,0.07)"
const MUTED = "#8B8B8B"
const WHITE = "#F5F5F5"
const TEAL = "#0CF2C8"
const BG = "#06080F"

const features = [
  {
    icon: MessageCircle,
    title: "Chat 24/7",
    description: "Someone's always here. 3am existential crisis? We got you.",
  },
  {
    icon: Shield,
    title: "No Drama Zone",
    description: "Talk without the judgment. Your words, your rules, completely private.",
  },
  {
    icon: LineChart,
    title: "Know Your Vibes",
    description: "Track your mood, spot patterns, actually understand yourself better.",
  },
  {
    icon: Brain,
    title: "Real Strategies",
    description: "Actual coping tools that work. Not fluff, real help.",
  },
  {
    icon: AlertCircle,
    title: "When It's Bad",
    description: "Crisis hotlines, resources, pro help. You're not alone in this.",
  },
  {
    icon: Heart,
    title: "Made For You",
    description: "Built by teens, for teens. We actually get your vibe.",
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const enter = () => { el.style.borderColor = "rgba(12,242,200,0.18)" }
    const leave = () => { el.style.borderColor = "rgba(255,255,255,0.07)" }

    el.addEventListener("mouseenter", enter)
    el.addEventListener("mouseleave", leave)
    return () => {
      el.removeEventListener("mouseenter", enter)
      el.removeEventListener("mouseleave", leave)
    }
  }, [])

  const isLastOdd = features.length % 2 !== 0 && index === features.length - 1

  return (
    <div
      ref={ref}
      style={{
        border: HAIRLINE,
        backgroundColor: BG,
        padding: "40px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        transition: "border-color 0.2s ease",
        gridColumn: isLastOdd ? "1 / -1" : undefined,
        maxWidth: isLastOdd ? 420 : undefined,
        margin: isLastOdd ? "0 auto" : undefined,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: `2px solid ${TEAL}`,
          paddingBottom: 8,
        }}
      >
        <feature.icon size={22} style={{ color: TEAL }} />
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 26,
          fontWeight: 400,
          color: WHITE,
          lineHeight: 1.2,
          margin: 0,
        }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 15,
          color: MUTED,
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {feature.description}
      </p>
    </div>
  )
}

export function FeaturesSection() {
  return (
    <section
      id="features"
      style={{
        backgroundColor: BG,
        borderTop: HAIRLINE,
        borderBottom: HAIRLINE,
        padding: "120px 24px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 80 }}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: TEAL,
              marginBottom: 24,
            }}
          >
            What Hamboi Offers
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(42px, 6vw, 72px)",
              fontWeight: 400,
              color: WHITE,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              maxWidth: 640,
              margin: 0,
            }}
          >
            Everything you need, nothing you don&apos;t
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 0,
            border: HAIRLINE,
          }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
