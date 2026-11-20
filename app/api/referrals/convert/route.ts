import { type NextRequest, NextResponse } from "next/server"
import { createClient as createAdminClient } from "@supabase/supabase-js"
import { getAuthenticatedSupabase } from "@/lib/supabase/require-user"

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createAdminClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })
}

export async function POST(request: NextRequest) {
  const { user } = await getAuthenticatedSupabase()
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 })

  try {
    const body = await request.json()
    const referralCode = typeof body.referral_code === "string" ? body.referral_code.trim().toUpperCase() : ""
    if (!/^[A-Z0-9]{6,12}$/.test(referralCode)) {
      return NextResponse.json({ error: "Invalid referral code" }, { status: 400 })
    }

    const supabase = getAdminClient()
    if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 503 })

    const { data: referral, error: referralError } = await supabase
      .from("referrals")
      .select("id, referrer_id, referral_code, referred_count")
      .eq("referral_code", referralCode)
      .maybeSingle()
    if (referralError) return NextResponse.json({ error: "Could not validate referral" }, { status: 500 })
    if (!referral || referral.referrer_id === user.id) {
      return NextResponse.json({ error: "Invalid referral code" }, { status: 400 })
    }

    const { data: existing, error: existingError } = await supabase
      .from("referral_conversions")
      .select("id")
      .eq("referral_code", referralCode)
      .eq("referred_user_id", user.id)
      .maybeSingle()
    if (existingError) return NextResponse.json({ error: "Could not validate referral" }, { status: 500 })
    if (existing) return NextResponse.json({ success: true, message: "Already counted" })

    const { error: insertError } = await supabase.from("referral_conversions").insert({
      referral_code: referralCode,
      referred_user_id: user.id,
    })
    if (insertError) {
      console.error("Referral conversion insert failed", insertError.code)
      return NextResponse.json({ error: "Could not record referral" }, { status: 500 })
    }

    const { error: countError } = await supabase
      .from("referrals")
      .update({ referred_count: referral.referred_count + 1 })
      .eq("id", referral.id)
    if (countError) {
      console.error("Referral count update failed", countError.code)
      return NextResponse.json({ error: "Could not update referral count" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Referral counted" })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
