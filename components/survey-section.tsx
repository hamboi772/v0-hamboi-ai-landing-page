"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  id: number
  from: "hamboi" | "user"
  text: string
  delay?: number
}

interface Question {
  id: number
  message: string
  replies: { text: string; value: string }[]
}

interface Persona {
  id: string
  name: string
  emoji: string
  tagline: string
  description: string
  color: string
  features: string[]
  message: string
}

// ─── Questions ────────────────────────────────────────────────────────────────
const QUESTIONS: Question[] = [
  {
    id: 1,
    message: "Real talk — when something is stressing you out, what do you usually do? 👀",
    replies: [
      { text: "Keep it in and act like I'm fine 😶", value: "internalize" },
      { text: "Distract myself with my phone or music 🎧", value: "distract" },
      { text: "Talk to someone I trust 💬", value: "social" },
      { text: "I honestly don't know 🤷", value: "unsure" },
    ],
  },
  {
    id: 2,
    message: "How's school or life pressure been lately? Be honest with me 🙏",
    replies: [
      { text: "It's a lot. I'm barely keeping up 😮‍💨", value: "overwhelmed" },
      { text: "Stressful but I'm managing somehow 😤", value: "coping" },
      { text: "It comes and goes tbh 🌤️", value: "mixed" },
      { text: "Actually doing okay rn 🙂", value: "okay" },
    ],
  },
  {
    id: 3,
    message: "When you're having a bad day, what do you need most? 💭",
    replies: [
      { text: "Someone to just listen, no advice 🫂", value: "listened" },
      { text: "Practical tips to feel better fast ⚡", value: "practical" },
      { text: "To be left alone until I'm ready 🌙", value: "space" },
      { text: "Honestly just distraction 📱", value: "distraction" },
    ],
  },
  {
    id: 4,
    message: "Last one — do you feel like people around you actually understand what you go through? 🤔",
    replies: [
      { text: "Not at all. I feel invisible sometimes 😔", value: "unseen" },
      { text: "Maybe one or two people get it 🤏", value: "few" },
      { text: "Sort of, but it's complicated 😶‍🌫️", value: "complicated" },
      { text: "Yeah I have good people around me 💜", value: "supported" },
    ],
  },
]

// ─── Personas ─────────────────────────────────────────────────────────────────
const PERSONAS: Record<string, Persona> = {
  "the-quiet-fighter": {
    id: "the-quiet-fighter",
    name: "The Quiet Fighter",
    emoji: "🌊",
    tagline: "You carry more than people realise.",
    color: "#6366f1",
    description:
      "You deal with a lot internally — keeping things together on the outside while processing everything alone. You're stronger than you think, but you deserve support too.",
    features: ["Daily check-ins", "Private journal", "Breathing exercises"],
    message: "Hamboi was built for people like you. A safe space that doesn't judge — just listens.",
  },
  "the-resilient-one": {
    id: "the-resilient-one",
    name: "The Resilient One",
    emoji: "🔥",
    tagline: "You keep going even when it's hard.",
    color: "#f97316",
    description:
      "Life throws a lot at you but you find a way through it. You're not unaffected — you're just built different. The right tools can help you go from surviving to thriving.",
    features: ["Streak tracking", "Daily missions", "XP & level system"],
    message: "Your consistency deserves to be rewarded. Hamboi turns your daily effort into progress you can actually see.",
  },
  "the-overthinker": {
    id: "the-overthinker",
    name: "The Overthinker",
    emoji: "🌀",
    tagline: "Your mind never really switches off.",
    color: "#a855f7",
    description:
      "You feel things deeply and your brain is always running. Sometimes that's a superpower — sometimes it keeps you up at night. You need an outlet, not more advice.",
    features: ["Talk to Hamboi AI", "Journaling prompts", "Grounding exercises"],
    message: "Hamboi gives your thoughts somewhere to go — so they don't stay stuck in your head.",
  },
  "the-social-soul": {
    id: "the-social-soul",
    name: "The Social Soul",
    emoji: "💬",
    tagline: "Connection is how you heal.",
    color: "#22c55e",
    description:
      "You process things by talking, sharing, and being around people. When you feel disconnected, everything feels harder. You thrive when you have community.",
    features: ["Community leaderboard", "Referral challenges", "Shared badges"],
    message: "Hamboi's community was made for you — grow together with other Nigerian teens who get it.",
  },
  "the-grounded-one": {
    id: "the-grounded-one",
    name: "The Grounded One",
    emoji: "🌿",
    tagline: "You know yourself better than most.",
    color: "#4ade80",
    description:
      "You're in a decent place and you know what keeps you stable. You're not looking for a fix — just tools to stay consistent and keep growing.",
    features: ["Weekly challenges", "Growth tracking", "Wellness check-ins"],
    message: "Hamboi helps you build on what's already working — and stay that way.",
  },
}

