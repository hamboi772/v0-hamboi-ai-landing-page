"use client"

import { useState } from "react"

export function QRCodeDisplay() {
  const appUrl = "https://v0-hamboi-ai-landing-page-7e7t-ge0ebg3mq.vercel.app"
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(appUrl)}`

  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(appUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = qrCodeUrl
    link.download = "hamboi-mindcare-qr-code.png"
    link.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hamboi MindCare</h1>
        <p className="text-gray-600 mb-6">Scan to install the app</p>

        <div className="bg-white p-6 rounded-xl border-4 border-purple-200 mb-6 inline-block">
          <img src={qrCodeUrl || "/placeholder.svg"} alt="QR Code for Hamboi MindCare" className="w-64 h-64" />
        </div>

        <div className="space-y-3">
          <button
            onClick={handleDownload}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            Download QR Code
          </button>

          <button
            onClick={handleCopy}
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-all"
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>

        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-gray-600 break-all">{appUrl}</p>
        </div>

        <p className="text-xs text-gray-500 mt-4">Mental health support for Nigerian teenagers</p>
      </div>
    </div>
  )
}
