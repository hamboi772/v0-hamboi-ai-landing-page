"use client"

import { useState } from "react"
import { X, ShieldAlert } from "lucide-react"

export function CrisisBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-hamboi-calm text-white py-2 px-4">
      <div className="container mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4" />
          <span>
            In immediate danger? Contact local emergency services and get a trusted person nearby now.
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
