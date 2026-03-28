"use client"

import { useState, useEffect } from "react"

const facts = [
  {
    emoji: "🧠",
    fact: "1 in 7 teenagers globally experience a mental health disorder, yet most go undiagnosed and untreated.",
  },
  {
    emoji: "⏰",
    fact: "75% of all mental health conditions begin before the age of 25. Early support makes a huge difference.",
  },
  {
    emoji: "🌍",
    fact: "90% of African teenagers have no access to mental health support. That's why Hamboi Mindcare exists.",
  },
  {
    emoji: "💬",
    fact: "Talking about your feelings for just 10 minutes a day can significantly reduce stress and anxiety.",
  },
  {
    emoji: "😴",
    fact: "Lack of sleep is one of the biggest triggers of teen anxiety and depression. Aim for 8–10 hours nightly.",
  },
  {
    emoji: "🏃",
    fact: "Just 30 minutes of physical activity a day can boost your mood as effectively as antidepressants.",
  },
  {
    emoji: "📖",
    fact: "Journaling for 5 minutes daily has been shown to reduce anxiety by up to 28% in teenagers.",
  },
  {
    emoji: "❤️",
    fact: "Having just one trusted person to talk to reduces the risk of depression in teenagers by over 50%.",
  },
  {
    emoji: "🌱",
    fact: "Mental health and physical health are equally important. Ignoring one always affects the other.",
  },
  {
    emoji: "😮‍💨",
    fact: "Deep breathing for just 2 minutes activates your body's relaxation response and reduces stress hormones.",
  },
  {
    emoji: "📱",
    fact: "Spending more than 3 hours a day on social media doubles the risk of depression in teenagers.",
  },
  {
    emoji: "🎵",
    fact: "Listening to music you love releases dopamine — the same feel-good chemical released during exercise.",
  },
  {
    emoji: "🤝",
    fact: "Volunteering and helping others is one of the most effective ways to improve your own mental health.",
  },
  {
    emoji: "🌞",
    fact: "Getting sunlight in the morning regulates your body clock and significantly improves your mood all day.",
  },
  {
    emoji: "🧘",
    fact: "Just 10 minutes of mindfulness meditation daily can reduce symptoms of anxiety and depression in teens.",
  },
  {
    emoji: "💧",
    fact: "Dehydration directly affects your brain. Drinking enough water can improve your focus and reduce anxiety.",
  },
  {
    emoji: "🎨",
    fact: "Creative activities like drawing, painting, or writing reduce cortisol (stress hormone) levels by 75%.",
  },
  {
    emoji: "👨‍👩‍👧",
    fact: "Teens who eat meals with their family at least 3 times a week report significantly better mental health.",
  },
  {
    emoji: "🚶",
    fact: "A 20-minute walk in nature reduces activity in the part of the brain linked to negative thinking.",
  },
  {
    emoji: "💪",
    fact: "Resilience is not something you're born with — it's a skill you build through facing and overcoming challenges.",
  },
  {
    emoji: "🗣️",
    fact: "Many teens suffer in silence due to stigma. Normalising mental health conversations saves lives.",
  },
  {
    emoji: "📚",
    fact: "Reading fiction for just 6 minutes reduces stress by 68% — more than listening to music or taking a walk.",
  },
  {
    emoji: "🌙",
    fact: "Using your phone before bed reduces melatonin production by 50%, making it harder to sleep and increasing anxiety.",
  },
  {
    emoji: "🤗",
    fact: "Hugging someone you trust for 20 seconds releases oxytocin, which reduces blood pressure and stress.",
  },
  {
    emoji: "🏫",
    fact: "Academic pressure is the number one cause of stress among Nigerian secondary school students.",
  },
  {
    emoji: "🔋",
    fact: "Burnout is real. Rest is not laziness — it is a necessary part of being healthy and productive.",
  },
  {
    emoji: "🌟",
    fact: "Gratitude journaling for just 3 weeks has been shown to increase long-term happiness by over 25%.",
  },
  {
    emoji: "🫂",
    fact: "Loneliness is as harmful to your health as smoking 15 cigarettes a day. Connection is essential.",
  },
]

export function DidYouKnowCard() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goToNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % facts.length)
      setIsAnimating(false)
    }, 300)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext()
    }, 6000)
    return () => clearInterval(interval)
  }, [isAnimating])

  const current = facts[currentIndex]

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-hamboi-dark-bg via-[#1a1a3e] to-hamboi-dark-bg">
      <div className="max-w-4xl mx-auto animate-fade-in-up">
        <div
          className="bg-[#1a1035] border border-purple-500/30 rounded-2xl p-6 cursor-pointer hover:border-purple-400/50 transition-all duration-300"
          onClick={goToNext}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 bg-purple-600/30 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                💡
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <p className="text-white font-bold text-sm">Did You Know?</p>
                <p className="text-gray-500 text-xs hidden sm:inline">—</p>
                <p className="text-gray-500 text-xs hidden sm:inline">Mental Health Facts</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-0.5 flex-shrink-0">
              {facts.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "w-3 bg-purple-400" : "w-1 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Fact */}
          <div
            className={`transition-all duration-300 ${
              isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
            }`}
          >
            <div className="flex gap-3 items-start">
              <span className="text-3xl">{current.emoji}</span>
              <p className="text-gray-300 text-sm leading-relaxed">{current.fact}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-gray-600 text-xs">Tap for next fact</p>
            <p className="text-purple-400 text-xs">
              {currentIndex + 1} / {facts.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
