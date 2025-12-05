"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle } from "lucide-react"
import { AppStoreBadges } from "@/components/app-store-badges"

export function DownloadSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-hamboi-purple via-hamboi-purple/90 to-hamboi-blue text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold">Ready to Start Feeling Better?</h2>
          <p className="text-xl text-white/80">
            Join 50,000+ teens who've found support with Hamboi. Download now or join the waitlist.
          </p>

          <div className="flex justify-center pt-4">
            <AppStoreBadges size="large" variant="light" />
          </div>

          <div className="pt-8">
            <p className="text-white/60 mb-4">Or join our waitlist to get notified when we launch new features</p>
            {isSubmitted ? (
              <div className="flex items-center justify-center gap-2 text-hamboi-green">
                <CheckCircle className="h-6 w-6" />
                <span className="text-lg font-medium">You're on the list! Check your email.</span>
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
                />
                <Button type="submit" className="bg-white text-hamboi-purple hover:bg-white/90 rounded-full px-6 h-12">
                  Join Waitlist
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </form>
            )}
          </div>

          <div className="flex items-center justify-center gap-8 pt-8 text-white/60">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">50K+</p>
              <p className="text-sm">Teens Helped</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">4.8</p>
              <p className="text-sm">App Store Rating</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">24/7</p>
              <p className="text-sm">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
