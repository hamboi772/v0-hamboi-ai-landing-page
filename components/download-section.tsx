"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react"
// import { AppStoreBadges } from "@/components/app-store-badges"

export function DownloadSection() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    setError("")

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        setIsSubmitted(true)
        setEmail("")
      } else {
        setError(data.error || "Something went wrong")
      }
    } catch {
      setError("Could not connect. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-hamboi-purple via-hamboi-purple/90 to-hamboi-blue text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-balance">Join the Waitlist</h2>
          <p className="text-xl text-white/80">
            Be among the first to know when Hamboi Mindcare launches. We're building something special for teens who
            need support.
          </p>

          <div className="pt-4">
            <p className="text-white/90 mb-4 font-medium">Get early access and exclusive updates</p>
            {isSubmitted ? (
              <div className="flex items-center justify-center gap-2 text-hamboi-green">
                <CheckCircle className="h-6 w-6" />
                <span className="text-lg font-medium">You're on the list! We'll be in touch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-full px-6 h-12"
                  required
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-white text-hamboi-purple hover:bg-white/90 rounded-full px-6 h-12 min-w-[140px]"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            )}
            {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
          </div>

          <div className="flex items-center justify-center gap-8 pt-8 text-white/60">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">Coming</p>
              <p className="text-sm">Soon</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">Private</p>
              <p className="text-sm">& Secure</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">Made for</p>
              <p className="text-sm">Teens</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
