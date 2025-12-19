import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { CrisisBanner } from "@/components/crisis-banner"

const HowItWorksSection = dynamic(
  () => import("@/components/how-it-works-section").then((mod) => ({ default: mod.HowItWorksSection })),
  { ssr: true },
)
const SafetyPrivacySection = dynamic(
  () => import("@/components/safety-privacy-section").then((mod) => ({ default: mod.SafetyPrivacySection })),
  { ssr: true },
)
const OurStorySection = dynamic(
  () => import("@/components/our-story-section").then((mod) => ({ default: mod.OurStorySection })),
  { ssr: true },
)
const BooksSection = dynamic(
  () => import("@/components/books-section").then((mod) => ({ default: mod.BooksSection })),
  { ssr: true },
)
const SurveySection = dynamic(
  () => import("@/components/survey-section").then((mod) => ({ default: mod.SurveySection })),
  { ssr: true },
)
const MotivationalMessagesSection = dynamic(
  () =>
    import("@/components/motivational-messages-section").then((mod) => ({ default: mod.MotivationalMessagesSection })),
  { ssr: true },
)
const FAQSection = dynamic(() => import("@/components/faq-section").then((mod) => ({ default: mod.FAQSection })), {
  ssr: true,
})
const DownloadSection = dynamic(
  () => import("@/components/download-section").then((mod) => ({ default: mod.DownloadSection })),
  { ssr: true },
)
const Footer = dynamic(() => import("@/components/footer").then((mod) => ({ default: mod.Footer })), { ssr: true })

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <CrisisBanner />
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <OurStorySection />
      <MotivationalMessagesSection />
      <BooksSection />
      <SurveySection />
      <SafetyPrivacySection />
      <FAQSection />
      <DownloadSection />
      <Footer />
    </main>
  )
}
