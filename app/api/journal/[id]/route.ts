import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function getSupabaseClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = getSupabaseClient()
    const { id } = await params
    const body = await request.json()
    const { title, content, mood_tag } = body

    console.log("[v0] Updating journal entry:", id)

    const { data, error } = await supabase
      .from("journal_entries")
      .update({
        title,
        content,
        mood_tag,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("[v0] Journal update error:", error)
      throw error
    }

    console.log("[v0] Journal entry updated successfully")
    return NextResponse.json({ success: true, entry: data })
  } catch (error) {
    console.error("[v0] Update journal error:", error)
    return NextResponse.json({ error: "Failed to update journal entry" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = getSupabaseClient()
    const { id } = await params

    console.log("[v0] Deleting journal entry:", id)

    const { error } = await supabase.from("journal_entries").delete().eq("id", id)

    if (error) {
      console.error("[v0] Journal delete error:", error)
      throw error
    }

    console.log("[v0] Journal entry deleted successfully")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Delete journal error:", error)
    return NextResponse.json({ error: "Failed to delete journal entry" }, { status: 500 })
  }
}
