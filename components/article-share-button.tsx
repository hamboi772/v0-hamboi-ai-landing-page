"use client"

import { useState } from "react"
import { Share2, Check, Copy, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ArticleShareButton({ title, description }: { title: string; description: string }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = window.location.href

    // Use native share API on mobile if available
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        })
        return
      } catch {
        // User cancelled or error - fall through to clipboard
      }
    }

    // Fallback: copy link to clipboard
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Final fallback for older browsers
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
    <Button
      variant="outline"
      size="sm"
      className="border-hamboi-purple/20 bg-transparent text-hamboi-dark"
      onClick={handleShare}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-2 text-green-600" />
          Link Copied!
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </>
      )}
    </Button>
  )
}
