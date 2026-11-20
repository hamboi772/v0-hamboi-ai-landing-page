import { type NextRequest, NextResponse } from "next/server"
import { getAuthenticatedSupabase } from "@/lib/supabase/require-user"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { supabase, user } = await getAuthenticatedSupabase()
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 })

  try {
    const { id } = await params
    const body = await request.json()
    const title = typeof body.title === "string" ? body.title.trim() : ""
    const content = typeof body.content === "string" ? body.content.trim() : ""
    const moodTag = typeof body.mood_tag === "string" ? body.mood_tag.trim() : null

    if (!title || title.length > 120 || !content || content.length > 12000 || (moodTag && moodTag.length > 80)) {
      return NextResponse.json({ error: "Check the entry fields and try again" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("journal_entries")
      .update({ title, content, mood_tag: moodTag || null, updated_at: new Date().toISOString() })
      .eq("id", id)
      .eq("user_id", user.id)
      .select("id, user_id, title, content, mood_tag, created_at, updated_at")
      .maybeSingle()

    if (error) {
      console.error("Journal update failed", error.code)
      return NextResponse.json({ error: "Failed to update entry" }, { status: 500 })
    }
    if (!data) return NextResponse.json({ error: "Entry not found" }, { status: 404 })
    return NextResponse.json({ success: true, entry: data })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { supabase, user } = await getAuthenticatedSupabase()
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 })

  const { id } = await params
  const { data, error } = await supabase
    .from("journal_entries")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)
    .select("id")
    .maybeSingle()

  if (error) {
    console.error("Journal delete failed", error.code)
    return NextResponse.json({ error: "Failed to delete entry" }, { status: 500 })
  }
  if (!data) return NextResponse.json({ error: "Entry not found" }, { status: 404 })
  return NextResponse.json({ success: true })
}
