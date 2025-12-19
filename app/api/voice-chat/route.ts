import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

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

// Crisis detection - always check this first
function detectCrisis(input: string): string | null {
  const msg = input.toLowerCase()
  if (
    /\b(suicid|kill\s*(myself|me)|want\s*to\s*die|end\s*(my\s*life|it\s*all)|self.?harm|hurt\s*myself|no\s*reason\s*to\s*live)\b/.test(
      msg,
    )
  ) {
    return "I'm really worried about you right now, and I'm so glad you trusted me enough to share this. What you're feeling is serious, and you truly deserve professional support. Please reach out to the 988 Suicide and Crisis Lifeline immediately - you can call or text 988 anytime, 24/7. You can also text HOME to 741741 to connect with a trained crisis counselor. These are real people who genuinely want to help you through this moment. Your life has value, and there are people who care deeply about your wellbeing."
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

  // === ANXIETY & STRESS ===
  if (
    /\b(anxious|anxiety|panic(king|ked|attack)?|stressed|stress|overwhelm(ed|ing)?|nervous|worried|worry(ing)?|tense|on\s*edge)\b/.test(
      msg,
    )
  ) {
    const responses = [
      "First, let's take a slow, deep breath together. Anxiety can feel overwhelming, but you're safe right now. What you're experiencing is your body's stress response, and there are ways to calm it. Have you tried any grounding techniques? Here's one: name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This brings you back to the present moment. Now, what specifically is causing this anxiety? Let's talk through it calmly.",
      "I can feel the weight of what you're carrying. Stress and anxiety are exhausting, both mentally and physically. You don't have to carry this alone. Let's break things down together - what's the biggest source of your stress right now? Sometimes when we name our fears and worries out loud, they become more manageable. And remember, you can't control everything, but you can control how you respond. What support do you need to manage this better?",
      "Anxiety often feels like everything is happening at once and you can't catch your breath. Let me remind you of something important: you've survived every difficult day before this, and you'll survive this one too. Take things one moment, one task, one breath at a time. What immediate step can you take right now to reduce your stress? And what's been helping you cope, even just a little?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // === DEPRESSION & SADNESS ===
  if (/\b(sad|depress(ed|ion)?|down|low|unhappy|miserable|empty|numb|hopeless|worthless)\b/.test(msg)) {
    const responses = [
      "I'm truly sorry you're feeling this way, and I want you to know these feelings, while heavy, don't have to be permanent. Depression can make everything feel meaningless and exhausting, but you deserve support and you can feel better. If you've been feeling this way for more than two weeks, it's really important to talk to a professional - a counselor, therapist, or doctor. They can provide real tools and support to help you heal. For now, please be gentle with yourself. Do small things: get outside for a few minutes, reach out to someone you trust, or just acknowledge that you're struggling and that's okay. What's been weighing on you most?",
      "Those feelings of sadness and emptiness are incredibly hard to carry. I want you to hear this clearly: you matter, your life has value, and these dark feelings will not last forever, even though they feel endless right now. Depression is a real condition that needs real support. Please consider reaching out to a mental health professional who can help you work through this. In the meantime, try to practice small acts of self-care and stay connected to people who care about you, even when you don't feel like it. What do you think triggered these feelings?",
      "I hear the pain in your words, and I don't take it lightly. Feeling hopeless or worthless is a sign that you need more support than I can provide alone. Please, talk to a trusted adult or call a mental health helpline. You don't have to fight this alone, and with the right help, you can feel hopeful again. What's one small thing you can do today to take care of yourself?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // === LONELINESS & ISOLATION ===
  if (/\b(lonely|alone|isolated|no\s*(one|body)|no\s*friends|left\s*out|excluded|nobody\s*cares)\b/.test(msg)) {
    const lonelinessResponses = [
      "Loneliness is one of the most painful human experiences, and I'm truly sorry you're feeling this way. But I want you to hear something important: feeling alone doesn't mean you are alone. There are people who would care if they knew you were struggling - sometimes we just haven't found them yet. Connection starts with small steps: joining a club or activity you're interested in, volunteering, or even just saying hello to someone new. Shared interests naturally lead to friendships. You deserve meaningful connections. What activities or interests light you up? That might be where your people are.",
      "I hear you, and I want you to know that this feeling is temporary, even though it doesn't feel like it now. Everyone experiences loneliness sometimes, but it doesn't have to define your life. Here's a gentle challenge: reach out to someone - even if it's just to say hi. Sometimes we assume people don't care, but often they just don't know we need them. Also, consider what you can offer others - kindness, humor, support. When we give, we often receive connection in return. What's been keeping you from reaching out to people?",
      "Isolation hurts deeply, and I don't want you to stay in that place. Let me share something: the best remedy for loneliness is gradual connection. Start small - smile at someone, ask a question, join an online community around something you love. Connection builds slowly, but it builds. And please remember, your worth isn't determined by how many friends you have. You are valuable as you are. What's one small step you could take this week toward connection?",
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

  // === FAMILY ISSUES ===
  if (
    /\b(family|parent(s)?|mom|dad|mother|father|sibling|brother|sister|home)\b/.test(msg) &&
    !/everybody|someone'?s\s*family/.test(msg) &&
    !/hit|beat|abuse/.test(msg)
  ) {
    const responses = [
      "Family dynamics can be incredibly complicated because we can't choose our families, and emotions run deep. What's happening at home that's troubling you? Remember, you can't control how your family members act, but you can control how you respond and protect your own well-being. If things at home are toxic or unsafe, please reach out to a trusted adult outside your family who can help.",
      "I hear that things are difficult at home. Family issues are tough because those relationships are so close and intertwined with our sense of security. What specifically is going on? And is there anyone else - an aunt, uncle, teacher, or counselor - you can talk to about this? Sometimes getting perspective from outside the situation helps.",
      "Home is supposed to be a safe, supportive place, and I'm sorry it's not feeling that way for you right now. What's the main issue you're dealing with? Is it conflict? Lack of understanding? Pressure? Whatever it is, remember that this situation is temporary. You're growing and gaining independence. In the meantime, how can you create small spaces of peace for yourself?",
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

  // === PEER PRESSURE ===
  if (/\b(peer\s*pressure|everyone\s*else|fit\s*in|they\s*want\s*me\s*to)\b/.test(msg)) {
    return "Peer pressure is real and powerful, especially when you're trying to fit in. But here's what takes real courage: being yourself even when it's unpopular. The people who pressure you to do things you're uncomfortable with aren't real friends. Real friends respect your boundaries and values. What are people pressuring you to do? And what do you actually want?"
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

  // Default - General supportive response
  const genericResponses = [
    "I'm here to listen. Tell me more about what you're going through.",
    "That sounds important. Can you share more details so I can better understand and support you?",
    "I'm here for you. What's weighing on your mind?",
    "I want to understand what you're experiencing. Can you tell me more?",
  ]
  return genericResponses[Math.floor(Math.random() * genericResponses.length)]
}

// Fallback function for when Gemini API fails or returns incomplete response
function getFallbackResponse(message: string): { message: string; source: string } {
  const history = [] // In fallback, we don't have access to the same session history as the main logic
  const response = getSmartResponse(message, history)
  return { message: response, source: "fallback" }
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

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" })

    try {
      const contextPrompt =
        history.length > 0
          ? `Previous conversation:\n${history.map((h: any) => `User: ${h.user}\nHamboi: ${h.bot}`).join("\n\n")}\n\nCurrent message:\n`
          : ""

      const systemPrompt = `You are Hamboi, a calm, wise, and compassionate mental health companion for teenagers. Your role is to:

- Listen deeply and validate their feelings without judgment
- Be a mentor, guide, and supportive friend who genuinely cares
- Speak in a warm, reassuring, mature yet relatable tone
- Offer practical, actionable advice and coping strategies
- Provide specific steps or suggestions when asked for help
- Encourage self-reflection and personal growth
- Always remind them that professional help is available when needed
- Give thorough, complete responses that fully address their question (aim for 2-4 sentences minimum)
- When asked about study/academic improvement, provide specific techniques and strategies

Remember: You're not a therapist, but a caring mentor who helps teens feel heard, understood, and supported. Be conversational but complete in your answers.

${contextPrompt}User: ${userMessageTrimmed}

Hamboi's response (be thorough and helpful):`

      const result = await model.generateContent(systemPrompt)
      const response = await result.response
      const aiResponse = response.text()

      if (aiResponse && aiResponse.length > 10) {
        saveToHistory(sessionId, userMessageTrimmed, aiResponse) // Use trimmed message
        return NextResponse.json({ response: aiResponse.trim() })
      }

      // If Gemini response is too short, fall back
      console.log("[v0] Gemini response too short, using fallback")
      const fallbackResult = getFallbackResponse(userMessageLower)
      saveToHistory(sessionId, userMessageTrimmed, fallbackResult.message) // Use trimmed message
      return NextResponse.json({ response: fallbackResult.message })
    } catch (error: any) {
      console.error("Gemini API error:", error.message || error)
      // If Gemini API fails, use the smart response fallback
      const fallbackResult = getFallbackResponse(userMessageLower)
      saveToHistory(sessionId, userMessageTrimmed, fallbackResult.message) // Use trimmed message
      return NextResponse.json({ response: fallbackResult.message })
    }
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
