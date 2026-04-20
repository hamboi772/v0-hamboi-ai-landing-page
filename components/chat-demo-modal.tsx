"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { X, Loader2, Send, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
)

interface ChatDemoModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ConversationMessage {
  user: string
  ai: string
  timestamp: Date
}

// Stable session id per browser tab — generated once on mount
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

  // Get user on mount
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        setUserId(data.user.id)
      }
    }
    getUser()
  }, [])

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation, displayingMessage])

  // Load last session when modal opens and user is logged in
  useEffect(() => {
    const loadLastSession = async () => {
      if (isOpen && userId) {
        try {
          const { data } = await supabase
            .from("chat_messages")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: true })
            .limit(100)

          if (data && data.length > 0) {
            // Group messages by conversation (alternating user/assistant)
            const messages: ConversationMessage[] = []
            let currentUserMessage = ""
            let currentAiMessage = ""

            for (const msg of data) {
              if (msg.role === "user") {
                currentUserMessage = msg.content
              } else if (msg.role === "assistant" && currentUserMessage) {
                currentAiMessage = msg.content
                messages.push({
                  user: currentUserMessage,
                  ai: currentAiMessage,
                  timestamp: new Date(msg.created_at),
                })
                currentUserMessage = ""
                currentAiMessage = ""
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

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textInputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Typewriter effect for AI responses
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
    }, 25)
  }

  // Handle text submit
  const handleTextSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    const userMessage = textInput.trim()
    if (!userMessage || isProcessing) return

    setIsProcessing(true)
    setError("")
    setTextInput("")

    // Add user message to conversation immediately
    const timestamp = new Date()
    const tempConversation = [...conversation, { user: userMessage, ai: "", timestamp }]
    setConversation(tempConversation)

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
        setError(
          data.error === "quota-exceeded" ? "You have reached your message limit. Please try again later." : data.error,
        )
        setIsProcessing(false)
        return
      }

      if (data.response) {
        // Display with typewriter effect
        displayResponseWithTypewriter(data.response, () => {
          // Update conversation with full response
          setConversation((prev) => {
            const updated = [...prev]
            updated[updated.length - 1] = {
              user: userMessage,
              ai: data.response,
              timestamp,
            }
            return updated
          })
          setIsProcessing(false)
        })
      } else {
        setError("I didn't get a response. Please try again.")
        setIsProcessing(false)
      }
    } catch (err) {
      setError("Sorry, something went wrong. Please try again.")
      setIsProcessing(false)
    }
  }

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setConversation([])
      setTextInput("")
      setError("")
      setDisplayingMessage(null)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-hamboi-dark-bg via-[#1a1a3e] to-hamboi-dark-bg" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-3xl h-[95vh] bg-hamboi-dark-card border-2 border-hamboi-purple/40 backdrop-blur-lg rounded-3xl shadow-2xl shadow-hamboi-purple/30 grid grid-rows-[auto_1fr_auto] overflow-hidden">
        {/* Header - No longer sticky, just part of grid */}
        <div className="px-6 py-4 bg-[#0f0a1f] backdrop-blur-lg border-b border-hamboi-purple/40 rounded-t-3xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-hamboi-purple to-hamboi-green flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-white">Chat with Hamboi</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-hamboi-purple/20 text-hamboi-green hover:text-hamboi-green transition-colors"
              aria-label="Close chat"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Conversation Area - Uses flex-1 equivalent in grid */}
        <div className="overflow-y-auto px-6 py-4 space-y-4 bg-[#0f0a1f]">
          {conversation.length === 0 && !displayingMessage && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-hamboi-purple/30 to-hamboi-green/30 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-hamboi-green" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Start a conversation</h3>
              <p className="text-hamboi-text-muted max-w-md mx-auto">
                Share what's on your mind. Whether you're stressed, anxious, or just need someone to talk to, I'm here
                for you.
              </p>
            </div>
          )}

          {conversation.map((msg, idx) => (
            <div key={idx} className="space-y-4">
              {/* User message */}
              <div className="flex justify-end">
                <div className="bg-gradient-to-br from-hamboi-purple via-indigo-500 to-hamboi-blue text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-[80%] shadow-lg animate-gradient-shift">
                  <p className="text-sm leading-relaxed">{msg.user}</p>
                </div>
              </div>

              {/* AI response */}
              {(msg.ai || (idx === conversation.length - 1 && displayingMessage)) && (
                <div className="flex justify-start">
                  <div className="relative bg-gradient-to-br from-hamboi-purple/20 to-hamboi-green/20 rounded-2xl rounded-tl-sm px-5 py-3 max-w-[80%] shadow-lg border-2 border-hamboi-purple/40">
                    <p className="text-sm font-bold text-hamboi-green mb-1">
                      Hamboi
                    </p>
                    <p className="text-sm leading-relaxed text-white">
                      {idx === conversation.length - 1 && displayingMessage
                        ? displayingMessage.text
                        : msg.ai || (isProcessing && <Loader2 className="h-4 w-4 animate-spin text-hamboi-purple" />)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div ref={conversationEndRef} />
        </div>

        {/* Bottom section with error, notices, and input - Fixed at bottom */}
        <div className="flex flex-col flex-shrink-0 bg-[#0f0a1f]">
          {/* Error Message */}
          {error && (
            <div className="mx-6 mb-3 p-2 bg-red-950/40 border border-red-700/40 rounded-lg">
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}

          {/* Privacy Notice */}
          <div className="mx-6 mb-3 p-2 bg-amber-950/40 border border-amber-700/40 rounded-lg">
            <p className="text-xs text-amber-300 text-center leading-snug">
              <span className="font-semibold">Demo Preview:</span> AI-generated responses. Not a substitute for professional care. Crisis? Call a helpline.
            </p>
          </div>

          {/* Input Area */}
          <div className="px-6 pb-4">
            <form onSubmit={handleTextSubmit} className="relative">
              <textarea
                ref={textInputRef}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type your message here..."
                className="w-full bg-white border-2 border-hamboi-purple/20 focus:border-hamboi-purple rounded-2xl px-5 py-3 pr-14 text-[#1a1a2e] placeholder:text-[#888888] focus:outline-none resize-none transition-colors"
                rows={2}
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
                size="icon"
                className="absolute right-3 bottom-3 rounded-full bg-gradient-to-br from-hamboi-purple to-hamboi-blue hover:opacity-90 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </form>
            <p className="text-xs text-hamboi-dark/50 text-center mt-1.5">
              Press Enter to send • Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
