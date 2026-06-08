"use client"

import { useState, useEffect } from "react"

export function TypewriterHeadline() {
  const words = ["anxiety.", "loneliness.", "pressure.", "confusion.", "everything."]
  const [displayText, setDisplayText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isWaiting) {
      // Pause for 2 seconds before deleting
      timeout = setTimeout(() => {
        setIsWaiting(false)
        setIsDeleting(true)
      }, 2000)
    } else if (isDeleting) {
      // Delete at 60ms per character
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 60)
      } else {
        // Move to next word
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
      }
    } else {
      // Type at 100ms per character
      if (displayText.length < words[wordIndex].length) {
        timeout = setTimeout(() => {
          setDisplayText(words[wordIndex].slice(0, displayText.length + 1))
        }, 100)
      } else {
        // Word is complete, wait before deleting
        setIsWaiting(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, wordIndex, isDeleting, isWaiting, words])

  return (
    <div className="space-y-4">
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] text-balance animate-fade-in-up">
        You don&apos;t have to face
      </h1>
      <h2 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] text-balance min-h-[1.1em]" style={{
        background: "linear-gradient(135deg, #0FFFD4, #8B5CF6, #F43F5E)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animationDelay: "0.1s"
      }}>
        {displayText}<span className="animate-pulse">|</span>
      </h2>
    </div>
  )
}
