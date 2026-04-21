"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const LEVELS = [
  { name: "Seedling", emoji: "🌱", minXP: 0, level: "1–2" },
  { name: "Sprout", emoji: "🌿", minXP: 300, level: "3" },
  { name: "Sapling", emoji: "🌿", minXP: 600, level: "4–5" },
  { name: "Tree", emoji: "🌳", minXP: 1000, level: "6–8" },
  { name: "Forest", emoji: "🌲", minXP: 2000, level: "9–10" },
]

const ALL_BADGES = [
  { id: "first_step", emoji: "🌅", name: "First Step", desc: "First check-in ever" },
  { id: "streak_7", emoji: "🔥", name: "On Fire", desc: "7-day streak" },
  { id: "streak_10", emoji: "💥", name: "Unstoppable", desc: "10-day streak" },
  { id: "streak_30", emoji: "💎", name: "Diamond Mind", desc: "30-day streak" },
  { id: "articles_5", emoji: "🧠", name: "Mind Explorer", desc: "Read 5 articles" },
  { id: "chats_10", emoji: "💬", name: "Open Heart", desc: "10 chat sessions" },
  { id: "level_6", emoji: "🌳", name: "The Tree", desc: "Reach Level 6" },
  { id: "share_3", emoji: "🌍", name: "World Changer", desc: "Share with 3 friends" },
  { id: "forest", emoji: "👑", name: "Legend", desc: "Reach the Forest" },
]

