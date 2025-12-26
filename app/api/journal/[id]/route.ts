import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, content, mood_tag } = body

    const supabase = await createClient()

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

    if (error) throw error

    return NextResponse.json({ success: true, entry: data })
  } catch (error) {
    console.error("Update journal error:", error)
    return NextResponse.json({ error: "Failed to update journal entry" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { error } = await supabase.from("journal_entries").delete().eq("id", id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete journal error:", error)
    return NextResponse.json({ error: "Failed to delete journal entry" }, { status: 500 })
  }
}
