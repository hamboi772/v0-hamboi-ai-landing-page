"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Send } from "lucide-react"
import Link from "next/link"

export function StorySubmissionForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent("Article Submission for Hamboi Mindcare")
    const body = encodeURIComponent(`Hi Hamboi team,\n\nI would like to submit an article.\n\nName: ${name}\nEmail: ${email}\n\n[Please attach your article or write it here]`)
    window.location.href = `mailto:hamboimindcare.help@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="mt-12 bg-gradient-to-r from-hamboi-purple to-hamboi-green rounded-3xl p-8 md:p-12 text-white text-center max-w-3xl mx-auto shadow-xl shadow-hamboi-purple/20">
      <h3 className="text-2xl md:text-3xl font-black mb-4 text-balance">Want to share your own story?</h3>
      <p className="text-white/90 mb-8 max-w-xl mx-auto font-medium">
        Hamboi Mindcare welcomes articles from students everywhere. Your words could help someone who needs to hear them.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-full px-6 py-6 h-auto focus-visible:ring-white/50"
          />
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-full px-6 py-6 h-auto focus-visible:ring-white/50"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-white text-hamboi-purple hover:bg-gray-100 font-bold py-6 rounded-full text-lg shadow-lg hover:scale-[1.02] transition-all"
        >
          <Send className="w-5 h-5 mr-2" />
          Submit an Article
        </Button>
      </form>

      <div className="flex justify-center">
        <Link href="/resources">
          <Button variant="ghost" className="text-white hover:bg-white/10 font-bold">
            <BookOpen className="h-4 w-4 mr-2" />
            Read More Articles
          </Button>
        </Link>
      </div>
    </div>
  )
}
