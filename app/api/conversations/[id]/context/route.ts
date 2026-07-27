import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables")
}

// Helper: Summarize early messages (for cost control when >30 messages)
function summarizeEarlyMessages(messages: any[]): string {
  if (messages.length === 0) return ""

  const userMessages = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .slice(0, 5)
    .join(" | ")

  return `Earlier in our conversation, the user mentioned: ${userMessages.substring(0, 200)}...`
}

// GET: Fetch conversation context (last ~20 messages) for AI
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Verify conversation belongs to user
    const { data: conversation, error: convError } = await supabaseAuth
      .from("conversations")
      .select("id")
      .eq("id", params.id)
      .single()

    if (convError || !conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 })
    }

    // Fetch all messages to check total count
    const { data: allMessages, error: allMsgError } = await supabaseAuth
      .from("messages")
      .select("id, role, content, created_at")
      .eq("conversation_id", params.id)
      .order("created_at", { ascending: true })

    if (allMsgError) {
      return NextResponse.json({ error: allMsgError.message }, { status: 500 })
    }

    let contextMessages = allMessages || []

    // If more than 30 messages, include a summary of early ones + last 20
    if (contextMessages.length > 30) {
      const earlyMessages = contextMessages.slice(0, contextMessages.length - 20)
      const recentMessages = contextMessages.slice(-20)

      const summary = summarizeEarlyMessages(earlyMessages)
      contextMessages = [
        {
          id: "summary",
          role: "system",
          content: summary,
          created_at: new Date().toISOString(),
        },
        ...recentMessages,
      ]
    } else {
      // Otherwise, send all messages (limited to 20 most recent for safety)
      contextMessages = contextMessages.slice(-20)
    }

    return NextResponse.json({ messages: contextMessages })
  } catch (error: any) {
    console.error("[v0] Context fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
