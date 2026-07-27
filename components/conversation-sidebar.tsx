"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, MessageSquare, Loader2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"

interface Conversation {
  id: string
  title: string
  created_at: string
  updated_at: string
}

interface ConversationSidebarProps {
  onSelectConversation: (conversationId: string) => void
  onNewChat: () => void
  selectedConversationId?: string
  authToken?: string
}

export function ConversationSidebar({
  onSelectConversation,
  onNewChat,
  selectedConversationId,
  authToken,
}: ConversationSidebarProps) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      if (!authToken) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch("/api/conversations", {
          headers: {
            Authorization: authToken,
          },
        })

        if (!response.ok) {
          console.error("[v0] Failed to fetch conversations")
          setLoading(false)
          return
        }

        const data = await response.json()
        setConversations(data.conversations || [])
      } catch (error) {
        console.error("[v0] Error fetching conversations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchConversations()
  }, [authToken])

  const handleDeleteConversation = async (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation()

    if (!window.confirm("Delete this conversation? This action cannot be undone.")) {
      return
    }

    setDeleting(conversationId)

    try {
      const response = await fetch(`/api/conversations/${conversationId}`, {
        method: "DELETE",
        headers: {
          Authorization: authToken || "",
        },
      })

      if (response.ok) {
        setConversations((prev) => prev.filter((c) => c.id !== conversationId))
        if (selectedConversationId === conversationId) {
          onNewChat()
        }
      } else {
        console.error("[v0] Failed to delete conversation")
      }
    } catch (error) {
      console.error("[v0] Error deleting conversation:", error)
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="flex flex-col h-full bg-hamboi-dark-bg border-r border-hamboi-purple/20">
      {/* New Chat Button */}
      <div className="p-4 border-b border-hamboi-purple/20">
        <Button
          onClick={onNewChat}
          className="w-full bg-gradient-to-r from-hamboi-purple to-hamboi-blue hover:opacity-90 text-white flex items-center justify-center gap-2"
        >
          <Plus className="h-5 w-5" />
          New Chat
        </Button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-6 w-6 animate-spin text-hamboi-purple" />
          </div>
        ) : conversations.length === 0 ? (
          <div className="text-center p-4 text-hamboi-text-muted">
            <MessageSquare className="h-6 w-6 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No conversations yet</p>
            <p className="text-xs opacity-75 mt-1">Start a new chat to begin</p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className={`w-full text-left p-3 rounded-lg transition-all group ${
                  selectedConversationId === conv.id
                    ? "bg-hamboi-purple/30 border border-hamboi-purple/50"
                    : "hover:bg-hamboi-purple/10 border border-transparent"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{conv.title}</p>
                    <p className="text-xs text-hamboi-text-muted mt-1">
                      {formatDistanceToNow(new Date(conv.updated_at), { addSuffix: true })}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <button
                      onClick={(e) => handleDeleteConversation(conv.id, e)}
                      disabled={deleting === conv.id}
                      className="p-1.5 rounded-md hover:bg-red-950/40 text-hamboi-text-muted hover:text-red-400 transition-colors disabled:opacity-50"
                      aria-label="Delete conversation"
                    >
                      {deleting === conv.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                    <ChevronRight className="h-4 w-4 text-hamboi-green" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
