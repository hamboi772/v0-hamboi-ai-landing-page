import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    const body = await request.json()
    const { user_id, title, content, mood_tag } = body

    const { data, error } = await supabase
      .from("journal_entries")
      .insert({ user_id, title, content, mood_tag: mood_tag || null })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, entry: data })
  } catch (error) {
    console.error("Journal error:", error)
    return NextResponse.json({ error: "Failed to save entry" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    const { searchParams } = new URL(request.url)
    const user_id = searchParams.get("user_id")

    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ success: true, entries: data || [] })
  } catch (error) {
    console.error("Fetch journal error:", error)
    return NextResponse.json({ error: "Failed to fetch entries" }, { status: 500 })
  }
}
