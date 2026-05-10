"use client"

import {
  Brain,
  Shield,
  MessageCircle,
  Zap,
  Target,
  Heart,
  Sparkles,
  Award,
  ArrowRight
} from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    title: "AI-Powered Empathy",
    description: "A supportive companion that listens and responds with genuine understanding, 24/7. Built to feel human, not like a chatbot.",
    icon: Brain,
    color: "bg-hamboi-purple",
    className: "md:col-span-2 md:row-span-2",
    iconColor: "text-hamboi-purple"
  },
  {
    title: "Privacy First",
    description: "Total anonymity and encryption.",
    icon: Shield,
    color: "bg-hamboi-green",
    className: "md:col-span-1 md:row-span-1",
    iconColor: "text-hamboi-green"
  },
  {
    title: "Bronze Standard",
    description: "FIRST Global Winner.",
    icon: Award,
    color: "bg-blue-500",
    className: "md:col-span-1 md:row-span-1",
    iconColor: "text-blue-500"
  },
  {
    title: "Mood Tracking",
    description: "Visualize your emotional journey over time.",
    icon: Target,
    color: "bg-pink-500",
    className: "md:col-span-1 md:row-span-2",
    iconColor: "text-pink-500"
  },
  {
    title: "Daily acts",
    description: "Small habits, big impact.",
    icon: Zap,
    color: "bg-orange-500",
    className: "md:col-span-1 md:row-span-1",
    iconColor: "text-orange-500"
  },
  {
    title: "Crisis Support",
    description: "Immediate professional help when you need it most. Connect to real resources in one tap.",
    icon: Heart,
    color: "bg-red-500",
    className: "md:col-span-1 md:row-span-1",
    iconColor: "text-red-500"
  }
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="features">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-hamboi-purple/10 rounded-full text-hamboi-purple text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Capabilities
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">
            Built for the way <br/>you <span className="text-hamboi-purple text-glow">actually</span> think.
          </h2>
          <p className="text-hamboi-text-muted text-xl font-medium max-w-2xl mx-auto">
            We didn't just build an app; we built a safety net designed specifically for student life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className={`
                relative group rounded-[2.5rem] p-8 overflow-hidden glass-morphism transition-all duration-500
                ${feature.className}
              `}
            >
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>

                <div className="mt-auto">
                  <h4 className="text-xl font-black text-white mb-3 uppercase tracking-tight">{feature.title}</h4>
                  <p className="text-hamboi-text-muted text-sm font-medium leading-relaxed group-hover:text-white/80 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Animated Background Gradient */}
              <div className={`absolute -right-10 -bottom-10 w-40 h-40 ${feature.color} opacity-[0.03] rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-700`} />
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .text-glow {
          text-shadow: 0 0 30px rgba(109, 40, 217, 0.3);
        }
      `}</style>
    </section>
  )
}
