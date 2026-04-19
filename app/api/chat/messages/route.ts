import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "",
)

export async function POST(request: NextRequest) {
  try {
    const { user_id, session_id, role, content } = await request.json()

    if (!user_id || !session_id || !role || !content) {
      return NextResponse.json(
        { error: "Missing required fields: user_id, session_id, role, content" },
        { status: 400 },
      )
    }

    // Save message to Supabase
    const { data, error } = await supabase.from("chat_messages").insert([
      {
        user_id,
        session_id,
        role,
        content,
        created_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const session_id = searchParams.get("session_id")
    const user_id = searchParams.get("user_id")

    if (!session_id || !user_id) {
      return NextResponse.json(
        { error: "Missing required query parameters: session_id, user_id" },
        { status: 400 },
      )
    }

    // Fetch messages for a specific session
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("session_id", session_id)
      .eq("user_id", user_id)
      .order("created_at", { ascending: true })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
