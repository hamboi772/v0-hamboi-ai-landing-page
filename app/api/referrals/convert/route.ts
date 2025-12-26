import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function getSupabaseClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient()
    const body = await request.json()
    const { referral_code, referred_user_id } = body

    console.log("[v0] Converting referral:", { referral_code, referred_user_id })

    if (!referral_code || !referred_user_id) {
      return NextResponse.json({ error: "Referral code and user ID required" }, { status: 400 })
    }

    // Check if referral code exists
    const { data: referral, error: refError } = await supabase
      .from("referrals")
      .select("*")
      .eq("referral_code", referral_code)
      .single()

    if (refError || !referral) {
      console.error("[v0] Invalid referral code:", referral_code)
      return NextResponse.json({ error: "Invalid referral code" }, { status: 400 })
    }

    // Check if already converted
    const { data: existing } = await supabase
      .from("referral_conversions")
      .select("*")
      .eq("referral_code", referral_code)
      .eq("referred_user_id", referred_user_id)
      .single()

    if (existing) {
      console.log("[v0] Referral already counted")
      return NextResponse.json({ success: true, message: "Already counted" })
    }

    // Create conversion record
    const { error: convError } = await supabase.from("referral_conversions").insert({
      referral_code,
      referred_user_id,
    })

    if (convError) {
      console.error("[v0] Conversion insert error:", convError)
      throw convError
    }

    // Increment referral count
    const { error: updateError } = await supabase
      .from("referrals")
      .update({
        referred_count: referral.referred_count + 1,
      })
      .eq("id", referral.id)

    if (updateError) {
      console.error("[v0] Referral count update error:", updateError)
      throw updateError
    }

    console.log("[v0] Referral converted successfully")
    return NextResponse.json({ success: true, message: "Referral counted" })
  } catch (error) {
    console.error("[v0] Convert referral error:", error)
    return NextResponse.json({ error: "Failed to process referral" }, { status: 500 })
  }
}
