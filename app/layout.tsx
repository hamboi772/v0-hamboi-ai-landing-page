import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ResizeObserverFix } from "@/components/resize-observer-fix"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hamboi Mindcare - Your Mental Health Companion for Teens",
  description:
    "Talk to Hamboi Mindcare anytime you need support. 24/7 mental health companion designed specifically for teenagers. Private, safe, and always here for you.",
  keywords: ["mental health", "teens", "anxiety", "stress", "AI companion", "teen support", "emotional wellness"],
  authors: [{ name: "Hamboi Mindcare Team" }],
  openGraph: {
    title: "Hamboi Mindcare - Your Mental Health Matters",
    description: "Talk to Hamboi Mindcare anytime you need support. Private, safe, and always here for you.",
    type: "website",
    url: "https://hamboi.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamboi Mindcare - Your Mental Health Matters",
    description: "Talk to Hamboi Mindcare anytime you need support. Private, safe, and always here for you.",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#A78BFA",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <ResizeObserverFix />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
