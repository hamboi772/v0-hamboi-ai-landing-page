"use client"

import { useEffect, useState } from "react"
import { Heart, Smile, Meh, Frown, AlertCircle, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const moods = [
  { icon: Heart, label: "Great", color: "text-green-500", bgColor: "bg-green-500", value: 5 },
  { icon: Smile, label: "Good", color: "text-blue-500", bgColor: "bg-blue-500", value: 4 },
  { icon: Meh, label: "Okay", color: "text-yellow-500", bgColor: "bg-yellow-500", value: 3 },
  { icon: Frown, label: "Not Good", color: "text-orange-500", bgColor: "bg-orange-500", value: 2 },
  { icon: AlertCircle, label: "Bad", color: "text-red-500", bgColor: "bg-red-500", value: 1 },
]

interface MoodEntry {
  id: string
  mood_value: number
  note: string | null
  created_at: string
}

export function MoodTrackerDashboard() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(false)
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([])
  const [userId] = useState(() => {
    // Get or create user ID (simple anonymous ID)
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
    fetchMoodHistory()
  }, [])

  const fetchMoodHistory = async () => {
    try {
      const response = await fetch(`/api/moods?user_id=${userId}&days=30`)
      const data = await response.json()
      if (data.success) {
        setMoodHistory(data.moods)
      }
    } catch (error) {
      console.error("[v0] Failed to fetch mood history:", error)
    }
  }

  const handleSaveMood = async () => {
    if (!selectedMood) {
      toast.error("Please select a mood")
      return
    }

    console.log("[v0] Starting mood save, user_id:", userId, "mood:", selectedMood)

    setLoading(true)
    try {
      const response = await fetch("/api/moods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          mood_value: selectedMood,
          note: note.trim() || null,
        }),
      })

      console.log("[v0] Mood API response status:", response.status)
      const data = await response.json()
      console.log("[v0] Mood API response data:", data)

      if (data.success) {
        toast.success("Mood saved successfully!")
        setSelectedMood(null)
        setNote("")
        fetchMoodHistory()
      } else {
        console.error("[v0] Mood save failed:", data.error)
        toast.error(data.error || "Failed to save mood")
      }
    } catch (error) {
      console.error("[v0] Save mood error:", error)
      toast.error("Failed to save mood. Check console for details.")
    } finally {
      setLoading(false)
    }
  }

  // Prepare chart data
  const chartData = moodHistory.map((entry) => ({
    date: new Date(entry.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    mood: entry.mood_value,
  }))

  const averageMood =
    moodHistory.length > 0
      ? (moodHistory.reduce((sum, m) => sum + m.mood_value, 0) / moodHistory.length).toFixed(1)
      : "0"

  return (
    <div className="space-y-6">
      {/* Log Today's Mood */}
      <Card>
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
          <CardDescription>Track your mood to understand patterns over time</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
            {moods.map((mood) => {
              const Icon = mood.icon
              return (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                    selectedMood === mood.value ? `border-gray-400 bg-gray-50` : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${mood.color}`} />
                  <span className="text-xs sm:text-sm font-medium text-center leading-tight">{mood.label}</span>
                </button>
              )
            })}
          </div>
          {/* </CHANGE> */}

          <div className="space-y-2">
            <label className="text-sm font-medium">Add a note (optional)</label>
            <Textarea
              placeholder="What's on your mind?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          <Button onClick={handleSaveMood} disabled={!selectedMood || loading} className="w-full">
            {loading ? "Saving..." : "Save Mood"}
          </Button>
        </CardContent>
      </Card>

      {/* Mood History Chart */}
      {moodHistory.length > 0 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Your Mood Trends</CardTitle>
              <CardDescription>Last 30 days of mood tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="mood" stroke="#A78BFA" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>
                  Average mood: <strong>{averageMood}/5</strong> over {moodHistory.length} entries
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Entries */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Entries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {moodHistory.slice(0, 5).map((entry) => {
                const mood = moods.find((m) => m.value === entry.mood_value)
                const Icon = mood?.icon || Meh
                return (
                  <div key={entry.id} className="flex items-start gap-3 p-3 rounded-lg border">
                    <Icon className={`h-5 w-5 mt-0.5 ${mood?.color}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{mood?.label}</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(entry.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {entry.note && <p className="text-sm text-muted-foreground mt-1">{entry.note}</p>}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
