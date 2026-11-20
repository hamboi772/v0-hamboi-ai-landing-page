"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

export function ReferralDashboard() {
  const [copied, setCopied] = useState(false)
  const [referralCode, setReferralCode] = useState("")
  const [loading, setLoading] = useState(true)
  const [authRequired, setAuthRequired] = useState(false)

  useEffect(() => {
    let active = true
    const loadReferral = async () => {
      const supabase = createClient()
      if (!supabase) {
        if (active) { setAuthRequired(true); setLoading(false) }
        return
      }
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        if (active) { setAuthRequired(true); setLoading(false) }
        return
      }

      try {
        let response = await fetch("/api/referrals")
        if (!response.ok) throw new Error("Could not load referral")
        let result = await response.json()
        if (!result.referral) {
          response = await fetch("/api/referrals", { method: "POST" })
          if (!response.ok) throw new Error("Could not create referral")
          result = await response.json()
        }
        if (active) setReferralCode(result.referral?.referral_code ?? "")
      } catch {
        if (active) toast.error("Could not load your referral link. Try again later.")
      } finally {
        if (active) setLoading(false)
      }
    }

    void loadReferral()
    return () => { active = false }
  }, [])

  const referralUrl = typeof window !== "undefined" && referralCode
    ? `${window.location.origin}?ref=${encodeURIComponent(referralCode)}`
    : ""

  const copyLink = async () => {
    if (!referralUrl) return
    try {
      await navigator.clipboard.writeText(referralUrl)
      setCopied(true)
      toast.success("Copied referral link")
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error("Couldn't copy the link. Try selecting it manually.")
    }
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#F5F5F5" }}>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 28, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#F5F5F5", marginBottom: 8 }}>
          Share Hamboi
        </h2>
        <p style={{ fontSize: 15, color: "#8B8B8B", lineHeight: 1.6 }}>
          Share the initiative with someone who may find its wellbeing information useful.
        </p>
      </div>

      {authRequired ? (
        <p role="status" style={{ fontSize: 14, color: "#8B8B8B", lineHeight: 1.6 }}>
          Sign in to your Hamboi account before creating an account-linked referral link.
        </p>
      ) : loading ? (
        <p role="status" style={{ fontSize: 14, color: "#8B8B8B" }}>Loading your referral link…</p>
      ) : referralUrl ? (
        <div style={{ marginBottom: 32 }}>
          <label htmlFor="referral-link" style={{ fontSize: 12, fontWeight: 600, color: "#8B8B8B", display: "block", marginBottom: 10 }}>
            Your referral link
          </label>
          <div style={{ display: "flex", gap: 10 }}>
            <input id="referral-link" type="text" readOnly value={referralUrl} style={{ flex: 1, minWidth: 0, background: "#0F1219", border: "1px solid rgba(255,255,255,0.07)", padding: "12px 14px", color: "#F5F5F5", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }} />
            <button type="button" onClick={copyLink} style={{ background: "#0CF2C8", color: "#06080F", border: "none", padding: "12px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p style={{ fontSize: 12, color: "#8B8B8B", lineHeight: 1.6, marginTop: 12 }}>
            Referral activity is linked to signed-in accounts. Do not use this link as a substitute for professional or emergency support.
          </p>
        </div>
      ) : (
        <p role="status" style={{ fontSize: 14, color: "#8B8B8B" }}>Your referral link is unavailable right now.</p>
      )}

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24 }}>
        <p style={{ fontSize: 15, color: "#8B8B8B", lineHeight: 1.6 }}>
          Hamboi provides general mental-health awareness and wellbeing information; it is not a crisis or therapy service.
        </p>
      </div>
    </div>
  )
}
