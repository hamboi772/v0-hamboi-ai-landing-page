import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { data, error } = await supabase
    .from("messages")
    .select("id, role, content, created_at")
    .eq("conversation_id", id)
    .order("created_at", { ascending: true })
  if (error) return NextResponse.json({ error: "Could not load chat" }, { status: 500 })
  return NextResponse.json({ messages: data ?? [] })
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const body = await request.json().catch(() => ({}))
  const title = typeof body.title === "string" ? body.title.trim().slice(0, 80) : ""
  if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 })

  const { data, error } = await supabase
    .from("conversations")
    .update({ title })
    .eq("id", id)
    .eq("user_id", user.id)
    .select("id, title, created_at, updated_at")
    .single()
  if (error) return NextResponse.json({ error: "Could not rename chat" }, { status: 500 })
  return NextResponse.json({ conversation: data })
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { error } = await supabase.from("conversations").delete().eq("id", id).eq("user_id", user.id)
  if (error) return NextResponse.json({ error: "Could not delete chat" }, { status: 500 })
  return NextResponse.json({ success: true })
}
