import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { referral_code, referred_user_id } = body

    if (!referral_code || !referred_user_id) {
      return NextResponse.json({ error: "Referral code and user ID required" }, { status: 400 })
    }

    const supabase = await createClient()

    // Check if referral code exists
    const { data: referral, error: refError } = await supabase
      .from("referrals")
      .select("*")
      .eq("referral_code", referral_code)
      .single()

    if (refError || !referral) {
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
      return NextResponse.json({ success: true, message: "Already counted" })
    }

    // Create conversion record
    const { error: convError } = await supabase.from("referral_conversions").insert({
      referral_code,
      referred_user_id,
    })

    if (convError) throw convError

    // Increment referral count
    const { error: updateError } = await supabase
      .from("referrals")
      .update({
        referred_count: referral.referred_count + 1,
      })
      .eq("id", referral.id)

    if (updateError) throw updateError

    return NextResponse.json({ success: true, message: "Referral counted" })
  } catch (error) {
    console.error("Convert referral error:", error)
    return NextResponse.json({ error: "Failed to process referral" }, { status: 500 })
  }
}
