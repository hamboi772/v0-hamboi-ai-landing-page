"use client"

import { useState, useEffect } from "react"

const facts = [
  { fact: "1 in 7 teenagers globally experience a mental health disorder, yet most go undiagnosed and untreated." },
  { fact: "75% of all mental health conditions begin before the age of 25. Early support makes a huge difference." },
  { fact: "90% of African teenagers have no access to mental health support. That's why Hamboi Mindcare exists." },
  { fact: "Talking about your feelings for just 10 minutes a day can significantly reduce stress and anxiety." },
  { fact: "Lack of sleep is one of the biggest triggers of teen anxiety and depression. Aim for 8–10 hours nightly." },
  { fact: "Just 30 minutes of physical activity a day can boost your mood as effectively as antidepressants." },
  { fact: "Journaling for 5 minutes daily has been shown to reduce anxiety by up to 28% in teenagers." },
  { fact: "Having just one trusted person to talk to reduces the risk of depression in teenagers by over 50%." },
  { fact: "Mental health and physical health are equally important. Ignoring one always affects the other." },
  { fact: "Deep breathing for just 2 minutes activates your body's relaxation response and reduces stress hormones." },
  { fact: "Spending more than 3 hours a day on social media doubles the risk of depression in teenagers." },
  { fact: "Listening to music you love releases dopamine — the same feel-good chemical released during exercise." },
  { fact: "Volunteering and helping others is one of the most effective ways to improve your own mental health." },
  { fact: "Getting sunlight in the morning regulates your body clock and significantly improves your mood all day." },
  { fact: "Just 10 minutes of mindfulness meditation daily can reduce symptoms of anxiety and depression in teens." },
  { fact: "Dehydration directly affects your brain. Drinking enough water can improve your focus and reduce anxiety." },
  { fact: "Creative activities like drawing, painting, or writing reduce cortisol (stress hormone) levels by 75%." },
  { fact: "Teens who eat meals with their family at least 3 times a week report significantly better mental health." },
  { fact: "A 20-minute walk in nature reduces activity in the part of the brain linked to negative thinking." },
  { fact: "Resilience is not something you're born with — it's a skill you build through facing and overcoming challenges." },
  { fact: "Many teens suffer in silence due to stigma. Normalising mental health conversations saves lives." },
  { fact: "Reading fiction for just 6 minutes reduces stress by 68% — more than listening to music or taking a walk." },
  { fact: "Using your phone before bed reduces melatonin production by 50%, making it harder to sleep and increasing anxiety." },
  { fact: "Hugging someone you trust for 20 seconds releases oxytocin, which reduces blood pressure and stress." },
  { fact: "Academic pressure is the number one cause of stress among Nigerian secondary school students." },
  { fact: "Burnout is real. Rest is not laziness — it is a necessary part of being healthy and productive." },
  { fact: "Gratitude journaling for just 3 weeks has been shown to increase long-term happiness by over 25%." },
  { fact: "Loneliness is as harmful to your health as smoking 15 cigarettes a day. Connection is essential." },
]

export default function DidYouKnowCard() {
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
    const interval = setInterval(goToNext, 6000)
    return () => clearInterval(interval)
  }, [isAnimating])

  const current = facts[currentIndex]

  return (
    <div
      className="bg-[#06080F] border px-6 py-8 cursor-pointer transition-all duration-300 font-sans"
      style={{ borderColor: "rgba(255, 255, 255, 0.07)" }}
      onClick={goToNext}
    >
      {/* Label */}
      <div className="mb-6">
        <div
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "#0CF2C8", paddingBottom: "8px", borderBottom: "1px solid rgba(12, 242, 200, 0.3)" }}
        >
          Did You Know
        </div>
      </div>

      {/* Fact and controls */}
      <div className="flex flex-col">
        {/* Fact */}
        <div
          className={`transition-all duration-300 mb-6 flex-grow ${
            isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          <p className="text-2xl font-serif font-bold leading-relaxed" style={{ color: "#F5F5F5" }}>
            {current.fact}
          </p>
        </div>

        {/* Dot indicator and tap text */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-1">
            {facts.map((_, i) => (
              <div
                key={i}
                className="transition-all duration-300"
                style={{
                  width: i === currentIndex ? "24px" : "6px",
                  height: "3px",
                  background: i === currentIndex ? "#F5F5F5" : "rgba(255, 255, 255, 0.2)",
                }}
              />
            ))}
          </div>
          <p className="text-xs font-sans" style={{ color: "rgba(255, 255, 255, 0.35)" }}>
            Tap for next fact
          </p>
        </div>
      </div>
    </div>
  )
}
