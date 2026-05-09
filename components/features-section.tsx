"use client"

import {
  Brain,
  Shield,
  MessageCircle,
  Zap,
  Target,
  Heart,
  Sparkles,
  Award
} from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    title: "AI-Powered Empathy",
    description: "Not just a bot. A supportive companion that listens and responds with genuine understanding, 24/7.",
    icon: Brain,
    color: "bg-hamboi-purple",
    size: "lg" // Larger card for bento
  },
  {
    title: "Student-First Privacy",
    description: "Your space is yours. Total anonymity and encryption because trust is everything.",
    icon: Shield,
    color: "bg-hamboi-green",
    size: "sm"
  },
  {
    title: "The Bronze Standard",
    description: "Recognized by FIRST Global Challenge for innovation and social impact.",
    icon: Award,
    color: "bg-hamboi-cyan",
    size: "sm"
  },
  {
    title: "Mood Tracking",
    description: "Visualize your journey and identify patterns in your mental well-being.",
    icon: Target,
    color: "bg-hamboi-pink",
    size: "sm"
  },
  {
    title: "Crisis Support",
    description: "Immediate access to professional help when things get too heavy.",
    icon: Heart,
    color: "bg-red-500",
    size: "lg"
  }
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-hamboi-dark-bg relative overflow-hidden" id="features">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-hamboi-purple font-bold tracking-widest uppercase text-sm mb-4">Features</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white mb-6">Built for the way you think.</h3>
          <p className="text-hamboi-text-muted text-lg">We didn't just build an app; we built a safety net designed specifically for student life.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`
                relative group rounded-3xl p-8 overflow-hidden glass-morphism transition-all duration-300
                ${feature.size === 'lg' ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1'}
              `}
            >
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">{feature.title}</h4>
                  <p className="text-hamboi-text-muted leading-relaxed">{feature.description}</p>
                </div>

                {feature.size === 'lg' && (
                  <div className="mt-8 pt-8 border-t border-white/5">
                    <span className="text-white font-bold flex items-center gap-2">
                      Learn more <Sparkles className="w-4 h-4 text-hamboi-purple" />
                    </span>
                  </div>
                )}
              </div>

              {/* Decorative Background Element */}
              <div className={`absolute -right-10 -bottom-10 w-40 h-40 ${feature.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
