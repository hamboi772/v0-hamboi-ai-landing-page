"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { X, Mic, Square, Loader2, Volume2, VolumeX, Send, MessageSquare, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Speech Recognition Types
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

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition
    webkitSpeechRecognition: new () => SpeechRecognition
  }
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
  const [browserName, setBrowserName] = useState("")

  const textInputRef = useRef<HTMLTextAreaElement>(null)
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const finalTranscriptRef = useRef("")
  const shouldProcessOnEndRef = useRef(false)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  // Initialize speech capabilities and detect browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
      setSpeechSupported(!!SpeechRecognitionAPI)

      // Check TTS support
      if ("speechSynthesis" in window) {
        synthRef.current = window.speechSynthesis
        setTtsSupported(true)
      } else {
        setTtsSupported(false)
      }

      const ua = navigator.userAgent
      if (ua.includes("Firefox")) {
        setBrowserName("Firefox")
      } else if (ua.includes("Safari") && !ua.includes("Chrome")) {
        setBrowserName("Safari")
      } else if (ua.includes("Chrome")) {
        setBrowserName("Chrome")
      } else if (ua.includes("Edge")) {
        setBrowserName("Edge")
      } else {
        setBrowserName("your browser")
      }

      if (!SpeechRecognitionAPI) {
        setInputMode("text")
      }
    }
  }, [])

  // Text-to-Speech function
  const speakResponse = useCallback(
    (text: string) => {
      if (!ttsEnabled || !synthRef.current || !ttsSupported) return

      synthRef.current.cancel()

      const utterance = new SpeechSynthesisUtterance(text)

      // More natural speech settings - warmer and friendlier
      utterance.rate = 0.9 // Slower for warmth and clarity
      utterance.pitch = 1.15 // Higher for friendliness
      utterance.volume = 1.0

      // Get available voices and find the best one
      const voices = synthRef.current.getVoices()

      // Priority order for most natural, warm voices
      const preferredVoices = [
        // Premium natural voices (Google & Microsoft Neural)
        "Google UK English Female",
        "Google US English Female",
        "Microsoft Aria Online (Natural)", // Very natural sounding
        "Microsoft Jenny Online (Natural)",
        "Microsoft Michelle Online (Natural)",
        // Mac voices (high quality)
        "Samantha", // Classic warm female
        "Karen", // Australian - very natural
        "Moira", // Irish - warm and friendly
        "Fiona", // Scottish
        "Tessa", // South African
        "Victoria", // Female UK
        // Fallback premium male voices
        "Google UK English Male",
        "Microsoft Guy Online (Natural)",
        "Daniel", // Mac UK Male
        "Tom", // Mac US Male
        "Alex", // Mac default
      ]

      let selectedVoice = null
      for (const voiceName of preferredVoices) {
        const found = voices.find((v) => v.name.includes(voiceName))
        if (found) {
          selectedVoice = found
          break
        }
      }

      // If no preferred voice found, try to find any high-quality English voice
      if (!selectedVoice) {
        selectedVoice = voices.find(
          (v) =>
            v.lang.startsWith("en") &&
            (v.name.toLowerCase().includes("natural") ||
              v.name.toLowerCase().includes("premium") ||
              v.name.toLowerCase().includes("female")),
        )
      }

      // Fallback to any English voice
      if (!selectedVoice) {
        selectedVoice = voices.find((v) => v.lang.startsWith("en"))
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice
      }

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      synthRef.current.speak(utterance)
    },
    [ttsEnabled, ttsSupported],
  )

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    }
  }, [])

  // Typewriter effect and speak when complete
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
          speakResponse(response)
        }
      }, 25)
      return () => clearInterval(interval)
    }
  }, [response, isProcessing, speakResponse])

  // Process transcript with API
  const processTranscript = useCallback(async (text: string) => {
    if (!text.trim()) {
      setError("I didn't catch that. Could you try speaking again?")
      setIsProcessing(false)
      return
    }

    console.log("[v0] Processing transcript:", text)

    try {
      const res = await fetch("/api/voice-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })

      console.log("[v0] API Response status:", res.status)

      const data = await res.json()
      console.log("[v0] API Response data:", data)

      if (data.error) {
        setError(data.error)
        return
      }

      if (data.response) {
        setTranscript(text)
        setResponse(data.response)
        setConversation((prev) => [...prev.slice(-2), { user: text, ai: data.response }])

        // Speak the response if TTS is enabled
        if (ttsEnabled && synthRef.current) {
          speakResponse(data.response)
        }
      } else {
        setError("I didn't get a response. Please try again.")
      }
    } catch (err) {
      console.log("[v0] API Error:", err)
      setError("Sorry, something went wrong. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }, [])

  // Start voice recording
  const startRecording = async () => {
    if (!speechSupported) {
      setError(`Voice input isn't supported in ${browserName}. Please use text input or try Chrome/Edge.`)
      return
    }

    setError("")
    setLiveTranscript("")
    finalTranscriptRef.current = ""
    shouldProcessOnEndRef.current = false

    try {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognitionAPI()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onstart = () => {
        setIsRecording(true)
        setRecordingDuration(0)
        recordingIntervalRef.current = setInterval(() => {
          setRecordingDuration((prev) => prev + 1)
        }, 1000)
      }

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = ""
        let finalTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i]
          if (result.isFinal) {
            finalTranscript += result[0].transcript
          } else {
            interimTranscript += result[0].transcript
          }
        }

        if (finalTranscript) {
          finalTranscriptRef.current += finalTranscript
        }

        setLiveTranscript(finalTranscriptRef.current + interimTranscript)
      }

      recognitionRef.current.onerror = (event: Event & { error: string }) => {
        if (recordingIntervalRef.current) {
          clearInterval(recordingIntervalRef.current)
        }
        setIsRecording(false)

        switch (event.error) {
          case "not-allowed":
            setError("Microphone access denied. Please allow microphone access in your browser settings and try again.")
            break
          case "no-speech":
            setError("No speech detected. Try speaking closer to your microphone.")
            break
          case "network":
            setError("Network error. Please check your internet connection.")
            break
          case "aborted":
            break
          default:
            setError(`Voice recognition error. Try using text input instead.`)
        }
      }

      recognitionRef.current.onend = () => {
        if (recordingIntervalRef.current) {
          clearInterval(recordingIntervalRef.current)
        }
        setIsRecording(false)

        if (shouldProcessOnEndRef.current) {
          const textToProcess = finalTranscriptRef.current.trim() || liveTranscript.trim()
          if (textToProcess) {
            setIsProcessing(true)
            processTranscript(textToProcess)
          }
        }
      }

      recognitionRef.current.start()
    } catch (err) {
      setError(`Could not start voice recognition. Please use text input instead.`)
    }
  }

  // Stop recording
  const stopRecording = () => {
    shouldProcessOnEndRef.current = true
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current)
    }
  }

  // Handle text submit
  const handleTextSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    const userMessage = textInput.trim()
    if (!userMessage || isProcessing) return

    console.log("[v0] Text submit - user message:", userMessage)

    setIsProcessing(true)
    setError("")
    setTextInput("")
    setLiveTranscript("")

    await processTranscript(userMessage)
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current)
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [])

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setTranscript("")
      setResponse("")
      setDisplayedResponse("")
      setError("")
      setLiveTranscript("")
      setRecordingDuration(0)
      stopSpeaking()
    }
  }, [isOpen, stopSpeaking])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-hamboi-purple via-hamboi-purple/95 to-hamboi-blue" />

      <div className="relative z-10 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close demo"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center text-white pt-8 pb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Talk to Hamboi</h2>
          <p className="text-white/70">Share what's on your mind. I'm here to listen.</p>
        </div>

        {!speechSupported && inputMode === "voice" && (
          <div className="mx-4 mb-4 p-4 bg-amber-500/20 border border-amber-400/30 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-300 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-100">
                <p className="font-medium mb-1">Voice input not supported in {browserName}</p>
                <p className="text-amber-200/80">
                  For voice chat, please use Chrome, Edge, or Safari. You can still chat using text below!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Mode toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/10 rounded-full p-1 flex">
            <button
              onClick={() => setInputMode("voice")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                inputMode === "voice" ? "bg-white text-hamboi-purple" : "text-white/70 hover:text-white",
              )}
            >
              <Mic className="h-4 w-4" />
              Voice
            </button>
            <button
              onClick={() => setInputMode("text")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                inputMode === "text" ? "bg-white text-hamboi-purple" : "text-white/70 hover:text-white",
              )}
            >
              <MessageSquare className="h-4 w-4" />
              Text
            </button>
          </div>
        </div>

        {/* Voice Input */}
        {inputMode === "voice" && speechSupported && (
          <div className="flex flex-col items-center gap-6 mb-8">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isProcessing}
              className={cn(
                "w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center transition-all duration-300",
                isRecording
                  ? "bg-red-500 animate-pulse scale-110"
                  : isProcessing
                    ? "bg-white/20 cursor-wait"
                    : "bg-white/20 hover:bg-white/30 hover:scale-105",
              )}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
              {isProcessing ? (
                <Loader2 className="h-12 w-12 md:h-16 md:w-16 text-white animate-spin" />
              ) : isRecording ? (
                <Square className="h-12 w-12 md:h-16 md:w-16 text-white" />
              ) : (
                <Mic className="h-12 w-12 md:h-16 md:w-16 text-white" />
              )}
            </button>

            <p className="text-white/80 text-lg">
              {isProcessing
                ? "Hamboi is thinking..."
                : isRecording
                  ? `Listening... (${recordingDuration}s)`
                  : "Tap to start talking"}
            </p>

            {isRecording && liveTranscript && (
              <div className="bg-white/10 rounded-xl p-4 max-w-md w-full">
                <p className="text-white/60 text-sm mb-1">I'm hearing:</p>
                <p className="text-white">{liveTranscript}</p>
              </div>
            )}
          </div>
        )}

        {/* Text Input */}
        {(inputMode === "text" || !speechSupported) && (
          <form onSubmit={handleTextSubmit} className="mx-4 mb-8">
            <div className="relative">
              <textarea
                ref={textInputRef}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type what's on your mind..."
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 pr-14 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
                rows={3}
                disabled={isProcessing}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleTextSubmit(e)
                  }
                }}
              />
              <Button
                type="submit"
                disabled={!textInput.trim() || isProcessing}
                size="icon"
                className="absolute right-3 bottom-3 rounded-full bg-white text-hamboi-purple hover:bg-white/90 disabled:opacity-50"
              >
                {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </div>
          </form>
        )}

        {/* TTS Controls */}
        {ttsSupported && (
          <div className="flex justify-center gap-2 mb-6">
            <button
              onClick={() => setTtsEnabled(!ttsEnabled)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors",
                ttsEnabled ? "bg-white/20 text-white" : "bg-white/10 text-white/60",
              )}
            >
              {ttsEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              Voice {ttsEnabled ? "On" : "Off"}
            </button>
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="px-4 py-2 rounded-full text-sm bg-red-500/20 text-red-200 hover:bg-red-500/30 transition-colors"
              >
                Stop Speaking
              </button>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mx-4 mb-4 p-4 bg-red-500/20 border border-red-400/30 rounded-xl text-center">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Response Display */}
        {(transcript || displayedResponse) && (
          <div className="mx-4 mb-6 space-y-4">
            {transcript && (
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-white/60 text-sm mb-1">You said:</p>
                <p className="text-white text-lg">"{transcript}"</p>
              </div>
            )}

            {displayedResponse && (
              <div className="bg-white/20 rounded-xl p-4">
                <p className="text-hamboi-green text-sm mb-1 font-medium">Hamboi says:</p>
                <p className="text-white text-lg leading-relaxed">{displayedResponse}</p>
              </div>
            )}
          </div>
        )}

        {/* Conversation History */}
        {conversation.length > 1 && (
          <div className="mx-4 mb-6">
            <p className="text-white/60 text-sm mb-3">Earlier in our chat:</p>
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {conversation.slice(0, -1).map((msg, i) => (
                <div key={i} className="bg-white/5 rounded-lg p-3 text-sm">
                  <p className="text-white/70">
                    <span className="text-white/50">You:</span> {msg.user}
                  </p>
                  <p className="text-white/70 mt-1">
                    <span className="text-hamboi-green/70">Hamboi:</span> {msg.ai}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Privacy Notice */}
        <div className="text-center pb-8">
          <p className="text-white/50 text-sm">
            Enjoying the demo? Download the app for the full experience with personalized support and saved
            conversations.
          </p>
        </div>

        {/* End Conversation */}
        <div className="flex justify-center pb-8">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            End Conversation
          </Button>
        </div>
      </div>
    </div>
  )
}
