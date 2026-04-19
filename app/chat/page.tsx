"use client"

import { useState, useRef, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { X, Loader2, Send, MessageSquare, Plus, Trash2, Menu } from "lucide-react"
import { useRouter } from "next/navigation"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  created_at: string
}

interface Session {
  session_id: string
  preview: string
  created_at: string
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
)

function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export default function ChatPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [sessions, setSessions] = useState<Session[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string>("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [textInput, setTextInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")
  const [displayingMessage, setDisplayingMessage] = useState<{ text: string } | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [isLoadingSessions, setIsLoadingSessions] = useState(true)

  const textInputRef = useRef<HTMLTextAreaElement>(null)
  const conversationEndRef = useRef<HTMLDivElement>(null)

  // Check authentication and load initial session
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth")
        return
      }

      setUser(user)
      await loadSessions(user.id)
      setIsLoadingPage(false)
    }

    checkAuth()
  }, [router])

  // Load user's sessions
  const loadSessions = async (userId: string) => {
    try {
      setIsLoadingSessions(true)
      console.log("[v0] Loading sessions for user:", userId)
      const res = await fetch(`/api/chat/sessions?user_id=${userId}`)
      const data = await res.json()
      console.log("[v0] Sessions response:", data)

      if (data.data && data.data.length > 0) {
        console.log("[v0] Found", data.data.length, "sessions")
        setSessions(data.data)
        // Load most recent session
        setCurrentSessionId(data.data[0].session_id)
        await loadMessages(data.data[0].session_id, userId)
      } else {
        // No sessions yet, create a new one
        console.log("[v0] No sessions found, starting fresh")
        const newSessionId = generateSessionId()
        setCurrentSessionId(newSessionId)
        setMessages([])
        setSessions([])
      }
    } catch (err) {
      console.error("Error loading sessions:", err)
    } finally {
      setIsLoadingSessions(false)
    }
  }

  // Load messages for a specific session
  const loadMessages = async (sessionId: string, userId: string) => {
    try {
      const res = await fetch(`/api/chat/messages?session_id=${sessionId}&user_id=${userId}`)
      const data = await res.json()

      if (data.data) {
        setMessages(data.data)
      }
    } catch (err) {
      console.error("Error loading messages:", err)
    }
  }

  // Auto-scroll to bottom
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, displayingMessage])

  // Focus input when page loads
  useEffect(() => {
    if (!isLoadingPage) {
      setTimeout(() => textInputRef.current?.focus(), 100)
    }
  }, [isLoadingPage])

  // Typewriter effect
  const displayResponseWithTypewriter = (text: string, callback: () => void) => {
    let index = 0
    setDisplayingMessage({ text: "" })

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayingMessage({ text: text.slice(0, index + 1) })
        index++
      } else {
        clearInterval(interval)
        setDisplayingMessage(null)
        callback()
      }
    }, 25)
  }

  // Handle sending message
  const handleTextSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    const userMessage = textInput.trim()
    if (!userMessage || isProcessing || !user) return

    setIsProcessing(true)
    setError("")
    setTextInput("")

    // Use current session or create new one
    let sessionId = currentSessionId
    if (!sessionId) {
      sessionId = generateSessionId()
      setCurrentSessionId(sessionId)
    }

    // Add user message to UI
    const userMsg = {
      id: `user_${Date.now()}`,
      role: "user" as const,
      content: userMessage,
      created_at: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMsg])

    // Save user message to Supabase
    try {
      await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          session_id: sessionId,
          role: "user",
          content: userMessage,
        }),
      })
    } catch (err) {
      console.error("Error saving user message:", err)
    }

    // Get AI response from voice-chat API
    try {
      const res = await fetch("/api/voice-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, sessionId }),
      })

      const data = await res.json()

      if (data.error) {
        setError(data.error)
        setIsProcessing(false)
        return
      }

      if (data.response) {
        // Display with typewriter effect
        displayResponseWithTypewriter(data.response, async () => {
          // Save AI message to Supabase
          try {
            await fetch("/api/chat/messages", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                user_id: user.id,
                session_id: sessionId,
                role: "assistant",
                content: data.response,
              }),
            })
          } catch (err) {
            console.error("Error saving AI message:", err)
          }

          // Add AI message to UI
          const aiMsg = {
            id: `ai_${Date.now()}`,
            role: "assistant" as const,
            content: data.response,
            created_at: new Date().toISOString(),
          }
          setMessages((prev) => [...prev, aiMsg])
          setIsProcessing(false)

          // Refresh sessions list
          await loadSessions(user.id)
        })
      }
    } catch (err) {
      setError("Error getting response. Please try again.")
      setIsProcessing(false)
    }
  }

  // Start new chat
  const handleNewChat = () => {
    setCurrentSessionId("")
    setMessages([])
    setTextInput("")
    setTimeout(() => textInputRef.current?.focus(), 100)
  }

  // Switch to a session
  const handleSwitchSession = async (sessionId: string) => {
    setCurrentSessionId(sessionId)
    if (user) {
      await loadMessages(sessionId, user.id)
    }
    // Close sidebar on mobile when session is selected
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  // Delete a session
  const handleDeleteSession = async (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    // TODO: Implement delete session functionality with Supabase
    // For now, just remove from local state
    setSessions((prev) => prev.filter((s) => s.session_id !== sessionId))
    if (currentSessionId === sessionId) {
      handleNewChat()
    }
  }

  if (isLoadingPage) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0F0A1E]">
        <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#0F0A1E] text-white overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop always visible, mobile as overlay */}
      <div
        className={`fixed md:relative z-50 md:z-0 h-screen ${
          sidebarOpen ? "w-64" : "w-0"
        } bg-[#1a1035] border-r border-purple-500/30 transition-all duration-300 overflow-hidden flex flex-col`}
      >
        {/* New Chat Button */}
        <div className="p-4 border-b border-purple-500/30">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-4 py-2 rounded-lg transition-all"
          >
            <Plus className="h-5 w-5" />
            New Chat
          </button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto space-y-2 p-4">
          {isLoadingSessions && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
            </div>
          )}
          {!isLoadingSessions && sessions.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-4">No conversations yet. Start a new chat!</p>
          )}
          {sessions.map((session) => (
            <button
              key={session.session_id}
              onClick={() => handleSwitchSession(session.session_id)}
              className={`w-full text-left p-3 rounded-lg transition-all group ${
                currentSessionId === session.session_id
                  ? "bg-purple-600/40 border border-purple-400/50"
                  : "hover:bg-purple-600/20 border border-transparent"
              }`}
            >
              <p className="text-sm font-medium truncate">{session.preview}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(session.created_at).toLocaleDateString()}
              </p>
              <button
                onClick={(e) => handleDeleteSession(session.session_id, e)}
                className="mt-2 p-1 rounded hover:bg-red-500/20 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="px-4 md:px-6 py-4 bg-[#0f0a1f] border-b border-purple-500/30 flex items-center justify-between flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-purple-500/20 transition-colors"
            title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-green-400 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-bold">Chat with Hamboi</h1>
          </div>
          <div className="w-10" />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.length === 0 && !displayingMessage && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-purple-600/30 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Start a conversation</h3>
                <p className="text-gray-400 max-w-md">
                  Share what's on your mind. Whether you're stressed, anxious, or just need someone to talk to, I'm
                  here for you.
                </p>
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-5 py-3 ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-purple-600 to-blue-600 text-white"
                    : "bg-purple-500/20 border border-purple-400/30 text-gray-100"
                }`}
              >
                {msg.role === "assistant" && <p className="text-xs font-bold text-green-400 mb-1">Hamboi</p>}
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}

          {displayingMessage && (
            <div className="flex justify-start">
              <div className="max-w-[70%] bg-purple-500/20 border border-purple-400/30 text-gray-100 rounded-2xl px-5 py-3">
                <p className="text-xs font-bold text-green-400 mb-1">Hamboi</p>
                <p className="text-sm leading-relaxed">{displayingMessage.text}</p>
              </div>
            </div>
          )}

          {isProcessing && !displayingMessage && (
            <div className="flex justify-start">
              <div className="bg-purple-500/20 border border-purple-400/30 rounded-2xl px-5 py-3">
                <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
              </div>
            </div>
          )}

          <div ref={conversationEndRef} />
        </div>

        {/* Input Area */}
        <div className="px-6 py-4 bg-[#0f0a1f] border-t border-purple-500/30 flex-shrink-0">
          {error && (
            <div className="mb-3 p-2 bg-red-950/40 border border-red-700/40 rounded-lg">
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleTextSubmit} className="relative">
            <textarea
              ref={textInputRef}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type your message here..."
              className="w-full bg-white border-2 border-purple-500/20 focus:border-purple-500 rounded-2xl px-5 py-3 pr-14 text-[#1a1a2e] placeholder:text-gray-400 focus:outline-none resize-none transition-colors"
              rows={2}
              disabled={isProcessing}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleTextSubmit()
                }
              }}
            />
            <button
              type="submit"
              disabled={!textInput.trim() || isProcessing}
              className="absolute right-3 bottom-3 rounded-full bg-gradient-to-br from-purple-500 to-green-400 hover:opacity-90 text-white disabled:opacity-50 disabled:cursor-not-allowed p-2 transition-opacity"
            >
              {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </button>
          </form>
          <p className="text-xs text-gray-500 text-center mt-2">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  )
}
