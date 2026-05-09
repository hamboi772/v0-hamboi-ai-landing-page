"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, LayoutDashboard, Sparkles, Download, X, Smartphone } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChatDemoModal } from "@/components/chat-demo-modal"
import { AppStoreBadges } from "@/components/app-store-badges"

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
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Organic radial gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-hamboi-purple/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-hamboi-green/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-hamboi-purple/10 rounded-full text-hamboi-purple text-sm font-bold border border-hamboi-purple/20">
                <Sparkles className="w-4 h-4" />
                Built for the late-night overthinkers.
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight">
                By students <br />
                <span className="text-hamboi-green">who get it.</span>
              </h1>

              <p className="text-lg md:text-xl text-hamboi-text-muted max-w-xl leading-relaxed">
                Hamboi is the support system we wish we had. No clinical vibes, just real talk and tools to help you navigate the chaos of being a teen.
              </p>

              <div className="flex flex-col gap-6 pt-4">
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    onClick={() => setIsChatDemoOpen(true)}
                    className="bg-hamboi-green hover:bg-hamboi-green/90 text-hamboi-dark-bg font-bold py-7 px-10 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-hamboi-green/20"
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Start Chatting
                  </Button>
                  <Link href="/features">
                    <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 text-white font-bold py-7 px-10 rounded-2xl transition-all hover:scale-105 active:scale-95">
                      <LayoutDashboard className="w-5 h-5 mr-2" />
                      See How it Works
                    </Button>
                  </Link>
                </div>

                {isInstallable && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-hamboi-text-muted text-sm font-medium">
                      <Smartphone className="w-4 h-4" />
                      Take Hamboi with you:
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <Button
                        onClick={handleInstallClick}
                        className="bg-hamboi-purple/20 hover:bg-hamboi-purple/30 text-white border border-hamboi-purple/30 font-bold px-6 py-4 rounded-xl transition-all"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Install App
                      </Button>
                      <AppStoreBadges size="small" />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-hamboi-dark-bg bg-hamboi-purple flex items-center justify-center text-[10px] font-bold text-white overflow-hidden relative">
                       <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" fill />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-hamboi-text-muted">
                  Join <span className="text-white font-bold">2,000+ students</span> prioritizing their peace.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/diverse-happy-teenagers-supporting-each-other-ment.jpg"
                  alt="Students supporting each other"
                  width={800}
                  height={1000}
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-hamboi-dark-bg via-transparent to-transparent opacity-60" />
              </div>

              {/* Floating Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 z-20 bg-hamboi-purple p-6 rounded-2xl shadow-xl border border-white/20 max-w-[240px]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-bold text-sm">Always Here</span>
                </div>
                <p className="text-white/80 text-xs leading-relaxed">
                  "Hamboi helped me through my finals when I felt like no one understood."
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <ChatDemoModal isOpen={isChatDemoOpen} onClose={() => setIsChatDemoOpen(false)} />

      {/* iOS Install Instructions Modal */}
      {showIOSInstructions && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowIOSInstructions(false)}>
          <div className="bg-hamboi-dark-card rounded-3xl p-8 max-w-sm w-full border border-hamboi-purple/30" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">iPhone/iPad Install 📱</h3>
              <button onClick={() => setShowIOSInstructions(false)} className="p-1 hover:bg-hamboi-purple/20 rounded-lg transition">
                <X className="h-6 w-6 text-hamboi-text-muted" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-hamboi-green/30 flex items-center justify-center flex-shrink-0 font-bold text-hamboi-green text-sm">
                  1
                </div>
                <p className="text-hamboi-text-muted text-sm pt-1">Tap <strong>Share</strong> at the bottom (the box with arrow)</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-hamboi-purple/30 flex items-center justify-center flex-shrink-0 font-bold text-hamboi-purple text-sm">
                  2
                </div>
                <p className="text-hamboi-text-muted text-sm pt-1">Tap <strong>"Add to Home Screen"</strong></p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-hamboi-cyan/30 flex items-center justify-center flex-shrink-0 font-bold text-hamboi-cyan text-sm">
                  3
                </div>
                <p className="text-hamboi-text-muted text-sm pt-1">Tap <strong>"Add"</strong> in the corner</p>
              </div>
            </div>
            <Button onClick={() => setShowIOSInstructions(false)} className="w-full mt-8 bg-hamboi-green hover:bg-emerald-500 text-hamboi-dark-bg font-bold py-6 rounded-2xl transition-all">
              Got it, thanks!
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
