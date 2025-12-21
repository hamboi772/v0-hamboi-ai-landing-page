"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function DailyWellnessTip() {
  const [tip, setTip] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchTip = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/wellness-tip")
      const data = await response.json()
      setTip(data.tip)
    } catch (error) {
      setTip("Take a moment today to check in with yourself. How are you really feeling?")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTip()
  }, [])

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-hamboi-purple/5 via-hamboi-blue/5 to-hamboi-purple/5">
      <div className="max-w-4xl mx-auto animate-fade-in-up">
        <Card className="border-2 border-hamboi-purple/20 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-hamboi-purple/20 to-hamboi-blue/20 rounded-2xl flex-shrink-0 animate-pulse-soft">
                <Sparkles className="h-6 w-6 text-hamboi-purple" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3 text-hamboi-dark">Daily Wellness Tip</h3>
                {loading ? (
                  <p className="text-hamboi-dark/60 animate-pulse text-lg">Loading today's tip...</p>
                ) : (
                  <p className="text-lg leading-relaxed text-hamboi-dark/80">{tip}</p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={fetchTip}
                disabled={loading}
                className="flex-shrink-0 hover:bg-hamboi-purple/10 text-hamboi-purple"
              >
                <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
