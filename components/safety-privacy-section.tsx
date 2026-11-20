import { Lock, Shield, AlertTriangle, CheckCircle } from "lucide-react"

const safetyFeatures = [
  {
    icon: Lock,
    title: "Guest chats stay in your session",
    description: "Sign in if you want conversations saved to your account.",
  },
  {
    icon: Shield,
    title: "Know what happens to your chat",
    description: "Messages are sent to an AI provider to generate a reply.",
  },
  {
    icon: AlertTriangle,
    title: "Not emergency care",
    description: "Hamboi cannot contact emergency services or someone near you.",
  },
  {
    icon: CheckCircle,
    title: "You choose what to share",
    description: "Avoid details you would not want processed or saved.",
  },
]

export function SafetyPrivacySection() {
  return (
    <section id="safety" className="py-20 lg:py-28 bg-gradient-to-b from-hamboi-dark-bg via-[#1a1a3e] to-hamboi-dark-bg">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
                Your Safety Matters
              </h2>
              <p className="text-lg md:text-xl text-hamboi-text-muted leading-relaxed">
                Hamboi is a support and awareness tool, not a private therapy service or emergency response service. Please share only what you are comfortable having processed by an AI provider.
              </p>
            </div>

            <div className="space-y-4">
              {safetyFeatures.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4 p-5 rounded-2xl bg-hamboi-dark-card border border-hamboi-purple/40 hover:border-hamboi-purple/70 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-hamboi-purple/30 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-hamboi-green" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{feature.title}</h3>
                    <p className="text-hamboi-text-muted text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-br from-hamboi-dark-card to-[#232342] rounded-3xl p-8 border border-hamboi-purple/40">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-hamboi-purple to-hamboi-green flex items-center justify-center flex-shrink-0">
                    <Lock className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Security Promise</h3>
                    <p className="text-hamboi-text-muted">We take your trust seriously</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    "Signed-in conversations are saved to your account",
                    "Guest conversations are not saved as account history",
                    "Saved chats can be deleted from chat history",
                    "Hamboi does not contact emergency services on your behalf",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-hamboi-green flex-shrink-0" />
                      <span className="text-white text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
