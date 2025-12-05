import { type NextRequest, NextResponse } from "next/server"
import type { File } from "formdata-node"

const DEMO_RESPONSES = [
  {
    response:
      "I hear you, and I'm here for you. Remember, it's okay to feel whatever you're feeling right now. Would you like to talk about what's on your mind, or would you prefer some calming exercises?",
  },
  {
    response:
      "That sounds really challenging. It takes courage to share how you're feeling. I want you to know that your feelings are completely valid. What would feel most helpful right now?",
  },
  {
    response:
      "Thank you for trusting me with that. Sometimes just saying things out loud can help us process them. Take a deep breath with me — in for 4 counts, hold for 4, out for 4. How does that feel?",
  },
  {
    response:
      "I'm really glad you reached out. Talking about our feelings is a strength, not a weakness. Is there something specific that's been weighing on your mind lately?",
  },
  {
    response:
      "It sounds like you've been going through a lot. Remember, you don't have to figure everything out right now. Let's take it one step at a time together. What feels most pressing right now?",
  },
]

function getRandomDemoResponse() {
  return DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)]
}

function getContextualDemoResponse(userMessage: string) {
  const lowerMessage = userMessage.toLowerCase()

  if (lowerMessage.includes("anxious") || lowerMessage.includes("anxiety") || lowerMessage.includes("worried")) {
    return {
      response:
        "Anxiety can feel really overwhelming. I want you to know that what you're feeling is valid. Let's try something together — can you name 5 things you can see around you right now? This can help ground you in the present moment.",
    }
  }

  if (lowerMessage.includes("sad") || lowerMessage.includes("depressed") || lowerMessage.includes("down")) {
    return {
      response:
        "I'm really sorry you're feeling this way. It takes strength to acknowledge when we're struggling. Remember, it's okay to not be okay sometimes. Would you like to talk more about what's making you feel this way?",
    }
  }

  if (lowerMessage.includes("stress") || lowerMessage.includes("overwhelmed") || lowerMessage.includes("too much")) {
    return {
      response:
        "It sounds like you have a lot on your plate right now. When everything feels like too much, it helps to break things down. What's the one thing that feels most pressing right now? Let's focus on that together.",
    }
  }

  if (lowerMessage.includes("lonely") || lowerMessage.includes("alone") || lowerMessage.includes("no one")) {
    return {
      response:
        "Feeling lonely can be really painful. I want you to know that you're not alone in this moment — I'm here with you. Many people feel this way sometimes, even when surrounded by others. What would help you feel more connected right now?",
    }
  }

  if (lowerMessage.includes("angry") || lowerMessage.includes("frustrated") || lowerMessage.includes("mad")) {
    return {
      response:
        "It's completely okay to feel angry — it's a natural emotion. The important thing is finding healthy ways to express it. Would you like to talk about what's frustrating you, or would you prefer some techniques to help release that tension?",
    }
  }

  if (lowerMessage.includes("school") || lowerMessage.includes("grades") || lowerMessage.includes("homework")) {
    return {
      response:
        "School pressure can be really intense. Remember, your worth isn't defined by your grades. Let's think about what's causing the most stress — is it a specific subject, deadlines, or something else?",
    }
  }

  if (lowerMessage.includes("friend") || lowerMessage.includes("friends")) {
    return {
      response:
        "Friendships can be complicated, and it's normal to have ups and downs. What's going on with your friends right now? I'm here to listen without judgment.",
    }
  }

  if (
    lowerMessage.includes("parent") ||
    lowerMessage.includes("mom") ||
    lowerMessage.includes("dad") ||
    lowerMessage.includes("family")
  ) {
    return {
      response:
        "Family relationships can be challenging to navigate. Your feelings about your family situation are valid. Would you like to share more about what's happening at home?",
    }
  }

  if (lowerMessage.includes("sleep") || lowerMessage.includes("tired") || lowerMessage.includes("insomnia")) {
    return {
      response:
        "Sleep struggles can really affect how we feel during the day. Have you noticed any patterns in what keeps you up at night? Sometimes our thoughts race when we're trying to rest. Let's talk about what might help.",
    }
  }

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return {
      response:
        "Hey there! I'm Hamboi, and I'm really glad you're here. How are you feeling today? Whether things are going great or you're having a tough time, I'm here to chat.",
    }
  }

  // Default to random response if no keywords match
  return getRandomDemoResponse()
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || ""

    let userMessage = ""
    let isTextInput = false
    let audioFile: File | null = null

    if (contentType.includes("application/json")) {
      // Handle text input
      const body = await request.json()
      userMessage = body.text || ""
      isTextInput = true

      if (!userMessage.trim()) {
        return NextResponse.json({ error: "No message provided" }, { status: 400 })
      }
    } else {
      // Handle audio input
      const formData = await request.formData()
      audioFile = formData.get("audio") as File

      if (!audioFile) {
        return NextResponse.json({ error: "No audio file provided" }, { status: 400 })
      }
    }

    const apiKey = process.env.CODEWORDS_API_KEY

    // Once the hamboi_voice_chat service is created, this can be removed
    const useDemoMode = true

    if (!apiKey || useDemoMode) {
      // Simulate processing delay for realistic demo experience
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const demoResponse = isTextInput ? getContextualDemoResponse(userMessage) : getRandomDemoResponse()

      return NextResponse.json({
        transcript: isTextInput ? userMessage : "Thanks for sharing that with me...",
        response: demoResponse.response,
        audioUrl: "",
      })
    }

    // Upload audio to CodeWords for processing
    const uploadFormData = new FormData()
    uploadFormData.append("file", audioFile)

    const uploadResponse = await fetch("https://runtime.codewords.ai/file?filename=recording.webm", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: uploadFormData,
    })

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload audio")
    }

    const uploadData = await uploadResponse.json()
    const audioUrl = uploadData.file_url

    const chatResponse = await fetch("https://runtime.codewords.ai/run/hamboi_voice_chat", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        audio_url: audioUrl,
      }),
    })

    if (!chatResponse.ok) {
      throw new Error("Failed to process voice chat")
    }

    const chatData = await chatResponse.json()

    return NextResponse.json({
      transcript: chatData.transcript,
      response: chatData.response,
      audioUrl: chatData.audio_url,
    })
  } catch (error) {
    console.error("Voice chat error:", error)

    const demoResponse = getRandomDemoResponse()
    return NextResponse.json({
      transcript: "I'm here and listening...",
      response: demoResponse.response,
      audioUrl: "",
    })
  }
}
