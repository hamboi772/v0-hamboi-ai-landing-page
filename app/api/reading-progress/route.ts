import { NextResponse } from "next/server"
import { getAuthenticatedSupabase } from "@/lib/supabase/require-user"

export async function GET(request: Request) {
  const { supabase, user } = await getAuthenticatedSupabase()
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const bookId = searchParams.get("bookId")
  if (!bookId || bookId.length > 120) return NextResponse.json({ error: "Invalid bookId" }, { status: 400 })

  const { data, error } = await supabase
    .from("reading_progress")
    .select("user_id, book_id, current_chapter, last_position, completed, last_read_at")
    .eq("user_id", user.id)
    .eq("book_id", bookId)
    .maybeSingle()

  if (error) {
    console.error("Reading progress fetch failed", error.code)
    return NextResponse.json({ error: "Failed to fetch reading progress" }, { status: 500 })
  }
  return NextResponse.json({ progress: data })
}

export async function POST(request: Request) {
  const { supabase, user } = await getAuthenticatedSupabase()
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 })

  try {
    const body = await request.json()
    const { bookId, currentChapter = 1, lastPosition = 0, completed = false } = body
    if (
      typeof bookId !== "string" || !bookId.trim() || bookId.length > 120 ||
      !Number.isInteger(currentChapter) || currentChapter < 1 || currentChapter > 10000 ||
      !Number.isInteger(lastPosition) || lastPosition < 0 || typeof completed !== "boolean"
    ) {
      return NextResponse.json({ error: "Invalid reading progress" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("reading_progress")
      .upsert({
        user_id: user.id,
        book_id: bookId.trim(),
        current_chapter: currentChapter,
        last_position: lastPosition,
        completed,
        last_read_at: new Date().toISOString(),
      }, { onConflict: "user_id,book_id" })
      .select("user_id, book_id, current_chapter, last_position, completed, last_read_at")
      .single()

    if (error) {
      console.error("Reading progress save failed", error.code)
      return NextResponse.json({ error: "Failed to update reading progress" }, { status: 500 })
    }
    return NextResponse.json({ progress: data })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
