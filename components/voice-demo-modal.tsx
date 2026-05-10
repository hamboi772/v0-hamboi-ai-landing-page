"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { X, Mic, Square, Loader2, Volume2, VolumeX, Send, MessageSquare, ShieldCheck, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { createClient } from "@supabase/supabase-js"
import { motion, AnimatePresence } from "framer-motion"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
}
interface SpeechRecognitionResultList {
  length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}
interface SpeechRecognitionResult {
  isFinal: boolean
  length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
}
interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}
interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  abort(): void
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: Event & { error: string }) => void) | null
  onend: (() => void) | null
  onstart: (() => void) | null
}

interface VoiceDemoModalProps {
  isOpen: boolean
  onClose: () => void
}
interface ConversationMessage {
  user: string
  ai: string
}

export function VoiceDemoModal({ isOpen, onClose }: VoiceDemoModalProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [displayedResponse, setDisplayedResponse] = useState("")
  const [conversation, setConversation] = useState<ConversationMessage[]>([])
  const [error, setError] = useState("")
  const [inputMode, setInputMode] = useState<"voice" | "text">("voice")
  const [textInput, setTextInput] = useState("")
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [liveTranscript, setLiveTranscript] = useState("")
  const [speechSupported, setSpeechSupported] = useState(true)
  const [ttsEnabled, setTtsEnabled] = useState(true)
  const [ttsSupported, setTtsSupported] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  const sessionIdRef = useRef<string>(generateSessionId())
  const textInputRef = useRef<HTMLTextAreaElement>(null)
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const finalTranscriptRef = useRef("")
  const shouldProcessOnEndRef = useRef(false)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setUserId(data.user.id)
    })
  }, [])

  // Load last session
  useEffect(() => {
    const loadLastSession = async () => {
      if (isOpen && userId) {
        try {
          const { data } = await supabase
            .from("chat_messages")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: true })
            .limit(10)

          if (data && data.length > 0) {
            const messages: ConversationMessage[] = []
            let currentUserMsg = ""
            for (const msg of data) {
              if (msg.role === "user") currentUserMsg = msg.content
              else if (msg.role === "assistant" && currentUserMsg) {
                messages.push({ user: currentUserMsg, ai: msg.content })
                currentUserMsg = ""
              }
            }
            setConversation(messages)
            if (messages.length > 0) {
              setTranscript(messages[messages.length - 1].user)
              setResponse(messages[messages.length - 1].ai)
            }
          }
        } catch (err) {
          console.error("Error loading voice session:", err)
        }
      }
    }
    loadLastSession()
  }, [isOpen, userId])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      setSpeechSupported(!!SpeechRecognitionAPI)
      if ("speechSynthesis" in window) {
        synthRef.current = window.speechSynthesis
        setTtsSupported(true)
      } else {
        setTtsSupported(false)
      }
      if (!SpeechRecognitionAPI) setInputMode("text")
    }
  }, [])

  const speakResponse = useCallback((text: string) => {
    if (!ttsEnabled || !synthRef.current || !ttsSupported) return
    synthRef.current.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.95
    utterance.pitch = 1.1
    const voices = synthRef.current.getVoices()
    const selectedVoice = voices.find((v) => v.lang.startsWith("en"))
    if (selectedVoice) utterance.voice = selectedVoice
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    synthRef.current.speak(utterance)
  }, [ttsEnabled, ttsSupported])

  const processTranscript = useCallback(async (text: string) => {
    if (!text.trim()) {
      setIsProcessing(false)
      return
    }
    try {
      const res = await fetch("/api/voice-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId: sessionIdRef.current, userId }),
      })
      const data = await res.json()
      if (data.response) {
        setTranscript(text)
        setResponse(data.response)
        setConversation((prev) => [...prev.slice(-3), { user: text, ai: data.response }])
        if (ttsEnabled) speakResponse(data.response)
      }
    } catch (err) {
      setError("Something went wrong.")
    } finally {
      setIsProcessing(false)
    }
  }, [userId, ttsEnabled, speakResponse])

  const startRecording = async () => {
    setError("")
    setLiveTranscript("")
    finalTranscriptRef.current = ""
    shouldProcessOnEndRef.current = false
    try {
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognitionAPI()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.onstart = () => {
        setIsRecording(true)
        setRecordingDuration(0)
        recordingIntervalRef.current = setInterval(() => setRecordingDuration((p) => p + 1), 1000)
      }
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let interim = ""
        let final = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const r = event.results[i]
          if (r.isFinal) final += r[0].transcript
          else interim += r[0].transcript
        }
        if (final) finalTranscriptRef.current += final
        setLiveTranscript(finalTranscriptRef.current + interim)
      }
      recognitionRef.current.onend = () => {
        if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current)
        setIsRecording(false)
        if (shouldProcessOnEndRef.current) {
          const text = finalTranscriptRef.current.trim() || liveTranscript.trim()
          if (text) { setIsProcessing(true); processTranscript(text) }
        }
      }
      recognitionRef.current.start()
    } catch (err) {
      setError("Could not start microphone.")
    }
  }

  const stopRecording = () => {
    shouldProcessOnEndRef.current = true
    if (recognitionRef.current) recognitionRef.current.stop()
  }

  const handleTextSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    const userMessage = textInput.trim()
    if (!userMessage || isProcessing) return
    setIsProcessing(true)
    setTextInput("")
    await processTranscript(userMessage)
  }

  useEffect(() => {
    if (response && !isProcessing) {
      let index = 0
      setDisplayedResponse("")
      const interval = setInterval(() => {
        if (index < response.length) {
          setDisplayedResponse((prev) => prev + response[index])
          index++
        } else {
          clearInterval(interval)
        }
      }, 20)
      return () => clearInterval(interval)
    }
  }, [response, isProcessing])

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
            className="relative w-full max-w-2xl glass-morphism border-white/10 rounded-[3rem] shadow-2xl flex flex-col overflow-hidden max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/10 flex items-center justify-between relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-hamboi-purple/10 to-hamboi-green/10 opacity-50" />
               <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 bg-hamboi-purple rounded-2xl flex items-center justify-center font-black text-white shadow-lg">H</div>
                  <div>
                    <h2 className="text-xl font-black text-white uppercase tracking-tight">Hamboi Voice</h2>
                    <p className="text-[10px] font-black text-hamboi-green uppercase tracking-widest">Real-time companion</p>
                  </div>
               </div>
               <button onClick={onClose} className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/20 hover:text-white transition-colors relative z-10">
                  <X className="w-6 h-6" />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
               {/* Mode Switch */}
               <div className="flex justify-center">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-1 flex gap-1">
                     <button
                        onClick={() => setInputMode("voice")}
                        className={cn("px-6 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", inputMode === "voice" ? "bg-white text-background shadow-lg" : "text-white/30 hover:text-white")}
                     >
                        <Mic className="w-3.5 h-3.5 inline mr-2" /> Voice
                     </button>
                     <button
                        onClick={() => setInputMode("text")}
                        className={cn("px-6 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", inputMode === "text" ? "bg-white text-background shadow-lg" : "text-white/30 hover:text-white")}
                     >
                        <MessageSquare className="w-3.5 h-3.5 inline mr-2" /> Text
                     </button>
                  </div>
               </div>

               {/* Voice UI */}
               {inputMode === "voice" && (
                 <div className="flex flex-col items-center py-10">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={isRecording ? stopRecording : startRecording}
                      className={cn(
                        "w-40 h-40 rounded-[4rem] flex items-center justify-center relative transition-all duration-500",
                        isRecording ? "bg-red-500 shadow-[0_0_50px_rgba(239,68,68,0.4)]" : "bg-white/5 border border-white/10 hover:bg-white/10 shadow-2xl"
                      )}
                    >
                       {isRecording ? (
                         <div className="flex gap-1.5 items-center justify-center">
                            {[0, 1, 2].map(i => (
                               <motion.div
                                 key={i}
                                 animate={{ height: [20, 40, 20] }}
                                 transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                                 className="w-1.5 bg-white rounded-full"
                               />
                            ))}
                         </div>
                       ) : isProcessing ? (
                         <Loader2 className="w-12 h-12 text-hamboi-purple animate-spin" />
                       ) : (
                         <Mic className="w-12 h-12 text-hamboi-purple" />
                       )}
                    </motion.button>
                    <p className="mt-8 text-sm font-black text-white uppercase tracking-widest text-center">
                       {isRecording ? `Listening... ${recordingDuration}s` : isProcessing ? "Hamboi is thinking" : "Tap to talk"}
                    </p>
                    {isRecording && liveTranscript && (
                       <p className="mt-6 text-hamboi-text-muted text-xs italic text-center max-w-sm">"{liveTranscript}"</p>
                    )}
                 </div>
               )}

               {/* Text UI */}
               {inputMode === "text" && (
                 <form onSubmit={handleTextSubmit} className="relative">
                    <textarea
                      ref={textInputRef}
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Share your thoughts..."
                      className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 pr-20 text-white font-medium focus:border-hamboi-purple outline-none resize-none min-h-[120px]"
                      onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleTextSubmit() } }}
                    />
                    <Button type="submit" className="absolute right-4 bottom-4 w-12 h-12 rounded-2xl bg-hamboi-purple text-white shadow-xl">
                       <Send className="w-5 h-5" />
                    </Button>
                 </form>
               )}

               {/* Response */}
               <AnimatePresence>
                 {(transcript || displayedResponse) && (
                   <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-6 border-t border-white/5">
                      {transcript && (
                        <div className="flex justify-end">
                           <div className="bg-hamboi-purple text-white p-5 rounded-[2rem] rounded-tr-none text-sm font-medium max-w-[85%] shadow-lg">
                              {transcript}
                           </div>
                        </div>
                      )}
                      {displayedResponse && (
                        <div className="flex justify-start">
                           <div className="glass-morphism border-hamboi-purple/20 p-6 rounded-[2rem] rounded-tl-none text-white text-sm font-medium max-w-[85%] shadow-lg relative">
                              <Sparkles className="w-4 h-4 text-hamboi-green absolute -top-2 -left-2" />
                              <p className="leading-relaxed">{displayedResponse}</p>
                           </div>
                        </div>
                      )}
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-8 bg-white/5 flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/30">
                   <ShieldCheck className="w-3 h-3 text-hamboi-green" /> End-to-end Encrypted
                </div>
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/30">
                   <Zap className="w-3 h-3 text-hamboi-purple" /> Low Latency AI
                </div>
                {ttsSupported && (
                  <button
                    onClick={() => setTtsEnabled(!ttsEnabled)}
                    className={cn("flex items-center gap-2 text-[9px] font-black uppercase tracking-widest", ttsEnabled ? "text-hamboi-green" : "text-white/20")}
                  >
                    {ttsEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                    Speech {ttsEnabled ? "On" : "Off"}
                  </button>
                )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
