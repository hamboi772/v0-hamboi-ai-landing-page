import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("[v0] Missing Supabase environment variables")
    throw new Error("Supabase configuration missing")
  }

  return createClient(supabaseUrl, supabaseKey)
}

function generateReferralCode(length = 8): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789" // Removed confusing chars
  let code = ""
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient()
    const body = await request.json()
    const { referrer_id } = body

    console.log("[v0] Creating referral code for:", referrer_id)

    if (!referrer_id) {
      return NextResponse.json({ error: "Referrer ID required" }, { status: 400 })
    }

    // Check if user already has a referral code
    const { data: existing } = await supabase.from("referrals").select("*").eq("referrer_id", referrer_id).single()

    if (existing) {
      console.log("[v0] Returning existing referral code")
      return NextResponse.json({ success: true, referral: existing })
    }

    // Generate unique code
    let code = generateReferralCode()
    let attempts = 0

    while (attempts < 10) {
      const { data: duplicate } = await supabase.from("referrals").select("id").eq("referral_code", code).single()

      if (!duplicate) break

      code = generateReferralCode()
      attempts++
    }

    // Create new referral code
    const { data, error } = await supabase
      .from("referrals")
      .insert({
        referrer_id,
        referral_code: code,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Referral insert error:", error)
      throw error
    }

    console.log("[v0] Referral code created:", code)
    return NextResponse.json({ success: true, referral: data })
  } catch (error) {
    console.error("[v0] Create referral error:", error)
    return NextResponse.json({ error: "Failed to create referral code" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient()
    const { searchParams } = new URL(request.url)
    const referrer_id = searchParams.get("referrer_id")

    console.log("[v0] Fetching referral for:", referrer_id)

    if (!referrer_id) {
      return NextResponse.json({ error: "Referrer ID required" }, { status: 400 })
    }

    const { data, error } = await supabase.from("referrals").select("*").eq("referrer_id", referrer_id).single()

    if (error && error.code !== "PGRST116") {
      console.error("[v0] Referral fetch error:", error)
      throw error
    }

    console.log("[v0] Referral data:", data ? "found" : "not found")
    return NextResponse.json({ success: true, referral: data || null })
  } catch (error) {
    console.error("[v0] Fetch referral error:", error)
    return NextResponse.json({ error: "Failed to fetch referral data" }, { status: 500 })
  }
}
