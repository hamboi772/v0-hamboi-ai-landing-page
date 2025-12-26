import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { mood_value, note, user_id } = body

    if (!mood_value || mood_value < 1 || mood_value > 5) {
      return NextResponse.json({ error: "Invalid mood value (1-5 required)" }, { status: 400 })
    }

    if (!user_id) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from("moods")
      .insert({
        user_id,
        mood_value,
        note: note || null,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, mood: data })
  } catch (error) {
    console.error("Mood tracking error:", error)
    return NextResponse.json({ error: "Failed to save mood" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const user_id = searchParams.get("user_id")
    const days = Number.parseInt(searchParams.get("days") || "30")

    if (!user_id) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const supabase = await createClient()

    // Calculate date range
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const { data, error } = await supabase
      .from("moods")
      .select("*")
      .eq("user_id", user_id)
      .gte("created_at", startDate.toISOString())
      .order("created_at", { ascending: true })

    if (error) throw error

    return NextResponse.json({ success: true, moods: data || [] })
  } catch (error) {
    console.error("Fetch moods error:", error)
    return NextResponse.json({ error: "Failed to fetch moods" }, { status: 500 })
  }
}
