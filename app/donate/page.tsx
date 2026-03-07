"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, CreditCard, Building2, ArrowRight, Loader2 } from "lucide-react"
import { usePaystackPayment } from "react-paystack"

export default function DonatePage() {
  const [amount, setAmount] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: Number(amount) * 100, // Paystack expects amount in kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
    metadata: {
      custom_fields: [
        {
          display_name: "Donor Name",
          variable_name: "donor_name",
          value: name,
        },
      ],
    },
  }

  const initializePayment = usePaystackPayment(paystackConfig)

  const onSuccess = (reference: any) => {
    setIsProcessing(false)
    alert(`Thank you for your donation! Reference: ${reference.reference}`)
    // Reset form
    setAmount("")
    setName("")
    setEmail("")
  }

  const onClose = () => {
    setIsProcessing(false)
    alert("Payment cancelled")
  }

  const handlePaystackPayment = (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || Number(amount) < 100) {
      alert("Please enter an amount of at least ₦100")
      return
    }

    if (!email || !name) {
      alert("Please fill in all fields")
      return
    }

    setIsProcessing(true)
    initializePayment({ onSuccess, onClose } as any)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0a1e] via-[#1a1a3e] to-[#0f0a1e]">
      <Header />

      <div className="container mx-auto px-4 py-20 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-hamboi-purple/30 rounded-full text-hamboi-green text-sm font-bold mb-6 border border-hamboi-purple/50">
            <Heart className="h-4 w-4 fill-current" />
            <span>Support Our Mission</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-hamboi-green via-hamboi-purple to-hamboi-green">
              Help Keep Hamboi Free
            </span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Your donation helps us provide free mental health support to Nigerian teens. Every contribution makes a
            difference in a young person's life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Online Payment */}
          <Card className="border-2 border-hamboi-purple/40 shadow-lg hover:shadow-xl transition-shadow bg-hamboi-dark-card">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-hamboi-purple to-hamboi-blue flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Pay Online</CardTitle>
              <CardDescription className="text-hamboi-text-muted">Quick and secure payment with Paystack</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePaystackPayment} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-white">Donation Amount (₦)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="100"
                    required
                    className="text-lg h-12 bg-white border-2 border-hamboi-purple/20 text-[#1a1a2e] placeholder:text-[#888888] focus:border-hamboi-purple"
                  />
                  <p className="text-sm text-hamboi-text-muted">Minimum: ₦100</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Your Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-12 bg-white border-2 border-hamboi-purple/20 text-[#1a1a2e] placeholder:text-[#888888] focus:border-hamboi-purple"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 bg-white border-2 border-hamboi-purple/20 text-[#1a1a2e] placeholder:text-[#888888] focus:border-hamboi-purple"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full h-12 text-lg bg-gradient-to-r from-hamboi-purple to-hamboi-blue hover:opacity-90"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Donate ₦{amount || "0"}
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-hamboi-text-muted">
                  Secured by Paystack. Your payment information is encrypted.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Bank Transfer */}
          <Card className="border-2 border-hamboi-green/40 shadow-lg hover:shadow-xl transition-shadow bg-hamboi-dark-card">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-hamboi-green to-hamboi-cyan flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Bank Transfer</CardTitle>
              <CardDescription className="text-hamboi-text-muted">Transfer directly to our bank account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-[#2a2640] rounded-xl border border-hamboi-purple/40">
                <p className="text-sm text-hamboi-text-muted font-semibold mb-1">Bank</p>
                <p className="font-bold text-lg text-white">OPay</p>
              </div>

              <div className="p-4 bg-[#2a2640] rounded-xl border border-hamboi-purple/40">
                <p className="text-sm text-hamboi-text-muted font-semibold mb-1">Account Name</p>
                <p className="font-bold text-lg text-white">Sekinat Arinola Abiodun</p>
              </div>

              <div className="p-4 bg-[#2a2640] rounded-xl border border-hamboi-purple/40">
                <p className="text-sm text-hamboi-text-muted font-semibold mb-1">Account Number</p>
                <p className="font-bold text-2xl text-white font-mono">8169533452</p>
              </div>

              <div className="p-4 bg-hamboi-purple/20 rounded-xl border border-hamboi-purple/40">
                <p className="text-sm text-white">
                  After transfer, please send us an email at{" "}
                  <a href="mailto:support@hamboimindcare.site" className="text-hamboi-green font-bold">
                    support@hamboimindcare.site
                  </a>{" "}
                  with your name and amount for acknowledgment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Impact Section */}
        <div className="bg-[#0f0a1e] backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-hamboi-purple/40">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Your Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-hamboi-purple/30 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-hamboi-green" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-white">₦500</h3>
              <p className="text-hamboi-text-muted">Provides 1 week of AI support for a teen in need</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-hamboi-pink/30 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-hamboi-green" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-white">₦2,000</h3>
              <p className="text-hamboi-text-muted">Covers server costs for 10 users per month</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-hamboi-blue/30 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-hamboi-green" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-white">₦10,000+</h3>
              <p className="text-hamboi-text-muted">Helps us add new features and reach more teens</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
