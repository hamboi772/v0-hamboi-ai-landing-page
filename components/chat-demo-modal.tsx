"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Loader2, MessageSquare, MoreHorizontal, Pencil, Plus, Send, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@supabase/supabase-js"

function getSupabaseClient() {
  if (typeof window === "undefined") return null
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return url && key ? createClient(url, key) : null
}

interface ConversationMessage { user: string; ai: string; timestamp: Date }
interface SavedConversation { id: string; title: string; created_at: string; updated_at: string }
const GUEST_HISTORY_KEY = "hamboi-guest-chat-history"
const makeId = () => `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

export function ChatDemoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [conversation, setConversation] = useState<ConversationMessage[]>([])
  const [savedChats, setSavedChats] = useState<SavedConversation[]>([])
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [textInput, setTextInput] = useState("")
  const [error, setError] = useState("")
  const [displayingMessage, setDisplayingMessage] = useState<string | null>(null)
  const [sheet, setSheet] = useState<"new" | "auth" | null>(null)
  const [authMode, setAuthMode] = useState<"sign-in" | "sign-up">("sign-in")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")
  const [menuId, setMenuId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState("")
  const sessionIdRef = useRef(makeId())
  const textInputRef = useRef<HTMLTextAreaElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  const readGuestChat = () => {
    try {
      const raw = window.sessionStorage.getItem(GUEST_HISTORY_KEY)
      if (!raw) return []
      return (JSON.parse(raw) as Array<Omit<ConversationMessage, "timestamp"> & { timestamp: string }>).map((m) => ({ ...m, timestamp: new Date(m.timestamp) }))
    } catch { window.sessionStorage.removeItem(GUEST_HISTORY_KEY); return [] }
  }

  const loadChats = async () => {
    const res = await fetch("/api/conversations")
    if (res.ok) setSavedChats((await res.json()).conversations ?? [])
  }

  useEffect(() => {
    if (!isOpen) return
    const supabase = getSupabaseClient()
    if (!supabase) { setConversation(readGuestChat()); return }
    supabase.auth.getUser().then(async ({ data }) => {
      if (data.user) { setUserId(data.user.id); await loadChats() }
      else setConversation(readGuestChat())
    })
  }, [isOpen])

  useEffect(() => {
    if (!userId) {
      if (conversation.length) window.sessionStorage.setItem(GUEST_HISTORY_KEY, JSON.stringify(conversation))
      else window.sessionStorage.removeItem(GUEST_HISTORY_KEY)
    }
  }, [conversation, userId])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }) }, [conversation, displayingMessage])
  useEffect(() => { if (isOpen) setTimeout(() => textInputRef.current?.focus(), 100) }, [isOpen])

  const clearChat = () => {
    setConversation([]); setConversationId(null); setError(""); setDisplayingMessage(null); setTextInput(""); sessionIdRef.current = makeId()
    if (!userId) window.sessionStorage.removeItem(GUEST_HISTORY_KEY)
    setSheet(null)
  }

  const startNewChat = () => {
    if (userId) clearChat()
    else if (conversation.length) setSheet("new")
    else clearChat()
  }

  const createSavedChat = async (messages: ConversationMessage[] = []) => {
    const title = messages[0]?.user?.slice(0, 70) || "New chat"
    const res = await fetch("/api/conversations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, messages }) })
    if (!res.ok) throw new Error("Could not save chat")
    const { conversation: saved } = await res.json()
    setConversationId(saved.id); setSavedChats((prev) => [saved, ...prev]); return saved.id as string
  }

  const signIn = async (event: React.FormEvent) => {
    event.preventDefault(); setAuthError("")
    const supabase = getSupabaseClient()
    if (!supabase) return setAuthError("Sign in is unavailable right now.")
    const result = authMode === "sign-in" ? await supabase.auth.signInWithPassword({ email, password }) : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/callback` } })
    if (result.error) return setAuthError("That email or password could not be used. Please try again.")
    if (authMode === "sign-up" && !result.data.user?.aud) return setAuthError("Check your email to confirm your account.")
    const signedInUser = result.data.user
    if (!signedInUser) return setAuthError("Check your email to finish signing in.")
    setUserId(signedInUser.id)
    if (conversation.length) { await createSavedChat(conversation); window.sessionStorage.removeItem(GUEST_HISTORY_KEY) }
    setSheet(null); setEmail(""); setPassword(""); await loadChats()
  }

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault(); const userMessage = textInput.trim()
    if (!userMessage || isProcessing) return
    setIsProcessing(true); setError(""); setTextInput("")
    const timestamp = new Date(); setConversation((prev) => [...prev, { user: userMessage, ai: "", timestamp }])
    try {
      let activeId = conversationId
      if (userId && !activeId) activeId = await createSavedChat()
      const res = await fetch("/api/voice-chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: userMessage, sessionId: sessionIdRef.current, conversationId: activeId || undefined }) })
      const data = await res.json()
      if (!res.ok || !data.response) throw new Error(data.error || "send failed")
      let index = 0; setDisplayingMessage("")
      const interval = setInterval(() => { if (index < data.response.length) { setDisplayingMessage(data.response.slice(0, ++index)) } else { clearInterval(interval); setDisplayingMessage(null); setConversation((prev) => prev.map((m, i) => i === prev.length - 1 ? { ...m, ai: data.response } : m)); setIsProcessing(false) } }, 12)
    } catch { setConversation((prev) => prev.slice(0, -1)); setError("I couldn't send that just now. Please try again."); setIsProcessing(false) }
  }

  const openSavedChat = async (chat: SavedConversation) => {
    const res = await fetch(`/api/conversations/${chat.id}`); if (!res.ok) return
    const { messages } = await res.json(); const grouped: ConversationMessage[] = []
    for (let i = 0; i < messages.length; i += 2) if (messages[i]?.role === "user" && messages[i + 1]?.role === "assistant") grouped.push({ user: messages[i].content, ai: messages[i + 1].content, timestamp: new Date(messages[i].created_at) })
    setConversation(grouped); setConversationId(chat.id); setMenuId(null)
  }

  const rename = async (id: string) => { if (!editingTitle.trim()) return; const res = await fetch(`/api/conversations/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: editingTitle }) }); if (res.ok) { const { conversation: updated } = await res.json(); setSavedChats((prev) => prev.map((chat) => chat.id === id ? updated : chat)); setEditingId(null) } }
  const remove = async (id: string) => { const res = await fetch(`/api/conversations/${id}`, { method: "DELETE" }); if (res.ok) { setSavedChats((prev) => prev.filter((chat) => chat.id !== id)); if (conversationId === id) clearChat() }; setMenuId(null) }

  if (!isOpen) return null
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4"><div className="absolute inset-0 bg-gradient-to-br from-hamboi-dark-bg via-[#1a1a3e] to-hamboi-dark-bg" /><div className="relative z-10 w-full max-w-3xl h-[95vh] bg-hamboi-dark-card border-2 border-hamboi-purple/40 rounded-3xl shadow-2xl grid grid-rows-[auto_1fr_auto] overflow-hidden">
    <header className="px-6 py-4 bg-[#0f0a1f] border-b border-hamboi-purple/40 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gradient-to-br from-hamboi-purple to-hamboi-green flex items-center justify-center"><MessageSquare className="h-5 w-5 text-white" /></div><h2 className="text-lg font-bold text-white">Chat with Hamboi</h2></div><div className="flex items-center gap-2"><Button type="button" variant="outline" onClick={startNewChat} className="h-9 border-hamboi-purple/40 text-white"><Plus className="h-4 w-4 mr-1" /> New chat</Button><button onClick={onClose} className="p-2 rounded-full hover:bg-hamboi-purple/20 text-hamboi-green" aria-label="Close chat"><X className="h-6 w-6" /></button></div></header>
    <div className="min-h-0 flex"><aside className="hidden sm:flex w-56 shrink-0 flex-col border-r border-hamboi-purple/20 bg-[#0b0818] p-3"><Button type="button" onClick={startNewChat} className="mb-4 w-full bg-hamboi-purple hover:bg-hamboi-purple/80"><Plus className="h-4 w-4 mr-1" /> New chat</Button>{userId ? <div className="space-y-1 overflow-y-auto"><p className="px-2 pb-2 text-xs uppercase tracking-wide text-white/50">Past chats</p>{savedChats.map((chat) => <div key={chat.id} className="relative flex items-center gap-1"><button onClick={() => openSavedChat(chat)} className="min-w-0 flex-1 rounded-lg px-2 py-2 text-left text-xs text-white/80 hover:bg-white/10"><span className="block truncate">{chat.title}</span><span className="text-white/40">{new Date(chat.updated_at).toLocaleDateString()}</span></button><button onClick={() => setMenuId(menuId === chat.id ? null : chat.id)} className="p-1 text-white/40" aria-label="Chat options"><MoreHorizontal className="h-4 w-4" /></button>{menuId === chat.id && <div className="absolute right-0 top-9 z-20 rounded-lg border border-white/10 bg-[#1b1430] p-1 shadow-xl"><button className="flex w-full items-center gap-2 px-2 py-1 text-xs text-white" onClick={() => { setEditingId(chat.id); setEditingTitle(chat.title); setMenuId(null) }}><Pencil className="h-3 w-3" /> Rename</button><button className="flex w-full items-center gap-2 px-2 py-1 text-xs text-red-300" onClick={() => remove(chat.id)}><Trash2 className="h-3 w-3" /> Delete</button></div>}</div>)}{editingId && <div className="mt-2"><input autoFocus value={editingTitle} onChange={(e) => setEditingTitle(e.target.value)} onKeyDown={(e) => e.key === "Enter" && rename(editingId)} className="w-full rounded bg-white px-2 py-1 text-xs text-black" /><button onClick={() => rename(editingId)} className="mt-1 text-xs text-hamboi-green">Save</button></div>}</div> : <div className="rounded-xl border border-white/10 p-3 text-xs text-white/60"><p>Past chats</p><p className="mt-2">Sign up or log in to save your chats and continue them anytime.</p><Button type="button" onClick={() => setSheet("auth")} size="sm" className="mt-3 w-full bg-hamboi-purple">Sign in</Button></div>}</aside>
    <main className="min-w-0 flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-[#0f0a1f]">{conversation.length === 0 && !displayingMessage && <div className="text-center py-12"><div className="w-16 h-16 rounded-full bg-gradient-to-br from-hamboi-purple/30 to-hamboi-green/30 flex items-center justify-center mx-auto mb-4"><MessageSquare className="h-8 w-8 text-hamboi-green" /></div><h3 className="text-lg font-semibold text-white mb-2">Start a conversation</h3><p className="text-hamboi-text-muted max-w-md mx-auto">Share what's on your mind. I'm here to listen.</p></div>}{conversation.map((msg, idx) => <div key={`${msg.timestamp.toISOString()}-${idx}`} className="space-y-4"><div className="flex justify-end"><div className="bg-gradient-to-br from-hamboi-purple via-indigo-500 to-hamboi-blue text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-[80%] shadow-lg"><p className="text-sm leading-relaxed">{msg.user}</p></div></div>{(msg.ai || (idx === conversation.length - 1 && displayingMessage !== null)) && <div className="flex justify-start"><div className="bg-gradient-to-br from-hamboi-purple/20 to-hamboi-green/20 rounded-2xl rounded-tl-sm px-5 py-3 max-w-[80%] shadow-lg border-2 border-hamboi-purple/40"><p className="text-sm font-bold text-hamboi-green mb-1">Hamboi</p><p className="text-sm leading-relaxed text-white">{idx === conversation.length - 1 && displayingMessage !== null ? displayingMessage : msg.ai || <Loader2 className="h-4 w-4 animate-spin text-hamboi-purple" />}</p></div></div>}</div>)}<div ref={endRef} /></main></div>
    <div className="flex flex-col bg-[#0f0a1f]">{error && <div className="mx-6 mb-3 p-2 bg-red-950/40 border border-red-700/40 rounded-lg"><p className="text-xs text-red-400">{error}</p></div>}<div className="mx-6 mb-3 p-2 bg-amber-950/40 border border-amber-700/40 rounded-lg"><p className="text-xs text-amber-300 text-center leading-snug">Demo Preview: AI-generated responses. Not a substitute for professional care.</p></div><div className="px-6 pb-4"><form onSubmit={submit} className="relative"><textarea ref={textInputRef} value={textInput} onChange={(e) => setTextInput(e.target.value)} placeholder="Type your message here..." className="w-full bg-white border-2 border-hamboi-purple/20 focus:border-hamboi-purple rounded-2xl px-5 py-3 pr-14 text-[#1a1a2e] placeholder:text-[#888888] focus:outline-none resize-none" rows={2} disabled={isProcessing} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) { e.preventDefault(); submit() } }} /><Button type="submit" disabled={!textInput.trim() || isProcessing} size="icon" className="absolute right-3 bottom-3 rounded-full bg-gradient-to-br from-hamboi-purple to-hamboi-blue text-white">{isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}</Button></form><p className="text-xs text-hamboi-dark/50 text-center mt-1.5">Press Enter to send • Shift+Enter for new line</p></div></div>
    {sheet && <div className="absolute inset-0 z-30 flex items-end justify-center bg-black/50 p-4"><div className="w-full max-w-md rounded-2xl border border-hamboi-purple/40 bg-[#1b1430] p-5 text-white shadow-2xl">{sheet === "new" ? <><h3 className="font-semibold">Start a new chat?</h3><p className="mt-2 text-sm text-white/70">Starting a new chat will clear this one. Sign in to save it first?</p><div className="mt-5 flex flex-col gap-2"><Button onClick={() => { setSheet("auth"); setAuthMode("sign-in") }} className="bg-hamboi-purple">Sign in &amp; save</Button><Button onClick={clearChat} variant="outline" className="border-white/20 text-white">Start new chat</Button><Button onClick={() => setSheet(null)} variant="ghost" className="text-white/70">Cancel</Button></div></> : <form onSubmit={signIn}><h3 className="font-semibold">{authMode === "sign-in" ? "Sign in to save your chat" : "Create your account"}</h3><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mt-4 w-full rounded-lg bg-white px-3 py-2 text-black" /><input required minLength={6} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mt-2 w-full rounded-lg bg-white px-3 py-2 text-black" />{authError && <p className="mt-2 text-xs text-red-300">{authError}</p>}<Button type="submit" className="mt-4 w-full bg-hamboi-purple">{authMode === "sign-in" ? "Sign in & save" : "Create account"}</Button><button type="button" onClick={() => setAuthMode(authMode === "sign-in" ? "sign-up" : "sign-in")} className="mt-3 w-full text-xs text-hamboi-green">{authMode === "sign-in" ? "Need an account? Sign up" : "Already have an account? Sign in"}</button><button type="button" onClick={() => setSheet(null)} className="mt-2 w-full text-xs text-white/60">Cancel</button></form>}</div></div>}
  </div></div>
}
