'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mail, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

interface PasswordlessLoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess?: () => void
}

type Step = 'email' | 'verify' | 'success'

export function PasswordlessLoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
}: PasswordlessLoginModalProps) {
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/passwordless/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to send OTP')
        setLoading(false)
        return
      }

      toast.success('Check your email for the code!')
      setStep('verify')
    } catch (err) {
      setError('Failed to send OTP. Please try again.')
      console.error('[v0] Send OTP error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/passwordless/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Invalid or expired code')
        setLoading(false)
        return
      }

      setStep('success')
      toast.success('Logged in successfully!')

      // Wait a moment for success state to show, then close and callback
      setTimeout(() => {
        onLoginSuccess?.()
        onClose()
      }, 1500)
    } catch (err) {
      setError('Failed to verify code. Please try again.')
      console.error('[v0] Verify OTP error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-sm bg-hamboi-dark-card border border-hamboi-purple/40 rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Save Your Chat</h2>
          <button
            onClick={onClose}
            className="text-hamboi-text-muted hover:text-white transition-colors"
            disabled={loading}
          >
            ✕
          </button>
        </div>

        {step === 'email' && (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <p className="text-sm text-hamboi-text-muted mb-4">
              Log in with your email to save this conversation and access it later.
            </p>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 bg-hamboi-dark/50 border border-hamboi-purple/30 rounded-lg text-white placeholder-hamboi-text-muted focus:outline-none focus:border-hamboi-purple/80 transition-colors"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-hamboi-green hover:bg-emerald-500 text-hamboi-dark font-semibold py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Code
                </>
              )}
            </Button>

            <p className="text-xs text-center text-hamboi-text-muted">
              We&apos;ll send you a code via email. No password needed.
            </p>
          </form>
        )}

        {step === 'verify' && (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <p className="text-sm text-hamboi-text-muted mb-4">
              Enter the 6-digit code sent to <span className="font-semibold text-white">{email}</span>
            </p>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Verification Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                maxLength={6}
                required
                className="w-full px-4 py-2 bg-hamboi-dark/50 border border-hamboi-purple/30 rounded-lg text-white placeholder-hamboi-text-muted text-center tracking-widest focus:outline-none focus:border-hamboi-purple/80 transition-colors font-mono text-lg"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full bg-hamboi-green hover:bg-emerald-500 text-hamboi-dark font-semibold py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Verify
                </>
              )}
            </Button>

            <button
              type="button"
              onClick={() => {
                setStep('email')
                setCode('')
                setError(null)
              }}
              className="w-full text-sm text-hamboi-green hover:text-emerald-400 transition-colors font-medium"
            >
              Back to Email
            </button>
          </form>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center justify-center py-6">
            <CheckCircle2 className="w-12 h-12 text-hamboi-green mb-4 animate-in scale-in" />
            <p className="text-lg font-semibold text-white text-center mb-2">You&apos;re all set!</p>
            <p className="text-sm text-hamboi-text-muted text-center">
              Your chat is now saved and will be accessible from your dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
