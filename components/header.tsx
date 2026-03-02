"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Heart, Download, Smartphone } from "lucide-react"
import Link from "next/link"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [showIOSInstructions, setShowIOSInstructions] = useState(false)

  useEffect(() => {
    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOS(isIOSDevice)

    // Check if already installed as PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         (window.navigator as any).standalone === true
    
    if (!isStandalone) {
      setIsInstallable(true)
    }

    // Listen for install prompt (Android/Desktop)
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

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Articles", href: "/articles" },
    { label: "Safety", href: "#safety" },
    { label: "FAQ", href: "#faq" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-br from-hamboi-dark-bg/95 to-[#1a1a2e]/95 backdrop-blur-lg border-b border-hamboi-purple/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition"
            title="HAMBOI - Hope And Mind Balance: Outreach Initiative"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-hamboi-green to-hamboi-cyan flex items-center justify-center">
              <Heart className="h-5 w-5 text-white font-bold" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-hamboi-green to-hamboi-cyan bg-clip-text text-transparent">Hamboi</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-hamboi-text-muted hover:text-hamboi-green font-semibold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isInstallable && (
              <Button
                onClick={handleInstallClick}
                className="bg-gradient-to-r from-hamboi-purple to-hamboi-blue text-white hover:opacity-90"
              >
                <Download className="h-4 w-4 mr-2" />
                Install App
              </Button>
            )}
            <Link href="/donate">
              <Button
                variant="outline"
                className="border-hamboi-pink text-hamboi-pink hover:bg-hamboi-pink/10 bg-transparent"
              >
                <Heart className="h-4 w-4 mr-2 fill-current" />
                Donate
              </Button>
            </Link>
            <Link href="/features">
              <Button
                variant="outline"
                className="border-hamboi-purple text-hamboi-purple hover:bg-hamboi-purple/10 bg-transparent"
              >
                My Dashboard
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-hamboi-dark/70 hover:text-hamboi-purple transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link href="/donate" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-gradient-to-r from-hamboi-pink to-hamboi-purple hover:opacity-90">
                <Heart className="h-4 w-4 mr-2 fill-current" />
                Donate
              </Button>
            </Link>
            <Link href="/features" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-hamboi-purple hover:bg-hamboi-purple/90">My Dashboard</Button>
            </Link>
            {isInstallable && (
              <Button
                onClick={() => {
                  handleInstallClick()
                  setIsMobileMenuOpen(false)
                }}
                className="w-full bg-gradient-to-r from-hamboi-purple to-hamboi-blue text-white hover:opacity-90"
              >
                <Download className="h-4 w-4 mr-2" />
                Install App
              </Button>
            )}
          </nav>
        )}

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
      </div>
    </header>
  )
}
