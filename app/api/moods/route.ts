import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    const body = await request.json()
    const { mood_value, note, user_id } = body

    const { data, error } = await supabase
      .from("moods")
      .insert({ user_id, mood_value, note: note || null })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, mood: data })
  } catch (error) {
    console.error("Mood error:", error)
    return NextResponse.json({ error: "Failed to save mood" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    const { searchParams } = new URL(request.url)
    const user_id = searchParams.get("user_id")

    const { data, error } = await supabase
      .from("moods")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: true })

    if (error) throw error

    return NextResponse.json({ success: true, moods: data || [] })
  } catch (error) {
    console.error("Fetch moods error:", error)
    return NextResponse.json({ error: "Failed to fetch moods" }, { status: 500 })
  }
}
