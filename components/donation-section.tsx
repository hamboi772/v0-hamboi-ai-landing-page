"use client"

import { useState } from "react"

export function DonationSection() {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <section id="donation-section" className="w-full py-16 px-4 bg-blue-100 min-h-[500px]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-3 text-gray-900">Support Hamboi Mindcare 💚</h2>
        <p className="text-center text-gray-700 mb-10 text-lg">
          Help us keep Hamboi free for all teens who need mental health support
        </p>

        <div className="bg-white rounded-xl shadow-2xl p-8 mb-8 border-4 border-blue-600">
          <h3 className="text-2xl font-bold mb-8 text-center text-blue-900">Donate via OPay</h3>

          <div className="space-y-6">
            <div className="p-5 bg-blue-50 rounded-lg border-2 border-blue-200">
              <p className="text-sm text-gray-600 font-semibold">Bank</p>
              <p className="font-bold text-lg">OPay</p>
            </div>

            <div className="p-5 bg-blue-50 rounded-lg flex items-center justify-between gap-3 border-2 border-blue-200">
              <div>
                <p className="text-sm text-gray-600 font-semibold">Account Name</p>
                <p className="font-bold text-lg">Sekinat Arinola Abiodun</p>
              </div>
              <button
                onClick={() => copyToClipboard("Sekinat Arinola Abiodun", "name")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
              >
                {copiedField === "name" ? "✓ Copied!" : "Copy"}
              </button>
            </div>

            <div className="p-5 bg-blue-50 rounded-lg flex items-center justify-between gap-3 border-2 border-blue-200">
              <div>
                <p className="text-sm text-gray-600 font-semibold">Account Number</p>
                <p className="font-bold text-2xl">8169533452</p>
              </div>
              <button
                onClick={() => copyToClipboard("8169533452", "number")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
              >
                {copiedField === "number" ? "✓ Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-700 text-base mt-8 font-medium">Thank you for supporting mental wellness</p>
      </div>
    </section>
  )
}
