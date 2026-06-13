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

        <div className="space-y-6 mb-12">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground">
            Your Wellness
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your mood, journal your thoughts, and share support with others
          </p>
        </div>

        <Tabs defaultValue="mood" className="space-y-6">
          <TabsList className="flex gap-8 bg-transparent border-b border-border p-0 rounded-none h-auto w-full justify-start">
            <TabsTrigger value="mood" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent px-0 py-3 text-base font-medium font-sans">Mood Tracker</TabsTrigger>
            <TabsTrigger value="journal" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent px-0 py-3 text-base font-medium font-sans">Journal</TabsTrigger>
            <TabsTrigger value="referral" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent px-0 py-3 text-base font-medium font-sans">Share & Refer</TabsTrigger>
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
