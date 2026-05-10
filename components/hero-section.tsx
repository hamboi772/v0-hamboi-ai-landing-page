"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, Sparkles, Download, X, Smartphone, ArrowRight, ShieldCheck, Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChatDemoModal } from "@/components/chat-demo-modal"

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
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        {/* Organic radial gradients */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-hamboi-purple/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-hamboi-green/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/50 text-[10px] font-black uppercase tracking-[0.2em]">
                <Sparkles className="w-3.5 h-3.5" />
                Built for the late-night overthinkers.
              </div>

              <h1 className="text-6xl md:text-[9rem] font-black text-white leading-[0.8] tracking-[-0.04em]">
                By students <br />
                <span className="text-hamboi-purple text-glow-purple">who get it.</span>
              </h1>

              <p className="text-2xl md:text-3xl text-hamboi-text-muted max-w-xl leading-relaxed font-medium">
                Hamboi is the safe space we wished we had. No clinical vibes, just real talk for the modern student.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                <Button
                  size="lg"
                  onClick={() => setIsChatDemoOpen(true)}
                  className="bg-hamboi-green hover:bg-hamboi-green/90 text-background font-black h-20 px-12 rounded-[2rem] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-hamboi-green/20 text-xl w-full sm:w-auto"
                >
                  <MessageSquare className="w-6 h-6 mr-3" />
                  Start Chatting
                </Button>

                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 text-white font-black h-20 px-12 rounded-[2rem] transition-all hover:scale-105 active:scale-95 backdrop-blur-md text-xl w-full sm:w-auto">
                    My Dashboard
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-2xl border-4 border-background bg-white/5 flex items-center justify-center overflow-hidden relative shadow-xl transform hover:translate-y-[-4px] transition-transform">
                       <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`} alt="User" fill className="grayscale hover:grayscale-0 transition-all" />
                    </div>
                  ))}
                </div>
                <div>
                   <p className="text-white font-black text-sm uppercase tracking-tight">2,000+ Students</p>
                   <p className="text-[10px] text-hamboi-text-muted font-bold uppercase tracking-widest">Prioritizing their peace</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl aspect-[4/5] md:aspect-square">
                <Image
                  src="/diverse-happy-teenagers-supporting-each-other-ment.jpg"
                  alt="Students supporting each other"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              </div>

              {/* Floating Status Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 z-20 glass-morphism p-8 rounded-[2.5rem] shadow-2xl border border-white/20 max-w-[280px]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-hamboi-green/20 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-hamboi-green" />
                  </div>
                  <div>
                    <p className="text-white font-black text-xs uppercase tracking-tight">Privacy First</p>
                    <p className="text-[9px] text-hamboi-green font-bold uppercase">100% Anonymous</p>
                  </div>
                </div>
                <p className="text-white/70 text-xs font-medium leading-relaxed italic">
                  "Hamboi helped me through my finals when I felt like no one understood."
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-10 -right-10 z-20 glass-morphism p-8 rounded-[2.5rem] shadow-2xl border border-white/20"
              >
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-hamboi-purple/20 flex items-center justify-center">
                       <Heart className="w-5 h-5 text-hamboi-purple fill-hamboi-purple" />
                    </div>
                    <span className="text-white font-black text-xs uppercase tracking-widest">Always Online</span>
                 </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <ChatDemoModal isOpen={isChatDemoOpen} onClose={() => setIsChatDemoOpen(false)} />

      <style jsx>{`
        .text-glow-purple {
          text-shadow: 0 0 40px rgba(109, 40, 217, 0.4);
        }
      `}</style>

      <AnimatePresence>
        {showIOSInstructions && (
          <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-md" onClick={() => setShowIOSInstructions(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-background border border-white/10 rounded-[3rem] p-10 max-w-sm w-full relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-hamboi-purple to-hamboi-green" />

              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Install App</h3>
                <button onClick={() => setShowIOSInstructions(false)} className="p-2 text-white/20 hover:text-white transition-all">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {[
                  { step: 1, text: "Tap the Share button at the bottom of Safari." },
                  { step: 2, text: "Scroll down and tap 'Add to Home Screen'." },
                  { step: 3, text: "Tap 'Add' in the top right corner." }
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-2xl bg-hamboi-purple/20 flex items-center justify-center flex-shrink-0 text-hamboi-purple font-black">
                      {s.step}
                    </div>
                    <p className="text-hamboi-text-muted text-sm font-medium pt-2">{s.text}</p>
                  </div>
                ))}
              </div>

              <Button onClick={() => setShowIOSInstructions(false)} className="w-full mt-12 bg-hamboi-purple hover:bg-hamboi-purple/90 text-white font-black h-16 rounded-[1.5rem] shadow-xl">
                Got it!
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
