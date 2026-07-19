"use client"

import { useEffect, useState } from "react"
import { Heart, Smile, Meh, Frown, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const moods = [
  { icon: Heart, label: "Great", color: "text-green-500", value: 5 },
  { icon: Smile, label: "Good", color: "text-blue-500", value: 4 },
  { icon: Meh, label: "Okay", color: "text-yellow-500", value: 3 },
  { icon: Frown, label: "Not Good", color: "text-orange-500", value: 2 },
  { icon: AlertCircle, label: "Bad", color: "text-red-500", value: 1 },
]

export function DailyCheckIn() {
  const [showCheckIn, setShowCheckIn] = useState(false)
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)

  const [userId] = useState(() => {
    if (typeof window !== "undefined") {
      let id = localStorage.getItem("hamboi_user_id")
      if (!id) {
        id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem("hamboi_user_id", id)
      }
      return id
    }
    return ""
  })

  useEffect(() => {
    const checkIfShouldShow = () => {
      // Get today's date as a string
      const today = new Date().toDateString()
      
      // Check if check-in was already shown today
      const lastShownDate = localStorage.getItem("mood_checkin_last_shown")
      if (lastShownDate === today) {
        return false
      }

      // Don't show if user has already responded today
      const lastCheckInDate = localStorage.getItem("hamboi_last_checkin")
      if (lastCheckInDate === today) {
        return false
      }

      return true
    }

    if (checkIfShouldShow()) {
      // Wait 5 seconds before showing, and check that we're not still loading
      const timer = setTimeout(() => {
        setShowCheckIn(true)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleMoodSelect = async (value: number) => {
    setSelectedMood(value)
    setSaving(true)

    try {
      const response = await fetch("/api/moods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          mood_value: value,
          note: null,
        }),
      })

      const data = await response.json()

      if (data.success) {
        const today = new Date().toDateString()
        // Save both the check-in date and the last shown date to prevent re-showing
        localStorage.setItem("hamboi_last_checkin", today)
        localStorage.setItem("mood_checkin_last_shown", today)
        toast.success("Mood saved! Keep track of your progress in your dashboard.")
        setTimeout(() => setShowCheckIn(false), 2000)
      } else {
        toast.error("Failed to save mood")
        setSaving(false)
      }
    } catch (error) {
      console.error("[v0] Mood save error:", error)
      toast.error("Failed to save mood")
      setSaving(false)
    }
  }

  const handleMaybeLater = () => {
    const today = new Date().toDateString()
    // Mark as shown today even if user clicks "Maybe later" to prevent re-showing
    localStorage.setItem("mood_checkin_last_shown", today)
    setShowCheckIn(false)
  }

  if (!showCheckIn) return null

  return (
    <>
      {/* Semi-opaque backdrop with high z-index */}
      <div className="fixed inset-0 z-40 bg-black/40 animate-in fade-in duration-300" />
      
      {/* Modal with higher z-index than backdrop and footer */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="pointer-events-auto bg-hamboi-dark-card border-2 border-hamboi-purple/40 rounded-2xl shadow-2xl shadow-hamboi-purple/20 p-6 w-full max-w-sm animate-in slide-in-from-bottom duration-300">
          <h3 className="text-lg font-bold text-white mb-2">How are you feeling today?</h3>
          <p className="text-sm text-hamboi-text-muted mb-4">Take a moment to check in with yourself</p>

          <div className="flex justify-between gap-2 mb-4">
            {moods.map((mood) => {
              const Icon = mood.icon
              return (
                <button
                  key={mood.value}
                  onClick={() => handleMoodSelect(mood.value)}
                  disabled={saving}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-gray-50 transition-all ${
                    selectedMood === mood.value ? "bg-gray-100 ring-2 ring-hamboi-purple" : ""
                  } ${saving ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <Icon className={`h-6 w-6 ${mood.color}`} />
                  <span className="text-xs text-hamboi-dark/70">{mood.label}</span>
                </button>
              )
            })}
          </div>

          {selectedMood && !saving && (
            <p className="text-sm text-center text-hamboi-dark/70 animate-in fade-in">
              Thank you for sharing. Remember, it's okay to not be okay.
            </p>
          )}

          {saving && <p className="text-sm text-center text-hamboi-dark/70 animate-in fade-in">Saving your mood...</p>}

          {!selectedMood && !saving && (
            <Button onClick={handleMaybeLater} variant="ghost" className="w-full text-sm">
              Maybe later
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