// ─── Persona logic ────────────────────────────────────────────────────────────
function getPersona(answers: string[]): Persona {
  const has = (v: string) => answers.includes(v)

  if (has("internalize") && (has("unseen") || has("overwhelmed"))) return PERSONAS["the-quiet-fighter"]
  if (has("social") || has("supported")) return PERSONAS["the-social-soul"]
  if (has("distract") && (has("few") || has("unseen"))) return PERSONAS["the-overthinker"]
  if (has("coping") || has("mixed")) return PERSONAS["the-resilient-one"]
  if (has("okay") && has("supported")) return PERSONAS["the-grounded-one"]

  // fallback by most common pattern
  if (answers.filter(a => ["internalize", "unseen", "space"].includes(a)).length >= 2)
    return PERSONAS["the-quiet-fighter"]
  if (answers.filter(a => ["practical", "distract", "distraction"].includes(a)).length >= 2)
    return PERSONAS["the-overthinker"]

  return PERSONAS["the-resilient-one"]
}

// ─── Typing bubble ────────────────────────────────────────────────────────────
function TypingBubble() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
      <div style={avatarStyle}>H</div>
      <div style={{ background: "#1e1535", borderRadius: "18px 18px 18px 4px", padding: "12px 16px", display: "flex", gap: 5, alignItems: "center" }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 7, height: 7, borderRadius: "50%", background: "#7c6fa0",
            animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
    </div>
  )
}

