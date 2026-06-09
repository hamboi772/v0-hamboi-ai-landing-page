"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const moods = [
  { icon: "🤩", label: "Amazing", value: 5 },
  { icon: "😊", label: "Good", value: 4 },
  { icon: "😐", label: "Okay", value: 3 },
  { icon: "😔", label: "Low", value: 2 },
  { icon: "😭", label: "Awful", value: 1 },
]

const moodMessages: Record<number, string> = {
  5: "You're glowing today 💜 That energy is real.",
  4: "Good is enough. More than enough actually.",
  3: "Okay days are still days you showed up.",
  2: "Feeling low is valid. You logged it — that took something.",
  1: "It's really hard right now. You're not alone in this.",
}

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
  const [justSaved, setJustSaved] = useState(false)

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
    fetchMoodHistory()
  }, [])

  const fetchMoodHistory = async () => {
    try {
      const response = await fetch(`/api/moods?user_id=${userId}&days=30`)
      const data = await response.json()
      if (data.success) setMoodHistory(data.moods)
    } catch (error) {
      console.error("[v0] Failed to fetch mood history:", error)
    }
  }

  const handleSaveMood = async () => {
    if (!selectedMood) { toast.error("Pick a mood first 😊"); return }
    setLoading(true)
    try {
      const response = await fetch("/api/moods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, mood_value: selectedMood, note: note.trim() || null }),
      })
      const data = await response.json()
      if (data.success) {
        toast.success("Mood saved! +20 XP 💜")
        setJustSaved(true)
        setTimeout(() => setJustSaved(false), 3000)
        setNote("")
        fetchMoodHistory()
      } else {
        toast.error(data.error || "Couldn't save mood")
      }
    } catch (error) {
      toast.error("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  const chartData = moodHistory.slice().reverse().map((entry) => ({
    date: new Date(entry.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    mood: entry.mood_value,
  }))

  const averageMood = moodHistory.length > 0
    ? (moodHistory.reduce((sum, m) => sum + m.mood_value, 0) / moodHistory.length).toFixed(1)
    : null

  const getMoodInfo = (value: number) => moods.find((m) => m.value === value)

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#F5F5F5", background: "#06080F", padding: 0 }}>

      {/* Log Mood Section */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 32, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#F5F5F5", marginBottom: 24 }}>
          How are you feeling right now?
        </h2>

        {/* Mood buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 20 }}>
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              style={{
                background: selectedMood === mood.value ? "rgba(12, 242, 200, 0.08)" : "#0D1120",
                border: `1px solid ${selectedMood === mood.value ? "#0CF2C8" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 0,
                padding: "16px 12px",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.2s ease",
                color: "#F5F5F5",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 32, display: "block" }}>{mood.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: selectedMood === mood.value ? "#0CF2C8" : "#F5F5F5" }}>
                {mood.label}
              </span>
            </button>
          ))}
        </div>

        {/* Human message after selection */}
        {selectedMood && !justSaved && (
          <div style={{ fontSize: 15, color: "#8B8B8B", lineHeight: 1.6, marginBottom: 20, fontStyle: "italic" }}>
            {moodMessages[selectedMood]}
          </div>
        )}

        {/* Saved confirmation */}
        {justSaved && (
          <div style={{ fontSize: 15, color: "#0CF2C8", lineHeight: 1.6, marginBottom: 20, fontStyle: "italic" }}>
            Logged 💜 You showed up for yourself today.
          </div>
        )}

        {/* Note */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#8B8B8B", display: "block", marginBottom: 10 }}>
            Add a note (optional)
          </label>
          <textarea
            placeholder="What's going on? What's on your mind?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            style={{
              width: "100%",
              background: "#0D1120",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 0,
              padding: "12px 14px",
              color: "#F5F5F5",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              lineHeight: 1.6,
              resize: "none",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <button
          onClick={handleSaveMood}
          disabled={!selectedMood || loading}
          style={{
            background: selectedMood && !loading ? "#0CF2C8" : "#0CF2C8",
            color: "#06080F",
            border: "none",
            borderRadius: 0,
            padding: "12px 24px",
            fontSize: 14,
            fontWeight: 600,
            cursor: !selectedMood || loading ? "not-allowed" : "pointer",
            opacity: !selectedMood || loading ? 0.4 : 1,
            transition: "opacity 0.2s",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {loading ? "Saving..." : "Save mood"}
        </button>
      </div>

      {/* Chart */}
      {moodHistory.length > 1 && (
        <div style={{ marginBottom: 32, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 20, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#F5F5F5", marginBottom: 8 }}>
              Your mood over time
            </h3>
            {averageMood && (
              <p style={{ fontSize: 14, color: "#8B8B8B" }}>
                Average: <span style={{ color: "#0CF2C8", fontWeight: 600 }}>{averageMood}/5</span> across {moodHistory.length} logs
              </p>
            )}
          </div>
          <div style={{ height: 200, marginTop: 16 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" tick={{ fill: "#8B8B8B", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fill: "#8B8B8B", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#0D1120", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 0, color: "#F5F5F5", fontSize: 13 }}
                  formatter={(val: any) => {
                    const m = moods.find(m => m.value === val)
                    return [m ? `${m.icon} ${m.label}` : val, "Mood"]
                  }}
                />
                <Line type="monotone" dataKey="mood" stroke="#0CF2C8" strokeWidth={2.5} dot={{ r: 4, fill: "#0CF2C8", strokeWidth: 0 }} activeDot={{ r: 6, fill: "#0CF2C8" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Recent entries */}
      {moodHistory.length > 0 && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24 }}>
          <h3 style={{ fontSize: 20, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#F5F5F5", marginBottom: 16 }}>
            Recent logs
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {moodHistory.slice(0, 7).map((entry) => {
              const m = getMoodInfo(entry.mood_value)
              return (
                <div key={entry.id} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 28 }}>{m?.icon || "😐"}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 14, fontWeight: 500, color: "#F5F5F5" }}>{m?.label}</span>
                      <span style={{ fontSize: 11, color: "#8B8B8B" }}>
                        {new Date(entry.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                    {entry.note && <p style={{ fontSize: 13, color: "#8B8B8B", marginTop: 4, lineHeight: 1.5 }}>{entry.note}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {moodHistory.length === 0 && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24, textAlign: "left" }}>
          <p style={{ fontSize: 15, color: "#8B8B8B", lineHeight: 1.6 }}>
            No mood logs yet — log your first mood above.
          </p>
        </div>
      )}
    </div>
  )
}


