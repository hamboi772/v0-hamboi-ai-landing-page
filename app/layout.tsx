
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
  authors: [{ name: "Abdulhameed Abolarinwa Abiodun" }],
  manifest: "/manifest.json",
  openGraph: {
    title: "Hamboi Mindcare - Your Mental Health Matters",
    description: "Talk to Hamboi Mindcare anytime you need support. Private, safe, and always here for you.",
    type: "website",
    url: "https://hamboimindcare.site",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamboi Mindcare - Your Mental Health Matters",
    description: "Talk to Hamboi Mindcare anytime you need support. Private, safe, and always here for you.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Hamboi Mindcare",
  },
}

export const viewport: Viewport = {
  themeColor: "#7c3aed",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Abdulhameed Abolarinwa Abiodun",
  "alternateName": "Hamboi",
  "jobTitle": "Founder",
  "description": "Nigerian teenage founder of Hamboi MindCare, a free AI-powered mental health platform for African teenagers.",
  "url": "https://hamboimindcare.site",
  "sameAs": [
    "https://www.linkedin.com/in/abiodun-hamboi-hameed"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Hamboi MindCare",
    "url": "https://hamboimindcare.site"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Hamboi Mindcare" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-centered-192.png" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        <ResizeObserverFix />
        {children}
        <Analytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/service-worker.js')
                    .then(function(registration) {
                      console.log('[v0] Service Worker registered');
                    })
                    .catch(function(err) {
                      console.log('[v0] Service Worker registration failed:', err);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
