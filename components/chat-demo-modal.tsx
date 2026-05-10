"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { X, Loader2, Send, MessageSquare, ShieldCheck, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@supabase/supabase-js"
import { motion, AnimatePresence } from "framer-motion"

function getSupabaseClient() {
  if (typeof window === "undefined") return null
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

interface ChatDemoModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ConversationMessage {
  user: string
  ai: string
  timestamp: Date
}

function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export function ChatDemoModal({ isOpen, onClose }: ChatDemoModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [textInput, setTextInput] = useState("")
  const [conversation, setConversation] = useState<ConversationMessage[]>([])
  const [error, setError] = useState("")
  const [displayingMessage, setDisplayingMessage] = useState<{ text: string; index: number } | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const sessionIdRef = useRef<string>(generateSessionId())

  const textInputRef = useRef<HTMLTextAreaElement>(null)
  const conversationEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const getUser = async () => {
      const supabase = getSupabaseClient()
      if (!supabase) return
      const { data } = await supabase.auth.getUser()
      if (data.user) setUserId(data.user.id)
    }
    getUser()
  }, [])

  // Load last session when modal opens
  useEffect(() => {
    const loadLastSession = async () => {
      if (isOpen && userId) {
        try {
          const supabase = getSupabaseClient()
          if (!supabase) return

          const { data } = await supabase
            .from("chat_messages")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: true })
            .limit(100)

          if (data && data.length > 0) {
            const messages: ConversationMessage[] = []
            let currentUserMessage = ""

            for (const msg of data) {
              if (msg.role === "user") {
                currentUserMessage = msg.content
              } else if (msg.role === "assistant" && currentUserMessage) {
                messages.push({
                  user: currentUserMessage,
                  ai: msg.content,
                  timestamp: new Date(msg.created_at),
                })
                currentUserMessage = ""
              }
            }
            setConversation(messages)
          }
        } catch (err) {
          console.error("Error loading last session:", err)
        }
      }
    }
    loadLastSession()
  }, [isOpen, userId])

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation, displayingMessage])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textInputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setConversation([])
      setTextInput("")
      setError("")
      setDisplayingMessage(null)
    }
  }, [isOpen])

  const displayResponseWithTypewriter = (text: string, callback: () => void) => {
    let index = 0
    setDisplayingMessage({ text: "", index: 0 })
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayingMessage({ text: text.slice(0, index + 1), index })
        index++
      } else {
        clearInterval(interval)
        setDisplayingMessage(null)
        callback()
      }
    }, 20)
  }

  const handleTextSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    const userMessage = textInput.trim()
    if (!userMessage || isProcessing) return

    setIsProcessing(true)
    setError("")
    setTextInput("")

    const timestamp = new Date()
    setConversation([...conversation, { user: userMessage, ai: "", timestamp }])

    try {
      const res = await fetch("/api/voice-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          sessionId: sessionIdRef.current,
          userId: userId || undefined,
        }),
      })

      const data = await res.json()

      if (data.error) {
        setError(data.error === "quota-exceeded" ? "Limit reached. Try again later." : data.error)
        setIsProcessing(false)
        return
      }

      if (data.response) {
        displayResponseWithTypewriter(data.response, () => {
          setConversation((prev) => {
            const updated = [...prev]
            updated[updated.length - 1] = { user: userMessage, ai: data.response, timestamp }
            return updated
          })
          setIsProcessing(false)
        })
      } else {
        setError("No response. Try again.")
        setIsProcessing(false)
      }
    } catch (err) {
      setError("Something went wrong.")
      setIsProcessing(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl h-[85vh] glass-morphism border-white/10 rounded-[3rem] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-white/5 flex items-center justify-between relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-hamboi-purple/10 rounded-full blur-3xl" />

               <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 bg-hamboi-purple rounded-2xl flex items-center justify-center font-black text-white shadow-lg">H</div>
                  <div>
                    <h2 className="text-xl font-black text-white uppercase tracking-tight">Hamboi AI</h2>
                    <div className="flex items-center gap-2">
                       <span className="w-2 h-2 bg-hamboi-green rounded-full animate-pulse" />
                       <span className="text-[10px] font-black text-hamboi-green uppercase tracking-widest">Active Session</span>
                    </div>
                  </div>
               </div>

               <button onClick={onClose} className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/20 hover:text-white transition-colors relative z-10">
                  <X className="w-6 h-6" />
               </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scrollbar-hide">
              {conversation.length === 0 && (
                 <div className="h-full flex flex-col items-center justify-center text-center py-20">
                    <div className="w-20 h-20 bg-hamboi-purple/10 rounded-[2rem] flex items-center justify-center mb-8">
                       <Sparkles className="w-10 h-10 text-hamboi-purple" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Your safe space.</h3>
                    <p className="text-hamboi-text-muted text-sm font-medium max-w-xs mx-auto">Vent, share, or just talk. I'm here to listen without judgment.</p>
                 </div>
              )}

              {conversation.map((msg, idx) => (
                <div key={idx} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-end"
                  >
                    <div className="max-w-[85%] bg-hamboi-purple text-white p-5 rounded-[2rem] rounded-tr-none shadow-xl font-medium text-sm leading-relaxed">
                      {msg.user}
                    </div>
                  </motion.div>

                  <AnimatePresence>
                    {(msg.ai || (idx === conversation.length - 1 && (displayingMessage || isProcessing))) && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex justify-start"
                      >
                        <div className="max-w-[85%] glass-morphism border-hamboi-purple/20 p-6 rounded-[2rem] rounded-tl-none shadow-xl">
                          <p className="text-xs font-black text-hamboi-purple uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                             <Zap className="w-3 h-3 fill-current" />
                             Hamboi Response
                          </p>
                          <p className="text-white font-medium text-sm leading-relaxed">
                            {idx === conversation.length - 1 && displayingMessage
                              ? displayingMessage.text
                              : msg.ai || (isProcessing && (
                                 <span className="flex gap-1">
                                    {[0, 1, 2].map(i => <motion.span key={i} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }} className="w-1.5 h-1.5 bg-hamboi-purple rounded-full" />)}
                                 </span>
                              ))}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div ref={conversationEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-6 md:p-10 bg-white/5 border-t border-white/10 relative overflow-hidden">
               {error && (
                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                    <p className="text-xs font-black text-red-400 uppercase tracking-widest">{error}</p>
                 </motion.div>
               )}

               <div className="mb-6 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30">
                     <ShieldCheck className="w-3 h-3 text-hamboi-green" /> End-to-end Encrypted
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30">
                     <Zap className="w-3 h-3 text-hamboi-purple" /> Real-time AI
                  </div>
               </div>

               <form onSubmit={handleTextSubmit} className="relative max-w-3xl mx-auto">
                  <textarea
                    ref={textInputRef}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Tell me how you're really feeling..."
                    className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 pr-20 text-white font-medium focus:border-hamboi-purple outline-none resize-none min-h-[80px] max-h-[200px]"
                    disabled={isProcessing}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleTextSubmit()
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    disabled={!textInput.trim() || isProcessing}
                    className="absolute right-4 bottom-4 w-12 h-12 rounded-2xl bg-hamboi-purple hover:bg-hamboi-purple/90 text-white shadow-xl disabled:opacity-20 transition-all"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
               </form>

               <p className="mt-4 text-[9px] font-black text-white/20 uppercase tracking-[0.3em] text-center">
                 Hamboi is a support tool, not a clinical replacement.
               </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
