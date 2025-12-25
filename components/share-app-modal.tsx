"use client"

import { useState } from "react"
import { Share2, X, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ShareAppModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== "undefined" ? window.location.origin : ""
  const shareText =
    "I found this amazing mental health support app for Nigerian teens. Check out Hamboi MindCare - it has free AI chat, crisis hotlines, and wellness tips!"

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`
    window.open(url, "_blank")
  }

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, "_blank")
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Hamboi MindCare",
          text: shareText,
          url: shareUrl,
        })
      } catch (err) {
        console.log("Share cancelled")
      }
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 rounded-full w-14 h-14 bg-gradient-to-r from-hamboi-purple to-hamboi-blue text-white shadow-lg hover:scale-110 transition-transform z-40"
        aria-label="Share app"
      >
        <Share2 className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-300">
          <div className="relative bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl animate-in slide-in-from-bottom duration-300">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-bold text-hamboi-dark mb-2">Share Hamboi MindCare</h2>
            <p className="text-sm text-hamboi-dark/70 mb-6">Help your friends find mental health support</p>

            <div className="space-y-3">
              {navigator.share && (
                <Button
                  onClick={handleNativeShare}
                  className="w-full bg-gradient-to-r from-hamboi-purple to-hamboi-blue text-white"
                >
                  Share via...
                </Button>
              )}

              <Button
                onClick={handleWhatsAppShare}
                variant="outline"
                className="w-full border-2 border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
              >
                Share on WhatsApp
              </Button>

              <Button
                onClick={handleTwitterShare}
                variant="outline"
                className="w-full border-2 border-blue-400 text-blue-500 hover:bg-blue-50 bg-transparent"
              >
                Share on Twitter/X
              </Button>

              <Button onClick={handleCopyLink} variant="outline" className="w-full bg-transparent">
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Link Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
