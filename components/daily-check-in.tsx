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
    const lastCheckIn = localStorage.getItem("hamboi_last_checkin")
    const today = new Date().toDateString()

    if (lastCheckIn !== today) {
      setTimeout(() => setShowCheckIn(true), 5000)
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
        localStorage.setItem("hamboi_last_checkin", today)
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

  if (!showCheckIn) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-2xl shadow-2xl p-6 z-50 animate-in slide-in-from-bottom duration-300">
      <h3 className="text-lg font-bold text-hamboi-dark mb-2">How are you feeling today?</h3>
      <p className="text-sm text-hamboi-dark/70 mb-4">Take a moment to check in with yourself</p>

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
        <Button onClick={() => setShowCheckIn(false)} variant="ghost" className="w-full text-sm">
          Maybe later
        </Button>
      )}
    </div>
  )
}
