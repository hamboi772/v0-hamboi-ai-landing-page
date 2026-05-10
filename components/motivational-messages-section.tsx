"use client"

import { useEffect, useState } from "react"
import { Sparkles, Heart, Zap, ShieldCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const motivationalMessages = [
  { message: "You're stronger than you think, and braver than you believe.", author: "Arowolo Hamzat" },
  { message: "It's okay to not be okay. Healing isn't linear, and that's perfectly normal.", author: "Alebiosu Hassan" },
  { message: "Your mental health is a priority, not an inconvenience.", author: "Shittu Robiu" },
  { message: "Small steps forward are still progress. Be proud of how far you've come.", author: "Edu Maruf" },
  { message: "You don't have to be positive all the time. It's okay to feel your feelings.", author: "Bada Fareeah" },
  { message: "Asking for help is a sign of strength, not weakness.", author: "Martins Zayd" },
  { message: "You are not your thoughts. You are the observer of your thoughts.", author: "Arikawe Aleeyah" },
  { message: "Be gentle with yourself. You're doing the best you can.", author: "Asaolu Tomiwa" },
  { message: "Your story isn't over yet. Tomorrow is a new chapter.", author: "Alli Aaliyah" },
  { message: "You matter. Your feelings matter. You are worthy of love and support.", author: "Yusuf Bareerah" },
  { message: "The darkest nights produce the brightest stars. Keep going.", author: "Adekeye Fareedah" },
  { message: "You've survived 100% of your bad days. You're undefeated.", author: "Falana Muyinudeen" },
  { message: "Progress, not perfection. Every small win counts.", author: "Abiodun AbdulHameed" },
]

export function MotivationalMessagesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % motivationalMessages.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const currentMessage = motivationalMessages[currentIndex]

  return (
    <section className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-hamboi-green/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-hamboi-purple/10 border border-hamboi-purple/20 text-hamboi-purple px-4 py-2 rounded-full text-sm font-bold mb-8">
            <Sparkles className="w-4 h-4" />
            Daily Wisdom
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            A little light for <br/><span className="text-hamboi-purple">the dark days.</span>
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -10 }}
              transition={{ duration: 0.5 }}
              className="glass-morphism border-white/10 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl"
            >
              {/* Massive decorative quote mark */}
              <div className="absolute -top-10 -left-10 text-[200px] font-black text-white/5 pointer-events-none select-none">"</div>

              <div className="relative z-10">
                <p className="text-2xl md:text-4xl font-black text-white leading-tight mb-10 max-w-3xl mx-auto">
                  {currentMessage.message}
                </p>

                <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-8 bg-hamboi-purple/30" />
                  <span className="text-hamboi-purple font-black uppercase tracking-[0.2em] text-xs">
                    {currentMessage.author}
                  </span>
                  <div className="h-px w-8 bg-hamboi-purple/30" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Custom Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {motivationalMessages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === currentIndex ? "bg-hamboi-purple w-12" : "bg-white/10 hover:bg-white/20 w-1.5"
                }`}
                aria-label={`Go to quote ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Impact Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="glass-morphism border-white/10 p-8 rounded-[2.5rem] text-center group"
           >
              <div className="w-12 h-12 bg-hamboi-green/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-hamboi-green transition-colors">
                 <Heart className="w-6 h-6 text-hamboi-green group-hover:text-background" />
              </div>
              <h3 className="text-4xl font-black text-white mb-2">100%</h3>
              <p className="text-hamboi-text-muted text-xs font-bold uppercase tracking-widest">Bad days survived</p>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="glass-morphism border-white/10 p-8 rounded-[2.5rem] text-center group"
           >
              <div className="w-12 h-12 bg-hamboi-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-hamboi-purple transition-colors">
                 <Zap className="w-6 h-6 text-hamboi-purple group-hover:text-white" />
              </div>
              <h3 className="text-4xl font-black text-white mb-2">24/7</h3>
              <p className="text-hamboi-text-muted text-xs font-bold uppercase tracking-widest">Support available</p>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="glass-morphism border-white/10 p-8 rounded-[2.5rem] text-center group"
           >
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500 transition-colors">
                 <ShieldCheck className="w-6 h-6 text-blue-500 group-hover:text-white" />
              </div>
              <h3 className="text-4xl font-black text-white mb-2">Private</h3>
              <p className="text-hamboi-text-muted text-xs font-bold uppercase tracking-widest">Encrypted and safe</p>
           </motion.div>
        </div>
      </div>
    </section>
  )
}
