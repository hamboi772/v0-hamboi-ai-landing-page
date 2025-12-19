import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 })
    }

    const supabase = await createClient()

    const { error: dbError } = await supabase.from("waitlist").insert({
      email: email.toLowerCase().trim(),
      source: "landing_page",
    })

    if (dbError) {
      // Check for unique constraint violation (email already exists)
      if (dbError.code === "23505") {
        return NextResponse.json({
          success: true,
          message: "You're already on the list! We'll be in touch soon.",
        })
      }
      throw dbError
    }

    return NextResponse.json({
      success: true,
      message: "Thanks for joining! We'll notify you when new features launch.",
    })
  } catch (error) {
    console.error("Waitlist error:", error)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}
