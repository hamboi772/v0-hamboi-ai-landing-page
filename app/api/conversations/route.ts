import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { data, error } = await supabase
    .from("conversations")
    .select("id, title, created_at, updated_at")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })

  if (error) return NextResponse.json({ error: "Could not load chats" }, { status: 500 })
  return NextResponse.json({ conversations: data ?? [] })
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await request.json().catch(() => ({}))
  const title = typeof body.title === "string" && body.title.trim() ? body.title.trim().slice(0, 80) : "New chat"
  const messages = Array.isArray(body.messages) ? body.messages : []

  const { data: conversation, error } = await supabase
    .from("conversations")
    .insert({ user_id: user.id, title })
    .select("id, title, created_at, updated_at")
    .single()

  if (error || !conversation) return NextResponse.json({ error: "Could not create chat" }, { status: 500 })

  const safeMessages = messages
    .filter((message: unknown): message is { user: string; ai: string } => {
      if (!message || typeof message !== "object") return false
      const item = message as { user?: unknown; ai?: unknown }
      return typeof item.user === "string" && typeof item.ai === "string" && item.user.trim() && item.ai.trim()
    })
    .slice(0, 100)
    .flatMap((message) => [
      { conversation_id: conversation.id, role: "user", content: message.user.slice(0, 1000) },
      { conversation_id: conversation.id, role: "assistant", content: message.ai.slice(0, 4000) },
    ])

  if (safeMessages.length) {
    const { error: messagesError } = await supabase.from("messages").insert(safeMessages)
    if (messagesError) return NextResponse.json({ error: "Could not save chat" }, { status: 500 })
  }

  return NextResponse.json({ conversation })
}
