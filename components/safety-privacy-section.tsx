import { Lock, Shield, AlertTriangle, Users, CheckCircle } from "lucide-react"

const safetyFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All your conversations are encrypted and secure.",
  },
  {
    icon: Shield,
    title: "COPPA/GDPR Compliant",
    description: "We follow the strictest privacy laws to protect you.",
  },
  {
    icon: AlertTriangle,
    title: "Crisis Detection",
    description: "Immediate resources when you need professional help.",
  },
  {
    icon: Users,
    title: "Optional Parent Dashboard",
    description: "Parents can stay informed while respecting your privacy.",
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
                Your Privacy Is Sacred
              </h2>
              <p className="text-lg md:text-xl text-hamboi-text-muted leading-relaxed">
                Your conversations are 100% private and secure. We built Hamboi with your safety as our top priority.
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
                    "Your data is never sold to third parties",
                    "Conversations are encrypted at rest and in transit",
                    "You can delete your data anytime",
                    "Regular security audits by experts",
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
