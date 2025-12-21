"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Download } from "lucide-react"

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      console.log("[v0] User accepted the install prompt")
    }

    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-5">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-2xl p-4 flex items-center gap-4">
        <Download className="h-8 w-8 shrink-0" />
        <div className="flex-1">
          <p className="font-semibold">Install Hamboi Mindcare</p>
          <p className="text-sm opacity-90">Get quick access anytime you need support</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button onClick={handleInstall} size="sm" className="bg-white text-purple-600 hover:bg-gray-100">
            Install
          </Button>
          <Button onClick={handleDismiss} size="sm" variant="ghost" className="text-white hover:bg-white/20">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
