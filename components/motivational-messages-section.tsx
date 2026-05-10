"use client"

import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"

const motivationalMessages = [
  {
    message: "You're stronger than you think, and braver than you believe.",
    author: "Arowolo Hamzat",
  },
  {
    message: "It's okay to not be okay. Healing isn't linear, and that's perfectly normal.",
    author: "Alebiosu Hassan",
  },
  {
    message: "Your mental health is a priority, not an inconvenience.",
    author: "Shittu Robiu",
  },
  {
    message: "Small steps forward are still progress. Be proud of how far you've come.",
    author: "Edu Maruf",
  },
  {
    message: "You don't have to be positive all the time. It's okay to feel your feelings.",
    author: "Bada Fareeah",
  },
  {
    message: "Asking for help is a sign of strength, not weakness.",
    author: "Martins Zayd",
  },
  {
    message: "You are not your thoughts. You are the observer of your thoughts.",
    author: "Arikawe Aleeyah",
  },
  {
    message: "Be gentle with yourself. You're doing the best you can.",
    author: "Asaolu Tomiwa",
  },
  {
    message: "Your story isn't over yet. Tomorrow is a new chapter.",
    author: "Alli Aaliyah",
  },
  {
    message: "You matter. Your feelings matter. You are worthy of love and support.",
    author: "Yusuf Bareerah",
  },
  {
    message: "The darkest nights produce the brightest stars. Keep going.",
    author: "Adekeye Fareedah",
  },
  {
    message: "You've survived 100% of your bad days. You're undefeated.",
    author: "Falana Muyinudeen",
  },
  {
    message: "Progress, not perfection. Every small win counts.",
    author: "Abiodun AbdulHameed",
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
    <section className="py-20 px-4 bg-gradient-to-b from-hamboi-dark-bg via-[#1a1a3e] to-hamboi-dark-bg">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-hamboi-purple/20 border border-hamboi-purple/50 text-hamboi-green rounded-full text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4" />
            Daily Motivation
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white text-balance leading-tight">You've Got This</h2>
        </div>

        <div className="relative">
          {/* Main quote card */}
          <div
            className={`bg-gradient-to-br from-hamboi-dark-card to-[#2a2640] rounded-3xl p-8 md:p-12 shadow-xl border border-hamboi-purple/40 transition-all duration-500 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="flex flex-col items-center text-center gap-6">
              <div className="text-6xl text-hamboi-purple/30">"</div>

              <p className="text-xl md:text-2xl font-bold text-white leading-relaxed text-balance">
                {currentMessage.message}
              </p>

              <div className="flex items-center gap-2 text-hamboi-green font-bold">
                <div className="w-8 h-0.5 bg-hamboi-green/40" />
                <span>{currentMessage.author}</span>
                <div className="w-8 h-0.5 bg-hamboi-green/40" />
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
                  index === currentIndex ? "bg-hamboi-green w-8" : "bg-hamboi-purple/40 hover:bg-hamboi-purple/60"
                }`}
                aria-label={`Go to message ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Sub-messages grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <div className="bg-hamboi-dark-card rounded-2xl p-6 text-center border border-hamboi-purple/40 hover:border-hamboi-purple/70 transition-all">
            <div className="text-3xl font-black text-hamboi-green mb-2">100%</div>
            <p className="text-sm text-hamboi-text-muted font-medium">You've survived every bad day so far</p>
          </div>

          <div className="bg-hamboi-dark-card rounded-2xl p-6 text-center border border-hamboi-purple/40 hover:border-hamboi-purple/70 transition-all">
            <div className="text-3xl font-black text-hamboi-cyan mb-2">24/7</div>
            <p className="text-sm text-hamboi-text-muted font-medium">Support is always available</p>
          </div>

          <div className="bg-hamboi-dark-card rounded-2xl p-6 text-center border border-hamboi-purple/40 hover:border-hamboi-purple/70 transition-all">
            <div className="text-3xl font-black text-hamboi-pink mb-2">You</div>
            <p className="text-sm text-hamboi-text-muted font-medium">Are worthy of love and care</p>
          </div>
        </div>
      </div>
    </section>
  )
}
