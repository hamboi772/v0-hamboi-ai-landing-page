import { randomBytes } from "node:crypto"
import { type NextRequest, NextResponse } from "next/server"
import { createClient as createAdminClient } from "@supabase/supabase-js"
import { getAuthenticatedSupabase } from "@/lib/supabase/require-user"

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createAdminClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })
}

export async function POST(_request: NextRequest) {
  const { user } = await getAuthenticatedSupabase()
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 })

  const supabase = getAdminClient()
  if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 503 })

  const { data: existing, error: lookupError } = await supabase
    .from("referrals")
    .select("id, referrer_id, referral_code, referred_count")
    .eq("referrer_id", user.id)
    .maybeSingle()
  if (lookupError) return NextResponse.json({ error: "Could not load referral" }, { status: 500 })
  if (existing) return NextResponse.json({ success: true, referral: existing })

  const referralCode = randomBytes(6).toString("hex").toUpperCase()
  const { data, error } = await supabase
    .from("referrals")
    .insert({ referrer_id: user.id, referral_code: referralCode })
    .select("id, referrer_id, referral_code, referred_count")
    .single()

  if (error) {
    console.error("Referral creation failed", error.code)
    return NextResponse.json({ error: "Could not create referral" }, { status: 500 })
  }
  return NextResponse.json({ success: true, referral: data })
}

export async function GET() {
  const { user } = await getAuthenticatedSupabase()
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 })

  const supabase = getAdminClient()
  if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 503 })
  const { data, error } = await supabase
    .from("referrals")
    .select("id, referrer_id, referral_code, referred_count")
    .eq("referrer_id", user.id)
    .maybeSingle()

  if (error) {
    console.error("Referral fetch failed", error.code)
    return NextResponse.json({ error: "Could not fetch referral" }, { status: 500 })
  }
  return NextResponse.json({ success: true, referral: data })
}
