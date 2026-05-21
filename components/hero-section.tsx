"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, ChevronDown, ArrowUpRight } from "lucide-react"
import { ChatDemoModal } from "@/components/chat-demo-modal"
import Link from "next/link"

export function HeroSection() {
  const [isChatDemoOpen, setIsChatDemoOpen] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const words = ["You do not have to carry it alone."]
  
  useEffect(() => {
    const timer = setTimeout(() => setWordIndex(1), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <section className="sanctuary-hero-bg relative overflow-hidden min-h-screen flex items-center justify-center pt-24 pb-12">
        {/* Subtle breathing light leaks */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl breathing-light" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl breathing-light" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative z-10 w-full max-w-2xl mx-auto px-6 flex flex-col items-center text-center space-y-8">
          {/* Status Indicator Pill */}
          <div className="liquid-glass status-pill px-4 py-2 rounded-full flex items-center justify-center gap-2 max-w-sm">
            <div className="w-2 h-2 bg-amber-400 rounded-full dot-pulse" />
            <span className="text-[10px] tracking-[0.2em] text-amber-100 font-bold uppercase">
              A Safe Space For Shared Healing
            </span>
          </div>

          {/* Main Headline with Word-by-Word Fade */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white leading-tight">
            <span className="block space-y-2">
              <span className="inline-block animate-blur-in" style={{ animationDelay: "0.1s" }}>
                You do not
              </span>
              <span className="inline-block animate-blur-in ml-3" style={{ animationDelay: "0.2s" }}>
                have to
              </span>
              <br />
              <span className="inline-block animate-blur-in" style={{ animationDelay: "0.3s" }}>
                carry it
              </span>
              <span className="inline-block animate-blur-in ml-3" style={{ animationDelay: "0.4s" }}>
                <em className="not-italic font-light italic text-amber-200">alone.</em>
              </span>
            </span>
          </h1>

          {/* Functional Description */}
          <p className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed animate-blur-in" style={{ animationDelay: "0.5s" }}>
            Hamboi Mindcare provides 24/7 AI-driven, private mental health support tailored for teenagers in Nigeria, featuring student articles and localized crisis resources. The platform offers a safe, accessible tool for emotional support but is not a replacement for professional therapy.
          </p>

          {/* CTA Buttons — Symmetrical Layout */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-blur-in" style={{ animationDelay: "0.6s" }}>
            <Button
              onClick={() => setIsChatDemoOpen(true)}
              className="w-full sm:w-auto px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all hover:scale-105 active:scale-95 text-lg"
            >
              Talk to Companion
            </Button>
            <Button
              variant="ghost"
              className="w-full sm:w-auto px-8 py-3 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-all flex items-center justify-center gap-2"
            >
              How Peer Works
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Social Proof Footer */}
          <div className="flex flex-col items-center gap-4 pt-12 animate-blur-in" style={{ animationDelay: "0.7s" }}>
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/30 font-semibold">
              Scroll Down
            </p>
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-white/20" />
              <p className="text-[11px] tracking-[0.15em] text-white/50 font-bold">
                175+ VERIFIED CUSTOMER INTERACTIONS
              </p>
              <div className="h-px w-8 bg-white/20" />
            </div>
            {/* Avatar Bubble */}
            <div className="flex -space-x-2 mt-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 border border-white/20"
                />
              ))}
            </div>
          </div>

          {/* Chevron Down for scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
            <ChevronDown className="h-6 w-6 text-white/40" />
          </div>
        </div>
      </section>

      <ChatDemoModal isOpen={isChatDemoOpen} onClose={() => setIsChatDemoOpen(false)} />
    </>
  )
}
