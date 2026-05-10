import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { CrisisBanner } from "@/components/crisis-banner"
import { DonationSection } from "@/components/donation-section"
import { MentalHealthResources } from "@/components/mental-health-resources"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { DailyWellnessTipWrapper } from "@/components/daily-wellness-tip-wrapper"
import { SafetyPrivacySection } from "@/components/safety-privacy-section"
import { OurStorySection } from "@/components/our-story-section"
import { BooksSection } from "@/components/books-section"
import { SurveySection } from "@/components/survey-section"
import { MotivationalMessagesSection } from "@/components/motivational-messages-section"
import { FAQSection } from "@/components/faq-section"
import { DownloadSection } from "@/components/download-section"
import { Footer } from "@/components/footer"
import { InstallPrompt } from "@/components/install-prompt"
import { WelcomeBackModal } from "@/components/welcome-back-modal"
import { ShareAppModal } from "@/components/share-app-modal"
import { DailyCheckIn } from "@/components/daily-check-in"
import { ReferralTracker } from "@/components/referral-tracker"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <CrisisBanner />
      <Header />
      <HeroSection />
      <DailyWellnessTipWrapper />
      <FeaturesSection />
      <HowItWorksSection />
      <OurStorySection />
      <MotivationalMessagesSection />
      <BooksSection />
      <SurveySection />
      <SafetyPrivacySection />
      <MentalHealthResources />
      <FAQSection />
      <DownloadSection />
      <DonationSection />
      <Footer />
      <InstallPrompt />
      <WelcomeBackModal />
      <ShareAppModal />
      <DailyCheckIn />
      <ReferralTracker />
    </main>
  )
}
