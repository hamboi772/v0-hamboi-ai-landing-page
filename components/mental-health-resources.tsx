"use client"

import { Button } from "@/components/ui/button"
import { Phone, Clock, Shield, AlertTriangle, ArrowRight, Heart } from "lucide-react"
import Link from "next/link"
import { nigerianMentalHealthResources } from "@/lib/data/nigerian-mental-health-resources"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function MentalHealthResources() {
  const [filter, setFilter] = useState<"all" | "crisis" | "counseling">("all")

  const filteredResources =
    filter === "all" ? nigerianMentalHealthResources : nigerianMentalHealthResources.filter((r) => r.type === filter)

  return (
    <section className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-hamboi-green/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-hamboi-green/10 border border-hamboi-green/20 text-hamboi-green px-4 py-2 rounded-full text-sm font-bold mb-8">
            <Heart className="w-4 h-4" />
            Support
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            You are <span className="text-hamboi-green">never</span> alone.
          </h2>
          <p className="text-hamboi-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Free, professional crisis hotlines and mental health support services available across Nigeria.
          </p>
        </motion.div>

        <div className="flex gap-3 justify-center mb-12 flex-wrap">
          {["all", "crisis", "counseling"].map((f) => (
            <Button
              key={f}
              variant="ghost"
              onClick={() => setFilter(f as any)}
              className={`rounded-xl px-6 h-12 font-black uppercase tracking-widest text-[10px] transition-all border ${
                filter === f
                  ? "bg-hamboi-purple text-white border-hamboi-purple shadow-lg"
                  : "bg-white/5 text-white/30 border-white/10 hover:bg-white/10"
              }`}
            >
              {f === "all" ? "All Resources" : f === "crisis" ? "Crisis Lines" : "Counseling"}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredResources.map((resource, index) => (
              <motion.div
                layout
                key={resource.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                className="glass-morphism border-white/10 p-8 rounded-[2.5rem] flex flex-col h-full group"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-white mb-2 leading-tight">{resource.name}</h3>
                    <p className="text-hamboi-text-muted text-sm font-medium leading-relaxed">{resource.description}</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-hamboi-green/20 flex items-center justify-center shrink-0 ml-4 group-hover:bg-hamboi-green group-hover:text-background transition-colors">
                    <Shield className="h-6 w-6 text-hamboi-green group-hover:text-inherit" />
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-8 text-[10px] font-black uppercase tracking-widest text-hamboi-green/60">
                  <Clock className="h-4 w-4" />
                  <span>{resource.availability}</span>
                </div>

                <div className="space-y-3 mt-auto">
                  {resource.phone.map((number, idx) => (
                    <a
                      key={idx}
                      href={`tel:${number.replace(/\s/g, "")}`}
                      className="flex items-center justify-between p-5 rounded-2xl bg-white/5 hover:bg-hamboi-purple hover:text-white transition-all border border-white/5 group/btn"
                    >
                      <div className="flex items-center gap-4">
                        <Phone className="h-5 w-5 opacity-40 group-hover/btn:opacity-100" />
                        <span className="font-mono font-black text-lg">{number}</span>
                      </div>
                      <ArrowRight className="h-5 w-5 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-col items-center gap-12"
        >
          <Link href="/resources">
            <Button size="lg" className="bg-white text-background hover:bg-hamboi-green transition-colors font-black rounded-2xl px-12 h-16 text-lg shadow-2xl">
              View All Resources & Stories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <div className="w-full max-w-3xl p-8 bg-red-500/10 border border-red-500/20 rounded-[2rem] flex flex-col md:flex-row items-center gap-6">
            <div className="w-14 h-14 bg-red-500/20 rounded-2xl flex items-center justify-center shrink-0">
               <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-black text-white text-xl mb-1 uppercase tracking-tight">Emergency?</h3>
              <p className="text-white/60 font-medium">
                If you are in immediate danger, call <strong className="text-white">112</strong> (National) or <strong className="text-white">767</strong> (Lagos) right now.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