function getCurrentLevel(xp: number) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) return { current: LEVELS[i], next: LEVELS[i + 1] || null, index: i }
  }
  return { current: LEVELS[0], next: LEVELS[1], index: 0 }
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [missions, setMissions] = useState({
    log_mood: false,
    try_coping: false,
    read_article: false,
    chat: false,
  })
  const [moodOpen, setMoodOpen] = useState(false)
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [toast, setToast] = useState("")
  const [toastVisible, setToastVisible] = useState(false)

  // Auth check
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) { router.push("/auth"); return }
      setUser(data.user)
      loadProfile(data.user.id)
      checkTodayMissions(data.user.id)
    })
  }, [])

  async function loadProfile(userId: string) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single()

    if (data) {
      setProfile(data)
    } else {
      // Create profile if it doesn't exist
      const newProfile = { id: userId, xp: 0, streak: 0, longest_streak: 0, badges: [], hp_points: 0 }
      await supabase.from("profiles").insert(newProfile)
      setProfile(newProfile)
    }
    setLoading(false)
  }

  async function checkTodayMissions(userId: string) {
    const today = new Date().toISOString().split("T")[0]
    const { data } = await supabase
      .from("mission_logs")
      .select("mission_key")
      .eq("user_id", userId)
      .gte("completed_at", today)

    if (data) {
      const done: any = {}
      data.forEach((m) => { done[m.mission_key] = true })
      setMissions((prev) => ({ ...prev, ...done }))
    }
  }

  async function completeMission(key: string, xpEarned: number, label: string) {
    if (!user || missions[key as keyof typeof missions]) {
      showToast("✓ Already completed today")
      return
    }

    // Save mission
    await supabase.from("mission_logs").insert({
      user_id: user.id,
      mission_key: key,
      xp_earned: xpEarned,
    })

    // Update XP
    const newXP = (profile?.xp || 0) + xpEarned
    await supabase.from("profiles").update({ xp: newXP }).eq("id", user.id)

    setProfile((prev: any) => ({ ...prev, xp: newXP }))
    setMissions((prev) => ({ ...prev, [key]: true }))
    showToast(`${label} +${xpEarned} XP 💜`)
  }

  async function logMood() {
    if (!selectedMood || !user) return
    setMoodOpen(false)

    // Save mood log
    await supabase.from("mood_logs").insert({
      user_id: user.id,
      mood: selectedMood,
      xp_earned: 20,
    })

    // Update streak
    await supabase.rpc("update_streak", { user_id: user.id })

    // Complete mood mission
    await completeMission("log_mood", 20, `Mood logged: ${selectedMood}`)

    // Reload profile for streak update
    loadProfile(user.id)
    setSelectedMood(null)
  }

  function showToast(msg: string) {
    setToast(msg)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 2600)
  }

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.loadingDot}>💜</div>
        <p style={{ color: "#7c6fa0", fontSize: 14 }}>Loading your journey...</p>
      </div>
    )
  }

  const xp = profile?.xp || 0
  const streak = profile?.streak || 0
  const badges = profile?.badges || []
  const hpPoints = profile?.hp_points || 0
  const { current, next, index } = getCurrentLevel(xp)
  const xpProgress = next ? ((xp - current.minXP) / (next.minXP - current.minXP)) * 100 : 100
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })

  return (
    <div style={styles.app}>
      {/* Ambient blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      {/* Toast */}
      <div style={{ ...styles.toast, ...(toastVisible ? styles.toastVisible : {}) }}>
        {toast}
      </div>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.headerTitle}>Hamboi 💜</h1>
          <p style={styles.headerSub}>{today}</p>
        </div>
        <div style={styles.avatar}>🌱</div>
      </div>

      {/* Level Card */}
      <div style={styles.levelCard}>
        <div style={styles.levelTop}>
          <div style={styles.levelBadge}>
            <span style={styles.levelEmoji}>{current.emoji}</span>
            <div>
              <h2 style={styles.levelName}>{current.name}</h2>
              <p style={styles.levelSub}>Level {current.level} · Growing strong</p>
            </div>
          </div>
          <div style={styles.xpPill}>{xp} XP</div>
        </div>
        <div style={styles.xpBarRow}>
          <span style={{ color: "#7c6fa0", fontSize: 11 }}>
            Progress to {next?.name || "Max Level"}
          </span>
          <span style={{ color: "#7c6fa0", fontSize: 11 }}>
            {xp} / {next?.minXP || xp}
          </span>
        </div>
        <div style={styles.xpBar}>
          <div style={{ ...styles.xpFill, width: `${Math.min(xpProgress, 100)}%` }} />
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <div style={styles.statEmoji}>🔥</div>
          <div style={{ ...styles.statValue, color: "#f97316" }}>{streak}</div>
          <div style={styles.statLabel}>Day Streak</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statEmoji}>🏆</div>
          <div style={{ ...styles.statValue, color: "#f5c842" }}>{badges.length}</div>
          <div style={styles.statLabel}>Badges</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statEmoji}>💜</div>
          <div style={{ ...styles.statValue, color: "#c084fc" }}>{hpPoints}</div>
          <div style={styles.statLabel}>HP Points</div>
        </div>
      </div>

      {/* Daily Missions */}
      <div style={styles.sectionTitle}>Daily Missions</div>
      <div style={styles.missions}>
        {[
          { key: "log_mood", icon: "😊", title: "Log your mood", desc: "How are you feeling?", xp: 20, action: () => setMoodOpen(true) },
          { key: "try_coping", icon: "🧘", title: "Try a coping strategy", desc: "Breathing, journaling, anything", xp: 30, action: () => completeMission("try_coping", 30, "Coping strategy done!") },
          { key: "read_article", icon: "📖", title: "Read an article", desc: "Something that helps you grow", xp: 15, action: () => { router.push("/articles"); completeMission("read_article", 15, "Article read!") } },
          { key: "chat", icon: "💬", title: "Chat with Hamboi AI", desc: "Talk about anything on your mind", xp: 25, action: () => { router.push("/"); completeMission("chat", 25, "Chat session done!") } },
        ].map((m) => {
          const done = missions[m.key as keyof typeof missions]
          return (
            <div
              key={m.key}
              style={{ ...styles.mission, ...(done ? styles.missionDone : {}) }}
              onClick={m.action}
            >
              <div style={{ ...styles.missionIcon, ...(done ? styles.missionIconDone : {}) }}>
                {m.icon}
              </div>
              <div>
                <div style={styles.missionTitle}>{m.title}</div>
                <div style={styles.missionDesc}>{m.desc}</div>
              </div>
              <div style={{ ...styles.missionXP, marginLeft: "auto", opacity: done ? 0.3 : 1 }}>
                +{m.xp} XP
              </div>
              {done && <span style={styles.checkmark}>✓</span>}
            </div>
          )
        })}
      </div>

      {/* Level Path */}
      <div style={styles.sectionTitle}>Your Journey</div>
      <div style={styles.levelPath}>
        {LEVELS.map((lvl, i) => {
          const isCompleted = i < index
          const isCurrent = i === index
          return (
            <div
              key={lvl.name}
              style={{
                ...styles.levelStep,
                ...(isCurrent ? styles.levelStepCurrent : {}),
                ...(isCompleted ? styles.levelStepCompleted : {}),
              }}
            >
              <div style={{ ...styles.levelStepIcon, ...(isCurrent ? styles.levelStepIconCurrent : {}) }}>
                {lvl.emoji}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#f0e8ff", display: "flex", alignItems: "center", gap: 8 }}>
                  {lvl.name}
                  {isCurrent && <span style={styles.currentTag}>You are here</span>}
                  {isCompleted && <span style={{ color: "#22c55e", fontSize: 12 }}>✓</span>}
                </div>
                <div style={{ fontSize: 12, color: "#7c6fa0", marginTop: 2 }}>Level {lvl.level}</div>
              </div>
              <div style={{ marginLeft: "auto", fontSize: 13, fontWeight: 700, color: "#a855f7" }}>
                {lvl.minXP} XP
              </div>
            </div>
          )
        })}
      </div>

      {/* Badges */}
      <div style={styles.sectionTitle}>Achievements</div>
      <div style={styles.badgesGrid}>
        {ALL_BADGES.map((badge) => {
          const unlocked = badges.includes(badge.id)
          return (
            <div
              key={badge.id}
              style={{
                ...styles.badgeCard,
                ...(unlocked ? styles.badgeCardUnlocked : styles.badgeCardLocked),
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>{badge.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#f0e8ff" }}>{badge.name}</div>
              <div style={{ fontSize: 11, color: "#7c6fa0", marginTop: 3 }}>{badge.desc}</div>
            </div>
          )
        })}
      </div>

      {/* Floating Mood Button */}
      <button style={styles.fab} onClick={() => setMoodOpen(true)}>
        + Mood
      </button>

      {/* Mood Sheet */}
      {moodOpen && (
        <div style={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) { setMoodOpen(false); setSelectedMood(null) } }}>
          <div style={styles.moodSheet}>
            <h2 style={{ fontFamily: "sans-serif", fontSize: 22, fontWeight: 800, color: "#f0e8ff", marginBottom: 6 }}>
              How are you feeling? 💜
            </h2>
            <p style={{ fontSize: 13, color: "#7c6fa0", marginBottom: 24 }}>No judgment. Just check in with yourself.</p>
            <div style={styles.moodGrid}>
              {[
                { emoji: "😭", label: "Awful" },
                { emoji: "😔", label: "Low" },
                { emoji: "😐", label: "Okay" },
                { emoji: "😊", label: "Good" },
                { emoji: "🤩", label: "Amazing" },
              ].map((m) => (
                <button
                  key={m.label}
                  style={{
                    ...styles.moodBtn,
                    ...(selectedMood === m.label ? styles.moodBtnSelected : {}),
                  }}
                  onClick={() => setSelectedMood(m.label)}
                >
                  <span style={{ fontSize: 26, display: "block", marginBottom: 4 }}>{m.emoji}</span>
                  <span style={{ fontSize: 10, color: "#7c6fa0", fontWeight: 700 }}>{m.label}</span>
                </button>
              ))}
            </div>
            <button
              style={{ ...styles.logBtn, ...(selectedMood ? styles.logBtnActive : {}) }}
              onClick={logMood}
              disabled={!selectedMood}
            >
              Log Mood → +20 XP
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  app: { maxWidth: 430, margin: "0 auto", padding: "20px 16px 100px", position: "relative", background: "#0F0A1E", minHeight: "100vh", fontFamily: "'Cabinet Grotesk', 'Nunito', sans-serif" },
  blob1: { position: "fixed", top: -200, left: -200, width: 600, height: 600, background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 65%)", pointerEvents: "none", zIndex: 0, borderRadius: "50%" },
  blob2: { position: "fixed", bottom: -200, right: -200, width: 500, height: 500, background: "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 65%)", pointerEvents: "none", zIndex: 0, borderRadius: "50%" },
  loading: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", background: "#0F0A1E", gap: 12 },
  loadingDot: { fontSize: 40, animation: "pulse 1.5s ease-in-out infinite" },
  toast: { position: "fixed", top: 20, left: "50%", transform: "translateX(-50%) translateY(-80px)", background: "#1a1235", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 14, padding: "12px 20px", fontSize: 14, fontWeight: 700, color: "#c084fc", zIndex: 999, transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)", whiteSpace: "nowrap", boxShadow: "0 8px 28px rgba(0,0,0,0.5)" },
  toastVisible: { transform: "translateX(-50%) translateY(0)" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 },
  headerTitle: { fontSize: 24, fontWeight: 800, background: "linear-gradient(135deg, #c084fc, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  headerSub: { fontSize: 12, color: "#7c6fa0", marginTop: 2 },
  avatar: { width: 46, height: 46, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: "0 0 0 3px rgba(124,58,237,0.25)" },
  levelCard: { background: "linear-gradient(135deg, #1e0f3f 0%, #150e2b 100%)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 22, padding: 22, marginBottom: 14, position: "relative", overflow: "hidden" },
  levelTop: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 },
  levelBadge: { display: "flex", alignItems: "center", gap: 12 },
  levelEmoji: { fontSize: 36 },
  levelName: { fontSize: 20, fontWeight: 800, color: "#c084fc" },
  levelSub: { fontSize: 12, color: "#7c6fa0", marginTop: 2 },
  xpPill: { background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 99, padding: "6px 16px", fontSize: 13, fontWeight: 800, color: "#c084fc" },
  xpBarRow: { display: "flex", justifyContent: "space-between", marginBottom: 8 },
  xpBar: { height: 8, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" },
  xpFill: { height: "100%", background: "linear-gradient(90deg, #5b21b6, #7C3AED, #a855f7)", borderRadius: 99, transition: "width 1.5s cubic-bezier(0.16,1,0.3,1)", boxShadow: "0 0 10px rgba(124,58,237,0.5)" },
  statsRow: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 },
  statCard: { background: "#150e2b", border: "1px solid #2a1f4a", borderRadius: 18, padding: "16px 10px", textAlign: "center", cursor: "pointer" },
  statEmoji: { fontSize: 24, marginBottom: 6 },
  statValue: { fontSize: 22, fontWeight: 800, color: "#f0e8ff" },
  statLabel: { fontSize: 11, color: "#7c6fa0", marginTop: 2 },
  sectionTitle: { fontSize: 11, fontWeight: 700, color: "#7c6fa0", textTransform: "uppercase", letterSpacing: 2, margin: "20px 0 12px" },
  missions: { display: "flex", flexDirection: "column", gap: 10 },
  mission: { background: "#150e2b", border: "1px solid #2a1f4a", borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", position: "relative", overflow: "hidden", borderLeft: "3px solid #2a1f4a" },
  missionDone: { borderColor: "rgba(124,58,237,0.25)", background: "rgba(124,58,237,0.06)", borderLeftColor: "#22c55e" },
  missionIcon: { fontSize: 22, width: 44, height: 44, background: "rgba(124,58,237,0.15)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid rgba(124,58,237,0.3)" },
  missionIconDone: { background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" },
  missionTitle: { fontSize: 14, fontWeight: 700, color: "#f0e8ff" },
  missionDesc: { fontSize: 12, color: "#7c6fa0", marginTop: 2 },
  missionXP: { background: "rgba(245,200,66,0.1)", border: "1px solid rgba(245,200,66,0.2)", borderRadius: 99, padding: "4px 10px", fontSize: 11, fontWeight: 800, color: "#f5c842", whiteSpace: "nowrap", marginRight: 6 },
  checkmark: { position: "absolute", right: 16, fontSize: 16, fontWeight: 900, color: "#22c55e" },
  levelPath: { display: "flex", flexDirection: "column", gap: 10 },
  levelStep: { background: "#150e2b", border: "1px solid #2a1f4a", borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14 },
  levelStepCurrent: { borderColor: "rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.08)" },
  levelStepCompleted: { opacity: 0.5 },
  levelStepIcon: { fontSize: 24, width: 46, height: 46, background: "rgba(124,58,237,0.15)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  levelStepIconCurrent: { background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(168,85,247,0.2))", boxShadow: "0 0 16px rgba(124,58,237,0.3)" },
  currentTag: { background: "#7C3AED", color: "white", fontSize: 9, fontWeight: 900, padding: "2px 8px", borderRadius: 99, textTransform: "uppercase" as const, letterSpacing: 1 },
  badgesGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, paddingBottom: 80 },
  badgeCard: { background: "#150e2b", border: "1px solid #2a1f4a", borderRadius: 18, padding: "18px 14px", textAlign: "center", cursor: "pointer" },
  badgeCardUnlocked: { borderColor: "rgba(245,200,66,0.3)", background: "rgba(245,200,66,0.04)" },
  badgeCardLocked: { opacity: 0.35, filter: "grayscale(1)" },
  fab: { position: "fixed", bottom: 24, right: 20, background: "linear-gradient(135deg, #7C3AED, #9333ea)", color: "white", border: "none", borderRadius: 99, padding: "13px 20px", fontSize: 14, fontWeight: 800, cursor: "pointer", boxShadow: "0 6px 22px rgba(124,58,237,0.55)", zIndex: 100 },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" },
  moodSheet: { background: "#1a1235", borderRadius: "28px 28px 0 0", border: "1px solid #2a1f4a", padding: "28px 20px 52px", width: "100%", maxWidth: 430 },
  moodGrid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 20 },
  moodBtn: { background: "rgba(255,255,255,0.04)", border: "2px solid transparent", borderRadius: 14, padding: "12px 4px", cursor: "pointer", textAlign: "center", color: "#f0e8ff" },
  moodBtnSelected: { borderColor: "#7C3AED", background: "rgba(124,58,237,0.15)" },
  logBtn: { width: "100%", background: "linear-gradient(135deg, #7C3AED, #9333ea)", color: "white", border: "none", borderRadius: 14, padding: 16, fontSize: 15, fontWeight: 800, cursor: "pointer", opacity: 0.35 },
  logBtnActive: { opacity: 1 },
}
