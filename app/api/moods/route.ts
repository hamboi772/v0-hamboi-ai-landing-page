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

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient()
    const body = await request.json()
    const { mood_value, note, user_id } = body

    console.log("[v0] Saving mood:", { mood_value, user_id, has_note: !!note })

    if (!mood_value || mood_value < 1 || mood_value > 5) {
      return NextResponse.json({ error: "Invalid mood value (1-5 required)" }, { status: 400 })
    }

    if (!user_id) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("moods")
      .insert({
        user_id,
        mood_value,
        note: note || null,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Supabase mood insert error:", error)
      throw error
    }

    console.log("[v0] Mood saved successfully:", data)
    return NextResponse.json({ success: true, mood: data })
  } catch (error) {
    console.error("[v0] Mood tracking error:", error)
    return NextResponse.json({ error: "Failed to save mood" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient()
    const { searchParams } = new URL(request.url)
    const user_id = searchParams.get("user_id")
    const days = Number.parseInt(searchParams.get("days") || "30")

    console.log("[v0] Fetching moods for user:", user_id)

    if (!user_id) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    // Calculate date range
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const { data, error } = await supabase
      .from("moods")
      .select("*")
      .eq("user_id", user_id)
      .gte("created_at", startDate.toISOString())
      .order("created_at", { ascending: true })

    if (error) {
      console.error("[v0] Supabase mood fetch error:", error)
      throw error
    }

    console.log("[v0] Fetched moods:", data?.length || 0, "entries")
    return NextResponse.json({ success: true, moods: data || [] })
  } catch (error) {
    console.error("[v0] Fetch moods error:", error)
    return NextResponse.json({ error: "Failed to fetch moods" }, { status: 500 })
  }
}
