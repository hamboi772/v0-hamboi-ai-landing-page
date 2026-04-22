"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

function getSupabaseClient() {
  if (typeof window === "undefined") return null
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  const { createClient } = require("@supabase/supabase-js")
  return createClient(url, key)
}

const QUESTIONS = [
  {
    q: "Over the last few days, how often have you felt genuinely okay?",
    sub: "No pressure — just be honest with yourself",
    area: "mood",
    opts: [
      { e: "😭", t: "Barely at all", s: "Most days felt really heavy", v: 1 },
      { e: "😔", t: "Not much", s: "More bad days than good", v: 2 },
      { e: "😐", t: "Sometimes", s: "Mixed — had some okay moments", v: 3 },
      { e: "😊", t: "Quite often", s: "More good days than bad", v: 4 },
      { e: "🤩", t: "Most of the time", s: "Genuinely feeling good", v: 5 },
    ],
  },
  {
    q: "How much have you been able to sleep and rest properly?",
    sub: "Sleep affects everything — mood, focus, energy",
    area: "energy",
    opts: [
      { e: "😩", t: "Barely sleeping", s: "Up late, can't switch off", v: 1 },
      { e: "😪", t: "Not great", s: "Tired most of the time", v: 2 },
      { e: "😶", t: "It's okay", s: "Some nights are fine", v: 3 },
      { e: "😌", t: "Pretty well", s: "Getting decent rest", v: 4 },
      { e: "😴", t: "Really well", s: "Sleeping and feeling rested", v: 5 },
    ],
  },
  {
    q: "When something is bothering you, do you have someone to talk to?",
    sub: "Connection matters more than people realise",
    area: "connection",
    opts: [
      { e: "😶", t: "Not really", s: "Feel pretty alone with it", v: 1 },
      { e: "🤷", t: "Not sure who", s: "Don't really trust anyone", v: 2 },
      { e: "🫂", t: "Maybe one person", s: "Someone I could reach out to", v: 3 },
      { e: "💬", t: "Yes, a few people", s: "I have support around me", v: 4 },
      { e: "💜", t: "Yes, always", s: "I feel really supported", v: 5 },
    ],
  },
  {
    q: "How's the pressure from school, family or expectations feeling?",
    sub: "It's okay if it's a lot — this is a safe space",
    area: "stress",
    opts: [
      { e: "🔥", t: "Overwhelming", s: "Can't keep up at all", v: 1 },
      { e: "😤", t: "Really a lot", s: "Feeling crushed by it", v: 2 },
      { e: "😮‍💨", t: "Manageable", s: "Stressful but coping", v: 3 },
      { e: "🙂", t: "Not too bad", s: "Handling it okay", v: 4 },
      { e: "😎", t: "I've got this", s: "Feeling on top of things", v: 5 },
    ],
  },
  {
    q: "Do you feel like things can get better for you?",
    sub: "Hope is one of the most powerful things",
    area: "hope",
    opts: [
      { e: "😶‍🌫️", t: "Not right now", s: "Hard to see a way forward", v: 1 },
      { e: "🤔", t: "I'm not sure", s: "Doubt it but maybe", v: 2 },
      { e: "🌤️", t: "A little", s: "Small sparks of hope", v: 3 },
      { e: "🌟", t: "Yes, I think so", s: "Things can improve", v: 4 },
      { e: "🚀", t: "Absolutely", s: "I believe in myself", v: 5 },
    ],
  },
]

const AREA_COLORS: Record<string, string> = {
  mood: "#a855f7", energy: "#f97316",
  connection: "#22c55e", stress: "#f5c842", hope: "#ec4899",
}