const avatarStyle: React.CSSProperties = {
  width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
  background: "linear-gradient(135deg,#7C3AED,#a855f7)",
  display: "flex", alignItems: "center", justifyContent: "center",
  fontSize: 13, fontWeight: 900, color: "white",
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function SurveySection() {
  const [stage, setStage] = useState<"intro" | "chat" | "result">("intro")
  const [messages, setMessages] = useState<Message[]>([])
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [canReply, setCanReply] = useState(false)
  const [persona, setPersona] = useState<Persona | null>(null)
  const [resultVisible, setResultVisible] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const msgId = useRef(0)

  const addMsg = (msg: Omit<Message, "id">) => {
    msgId.current += 1
    setMessages(prev => [...prev, { ...msg, id: msgId.current }])
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, isTyping])

  const startChat = () => {
    setStage("chat")
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      addMsg({ from: "hamboi", text: "Hey 👋 I'm Hamboi. I just want to get to know you a little — no wrong answers here." })
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          addMsg({ from: "hamboi", text: QUESTIONS[0].message })
          setCanReply(true)
        }, 1400)
      }, 800)
    }, 1200)
  }

  const handleReply = (reply: { text: string; value: string }) => {
    if (!canReply) return
    setCanReply(false)

    addMsg({ from: "user", text: reply.text })
    const newAnswers = [...answers, reply.value]
    setAnswers(newAnswers)

    const nextQ = currentQ + 1

    if (nextQ >= QUESTIONS.length) {
      // Done — show persona
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        addMsg({ from: "hamboi", text: "Okay I think I get you now 💜 Give me a sec..." })
        setTimeout(() => {
          const result = getPersona(newAnswers)
          setPersona(result)
          setStage("result")
          setTimeout(() => setResultVisible(true), 300)
        }, 1600)
      }, 1200)
    } else {
      // Next question
      setIsTyping(true)

      // Occasional acknowledgement
      const acks = ["Got it 🙏", "Okay, real 💜", "I hear you.", "Thanks for being honest 🫂", "Noted 💜"]
      const useAck = Math.random() > 0.4

      setTimeout(() => {
        if (useAck) {
          setIsTyping(false)
          addMsg({ from: "hamboi", text: acks[Math.floor(Math.random() * acks.length)] })
          setTimeout(() => {
            setIsTyping(true)
            setTimeout(() => {
              setIsTyping(false)
              addMsg({ from: "hamboi", text: QUESTIONS[nextQ].message })
              setCurrentQ(nextQ)
              setCanReply(true)
            }, 1300)
          }, 600)
        } else {
          setTimeout(() => {
            setIsTyping(false)
            addMsg({ from: "hamboi", text: QUESTIONS[nextQ].message })
            setCurrentQ(nextQ)
            setCanReply(true)
          }, 1300)
        }
      }, 1000)
    }
  }

  const reset = () => {
    setStage("intro")
    setMessages([])
    setAnswers([])
    setCurrentQ(0)
    setIsTyping(false)
    setCanReply(false)
    setPersona(null)
    setResultVisible(false)
    msgId.current = 0
  }

  return (
    <section className="py-20 px-4 bg-background border-t border-border">
      <div className="max-w-2xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 border px-4 py-2 text-sm font-bold mb-6" style={{ borderColor: "rgba(255, 255, 255, 0.07)", color: "#8B8B8B" }}>
            💬 Find your Hamboi type
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-5 leading-tight">
            What kind of person are you really?
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#8B8B8B" }}>
            4 quick questions. Hamboi chats with you, then shows you your mental health type — and exactly how the app was built for you.
          </p>
        </div>

        {/* ── Intro card ── */}
        {stage === "intro" && (
          <div style={{
            background: "#0F1219", border: "1px solid rgba(255, 255, 255, 0.07)",
            borderRadius: 0, padding: "40px 32px", textAlign: "center",
            boxShadow: "none",
          }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>💜</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "#F5F5F5", marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>
              Talk to Hamboi
            </h3>
            <p style={{ fontSize: 14, color: "#8B8B8B", lineHeight: 1.7, marginBottom: 28, maxWidth: 340, margin: "0 auto 28px" }}>
              Answer 4 honest questions and find out your mental health persona — plus how Hamboi was designed specifically for someone like you.
            </p>
            <button
              onClick={startChat}
              style={{
                background: "#F5F5F5",
                color: "#06080F", border: "none", borderRadius: 0,
                padding: "14px 32px", fontSize: 15, fontWeight: 700,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                boxShadow: "none",
              }}
            >
              Start the conversation →
            </button>
            <p style={{ fontSize: 11, color: "#606060", marginTop: 16 }}>
              Anonymous · Takes about 1 minute · Not a diagnosis
            </p>
          </div>
        )}

        {/* ── Chat ── */}
        {stage === "chat" && (
          <div style={{
            background: "#0F1219", border: "1px solid rgba(255, 255, 255, 0.07)",
            borderRadius: 0, overflow: "hidden",
            boxShadow: "none",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {/* Chat header */}
            <div style={{ background: "#06080F", borderBottom: "1px solid rgba(255, 255, 255, 0.07)", padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={avatarStyle}>H</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#F5F5F5" }}>Hamboi</div>
                <div style={{ fontSize: 11, color: "#0CF2C8", display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#0CF2C8" }} />
                  Online
                </div>
              </div>
              <div style={{ marginLeft: "auto", fontSize: 12, color: "#606060" }}>
                {currentQ + 1}/{QUESTIONS.length}
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              style={{ height: 340, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column" }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    flexDirection: msg.from === "user" ? "row-reverse" : "row",
                    alignItems: "flex-end", gap: 8, marginBottom: 12,
                  }}
                >
                  {msg.from === "hamboi" && <div style={avatarStyle}>H</div>}
                  <div style={{
                    maxWidth: "72%",
                    background: msg.from === "hamboi" ? "#1A1D26" : "#F5F5F5",
                    color: msg.from === "hamboi" ? "#F5F5F5" : "#06080F",
                    borderRadius: 0,
                    padding: "11px 15px", fontSize: 14, lineHeight: 1.5, fontWeight: 500,
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && <TypingBubble />}
            </div>

            {/* Reply options */}
            <div style={{ borderTop: "1px solid #1e1535", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
              {canReply && QUESTIONS[currentQ]?.replies.map((r, i) => (
                <button
                  key={i}
                  onClick={() => handleReply(r)}
                  style={{
                    background: "transparent", border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: 0, padding: "11px 16px", textAlign: "left",
                    color: "#F5F5F5", fontSize: 13, fontWeight: 600, cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  {r.text}
                </button>
              ))}
              {!canReply && !isTyping && (
                <div style={{ textAlign: "center", fontSize: 12, color: "#606060", padding: "6px 0" }}>Hamboi is thinking...</div>
              )}
            </div>
          </div>
        )}

        {/* ── Result ── */}
        {stage === "result" && persona && (
          <div style={{
            opacity: resultVisible ? 1 : 0,
            transform: resultVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
            fontFamily: "'Nunito',sans-serif",
          }}>
            {/* Persona card */}
            <div style={{
              background: "#0F1219", border: "1px solid rgba(255, 255, 255, 0.07)",
              borderRadius: 0, overflow: "hidden",
              boxShadow: "none",
            }}>
              {/* Top banner */}
              <div style={{
                background: "#06080F",
                borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
                padding: "32px 24px", textAlign: "center",
              }}>
                <div style={{ fontSize: 56, marginBottom: 12 }}>{persona.emoji}</div>
                <div style={{ fontSize: 11, color: "#8B8B8B", textTransform: "uppercase", letterSpacing: 3, marginBottom: 6 }}>
                  Your Hamboi type
                </div>
                <h3 style={{ fontSize: 28, fontWeight: 700, color: "#F5F5F5", marginBottom: 8, fontFamily: "'Cormorant Garamond', serif" }}>{persona.name}</h3>
                <p style={{ fontSize: 16, color: "#0CF2C8", fontWeight: 600 }}>{persona.tagline}</p>
              </div>

              <div style={{ padding: "24px" }}>
                {/* Description */}
                <p style={{ fontSize: 14, color: "#8B8B8B", lineHeight: 1.8, marginBottom: 20, textAlign: "center" }}>
                  {persona.description}
                </p>

                {/* Hamboi message */}
                <div style={{
                  background: "#1A1D26", border: "1px solid rgba(255, 255, 255, 0.07)",
                  borderRadius: 0, padding: "16px", marginBottom: 20,
                  display: "flex", gap: 12, alignItems: "flex-start",
                }}>
                  <div style={avatarStyle}>H</div>
                  <div>
                    <div style={{ fontSize: 11, color: "#8B8B8B", marginBottom: 5 }}>Hamboi says</div>
                    <div style={{ fontSize: 14, color: "#F5F5F5", lineHeight: 1.6, fontStyle: "italic" }}>
                      "{persona.message}"
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 11, color: "#8B8B8B", textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>
                    Built for you in Hamboi
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {persona.features.map((f, i) => (
                      <div key={i} style={{
                        display: "flex", alignItems: "center", gap: 10,
                        background: "transparent", border: "1px solid rgba(255, 255, 255, 0.07)",
                        borderRadius: 0, padding: "10px 14px",
                      }}>
                        <div style={{ width: 8, height: 8, borderRadius: 0, background: "#0CF2C8", flexShrink: 0 }} />
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#F5F5F5" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <button
                  style={{
                    width: "100%", background: "#F5F5F5",
                    color: "#06080F", border: "none", borderRadius: 0, padding: "15px 0",
                    fontSize: 15, fontWeight: 700, cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: "none", marginBottom: 10,
                  }}
                  onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Try Hamboi free — made for you 💜
                </button>
                <button
                  onClick={reset}
                  style={{
                    width: "100%", background: "transparent",
                    border: "1px solid rgba(255, 255, 255, 0.07)", borderRadius: 0, padding: "12px 0",
                    fontSize: 13, fontWeight: 600, color: "#F5F5F5", cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Retake the quiz
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Crisis note */}
        <p className="text-center text-xs mt-8" style={{ color: "#8B8B8B" }}>
          This is not a diagnostic tool. If you&apos;re in crisis, call MANI Nigeria free on{" "}
          <span style={{ color: "#0CF2C8", fontWeight: 600 }}>0809 111 6264</span> (24/7).
        </p>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        button:active { opacity: 0.85; transform: scale(0.98); }
      `}</style>
    </section>
  )
}
