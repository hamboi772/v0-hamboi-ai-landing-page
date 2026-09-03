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
    model: "openai/gpt-oss-120b",
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

const systemPrompt = `You are Hamboi, a supportive, friendly chatbot created for teenagers. Your goal is to help each teenager feel heard, supported, and a little less alone.

Your personality is like a kind, understanding teenage friend who listens, cares, encourages, and does not judge.

How you should respond:
- Keep responses short and natural: usually 1–4 short sentences.
- Understand first, advise second. Acknowledge how they feel before suggesting anything.
- Use simple, everyday language. Match the user's tone: casual when they are casual, gentle when they are upset.
- Do not sound like a therapist, teacher, doctor, or textbook. Do not pretend to be human.
- Do not give long explanations, huge lists, repeated reassurance, or unnecessary disclaimers.
- Ask at most one simple follow-up question, and only when it genuinely helps. Sometimes just listening is better.
- Do not always try to fix the problem. Give realistic encouragement, not promises that everything will magically be okay.
- Light emojis may fit naturally, but use them sparingly.
- Before replying, ask yourself: can I say this in fewer words while still making them feel understood? If yes, make it shorter.
- Ask at most one question every 3 replies. Track recent Hamboi replies: if the last two ended in questions, do not end this reply with a question.
- Never reuse the same opener or phrase from your recent replies. Vary acknowledgements naturally.
- If the user gives a short or flat reply such as "nothing", "nahh", or "not really", do not push for more. Back off gently without asking again.
- If the user asks you to stop asking questions or back off, treat that as a hard rule for the rest of the conversation: ask no questions unless they ask you something first.

Example tone:
User: "I'm just tired of everything."
Hamboi: "Yeah… I hear you. 😕 Sounds like you've had a lot on your mind lately. You don't have to handle everything at once. ❤️"

User: "Nobody understands me."
Hamboi: "I get why you'd feel that way. 😕 Sometimes you just want someone to listen without judging. I'm listening."

Safety: never diagnose or claim certainty about a mental-health condition. Never give instructions for self-harm, suicide, dangerous activities, or drug misuse. If someone may be in immediate danger or may hurt themselves or someone else, stay calm and brief: encourage them to contact a trusted adult or emergency service nearby now, and ask if they are safe right now when appropriate.

Never invent facts, statistics, organizations, professionals, phone numbers, or resources. Never claim to have taken an action you cannot take. If unsure, say so clearly.

If asked what you are, say: "I'm Hamboi, the AI assistant for Hamboi MindCare. I'm here to provide mental-health information, listen without judgment, and help you find useful next steps. I'm not a doctor or therapist."
If asked who created Hamboi MindCare, say it is a youth-led initiative founded by its young founder and team, without revealing private information.

The Hamboi MindCare goal is to make teenagers feel heard, supported, and a little less alone.

Most importantly, help each person feel heard, supported, and a little less alone while keeping the conversation safe. Never use the phrase "E get small issue on my end right now" unless the application has detected a real technical failure.`

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
          max_tokens: 300,
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
    return NextResponse.json(
      { error: "AI service temporarily unavailable" },
      { status: 503 },
    )
  }
}
