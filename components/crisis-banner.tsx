"use client"

import { useState } from "react"
import { X, Phone } from "lucide-react"

export function CrisisBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-hamboi-calm text-white py-2 px-4">
      <div className="container mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          <span>
            Nigeria:{" "}
  <a href="tel:08091116264" className="underline font-bold">
    0809 111 6264
  </a>{" "}
  | International:{" "}
  <a href="tel:988" className="underline font-bold">
    988
  </a>{" "}
  (Suicide & Crisis Lifeline)
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-white/20 rounded transition-colors"
          aria-label="Close crisis banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
