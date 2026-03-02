"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, Sparkles, LayoutDashboard, Download, Smartphone, X } from "lucide-react"
import { ChatDemoModal } from "@/components/chat-demo-modal"
import { AppStoreBadges } from "@/components/app-store-badges"
import Link from "next/link"

export function HeroSection() {
  const [isChatDemoOpen, setIsChatDemoOpen] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [showIOSInstructions, setShowIOSInstructions] = useState(false)

  useEffect(() => {
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOS(isIOSDevice)

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         (window.navigator as any).standalone === true
    
    if (!isStandalone) {
      setIsInstallable(true)
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSInstructions(true)
      return
    }

    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        setIsInstallable(false)
      }
      setDeferredPrompt(null)
    }
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-hamboi-dark-bg via-[#1a1a3e] to-[#0f1a2e] py-24 lg:py-40 min-h-screen flex items-center">
        {/* Animated gradient blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-hamboi-purple/20 to-transparent rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-hamboi-green/15 to-transparent rounded-full blur-3xl animate-float-slow" />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-hamboi-cyan/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-hamboi-purple/20 rounded-full text-hamboi-green text-sm font-bold border border-hamboi-purple/40">
                <Sparkles className="h-4 w-4 animate-pulse" />
                <span>Your feelings matter 💜</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] text-balance animate-fade-in-up">
                  Real Talk About
                </h1>
                <h2 className="text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-hamboi-green via-hamboi-cyan to-hamboi-purple bg-clip-text text-transparent animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                  Mental Health
                </h2>
              </div>

              <p className="text-lg md:text-xl text-hamboi-text-muted max-w-xl text-pretty leading-relaxed">
                No judgment here 💚 Just vibes, real support, and someone who actually gets it. Talk whenever, wherever — your AI friend is always down to listen.
              </p>

              <div className="flex flex-col gap-8">
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    onClick={() => setIsChatDemoOpen(true)}
                    className="bg-hamboi-green hover:bg-emerald-500 text-hamboi-dark-bg font-bold text-lg px-10 py-7 rounded-2xl shadow-lg shadow-hamboi-green/40 transition-all hover:shadow-xl hover:shadow-hamboi-green/60 hover:scale-105 active:scale-95 animate-pulse-glow"
                  >
                    <MessageSquare className="h-6 w-6 mr-3" />
                    Try Chat Demo
                  </Button>
                  <Link href="/features">
                    <Button
                      size="lg"
                      className="border-2 border-hamboi-purple bg-transparent text-hamboi-purple hover:bg-hamboi-purple/20 font-bold text-lg px-10 py-7 rounded-2xl transition-all hover:scale-105 active:scale-95"
                    >
                      <LayoutDashboard className="h-6 w-6 mr-3" />
                      Explore Features
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-hamboi-green" />
                    <p className="text-sm text-hamboi-text-muted font-semibold">Get it on your phone:</p>
                  </div>
                  {isInstallable && (
                    <Button
                      size="lg"
                      onClick={handleInstallClick}
                      className="bg-gradient-to-r from-hamboi-purple to-hamboi-pink hover:from-hamboi-purple/90 hover:to-hamboi-pink/90 text-white font-bold px-8 py-6 rounded-2xl shadow-lg shadow-hamboi-purple/30 transition-all hover:scale-105"
                    >
                      <Download className="h-5 w-5 mr-3" />
                      Install App
                    </Button>
                  )}
                  <AppStoreBadges size="large" />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-hamboi-green to-hamboi-cyan border-2 border-hamboi-dark-card flex items-center justify-center text-sm font-bold text-white"
                    >
                      {["A", "J", "M", "S"][i - 1]}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-hamboi-text-muted">
                  <span className="font-bold text-hamboi-green">1,000+ teens</span> getting real support with Hamboi
                </p>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-hamboi-purple/30 to-hamboi-cyan/20 rounded-3xl blur-3xl animate-pulse-soft" />
                <div className="relative bg-gradient-to-br from-hamboi-dark-card to-[#232342] rounded-3xl shadow-2xl p-8 border border-hamboi-purple/30 overflow-hidden animate-fade-in-up">
                  <div className="absolute inset-0 bg-gradient-to-t from-hamboi-purple/10 to-transparent" />
                  <img
                    src="/diverse-happy-teenagers-supporting-each-other-ment.jpg"
                    alt="Diverse group of teenagers supporting each other"
                    className="w-full h-full object-contain rounded-2xl relative z-10"
                  />
                </div>

                <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-hamboi-dark-card to-[#1a1a2e] rounded-2xl shadow-xl p-5 border border-hamboi-green/50 backdrop-blur-sm animate-bounce-subtle" style={{ animationDelay: "0.2s" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-hamboi-green/30 flex items-center justify-center">
                      <svg className="w-6 h-6 text-hamboi-green" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">Private & Safe</p>
                      <p className="text-xs text-hamboi-text-muted">Just between us</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 bg-gradient-to-br from-hamboi-dark-card to-[#1a1a2e] rounded-2xl shadow-xl p-5 border border-hamboi-purple/50 backdrop-blur-sm animate-bounce-subtle">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-hamboi-purple/30 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-hamboi-purple" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">Always Here</p>
                      <p className="text-xs text-hamboi-text-muted">24/7 support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ChatDemoModal isOpen={isChatDemoOpen} onClose={() => setIsChatDemoOpen(false)} />

      {/* iOS Install Instructions Modal */}
      {showIOSInstructions && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowIOSInstructions(false)}>
          <div className="bg-gradient-to-br from-hamboi-dark-card to-[#232342] rounded-3xl p-8 max-w-sm w-full border border-hamboi-purple/30" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">iPhone/iPad Install 📱</h3>
              <button onClick={() => setShowIOSInstructions(false)} className="p-1 hover:bg-hamboi-purple/20 rounded-lg transition">
                <X className="h-6 w-6 text-hamboi-text-muted" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-hamboi-green/30 flex items-center justify-center flex-shrink-0 font-bold text-hamboi-green">
                  1
                </div>
                <p className="text-hamboi-text-muted pt-1">Tap <strong>Share</strong> at the bottom (the box with arrow)</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-hamboi-purple/30 flex items-center justify-center flex-shrink-0 font-bold text-hamboi-purple">
                  2
                </div>
                <p className="text-hamboi-text-muted pt-1">Tap <strong>"Add to Home Screen"</strong></p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-hamboi-cyan/30 flex items-center justify-center flex-shrink-0 font-bold text-hamboi-cyan">
                  3
                </div>
                <p className="text-hamboi-text-muted pt-1">Tap <strong>"Add"</strong> in the corner</p>
              </div>
            </div>
            <div className="mt-8 p-4 bg-hamboi-purple/20 rounded-2xl border border-hamboi-purple/40">
              <div className="flex items-center gap-3">
                <Smartphone className="h-6 w-6 text-hamboi-green flex-shrink-0" />
                <p className="text-sm text-hamboi-text">Done! It's on your home screen like a real app ✨</p>
              </div>
            </div>
            <Button onClick={() => setShowIOSInstructions(false)} className="w-full mt-6 bg-hamboi-green hover:bg-emerald-500 text-hamboi-dark-bg font-bold text-lg py-6 rounded-2xl transition-all hover:scale-105">
              Got it, thanks!
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
