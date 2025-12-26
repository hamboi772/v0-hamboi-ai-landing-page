import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoodTrackerDashboard } from "@/components/mood-tracker-dashboard"
import { JournalManager } from "@/components/journal-manager"
import { ReferralDashboard } from "@/components/referral-dashboard"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="space-y-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-hamboi-dark">
            Your Wellness{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-hamboi-purple to-hamboi-blue">
              Dashboard
            </span>
          </h1>
          <p className="text-lg text-hamboi-dark/70">
            Track your mood, journal your thoughts, and share support with others
          </p>
        </div>

        <Tabs defaultValue="mood" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="mood">Mood Tracker</TabsTrigger>
            <TabsTrigger value="journal">Journal</TabsTrigger>
            <TabsTrigger value="referral">Share & Refer</TabsTrigger>
          </TabsList>

          <TabsContent value="mood">
            <MoodTrackerDashboard />
          </TabsContent>

          <TabsContent value="journal">
            <JournalManager />
          </TabsContent>

          <TabsContent value="referral">
            <ReferralDashboard />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
