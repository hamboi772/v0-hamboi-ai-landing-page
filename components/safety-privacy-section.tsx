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
    <section id="safety" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-hamboi-dark">
                Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-hamboi-purple to-hamboi-blue">
                  Privacy
                </span>{" "}
                Is Sacred
              </h2>
              <p className="text-lg text-hamboi-dark/70">
                Your conversations are 100% private and secure. We built Hamboi with your safety as our top priority.
              </p>
            </div>

            <div className="space-y-4">
              {safetyFeatures.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4 p-4 rounded-xl bg-hamboi-light/50">
                  <div className="w-12 h-12 rounded-xl bg-hamboi-purple/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-hamboi-purple" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-hamboi-dark">{feature.title}</h3>
                    <p className="text-hamboi-dark/70 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-br from-hamboi-purple/5 to-hamboi-blue/5 rounded-3xl p-8 border border-hamboi-purple/10">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-hamboi-purple to-hamboi-blue flex items-center justify-center">
                    <Lock className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-hamboi-dark">Security Promise</h3>
                    <p className="text-hamboi-dark/60">We take your trust seriously</p>
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
                      <span className="text-hamboi-dark/80">{item}</span>
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
