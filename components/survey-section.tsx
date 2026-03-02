"use client"

import type React from "react"

import { useState } from "react"
import { ClipboardList, ChevronRight, RefreshCw, Heart, AlertTriangle, Smile, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Question {
  id: number
  question: string
  options: {
    text: string
    score: number
  }[]
}

const surveyQuestions: Question[] = [
  {
    id: 1,
    question: "Over the past 2 weeks, how often have you felt nervous, anxious, or on edge?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 2,
    question: "How often do you have trouble relaxing?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 3,
    question: "How often have you felt down, depressed, or hopeless?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 4,
    question: "How often do you have trouble falling or staying asleep?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 5,
    question: "How often do you feel tired or have little energy?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 6,
    question: "How often have you had little interest or pleasure in doing things?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 7,
    question: "How would you rate your overall stress level right now?",
    options: [
      { text: "Very low - I feel calm", score: 0 },
      { text: "Somewhat stressed", score: 1 },
      { text: "Moderately stressed", score: 2 },
      { text: "Very stressed", score: 3 },
    ],
  },
]

interface Result {
  title: string
  description: string
  icon: React.ReactNode
  color: string
  tips: string[]
}

const getResult = (score: number): Result => {
  const maxScore = surveyQuestions.length * 3
  const percentage = (score / maxScore) * 100

  if (percentage <= 25) {
    return {
      title: "You're Doing Great!",
      description: "Your responses suggest you're managing well. Keep up the positive habits that are working for you.",
      icon: <ThumbsUp className="w-8 h-8" />,
      color: "text-green-600 bg-green-100",
      tips: [
        "Continue your current self-care routines",
        "Stay connected with friends and family",
        "Keep a gratitude journal to maintain positivity",
        "Regular exercise helps maintain mental wellness",
      ],
    }
  } else if (percentage <= 50) {
    return {
      title: "Some Mild Stress Detected",
      description:
        "You might be experiencing some stress or low mood. This is normal, but there are ways to feel better.",
      icon: <Smile className="w-8 h-8" />,
      color: "text-blue-600 bg-blue-100",
      tips: [
        "Try talking to someone you trust about how you feel",
        "Practice deep breathing exercises for 5 minutes daily",
        "Make time for activities you enjoy",
        "Consider trying the Hamboi AI app for daily support",
      ],
    }
  } else if (percentage <= 75) {
    return {
      title: "Moderate Stress Levels",
      description:
        "Your answers suggest you might benefit from some extra support. Remember, asking for help is a sign of strength.",
      icon: <Heart className="w-8 h-8" />,
      color: "text-amber-600 bg-amber-100",
      tips: [
        "Consider talking to a school counselor or trusted adult",
        "Practice mindfulness or meditation regularly",
        "Limit social media if it affects your mood",
        "Make sleep a priority - aim for 8-9 hours",
        "The Hamboi AI app can provide daily coping strategies",
      ],
    }
  } else {
    return {
      title: "You Deserve Support",
      description:
        "Your responses suggest you're going through a difficult time. Please know that help is available and things can get better.",
      icon: <AlertTriangle className="w-8 h-8" />,
      color: "text-red-600 bg-red-100",
      tips: [
        "Please talk to a trusted adult, counselor, or therapist",
        "If you're in crisis, text HOME to 741741 (Crisis Text Line)",
        "Call 988 for the Suicide & Crisis Lifeline (available 24/7)",
        "Remember: What you're feeling is temporary, and help is available",
        "You are not alone, and reaching out takes courage",
      ],
    }
  }
}

export function SurveySection() {
  const [started, setStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score]
    setAnswers(newAnswers)

    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const resetSurvey = () => {
    setStarted(false)
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
  }

  const totalScore = answers.reduce((sum, score) => sum + score, 0)
  const result = getResult(totalScore)
  const progress = ((currentQuestion + 1) / surveyQuestions.length) * 100

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-hamboi-dark-bg via-[#1a1a3e] to-hamboi-dark-bg">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-hamboi-purple/20 border border-hamboi-purple/50 text-hamboi-green px-4 py-2 rounded-full text-sm font-bold mb-6">
            <ClipboardList className="w-4 h-4" />
            Mental Wellness Check
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">How Are You Really Feeling?</h2>
          <p className="text-hamboi-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Take this quick, anonymous wellness check to understand your mental health better. Your answers are private and not stored.
          </p>
        </div>

        <Card className="shadow-xl border-2 border-hamboi-purple/40 bg-hamboi-dark-card overflow-hidden">
          {!started ? (
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-hamboi-purple/30 to-hamboi-green/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <ClipboardList className="w-10 h-10 text-hamboi-green" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Quick Mental Health Check-In</h3>
              <p className="text-hamboi-text-muted mb-8 leading-relaxed">
                Answer 7 simple questions to get personalized insights and tips. Takes about 2 minutes. Your responses are completely private.
              </p>
              <Button onClick={() => setStarted(true)} size="lg" className="bg-hamboi-green hover:bg-emerald-500 text-hamboi-dark-bg font-bold">
                Start Check-In
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-xs text-hamboi-text-muted mt-6">
                Note: This is not a diagnostic tool. If you are in crisis, please call 988 or text HOME to 741741.
              </p>
            </CardContent>
          ) : showResult ? (
            <div>
              <div className="bg-gradient-to-r from-hamboi-purple/30 to-hamboi-green/30 p-6 border-b border-hamboi-purple/40">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-hamboi-dark-card rounded-full text-hamboi-green">{result.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{result.title}</h3>
                    <p className="text-sm text-hamboi-text-muted font-medium">
                      Score: {totalScore} / {surveyQuestions.length * 3}
                    </p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-hamboi-text-muted mb-6 leading-relaxed">{result.description}</p>
                <div className="bg-hamboi-dark-bg rounded-lg p-4 mb-6 border border-hamboi-purple/30">
                  <h4 className="font-bold text-white mb-3">Recommended Next Steps:</h4>
                  <ul className="space-y-2">
                    {result.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-hamboi-text-muted">
                        <span className="text-hamboi-green mt-1">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={resetSurvey} variant="outline" className="flex-1 bg-transparent border-hamboi-purple/40 text-hamboi-purple hover:bg-hamboi-purple/10 font-bold">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Take Again
                  </Button>
                  <Button
                    className="flex-1 bg-hamboi-green hover:bg-emerald-500 text-hamboi-dark-bg font-bold"
                    onClick={() => {
                      const heroSection = document.getElementById("hero")
                      heroSection?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    Try Hamboi AI
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </div>
          ) : (
            <div>
              <CardHeader className="border-b border-hamboi-purple/30 bg-hamboi-dark-bg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-hamboi-text-muted font-medium">
                    Question {currentQuestion + 1} of {surveyQuestions.length}
                  </span>
                  <span className="text-sm font-bold text-hamboi-green">{Math.round(progress)}% complete</span>
                </div>
                <Progress value={progress} className="h-2 bg-hamboi-dark-card" />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-lg mb-6 text-white font-bold">
                  {surveyQuestions[currentQuestion].question}
                </CardTitle>
                <div className="space-y-3">
                  {surveyQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option.score)}
                      className="w-full p-4 text-left border rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
                    >
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {option.text}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </div>
          )}
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          This wellness check is for informational purposes only and is not a substitute for professional medical
          advice, diagnosis, or treatment. If you are experiencing a mental health emergency, please call 988
          immediately.
        </p>
      </div>
    </section>
  )
}
