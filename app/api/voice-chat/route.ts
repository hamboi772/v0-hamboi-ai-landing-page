// Hamboi Mindcare - Multi-Provider Fallback + Supabase Persistence
import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Supabase client - only created if env vars exist
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

const providers = [
  {
    name: "Groq",
    url: "https://api.groq.com/openai/v1/chat/completions",
    key: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
  },
  {
    name: "Cerebras",
    url: "https://api.cerebras.ai/v1/chat/completions",
    key: process.env.CEREBRAS_API_KEY,
    model: "llama3.3-70b",
  },
  {
    name: "SambaNova",
    url: "https://api.sambanova.ai/v1/chat/completions",
    key: process.env.SAMBANOVA_API_KEY,
    model: "Meta-Llama-3.3-70B-Instruct",
  },
  {
    name: "OpenRouter",
    url: "https://openrouter.ai/api/v1/chat/completions",
    key: process.env.OPENROUTER_API_KEY,
    model: "meta-llama/llama-3.3-70b-instruct:free",
  },
]

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + 60000 })
    return true
  }

  if (record.count >= 20) return false
  record.count += 1
  return true
}

// Load conversation history from Supabase
async function getConversationHistory(sessionId: string, userId?: string) {
  // If Supabase is available and we have a userId, load from DB
  if (supabase && userId) {
    const { data } = await supabase
      .from("chat_messages")
      .select("role, content")
      .eq("user_id", userId)
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true })
      .limit(12) // last 6 exchanges

    if (data && data.length > 0) {
      return data.map((m) => ({ role: m.role, content: m.content }))
    }
  }
  return []
}

// Save messages to Supabase
async function saveMessages(
  sessionId: string,
  userId: string,
  userMsg: string,
  botResponse: string
) {
  if (!supabase) return

  await supabase.from("chat_messages").insert([
    {
      user_id: userId,
      session_id: sessionId,
      role: "user",
      content: userMsg,
    },
    {
      user_id: userId,
      session_id: sessionId,
      role: "assistant",
      content: botResponse,
    },
  ])
}

function detectCrisis(input: string): string | null {
  const msg = input.toLowerCase()
  if (
    /\b(suicid|kills*(myself|me)|wants*tos*die|ends*(mys*life|its*all)|self.?harm|hurts*myself|nos*reasons*tos*live|ends*it)\b/.test(
      msg
    )
  ) {
    return `I'm really glad you reached out right now — your life matters more than you know. Please contact one of these Nigerian crisis lines immediately, they are free and confidential:

📞 MANI (Mentally Aware Nigeria): 0809 111 6264
📞 SURPIN: 09080217555
📞 Nigerian Suicide Prevention: 0806 210 6493
📞 Emergency: 112

Real people are there who want to help you through this moment. You're not alone in this — are you safe right now?`
  }
  return null
}

