import { type NextRequest, NextResponse } from "next/server"
import { getAuthenticatedSupabase } from "@/lib/supabase/require-user"

export async function POST(request: NextRequest) {
  const { supabase, user } = await getAuthenticatedSupabase()
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 })

  try {
    const body = await request.json()
    const title = typeof body.title === "string" ? body.title.trim() : ""
    const content = typeof body.content === "string" ? body.content.trim() : ""
    const moodTag = typeof body.mood_tag === "string" ? body.mood_tag.trim() : null

    if (!title || title.length > 120 || !content || content.length > 12000 || (moodTag && moodTag.length > 80)) {
      return NextResponse.json({ error: "Check the entry fields and try again" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("journal_entries")
      .insert({ user_id: user.id, title, content, mood_tag: moodTag || null })
      .select("id, user_id, title, content, mood_tag, created_at, updated_at")
      .single()

    if (error) {
      console.error("Journal save failed", error.code)
      return NextResponse.json({ error: "Failed to save entry" }, { status: 500 })
    }

    return NextResponse.json({ success: true, entry: data })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}

export async function GET() {
  const { supabase, user } = await getAuthenticatedSupabase()
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 })

  const { data, error } = await supabase
    .from("journal_entries")
    .select("id, user_id, title, content, mood_tag, created_at, updated_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Journal fetch failed", error.code)
    return NextResponse.json({ error: "Failed to fetch entries" }, { status: 500 })
  }

  return NextResponse.json({ success: true, entries: data ?? [] })
}
