"use client"

import { useState } from "react"
import { Heart, Copy, Check } from "lucide-react"

export function DonationSection() {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <section
      id="donation-section"
      className="w-full py-20 px-4 bg-gradient-to-br from-hamboi-warm/20 via-hamboi-pink/10 to-hamboi-light"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-hamboi-green/10 rounded-full text-hamboi-green text-sm font-medium mb-4">
            <Heart className="h-4 w-4" />
            <span>Support Our Mission</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-hamboi-purple to-hamboi-pink">
              Support Hamboi Mindcare
            </span>
          </h2>
          <p className="text-hamboi-dark/70 text-lg leading-relaxed">
            Help us keep Hamboi free for all teens who need mental health support
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-hamboi-purple/20 smooth-hover">
          <h3 className="text-2xl font-bold mb-8 text-center text-hamboi-dark">Donate via OPay</h3>

          <div className="space-y-5">
            <div className="p-5 bg-hamboi-light rounded-2xl border border-hamboi-purple/10">
              <p className="text-sm text-hamboi-dark/60 font-semibold mb-1">Bank</p>
              <p className="font-bold text-lg text-hamboi-dark">OPay</p>
            </div>

            <div className="p-5 bg-hamboi-light rounded-2xl flex items-center justify-between gap-3 border border-hamboi-purple/10">
              <div>
                <p className="text-sm text-hamboi-dark/60 font-semibold mb-1">Account Name</p>
                <p className="font-bold text-lg text-hamboi-dark">Sekinat Arinola Abiodun</p>
              </div>
              <button
                onClick={() => copyToClipboard("Sekinat Arinola Abiodun", "name")}
                className="px-5 py-2.5 bg-gradient-to-r from-hamboi-purple to-hamboi-blue text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                {copiedField === "name" ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <div className="p-5 bg-hamboi-light rounded-2xl flex items-center justify-between gap-3 border border-hamboi-purple/10">
              <div>
                <p className="text-sm text-hamboi-dark/60 font-semibold mb-1">Account Number</p>
                <p className="font-bold text-2xl text-hamboi-dark font-mono">8169533452</p>
              </div>
              <button
                onClick={() => copyToClipboard("8169533452", "number")}
                className="px-5 py-2.5 bg-gradient-to-r from-hamboi-purple to-hamboi-blue text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                {copiedField === "number" ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-hamboi-dark/70 text-lg font-medium animate-pulse-soft">
          Thank you for supporting mental wellness
        </p>
      </div>
    </section>
  )
}
