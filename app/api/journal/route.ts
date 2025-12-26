import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user_id, title, content, mood_tag } = body

    if (!user_id || !title || !content) {
      return NextResponse.json({ error: "User ID, title, and content required" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from("journal_entries")
      .insert({
        user_id,
        title,
        content,
        mood_tag: mood_tag || null,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, entry: data })
  } catch (error) {
    console.error("Journal entry error:", error)
    return NextResponse.json({ error: "Failed to save journal entry" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const user_id = searchParams.get("user_id")

    if (!user_id) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ success: true, entries: data || [] })
  } catch (error) {
    console.error("Fetch journal error:", error)
    return NextResponse.json({ error: "Failed to fetch journal entries" }, { status: 500 })
  }
}
