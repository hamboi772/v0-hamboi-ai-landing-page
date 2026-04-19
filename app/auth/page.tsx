"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
)

export default function AuthPage() {
  const router = useRouter()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")

    // Validation
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/chat`,
        },
      })

      if (signUpError) {
        setError(signUpError.message || "Failed to sign up. Please try again.")
      } else {
        setSuccessMessage(
          "Account created! Check your email to confirm, then you can log in.",
        )
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setTimeout(() => setIsSignUp(false), 2000)
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")

    // Validation
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message || "Failed to log in. Please check your credentials.")
      } else {
        setSuccessMessage("Login successful! Redirecting...")
        setTimeout(() => router.push("/chat"), 1500)
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0A1E] flex items-center justify-center p-4">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[#1a1035]/80 backdrop-blur border border-purple-500/30 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4">
              <span className="text-4xl">💚</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Hamboi Mindcare</h1>
            <p className="text-gray-400 text-sm">
              {isSignUp
                ? "Create an account to start chatting"
                : "Welcome back! Log in to continue"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
              <p className="text-green-300 text-sm">{successMessage}</p>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={isSignUp ? handleSignUp : handleLogin}
            className="space-y-4"
          >
            {/* Email Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-purple-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-purple-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isSignUp ? "At least 6 characters" : "Enter your password"}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-300 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-purple-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-300 transition-colors"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {isSignUp ? "Creating Account..." : "Logging In..."}
                </>
              ) : (
                <>{isSignUp ? "Create Account" : "Log In"}</>
              )}
            </button>
          </form>

          {/* Toggle Auth Mode */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm mb-2">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </p>
            <button
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError("")
                setSuccessMessage("")
                setEmail("")
                setPassword("")
                setConfirmPassword("")
              }}
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              disabled={isLoading}
            >
              {isSignUp ? "Log In" : "Sign Up"}
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-600 text-xs mt-6">
          By continuing, you agree to our privacy and security practices.
        </p>
      </div>
    </div>
  )
}
