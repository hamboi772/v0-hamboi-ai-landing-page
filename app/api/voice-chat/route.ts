
import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

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
  return history.filter((item) => now - item.timestamp < 1800000)
}

function saveToHistory(sessionId: string, userMsg: string, botResponse: string) {
  const history = getConversationHistory(sessionId)
  history.push({ user: userMsg, bot: botResponse, timestamp: Date.now() })
  if (history.length > 5) history.shift()
  conversationMemory.set(sessionId, history)
}

function detectCrisis(input: string): string | null {
  const msg = input.toLowerCase()
  if (
    /\b(suicid|kill\s*(myself|me)|want\s*to\s*die|end\s*(my\s*life|it\s*all)|self.?harm|hurt\s*myself|no\s*reason\s*to\s*live|better\s*off\s*dead)\b/.test(msg)
  ) {
    return "I'm really glad you told me this. Please call the NCCF crisis line right now: 08062106493. You matter, and real people are there to help. 💚"
  }
  return null
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const userMessage = body.message
    const sessionId = body.sessionId || "default"

    if (!userMessage || typeof userMessage !== "string" || userMessage.trim() === "") {
      return NextResponse.json(
        { response: "I didn't catch that. Can you try again? 💚" },
        { status: 400 }
      )
    }

    const userMessageTrimmed = userMessage.trim()

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

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const systemPrompt = `You are Hamboi, a mental health companion for African teenagers made by Hamboi Mindcare in Nigeria.

PERSONALITY:
You're like a caring older sibling — warm, real, and easy to talk to. Not a therapist. Not a robot. Just someone who genuinely listens and gets it.

STRICT RULES:
- Max 2 sentences per response. Never more.
- Always acknowledge the feeling first — before anything else
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

Teen: "nobody likes me"
Hamboi: "That feeling is so painful. What's been going on?"

Teen: "I'm angry"
Hamboi: "I hear you. What happened?"

Teen: "I'm fine"
Hamboi: "You sure? I'm here if something's on your mind."

${conversationContext}Teen: "${userMessageTrimmed}"
Hamboi:`

    try {
      const result = await model.generateContent({contents:[{role:"user",parts:[{text:systemPrompt}]}]})
      const response = await result.response
      const aiResponse = response.text()

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
    return NextResponse.json(
      { response: "I'm here. What's on your mind? 💚" },
      { status: 500 }
    )
  }
}
