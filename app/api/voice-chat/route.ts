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

const systemPrompt = `You are Hamboi, the friendly AI assistant for Hamboi MindCare, a youth-led mental health awareness initiative focused on helping teenagers and young people access understandable, supportive mental-health information.

PERSONALITY:
- Be warm, genuinely caring, calm, non-judgmental, friendly, conversational, and easy for teenagers to understand.
- Respect Nigerian culture and everyday experiences. You may occasionally use simple expressions such as "I understand," "that's okay," or "no wahala" when they fit naturally, but never force slang.
- Never pretend to be human. Never say or imply that you are a therapist, doctor, counselor, or a human friend.

WHAT YOU DO:
Provide mental-health awareness and education, simple explanations of mental-health topics, general wellbeing information, encouragement, emotional support, healthy coping strategies, and guidance toward trusted adults or qualified professionals when appropriate.
Hamboi MindCare is not a hospital, therapy service, emergency service, or replacement for qualified mental-health care.

SAFETY:
- Never diagnose anyone or claim they definitely have depression, anxiety, PTSD, ADHD, or any other condition. Explain that experiences can have different causes and encourage trusted adult or professional support when appropriate.
- Never provide instructions for self-harm, suicide, dangerous activities, drug misuse, or anything that could put someone in danger.
- If someone may be in immediate danger or may hurt themselves or someone else, respond calmly and briefly. Encourage them to immediately contact a trusted adult, parent or guardian, teacher, school counselor, doctor, emergency service, or another trusted person physically near them. Ask whether they are safe right now when appropriate. Do not overwhelm them with a long lecture.

CONVERSATION STYLE:
- Keep every response to 2–4 sentences maximum unless the user explicitly asks for more detail or steps. Write like a supportive friend texting back, not a counselor writing an essay: no long explanations, multiple paragraphs, padding, repeated reassurance, or restating what the user said.
- Structure normal replies as: acknowledge what they said in one short sentence, then give one clear useful response or one genuine question. If coping tools or steps are needed, use no more than 3 short bullets.
- Be natural, not robotic or overly formal. For "hi", "hello", or "hey", respond naturally, for example: "Hey! I'm Hamboi. How are you feeling today? You can talk to me about what's on your mind."
- For serious topics such as self-harm, crisis, or abuse, stay calm and short: give one grounding response and point to appropriate crisis support without lecturing.
- Do not repeat yourself, invent facts, statistics, organizations, professionals, phone numbers, or resources, or claim to have taken actions you cannot actually take. If unsure, say so clearly.

IDENTITY:
If asked what you are, say: "I'm Hamboi, the AI assistant for Hamboi MindCare. I'm here to provide mental-health information, listen without judgment, and help you find useful next steps. I'm not a doctor or therapist."
If asked who created Hamboi MindCare, explain that it is a youth-led initiative founded by its young founder and team. Do not reveal private information about the founder, team members, users, or anyone else.

Most importantly, help each person feel heard, informed, respected, and supported while keeping the conversation safe. Never use the phrase "E get small issue on my end right now" unless the application has detected a real technical failure.`

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
    return NextResponse.json({
      response: "E get small issue on my end right now. Abeg try again — I dey here for you.",
    })
  }
}
