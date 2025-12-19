import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileText, AlertTriangle, CheckCircle, XCircle, Scale, Heart } from "lucide-react"

export const metadata = {
  title: "Terms of Service | Hamboi AI",
  description: "Terms of Service for using Hamboi AI mental health companion app.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-hamboi-purple/10 mb-6">
              <FileText className="h-8 w-8 text-hamboi-purple" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: December 5, 2025</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-amber-800 mb-2">Important Notice</p>
                  <p className="text-amber-700 mb-0">
                    Hamboi AI is a mental health support tool, NOT a replacement for professional therapy, counseling,
                    or medical treatment. If you are in crisis, please contact emergency services or a crisis helpline
                    immediately.
                  </p>
                </div>
              </div>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using Hamboi AI ("the Service"), you agree to be bound by these Terms of Service. If you
                are under 18, you represent that your parent or guardian has reviewed and agreed to these terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
              <p>Hamboi AI is an AI-powered mental health companion designed to provide:</p>
              <ul className="space-y-2">
                <li>Emotional support and active listening</li>
                <li>Coping strategies and mental wellness tips</li>
                <li>Mood tracking and self-reflection tools</li>
                <li>Crisis resource information</li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-bold m-0">3. What Hamboi AI IS</h2>
              </div>
              <ul className="space-y-2">
                <li>A supportive companion for everyday emotional challenges</li>
                <li>A tool to help you understand and process your feelings</li>
                <li>A resource for learning coping strategies</li>
                <li>A safe, judgment-free space to express yourself</li>
                <li>Available 24/7 when you need someone to "talk" to</li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <XCircle className="h-6 w-6 text-red-600" />
                <h2 className="text-2xl font-bold m-0">4. What Hamboi AI is NOT</h2>
              </div>
              <ul className="space-y-2">
                <li>NOT a licensed therapist, counselor, or medical professional</li>
                <li>NOT a substitute for professional mental health treatment</li>
                <li>NOT able to diagnose mental health conditions</li>
                <li>NOT able to prescribe medication or treatment</li>
                <li>NOT an emergency service</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">5. Age Requirements</h2>
              <ul className="space-y-2">
                <li>The Service is designed for users aged 13-19</li>
                <li>Users under 13 require verifiable parental consent</li>
                <li>Parents/guardians may monitor their minor's usage through optional dashboard features</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">6. User Responsibilities</h2>
              <p>By using Hamboi AI, you agree to:</p>
              <ul className="space-y-2">
                <li>Provide accurate information when creating an account</li>
                <li>Keep your account credentials secure</li>
                <li>Use the Service for its intended purpose</li>
                <li>Not attempt to harm, abuse, or exploit the Service or other users</li>
                <li>Seek professional help for serious mental health concerns</li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
                <h2 className="text-2xl font-bold m-0">7. Crisis Situations</h2>
              </div>
              <p>
                If you are experiencing a mental health emergency, thoughts of self-harm, or are in immediate danger:
              </p>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4">
                <ul className="space-y-2 mb-0">
                  <li>
                    <strong>Call 988</strong> (Suicide & Crisis Lifeline - US)
                  </li>
                  <li>
                    <strong>Text HOME to 741741</strong> (Crisis Text Line)
                  </li>
                  <li>
                    <strong>Call your local emergency services</strong>
                  </li>
                  <li>
                    <strong>Go to your nearest emergency room</strong>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="h-6 w-6 text-hamboi-purple" />
                <h2 className="text-2xl font-bold m-0">8. Limitation of Liability</h2>
              </div>
              <p>
                Hamboi AI and its creators are not liable for any damages arising from the use of our Service. The
                Service is provided "as is" without warranties of any kind. We do not guarantee that the AI's responses
                will be appropriate for every situation.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
              <p>
                We may update these Terms from time to time. We will notify users of significant changes via email or
                in-app notification. Continued use of the Service after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-6 w-6 text-hamboi-purple" />
                <h2 className="text-2xl font-bold m-0">10. Our Commitment to You</h2>
              </div>
              <p>
                We built Hamboi AI because we believe every teen deserves access to mental health support. We're
                committed to:
              </p>
              <ul className="space-y-2">
                <li>Continuously improving our AI to be more helpful and empathetic</li>
                <li>Protecting your privacy and keeping your conversations confidential</li>
                <li>Providing accurate crisis resources when needed</li>
                <li>Listening to user feedback and making Hamboi better for everyone</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p>Questions about these terms? Reach out:</p>
              <ul className="list-none p-0 space-y-1">
                <li>
                  Email:{" "}
                  <a href="mailto:legal@hamboi.ai" className="text-hamboi-purple hover:underline">
                    legal@hamboi.ai
                  </a>
                </li>
                <li>Address: Lagos, Nigeria</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
