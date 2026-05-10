"use client"

import { Shield, Lock, EyeOff, CheckCircle2, Heart, Fingerprint, Zap } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Shield,
    title: "100% Anonymous",
    description: "No real names required. Express yourself freely without judgment or fear.",
  },
  {
    icon: Lock,
    title: "E2E Encrypted",
    description: "Your conversations are private. Only you and your companion can read your messages.",
  },
  {
    icon: EyeOff,
    title: "No Data Selling",
    description: "We never sell your data. Your privacy is our priority, not our profit model.",
  },
  {
    icon: Fingerprint,
    title: "Secure Access",
    description: "Optional biometric or PIN lock ensures your safe space remains truly yours.",
  },
]

export function SafetyPrivacySection() {
  return (
    <section id="safety" className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[30%] h-[60%] bg-hamboi-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-hamboi-green/10 border border-hamboi-green/20 text-hamboi-green px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <Shield className="w-3.5 h-3.5" />
              Safety First
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tighter">
              Your <span className="text-hamboi-green">privacy</span> isn't a feature. <br/>It's our <span className="text-hamboi-purple">promise.</span>
            </h2>
            <p className="text-hamboi-text-muted text-xl mb-12 leading-relaxed font-medium max-w-xl">
              We built Hamboi to be the safe space we wished we had. That means your data is yours, your identity is protected, and your peace of mind is guaranteed.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                "No intrusive trackers",
                "Session self-destruct",
                "Student-led policy",
                "NDPR Compliant"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 group bg-white/5 border border-white/5 p-4 rounded-2xl"
                >
                  <div className="w-8 h-8 rounded-xl bg-hamboi-green/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-hamboi-green" />
                  </div>
                  <span className="text-white font-black uppercase tracking-tight text-xs">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-8 rounded-[2.5rem] glass-morphism border-white/10 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:bg-hamboi-purple/20 transition-all">
                  <feature.icon className="w-7 h-7 text-hamboi-purple" />
                </div>
                <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">{feature.title}</h3>
                <p className="text-hamboi-text-muted text-sm leading-relaxed font-medium">
                  {feature.description}
                </p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="sm:col-span-2 p-10 rounded-[3rem] bg-gradient-to-br from-hamboi-purple/20 to-hamboi-green/20 border border-white/10 flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
              <div className="w-20 h-20 rounded-[2.5rem] bg-white/10 flex items-center justify-center shrink-0 shadow-2xl">
                <Heart className="w-10 h-10 text-white fill-white" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-white font-black text-xl mb-2 uppercase tracking-tight">Built by students, for students.</h4>
                <p className="text-hamboi-text-muted text-sm font-medium leading-relaxed">We don't just follow privacy laws—we build for human safety. Your safe space stays safe, always.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
