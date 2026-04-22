"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"

interface Referral {
  id: string
  referral_code: string
  referred_count: number
  created_at: string
}

const SHARE_MESSAGES = [
  "Bro I found this mental health app built by a 15 year old Nigerian student. It actually gets what we go through. Try it:",
  "If you ever need someone to talk to, this app is free and private. No judgment at all.",
  "This app called Hamboi has been helping me with stress and anxiety. It's made for Nigerian teens specifically.",
]

export function ReferralDashboard() {
  const [referral, setReferral] = useState<Referral | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

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

  useEffect(() => { fetchOrCreateReferral() }, [])

  const fetchOrCreateReferral = async () => {
    setLoading(true)
    try {
      let res = await fetch(`/api/referrals?referrer_id=${userId}`)
      let data = await res.json()
      if (!data.referral) {
        res = await fetch("/api/referrals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ referrer_id: userId }),
        })
        data = await res.json()
      }
      if (data.success) setReferral(data.referral)
      else toast.error("Couldn't load referral info")
    } catch (err) {
      toast.error("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  const referralUrl = referral && typeof window !== "undefined"
    ? `${window.location.origin}?ref=${referral.referral_code}`
    : ""

  const copyText = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      toast.success("Copied! 💜")
      setTimeout(() => setCopied(null), 2000)
    } catch {
      toast.error("Couldn't copy — try manually")
    }
  }

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Hamboi MindCare",
          text: "Mental health support built for Nigerian teens. Free, private, real.",
          url: referralUrl,
        })
      } catch {}
    } else {
      copyText(referralUrl, "link")
    }
  }

  const xpEarned = referral ? referral.referred_count * 50 : 0

  if (loading) {
    return (
      <div style={{ ...styles.card, textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>💜</div>
        <div style={{ fontSize: 14, color: "#7c6fa0" }}>Loading your referral info...</div>
      </div>
    )
  }

  if (!referral) {
    return (
      <div style={{ ...styles.card, textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>😔</div>
        <div style={{ fontSize: 14, color: "#7c6fa0" }}>Couldn't load referral data. Try refreshing.</div>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: "'Cabinet Grotesk', 'Nunito', sans-serif", color: "#f0e8ff" }}>

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroEmoji}>💜</div>
        <h2 style={styles.heroTitle}>Share the love</h2>
        <p style={styles.heroSub}>
          Every teen you bring to Hamboi could be someone who finally feels understood.
          You earn XP. They get support. Everyone wins.
        </p>
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <div style={{ ...styles.statVal, color: "#c084fc" }}>{referral.referred_count}</div>
          <div style={styles.statLabel}>Friends joined</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statVal, color: "#f5c842" }}>+{xpEarned}</div>
          <div style={styles.statLabel}>XP earned</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statVal, color: "#22c55e" }}>{referral.referred_count >= 3 ? "✓" : `${referral.referred_count}/3`}</div>
          <div style={styles.statLabel}>To badge</div>
        </div>
      </div>

      {/* Badge progress */}
      {referral.referred_count < 3 && (
        <div style={styles.badgeProgress}>
          <span style={{ fontSize: 20 }}>🌍</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#f0e8ff", marginBottom: 4 }}>
              World Changer badge — {3 - referral.referred_count} friend{3 - referral.referred_count !== 1 ? "s" : ""} away
            </div>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${(referral.referred_count / 3) * 100}%` }} />
            </div>
          </div>
        </div>
      )}
      {referral.referred_count >= 3 && (
        <div style={{ ...styles.badgeProgress, borderColor: "rgba(245,200,66,0.3)", background: "rgba(245,200,66,0.05)" }}>
          <span style={{ fontSize: 24 }}>🌍</span>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#f5c842" }}>
            World Changer badge unlocked! You're making an impact.
          </div>
        </div>
      )}

      {/* Your code */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>Your referral code</div>
        <div style={styles.codeBox} onClick={() => copyText(referral.referral_code, "code")}>
          {referral.referral_code}
          <span style={{ fontSize: 12, color: "#7c6fa0", display: "block", marginTop: 4, fontFamily: "sans-serif", letterSpacing: 0 }}>
            {copied === "code" ? "✓ Copied!" : "Tap to copy"}
          </span>
        </div>

        <div style={styles.shareRow}>
          <button style={styles.shareBtnPrimary} onClick={shareLink}>
            📤 Share link
          </button>
          <button style={styles.shareBtnSecondary} onClick={() => {
            window.open(`https://wa.me/?text=Hey! Try Hamboi MindCare — mental health support for Nigerian teens. Built by a 15-year-old from Nigeria 💜 ${referralUrl}`, "_blank")
          }}>
            💬 WhatsApp
          </button>
          <button style={styles.shareBtnSecondary} onClick={() => {
            window.open(`https://twitter.com/intent/tweet?text=Mental health support built for Nigerian teens 💜 Check out @HamboiMindcare — use my code ${referral.referral_code} ${referralUrl}`, "_blank")
          }}>
            🐦 Twitter
          </button>
        </div>
      </div>

      {/* Message templates */}
      <div style={styles.cardTitle2}>Message templates</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {SHARE_MESSAGES.map((msg, i) => (
          <div key={i} style={styles.templateCard}>
            <p style={styles.templateText}>"{msg}"</p>
            <p style={styles.templateUrl}>{referralUrl}</p>
            <button
              style={{ ...styles.copyMsgBtn, ...(copied === `msg-${i}` ? styles.copyMsgBtnDone : {}) }}
              onClick={() => copyText(`${msg}\n\n${referralUrl}`, `msg-${i}`)}
            >
              {copied === `msg-${i}` ? "✓ Copied!" : "Copy message"}
            </button>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div style={styles.cardTitle2}>How it works</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { n: "1", t: "Share your code or link", d: "Send it to a friend who might need someone to talk to" },
          { n: "2", t: "They sign up", d: "When they create an account using your code, it counts" },
          { n: "3", t: "You both grow", d: "You get +50 XP, they get a warm welcome" },
          { n: "4", t: "Unlock World Changer", d: "Refer 3 friends and earn this exclusive badge 🌍" },
        ].map((s) => (
          <div key={s.n} style={styles.stepCard}>
            <div style={styles.stepNum}>{s.n}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#f0e8ff", marginBottom: 2 }}>{s.t}</div>
              <div style={{ fontSize: 12, color: "#7c6fa0" }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  card: { background: "#150e2b", border: "1px solid #251a45", borderRadius: 20, padding: 20, marginBottom: 14 },
  cardTitle: { fontSize: 13, fontWeight: 700, color: "#7c6fa0", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 },
  cardTitle2: { fontSize: 13, fontWeight: 700, color: "#7c6fa0", margin: "20px 0 12px", textTransform: "uppercase", letterSpacing: 1 },
  hero: {
    background: "linear-gradient(135deg, #1e0f3f, #150e2b)",
    border: "1px solid rgba(124,58,237,0.3)",
    borderRadius: 22, padding: "24px 20px",
    textAlign: "center", marginBottom: 14,
  },
  heroEmoji: { fontSize: 40, marginBottom: 12 },
  heroTitle: { fontFamily: "'Clash Display', sans-serif", fontSize: 22, fontWeight: 700, color: "#c084fc", marginBottom: 8 },
  heroSub: { fontSize: 13, color: "#7c6fa0", lineHeight: 1.7 },
  statsRow: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 12 },
  statCard: { background: "#150e2b", border: "1px solid #251a45", borderRadius: 16, padding: "16px 10px", textAlign: "center" },
  statVal: { fontSize: 24, fontWeight: 800 },
  statLabel: { fontSize: 11, color: "#7c6fa0", marginTop: 4 },
  badgeProgress: {
    display: "flex", alignItems: "center", gap: 14,
    background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.2)",
    borderRadius: 16, padding: "14px 16px", marginBottom: 14,
  },
  progressBar: { height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" },
  progressFill: { height: "100%", background: "linear-gradient(90deg, #5b21b6, #7C3AED, #a855f7)", borderRadius: 99 },
  codeBox: {
    background: "#0F0A1E", border: "1px solid rgba(124,58,237,0.3)",
    borderRadius: 14, padding: "18px 20px", textAlign: "center",
    fontFamily: "'Clash Display', sans-serif", fontSize: 26,
    fontWeight: 700, color: "#c084fc", letterSpacing: 4,
    cursor: "pointer", marginBottom: 16, transition: "all 0.2s",
  },
  shareRow: { display: "flex", gap: 8, flexWrap: "wrap" as const },
  shareBtnPrimary: {
    flex: 1, background: "linear-gradient(135deg, #7C3AED, #9333ea)",
    color: "white", border: "none", borderRadius: 12, padding: "12px 16px",
    fontSize: 13, fontWeight: 800, cursor: "pointer", minWidth: 100,
    fontFamily: "'Cabinet Grotesk', 'Nunito', sans-serif",
  },
  shareBtnSecondary: {
    flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid #251a45",
    borderRadius: 12, padding: "12px 16px", color: "#f0e8ff",
    fontSize: 13, fontWeight: 700, cursor: "pointer", minWidth: 100,
    fontFamily: "'Cabinet Grotesk', 'Nunito', sans-serif",
  },
  templateCard: {
    background: "#150e2b", border: "1px solid #251a45",
    borderRadius: 16, padding: "16px",
  },
  templateText: { fontSize: 13, color: "#c4b5fd", lineHeight: 1.6, marginBottom: 8, fontStyle: "italic" },
  templateUrl: { fontSize: 11, color: "#7c6fa0", marginBottom: 12, wordBreak: "break-all" as const },
  copyMsgBtn: {
    background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)",
    borderRadius: 10, padding: "8px 14px", color: "#c084fc",
    fontSize: 12, fontWeight: 700, cursor: "pointer",
    fontFamily: "'Cabinet Grotesk', 'Nunito', sans-serif",
  },
  copyMsgBtnDone: {
    background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", color: "#22c55e",
  },
  stepCard: {
    background: "#150e2b", border: "1px solid #251a45",
    borderRadius: 14, padding: "14px 16px",
    display: "flex", alignItems: "flex-start", gap: 14,
  },
  stepNum: {
    width: 28, height: 28, borderRadius: "50%",
    background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 12, fontWeight: 900, color: "#c084fc", flexShrink: 0,
  },
}
