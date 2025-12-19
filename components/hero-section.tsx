"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, Sparkles } from "lucide-react"
import { ChatDemoModal } from "@/components/chat-demo-modal"
import { AppStoreBadges } from "@/components/app-store-badges"

export function HeroSection() {
  const [isChatDemoOpen, setIsChatDemoOpen] = useState(false)

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-hamboi-light via-white to-hamboi-blue/10 py-20 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(167,139,250,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(96,165,250,0.15),transparent_50%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-hamboi-purple/10 rounded-full text-hamboi-purple text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                <span>Your feelings are valid</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-hamboi-dark leading-tight text-balance">
                Your Mental Health{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-hamboi-purple to-hamboi-blue">
                  Matters
                </span>
              </h1>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-hamboi-purple/20 shadow-sm">
                <p className="text-sm font-semibold text-hamboi-purple uppercase tracking-wider mb-2">HAMBOI</p>
                <p className="text-base md:text-lg font-medium text-hamboi-dark leading-relaxed">
                  <span className="text-hamboi-purple">H</span>ealth <span className="text-hamboi-purple">A</span>
                  dvancement for <span className="text-hamboi-purple">M</span>ental{" "}
                  <span className="text-hamboi-purple">B</span>alance and <span className="text-hamboi-purple">O</span>
                  ptimistic <span className="text-hamboi-purple">I</span>ntervention
                </p>
              </div>

              <p className="text-lg md:text-xl text-hamboi-dark/70 max-w-lg text-pretty">
                Talk to Hamboi Mindcare anytime you need support. Try it now — just press the button and talk! You're
                not alone.
              </p>

              <div className="flex flex-col gap-6">
                <Button
                  size="lg"
                  onClick={() => setIsChatDemoOpen(true)}
                  className="bg-gradient-to-r from-hamboi-purple to-hamboi-blue hover:opacity-90 text-white text-lg px-8 py-6 rounded-full shadow-lg shadow-hamboi-purple/25 transition-all hover:shadow-xl hover:shadow-hamboi-purple/30 w-fit"
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Try Chat Demo
                </Button>

                <div className="space-y-2">
                  <p className="text-sm text-hamboi-dark/60">Download the app:</p>
                  <AppStoreBadges />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-hamboi-purple/30 to-hamboi-blue/30 border-2 border-white flex items-center justify-center text-xs font-medium text-hamboi-dark"
                    >
                      {["A", "J", "M", "S"][i - 1]}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-hamboi-dark/70">
                  <span className="font-semibold text-hamboi-dark">Join our growing community</span> of teens finding
                  support with Hamboi
                </p>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-hamboi-purple/20 to-hamboi-blue/20 rounded-3xl blur-3xl" />
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-hamboi-purple/10">
                  <img
                    src="/diverse-happy-teenagers-supporting-each-other-ment.jpg"
                    alt="Diverse group of teenagers supporting each other"
                    className="w-full h-full object-contain rounded-2xl"
                  />
                </div>

                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-hamboi-purple/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-hamboi-green/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-hamboi-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-hamboi-dark">100% Private</p>
                      <p className="text-sm text-hamboi-dark/60">Your safe space</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-hamboi-purple/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-hamboi-purple/20 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-hamboi-purple" />
                    </div>
                    <div>
                      <p className="font-semibold text-hamboi-dark">24/7 Support</p>
                      <p className="text-sm text-hamboi-dark/60">Always here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ChatDemoModal isOpen={isChatDemoOpen} onClose={() => setIsChatDemoOpen(false)} />
    </>
  )
}
