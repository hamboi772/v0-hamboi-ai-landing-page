import Link from "next/link"

export const metadata = {
  title: "Young People and Safety | Hamboi MindCare",
  description: "Important information about Hamboi MindCare's current features and limitations for young people and families.",
}

export default function ChildSafetyPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-12 text-white">
      <Link href="/" className="text-sm text-white/70 hover:text-white">Hamboi MindCare</Link>
      <h1 className="mt-6 text-3xl font-bold">Young People and Safety</h1>
      <p className="mb-8 mt-2 text-sm text-gray-400">Updated November 20, 2026</p>

      <div className="space-y-8 text-gray-300">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">What Hamboi is</h2>
          <p>Hamboi provides general mental-health awareness and wellbeing information. It is not a therapy service, medical provider, or emergency service, and it cannot contact a parent, professional, or emergency responder for you.</p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">Current limits for young users</h2>
          <p>The service does not currently verify ages or provide a parental-consent workflow or parent dashboard. This page is informational; it does not claim COPPA, GDPR, or NDPR certification or compliance. A parent or guardian can contact us with questions at <a className="text-hamboi-purple hover:underline" href="mailto:hamboimindcare.help@gmail.com">hamboimindcare.help@gmail.com</a>.</p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">Information you share</h2>
          <p>Signed-in conversations and other saved features are stored with the account. Messages are sent to an AI provider to generate responses. Hamboi is not end-to-end encrypted; avoid entering full names, addresses, school details, passwords, or information you do not want processed or stored. Read the <Link className="text-hamboi-purple hover:underline" href="/privacy">Privacy Policy</Link> for more details.</p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">Urgent situations</h2>
          <p>If you or someone else may be in immediate danger, get a trusted adult or another person physically nearby and contact local emergency services now. Do not wait for Hamboi to respond.</p>
        </section>
      </div>
    </main>
  )
}
