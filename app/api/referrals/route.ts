import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let code = ""
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    const body = await request.json()
    const { referrer_id } = body

    // Check if already exists
    const { data: existing } = await supabase.from("referrals").select("*").eq("referrer_id", referrer_id).single()

    if (existing) {
      return NextResponse.json({ success: true, referral: existing })
    }

    // Create new
    const { data, error } = await supabase
      .from("referrals")
      .insert({ referrer_id, referral_code: generateCode() })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, referral: data })
  } catch (error) {
    console.error("Referral error:", error)
    return NextResponse.json({ error: "Failed to create referral" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    const { searchParams } = new URL(request.url)
    const referrer_id = searchParams.get("referrer_id")

    const { data, error } = await supabase.from("referrals").select("*").eq("referrer_id", referrer_id).single()

    if (error && error.code !== "PGRST116") throw error

    return NextResponse.json({ success: true, referral: data || null })
  } catch (error) {
    console.error("Fetch referral error:", error)
    return NextResponse.json({ error: "Failed to fetch referral" }, { status: 500 })
  }
}
