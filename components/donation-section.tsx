"use client"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export function DonationSection() {
  const handleDonate = () => {
    const donationUrl = "https://flutterwave.com/pay/hamboimindcare-donate"
    window.open(donationUrl, "_blank")
  }

  return (
    <section className="py-16 bg-gradient-to-r from-hamboi-pink/10 via-white to-hamboi-purple/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-hamboi-pink/20 mb-4">
            <Heart className="h-8 w-8 text-hamboi-pink" fill="currentColor" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-balance">Support Hamboi Mindcare</h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your donation helps us keep Hamboi free for all teens who need mental health support. Every contribution, no
            matter how small, makes a difference in a young person's life.
          </p>

          <div className="grid md:grid-cols-3 gap-6 pt-6 pb-8">
            <div className="p-6 rounded-lg bg-white shadow-sm border border-gray-100">
              <p className="text-2xl font-bold text-hamboi-purple">₦1,000</p>
              <p className="text-sm text-muted-foreground mt-2">Supports 10 chat sessions</p>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-sm border border-gray-100">
              <p className="text-2xl font-bold text-hamboi-purple">₦5,000</p>
              <p className="text-sm text-muted-foreground mt-2">Covers server costs for a week</p>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-sm border border-gray-100">
              <p className="text-2xl font-bold text-hamboi-purple">₦10,000+</p>
              <p className="text-sm text-muted-foreground mt-2">Helps us reach more teens</p>
            </div>
          </div>

          <Button
            onClick={handleDonate}
            size="lg"
            className="bg-hamboi-pink hover:bg-hamboi-pink/90 text-white px-8 py-6 text-lg rounded-full"
          >
            <Heart className="h-5 w-5 mr-2" fill="currentColor" />
            Donate Now
          </Button>

          <p className="text-sm text-muted-foreground pt-4">
            Hamboi Mindcare is committed to transparency. All donations go directly toward maintaining and improving our
            services.
          </p>
        </div>
      </div>
    </section>
  )
}
