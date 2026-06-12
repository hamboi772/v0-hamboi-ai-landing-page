import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Shield, Lock, Eye, Trash2, Bell, Users } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | Hamboi AI",
  description: "Learn how Hamboi AI protects your privacy and keeps your conversations secure.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-hamboi-purple/10 mb-6">
              <Shield className="h-8 w-8 text-hamboi-purple" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: December 5, 2025</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-hamboi-purple/5 rounded-2xl p-6 mb-8">
              <p className="text-lg font-medium text-hamboi-purple mb-0">
                Your privacy matters. We built Hamboi AI with privacy-first principles because we know how important it
                is for you to have a safe space to express yourself.
              </p>
            </div>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-6 w-6 text-hamboi-purple" />
                <h2 className="text-2xl font-bold m-0">What We Collect</h2>
              </div>
              <p>We collect minimal information to provide you with the best experience:</p>
              <ul className="space-y-2">
                <li>
                  <strong>Account Information:</strong> Email address and password (encrypted) when you create an
                  account
                </li>
                <li>
                  <strong>Conversation Data:</strong> Your chats with Hamboi AI to provide personalized support
                </li>
                <li>
                  <strong>Usage Data:</strong> How you interact with the app to improve our service
                </li>
                <li>
                  <strong>Device Information:</strong> Basic device info for app compatibility
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="h-6 w-6 text-hamboi-purple" />
                <h2 className="text-2xl font-bold m-0">How We Use Your Data</h2>
              </div>
              <ul className="space-y-2">
                <li>To provide personalized mental health support</li>
                <li>To improve Hamboi AI's responses and helpfulness</li>
                <li>To detect crisis situations and provide emergency resources</li>
                <li>To send important updates about the service (optional)</li>
              </ul>
              <p className="mt-4 font-medium text-hamboi-purple">We NEVER sell your data to third parties. Ever.</p>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-hamboi-purple" />
                <h2 className="text-2xl font-bold m-0">How We Protect Your Data</h2>
              </div>
              <ul className="space-y-2">
                <li>
                  <strong>End-to-End Encryption:</strong> All conversations are encrypted in transit and at rest
                </li>
                <li>
                  <strong>Secure Servers:</strong> Data stored on industry-leading secure cloud infrastructure
                </li>
                <li>
                  <strong>Regular Audits:</strong> We conduct security audits to ensure data protection
                </li>
                <li>
                  <strong>Limited Access:</strong> Only authorized personnel can access systems, never individual chats
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-hamboi-purple" />
                <h2 className="text-2xl font-bold m-0">For Users Under 18</h2>
              </div>
              <p>
                Hamboi AI is designed for teenagers aged 13-19. We comply with COPPA (Children's Online Privacy
                Protection Act) and GDPR requirements for minors.
              </p>
              <ul className="space-y-2">
                <li>Users under 13 require parental consent</li>
                <li>Parents can request access to or deletion of their child's data</li>
                <li>We never target advertising to minors</li>
                <li>Optional parent dashboard for transparency (teen controls what's shared)</li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Trash2 className="h-6 w-6 text-hamboi-purple" />
                <h2 className="text-2xl font-bold m-0">Your Rights</h2>
              </div>
              <p>You have full control over your data:</p>
              <ul className="space-y-2">
                <li>
                  <strong>Access:</strong> Request a copy of all your data
                </li>
                <li>
                  <strong>Delete:</strong> Delete your account and all associated data
                </li>
                <li>
                  <strong>Export:</strong> Download your conversation history
                </li>
                <li>
                  <strong>Opt-out:</strong> Disable data collection for improvement purposes
                </li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at{" "}
                <a href="mailto:hamboimindcare.help@gmail.com" className="text-hamboi-purple hover:underline">
                  hamboimindcare.help@gmail.com
                </a>
              </p>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Bell className="h-6 w-6 text-hamboi-purple" />
                <h2 className="text-2xl font-bold m-0">Crisis Situations</h2>
              </div>
              <p>
                If our AI detects that you may be in immediate danger, we may share limited information with crisis
                services to ensure your safety. This is the only situation where we would share your data without
                explicit consent.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p>Questions about privacy? We're here to help.</p>
              <ul className="list-none p-0 space-y-1">
                <li>
                  Email:{" "}
                  <a href="mailto:hamboimindcare.help@gmail.com" className="text-hamboi-purple hover:underline">
                    hamboimindcare.help@gmail.com
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
