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
    <section className="py-12 px-4 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
      <div className="max-w-4xl mx-auto">
        <Card className="border-2 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full flex-shrink-0">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Daily Wellness Tip</h3>
                {loading ? (
                  <p className="text-muted-foreground animate-pulse">Loading today's tip...</p>
                ) : (
                  <p className="text-lg leading-relaxed">{tip}</p>
                )}
              </div>
              <Button variant="ghost" size="icon" onClick={fetchTip} disabled={loading} className="flex-shrink-0">
                <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
