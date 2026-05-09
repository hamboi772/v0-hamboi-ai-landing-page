"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, Send } from "lucide-react"
import Link from "next/link"

export function StorySubmissionForm() {
  const handleSubmit = () => {
    const subject = encodeURIComponent("Article Submission for Hamboi Mindcare")
    const body = encodeURIComponent(`Hi Hamboi team,\n\nI would like to submit an article.\n\n[Please attach your article or write it here]`)
    window.location.href = `mailto:hamboimindcare.help@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="mt-12 bg-gradient-to-br from-hamboi-purple to-hamboi-green rounded-3xl p-10 md:p-16 text-white text-center max-w-4xl mx-auto shadow-2xl shadow-hamboi-purple/20 border border-white/10">
      <h3 className="text-2xl md:text-3xl font-black mb-6 text-balance opacity-90 uppercase tracking-wider text-white/90">Want to share your own story?</h3>
      <p className="text-white/80 mb-10 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
        Hamboi Mindcare welcomes articles from students everywhere. Your words could help someone who needs to hear them.
      </p>

      <div className="flex flex-col items-center gap-8 mb-12">
        <div className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          Try Hamboi Now
        </div>

        <Button
          onClick={handleSubmit}
          className="bg-white text-hamboi-purple hover:bg-gray-100 font-black px-12 py-8 rounded-full text-xl shadow-2xl hover:scale-105 transition-all w-full max-w-sm group"
        >
          <Send className="w-6 h-6 mr-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          Submit an Article
        </Button>
      </div>

      <div className="flex justify-center border-t border-white/10 pt-8">
        <Link href="/resources">
          <Button variant="ghost" className="text-white hover:bg-white/10 font-bold text-lg">
            <BookOpen className="h-5 w-5 mr-2" />
            Read More Articles
          </Button>
        </Link>
      </div>
    </div>
  )
}
