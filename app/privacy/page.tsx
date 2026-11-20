import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Shield, Lock, Eye, Trash2, Bell, Users } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | Hamboi MindCare",
  description: "How Hamboi MindCare uses and stores information you share with the service.",
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
            <p className="text-muted-foreground">Last updated: November 20, 2026</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-hamboi-purple/5 rounded-2xl p-6 mb-8">
              <p className="text-lg font-medium text-hamboi-purple mb-0">
                Hamboi is a youth mental-health awareness and support tool, not a confidential therapy service. Please avoid sharing details you would not want processed or stored.
              </p>
            </div>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4"><Lock className="h-6 w-6 text-hamboi-purple" /><h2 className="text-2xl font-bold m-0">Information You Share</h2></div>
              <ul className="space-y-2">
                <li><strong>Account details:</strong> Email and authentication information when you register or sign in.</li>
                <li><strong>Saved content:</strong> Signed-in conversations and any journal, mood, or reading-progress information you choose to save.</li>
                <li><strong>Guest conversations:</strong> Guest chat is held in the current browser session and is not saved as account history.</li>
                <li><strong>Messages to the AI:</strong> Your message is sent to an AI provider to generate a response. The provider processes the content under its own terms.</li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4"><Eye className="h-6 w-6 text-hamboi-purple" /><h2 className="text-2xl font-bold m-0">How Information Is Used</h2></div>
              <p>Information is used to operate the features you request, provide AI responses, and maintain the service. Hamboi does not contact a parent, emergency service, or crisis organization on your behalf.</p>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4"><Shield className="h-6 w-6 text-hamboi-purple" /><h2 className="text-2xl font-bold m-0">Storage and Security</h2></div>
              <p>Hamboi is not end-to-end encrypted. Signed-in content is stored in the application database and may be accessible to authorized service operators or infrastructure providers. Do not treat the service as a private clinical record or send passwords, addresses, or other identifying details in chat.</p>
              <p>We do not claim independent security audits or legal certifications. See the current feature behavior in the app and contact us if you need details about a specific data request.</p>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4"><Users className="h-6 w-6 text-hamboi-purple" /><h2 className="text-2xl font-bold m-0">Young People and Families</h2></div>
              <p>Hamboi is intended for teenagers and young people. The service does not currently provide age verification, a parent dashboard, or a parent-consent workflow. We do not represent the service as certified or compliant with COPPA or GDPR. A parent or guardian can help you decide what is appropriate to share online.</p>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4"><Trash2 className="h-6 w-6 text-hamboi-purple" /><h2 className="text-2xl font-bold m-0">Deletion and Requests</h2></div>
              <p>You can delete saved conversations from chat history. For other access or deletion requests, contact us at <a href="mailto:hamboimindcare.help@gmail.com" className="text-hamboi-purple hover:underline">hamboimindcare.help@gmail.com</a>. We will confirm what data can be located and removed; account-wide deletion is not currently self-service.</p>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4"><Bell className="h-6 w-6 text-hamboi-purple" /><h2 className="text-2xl font-bold m-0">Urgent Situations</h2></div>
              <p>Hamboi is not monitored as an emergency service and cannot dispatch help. If you or someone else may be in immediate danger, contact local emergency services and get a trusted adult or another person physically near you now.</p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Contact</h2>
              <p>Questions or data requests: <a href="mailto:hamboimindcare.help@gmail.com" className="text-hamboi-purple hover:underline">hamboimindcare.help@gmail.com</a>.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