export default function CheckInPage() {
  const router = useRouter()
  const [stage, setStage] = useState<"intro" | "quiz" | "result">("intro")
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<{ area: string; val: number }[]>([])
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)

  const handleNext = () => {
    if (selectedOpt === null) return
    const newAnswers = [...answers, { area: QUESTIONS[currentQ].area, val: selectedOpt }]
    if (currentQ + 1 < QUESTIONS.length) {
      setAnswers(newAnswers)
      setCurrentQ(currentQ + 1)
      setSelectedOpt(null)
    } else {
      setAnswers(newAnswers)
      saveResults(newAnswers)
      setStage("result")
    }
  }

  const saveResults = async (ans: { area: string; val: number }[]) => {
    setSaving(true)
    try {
      const supabase = getSupabaseClient()
      if (!supabase) return
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const total = ans.reduce((s, a) => s + a.val, 0)
      const max = QUESTIONS.length * 5
      const score = Math.round((total / max) * 100)
      await supabase.from("mood_logs").insert({
        user_id: user.id,
        mood: score >= 70 ? "good" : score >= 40 ? "okay" : "low",
        note: `Wellness check: ${score}/100`,
        xp_earned: 50,
      })
      await supabase.from("profiles").update({
        xp: supabase.rpc ? undefined : undefined,
      }).eq("id", user.id)
      await supabase.rpc("update_streak", { user_id: user.id })
    } catch (err) {
      console.error("Error saving check-in:", err)
    } finally {
      setSaving(false)
    }
  }

  const score = answers.length > 0
    ? Math.round((answers.reduce((s, a) => s + a.val, 0) / (QUESTIONS.length * 5)) * 100)
    : 0

  const getResultLabel = () => {
    if (score >= 75) return ["You're doing really well 💜", "Keep showing up like this. It's working."]
    if (score >= 50) return ["You're doing okay 🌿", "There's some good here, and some things that could use more care. That's human."]
    if (score >= 30) return ["Things feel heavy right now", "That's okay to admit. You're still here, and that matters."]
    return ["This has been a hard time 💜", "You came here and checked in. That took courage. Please talk to someone you trust."]
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* INTRO */}
        {stage === "intro" && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: 64, marginBottom: 20, display: "block", animation: "float 3s ease-in-out infinite" }}>🧠</div>
            <h1 style={styles.bigTitle}>How are you really doing?</h1>
            <p style={styles.bigSub}>
              Not a test. Not a diagnosis. Just 5 honest questions to help you understand yourself better — and earn some XP while you're at it.
            </p>
            <button style={styles.primaryBtn} onClick={() => setStage("quiz")}>
              Let's check in → +50 XP
            </button>
          </div>
        )}

        {/* QUIZ */}
        {stage === "quiz" && (
          <div>
            {/* Progress */}
            <div style={styles.progressRow}>
              {QUESTIONS.map((_, i) => (
                <div key={i} style={{
                  ...styles.progressDot,
                  background: i < currentQ ? "#7C3AED" : i === currentQ ? "#c084fc" : "rgba(255,255,255,0.08)",
                }} />
              ))}
            </div>

            <div style={styles.questionLabel}>{currentQ + 1} of {QUESTIONS.length}</div>
            <h2 style={styles.questionText}>{QUESTIONS[currentQ].q}</h2>
            <p style={styles.questionSub}>{QUESTIONS[currentQ].sub}</p>

            <div style={styles.optionsList}>
              {QUESTIONS[currentQ].opts.map((opt) => (
                <div
                  key={opt.v}
                  style={{
                    ...styles.option,
                    borderColor: selectedOpt === opt.v ? "rgba(124,58,237,0.6)" : "rgba(255,255,255,0.06)",
                    background: selectedOpt === opt.v ? "rgba(124,58,237,0.12)" : "rgba(255,255,255,0.03)",
                  }}
                  onClick={() => setSelectedOpt(opt.v)}
                >
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{opt.e}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#f0e8ff" }}>{opt.t}</div>
                    <div style={{ fontSize: 12, color: "#7c6fa0", marginTop: 2 }}>{opt.s}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              style={{ ...styles.primaryBtn, opacity: selectedOpt === null ? 0.35 : 1, marginTop: 20 }}
              onClick={handleNext}
              disabled={selectedOpt === null}
            >
              {currentQ + 1 === QUESTIONS.length ? "See my results →" : "Next →"}
            </button>
          </div>
        )}

        {/* RESULT */}
        {stage === "result" && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 50, marginBottom: 8 }}>💜</div>
            <div style={styles.scoreNumber}>{score}</div>
            <div style={{ fontSize: 11, color: "#7c6fa0", marginBottom: 12, textTransform: "uppercase", letterSpacing: 2 }}>out of 100</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#f0e8ff", marginBottom: 8 }}>{getResultLabel()[0]}</h2>
            <p style={{ fontSize: 14, color: "#7c6fa0", lineHeight: 1.7, marginBottom: 20 }}>{getResultLabel()[1]}</p>

            <div style={styles.xpBadge}>+50 XP earned 🎉</div>

            <div style={styles.areasGrid}>
              {answers.map((a) => (
                <div key={a.area} style={styles.areaCard}>
                  <div style={{ fontSize: 11, color: "#7c6fa0", marginBottom: 6, textTransform: "capitalize" }}>{a.area}</div>
                  <div style={styles.areaBar}>
                    <div style={{ ...styles.areaFill, width: `${(a.val / 5) * 100}%`, background: AREA_COLORS[a.area] }} />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#f0e8ff", marginTop: 4 }}>{Math.round((a.val / 5) * 100)}%</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button style={{ ...styles.primaryBtn, flex: 1 }} onClick={() => router.push("/dashboard")}>
                Go to dashboard
              </button>
              <button
                style={{ ...styles.secondaryBtn, flex: 1 }}
                onClick={() => { setStage("intro"); setCurrentQ(0); setAnswers([]); setSelectedOpt(null) }}
              >
                Check in again
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      `}</style>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { background: "#0F0A1E", minHeight: "100vh", fontFamily: "'Cabinet Grotesk','Nunito',sans-serif", color: "#f0e8ff" },
  container: { maxWidth: 430, margin: "0 auto", padding: "24px 16px 80px" },
  bigTitle: { fontFamily: "'Clash Display',sans-serif", fontSize: 26, fontWeight: 700, color: "#c084fc", marginBottom: 12 },
  bigSub: { fontSize: 14, color: "#7c6fa0", lineHeight: 1.7, marginBottom: 28, maxWidth: 340, margin: "0 auto 28px" },
  primaryBtn: {
    width: "100%", background: "linear-gradient(135deg,#7C3AED,#9333ea)",
    color: "white", border: "none", borderRadius: 14, padding: 16,
    fontSize: 15, fontWeight: 800, cursor: "pointer",
    fontFamily: "'Cabinet Grotesk','Nunito',sans-serif",
    boxShadow: "0 4px 16px rgba(124,58,237,0.35)", display: "block",
  },
  secondaryBtn: {
    background: "rgba(255,255,255,0.05)", border: "1px solid #251a45",
    borderRadius: 14, padding: 16, color: "#7c6fa0",
    fontSize: 15, fontWeight: 700, cursor: "pointer",
    fontFamily: "'Cabinet Grotesk','Nunito',sans-serif",
  },
  progressRow: { display: "flex", gap: 6, marginBottom: 24 },
  progressDot: { flex: 1, height: 4, borderRadius: 99, transition: "background 0.3s" },
  questionLabel: { fontSize: 11, color: "#7c6fa0", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 },
  questionText: { fontFamily: "'Clash Display',sans-serif", fontSize: 20, fontWeight: 700, color: "#f0e8ff", marginBottom: 8, lineHeight: 1.3 },
  questionSub: { fontSize: 13, color: "#7c6fa0", marginBottom: 20 },
  optionsList: { display: "flex", flexDirection: "column", gap: 10 },
  option: {
    background: "rgba(255,255,255,0.03)", border: "2px solid rgba(255,255,255,0.06)",
    borderRadius: 14, padding: "14px 16px", cursor: "pointer",
    display: "flex", alignItems: "center", gap: 14, transition: "all 0.2s",
  },
  scoreNumber: {
    fontFamily: "'Clash Display',sans-serif", fontSize: 72, fontWeight: 700,
    background: "linear-gradient(135deg,#c084fc,#7C3AED)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    backgroundClip: "text", margin: "8px 0",
  },
  xpBadge: {
    background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)",
    borderRadius: 99, padding: "10px 24px", fontSize: 15, fontWeight: 800,
    color: "#c084fc", display: "inline-block", marginBottom: 20,
  },
  areasGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, textAlign: "left" },
  areaCard: { background: "#150e2b", border: "1px solid #251a45", borderRadius: 14, padding: 14 },
  areaBar: { height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" },
  areaFill: { height: "100%", borderRadius: 99, transition: "width 1s ease" },
}
