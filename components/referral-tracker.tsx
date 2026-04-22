"use client"

import { useEffect } from "react"

// ✅ FIX: Shared userId helper — same logic used by ReferralDashboard
// Import this in both files so they always generate/read the same ID
export function getOrCreateUserId(): string {
  if (typeof window === "undefined") return ""
  let id = localStorage.getItem("hamboi_user_id")
  if (!id) {
    id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem("hamboi_user_id", id)
  }
  return id
}

export function ReferralTracker() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const refCode = urlParams.get("ref")
    if (!refCode) return

    // ✅ FIX: Use shared helper — guaranteed same ID as the dashboard
    const userId = getOrCreateUserId()

    const trackedReferrals: string[] = JSON.parse(
      localStorage.getItem("hamboi_tracked_referrals") || "[]"
    )

    if (trackedReferrals.includes(refCode)) {
      // Already tracked — just clean URL
      window.history.replaceState({}, document.title, window.location.pathname)
      return
    }

    fetch("/api/referrals/convert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ referral_code: refCode, referred_user_id: userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          trackedReferrals.push(refCode)
          localStorage.setItem("hamboi_tracked_referrals", JSON.stringify(trackedReferrals))
        }
      })
      .catch((err) => console.error("[Hamboi] Referral tracking error:", err))
      .finally(() => {
        // ✅ Always clean URL regardless of success/failure
        window.history.replaceState({}, document.title, window.location.pathname)
      })
  }, [])

  return null
}
