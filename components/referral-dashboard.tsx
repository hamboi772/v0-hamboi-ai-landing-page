"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"

export function ReferralDashboard() {
  const [copied, setCopied] = useState(false)

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

  const referralUrl = typeof window !== "undefined"
    ? `${window.location.origin}?ref=${userId.substring(0, 8)}`
    : ""

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl)
      setCopied(true)
      toast.success("Copied! 💜")
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error("Couldn't copy — try manually")
    }
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#F5F5F5" }}>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 28, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#F5F5F5", marginBottom: 8 }}>
          Share Hamboi
        </h2>
        <p style={{ fontSize: 15, color: "#8B8B8B", lineHeight: 1.6 }}>
          Share this app with someone who needs support. They'll appreciate it.
        </p>
      </div>

      {/* Referral link */}
      <div style={{ marginBottom: 32 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "#8B8B8B", display: "block", marginBottom: 10 }}>
          Your referral link
        </label>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            type="text"
            readOnly
            value={referralUrl}
            style={{
              flex: 1,
              background: "#0F1219",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 0,
              padding: "12px 14px",
              color: "#F5F5F5",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              outline: "none",
            }}
          />
          <button
            onClick={copyLink}
            style={{
              background: "#0CF2C8",
              color: "#06080F",
              border: "none",
              borderRadius: 0,
              padding: "12px 24px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
      </div>

      {/* Description */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24 }}>
        <p style={{ fontSize: 15, color: "#8B8B8B", lineHeight: 1.6 }}>
          When someone signs up using your link, they'll join our community of teens supporting each other. No tracking, no spam — just real mental health support.
        </p>
      </div>
    </div>
  )
}


