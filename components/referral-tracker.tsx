"use client"

import { useEffect, useRef } from "react"
import { createClient } from "@/lib/supabase/client"

const PENDING_REFERRAL_KEY = "hamboi-pending-referral"

export function ReferralTracker() {
  const inFlightCode = useRef<string | null>(null)

  useEffect(() => {
    const codeFromUrl = new URLSearchParams(window.location.search).get("ref")?.trim().toUpperCase()
    if (codeFromUrl && /^[A-Z0-9]{6,12}$/.test(codeFromUrl)) {
      window.sessionStorage.setItem(PENDING_REFERRAL_KEY, codeFromUrl)
    }

    const supabase = createClient()
    if (!supabase) return

    const recordPendingReferral = async () => {
      const code = window.sessionStorage.getItem(PENDING_REFERRAL_KEY)
      if (!code || inFlightCode.current === code) return
      inFlightCode.current = code

      try {
        const response = await fetch("/api/referrals/convert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ referral_code: code }),
        })
        if (!response.ok) return
        const result = await response.json()
        if (!result.success) return
        window.sessionStorage.removeItem(PENDING_REFERRAL_KEY)
        const currentUrl = new URL(window.location.href)
        currentUrl.searchParams.delete("ref")
        window.history.replaceState({}, document.title, `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`)
      } catch {
        // Keep the pending code in this tab so a later sign-in or refresh can retry.
      } finally {
        inFlightCode.current = null
      }
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: { user: { id: string } } | null) => {
      if (session?.user) void recordPendingReferral()
    })

    void supabase.auth.getUser().then((result: { data: { user: { id: string } | null } }) => {
      if (result.data.user) void recordPendingReferral()
    })

    return () => subscription.unsubscribe()
  }, [])

  return null
}
