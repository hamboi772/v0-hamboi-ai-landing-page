"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Mic, Square, Loader2, Volume2, Send, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [displayedResponse, setDisplayedResponse] = useState("")
  const [audioUrl, setAudioUrl] = useState("")
  const [conversation, setConversation] = useState<ConversationMessage[]>([])
  const [error, setError] = useState("")
  const [inputMode, setInputMode] = useState<"voice" | "text">("voice")
  const [textInput, setTextInput] = useState("")

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const textInputRef = useRef<HTMLTextAreaElement>(null)

  // Typewriter effect
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
      }, 30)
      return () => clearInterval(interval)
    }
  }, [response, isProcessing])

  // Auto-play audio
  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Autoplay blocked, user will need to click
      })
    }
  }, [audioUrl])

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (inputMode === "text" && textInputRef.current) {
      textInputRef.current.focus()
    }
  }, [inputMode])

  const startRecording = async () => {
    try {
      setError("")
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        await processAudio(audioBlob)
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch {
      setError("Please allow microphone access to try the voice demo")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setIsProcessing(true)
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
    }
  }

  const processAudio = async (audioBlob: Blob) => {
    try {
      const formData = new FormData()
      formData.append("audio", audioBlob, "recording.webm")

      const res = await fetch("/api/voice-chat", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Failed to process audio")
      }

      const data = await res.json()

      setTranscript(data.transcript)
      setResponse(data.response)
      setAudioUrl(data.audioUrl)
      setConversation((prev) => [...prev, { user: data.transcript, ai: data.response }].slice(-3))
    } catch {
      setError("Sorry, there was an error. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleTextSubmit = async () => {
    if (!textInput.trim() || isProcessing) return

    setIsProcessing(true)
    setError("")
    const userMessage = textInput.trim()
    setTextInput("")

    try {
      const res = await fetch("/api/voice-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: userMessage }),
      })

      if (!res.ok) {
        throw new Error("Failed to process message")
      }

      const data = await res.json()

      setTranscript(userMessage)
      setResponse(data.response)
      setAudioUrl(data.audioUrl)
      setConversation((prev) => [...prev, { user: userMessage, ai: data.response }].slice(-3))
    } catch {
      setError("Sorry, there was an error. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleTextSubmit()
    }
  }

  const handleButtonClick = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const getStatusText = () => {
    if (isProcessing) return "Hamboi is thinking..."
    if (isRecording) return "Listening..."
    if (inputMode === "text") return "Type your message below..."
    return "Press to start talking..."
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-hamboi-purple via-hamboi-purple/90 to-hamboi-blue"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors z-20"
          aria-label="Close demo"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col items-center justify-center py-12 px-6 space-y-8">
          {/* Title */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Talk to Hamboi</h2>
            <p className="text-white/80 text-lg">Share how you're feeling. I'm here to listen.</p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 rounded-full p-1">
            <button
              onClick={() => setInputMode("voice")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-medium",
                inputMode === "voice" ? "bg-white text-hamboi-purple" : "text-white/70 hover:text-white",
              )}
            >
              <Mic className="h-4 w-4" />
              Voice
            </button>
            <button
              onClick={() => setInputMode("text")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-medium",
                inputMode === "text" ? "bg-white text-hamboi-purple" : "text-white/70 hover:text-white",
              )}
            >
              <MessageSquare className="h-4 w-4" />
              Text
            </button>
          </div>

          {inputMode === "voice" ? (
            <>
              {/* Mic Button */}
              <button
                onClick={handleButtonClick}
                disabled={isProcessing}
                className={cn(
                  "relative w-36 h-36 md:w-40 md:h-40 rounded-full flex items-center justify-center transition-all duration-300",
                  "bg-white shadow-2xl",
                  isRecording && "animate-pulse ring-4 ring-white/50",
                  isProcessing && "opacity-70 cursor-not-allowed",
                  !isRecording && !isProcessing && "hover:scale-105 hover:shadow-3xl",
                )}
                aria-label={isRecording ? "Stop recording" : "Start recording"}
              >
                {/* Pulsing rings when recording */}
                {isRecording && (
                  <>
                    <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
                    <span
                      className="absolute inset-0 rounded-full bg-white/20 animate-ping"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </>
                )}

                {/* Glow effect when processing */}
                {isProcessing && <span className="absolute inset-0 rounded-full bg-hamboi-green/30 animate-pulse" />}

                {isProcessing ? (
                  <Loader2 className="h-16 w-16 text-hamboi-purple animate-spin" />
                ) : isRecording ? (
                  <Square className="h-14 w-14 text-red-500" />
                ) : (
                  <Mic className="h-16 w-16 text-hamboi-purple" />
                )}
              </button>

              {/* Audio Visualizer placeholder when recording */}
              {isRecording && (
                <div className="flex items-center gap-1 h-12">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-white rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.05}s`,
                        animationDuration: "0.5s",
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            /* Text Input Area */
            <div className="w-full max-w-lg space-y-4">
              <div className="relative">
                <textarea
                  ref={textInputRef}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="How are you feeling today? What's on your mind?"
                  disabled={isProcessing}
                  className={cn(
                    "w-full min-h-32 p-4 pr-14 rounded-2xl bg-white/10 backdrop-blur-sm",
                    "text-white placeholder:text-white/50 text-lg",
                    "border border-white/20 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20",
                    "resize-none transition-all",
                    isProcessing && "opacity-70 cursor-not-allowed",
                  )}
                  rows={4}
                />
                <button
                  onClick={handleTextSubmit}
                  disabled={!textInput.trim() || isProcessing}
                  className={cn(
                    "absolute bottom-4 right-4 p-3 rounded-full transition-all",
                    textInput.trim() && !isProcessing
                      ? "bg-white text-hamboi-purple hover:scale-105"
                      : "bg-white/20 text-white/50 cursor-not-allowed",
                  )}
                  aria-label="Send message"
                >
                  {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </button>
              </div>
              <p className="text-white/50 text-sm text-center">Press Enter to send, Shift+Enter for new line</p>
            </div>
          )}

          {/* Status Text */}
          <p className="text-xl text-white font-medium">{getStatusText()}</p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-2 rounded-lg">{error}</div>
          )}

          {/* Response Display */}
          {(transcript || response) && !isRecording && (
            <div className="w-full max-w-lg bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
              {transcript && (
                <div className="space-y-1">
                  <p className="text-white/60 text-sm font-medium">You said:</p>
                  <p className="text-white text-lg">"{transcript}"</p>
                </div>
              )}

              {response && (
                <div className="space-y-2">
                  <p className="text-hamboi-green text-sm font-medium">Hamboi says:</p>
                  <p className="text-white text-lg leading-relaxed">{displayedResponse}</p>
                </div>
              )}

              {audioUrl && (
                <div className="flex items-center gap-3 pt-2">
                  <Volume2 className="h-5 w-5 text-white/60" />
                  <audio ref={audioRef} controls src={audioUrl} className="flex-1 h-10 audio-player" />
                </div>
              )}
            </div>
          )}

          {/* Conversation History */}
          {conversation.length > 1 && (
            <div className="w-full max-w-lg space-y-3">
              <h3 className="text-white/60 text-sm font-medium">Recent conversation:</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {conversation.slice(0, -1).map((msg, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 space-y-2">
                    <p className="text-white/80 text-sm">
                      <span className="font-medium">You:</span> {msg.user}
                    </p>
                    <p className="text-white/80 text-sm">
                      <span className="font-medium text-hamboi-green">Hamboi:</span> {msg.ai}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Privacy Notice */}
          <p className="text-white/50 text-sm text-center max-w-md">
            This demo conversation is not stored. Try the real app for full privacy and features.
          </p>

          {/* End Conversation Button */}
          <Button
            onClick={onClose}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white rounded-full px-8 bg-transparent"
          >
            End Conversation
          </Button>
        </div>
      </div>
    </div>
  )
}
