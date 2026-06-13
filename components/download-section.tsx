
"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function DownloadSection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-hamboi-purple via-hamboi-purple/90 to-hamboi-blue text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8 reveal">
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 h-12">
                Support Us 💜
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 pt-8 text-white/60">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">Private</p>
              <p className="text-sm">& Secure</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">Made for</p>
              <p className="text-sm">Teens</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
