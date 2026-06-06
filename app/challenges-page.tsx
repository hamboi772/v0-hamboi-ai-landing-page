"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

function getSupabaseClient() {
  if (typeof window === "undefined") return null
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  const { createClient } = require("@supabase/supabase-js")
  return createClient(url, key)
}

const WEEKLY_THEME = {
  title: "Show Up For Yourself",
  desc: "This week's theme is consistency. Small actions every day add up to something real.",
  reward: 200,
}

const DAILY_MISSIONS = [
  { key: "log_mood", icon: "😊", title: "Log your mood", desc: "How are you feeling right now?", xp: 20, path: "/features" },
  { key: "chat", icon: "💬", title: "Talk to Hamboi", desc: "Even just saying hi counts", xp: 25, path: "/" },
  { key: "read_article", icon: "📖", title: "Read an article", desc: "Something that helps you grow", xp: 15, path: "/articles" },
  { key: "try_coping", icon: "🧘", title: "2-minute breathing", desc: "Breathe in 4, hold 4, out 4", xp: 20, path: null },
  { key: "journal", icon: "📝", title: "Write one sentence", desc: "In your journal. Anything at all.", xp: 15, path: "/features" },
]

export default function ChallengesPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [completedToday, setCompletedToday] = useState<string[]>([])
  const [weekDays, setWeekDays] = useState([true, true, true, false, false, false, false])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const supabase = getSupabaseClient()
      if (!supabase) { setLoading(false); return }
      const { data } = await supabase.auth.getUser()
      if (data?.user) {
        setUser(data.user)
        await checkTodayMissions(data.user.id, supabase)
      }
      setLoading(false)
    }
    init()
  }, [])

  const checkTodayMissions = async (userId: string, supabase: any) => {
    const today = new Date().toISOString().split("T")[0]
    const { data } = await supabase
      .from("mission_logs")
      .select("mission_key")
      .eq("user_id", userId)
      .gte("completed_at", today)
    if (data) setCompletedToday(data.map((m: any) => m.mission_key))
  }

  const completeMission = async (key: string, xp: number, path: string | null) => {
    if (completedToday.includes(key)) {
      if (path) router.push(path)
      return
    }
    const supabase = getSupabaseClient()
    if (supabase && user) {
      await supabase.from("mission_logs").insert({ user_id: user.id, mission_key: key, xp_earned: xp })
      const { data: profile } = await supabase.from("profiles").select("xp").eq("id", user.id).single()
      if (profile) await supabase.from("profiles").update({ xp: profile.xp + xp }).eq("id", user.id)
      setCompletedToday((prev) => [...prev, key])
    }
    if (path) router.push(path)
  }

  const doneCount = completedToday.length
  const weekDoneCount = weekDays.filter(Boolean).length

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - weekStart.getDay())
  const weekLabel = weekStart.toLocaleDateString("en-US", { month: "long", day: "numeric" })

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.pageTitle}>Challenges ⚡</h1>
            <p style={styles.pageSub}>{today}</p>
          </div>
          <button onClick={() => router.push("/features")} style={styles.backBtn}>← Back</button>
        </div>

        {/* Weekly challenge card */}
        <div style={styles.weeklyCard}>
          <div style={styles.weekLabel}>Week of {weekLabel}</div>
          <h2 style={styles.weekTitle}>{WEEKLY_THEME.title}</h2>
          <p style={styles.weekDesc}>{WEEKLY_THEME.desc}</p>

          {/* Day tracker */}
          <div style={styles.dayRow}>
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <div key={i} style={styles.dayWrap}>
                <div
                  style={{
                    ...styles.dayDot,
                    background: weekDays[i] ? "#7C3AED" : "rgba(255,255,255,0.08)",
                    boxShadow: weekDays[i] ? "0 0 10px rgba(124,58,237,0.4)" : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const updated = [...weekDays]
                    updated[i] = !updated[i]
                    setWeekDays(updated)
                  }}
                >
                  {weekDays[i] && <span style={{ color: "white", fontSize: 10, fontWeight: 900 }}>✓</span>}
                </div>
                <span style={styles.dayLabel}>{day}</span>
              </div>
            ))}
            <div style={styles.weekReward}>+{WEEKLY_THEME.reward} XP</div>
          </div>

          {weekDoneCount >= 7 && (
            <div style={styles.weekComplete}>
              🎉 Week complete! +{WEEKLY_THEME.reward} XP earned!
            </div>
          )}
        </div>

        {/* Today's progress */}
        <div style={styles.progressCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#f0e8ff" }}>Today's progress</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#c084fc" }}>{doneCount}/{DAILY_MISSIONS.length}</div>
          </div>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${(doneCount / DAILY_MISSIONS.length) * 100}%` }} />
          </div>
          {doneCount === DAILY_MISSIONS.length && (
            <div style={{ fontSize: 13, color: "#22c55e", fontWeight: 700, marginTop: 10, textAlign: "center" }}>
              🎉 All done today! You showed up for yourself.
            </div>
          )}
        </div>

        {/* Daily missions */}
        <div style={styles.sectionTitle}>Today's Missions</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {DAILY_MISSIONS.map((m) => {
            const done = completedToday.includes(m.key)
            return (
              <div
                key={m.key}
                style={{
                  ...styles.missionCard,
                  borderLeftColor: done ? "#22c55e" : "#251a45",
                  background: done ? "rgba(34,197,94,0.04)" : "#150e2b",
                  opacity: loading ? 0.6 : 1,
                }}
                onClick={() => completeMission(m.key, m.xp, m.path)}
              >
                <div style={{
                  ...styles.missionIcon,
                  background: done ? "rgba(34,197,94,0.1)" : "rgba(124,58,237,0.12)",
                  border: `1px solid ${done ? "rgba(34,197,94,0.2)" : "rgba(124,58,237,0.2)"}`,
                }}>
                  {m.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#f0e8ff" }}>{m.title}</div>
                  <div style={{ fontSize: 12, color: "#7c6fa0", marginTop: 2 }}>{m.desc}</div>
                </div>
                <div style={{ ...styles.xpBadge, opacity: done ? 0.3 : 1 }}>+{m.xp} XP</div>
                {done && <span style={{ color: "#22c55e", fontSize: 16, fontWeight: 900, marginLeft: 6 }}>✓</span>}
              </div>
            )
          })}
        </div>

        {/* Next week teaser */}
        <div style={styles.sectionTitle}>Next Week</div>
        <div style={{ ...styles.weeklyCard, opacity: 0.5, textAlign: "center", padding: "24px 20px" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔒</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#7c6fa0" }}>Complete this week to unlock</div>
          <div style={{ fontSize: 12, color: "#7c6fa0", marginTop: 4 }}>Theme: "Opening Up"</div>
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { background: "#0F0A1E", minHeight: "100vh", fontFamily: "'Cabinet Grotesk','Nunito',sans-serif", color: "#f0e8ff" },
  container: { maxWidth: 430, margin: "0 auto", padding: "20px 16px 80px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 },
  pageTitle: { fontFamily: "'Clash Display',sans-serif", fontSize: 24, fontWeight: 700, color: "#c084fc" },
  pageSub: { fontSize: 12, color: "#7c6fa0", marginTop: 2 },
  backBtn: {
    background: "rgba(255,255,255,0.05)", border: "1px solid #251a45",
    borderRadius: 10, padding: "8px 14px", color: "#7c6fa0",
    fontSize: 13, fontWeight: 700, cursor: "pointer",
    fontFamily: "'Cabinet Grotesk','Nunito',sans-serif",
  },
  weeklyCard: {
    background: "linear-gradient(135deg,#1e0f3f,#150e2b)",
    border: "1px solid rgba(124,58,237,0.3)",
    borderRadius: 20, padding: "20px", marginBottom: 12,
  },
  weekLabel: { fontSize: 11, color: "#7c6fa0", textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 },
  weekTitle: { fontFamily: "'Clash Display',sans-serif", fontSize: 20, fontWeight: 700, color: "#c084fc", marginBottom: 6 },
  weekDesc: { fontSize: 13, color: "#7c6fa0", lineHeight: 1.6, marginBottom: 16 },
  dayRow: { display: "flex", alignItems: "center", gap: 6 },
  dayWrap: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4 },
  dayDot: {
    width: 28, height: 28, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "all 0.2s",
  },
  dayLabel: { fontSize: 9, color: "#7c6fa0", fontWeight: 700 },
  weekReward: {
    marginLeft: "auto", background: "rgba(245,200,66,0.1)",
    border: "1px solid rgba(245,200,66,0.2)",
    borderRadius: 99, padding: "4px 12px",
    fontSize: 12, fontWeight: 800, color: "#f5c842",
  },
  weekComplete: {
    background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)",
    borderRadius: 12, padding: "10px 14px", fontSize: 13,
    fontWeight: 700, color: "#22c55e", marginTop: 12, textAlign: "center",
  },
  progressCard: {
    background: "#150e2b", border: "1px solid #251a45",
    borderRadius: 16, padding: "14px 16px", marginBottom: 12,
  },
  progressBar: { height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" },
  progressFill: { height: "100%", background: "linear-gradient(90deg,#5b21b6,#7C3AED,#a855f7)", borderRadius: 99, transition: "width 0.5s ease" },
  sectionTitle: { fontSize: 11, fontWeight: 700, color: "#7c6fa0", textTransform: "uppercase", letterSpacing: 2, margin: "20px 0 12px" },
  missionCard: {
    background: "#150e2b", border: "1px solid #251a45",
    borderLeft: "3px solid #251a45",
    borderRadius: 16, padding: "14px 16px",
    display: "flex", alignItems: "center", gap: 14,
    cursor: "pointer", transition: "all 0.2s",
  },
  missionIcon: {
    fontSize: 20, width: 42, height: 42,
    borderRadius: 12, display: "flex", alignItems: "center",
    justifyContent: "center", flexShrink: 0,
  },
  xpBadge: {
    background: "rgba(245,200,66,0.1)", border: "1px solid rgba(245,200,66,0.2)",
    borderRadius: 99, padding: "3px 10px", fontSize: 11,
    fontWeight: 800, color: "#f5c842", whiteSpace: "nowrap",
  },
}
