"use client"

import { useState } from "react"
import { Share2, Check, Copy } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ArticleShareButton({ 
  title, 
  description,
  articleUrl 
}: { 
  title?: string
  description?: string
  articleUrl?: string
}) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
    const url = articleUrl ? `${baseUrl}${articleUrl}` : window.location.href

    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url })
        return
      } catch {}
    }

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textArea = document.createElement("textarea")
      textArea.value = url
      textArea.style.position = "fixed"
      textArea.style.left = "-9999px"
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-3 px-6 h-12 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all font-black uppercase tracking-widest text-[10px]"
      onClick={handleShare}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div key="copied" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-hamboi-green" />
            <span>Copied</span>
          </motion.div>
        ) : (
          <motion.div key="share" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Story</span>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}
