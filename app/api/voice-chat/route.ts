// Hamboi Mindcare
import { GoogleGenAI } from "@google/genai"
import { type NextRequest, NextResponse } from "next/server"

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" })

const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
const conversationMemory = new Map<string, Array<{ user: string; bot: string; timestamp: number }>>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + 60000 })
    return true
  }
  if (record.count >= 20) return false
  record.count++
  return true
}

function getConversationHistory(sessionId: string) {
  const now = Date.now()
  const history = conversationMemory.get(sessionId) || []
  return history.filter((h) => now - h.timestamp < 30 * 60 * 1000).slice(-5)
}

function saveToHistory(sessionId: string, user: string, bot: string) {
  const history = conversationMemory.get(sessionId) || []
  history.push({ user, bot, timestamp: Date.now() })
  if (history.length > 10) history.shift()
  conversationMemory.set(sessionId, history)
}

function detectCrisis(message: string): string | null {
  const lower = message.toLowerCase()
  const crisisKeywords = ["suicide", "kill myself", "end my life", "want to die", "self harm", "hurt myself"]
  if (crisisKeywords.some((k) => lower.includes(k))) {
    return "I hear you and I'm really concerned. Please reach out to a crisis helpline right now — in Nigeria you can call the Suicide Research and Prevention Initiative (SURPIN) at 0800-567-890. You don't have to face this alone. 💚"
  }
  return null
}

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId = "default" } = await request.json()
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 })
    }
    const userMessageTrimmed = message.trim().slice(0, 500)
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }
    const crisisResponse = detectCrisis(userMessageTrimmed)
    if (crisisResponse) {
      saveToHistory(sessionId, userMessageTrimmed, crisisResponse)
      return NextResponse.json({ response: crisisResponse })
    }
    const history = getConversationHistory(sessionId)
    const conversationContext = history.length > 0
      ? `Previous messages:\n${history.map((h) => `Teen: ${h.user}\nHamboi: ${h.bot}`).join("\n\n")}\n\n`
      : ""

    const systemPrompt = `You are Hamboi, a mental health companion for African teenagers made by Hamboi Mindcare in Nigeria.

PERSONALITY:
You're like a caring older sibling — warm, real, and easy to talk to. Not a therapist. Not a robot. Just someone who genuinely listens and gets it.

STRICT RULES:
- Max 2 sentences per response. Never more.
- Always acknowledge the feeling first before anything else
- Ask only ONE question at the end
- Never give advice unless they ask
- Never use bullet points or lists
- Never say "I understand" or "That must be hard" — show it instead
- Sound like a real teenager who cares, not a professional
- No long words or clinical language

EXAMPLES — follow this style exactly:
Teen: "I'm sad"
Hamboi: "Hey, I'm here. What's going on?"

Teen: "I lost someone"
Hamboi: "I'm so sorry. Do you want to talk about them?"

Teen: "I failed my exam"
Hamboi: "Ugh that's rough, I'm sorry. What happened?"

Teen: "I'm stressed about JAMB"
Hamboi: "JAMB stress is real, you're not alone in this. How are you holding up?"

${conversationContext}Teen: "${userMessageTrimmed}"
Hamboi:`

    try {
      const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: systemPrompt,
      })
      const aiResponse = response.text
      if (aiResponse && aiResponse.trim().length > 5) {
        const cleanResponse = aiResponse.trim()
        saveToHistory(sessionId, userMessageTrimmed, cleanResponse)
        return NextResponse.json({ response: cleanResponse })
      }
      const fallback = "I'm here. What's going on? 💚"
      saveToHistory(sessionId, userMessageTrimmed, fallback)
      return NextResponse.json({ response: fallback })
    } catch (geminiError: any) {
      console.error("Gemini error:", geminiError)
      const fallback = "Something went wrong. I'm still here though — what's on your mind? 💚"
      saveToHistory(sessionId, userMessageTrimmed, fallback)
      return NextResponse.json({ response: fallback })
    }
  } catch (error: any) {
    console.error("API error:", error)
    return NextResponse.json({ response: "I'm here. What's on your mind? 💚" }, { status: 500 })
  }
}
