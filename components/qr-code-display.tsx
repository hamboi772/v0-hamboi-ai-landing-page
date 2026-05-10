"use client"

import { useState, useEffect, useRef } from "react"
import QRCode from "qrcode"
import { motion } from "framer-motion"
import { Download, Copy, Check, Sparkles, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function QRCodeDisplay() {
  const appUrl = "https://hamboimindcare.site"
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [copied, setCopied] = useState(false)
  const [qrGenerated, setQrGenerated] = useState(false)

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        appUrl,
        {
          width: 300,
          margin: 2,
          color: {
            dark: "#6D28D9",
            light: "#FFFFFF",
          },
        },
        (error) => {
          if (!error) setQrGenerated(true)
        },
      )
    }
  }, [appUrl])

  const handleCopy = () => {
    navigator.clipboard.writeText(appUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    if (canvasRef.current) {
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement("a")
          link.href = url
          link.download = "hamboi-qr.png"
          link.click()
          URL.revokeObjectURL(url)
        }
      })
    }
  }

  return (
    <div className="min-h-screen bg-background text-white selection:bg-hamboi-purple/30 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-hamboi-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md glass-morphism border-white/10 rounded-[3rem] p-10 text-center shadow-2xl"
      >
        <div className="w-16 h-16 bg-hamboi-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-8 transform -rotate-6">
           <Heart className="w-8 h-8 text-hamboi-purple fill-hamboi-purple" />
        </div>

        <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Get the App.</h1>
        <p className="text-hamboi-text-muted text-sm font-bold mb-10 uppercase tracking-widest">Scan to join the safe space</p>

        <div className="bg-white p-6 rounded-[2.5rem] mb-10 inline-block shadow-2xl">
          <canvas ref={canvasRef} className="mx-auto" style={{ display: qrGenerated ? "block" : "none" }} />
          {!qrGenerated && (
            <div className="w-[300px] h-[300px] flex items-center justify-center bg-white">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-hamboi-purple"></div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleDownload}
            disabled={!qrGenerated}
            className="w-full h-16 bg-hamboi-purple hover:bg-hamboi-purple/90 text-white font-black rounded-2xl shadow-xl disabled:opacity-20"
          >
            <Download className="w-5 h-5 mr-3" />
            Download Image
          </Button>

          <Button
            onClick={handleCopy}
            variant="outline"
            className="w-full h-14 bg-white/5 border-white/10 text-white hover:bg-white/10 font-black rounded-xl"
          >
            {copied ? <><Check className="w-4 h-4 mr-2 text-hamboi-green" /> Copied</> : <><Copy className="w-4 h-4 mr-2" /> Copy Web Link</>}
          </Button>
        </div>

        <div className="mt-10 p-5 bg-white/5 rounded-2xl border border-white/5">
           <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Platform URL</p>
           <p className="text-xs text-hamboi-text-muted break-all font-mono">{appUrl}</p>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-hamboi-green text-[10px] font-black uppercase tracking-widest">
           <Sparkles className="w-3 h-3" />
           Built by students for students
        </div>
      </motion.div>
    </div>
  )
}
