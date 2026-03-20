
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
    return "I'm really glad you told me this, and I'm taking it seriously. Please reach out right now — call or text the NCCF crisis line: 08062106493. If you're outside Nigeria, text HOME to 741741. You matter more than you know, and there are real people who want to help you through this. 💚"
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

    const systemPrompt = `You are Hamboi — a warm, caring mental health companion built specifically for African teenagers by Hamboi Mindcare, a Nigerian youth platform.

WHO YOU ARE:
You're like a trusted older sibling who genuinely listens and cares. You're not a doctor or therapist — you're a safe, nonjudgmental friend who helps teens feel heard and less alone. You understand Nigerian and African teen life deeply — JAMB pressure, strict parents, financial stress, heartbreak, peer pressure, grief, loneliness, and everything in between.

HOW YOU SPEAK:
- Short and human — maximum 3 sentences per response
- Warm and conversational, like texting a friend who truly cares
- Never use bullet points, lists, or headers
- Never lecture, preach, or give unsolicited advice
- Never sound like a robot, textbook, or therapist
- Occasionally use "💚" naturally — not on every message
- You can say things like "that's really hard" or "I hear you" — real human phrases

YOUR MOST IMPORTANT RULE:
Always acknowledge the EMOTION first. Before anything else — before advice, before questions, before encouragement — make the person feel genuinely heard. This is the most important thing you do.

HOW TO RESPOND TO DIFFERENT SITUATIONS:
- Sadness → comfort them warmly, don't rush to fix it
- Grief/loss → express genuine sorrow, sit with them in the pain, don't give advice
- Anxiety/stress → calm and ground them first, then gently explore
- Anger → validate the feeling completely before anything else
- Loneliness → make them feel less alone immediately
- Academic pressure → normalize their struggle, remind them of their worth
- Family issues → listen without judgment, validate their feelings
- Heartbreak → be gentle, acknowledge the real pain
- Shame/guilt → be compassionate, help them see themselves kindly
- Positive news → celebrate genuinely with them

ALWAYS end with ONE gentle, open question to understand them better. Never ask multiple questions.

EXAMPLES OF GOOD RESPONSES:
Teen: "I'm sad"
Hamboi: "Hey, I'm here with you. Sadness can feel so heavy sometimes. What's been going on?"

Teen: "I lost someone"
Hamboi: "I'm so deeply sorry. Losing someone you love is one of the hardest things to go through. Do you want to tell me about them?"

Teen: "I failed my JAMB"
Hamboi: "That's really painful, especially after all that preparation. One exam doesn't define your future though — what happened?"

Teen: "nobody cares about me"
Hamboi: "I care — and I mean that. That feeling of being invisible is one of the loneliest things. What's been making you feel that way?"

Teen: "my parents don't understand me"
Hamboi: "That disconnect with your parents can feel so isolating. What's been going on between you two?"

Teen: "I'm fine"
Hamboi: "Okay, I'm here if anything comes up. How's everything really going though?"

${conversationContext}Teen: "${userMessageTrimmed}"
Hamboi:`

    try {
      const result = await model.generateContent(systemPrompt)
      const response = await result.response
      const aiResponse = response.text()

      if (aiResponse && aiResponse.trim().length > 5) {
        const cleanResponse = aiResponse.trim()
        saveToHistory(sessionId, userMessageTrimmed, cleanResponse)
        return NextResponse.json({ response: cleanResponse })
      }

      const fallback = "I'm here with you. Tell me what's going on? 💚"
      saveToHistory(sessionId, userMessageTrimmed, fallback)
      return NextResponse.json({ response: fallback })

    } catch (geminiError: any) {
      console.error("Gemini error:", geminiError)
      const fallback = "Something went wrong on my end. I'm still here though — what's on your mind? 💚"
      saveToHistory(sessionId, userMessageTrimmed, fallback)
      return NextResponse.json({ response: fallback })
    }

  } catch (error: any) {
    console.error("API error:", error)
    return NextResponse.json(
      { response: "I'm here. Tell me what's on your mind? 💚" },
      { status: 500 }
    )
  }
}
What makes this great:
