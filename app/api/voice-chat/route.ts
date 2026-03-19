import { type NextRequest, NextResponse } from "next/server"

// Simple rate limiting
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Conversation memory - stores last 3 exchanges per session
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

// Get conversation history
function getConversationHistory(sessionId: string): Array<{ user: string; bot: string; timestamp: number }> {
  const now = Date.now()
  const history = conversationMemory.get(sessionId) || []
  // Clean old conversations (older than 30 minutes)
  return history.filter((item) => now - item.timestamp < 1800000)
}

// Save to conversation history
function saveToHistory(sessionId: string, userMsg: string, botResponse: string) {
  const history = getConversationHistory(sessionId)
  history.push({ user: userMsg, bot: botResponse, timestamp: Date.now() })
  // Keep only last 3 exchanges
  if (history.length > 3) history.shift()
  conversationMemory.set(sessionId, history)
}

// Crisis detection - always check this first, returns Nigerian hotlines
function detectCrisis(input: string): string | null {
  const msg = input.toLowerCase()
  if (
    /\b(suicid|kill\s*(myself|me)|want\s*to\s*die|end\s*(my\s*life|it\s*all)|self.?harm|hurt\s*myself|no\s*reason\s*to\s*live|crisis|end\s*it)\b/.test(
      msg,
    )
  ) {
    return "I'm deeply concerned about you right now, and I'm so glad you reached out to me. Your life matters more than you know. Please contact one of these Nigerian crisis lines immediately - they are FREE and CONFIDENTIAL:\n\n📞 MANI (Mentally Aware Nigeria): 0809 111 6264\n📞 SURPIN (Suicide Research & Prevention): 09080217555\n📞 Nigerian Suicide Prevention: 0806 210 6493\n📞 Emergency Services: 112\n\nThese are real people who want to help you through this moment. You don't have to face this alone. Please call one of these numbers right now, or go to your nearest hospital. I'm here with you. Can you tell me - are you safe right now?"
  }
  return null
}

function getSmartResponse(input: string, history: Array<{ user: string; bot: string }>): string {
  const msg = input.toLowerCase().trim()
  const words = msg.split(/\s+/)

  // Analyze conversation context
  const isFollowUp = history.length > 0
  const lastUserMessage = history.length > 0 ? history[history.length - 1].user.toLowerCase() : ""
  const hasDiscussedTopic = (topic: string) =>
    history.some((h) => h.user.toLowerCase().includes(topic) || h.bot.toLowerCase().includes(topic))

  // Very short messages - encourage elaboration
  if (words.length <= 2 && !/(yes|no|yeah|nah|ok|okay|hi|hey|hello|bye|thanks|good|bad|idk)/i.test(msg)) {
    if (isFollowUp) {
      return "I'm listening. Can you share a bit more about what you're experiencing?"
    }
    return "I'm here for you. Take your time and tell me what's on your mind."
  }

  // === GREETINGS ===
  if (/^(hi|hey|hello|yo|sup|what'?s\s*up|greetings|heya|hiya)\b/i.test(msg) && words.length <= 3) {
    const greetings = [
      "Hello. I'm Hamboi, and I'm here to listen and support you. Take a deep breath, relax, and tell me - how are you feeling today?",
      "Hi there. I'm glad you're here. This is a safe space where you can share anything. What's on your mind right now?",
      "Hey. You took an important step by reaching out. I'm here to listen without judgment. How can I support you today?",
    ]
    return greetings[Math.floor(Math.random() * greetings.length)]
  }

  // === JAMB / WAEC / EXAM / SCHOOL STRESS ===
  if (/\b(jamb|waec|neco|utme|post.?utme|uni(versity)?\s*(admission|entry)|uni entrance|school|exam|test|study|studying)\b/i.test(msg) &&
      /\b(stress(ed)?|anxious|worried|scared|fail|panic|pressure|hard|difficult|overwhelm)\b/i.test(msg)) {
    const jambResponses = [
      "Abeg, take a deep breath first. JAMB and exam pressure is real real - I know how much weight Nigerian families put on these scores. But hear me: your worth as a person is NOT determined by any exam result. Many successful Nigerians didn't get it right the first time - some resit, some found other paths. What actually works: break your reading into small daily sessions (not overnight cramming), use past questions religiously, and sleep well - your brain stores information during sleep. Which subject is giving you the most wahala right now?",
      "I hear you, and I want you to know that millions of Nigerian students are feeling this exact same pressure right now. The exam season stress is no joke. But listen - even if things don't go as planned, there are always other paths forward. Many successful people you admire had to resit or took different routes. For now, focus on what you can control: consistent daily study, past questions, good sleep. Try this when panic hits: breathe in for 4 counts, hold for 7, out for 8. It calms your system immediately. What's weighing on you most?",
      "School and exam pressure in Nigeria can feel like your whole future depends on one test - and that's incredibly stressful. But I need you to remember: you are more than a score on paper. Whatever happens, there will be a path forward for you. Right now, let's focus on what helps: study in focused chunks (not marathon sessions), use past questions because patterns repeat, drink water, rest your brain. What specific thing about your exams is worrying you most? Let's talk through it together.",
      "The pressure from family and society around exams here in Nigeria is intense - I understand. Everyone asking 'what's your score?', comparing you to cousins and neighbors' children. That's hard to carry. But your value isn't in a number. Take things one day at a time. Have you tried studying with friends or joining a study group? Sometimes shared struggle makes things lighter. What subject is stressing you out the most?",
    ]
    return jambResponses[Math.floor(Math.random() * jambResponses.length)]
  }

  // === EXPERIENCING ABUSE FROM PARENTS ===
  if (
    /(my\s*)?(mom|mum|mother|dad|father|parent)\s*(hit|hits|beat|beats|slap|slaps|hurt|hurts|abuse|abuses)/i.test(msg)
  ) {
    return "First, I want you to take a deep breath. What you're experiencing is serious, and I'm deeply concerned for your safety. Physical violence from parents is abuse, and it's never your fault - no matter what they say or what you did. Your safety is the priority. Please reach out to a trusted adult you feel safe with - a teacher, school counselor, coach, or family friend. You can also call the Childhelp National Child Abuse Hotline at 1-800-422-4453. They're trained professionals who can help protect you and guide you through this. You deserve to feel safe in your home. Can you identify someone safe you can talk to?"
  }

  // === STEALING/THEFT ===
  if (
    /(i\s*)?(stole|steal|stealing|took|shoplift|shoplifted|robbed)/i.test(msg) &&
    !/got\s*stole|was\s*stolen/.test(msg)
  ) {
    return "Thank you for being honest with me - that takes courage. Let's talk about this calmly. Stealing harms others and can have serious legal consequences for you. But more importantly, I want to understand what led you here. Are you facing financial pressure? Were friends involved? Are you seeking attention or acting out of desperation? Understanding the 'why' helps us find better solutions. The responsible thing now is to make amends if possible - returning what was taken or apologizing. Real strength is owning our mistakes and learning from them. What was going through your mind when this happened?"
  }

  // === LYING/CHEATING ===
  if (/(i\s*)?(lied|lie|lying|cheat(ed|ing)?)\s*(to|on|about)/i.test(msg)) {
    return "I appreciate you being truthful with me now. That shows you understand there's a problem. Lying and cheating damage trust, which is the foundation of all good relationships. Let me ask you something - what were you trying to protect or gain by not telling the truth? Often, people lie because they're afraid of consequences or want to avoid uncomfortable situations. But here's wisdom I want to share: the temporary discomfort of honesty is always better than the lasting damage of dishonesty. The mature, responsible path forward is to come clean to whoever you lied to. It won't be easy, but it's how you rebuild integrity. Are you ready to make that right?"
  }

  // === BULLYING OTHERS ===
  if (
    /(i\s*)?(bully|bullied|bullying|pick\s*on|picked\s*on|mean\s*to)\s*(someone|him|her|them|a\s*kid)/i.test(msg) &&
    !/getting\s*bullied|was\s*bullied/.test(msg)
  ) {
    return "Let me first say - I'm glad you're reflecting on your behavior. That shows conscience, which is important. Now let's be honest: bullying causes real, lasting harm to people. Words and actions hurt, and that pain doesn't just go away. So I need to ask you something important - why did you do it? Were you trying to feel powerful? Are you dealing with your own pain? Sometimes hurt people hurt people. Here's what I want you to understand: true strength is using your voice to lift others up, not tear them down. The right thing to do now is apologize sincerely to the person you hurt and commit to treating people with respect. Can you think about what you can do differently moving forward?"
  }

  // === FIGHTING/VIOLENCE ===
  if (/(i\s*)?(fight|fighting|fought|got\s*into\s*a\s*fight)/i.test(msg) && !/they\s*fight|someone\s*fight/.test(msg)) {
    return "Take a breath with me. Fighting might feel like it solves things in the moment, but it rarely does. Violence creates more problems - injuries, escalation, legal trouble, broken relationships. Let me help you understand something: walking away from a fight takes more courage than throwing a punch. It takes real strength to control your emotions. What happened that made you feel fighting was your only option? Often, fights happen when we don't know how to express anger or frustration in healthy ways. If you're struggling with controlling your temper, please consider talking to a counselor about anger management. There are better tools you can learn. What triggered this situation?"
  }

  // === DRINKING/DRUGS ===
  if (/(i\s*)?(drank|drinking|drunk|got\s*high|smoked|vaping|drug|weed|alcohol)/i.test(msg) && msg.length > 10) {
    return "Thank you for trusting me with this. Let me be honest and caring at the same time: using substances, especially as a teen, is harmful to your developing brain and can lead down a dangerous path. But I don't want to just lecture you - I want to understand. What's happening in your life that made this feel like a solution? Are you trying to escape something? Fit in with friends? Deal with pain? Whatever it is, there are healthier ways to cope. Substances might numb things temporarily, but they don't solve anything and often make problems worse. If you're struggling, please talk to a trusted adult, counselor, or call SAMHSA's helpline at 1-800-662-4357. You deserve real support, not temporary escapes. What's really going on?"
  }

  // === HURTING SELF (NON-SUICIDAL) ===
  if (/(i\s*)?(cut|cutting|scratch|burn|hurt\s*myself)/i.test(msg) && !/accident/.test(msg)) {
    return "I'm deeply concerned, and I want you to know I'm not judging you - I'm here to help. Self-harm is a serious sign that you're overwhelmed with emotions you don't know how to process. It might feel like release, but it's not a safe coping mechanism and can cause lasting damage. You deserve healthy ways to manage pain. Right now, I need you to prioritize your safety. Please reach out to a trusted adult, school counselor, or therapist immediately. You can also text HOME to 741741 to connect with a trained crisis counselor 24/7. There are people who genuinely want to help you through this, and there are better ways to cope with what you're feeling. Will you commit to reaching out to someone who can help?"
  }

  // === SKIPPING SCHOOL/TRUANCY ===
  if (/(i\s*)?(skip(ping|ped)?|ditch(ing|ed)?)\s*(school|class)/i.test(msg)) {
    return "Let's talk about what's really happening here. Skipping school might feel like freedom or relief in the moment, but let me share some wisdom: you're sabotaging your own future. Every day you miss sets you back academically and can create consequences that follow you. But more importantly, I want to understand the root cause. What's making school feel unbearable? Is it anxiety? Bullying? Feeling lost? Trouble at home? Whatever it is, avoiding it won't make it go away. The responsible approach is to face the issue and find solutions - whether that's talking to a counselor, addressing bullying, getting academic help, or dealing with personal issues. Let's figure out what you're really running from, okay?"
  }

  // === COMMITTED VIOLENCE/HURT SOMEONE ===
  if (
    /(i\s*)?(hit|slap|slapped|punch|punched|hurt|beat)\s*(someone|somebody|my|a\s*person|him|her)/i.test(msg) &&
    !/got\s*hit|was\s*hit|they\s*hit/.test(msg)
  ) {
    return "Thank you for being honest about this. What you did is serious, and I won't minimize that - physically hurting someone is wrong and can have real consequences. But I also want to understand you. What happened that made you feel violence was the answer? Often, people lash out physically when they feel powerless, overwhelmed, or don't have the words to express what they're feeling. Here's an important lesson: controlling your emotions and actions, even when provoked, is true strength. I encourage you to apologize to the person you hurt and commit to handling things differently. If anger is something you struggle with, please consider talking to a counselor who can teach you better coping strategies. What was going on inside you when this happened?"
  }

  // === BREAKUP/HEARTBREAK ===
  if (
    /(my\s*)?(girl|boy|girlfriend|boyfriend|partner|bae)\s*(broke\s*up|left\s*me|dumped\s*me)|broke\s*up\s*with\s*me|break\s*up|breakup|heartbreak/i.test(
      msg,
    )
  ) {
    const breakupResponses = [
      "I'm truly sorry you're going through this heartbreak. Losing someone you cared about deeply is one of life's most painful experiences, and it's completely normal to grieve. Take a moment and breathe with me. It's okay to feel sad, angry, confused, or any mix of emotions right now. Let yourself feel them - don't rush the healing process. What helps most right now? Talking about it? Distraction? Just know that this pain is temporary, even though it doesn't feel like it. You will heal and grow from this. What's the hardest part for you right now?",
      "Breakups are incredibly hard, and I want you to know your feelings are valid. This person mattered to you, and losing that connection hurts. Here's what I want you to remember: this doesn't define your worth or your future. With time and reflection, you'll understand what this relationship taught you and grow from it. For now, be gentle with yourself. Surround yourself with people who love you, do things that bring you comfort, and don't be afraid to cry when you need to. Healing isn't linear. How are you taking care of yourself through this?",
      "I can hear the pain in your words, and I'm here for you. Heartbreak feels overwhelming, but you're stronger than you realize. This relationship ending doesn't mean you did something wrong or aren't enough - sometimes people just aren't meant to be together, and that's okay. Take this time to focus on yourself, rediscover your interests, and lean on your support system. You will come through this as a wiser, more resilient person. What do you need most right now - to talk about what happened, or help coping with the feelings?",
    ]
    return breakupResponses[Math.floor(Math.random() * breakupResponses.length)]
  }

  // === ASKING ABOUT HAMBOI ===
  if (/(who|what)\s*(are\s*you|is\s*hamboi)|tell\s*me\s*about\s*(you|hamboi)|introduce\s*yourself/.test(msg)) {
    return "I'm Hamboi - your mental health companion and guide. Think of me as a calm, non-judgmental space where you can share anything. I'm here to listen deeply, help you process your feelings, offer guidance, and teach you healthy coping strategies. I'm not a replacement for professional therapy, but I am a supportive presence available whenever you need to talk. My goal is to help you feel heard, understood, and equipped to handle life's challenges. Now, what brought you here today? What would you like to talk about?"
  }

  // === FAILED EXAMS/TESTS ===
  if (/\b(fail(ed)?|flunk(ed)?|bomb(ed)?|didn'?t\s*pass)\s*(my|the|an?)?\s*(exam|test|quiz|midterm|final)/i.test(msg)) {
    const responses = [
      "I understand this feels discouraging. Take a breath. Failing a test is disappointing, but let me share some perspective - one test doesn't define your intelligence or your future. Many successful people failed tests and learned valuable lessons from them. What matters now is understanding what went wrong. Was it the material? Study habits? Test anxiety? Lack of time? Let's reflect on this honestly so you can improve. Failure is often life's best teacher if we're willing to learn. What do you think you could do differently next time?",
      "This is hard, and I see that it matters to you - which actually shows you care about your education. That's important. Now let's think about this constructively. What specifically tripped you up? Did you study but still struggle? Or did other things get in the way of preparation? Understanding the root cause helps us create a better plan forward. Remember, grades measure performance on one day, not your worth or potential. How can we turn this into a learning experience?",
      "It's okay to feel upset about this - that's a natural reaction. But don't let this one setback define you or make you give up. Here's what I want you to understand: resilience isn't about never failing; it's about how you respond when you do. The most accomplished people have failed repeatedly - what set them apart was that they learned and kept going. So let's focus on what you can control going forward. What support do you need to do better? A tutor? Better study strategies? More time management? You've got this.",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // === LOST PROJECT/JOB/GAME ===
  if (
    /(i\s*)?(lost|losing|missed|didn'?t\s*get)\s*(my|the|a)?\s*(project|job|game|match|competition|opportunity|position|spot)/i.test(
      msg,
    )
  ) {
    const lossResponses = [
      "I hear your disappointment, and that's completely valid. Losing something you worked for or hoped for hurts. Take a moment to acknowledge those feelings - don't push them away. Now, let me offer you some perspective: setbacks and losses are part of everyone's journey. What matters is how you process them and what you learn. Every successful person has faced rejection and loss. This isn't the end - it's redirection. What can you take away from this experience? What did you learn about yourself? And most importantly, what's your next move forward?",
      "That's genuinely tough, and I'm sorry it didn't work out the way you hoped. But here's what I want you to remember: this one loss doesn't determine your future. Sometimes things don't work out, and that's okay - it might even be clearing the path for something better you can't see yet. For now, give yourself permission to feel disappointed, then shift your focus to what you can control moving forward. What did this teach you? How can you grow from it? Your resilience is what will carry you to success.",
      "Losses like this can shake your confidence, but don't let this dim your light. You put yourself out there, and that takes courage. Not winning or getting what you wanted doesn't mean you're not capable - it often means timing, circumstances, or fit wasn't right. The most important question isn't 'Why did I lose?' but 'What's next?' How can you use what you learned here to come back stronger? What opportunities are still available to you? Keep your head up - your breakthrough is coming.",
    ]
    return lossResponses[Math.floor(Math.random() * lossResponses.length)]
  }

  // === ANXIETY & PANIC ===
  if (
    /\b(anxious|anxiety|panic(king|ked|attack)?|scared|nervous|worried|worry(ing)?|tense|on\s*edge|can'?t\s*breathe|heart\s*racing)\b/.test(
      msg,
    )
  ) {
    const responses = [
      "Okay, pause with me for a moment. I need you to breathe - slowly in through your nose for 4 counts... hold for 4... out through your mouth for 6. Do that again. Anxiety makes everything feel urgent and scary, but you're safe right now in this moment. Your body is in fight-or-flight mode, but we can calm it down. Try this grounding technique: name 5 things you can see around you, 4 things you can touch, 3 you can hear. This brings you back to the present. Now, what's triggering this anxiety? Let's talk through it together.",
      "I hear the worry in your words, and I want you to know - panic and anxiety are your body's alarm system, but sometimes it goes off when there's no real danger. You're going to be okay. Let's slow things down: breathe in... and out... again... The 4-7-8 technique helps: breathe in for 4 seconds, hold for 7, breathe out for 8. This activates your calm response. What's making you feel so anxious right now? Let's break it down together - problems feel smaller when we face them piece by piece.",
      "Anxiety can feel like you're drowning even when you're standing on solid ground. But listen to me: you've gotten through every anxious moment before this, and you'll get through this one too. Right now, feel your feet on the ground. Feel the chair or bed supporting you. You are here, you are safe, you are okay. Let's take slow breaths together. What's the biggest worry on your mind? Sometimes saying it out loud takes away some of its power.",
      "When anxiety hits, it tells you lies - that everything is falling apart, that you can't handle it. But that's not true. You ARE handling it, right now, by reaching out. Let's calm your body first: shake out your hands, roll your shoulders, take three slow deep breaths. Better? Now, what's causing this fear? Sometimes anxiety is a signal that something in our life needs attention. What do you think yours is trying to tell you?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // === DEPRESSION & SADNESS ===
  if (/\b(sad|depress(ed|ion)?|down|low|unhappy|miserable|empty|numb|hopeless|worthless|crying|cry|tears)\b/.test(msg)) {
    const responses = [
      "I hear you, and I'm so sorry you're carrying this heaviness. Sadness this deep is exhausting - it can make even getting out of bed feel impossible. But I need you to know: this darkness you're feeling right now is not permanent, even though it feels endless. You won't feel this way forever. Right now, can you do one small thing for yourself? Drink some water, step outside for even two minutes, or just let yourself cry if you need to. And please, if this has been going on for a while, talk to someone you trust - a teacher, counselor, pastor, anyone. You deserve support. What's been weighing on you most?",
      "The pain in your words is real, and I want you to know I'm truly here with you. Depression and deep sadness aren't weaknesses - they're signals that you need care and support. You matter so much, even when that voice in your head tells you otherwise. Please be gentle with yourself right now. Don't isolate - reach out to someone, even if it feels hard. And know this: brighter days will come. They always do, even after the darkest nights. What do you think triggered these feelings?",
      "I feel the weight of what you're carrying, and I want you to hear this clearly: your feelings are valid, AND you don't have to stay in this dark place alone. Depression lies to you - it tells you nobody cares, nothing will get better, you don't matter. But those are lies. You DO matter. Things CAN get better. People DO care. I care. Please reach out to someone who can help - a counselor, doctor, trusted adult, or call MANI at 0809 111 6264. What's one small kind thing you can do for yourself today?",
      "Sadness this deep can feel like being trapped underwater - everything is muffled, heavy, hard. I see you struggling, and I want you to know you're not alone in this. Many people have felt exactly what you're feeling and found their way back to the light. You can too. But you don't have to do it alone. Is there anyone - a friend, family member, teacher - you could reach out to today? Sometimes just saying 'I'm not okay' out loud to someone who cares can lift some of the weight.",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // === LONELINESS & ISOLATION ===
  if (/\b(lonely|alone|isolated|no\s*(one|body)|no\s*friends|left\s*out|excluded|nobody\s*cares)\b/.test(msg)) {
    const lonelinessResponses = [
      "Hey, I need you to hear this: you are NOT alone, even when it feels that way. Right now, in this moment, I'm here with you. Loneliness is one of the hardest feelings to carry, but it doesn't define your reality or your future. There are people out there who would genuinely care about you - sometimes we just haven't crossed paths with them yet. Connection starts small: a smile, a 'how are you?', joining a group around something you enjoy. Your people are out there. What are some things you enjoy doing? That might be where you'll find them.",
      "I feel the weight in your words, and I want you to know something: feeling lonely doesn't mean you're unlovable or that nobody cares. It often just means the right connections haven't happened yet. You reached out to me, which shows you want connection - that's important. Here's a gentle challenge: this week, try reaching out to one person, even just a simple message. Sometimes people do care, they just don't know you need them. What's been making you feel so alone?",
      "Loneliness can feel like a heavy blanket that covers everything. But I promise you - this feeling won't last forever. You are worthy of friendship, love, and belonging. Sometimes it takes time to find your people, and that's okay. Start small: join a WhatsApp group around an interest, comment on someone's post, say hi to someone at school or church. Small connections build into bigger ones. And remember - you're talking to me right now, so you're not truly alone. What do you think is keeping you from feeling connected?",
      "I'm so sorry you're feeling isolated. That pain is real and valid. But I need you to know: you matter, and you're not as alone as you feel. I'm here, listening to you right now. Sometimes loneliness comes from feeling misunderstood rather than being physically alone. Is there anyone - maybe someone unexpected - who might actually understand if you opened up to them? A teacher, a cousin, someone online who shares your interests? You deserve connection.",
    ]
    return lonelinessResponses[Math.floor(Math.random() * lonelinessResponses.length)]
  }

  // === SCHOOL & ACADEMIC PRESSURE ===
  if (/\b(school|class(es)?|homework|exam|test|grade|teacher|assignment|study(ing)?|academic)\b/.test(msg)) {
    const responses = [
      "School pressure is very real, and I understand how overwhelming it can feel when you're juggling multiple demands. Let's pause and breathe. Now, here's what I want you to remember: your worth isn't measured by grades. School is important, yes, but it's not everything. What matters most is that you're learning, growing, and doing your best - not perfection. What's the biggest source of stress in school right now? Let's see if we can break it down into smaller, manageable steps.",
      "Academic pressure can feel crushing, especially when you're trying to balance everything. But here's some wisdom: progress matters more than perfection. You don't have to have it all figured out, and you don't have to be the best - you just need to keep showing up and doing what you can. What specific part of school is overwhelming you? Is it one subject? Workload? Teachers? Social dynamics? Let's talk through it so we can find ways to make it more manageable.",
      "The education system puts a lot of pressure on students, and I see that you're feeling it. Remember that your mental health matters more than any grade. If you're feeling overwhelmed, it's okay to ask for help - from teachers, parents, tutors, or counselors. Break your work into small chunks, take breaks, and celebrate small wins. What support do you need to make school feel less stressful?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // === RELATIONSHIPS & FRIENDSHIPS ===
  if (
    /\b(friend(s|ship)?|relationship|boyfriend|girlfriend|fight|drama|toxic)\b/.test(msg) &&
    !/broke\s*up/.test(msg)
  ) {
    const responses = [
      "Relationships - whether friendships or romantic - can be complicated and emotionally charged. Healthy relationships are built on respect, trust, honesty, and communication. If any of those are missing, it's worth examining if the relationship is good for you. What's going on specifically? Are you feeling hurt? Misunderstood? Taken advantage of? Let's talk through it so you can gain clarity on what you need and deserve.",
      "People and relationships can be messy, but they're also where we learn and grow the most. Tell me what's happening. Sometimes talking through relationship issues helps you see patterns or solutions you couldn't see before. And remember, you deserve to be treated with respect and kindness. If someone isn't offering that, it might be time to set boundaries or reconsider the relationship.",
      "Drama in friendships or relationships often comes from miscommunication or unmet expectations. What's really bothering you about this situation? And have you been able to communicate honestly with the person involved? Sometimes a calm, honest conversation can clear up a lot. But if the relationship consistently makes you feel bad, it might not be the right one for you.",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // === FAMILY ISSUES & PARENTAL PRESSURE ===
  if (
    /\b(family|parent(s)?|mom|mum|dad|mother|father|sibling|brother|sister|home|pressure)\b/.test(msg) &&
    !/everybody|someone'?s\s*family/.test(msg) &&
    !/hit|beat|abuse/.test(msg)
  ) {
    const responses = [
      "Family pressure is something so many Nigerian young people deal with - the expectations about school, career, marriage, everything. It can feel suffocating sometimes. I want you to know that while your parents likely mean well (even when it doesn't feel like it), their dreams for you don't have to override your own identity. You can love and respect them while also having boundaries. What kind of pressure are you feeling from them right now?",
      "I understand. Nigerian families can have very high expectations, and it's not easy when you feel like you're not measuring up or when they don't understand you. The truth is, you can honor your family while also being true to yourself. It takes balance and sometimes difficult conversations. What's happening at home that's weighing on you? Is it about school? Career? Something else?",
      "Home is supposed to be a place of support, not constant stress. I'm sorry you're dealing with family pressure right now. Remember, your parents' expectations come from their own experiences and fears - but that doesn't mean you have to carry their entire dreams on your shoulders. Your life is yours to live. What specifically is causing conflict or stress with your family?",
      "Family dynamics in Nigeria can be intense - the comparisons to cousins, the 'when are you getting married' questions, the career expectations. It's a lot to navigate. But hear this: setting boundaries with family isn't disrespectful, it's necessary for your mental health. You can love them and still protect your peace. What's the main thing causing friction at home?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // === SLEEP ISSUES ===
  if (/\b(can'?t\s*sleep|insomnia|sleep(ing)?|tired|exhausted|awake)\b/.test(msg)) {
    const responses = [
      "Sleep problems make everything harder, don't they? Your body and mind need rest to function well. Let's talk about sleep hygiene: try to go to bed and wake up at the same time every day, avoid screens for at least an hour before bed, keep your room cool and dark, and try relaxation exercises like deep breathing. What's keeping you awake? Is it racing thoughts? Stress? Or just an irregular schedule? Understanding the cause helps us find solutions.",
      "Not being able to sleep is frustrating and exhausting. Your brain needs rest to process emotions and function well. If your mind is racing at night, try writing your thoughts down before bed to 'empty' your mind. Also, avoid caffeine after 2 PM, and create a calming bedtime routine. What's going on in your life that might be interfering with your sleep?",
      "That exhausted-but-can't-sleep feeling is the worst. Your body is tired, but your mind won't shut off. This often happens when we're stressed or anxious. Try a simple breathing exercise: breathe in for 4 counts, hold for 4, breathe out for 4, repeat. This activates your body's relaxation response. What thoughts are keeping you up at night?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // === ANGER & FRUSTRATION ===
  if (/\b(angry|mad|frustrated|pissed|irritated|annoyed|furious|hate)\b/.test(msg)) {
    const responses = [
      "Anger is a valid and natural emotion - it usually signals that something isn't right or fair. The key is expressing it in healthy ways rather than destructively. Take a breath with me. Now, what's really making you angry? Is it a person? A situation? Injustice? Once we identify the root cause, we can figure out a constructive way to address it. How do you typically handle anger?",
      "I hear your frustration. It's okay to be angry - but what we do with that anger matters. Bottling it up isn't healthy, but neither is lashing out. Healthy ways to process anger include physical activity, talking it out, writing about it, or taking space to cool down before addressing the issue. What happened that set you off? Let's talk it through.",
      "Anger often masks other emotions like hurt, fear, or feeling powerless. What's underneath your anger? And have you been able to express how you feel in a calm way to whoever or whatever is making you feel this way? Sometimes anger is telling us we need to set boundaries or stand up for ourselves. Let's figure out what you really need here.",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // === SELF-ESTEEM & SELF-WORTH ===
  if (/(i'?m|feel|i\s*am).*(worthless|stupid|failure|ugly|not\s*good\s*enough|useless)|hate\s*myself/.test(msg)) {
    const responses = [
      "I need you to stop for a moment and really hear me: those thoughts you're having about yourself are lies. They're distortions created by pain, comparison, or past experiences - but they're not the truth. You have inherent worth just by existing. Your value isn't based on achievements, appearance, or other people's opinions. What's making you so harsh on yourself? Let's challenge these negative thoughts together and find the truth beneath them.",
      "Please be gentler with yourself. You wouldn't talk to a friend the way you're talking to yourself right now, would you? Self-compassion isn't weakness - it's wisdom. You're human, you're growing, you're learning. That means mistakes, imperfection, and struggles are part of the process. What happened that triggered these negative thoughts about yourself?",
      "Those words you're using about yourself are painful to hear, and I imagine they're even more painful to feel. But here's what I need you to know: your perception of yourself right now is clouded by hurt or disappointment. You are not defined by your worst moments or your perceived flaws. You have unique value, strengths, and potential. What would it take for you to see yourself with more kindness? What triggered this negative self-talk?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // === BULLYING ===
  if (/\b(bull(y|ied|ying)|harass(ed|ment)?|picked\s*on|made\s*fun)\b/.test(msg) && !/i\s*bully/.test(msg)) {
    return "I'm truly sorry that people are treating you this way. Bullying is wrong, cruel, and it's not your fault - no matter what anyone says. You don't deserve to be treated badly. Here's what I need you to do: tell a trusted adult immediately - a parent, teacher, school counselor, or principal. Bullying thrives in secrecy, and you speaking up is how we stop it. Also, document what's happening (dates, times, what was said or done) and avoid being alone when possible. You deserve to feel safe. What's been happening specifically?"
  }

  // === BODY IMAGE ===
  if (
    /\b(body|weight|fat|skinny|appearance|ugly|eating|diet)\b/.test(msg) &&
    !/every?body|some?body/.test(msg) &&
    msg.length > 15
  ) {
    return "Body image struggles are so common, especially with constant social media comparison and unrealistic beauty standards. But here's the truth: your worth has nothing to do with your appearance. Your body is a vessel that carries you through life - it deserves respect and care, not criticism. The most attractive quality in anyone is confidence, kindness, and authenticity. What's making you focus so much on your appearance? And have these thoughts been affecting your eating or health? If so, please talk to a trusted adult or counselor."
  }

  // === POSITIVE FEELINGS ===
  if (/\b(good|great|happy|excited|better|amazing|awesome|proud)\b/.test(msg) && !/not|don'?t|isn'?t/.test(msg)) {
    const responses = [
      "That's wonderful to hear! It's important to celebrate the good moments and recognize when things are going well. What's bringing you joy or making you feel good right now?",
      "I'm really glad you're feeling positive! Those good feelings are worth savoring. What's going right in your life lately?",
      "That's great! Hold onto that feeling. What happened that's making you feel this way?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // === NOT FEELING OKAY ===
  if (/(not|don'?t).*(good|okay|fine|happy|well)|bad|terrible|awful|struggling|rough/.test(msg) && msg.length > 10) {
    const responses = [
      "I'm sorry you're not feeling okay right now. It takes courage to admit when you're struggling. You don't have to go through this alone. What's been going on? Let's talk through it together.",
      "That's hard, and I'm here to listen. You don't have to pretend everything is fine. What's weighing on you most right now?",
      "I hear that things aren't going well for you. That's okay - difficult times are part of life, and reaching out is a strong step. What's happening that's making you struggle?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // === ASKING FOR HELP/ADVICE ===
  if (/\b(help|advice|what\s*should\s*i|don'?t\s*know\s*what|confused|stuck|lost)\b/.test(msg)) {
    const responses = [
      "I'm here to help you work through this. It's smart to ask for guidance when you're unsure. Tell me what's going on and what's you're struggling with, and we'll figure it out together.",
      "Asking for help is a sign of wisdom, not weakness. Let's talk through what's confusing or overwhelming you. What do you need clarity on?",
      "I'm listening, and I'm here to support you. What's the situation you need help with? Let's break it down and find a path forward.",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // === GRATITUDE/THANKS ===
  if (/\b(thank(s|you)|appreciate|grateful)\b/.test(msg)) {
    return "You're very welcome. I'm glad I could help. Remember, I'm here whenever you need to talk. How are you feeling now?"
  }

  // === GOODBYE ===
  if (/\b(bye|goodbye|see\s*ya|later|gotta\s*go|have\s*to\s*go)\b/.test(msg)) {
    return "Take care of yourself. Remember, I'm always here when you need to talk. You're not alone. Stay strong."
  }

  // === REJECTION ===
  if (/\b(reject(ed|ion)?|turned\s*down|said\s*no|didn'?t\s*want\s*me)\b/.test(msg)) {
    return "Rejection stings, there's no way around it. It can feel personal and make you question your worth. But here's what you need to remember: rejection is often about fit, timing, or circumstances - not about your value as a person. Every successful person has been rejected many times. What matters is how you respond. You can either let it defeat you or use it to build resilience. What were you rejected from, and how are you processing it?"
  }

  // === EMBARRASSMENT/SHAME ===
  if (/\b(embarrass(ed|ing|ment)?|ashamed|humiliat(ed|ing)|mortified|awkward)\b/.test(msg)) {
    return "Embarrassment feels awful in the moment, but here's some perspective: whatever happened will fade from people's minds much faster than you think. Everyone has embarrassing moments - it's part of being human. What matters is how you handle it. Can you laugh at yourself? Move on with grace? In a week, this will matter so much less. What happened that's making you feel this way?"
  }

  // === GUILT ===
  if (/\b(guilt(y)?|feel\s*bad\s*about|regret|shouldn'?t\s*have)\b/.test(msg)) {
    return "Guilt can be a useful emotion if it prompts you to make things right, but it becomes destructive if you just dwell in it. Ask yourself: did you hurt someone? Can you apologize or make amends? If yes, do it. If you already have, then forgive yourself and move forward. Guilt that just sits there without action doesn't help anyone. What are you feeling guilty about?"
  }

  // === TRAUMA/PTSD ===
  if (/\b(trauma|traumatic|ptsd|flashback|can'?t\s*forget|haunts?\s*me)\b/.test(msg)) {
    return "If you've experienced trauma, I want you to know that what you're feeling is a normal response to something abnormal that happened to you. Trauma affects how your brain processes events, and it's not something you can just 'get over.' You deserve professional support to process and heal from this. Please consider reaching out to a therapist who specializes in trauma. You don't have to carry this alone, and healing is possible. Can you share what you're comfortable with?"
  }

  // === TRUST ISSUES ===
  if (/\b(trust|can'?t\s*trust|don'?t\s*trust|betrayed|lied\s*to)\b/.test(msg)) {
    return "Trust is fragile and precious. When it's broken, it's natural to feel guarded. But here's the balance: not everyone will hurt you, even though someone did. While it's wise to be cautious, don't let past betrayals prevent you from building new, healthy relationships. Trust is rebuilt slowly through consistent, honest actions. What happened that broke your trust?"
  }

  // === PERFECTIONISM ===
  if (/\b(perfect(ion(ism|ist)?)?|flawless|need\s*to\s*be\s*perfect|can'?t\s*make\s*mistakes)\b/.test(msg)) {
    return "Perfectionism is exhausting and impossible - because perfection doesn't exist. Striving for excellence is great, but demanding perfection from yourself leads to anxiety, burnout, and never feeling good enough. Here's a powerful truth: mistakes and imperfections are how we learn and grow. Give yourself permission to be human, to mess up, to learn. What's driving your need to be perfect?"
  }

  // === PEER PRESSURE & FITTING IN ===
  if (/\b(peer\s*pressure|everyone\s*else|fit\s*in|fitting\s*in|they\s*want\s*me|friends\s*are\s*pressuring|my\s*friends\s*want|friends\s*pressuring|cool\s*kids|popular)\b/.test(msg)) {
    const peerResponses = [
      "Peer pressure is real, and I won't pretend it's easy to resist. When everyone around you is doing something, saying no can feel impossible. But here's what I've learned: the people pressuring you are often doing things they don't actually want to do either - they're just scared of being left out too. Real strength is knowing who you are and what you stand for, even when it's unpopular. The friends worth keeping will respect you for that. What are they pressuring you to do?",
      "Fitting in can feel like survival, especially in school or social settings. But let me ask you something: the 'you' that everyone wants you to become - is that who you actually want to be? Your identity, your values, your future - those are yours to define, not anyone else's. Five years from now, will you be proud of going along with the crowd, or proud that you stayed true to yourself? What's the situation you're facing?",
      "I hear you. The pressure to belong is one of the strongest human needs. But here's something most people learn too late: compromising who you are to fit in never actually makes you feel like you belong - it just makes you feel like a fraud. The right people will accept the real you. The wrong people aren't worth changing for. What are people around you pushing you toward? Let's talk about how to handle it.",
      "Peer pressure is especially hard when the people doing the pressuring are your friends. You don't want to lose them, but you also don't want to do something that goes against who you are. Here's the truth: real friends don't make you feel bad for having boundaries. They don't pressure you into things you're uncomfortable with. If your 'friends' can't respect your no, they might not be the right friends. What's happening with your friend group?",
    ]
    return peerResponses[Math.floor(Math.random() * peerResponses.length)]
  }

  // === JEALOUSY/ENVY ===
  if (/\b(jealous|envy|envious|wish\s*i\s*was|wish\s*i\s*had)\b/.test(msg)) {
    return "Jealousy shows you what you value or desire, which can be useful information. But dwelling in envy makes you miserable. Here's the truth: everyone's journey is different, and what you see of others' lives - especially on social media - is usually just the highlight reel, not reality. Instead of comparing, focus on your own path and progress. What are you feeling envious of?"
  }

  // === PROCRASTINATION ===
  if (/\b(procrast(inat(e|ing|ion))?|putting\s*off|can'?t\s*start|avoid(ing)?)\b/.test(msg) && msg.length > 15) {
    return "Procrastination usually isn't about laziness - it's often about fear, overwhelm, or perfectionism. We avoid things that make us anxious or that we don't know how to approach. The cure? Break the task into tiny, manageable steps and just start with one. Even 5 minutes of progress breaks the cycle. What are you procrastinating on, and what's really holding you back from starting?"
  }

  // === FEELING STUCK ===
  if (/\b(stuck|trapped|can'?t\s*move\s*forward|going\s*nowhere)\b/.test(msg)) {
    return "Feeling stuck is frustrating because you want change but don't see a path forward. Here's a question to consider: what's one small thing you could change or try, even if it feels insignificant? Sometimes momentum starts with tiny shifts. Also, talking to someone with a different perspective might reveal options you can't see. What area of life feels stuck for you?"
  }

  // === COMPARISON ===
  if (/\b(compar(e|ing|ison)|everyone\s*else|better\s*than\s*me)\b/.test(msg) && msg.length > 15) {
    return "Comparison really is the thief of joy. You're comparing your behind-the-scenes to everyone else's highlight reel. Social media makes this worse because people only post their best moments. Remember: everyone struggles, everyone has insecurities, everyone faces challenges. Your only comparison should be with who you were yesterday. Are you growing? That's what matters. What are you comparing yourself to?"
  }

  // === LACK OF MOTIVATION ===
  if (/\b(no\s*motivation|don'?t\s*care|can'?t\s*be\s*bothered|unmotivated|apathetic)\b/.test(msg)) {
    return "Lack of motivation can be a sign of depression, burnout, or just being disconnected from your purpose. Ask yourself: what did you used to care about? What brought you joy? Sometimes we need to rest and recharge before motivation returns. Other times, we need to reconnect with our 'why' - the reason behind what we're doing. What's draining your motivation?"
  }

  // === TOXIC FRIENDSHIPS ===
  if (/\b(toxic\s*friend|fake\s*friend|bad\s*friend|using\s*me)\b/.test(msg)) {
    return "Toxic friendships drain you rather than lift you up. Real friends support you, respect you, and bring out the best in you. If a friendship consistently makes you feel bad, anxious, or used, it might be time to create distance or end it. You deserve people in your life who value you. What's been happening in this friendship that feels toxic?"
  }

  // === SOCIAL ANXIETY ===
  if (/\b(social\s*anxiety|afraid\s*of\s*people|scared\s*to\s*talk|shy)\b/.test(msg)) {
    return "Social anxiety is common, and it's not your fault. Your brain is overestimating social threats and underestimating your ability to handle them. The good news? Social anxiety can improve with practice and sometimes therapy. Start small: make eye contact, smile, say hello. Build gradually. Most people are focused on themselves, not judging you. What social situations make you most anxious?"
  }

  // === PARENTS DIVORCING ===
  if (/\b(divorce|parents\s*separat(ing|ed)|parents\s*splitting)\b/.test(msg)) {
    return "I'm sorry you're going through this. Divorce is hard on everyone, especially kids, and it's okay to feel sad, angry, confused, or all of the above. Remember: this is not your fault. Their relationship problems are between them, not because of you. It's okay to love both parents. Your feelings are valid, and it's important to talk to someone you trust about what you're experiencing. How are you coping with this?"
  }

  // === FINANCIAL STRESS ===
  if (/\b(money|financial|can'?t\s*afford|poor|broke)\b/.test(msg) && msg.length > 15) {
    return "Financial stress is heavy, especially when you feel powerless to change it. If your family is struggling financially, remember that your worth isn't tied to money. Many successful people came from difficult financial situations. Focus on what you can control: your education, your work ethic. If you need specific resources, talk to a school counselor - they often know about programs that can help. What's the financial concern you're facing?"
  }

  // === IDENTITY/WHO AM I ===
  if (/\b(who\s*am\s*i|identity|don'?t\s*know\s*myself|finding\s*myself)\b/.test(msg)) {
    return "Questioning who you are is a natural and important part of growing up. It's actually a sign of self-awareness. You're not expected to have it all figured out right now. Identity develops over time through experiences, relationships, and reflection. Try new things, explore different interests, pay attention to what makes you feel alive and authentic. Who you are isn't a destination - it's an ongoing journey. What aspect of your identity are you questioning?"
  }

  // === LGBTQ+ QUESTIONS ===
  if (/\b(gay|lesbian|bi(sexual)?|trans(gender)?|queer|sexuality|gender|coming\s*out)\b/.test(msg)) {
    return "Questions about sexuality and gender are deeply personal, and wherever you are in that journey, you deserve support and respect. It's okay to question, to be unsure, to explore these parts of yourself. Your identity is valid no matter what it is. If you need support, consider reaching out to organizations like The Trevor Project (1-866-488-7386) or PFLAG. You're not alone. What are you navigating right now?"
  }

  // === RACISM/DISCRIMINATION ===
  if (/\b(racism|racist|discriminat(ion|ed)|prejudice|because\s*of\s*my\s*race)\b/.test(msg)) {
    return "I'm sorry you're experiencing racism or discrimination. That's wrong, and you deserve to be treated with dignity and respect. Racism is a systemic issue, and it's not your burden to carry alone. Please document incidents, report them to authorities if you feel safe doing so, and surround yourself with people who affirm your worth. You are valuable, and your voice matters. What happened?"
  }

  // === CHRONIC ILLNESS/DISABILITY ===
  if (/\b(chronic|illness|disability|disabled|sick|disease|condition)\b/.test(msg) && msg.length > 20) {
    return "Living with a chronic illness or disability is challenging in ways others may not understand. It affects not just your body, but your mental and emotional health too. Please be patient and compassionate with yourself. Reach out to support groups where others understand what you're going through. You're incredibly strong for managing this every day. How is it affecting you right now?"
  }

  // === GRIEF/LOSS ===
  if (/\b(grief|grieving|died|death|lost\s*(my|someone)|passed\s*away)\b/.test(msg)) {
    return "I'm so sorry for your loss. Grief is one of the most profound human experiences, and there's no right way to grieve. Allow yourself to feel whatever comes - sadness, anger, numbness, confusion. It's all valid. Grief doesn't have a timeline. Please lean on people who care about you, and consider talking to a grief counselor if it becomes overwhelming. The pain won't disappear, but it will become more manageable with time. Who did you lose?"
  }

  // === FEELING OVERWHELMED ===
  if (/\b(overwhelm(ed|ing)?|too\s*much|can'?t\s*handle)\b/.test(msg)) {
    return "When everything feels like too much, it's time to pause and prioritize. You can't do everything at once, and that's okay. Take a breath. What's the most urgent thing that needs your attention? Focus on just that one thing. Everything else can wait. Break tasks into tiny steps. Ask for help. And remember, it's okay to say no sometimes. What's overwhelming you most right now?"
  }

  // === INSECURITY ===
  if (/\b(insecure|self.?conscious|doubt\s*myself)\b/.test(msg)) {
    return "Insecurity is something everyone experiences, even people who seem confident. It comes from focusing on our perceived flaws while ignoring our strengths. Here's a challenge: list three things you're genuinely good at or proud of. Your insecurity doesn't define you - your actions and character do. What specifically are you feeling insecure about?"
  }

  // Default - Warm, varied, human-feeling supportive responses (never repeat)
  const genericResponses = [
    "Thank you for trusting me with that. It takes courage to open up, and I don't take it lightly. I'm fully here with you. Can you tell me more about what's going on? I want to really understand what you're experiencing.",
    "I hear you, and I want you to know this is a safe space - no judgment here. Whatever you're carrying right now, you don't have to carry it alone. What's been weighing on you the most?",
    "What you're sharing matters, and so do YOU. Sometimes putting things into words helps us see them more clearly. Tell me more about what's happening in your life right now.",
    "I'm here, and I'm not going anywhere. Sometimes just knowing someone is in your corner makes a difference. Talk to me - what's on your mind?",
    "I appreciate you reaching out to me. That takes strength, honestly. Help me understand what you're going through so I can be actually helpful. What's the situation?",
    "You took the step to reach out, and that already shows self-awareness. I'm fully present for you right now. What's the thing sitting heaviest on your heart?",
    "Hey, I'm glad you're here. Whatever brought you to me today, I want to listen and help however I can. What's going on in your world right now?",
    "I'm listening with my full attention. No judgment, no rushing. This is your space to share whatever you need to. What would you like to talk about?",
    "Sometimes life gets heavy and we just need someone to hear us. I'm that person right now for you. Share what's on your mind - I'm here for it.",
    "You've come to the right place. Whatever you're dealing with, talking about it is the first step. What's been happening?",
  ]
  // Use conversation history length to avoid immediate repeats
  const historyLength = history.length || 0
  return genericResponses[(historyLength + Math.floor(Math.random() * (genericResponses.length - 1))) % genericResponses.length]
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const userMessage = body.message
    const sessionId = body.sessionId || "default" // Ensure sessionId is handled
    const history = getConversationHistory(sessionId) // Get history using sessionId

    // Validate input
    if (!userMessage || typeof userMessage !== "string" || userMessage.trim() === "") {
      return NextResponse.json(
        {
          error: "Message is required",
          response: "I didn't receive your message. Could you try typing it again?",
        },
        { status: 400 },
      )
    }

    const userMessageTrimmed = userMessage.trim()
    const userMessageLower = userMessageTrimmed.toLowerCase()

    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }

    const crisisResponse = detectCrisis(userMessageLower)
    if (crisisResponse) {
      saveToHistory(sessionId, userMessageTrimmed, crisisResponse) // Use trimmed message
      return NextResponse.json({ response: crisisResponse })
    }

    // Use the local smart response engine directly for the demo —
    // this guarantees varied, topic-matched, empathetic responses every time
    // without depending on Gemini API availability or quota.
    const smartResponse = getSmartResponse(userMessageTrimmed, history)
    saveToHistory(sessionId, userMessageTrimmed, smartResponse)
    return NextResponse.json({ response: smartResponse })
  } catch (error: any) {
    console.error("API route error:", error)
    return NextResponse.json(
      {
        response:
          "I'm having a bit of trouble right now. Can you try sending that message again? I'm here and want to help.",
      },
      { status: 500 },
    )
  }
}
