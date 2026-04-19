import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "",
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const user_id = searchParams.get("user_id")

    if (!user_id) {
      return NextResponse.json({ error: "Missing user_id parameter" }, { status: 400 })
    }

    // Get all unique sessions for a user, with the first message as preview
    const { data, error } = await supabase
      .from("chat_messages")
      .select("session_id, content, created_at")
      .eq("user_id", user_id)
      .eq("role", "user")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Group by session_id and get the most recent message and timestamp for each
    const sessions = new Map<string, { session_id: string; preview: string; created_at: string }>()

    data.forEach((msg: any) => {
      if (!sessions.has(msg.session_id)) {
        sessions.set(msg.session_id, {
          session_id: msg.session_id,
          preview: msg.content.substring(0, 50) + (msg.content.length > 50 ? "..." : ""),
          created_at: msg.created_at,
        })
      }
    })

    // Convert to array and sort by creation date (newest first)
    const sessionsList = Array.from(sessions.values()).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )

    return NextResponse.json({ data: sessionsList })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
