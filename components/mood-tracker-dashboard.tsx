"use client"

import { useEffect, useState } from "react"
import { Heart, Smile, Meh, Frown, AlertCircle, TrendingUp } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const moods = [
  { icon: "🤩", label: "Amazing", value: 5, color: "#22c55e", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.3)" },
  { icon: "😊", label: "Good", value: 4, color: "#a855f7", bg: "rgba(168,85,247,0.1)", border: "rgba(168,85,247,0.3)" },
  { icon: "😐", label: "Okay", value: 3, color: "#f5c842", bg: "rgba(245,200,66,0.1)", border: "rgba(245,200,66,0.3)" },
  { icon: "😔", label: "Low", value: 2, color: "#f97316", bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.3)" },
  { icon: "😭", label: "Awful", value: 1, color: "#ef4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.3)" },
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
    <div style={{ fontFamily: "'Cabinet Grotesk', 'Nunito', sans-serif", color: "#f0e8ff" }}>

      {/* Log Mood Card */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div style={styles.cardTitle}>How are you feeling right now?</div>
          <div style={styles.cardSub}>No judgment. Just honest.</div>
        </div>

        {/* Mood buttons */}
        <div style={styles.moodGrid}>
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              style={{
                ...styles.moodBtn,
                borderColor: selectedMood === mood.value ? mood.border : "rgba(255,255,255,0.06)",
                background: selectedMood === mood.value ? mood.bg : "rgba(255,255,255,0.03)",
                transform: selectedMood === mood.value ? "scale(1.08)" : "scale(1)",
              }}
            >
              <span style={{ fontSize: 28, display: "block", marginBottom: 6 }}>{mood.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: selectedMood === mood.value ? mood.color : "#7c6fa0" }}>
                {mood.label}
              </span>
            </button>
          ))}
        </div>

        {/* Human message after selection */}
        {selectedMood && !justSaved && (
          <div style={styles.moodMessage}>
            {moodMessages[selectedMood]}
          </div>
        )}

        {/* Saved confirmation */}
        {justSaved && (
          <div style={{ ...styles.moodMessage, color: "#22c55e", borderColor: "rgba(34,197,94,0.2)", background: "rgba(34,197,94,0.07)" }}>
            Logged 💜 You showed up for yourself today.
          </div>
        )}

        {/* Note */}
        <div style={{ marginTop: 16 }}>
          <label style={styles.label}>Add a note (optional)</label>
          <textarea
            placeholder="What's going on? What's on your mind?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            style={styles.textarea}
          />
        </div>

        <button
          onClick={handleSaveMood}
          disabled={!selectedMood || loading}
          style={{
            ...styles.saveBtn,
            opacity: !selectedMood || loading ? 0.4 : 1,
            cursor: !selectedMood || loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Saving..." : "Save mood → +20 XP"}
        </button>
      </div>

      {/* Chart */}
      {moodHistory.length > 1 && (
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>Your mood over time</div>
            {averageMood && (
              <div style={styles.cardSub}>
                Average: <strong style={{ color: "#c084fc" }}>{averageMood}/5</strong> across {moodHistory.length} logs
              </div>
            )}
          </div>
          <div style={{ height: 200, marginTop: 8 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" tick={{ fill: "#7c6fa0", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fill: "#7c6fa0", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#1a1235", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 12, color: "#f0e8ff", fontSize: 13 }}
                  formatter={(val: any) => {
                    const m = moods.find(m => m.value === val)
                    return [m ? `${m.icon} ${m.label}` : val, "Mood"]
                  }}
                />
                <Line type="monotone" dataKey="mood" stroke="#7C3AED" strokeWidth={2.5} dot={{ r: 4, fill: "#a855f7", strokeWidth: 0 }} activeDot={{ r: 6, fill: "#c084fc" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Recent entries */}
      {moodHistory.length > 0 && (
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>Recent logs</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
            {moodHistory.slice(0, 7).map((entry) => {
              const m = getMoodInfo(entry.mood_value)
              return (
                <div key={entry.id} style={styles.entryRow}>
                  <span style={{ fontSize: 26 }}>{m?.icon || "😐"}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: m?.color || "#f0e8ff" }}>{m?.label}</span>
                      <span style={{ fontSize: 11, color: "#7c6fa0" }}>
                        {new Date(entry.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                    {entry.note && <p style={{ fontSize: 12, color: "#7c6fa0", marginTop: 3, lineHeight: 1.5 }}>{entry.note}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {moodHistory.length === 0 && (
        <div style={{ ...styles.card, textAlign: "center", padding: "32px 20px" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📊</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#f0e8ff", marginBottom: 6 }}>No mood logs yet</div>
          <div style={{ fontSize: 13, color: "#7c6fa0" }}>Log your first mood above and start understanding yourself better.</div>
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: "#150e2b",
    border: "1px solid #251a45",
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
  },
  cardHeader: { marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: 800, color: "#f0e8ff", marginBottom: 4 },
  cardSub: { fontSize: 12, color: "#7c6fa0" },
  moodGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 8,
    marginBottom: 12,
  },
  moodBtn: {
    background: "rgba(255,255,255,0.03)",
    border: "2px solid rgba(255,255,255,0.06)",
    borderRadius: 14,
    padding: "12px 6px",
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.2s",
    color: "#f0e8ff",
  },
  moodMessage: {
    background: "rgba(124,58,237,0.08)",
    border: "1px solid rgba(124,58,237,0.2)",
    borderRadius: 12,
    padding: "12px 14px",
    fontSize: 13,
    color: "#c084fc",
    lineHeight: 1.6,
    marginBottom: 4,
    fontStyle: "italic",
  },
  label: { fontSize: 12, fontWeight: 700, color: "#7c6fa0", display: "block", marginBottom: 8 },
  textarea: {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid #251a45",
    borderRadius: 12,
    padding: "12px 14px",
    color: "#f0e8ff",
    fontFamily: "'Cabinet Grotesk', 'Nunito', sans-serif",
    fontSize: 14,
    lineHeight: 1.6,
    resize: "none",
    outline: "none",
    boxSizing: "border-box",
  },
  saveBtn: {
    width: "100%",
    background: "linear-gradient(135deg, #7C3AED, #9333ea)",
    color: "white",
    border: "none",
    borderRadius: 14,
    padding: 16,
    fontSize: 15,
    fontWeight: 800,
    marginTop: 14,
    boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
    transition: "all 0.2s",
    fontFamily: "'Cabinet Grotesk', 'Nunito', sans-serif",
  },
  entryRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    background: "#1a1235",
    border: "1px solid #251a45",
    borderRadius: 14,
    padding: "12px 14px",
  },
}
