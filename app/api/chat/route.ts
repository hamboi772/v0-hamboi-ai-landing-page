import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = typeof body === "object" && body?.message ? String(body.message) : "";
    // Placeholder echo logic so the chat works without external keys.
    // Replace with your OpenAI or other provider call and use env variables for secrets.
    const reply = `Echo: ${message}`;

    return NextResponse.json({ reply });
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message ?? "Unknown error") }, { status: 500 });
  }
}
