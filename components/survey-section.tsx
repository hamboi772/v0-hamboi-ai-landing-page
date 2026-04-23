"use client"

import { useState, useRef } from "react"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// ─── Data ─────────────────────────────────────────────────────────────────────
const MOODS = [
  { e: "😭", label: "Rough", color: "#f87171" },
  { e: "😔", label: "Low",   color: "#fb923c" },
  { e: "😐", label: "Meh",   color: "#facc15" },
  { e: "🙂", label: "Okay",  color: "#4ade80" },
  { e: "🤩", label: "Great", color: "#a78bfa" },
]

const LEVELS = [
  { level: 1, name: "Seed",    icon: "🌱", min: 0,   max: 100  },
  { level: 2, name: "Sprout",  icon: "🌿", min: 100, max: 250  },
  { level: 3, name: "Sapling", icon: "🌳", min: 250, max: 500  },
  { level: 4, name: "Bloom",   icon: "🌸", min: 500, max: 900  },
  { level: 5, name: "Flame",   icon: "🔥", min: 900, max: 1400 },
  { level: 6, name: "Storm",   icon: "⚡", min: 1400, max: 2000 },
  { level: 7, name: "Legend",  icon: "👑", min: 2000, max: 9999 },
]

const BADGES = [
  { icon: "💜", name: "First Step",     desc: "Log your first mood",  earned: true  },
  { icon: "🔥", name: "On Fire",        desc: "3-day streak",         earned: true  },
  { icon: "🌍", name: "World Changer",  desc: "Refer 3 friends",      earned: false },
  { icon: "👑", name: "Legend",         desc: "Reach Level 7",        earned: false },
]

const MISSIONS = [
  { icon: "😊", title: "Log your mood",       xp: 10,  done: true  },
  { icon: "🧘", title: "Box breathing",        xp: 20,  done: true  },
  { icon: "📝", title: "Write one sentence",   xp: 15,  done: false },
  { icon: "💬", title: "Talk to Hamboi",       xp: 25,  done: false },
]

function getLevel(xp: number) {
  return LEVELS.findLast((l) => xp >= l.min) ?? LEVELS[0]
}
function getLevelProgress(xp: number) {
  const lvl = getLevel(xp)
  return Math.min(((xp - lvl.min) / (lvl.max - lvl.min)) * 100, 100)
}