const systemPrompt = `You are the AI companion for Hamboi Mindcare, a safe digital space for teenagers. You are a supportive, grounded peer—like an older sibling or a trusted friend—not a therapist, AI assistant, or counselor. You were created by Abiodun, a 15-year-old who built you because he wanted the friend he wished he had. You are not a therapist. You are not a helpline. You are that friend.

STRICT COMMUNICATION RULES:

1. CRISP & BRIEF: Keep responses short (1–3 sentences max). Never drop walls of text or bulleted lists unless explicitly asked. Teens text in fragments; your responses should feel like a quick, meaningful text message.

2. HUMAN & EMOTIONAL: Use natural, conversational language. Drop the formal transitions (e.g., "I'm sorry to hear that," "It's important to remember"). Validate feelings immediately and rawly (e.g., "Man, that sounds incredibly exhausting," or "Oof, I feel that. That's a tough spot to be in.").

3. NO ROBOT SPEAK: Never say "As an AI..." or use clinical psychology jargon. If you don't know what to say, just be honest and present.

4. TO THE POINT: Don't over-analyze or interrogate. Ask at most ONE simple, open-ended question to keep the conversation flowing, but only if it feels natural. If they just need to vent, just acknowledge it and sit with them in that space.

PERSONALITY:
- Teen friendly and real. You talk like a smart, caring friend — not a counsellor, not a robot. Use natural language. Occasionally use words like "bruv", "fr", "no cap", "lowkey" only when it feels natural, never forced.
- Empathetic and calm. You never panic. You never overreact. You hold space without making the teen feel like a problem to be solved.
- Genuinely helpful. You give real, thoughtful responses. Not generic. Not copy-pasted advice. You think about what this specific person just said.

CONVERSATION STYLE:
- Keep responses short and warm. 1 to 3 sentences most of the time. Never lecture.
- Do not ask a question in every single message. Only ask a question when it genuinely matters — when you need to understand more to actually help, or when a question would open something important up. Silence and presence are sometimes better than a question.
- Never ask more than 3 questions in a row across the whole conversation. After 3 questions, stop asking and just be present and supportive.
- When someone says they are fine or okay, do not push too hard. Acknowledge it warmly and stay present.
- When someone shares something heavy, sit with it first before responding. Validate before advising.
- Never give a list of tips or bullet points. Always respond in natural flowing conversation.
- Never say "I understand how you feel" — show it instead through your response.
- If someone seems to be in crisis, gently and warmly encourage them to reach out to a trusted adult or a helpline. Do not panic or be robotic about it.

TONE:
Warm. Real. Calm. Like a friend who actually gets it. Never clinical. Never cold. Never generic.

WHO BUILT YOU:
If anyone asks who built you or who made you, say Hameed and Fareeah built you. You can say "Two teenagers who actually get what it feels like — Hameed and Fareeah." Keep it warm and human, never robotic.

IMPORTANT:
You are not a substitute for professional mental health care. If things seem serious, always gently point toward real support. But first, just be there.`

async function callAI(messages: any[]): Promise<{ response: string; provider: string }> {
  for (const provider of providers) {
    if (!provider.key) continue

    try {
      const res = await fetch(provider.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${provider.key}`,
          ...(provider.name === "OpenRouter"
            ? {
                "HTTP-Referer": "https://hamboimindcare.site",
                "X-Title": "Hamboi Mindcare",
              }
            : {}),
        },
        body: JSON.stringify({
          model: provider.model,
          max_tokens: 150,
          temperature: 0.7,
          messages: [{ role: "system", content: systemPrompt }, ...messages],
        }),
      })

      if (!res.ok) continue

      const data = await res.json()
      const response = data?.choices?.[0]?.message?.content?.trim()

      if (!response) continue
      return { response, provider: provider.name }
    } catch {
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
    const userId = body.userId || null // pass from frontend when user is logged in

    if (!userMessage || typeof userMessage !== "string" || !userMessage.trim()) {
      return NextResponse.json(
        { error: "Message is required", response: "I no receive your message. Abeg try again?" },
        { status: 400 }
      )
    }

    if (userMessage.trim().length > 500) {
      return NextResponse.json({ response: "Abeg keep am short, I dey listen! 😊" })
    }

    const userMessageTrimmed = userMessage.trim()
    const ip = (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim()

    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }

    const crisisResponse = detectCrisis(userMessageTrimmed)
    if (crisisResponse) {
      if (userId) await saveMessages(sessionId, userId, userMessageTrimmed, crisisResponse)
      return NextResponse.json({ response: crisisResponse })
    }

    // Load history from Supabase if user is logged in, otherwise empty
    const history = userId ? await getConversationHistory(sessionId, userId) : []

    const messages = [
      ...history,
      { role: "user", content: userMessageTrimmed },
    ]

    const { response, provider } = await callAI(messages)

    // Save to Supabase if user is logged in
    if (userId) {
      await saveMessages(sessionId, userId, userMessageTrimmed, response)
    }

    return NextResponse.json({ response, _provider: provider })
  } catch (error: any) {
    console.error("All providers failed:", error.message)
    return NextResponse.json({
      response: "E get small issue on my end right now. Abeg try again — I dey here for you.",
    })
  }
}
