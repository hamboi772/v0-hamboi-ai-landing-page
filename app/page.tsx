import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { SafetyPrivacySection } from "@/components/safety-privacy-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { DownloadSection } from "@/components/download-section"
import { Footer } from "@/components/footer"
import { CrisisBanner } from "@/components/crisis-banner"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <CrisisBanner />
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <SafetyPrivacySection />
      <TestimonialsSection />
      <FAQSection />
      <DownloadSection />
      <Footer />
    </main>
  )
}