// ─── XP Float ─────────────────────────────────────────────────────────────────
function XPFloat({ amount, onDone }: { amount: number; onDone: () => void }) {
  useState(() => { setTimeout(onDone, 1100) })
  return (
    <div style={{
      position: "absolute", top: -8, right: 8,
      fontSize: 15, fontWeight: 900, color: "#f5c842",
      animation: "xpFloat 1.1s ease forwards",
      pointerEvents: "none", zIndex: 10,
      textShadow: "0 0 12px rgba(245,200,66,0.5)",
    }}>
      +{amount} XP ✨
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function SurveySection() {
  const [xp, setXp]                   = useState(45)
  const [streak]                       = useState(4)
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [moodDone, setMoodDone]         = useState(false)
  const [missions, setMissions]         = useState(MISSIONS)
  const [activeTab, setActiveTab]       = useState<"mood" | "missions" | "badges">("mood")
  const [xpPop, setXpPop]              = useState<number | null>(null)
  const [breathPhase, setBreathPhase]   = useState<null | "in" | "hold" | "out">(null)
  const [breathDone, setBreathDone]     = useState(false)
  const breathRef                       = useRef<ReturnType<typeof setTimeout> | null>(null)

  const level    = getLevel(xp)
  const progress = getLevelProgress(xp)
  const nextLevel = LEVELS.find((l) => l.level === level.level + 1)

  const addXP = (amount: number) => {
    setXp((prev) => prev + amount)
    setXpPop(amount)
  }

  const logMood = (i: number) => {
    if (moodDone) return
    setSelectedMood(i)
    setMoodDone(true)
    addXP(10)
  }

  const completeMission = (idx: number) => {
    if (missions[idx].done) return
    setMissions((prev) => prev.map((m, i) => i === idx ? { ...m, done: true } : m))
    addXP(missions[idx].xp)
  }

  const startBreath = () => {
    if (breathRef.current || breathDone) return
    let count = 0
    const sequence: ("in" | "hold" | "out")[] = ["in", "hold", "out", "hold"]
    const durations = [4000, 4000, 4000, 4000]
    let idx = 0

    const step = () => {
      const phase = sequence[idx % sequence.length]
      setBreathPhase(phase)
      if (phase === "in") count++
      if (count >= 3) {
        setTimeout(() => { setBreathPhase(null); setBreathDone(true); addXP(20) }, durations[idx % durations.length])
        return
      }
      breathRef.current = setTimeout(() => { idx++; step() }, durations[idx % durations.length])
    }
    step()
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-hamboi-dark-bg via-[#1a1a3e] to-hamboi-dark-bg">
      <div className="max-w-3xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-purple-900/40 border border-purple-500/40 text-purple-300 px-4 py-2 rounded-full text-sm font-bold mb-6">
            ⚡ Live Preview — Try It Now
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Mental health that feels<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">like a game</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Streaks. XP. Badges. Levels. This is what Hamboi looks like — tap around and see for yourself.
          </p>
        </div>

        {/* ── Game Card ── */}
        <div style={{
          background: "#0F0A1E",
          border: "1px solid rgba(124,58,237,0.35)",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 0 60px rgba(124,58,237,0.15)",
          fontFamily: "'Nunito', sans-serif",
          position: "relative",
        }}>

          {/* XP float */}
          {xpPop !== null && (
            <XPFloat amount={xpPop} onDone={() => setXpPop(null)} />
          )}

          {/* Top bar */}
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #1e1535", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#c084fc" }}>Hamboi 💜</div>
              <div style={{ fontSize: 11, color: "#6b5e8e" }}>Your mental health game</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(245,200,66,0.08)", border: "1px solid rgba(245,200,66,0.2)", borderRadius: 99, padding: "7px 14px" }}>
              <span style={{ fontSize: 16 }}>🔥</span>
              <span style={{ fontSize: 17, fontWeight: 900, color: "#f5c842" }}>{streak}</span>
              <span style={{ fontSize: 10, color: "#6b5e8e" }}>day streak</span>
            </div>
          </div>

          {/* Level bar */}
          <div style={{ margin: "14px 20px", background: "#150e2b", border: "1px solid #1e1535", borderRadius: 16, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ fontSize: 26, background: "rgba(124,58,237,0.15)", borderRadius: 10, padding: "6px 8px", lineHeight: 1 }}>{level.icon}</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: "#f0e8ff" }}>{level.name}</div>
                  <div style={{ fontSize: 11, color: "#6b5e8e" }}>Level {level.level}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: "#f5c842", transition: "all 0.4s" }}>{xp}</span>
                <span style={{ fontSize: 11, color: "#6b5e8e" }}>XP</span>
              </div>
            </div>
            <div style={{ height: 7, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", background: "linear-gradient(90deg,#5b21b6,#7C3AED,#a855f7)", borderRadius: 99, width: `${progress}%`, transition: "width 0.8s ease" }} />
            </div>
            {nextLevel && (
              <div style={{ fontSize: 10, color: "#6b5e8e", marginTop: 5, textAlign: "right" }}>
                {nextLevel.min - xp} XP to {nextLevel.name} {nextLevel.icon}
              </div>
            )}
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 6, padding: "0 20px 14px" }}>
            {(["mood", "missions", "badges"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1, padding: "9px 4px", borderRadius: 12, fontSize: 12, fontWeight: 800,
                  cursor: "pointer", border: "1px solid",
                  borderColor: activeTab === tab ? "rgba(124,58,237,0.5)" : "#1e1535",
                  background: activeTab === tab ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.03)",
                  color: activeTab === tab ? "#c084fc" : "#6b5e8e",
                  fontFamily: "'Nunito',sans-serif", transition: "all 0.2s",
                }}
              >
                {{ mood: "😊 Mood", missions: "⚡ Missions", badges: "🏅 Badges" }[tab]}
              </button>
            ))}
          </div>

          {/* ── MOOD TAB ── */}
          {activeTab === "mood" && (
            <div style={{ padding: "0 20px 20px" }}>
              <div style={{ background: "#150e2b", border: "1px solid #1e1535", borderRadius: 16, padding: 16, marginBottom: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#f0e8ff", marginBottom: 4 }}>
                  {moodDone ? "Mood logged ✓" : "How are you feeling right now?"}
                </div>
                {!moodDone && <div style={{ fontSize: 11, color: "#6b5e8e", marginBottom: 14 }}>One tap. No quiz. No pressure.</div>}
                <div style={{ display: "flex", justifyContent: "space-between", gap: 6 }}>
                  {MOODS.map((m, i) => (
                    <button
                      key={i}
                      onClick={() => logMood(i)}
                      disabled={moodDone}
                      style={{
                        flex: 1, borderRadius: 12, padding: "10px 0",
                        border: `2px solid ${selectedMood === i ? m.color : "transparent"}`,
                        background: selectedMood === i ? `${m.color}20` : "rgba(255,255,255,0.04)",
                        cursor: moodDone ? "default" : "pointer",
                        opacity: moodDone && selectedMood !== i ? 0.25 : 1,
                        transform: selectedMood === i ? "scale(1.12)" : "scale(1)",
                        transition: "all 0.2s",
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                        fontFamily: "'Nunito',sans-serif",
                      }}
                    >
                      <span style={{ fontSize: 26 }}>{m.e}</span>
                      <span style={{ fontSize: 9, color: selectedMood === i ? m.color : "#6b5e8e", fontWeight: 700 }}>{m.label}</span>
                    </button>
                  ))}
                </div>
                {moodDone && (
                  <div style={{ marginTop: 12, textAlign: "center", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 99, padding: "7px 14px", fontSize: 12, fontWeight: 800, color: "#c084fc" }}>
                    +10 XP earned 🎉
                  </div>
                )}
              </div>

              {/* Breathing mini */}
              <div style={{ background: "#150e2b", border: "1px solid #1e1535", borderRadius: 16, padding: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#f0e8ff", marginBottom: 2 }}>Box Breathing 🧘</div>
                <div style={{ fontSize: 11, color: "#6b5e8e", marginBottom: 14 }}>3 cycles · +20 XP</div>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
                  <div style={{
                    width: 90, height: 90, borderRadius: "50%",
                    background: "rgba(124,58,237,0.1)", border: "2px solid rgba(124,58,237,0.3)",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    transform: breathPhase === "in" ? "scale(1.35)" : breathPhase === "out" ? "scale(0.75)" : "scale(1)",
                    transition: "transform 4s ease",
                    boxShadow: breathPhase ? "0 0 30px rgba(124,58,237,0.4)" : "none",
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#c084fc", textAlign: "center", padding: "0 8px" }}>
                      {breathDone ? "✓ Done!" : breathPhase === "in" ? "Breathe in" : breathPhase === "hold" ? "Hold" : breathPhase === "out" ? "Breathe out" : "Tap below"}
                    </span>
                  </div>
                </div>
                {!breathPhase && !breathDone && (
                  <button
                    onClick={startBreath}
                    style={{ width: "100%", background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: 10, padding: "10px 0", color: "#c084fc", fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "'Nunito',sans-serif" }}
                  >
                    Start breathing
                  </button>
                )}
                {breathDone && (
                  <div style={{ textAlign: "center", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 99, padding: "7px 14px", fontSize: 12, fontWeight: 800, color: "#c084fc" }}>
                    +20 XP earned 🎉
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── MISSIONS TAB ── */}
          {activeTab === "missions" && (
            <div style={{ padding: "0 20px 20px" }}>
              <div style={{ background: "#150e2b", border: "1px solid #1e1535", borderRadius: 16, padding: 14, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#f0e8ff" }}>Today's progress</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#c084fc" }}>{missions.filter(m => m.done).length}/{missions.length}</span>
                </div>
                <div style={{ height: 7, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", background: "linear-gradient(90deg,#5b21b6,#7C3AED,#a855f7)", borderRadius: 99, width: `${(missions.filter(m => m.done).length / missions.length) * 100}%`, transition: "width 0.6s ease" }} />
                </div>
              </div>

              {missions.map((m, i) => (
                <div
                  key={i}
                  onClick={() => completeMission(i)}
                  style={{
                    background: m.done ? "rgba(34,197,94,0.04)" : "#150e2b",
                    border: "1px solid",
                    borderColor: m.done ? "rgba(34,197,94,0.2)" : "#1e1535",
                    borderLeft: `3px solid ${m.done ? "#22c55e" : "#7C3AED"}`,
                    borderRadius: 14, padding: "13px 14px",
                    display: "flex", alignItems: "center", gap: 12, marginBottom: 8,
                    cursor: m.done ? "default" : "pointer", transition: "all 0.2s",
                  }}
                >
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: m.done ? "rgba(34,197,94,0.1)" : "rgba(124,58,237,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                    {m.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: m.done ? "#6b7280" : "#f0e8ff" }}>{m.title}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ background: "rgba(245,200,66,0.1)", border: "1px solid rgba(245,200,66,0.2)", borderRadius: 99, padding: "2px 9px", fontSize: 10, fontWeight: 800, color: "#f5c842", opacity: m.done ? 0.3 : 1 }}>+{m.xp} XP</div>
                    {m.done && <span style={{ color: "#22c55e", fontWeight: 900 }}>✓</span>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── BADGES TAB ── */}
          {activeTab === "badges" && (
            <div style={{ padding: "0 20px 20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {BADGES.map((b, i) => (
                  <div
                    key={i}
                    style={{
                      background: b.earned ? "rgba(124,58,237,0.08)" : "#150e2b",
                      border: `1px solid ${b.earned ? "rgba(124,58,237,0.35)" : "#1e1535"}`,
                      borderRadius: 16, padding: "18px 12px",
                      display: "flex", flexDirection: "column", alignItems: "center",
                      opacity: b.earned ? 1 : 0.4, transition: "all 0.3s",
                    }}
                  >
                    <div style={{ fontSize: 30, marginBottom: 8 }}>{b.earned ? b.icon : "🔒"}</div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: b.earned ? "#f0e8ff" : "#6b5e8e", marginBottom: 4, textAlign: "center" }}>{b.name}</div>
                    <div style={{ fontSize: 10, color: "#6b5e8e", textAlign: "center", lineHeight: 1.4 }}>{b.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, textAlign: "center", fontSize: 12, color: "#6b5e8e" }}>
                8 total badges to unlock in the full app 🏅
              </div>
            </div>
          )}

          {/* Bottom label */}
          <div style={{ borderTop: "1px solid #1e1535", padding: "12px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#6b5e8e" }}>This is a live preview — sign up to save your progress 💜</div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="text-center mt-10">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-black text-lg px-10 py-6 rounded-2xl shadow-lg shadow-purple-900/40"
            onClick={() => {
              document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Start for free — save your progress
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-xs text-gray-500 mt-4">
            Free forever for Nigerian teens · No card needed · Your data stays private
          </p>
        </div>

        {/* Crisis note */}
        <p className="text-center text-xs text-gray-600 mt-6">
          If you're in crisis, call MANI Nigeria free on <span className="text-purple-400 font-bold">0809 111 6264</span> (24/7).
        </p>
      </div>

      <style>{`
        @keyframes xpFloat {
          0%   { opacity: 0; transform: translateY(0) scale(0.6); }
          25%  { opacity: 1; transform: translateY(-16px) scale(1.2); }
          75%  { opacity: 1; transform: translateY(-32px) scale(1); }
          100% { opacity: 0; transform: translateY(-48px) scale(0.8); }
        }
        button:active { transform: scale(0.96) !important; }
      `}</style>
    </section>
  )
}
