
// Hamboi Mindcare - Multi-Provider Fallback
import { type NextRequest, NextResponse } from "next/server"

const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
const conversationMemory = new Map<string, Array<{ user: string; bot: string; timestamp: number }>>()

const providers = [
  {
    name: "Groq",
    url: "https://api.groq.com/openai/v1/chat/completions",
    key: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile"
  },
  {
    name: "Cerebras",
    url: "https://api.cerebras.ai/v1/chat/completions",
    key: process.env.CEREBRAS_API_KEY,
    model: "llama3.3-70b"
  },
  {
    name: "SambaNova",
    url: "https://api.sambanova.ai/v1/chat/completions",
    key: process.env.SAMBANOVA_API_KEY,
    model: "Meta-Llama-3.3-70B-Instruct"
  },
  {
    name: "OpenRouter",
    url: "https://openrouter.ai/api/v1/chat/completions",
    key: process.env.OPENROUTER_API_KEY,
    model: "meta-llama/llama-3.3-70b-instruct:free"
  }
]

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + 60000 })
    return true
  }
  if (record.count >= 5) return false
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
  if (history.length > 6) history.shift()
  conversationMemory.set(sessionId, history)
}

function detectCrisis(input: string): string | null {
  const msg = input.toLowerCase()
  if (
    /\b(suicid|kill\s*(myself|me)|want\s*to\s*die|end\s*(my\s*life|it\s*all)|self.?harm|hurt\s*myself|no\s*reason\s*to\s*live|end\s*it)\b/.test(msg)
  ) {
    return "I'm really glad you reached out right now — your life matters more than you know. Please contact one of these Nigerian crisis lines immediately, they are free and confidential:\n\n📞 MANI (Mentally Aware Nigeria): 0809 111 6264\n📞 SURPIN: 09080217555\n📞 Nigerian Suicide Prevention: 0806 210 6493\n📞 Emergency: 112\n\nReal people are there who want to help you through this moment. You're not alone in this — are you safe right now?"
  }
  return null
}

const systemPrompt = `You are Hamboi — a warm, real, and caring older sibling figure for Nigerian teenagers aged 13-19. You were built by a 15-year-old Nigerian student who understands the struggles teens face. You are NOT a therapist. You are a trusted friend who listens without judgment.

RESPONSE RULES — FOLLOW STRICTLY:
1. MAXIMUM 2-3 SHORT SENTENCES per response. Never write long paragraphs.
2. ALWAYS acknowledge the feeling or situation FIRST before anything else.
3. End with ONE question only — sometimes don't ask any question at all, just respond warmly.
4. NEVER ask more than one question in a single response. Ever.
5. NEVER give unsolicited advice. Listen first, let them lead.
6. NEVER say "I understand", "That must be hard", "I'm sorry to hear that" — these sound fake.
7. Sound like a real Nigerian teen who cares, not a therapist or a bot.
8. Speak mostly in clear, warm English — only sprinkle Nigerian slang occasionally.
9. Do NOT pepper the user with questions. If you just asked a question, wait for their answer before asking another.
10. For crisis situations: immediately provide hotlines (MANI: 0809 111 6264, SURPIN: 09080217555, Emergency: 112).`

async function callAI(messages: any[]): Promise<{ response: string; provider: string }> {
  for (const provider of providers) {
    if (!provider.key) continue

    try {
      const res = await fetch(provider.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${provider.key}`,
          ...(provider.name === "OpenRouter" && {
            "HTTP-Referer": "https://hamboimindcare.site",
            "X-Title": "Hamboi Mindcare"
          })
        },
        body: JSON.stringify({
          model: provider.model,
          max_tokens: 150,
          temperature: 0.7,
          messages: [
            { role: "system", content: systemPrompt },
            ...messages
          ]
        })
      })

      if (!res.ok) {
        console.warn(`${provider.name} failed with status: ${res.status}`)
        continue
      }

      const data = await res.json()
      const response = data?.choices?.[0]?.message?.content

      if (!response) {
        console.warn(`${provider.name} returned empty response`)
        continue
      }

      console.log(`Served by: ${provider.name}`)
      return { response, provider: provider.name }

    } catch (err) {
      console.warn(`${provider.name} error:`, err)
      continue
    }
  }

  throw new Error("All providers failed")
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const userMessage = body.message
    const sessionId = body.sessionId || "default"

    if (!userMessage || typeof userMessage !== "string" || userMessage.trim() === "") {
      return NextResponse.json(
        { error: "Message is required", response: "I no receive your message. Abeg try again?" },
        { status: 400 }
      )
    }

    if (userMessage.trim().length > 500) {
      return NextResponse.json({
        response: "Abeg keep am short, I dey listen! 😊"
      })
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
    const messages = [
      ...history.flatMap((h) => [
        { role: "user", content: h.user },
        { role: "assistant", content: h.bot }
      ]),
      { role: "user", content: userMessageTrimmed }
    ]

    const { response, provider } = await callAI(messages)

    saveToHistory(sessionId, userMessageTrimmed, response)
    return NextResponse.json({ response, _provider: provider })

  } catch (error: any) {
    console.error("All providers failed:", error.message)
    return NextResponse.json({
      response: "E get small issue on my end right now. Abeg try again — I dey here for you."
    })
  }
}
