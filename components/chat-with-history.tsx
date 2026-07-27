"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { X, Loader2, Send, MessageSquare, Menu, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ConversationSidebar } from "./conversation-sidebar"

interface Message {
  id?: string
  role: "user" | "assistant"
  content: string
  created_at?: string
}

interface ChatWithHistoryProps {
  isOpen: boolean
  onClose: () => void
  authToken?: string
}

export function ChatWithHistory({ isOpen, onClose, authToken }: ChatWithHistoryProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [textInput, setTextInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [error, setError] = useState("")
  const [displayingMessage, setDisplayingMessage] = useState<{ text: string; index: number } | null>(null)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loadingConversation, setLoadingConversation] = useState(false)

  const textInputRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, displayingMessage])

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

  // Create a new conversation
  const handleNewChat = async () => {
    if (!authToken) {
      setError("Please log in to start a chat")
      return
    }

    try {
      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to create conversation")
      }

      const data = await response.json()
      const newConversationId = data.conversation.id

      setConversationId(newConversationId)
      setMessages([])
      setTextInput("")
      setError("")
      setSidebarOpen(false)
    } catch (err) {
      console.error("[v0] Error creating conversation:", err)
      setError("Failed to create new chat")
    }
  }

  // Load conversation messages
  const handleSelectConversation = async (convId: string) => {
    if (!authToken) return

    setLoadingConversation(true)

    try {
      const response = await fetch(`/api/conversations/${convId}`, {
        headers: {
          Authorization: authToken,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to load conversation")
      }

      const data = await response.json()
      setConversationId(convId)
      setMessages(data.messages || [])
      setError("")
      setSidebarOpen(false)
    } catch (err) {
      console.error("[v0] Error loading conversation:", err)
      setError("Failed to load conversation")
    } finally {
      setLoadingConversation(false)
    }
  }

  // Send message
  const handleTextSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    const userMessage = textInput.trim()
    if (!userMessage || isProcessing) return

    if (!conversationId) {
      setError("Please start a new chat first")
      return
    }

    setIsProcessing(true)
    setError("")
    setTextInput("")

    // Add user message to UI immediately
    const newUserMessage: Message = {
      role: "user",
      content: userMessage,
    }
    setMessages((prev) => [...prev, newUserMessage])

    try {
      const res = await fetch("/api/voice-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken || "",
        },
        body: JSON.stringify({
          message: userMessage,
          conversationId: conversationId,
        }),
      })

      const data = await res.json()

      if (data.error) {
        setError(data.error)
        setIsProcessing(false)
        return
      }

      if (data.response) {
        // Display AI response with typewriter effect
        displayResponseWithTypewriter(data.response, () => {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: data.response,
            },
          ])
          setIsProcessing(false)
        })
      } else {
        setError("I didn't get a response. Please try again.")
        setIsProcessing(false)
      }
    } catch (err) {
      console.error("[v0] Error sending message:", err)
      setError("Sorry, something went wrong. Please try again.")
      setIsProcessing(false)
    }
  }

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setMessages([])
      setTextInput("")
      setError("")
      setDisplayingMessage(null)
      setSidebarOpen(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-hamboi-dark-bg via-[#1a1a3e] to-hamboi-dark-bg" />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-6xl h-[95vh] bg-hamboi-dark-card border-2 border-hamboi-purple/40 backdrop-blur-lg rounded-3xl shadow-2xl shadow-hamboi-purple/30 flex overflow-hidden">
        {/* Sidebar - Hidden on mobile, drawer on tablet/desktop */}
        <div
          className={`w-64 hidden lg:flex flex-col bg-hamboi-dark-bg border-r border-hamboi-purple/20 transition-all ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <ConversationSidebar
            onSelectConversation={handleSelectConversation}
            onNewChat={handleNewChat}
            selectedConversationId={conversationId || undefined}
            authToken={authToken}
          />
        </div>

        {/* Mobile/Tablet Drawer */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div
          className={`fixed left-0 top-0 h-full z-50 w-64 flex flex-col bg-hamboi-dark-bg border-r border-hamboi-purple/20 transition-transform lg:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 border-b border-hamboi-purple/20 flex items-center justify-between">
            <h3 className="font-bold text-white">Chats</h3>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-full hover:bg-hamboi-purple/20"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
          </div>
          <ConversationSidebar
            onSelectConversation={handleSelectConversation}
            onNewChat={handleNewChat}
            selectedConversationId={conversationId || undefined}
            authToken={authToken}
          />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-[#0f0a1f] grid grid-rows-[auto_1fr_auto]">
          {/* Header */}
          <div className="px-6 py-4 bg-[#0f0a1f] backdrop-blur-lg border-b border-hamboi-purple/40 flex-shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-full hover:bg-hamboi-purple/20 lg:hidden text-white"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-hamboi-purple to-hamboi-green flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Chat with Hamboi</h2>
                {conversationId && (
                  <p className="text-xs text-hamboi-text-muted">{messages.length} messages</p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-hamboi-purple/20 text-hamboi-green hover:text-hamboi-green transition-colors"
              aria-label="Close chat"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="overflow-y-auto px-6 py-4 space-y-4">
            {!conversationId ? (
              <div className="text-center py-12 h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-hamboi-purple/30 to-hamboi-green/30 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-hamboi-green" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Start a new chat</h3>
                <p className="text-hamboi-text-muted max-w-md mx-auto mb-6">
                  Share what's on your mind. Whether you're stressed, anxious, or just need someone to talk to, I'm here
                  for you.
                </p>
                <Button onClick={handleNewChat} className="bg-hamboi-purple hover:bg-hamboi-purple/80">
                  New Chat
                </Button>
              </div>
            ) : loadingConversation ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-hamboi-purple" />
              </div>
            ) : (
              <>
                {messages.length === 0 && !displayingMessage && (
                  <div className="text-center py-12">
                    <p className="text-hamboi-text-muted">Start the conversation</p>
                  </div>
                )}

                {messages.map((msg, idx) => (
                  <div key={idx} className="space-y-4">
                    {msg.role === "user" && (
                      <div className="flex justify-end">
                        <div className="bg-gradient-to-br from-hamboi-purple via-indigo-500 to-hamboi-blue text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-[80%] shadow-lg">
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                        </div>
                      </div>
                    )}

                    {msg.role === "assistant" && (
                      <div className="flex justify-start">
                        <div className="relative bg-gradient-to-br from-hamboi-purple/20 to-hamboi-green/20 rounded-2xl rounded-tl-sm px-5 py-3 max-w-[80%] shadow-lg border-2 border-hamboi-purple/40">
                          <p className="text-sm font-bold text-hamboi-green mb-1">Hamboi</p>
                          <p className="text-sm leading-relaxed text-white">{msg.content}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {displayingMessage && (
                  <div className="flex justify-start">
                    <div className="relative bg-gradient-to-br from-hamboi-purple/20 to-hamboi-green/20 rounded-2xl rounded-tl-sm px-5 py-3 max-w-[80%] shadow-lg border-2 border-hamboi-purple/40">
                      <p className="text-sm font-bold text-hamboi-green mb-1">Hamboi</p>
                      <p className="text-sm leading-relaxed text-white">{displayingMessage.text}</p>
                    </div>
                  </div>
                )}

                {isProcessing && !displayingMessage && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-br from-hamboi-purple/20 to-hamboi-green/20 rounded-2xl rounded-tl-sm px-5 py-3 border-2 border-hamboi-purple/40">
                      <Loader2 className="h-4 w-4 animate-spin text-hamboi-purple" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="flex flex-col flex-shrink-0 bg-[#0f0a1f] border-t border-hamboi-purple/40">
            {error && (
              <div className="mx-6 mt-3 p-2 bg-red-950/40 border border-red-700/40 rounded-lg">
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}

            <div className="p-6">
              <form onSubmit={handleTextSubmit} className="relative">
                <textarea
                  ref={textInputRef}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder={conversationId ? "Type your message here..." : "Start a new chat first..."}
                  disabled={isProcessing || !conversationId}
                  className="w-full bg-white border-2 border-hamboi-purple/20 focus:border-hamboi-purple rounded-2xl px-5 py-3 pr-14 text-[#1a1a2e] placeholder:text-[#888888] focus:outline-none resize-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                      e.preventDefault()
                      handleTextSubmit()
                    }
                  }}
                />
                <Button
                  type="submit"
                  disabled={!textInput.trim() || isProcessing || !conversationId}
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
    </div>
  )
}
