"use client"

import { Download, MessageSquare, Sparkles, TrendingUp, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    icon: Download,
    step: "01",
    title: "Download",
    description: "Get the web app on your home screen in seconds.",
  },
  {
    icon: MessageSquare,
    step: "02",
    title: "Chat",
    description: "Vent, share, or just talk. Our AI is always here to listen.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Reflect",
    description: "Get personalized insights and coping strategies.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Thrive",
    description: "Track your progress and celebrate every small win.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[30%] h-[60%] bg-hamboi-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/50 px-4 py-2 rounded-full text-sm font-bold mb-8">
            Process
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Simple. <span className="text-hamboi-purple">Safe.</span> Student-led.
          </h2>
          <p className="text-hamboi-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            We've made starting your mental health journey as easy as opening a chat. No appointments, no waiting, no judgment.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              {/* Desktop Connector */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-14 left-[70%] w-full h-px border-t border-dashed border-white/10 z-0" />
              )}

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-[2rem] glass-morphism border-white/10 flex items-center justify-center mb-8 group-hover:bg-hamboi-purple/20 transition-all duration-500 shadow-2xl">
                  <step.icon className="w-10 h-10 text-hamboi-green group-hover:text-white transition-colors" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-hamboi-purple text-white text-xs font-black flex items-center justify-center shadow-lg">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">{step.title}</h3>
                <p className="text-hamboi-text-muted text-sm leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 flex justify-center"
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 flex items-center gap-3 text-sm font-bold text-hamboi-green">
             <span className="w-2 h-2 bg-hamboi-green rounded-full animate-pulse" />
             Takes less than 2 minutes to start
          </div>
        </motion.div>
      </div>
    </section>
  )
}
