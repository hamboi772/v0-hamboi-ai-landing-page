import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function getSupabaseClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient()
    const body = await request.json()
    const { user_id, title, content, mood_tag } = body

    console.log("[v0] Creating journal entry:", { user_id, title_length: title?.length })

    if (!user_id || !title || !content) {
      return NextResponse.json({ error: "User ID, title, and content required" }, { status: 400 })
    }

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

    if (error) {
      console.error("[v0] Journal insert error:", error)
      throw error
    }

    console.log("[v0] Journal entry created successfully")
    return NextResponse.json({ success: true, entry: data })
  } catch (error) {
    console.error("[v0] Journal entry error:", error)
    return NextResponse.json({ error: "Failed to save journal entry" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient()
    const { searchParams } = new URL(request.url)
    const user_id = searchParams.get("user_id")

    console.log("[v0] Fetching journal entries for user:", user_id)

    if (!user_id) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Journal fetch error:", error)
      throw error
    }

    console.log("[v0] Fetched journal entries:", data?.length || 0)
    return NextResponse.json({ success: true, entries: data || [] })
  } catch (error) {
    console.error("[v0] Fetch journal error:", error)
    return NextResponse.json({ error: "Failed to fetch journal entries" }, { status: 500 })
  }
}
