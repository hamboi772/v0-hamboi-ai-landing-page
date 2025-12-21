import { Download, MessageSquare, Sparkles, TrendingUp } from "lucide-react"

const steps = [
  {
    icon: Download,
    step: "01",
    title: "Download & Create Profile",
    description: "Get the app and set up your safe space in under 2 minutes.",
  },
  {
    icon: MessageSquare,
    step: "02",
    title: "Chat with Hamboi AI",
    description: "Share what's on your mind through text chat.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Get Personalized Support",
    description: "Receive guidance, coping strategies, and validation tailored to you.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Track Your Progress",
    description: "See how far you've come with mood insights and achievements.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-gradient-to-br from-hamboi-light to-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-hamboi-dark">
            How{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-hamboi-purple to-hamboi-blue">
              Hamboi
            </span>{" "}
            Works
          </h2>
          <p className="text-lg text-hamboi-dark/70 max-w-2xl mx-auto">
            Getting help is strength, not weakness. Here's how to start your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-14 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-hamboi-purple/30 to-hamboi-blue/30" />
              )}

              <div className="relative flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="w-28 h-28 rounded-3xl bg-white shadow-lg border border-hamboi-purple/10 flex items-center justify-center">
                    <step.icon className="h-12 w-12 text-hamboi-purple" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-hamboi-purple to-hamboi-blue text-white text-sm font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-hamboi-dark">{step.title}</h3>
                <p className="text-hamboi-dark/70">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
