"use client"

import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"

const motivationalMessages = [
  {
    message: "You're stronger than you think, and braver than you believe.",
    author: "Anonymous",
  },
  {
    message: "It's okay to not be okay. Healing isn't linear, and that's perfectly normal.",
    author: "Anonymous",
  },
  {
    message: "Your mental health is a priority, not an inconvenience.",
    author: "Anonymous",
  },
  {
    message: "Small steps forward are still progress. Be proud of how far you've come.",
    author: "Anonymous",
  },
  {
    message: "You don't have to be positive all the time. It's okay to feel your feelings.",
    author: "Anonymous",
  },
  {
    message: "Asking for help is a sign of strength, not weakness.",
    author: "Anonymous",
  },
  {
    message: "You are not your thoughts. You are the observer of your thoughts.",
    author: "Anonymous",
  },
  {
    message: "Be gentle with yourself. You're doing the best you can.",
    author: "Anonymous",
  },
  {
    message: "Your story isn't over yet. Tomorrow is a new chapter.",
    author: "Anonymous",
  },
  {
    message: "You matter. Your feelings matter. You are worthy of love and support.",
    author: "Anonymous",
  },
  {
    message: "The darkest nights produce the brightest stars. Keep going.",
    author: "Anonymous",
  },
  {
    message: "You've survived 100% of your bad days. You're undefeated.",
    author: "Anonymous",
  },
  {
    message: "Progress, not perfection. Every small win counts.",
    author: "Anonymous",
  },
  {
    message: "It takes courage to grow up and become who you really are.",
    author: "E.E. Cummings",
  },
  {
    message: "You yourself, as much as anybody in the entire universe, deserve your love.",
    author: "Buddha",
  },
]

export function MotivationalMessagesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % motivationalMessages.length)
        setIsVisible(true)
      }, 500)
    }, 8000) // Change message every 8 seconds

    return () => clearInterval(interval)
  }, [])

  const currentMessage = motivationalMessages[currentIndex]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Daily Motivation
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-balance">You've Got This</h2>
        </div>

        <div className="relative">
          {/* Main quote card */}
          <div
            className={`bg-white rounded-3xl p-8 md:p-12 shadow-lg transition-all duration-500 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="flex flex-col items-center text-center gap-6">
              <div className="text-6xl text-purple-200">"</div>

              <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed text-balance">
                {currentMessage.message}
              </p>

              <div className="flex items-center gap-2 text-purple-600 font-medium">
                <div className="w-8 h-0.5 bg-purple-300" />
                <span>{currentMessage.author}</span>
                <div className="w-8 h-0.5 bg-purple-300" />
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-8">
            {motivationalMessages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsVisible(false)
                  setTimeout(() => {
                    setCurrentIndex(index)
                    setIsVisible(true)
                  }, 300)
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-purple-600 w-8" : "bg-purple-200 hover:bg-purple-300"
                }`}
                aria-label={`Go to message ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Sub-messages grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <div className="bg-white/80 backdrop-blur rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
            <p className="text-sm text-gray-600">You've survived every bad day so far</p>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <p className="text-sm text-gray-600">Support is always available</p>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">You</div>
            <p className="text-sm text-gray-600">Are worthy of love and care</p>
          </div>
        </div>
      </div>
    </section>
  )
}
