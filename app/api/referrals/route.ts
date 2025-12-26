import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

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
    const body = await request.json()
    const { referrer_id } = body

    if (!referrer_id) {
      return NextResponse.json({ error: "Referrer ID required" }, { status: 400 })
    }

    const supabase = await createClient()

    // Check if user already has a referral code
    const { data: existing } = await supabase.from("referrals").select("*").eq("referrer_id", referrer_id).single()

    if (existing) {
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

    if (error) throw error

    return NextResponse.json({ success: true, referral: data })
  } catch (error) {
    console.error("Create referral error:", error)
    return NextResponse.json({ error: "Failed to create referral code" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const referrer_id = searchParams.get("referrer_id")

    if (!referrer_id) {
      return NextResponse.json({ error: "Referrer ID required" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase.from("referrals").select("*").eq("referrer_id", referrer_id).single()

    if (error && error.code !== "PGRST116") throw error

    return NextResponse.json({ success: true, referral: data || null })
  } catch (error) {
    console.error("Fetch referral error:", error)
    return NextResponse.json({ error: "Failed to fetch referral data" }, { status: 500 })
  }
}
