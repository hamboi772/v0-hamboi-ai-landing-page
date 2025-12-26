"use client"

import { useEffect } from "react"

export function ReferralTracker() {
  useEffect(() => {
    // Check if user came from a referral link
    const urlParams = new URLSearchParams(window.location.search)
    const refCode = urlParams.get("ref")

    if (refCode) {
      // Get or create user ID
      let userId = localStorage.getItem("hamboi_user_id")
      if (!userId) {
        userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem("hamboi_user_id", userId)
      }

      // Check if we've already tracked this referral
      const trackedReferrals = JSON.parse(localStorage.getItem("hamboi_tracked_referrals") || "[]")

      if (!trackedReferrals.includes(refCode)) {
        // Track the referral conversion
        fetch("/api/referrals/convert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            referral_code: refCode,
            referred_user_id: userId,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              console.log("[v0] Referral tracked successfully")
              // Mark this referral as tracked
              trackedReferrals.push(refCode)
              localStorage.setItem("hamboi_tracked_referrals", JSON.stringify(trackedReferrals))
            }
          })
          .catch((err) => console.error("[v0] Referral tracking error:", err))
      }

      // Clean up URL without page reload
      const cleanUrl = window.location.pathname
      window.history.replaceState({}, document.title, cleanUrl)
    }
  }, [])

  return null
}
