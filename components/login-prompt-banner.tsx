'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X, LogIn } from 'lucide-react'

interface LoginPromptBannerProps {
  onLoginClick: () => void
  onDismiss: () => void
}

export function LoginPromptBanner({ onLoginClick, onDismiss }: LoginPromptBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss()
  }

  const handleLogin = () => {
    setIsVisible(false)
    onLoginClick()
  }

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-hamboi-purple/20 to-hamboi-green/20 border-t border-hamboi-purple/40 px-4 py-3 flex items-center justify-between gap-4 animate-in slide-in-from-top duration-300">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-hamboi-green/20">
            <LogIn className="h-4 w-4 text-hamboi-green" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white">Save this chat</p>
          <p className="text-xs text-hamboi-text-muted">Log in to access your conversation history anywhere</p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <Button
          onClick={handleLogin}
          size="sm"
          className="bg-hamboi-green hover:bg-emerald-500 text-hamboi-dark font-semibold text-xs py-1 px-3 rounded-lg transition-all"
        >
          Log in
        </Button>
        <button
          onClick={handleDismiss}
          className="text-hamboi-text-muted hover:text-white transition-colors p-1"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
