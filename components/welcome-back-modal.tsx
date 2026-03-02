"use client"

import { useEffect, useState } from "react"
import { X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WelcomeBackModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [username, setUsername] = useState("")

  useEffect(() => {
    // Check if user is returning
    const lastVisit = localStorage.getItem("hamboi_last_visit")
    const userName = localStorage.getItem("hamboi_username")
    const visitCount = Number.parseInt(localStorage.getItem("hamboi_visit_count") || "0")

    if (lastVisit && userName) {
      const daysSinceLastVisit = Math.floor((Date.now() - Number.parseInt(lastVisit)) / (1000 * 60 * 60 * 24))

      // Show welcome back if they haven't visited in at least 1 day
      if (daysSinceLastVisit >= 1) {
        setUsername(userName)
        setIsOpen(true)
      }
    }

    // Update visit tracking
    localStorage.setItem("hamboi_last_visit", Date.now().toString())
    localStorage.setItem("hamboi_visit_count", (visitCount + 1).toString())
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 animate-in fade-in duration-300">
      <div className="relative bg-hamboi-dark-card border-2 border-hamboi-purple/40 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-hamboi-purple/30 animate-in zoom-in duration-300">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-hamboi-purple/20 transition-colors text-hamboi-green"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-hamboi-purple to-hamboi-green flex items-center justify-center mx-auto">
            <Sparkles className="h-8 w-8 text-white" />
          </div>

          <h2 className="text-2xl font-bold text-white">Welcome back, {username}!</h2>

          <p className="text-hamboi-text-muted">We're glad to see you again. How are you feeling today?</p>

          <Button
            onClick={() => setIsOpen(false)}
            className="w-full bg-gradient-to-r from-hamboi-purple to-hamboi-green text-white font-bold"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
