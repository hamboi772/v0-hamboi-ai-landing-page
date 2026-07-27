import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables")
}

// Helper: Generate title from first user message (max 40 chars)
function generateTitleFromMessage(content: string): string {
  const maxLength = 40
  return content.length > maxLength ? content.substring(0, maxLength) + "..." : content
}

// POST: Add a message to a conversation
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get("Authorization")
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabaseAuth = createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: {
          Authorization: authHeader,
        },
      },
    })

    const {
      data: { user },
      error: userError,
    } = await supabaseAuth.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { role, content } = body

    if (!role || !content || typeof content !== "string") {
      return NextResponse.json({ error: "Missing role or content" }, { status: 400 })
    }

    if (!["user", "assistant"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }

    // Verify the conversation belongs to this user
    const { data: conversation, error: convError } = await supabaseAuth
      .from("conversations")
      .select("id, title")
      .eq("id", params.id)
      .single()

    if (convError || !conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 })
    }

    // If this is the first user message, generate a title
    let shouldUpdateTitle = false
    if (role === "user" && conversation.title === "New Conversation") {
      shouldUpdateTitle = true
    }

    // Insert the message
    const { data: message, error: msgError } = await supabaseAuth
      .from("messages")
      .insert({
        conversation_id: params.id,
        role,
        content,
      })
      .select()
      .single()

    if (msgError) {
      return NextResponse.json({ error: msgError.message }, { status: 500 })
    }

    // If this was the first user message, update the conversation title
    if (shouldUpdateTitle) {
      const title = generateTitleFromMessage(content)
      await supabaseAuth
        .from("conversations")
        .update({
          title,
          updated_at: new Date().toISOString(),
        })
        .eq("id", params.id)
    } else {
      // Update the conversation's updated_at timestamp
      await supabaseAuth
        .from("conversations")
        .update({
          updated_at: new Date().toISOString(),
        })
        .eq("id", params.id)
    }

    return NextResponse.json({ message })
  } catch (error: any) {
    console.error("[v0] Message creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
