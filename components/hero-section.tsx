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
                  <span className="text-hamboi-purple">H</span>ope <span className="text-hamboi-purple">A</span>nd{" "}
                  <span className="text-hamboi-purple">M</span>ind <span className="text-hamboi-purple">B</span>alance:{" "}
                  <span className="text-hamboi-purple">O</span>utreach <span className="text-hamboi-purple">I</span>
                  nitiative
                </p>
              </div>

              <p className="text-lg md:text-xl text-hamboi-dark/70 max-w-lg text-pretty">
                Talk to Hamboi Mindcare anytime you need support. Try it now — just press the button and talk! You're
                not alone.
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    onClick={() => setIsChatDemoOpen(true)}
                    className="bg-gradient-to-r from-hamboi-purple to-hamboi-blue hover:opacity-90 text-white text-lg px-8 py-6 rounded-full shadow-lg shadow-hamboi-purple/25 transition-all hover:shadow-xl hover:shadow-hamboi-purple/30"
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Try Chat Demo
                  </Button>
                  <Link href="/features">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-hamboi-purple text-hamboi-purple hover:bg-hamboi-purple/10 text-lg px-8 py-6 rounded-full bg-transparent"
                    >
                      <LayoutDashboard className="h-5 w-5 mr-2" />
                      My Dashboard
                    </Button>
                  </Link>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-hamboi-dark/60 font-medium">Install the app on your phone:</p>
                  {isInstallable && (
                    <Button
                      size="lg"
                      onClick={handleInstallClick}
                      className="bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-90 text-white px-6 py-5 rounded-full shadow-lg"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Install Hamboi Mindcare
                    </Button>
                  )}
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

      {/* iOS Install Instructions Modal */}
      {showIOSInstructions && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowIOSInstructions(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-hamboi-dark">Install on iPhone/iPad</h3>
              <button onClick={() => setShowIOSInstructions(false)} className="p-1">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-hamboi-purple/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-hamboi-purple font-bold">1</span>
                </div>
                <p className="text-hamboi-dark/70">Tap the <strong>Share</strong> button at the bottom of Safari (the square with an arrow pointing up)</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-hamboi-purple/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-hamboi-purple font-bold">2</span>
                </div>
                <p className="text-hamboi-dark/70">Scroll down and tap <strong>"Add to Home Screen"</strong></p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-hamboi-purple/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-hamboi-purple font-bold">3</span>
                </div>
                <p className="text-hamboi-dark/70">Tap <strong>"Add"</strong> in the top right corner</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-hamboi-light rounded-xl">
              <div className="flex items-center gap-3">
                <Smartphone className="h-6 w-6 text-hamboi-purple" />
                <p className="text-sm text-hamboi-dark/70">Hamboi Mindcare will appear on your home screen like a regular app!</p>
              </div>
            </div>
            <Button onClick={() => setShowIOSInstructions(false)} className="w-full mt-4 bg-hamboi-purple hover:bg-hamboi-purple/90">
              Got it!
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
