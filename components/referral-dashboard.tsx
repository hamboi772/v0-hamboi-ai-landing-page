"use client"

import { useEffect, useState } from "react"
import { Share2, Copy, Users, QrCode, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface Referral {
  id: string
  referral_code: string
  referred_count: number
  created_at: string
}

export function ReferralDashboard() {
  const [referral, setReferral] = useState<Referral | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const [userId] = useState(() => {
    if (typeof window !== "undefined") {
      let id = localStorage.getItem("hamboi_user_id")
      if (!id) {
        id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem("hamboi_user_id", id)
      }
      return id
    }
    return ""
  })

  useEffect(() => {
    fetchOrCreateReferral()
  }, [])

  const fetchOrCreateReferral = async () => {
    setLoading(true)
    try {
      // Try to fetch existing referral
      let response = await fetch(`/api/referrals?referrer_id=${userId}`)
      let data = await response.json()

      if (!data.referral) {
        // Create new referral code
        response = await fetch("/api/referrals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ referrer_id: userId }),
        })
        data = await response.json()
      }

      if (data.success) {
        setReferral(data.referral)
      }
    } catch (error) {
      console.error("[v0] Referral fetch error:", error)
      toast.error("Failed to load referral data")
    } finally {
      setLoading(false)
    }
  }

  const referralUrl = referral ? `${window.location.origin}?ref=${referral.referral_code}` : ""

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success("Copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error("Failed to copy")
    }
  }

  const shareReferral = async () => {
    const shareData = {
      title: "Hamboi MindCare",
      text: "Check out Hamboi MindCare - a mental health support app for teens. Join me!",
      url: referralUrl,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.log("[v0] Share cancelled")
      }
    } else {
      copyToClipboard(referralUrl)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Loading your referral code...</p>
        </CardContent>
      </Card>
    )
  }

  if (!referral) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Unable to load referral data</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Referral Stats */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Your Referral Code</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold tracking-tight">{referral.referral_code}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">People Referred</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-hamboi-purple" />
              <p className="text-3xl font-bold tracking-tight">{referral.referred_count}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Share Section */}
      <Card>
        <CardHeader>
          <CardTitle>Share Hamboi MindCare</CardTitle>
          <CardDescription>Help others discover mental health support</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Your referral link</label>
            <div className="flex gap-2">
              <Input value={referralUrl} readOnly className="font-mono text-sm" />
              <Button size="icon" variant="outline" onClick={() => copyToClipboard(referralUrl)}>
                {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={shareReferral} className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              Share Link
            </Button>
            <Button variant="outline" onClick={() => copyToClipboard(referral.referral_code)} className="flex-1">
              <QrCode className="h-4 w-4 mr-2" />
              Copy Code
            </Button>
          </div>

          <div className="rounded-lg bg-hamboi-purple/5 p-4 space-y-2">
            <h4 className="font-semibold text-sm">Why share?</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Help friends find mental health support</li>
              <li>• Reduce stigma around teen mental health</li>
              <li>• Build a supportive community together</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Share Message Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Share Message Templates</CardTitle>
          <CardDescription>Copy and customize these messages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            "Hey! I've been using Hamboi MindCare for mental health support. It's really helpful. Check it out:",
            "Found this awesome mental health app for teens. Completely private and safe. Try it:",
            "Struggling? Hamboi MindCare has been helping me. Free mental health support 24/7:",
          ].map((message, idx) => (
            <div key={idx} className="p-3 rounded-lg border bg-muted/50 space-y-2">
              <p className="text-sm">{message}</p>
              <p className="text-xs font-mono text-muted-foreground">{referralUrl}</p>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(`${message}\n\n${referralUrl}`)}
                className="h-7 text-xs"
              >
                Copy Message
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
