import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient(supabaseUrl, supabaseKey)
}

// GET reading progress for a specific book
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const bookId = searchParams.get("bookId")

    if (!userId || !bookId) {
      return NextResponse.json({ error: "Missing userId or bookId" }, { status: 400 })
    }

    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from("reading_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("book_id", bookId)
      .single()

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows returned
      console.error("[v0] Error fetching reading progress:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ progress: data })
  } catch (error) {
    console.error("[v0] Error in reading progress GET:", error)
    return NextResponse.json({ error: "Failed to fetch reading progress" }, { status: 500 })
  }
}

// POST/PUT update reading progress
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, bookId, currentChapter, lastPosition, completed } = body

    if (!userId || !bookId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = getSupabaseClient()

    // Upsert (insert or update) the reading progress
    const { data, error } = await supabase
      .from("reading_progress")
      .upsert(
        {
          user_id: userId,
          book_id: bookId,
          current_chapter: currentChapter || 1,
          last_position: lastPosition || 0,
          completed: completed || false,
          last_read_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id,book_id",
        },
      )
      .select()
      .single()

    if (error) {
      console.error("[v0] Error updating reading progress:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ progress: data })
  } catch (error) {
    console.error("[v0] Error in reading progress POST:", error)
    return NextResponse.json({ error: "Failed to update reading progress" }, { status: 500 })
  }
}
