// Hamboi Mindcare
import { type NextRequest, NextResponse } from "next/server"

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDSMgKXYSEwa-BWQt64_tTL7X3eYodMsIg`

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

function getConversationHistory(sessionId: string): Array<{ user: string; bot: string; timestamp: number }> {
  const now = Date.now()
  const history = conversationMemory.get(sessionId) || []
  return history.filter((item) => now - item.timestamp < 1800000)
}

function saveToHistory(sessionId: string, userMsg: string, botResponse: string) {
  const history = getConversationHistory(sessionId)
  history.push({ user: userMsg, bot: botResponse, timestamp: Date.now() })
  if (history.length > 3) history.shift()
  conversationMemory.set(sessionId, history)
}

function detectCrisis(input: string): string | null {
  const msg = input.toLowerCase()
  if (
    /\b(suicid|kill\s*(myself|me)|want\s*to\s*die|end\s*(my\s*life|it\s*all)|self.?harm|hurt\s*myself|no\s*reason\s*to\s*live|crisis|end\s*it)\b/.test(msg)
  ) {
    return "I'm deeply concerned about you right now, and I'm so glad you reached out to me. Your life matters more than you know. Please contact one of these Nigerian crisis lines immediately - they are FREE and CONFIDENTIAL:\n\n📞 MANI (Mentally Aware Nigeria): 0809 111 6264\n📞 SURPIN (Suicide Research & Prevention): 09080217555\n📞 Nigerian Suicide Prevention: 0806 210 6493\n📞 Emergency Services: 112\n\nThese are real people who want to help you through this moment. You don't have to face this alone. Please call one of these numbers right now, or go to your nearest hospital. I'm here with you. Can you tell me - are you safe right now?"
  }
  return null
}

function getSmartResponse(input: string, history: Array<{ user: string; bot: string }>): string {
  const msg = input.toLowerCase().trim()
  const words = msg.split(/\s+/)

  if (words.length <= 2 && !/(yes|no|yeah|nah|ok|okay|hi|hey|hello|bye|thanks|good|bad|idk)/i.test(msg)) {
    return "I'm listening. What's really going on?"
  }

  if (/^(hi|hey|hello|yo|sup|what'?s\s*up|greetings|heya|hiya)\b/i.test(msg) && words.length <= 3) {
    const greetings = [
      "Yo, I'm Hamboi. What's on your mind right now?",
      "Hey there. I'm here to listen. What brought you here today?",
      "Sup. Talk to me - what's going on?",
    ]
    return greetings[Math.floor(Math.random() * greetings.length)]
  }

  if (/\b(ss1|ss2|ss3|jss1|jss2|jss3|final\s*year|senior\s*secondary)\b/i.test(msg)) {
    const ssResponses = [
      "SS3 is no joke with WAEC coming - that pressure is real. What's stressing you most right now?",
      "Final year got you feeling the weight of everything. What's the hardest part for you?",
      "Senior secondary is tough, especially with all the expectations. What's going on?",
    ]
    return ssResponses[Math.floor(Math.random() * ssResponses.length)]
  }

  if (/\b(jamb|waec|neco|utme|post.?utme|uni(versity)?\s*(admission|entry)|uni entrance|school|exam|test|study|studying)\b/i.test(msg) &&
      /\b(stress(ed)?|anxious|worried|scared|fail|panic|pressure|hard|difficult|overwhelm)\b/i.test(msg)) {
    const jambResponses = [
      "That exam pressure is mad, no cap. Which subject is giving you the most wahala right now?",
      "The family pressure around JAMB is different. What's stressing you out most - the studying part or the expectations?",
      "School got you in a chokehold right now. What's making it feel impossible?",
      "Exam season is rough and everyone feels it. What specific thing about the exams is worrying you?",
    ]
    return jambResponses[Math.floor(Math.random() * jambResponses.length)]
  }

  if (/(my\s*)?(mom|mum|mother|dad|father|parent)\s*(hit|hits|beat|beats|slap|slaps|hurt|hurts|abuse|abuses)/i.test(msg)) {
    return "That's serious and it's not okay - none of this is your fault. Is there a trusted adult like a teacher, school counselor, or family friend you can talk to today?"
  }

  if (/(i\s*)?(stole|steal|stealing|took|shoplift|shoplifted|robbed)/i.test(msg) && !/got\s*stole|was\s*stolen/.test(msg)) {
    return "Real talk - stealing has real consequences and it messes with people. What was going through your head when it happened?"
  }

  if (/(i\s*)?(lied|lie|lying|cheat(ed|ing)?)\s*(to|on|about)/i.test(msg)) {
    return "Good that you're real with me about it - that matters. What made you feel like lying was the move?"
  }

  if (/(i\s*)?(bully|bullied|bullying|pick\s*on|picked\s*on|mean\s*to)\s*(someone|him|her|them|a\s*kid)/i.test(msg) && !/getting\s*bullied|was\s*bullied/.test(msg)) {
    return "Yo, that's not it. What was really going on when you did that?"
  }

  if (/(i\s*)?(fight|fighting|fought|got\s*into\s*a\s*fight)/i.test(msg) && !/they\s*fight|someone\s*fight/.test(msg)) {
    return "Fighting messes everything up more than it fixes. What actually happened that led to that?"
  }

  if (/(i\s*)?(drank|drinking|drunk|got\s*high|smoked|vaping|drug|weed|alcohol)/i.test(msg) && msg.length > 10) {
    return "Substances might numb the pain but they don't fix anything. What made you feel like you needed that escape?"
  }

  if (/(i\s*)?(cut|cutting|scratch|burn|hurt\s*myself)/i.test(msg) && !/accident/.test(msg)) {
    return "I'm worried about you - that's your pain trying to escape and it needs real help. Can you reach out to a counselor or trusted adult today?"
  }

  if (/(i\s*)?(skip(ping|ped)?|ditch(ing|ed)?)\s*(school|class)/i.test(msg)) {
    return "School's got you feeling like that? Something's gotta be really wrong if you're ditching. What's actually going on?"
  }

  if (/(i\s*)?(hit|slap|slapped|punch|punched|hurt|beat)\s*(someone|somebody|my|a\s*person|him|her)/i.test(msg) && !/got\s*hit|was\s*hit|they\s*hit/.test(msg)) {
    return "Hurting someone isn't the answer, and you probably know that. What was going on that made you feel like you had to do that?"
  }

  if (/(my\s*)?(girl|boy|girlfriend|boyfriend|partner|bae)\s*(broke\s*up|left\s*me|dumped\s*me)|broke\s*up\s*with\s*me|break\s*up|breakup|heartbreak/i.test(msg)) {
    return "Heartbreak is real and it hits hard. This is temporary pain, even though it feels forever right now. What's hurting you most about it?"
  }

  if (/(who|what)\s*(are\s*you|is\s*hamboi)|tell\s*me\s*about\s*(you|hamboi)|introduce\s*yourself/.test(msg)) {
    return "I'm Hamboi - basically a friend who cares about your mental health. I listen without judgment, no therapy talk. What's going on with you right now?"
  }

  if (/\b(fail(ed)?|flunk(ed)?|bomb(ed)?|didn'?t\s*pass)\s*(my|the|an?)?\s*(exam|test|quiz|midterm|final)/i.test(msg)) {
    return "That's tough and I know it stings. One test doesn't define you at all. What do you think went wrong - was it the studying or something else?"
  }

  if (/(i\s*)?(lost|losing|missed|didn'?t\s*get)\s*(my|the|a)?\s*(project|job|game|match|competition|opportunity|position|spot)/i.test(msg)) {
    return "That's a real disappointment and it makes sense you feel it. This won't be your only shot at things - what matters is what you do next."
  }

  if (/\b(anxious|anxiety|panic(king|ked|attack)?|scared|nervous|worried|worry(ing)?|tense|on\s*edge|can'?t\s*breathe|heart\s*racing)\b/.test(msg)) {
    const responses = [
      "Your body's going into overdrive right now. Try breathing in for 4, hold for 4, out for 6 - it actually works. What's got you feeling like this?",
      "That anxiety is gripping you hard. You've made it through every anxiety moment before this one - you got this. What triggered it?",
      "That scared feeling is real but it's not reality. Ground yourself - feel your feet, feel what's touching you right now. What's the main thing worrying you?"
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  if (/\b(sad|depress(ed|ion)?|down|low|unhappy|miserable|empty|numb|hopeless|worthless|crying|cry|tears)\b/.test(msg)) {
    const responses = [
      "That heaviness you're carrying is real and it's too much to carry alone. Can you reach out to someone you trust today - anyone?",
      "Depression is lying to you right now, saying nobody cares and things won't get better - that's not true. What's been making you feel this low?",
      "Your pain matters and so do you. This darkness feels endless but it won't last forever. Is there someone - a teacher, counselor, friend - you can talk to?"
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  if (/\b(lonely|alone|isolated|no\s*(one|body)|no\s*friends|left\s*out|excluded|nobody\s*cares)\b/.test(msg)) {
    const responses = [
      "That loneliness hits different and it's telling you lies - you're not unlovable and people do care. What hobbies or interests do you have that could connect you to people?",
      "Feeling isolated is hard but it won't always be like this. You're talking to me right now so you're not completely alone. What makes you feel left out?"
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  if (/\b(school|class(es)?|homework|exam|test|grade|teacher|assignment|study(ing)?|academic)\b/.test(msg)) {
    return "School pressure can be brutal - grades don't define your worth, no cap. What's the worst part of it for you right now?"
  }

  if (/\b(friend(s|ship)?|relationship|boyfriend|girlfriend|fight|drama|toxic)\b/.test(msg) && !/broke\s*up/.test(msg)) {
    return "Friend drama hits different when it's someone you care about. What's actually going on between you two?"
  }

  if (/\b(family|parent(s)?|mom|mum|dad|mother|father|sibling|brother|sister|home|pressure)\b/.test(msg) && !/everybody|someone'?s\s*family/.test(msg) && !/hit|beat|abuse/.test(msg)) {
    return "Family pressure can suffocate you sometimes, especially with all the expectations. What's eating at you most right now?"
  }

  if (/\b(can'?t\s*sleep|insomnia|sleep(ing)?|tired|exhausted|awake)\b/.test(msg)) {
    return "When your mind won't shut off, everything feels harder. Try breathing in for 4, hold 4, out for 4 - it helps. What's keeping your brain racing?"
  }

  if (/\b(angry|mad|frustrated|pissed|irritated|annoyed|furious|hate)\b/.test(msg)) {
    return "That anger is telling you something isn't right. What's really going on underneath it?"
  }

  if (/(i'?m|feel|i\s*am).*(worthless|stupid|failure|ugly|not\s*good\s*enough|useless)|hate\s*myself/.test(msg)) {
    return "Those thoughts are lying to you - you're more valuable than you think right now. What's making you so hard on yourself?"
  }

  if (/\b(bull(y|ied|ying)|harass(ed|ment)?|picked\s*on|made\s*fun)\b/.test(msg) && !/i\s*bully/.test(msg)) {
    return "That's not okay and it's not your fault - please tell a trusted adult today. You deserve to feel safe."
  }

  if (/\b(body|weight|fat|skinny|appearance|ugly|eating|diet)\b/.test(msg) && !/every?body|some?body/.test(msg) && msg.length > 15) {
    return "Your worth has nothing to do with your appearance - that's real talk. What's making you focus on this?"
  }

  if (/\b(good|great|happy|excited|better|amazing|awesome|proud)\b/.test(msg) && !/not|don'?t|isn'?t/.test(msg)) {
    return "That's fire, hold onto it. What's making you feel this way?"
  }

  if (/(not|don'?t).*(good|okay|fine|happy|well)|bad|terrible|awful|struggling|rough/.test(msg) && msg.length > 10) {
    return "I hear you - it's okay to not be okay. What's weighing on you most right now?"
  }

  if (/\b(help|advice|what\s*should\s*i|don'?t\s*know\s*what|confused|stuck|lost)\b/.test(msg)) {
    return "I'm here - talk to me about it. What's the situation you need help with?"
  }

  if (/\b(thank(s|you)|appreciate|grateful)\b/.test(msg)) {
    return "You're welcome - I'm always here when you need me. How are you feeling now?"
  }

  if (/\b(bye|goodbye|see\s*ya|later|gotta\s*go|have\s*to\s*go)\b/.test(msg)) {
    return "Take care of yourself. I'm always here when you need to talk."
  }

  if (/\b(reject(ed|ion)?|turned\s*down|said\s*no|didn'?t\s*want\s*me)\b/.test(msg)) {
    return "Rejection stings but it says nothing about your worth. What were you rejected from?"
  }

  if (/\b(embarrass(ed|ing|ment)?|ashamed|humiliat(ed|ing)|mortified|awkward)\b/.test(msg)) {
    return "That feeling is temporary - people will forget way faster than you think. What happened?"
  }

  if (/\b(guilt(y)?|feel\s*bad\s*about|regret|shouldn'?t\s*have)\b/.test(msg)) {
    return "Guilt only helps if it pushes you to make things right - otherwise it's just hurting you. What's going on?"
  }

  if (/\b(trauma|traumatic|ptsd|flashback|can'?t\s*forget|haunts?\s*me)\b/.test(msg)) {
    return "What you experienced was serious and healing from it deserves real support. Have you talked to a therapist about this?"
  }

  if (/\b(trust|can'?t\s*trust|don'?t\s*trust|betrayed|lied\s*to)\b/.test(msg)) {
    return "Broken trust hurts deep but not everyone will hurt you like that. What happened?"
  }

  if (/\b(perfect(ion(ism|ist)?)?|flawless|need\s*to\s*be\s*perfect|can'?t\s*make\s*mistakes)\b/.test(msg)) {
    return "Perfection doesn't exist and chasing it is killing you. Your mistakes are actually how you grow the most. What's driving this?"
  }

  if (/\b(peer\s*pressure|everyone\s*else|fit\s*in|fitting\s*in|they\s*want\s*me|friends\s*are\s*pressuring|my\s*friends\s*want|friends\s*pressuring|cool\s*kids|popular)\b/.test(msg)) {
    return "The people pressuring you are probably uncomfortable too - real friends respect your no. What are they pushing you to do?"
  }

  if (/\b(jealous|envy|envious|wish\s*i\s*was|wish\s*i\s*had)\b/.test(msg)) {
    return "You're comparing your behind-the-scenes to their highlight reel. What are you jealous of?"
  }

  if (/\b(procrast(inat(e|ing|ion))?|putting\s*off|can'?t\s*start|avoid(ing)?)\b/.test(msg) && msg.length > 15) {
    return "Procrastination is usually fear or overwhelm in disguise. Just start with one tiny thing. What are you avoiding?"
  }

  if (/\b(stuck|trapped|can'?t\s*move\s*forward|going\s*nowhere)\b/.test(msg)) {
    return "What's one small thing you could try or change, even if it seems insignificant? Sometimes momentum comes from tiny shifts. What area feels stuck?"
  }

  if (/\b(compar(e|ing|ison)|everyone\s*else|better\s*than\s*me)\b/.test(msg) && msg.length > 15) {
    return "Comparison is the thief of joy - you're only seeing people's best moments. Focus on your own growth. What are you comparing yourself to?"
  }

  if (/\b(no\s*motivation|don'?t\s*care|can'?t\s*be\s*bothered|unmotivated|apathetic)\b/.test(msg)) {
    return "That can be a sign you're burnt out or disconnected from your purpose. What used to make you excited?"
  }

  if (/\b(toxic\s*friend|fake\s*friend|bad\s*friend|using\s*me)\b/.test(msg)) {
    return "Toxic friendships drain you - real friends lift you up. What's happening in this friendship?"
  }

  if (/\b(social\s*anxiety|afraid\s*of\s*people|scared\s*to\s*talk|shy)\b/.test(msg)) {
    return "Your brain's overestimating threat and underestimating you - but that can change with practice. What situations scare you most?"
  }

  if (/\b(divorce|parents\s*separat(ing|ed)|parents\s*splitting)\b/.test(msg)) {
    return "This is not your fault and it's okay to feel all the feelings. Do you have someone you trust to talk to about it?"
  }

  if (/\b(money|financial|can'?t\s*afford|poor|broke)\b/.test(msg) && msg.length > 15) {
    return "Your worth isn't tied to money - many successful people came from nothing. What's the financial pressure you're facing?"
  }

  if (/\b(who\s*am\s*i|identity|don'?t\s*know\s*myself|finding\s*myself)\b/.test(msg)) {
    return "Questioning who you are is normal at your age - identity is something you build over time. What aspect are you figuring out?"
  }

  if (/\b(gay|lesbian|bi(sexual)?|trans(gender)?|queer|sexuality|gender|coming\s*out)\b/.test(msg)) {
    return "Your identity is valid no matter what - and you deserve support through this journey. What are you navigating right now?"
  }

  if (/\b(racism|racist|discriminat(ion|ed)|prejudice|because\s*of\s*my\s*race)\b/.test(msg)) {
    return "That's wrong and not your burden to carry alone - tell a trusted adult. What happened?"
  }

  if (/\b(chronic|illness|disability|disabled|sick|disease|condition)\b/.test(msg) && msg.length > 20) {
    return "Living with that is hard in ways others don't see - be patient and kind with yourself. How is it affecting you right now?"
  }

  if (/\b(grief|grieving|died|death|lost\s*(my|someone)|passed\s*away)\b/.test(msg)) {
    return "I'm so sorry - grief is heavy and there's no right way through it. Is there someone safe you can lean on?"
  }

  if (/\b(overwhelm(ed|ing)?|too\s*much|can'?t\s*handle)\b/.test(msg)) {
    return "Everything at once is too much - pause and focus on just the one most urgent thing right now. What needs your attention most?"
  }

  if (/\b(insecure|self.?conscious|doubt\s*myself)\b/.test(msg)) {
    return "Everyone feels insecure sometimes - that doesn't define who you are or what you're capable of. What's making you doubt yourself right now?"
  }

  const genericResponses = [
    "Thanks for trusting me with that - it takes guts. What's really going on with you?",
    "I'm listening and I'm here for you. What's on your mind right now?",
    "That matters and you matter. Tell me more about what's happening.",
    "I'm here, not going anywhere. What brought you to me today?",
    "You reached out - that took strength. What's the situation?",
    "I'm fully here for you. What's the thing weighing on you most?",
    "Hey, I'm glad you're here. What's going on in your world?",
    "I'm listening with full attention. What do you need to talk about?",
    "Life's getting to you. What's on your mind?",
    "You came to the right place. What's been happening?",
  ]
  const historyLength = history.length || 0
  return genericResponses[(historyLength + Math.floor(Math.random() * (genericResponses.length - 1))) % genericResponses.length]
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const userMessage = body.message
    const sessionId = body.sessionId || "default"
    const history = getConversationHistory(sessionId)

    if (!userMessage || typeof userMessage !== "string" || userMessage.trim() === "") {
      return NextResponse.json(
        { error: "Message is required", response: "I didn't receive your message. Could you try typing it again?" },
        { status: 400 }
      )
    }

    const userMessageTrimmed = userMessage.trim()
    const userMessageLower = userMessageTrimmed.toLowerCase()

    const ip = request.headers.get("x-forwarded-for") || "unknown"
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }

    // Crisis detection always runs first — no API needed
    const crisisResponse = detectCrisis(userMessageLower)
    if (crisisResponse) {
      saveToHistory(sessionId, userMessageTrimmed, crisisResponse)
      return NextResponse.json({ response: crisisResponse })
    }

    // Build Gemini conversation history
    // Gemini uses "user" and "model" roles (not "assistant")
    const geminiContents = history.flatMap((h) => [
      { role: "user", parts: [{ text: h.user }] },
      { role: "model", parts: [{ text: h.bot }] },
    ])
    geminiContents.push({ role: "user", parts: [{ text: userMessageTrimmed }] })

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: geminiContents,
          generationConfig: {
            maxOutputTokens: 200,
            temperature: 0.8,
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Gemini API error: ${errorData?.error?.message || response.statusText}`)
      }

      const data = await response.json()
      const geminiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text

      if (!geminiResponse) throw new Error("No response from Gemini")

      saveToHistory(sessionId, userMessageTrimmed, geminiResponse)
      return NextResponse.json({ response: geminiResponse })

    } catch (geminiError: any) {
      console.error("Gemini API error:", geminiError.message)
      const fallbackResponse = getSmartResponse(userMessageTrimmed, history)
      saveToHistory(sessionId, userMessageTrimmed, fallbackResponse)
      return NextResponse.json({ response: fallbackResponse })
    }

  } catch (error: any) {
    console.error("API route error:", error)
    return NextResponse.json(
      { response: "I'm having a bit of trouble right now. Can you try sending that message again? I'm here and want to help." },
      { status: 500 }
    )
  }
}
