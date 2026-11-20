import { type NextRequest, NextResponse } from "next/server"
import { getAuthenticatedSupabase } from "@/lib/supabase/require-user"

export async function POST(request: NextRequest) {
  const { supabase, user } = await getAuthenticatedSupabase()
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 })

  try {
    const body = await request.json()
    const moodValue = body.mood_value
    const note = typeof body.note === "string" ? body.note.trim() : ""
    if (!Number.isInteger(moodValue) || moodValue < 1 || moodValue > 5 || note.length > 1000) {
      return NextResponse.json({ error: "Invalid mood entry" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("moods")
      .insert({ user_id: user.id, mood_value: moodValue, note: note || null })
      .select("id, user_id, mood_value, note, created_at")
      .single()

    if (error) {
      console.error("Mood save failed", error.code)
      return NextResponse.json({ error: "Failed to save mood" }, { status: 500 })
    }
    return NextResponse.json({ success: true, mood: data })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}

export async function GET() {
  const { supabase, user } = await getAuthenticatedSupabase()
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 })

  const { data, error } = await supabase
    .from("moods")
    .select("id, user_id, mood_value, note, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Mood fetch failed", error.code)
    return NextResponse.json({ error: "Failed to fetch moods" }, { status: 500 })
  }
  return NextResponse.json({ success: true, moods: data ?? [] })
}
