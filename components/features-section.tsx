import { MessageCircle, Shield, LineChart, Brain, AlertCircle, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: MessageCircle,
    title: "24/7 AI Support",
    description: "Always here when you need someone to talk to. Day or night, Hamboi Mindcare is ready to listen.",
    color: "text-hamboi-purple",
    bgColor: "bg-hamboi-purple/10",
  },
  {
    icon: Shield,
    title: "Anonymous & Safe",
    description: "Your conversations are private and judgment-free. Express yourself freely.",
    color: "text-hamboi-blue",
    bgColor: "bg-hamboi-blue/10",
  },
  {
    icon: LineChart,
    title: "Mood Tracking",
    description: "Understand your emotions over time with insights that help you grow.",
    color: "text-hamboi-green",
    bgColor: "bg-hamboi-green/10",
  },
  {
    icon: Brain,
    title: "Coping Strategies",
    description: "Personalized exercises and techniques that actually work for you.",
    color: "text-hamboi-calm",
    bgColor: "bg-hamboi-calm/10",
  },
  {
    icon: AlertCircle,
    title: "Crisis Resources",
    description: "Immediate access to professional help when you need it most.",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Heart,
    title: "Teen-Friendly",
    description: "Built by experts, designed for you. We speak your language.",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-hamboi-dark">
            Everything You Need to Feel{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-hamboi-purple to-hamboi-blue">
              Supported
            </span>
          </h2>
          <p className="text-lg text-hamboi-dark/70 max-w-2xl mx-auto">
            Hamboi Mindcare is designed with your wellbeing in mind. Here's how we help you navigate life's challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border-hamboi-purple/10 hover:border-hamboi-purple/30 hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6 space-y-4">
                <div
                  className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className={`h-7 w-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-hamboi-dark">{feature.title}</h3>
                <p className="text-hamboi-dark/70 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
