"use client"

import { Award, Globe, Sparkles, Users, ArrowRight, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function OurStorySection() {
  return (
    <section className="relative py-24 lg:py-32 bg-background overflow-hidden" id="our-story">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-hamboi-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Column 1: Personal Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-hamboi-green/10 rounded-full text-hamboi-green text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-hamboi-green/20">
                <Award className="w-3.5 h-3.5" />
                The Journey
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-white leading-tight tracking-tighter mb-8">
                From Nigeria <br/>to the <span className="text-hamboi-green">World Stage.</span>
              </h2>
              <div className="space-y-6 text-xl text-hamboi-text-muted leading-relaxed font-medium">
                <p>
                  "I'm Abiodun Abdul Hameed. At 15, while most kids were just gaming, I was obsessing over how to solve a silence that was hurting my friends."
                </p>
                <p>
                  Growing up in Lagos, I saw how mental health was often ignored. I wanted to build something that felt like a friend, not a clinical tool.
                </p>

                <div className="bg-white/5 border-l-4 border-hamboi-purple p-8 rounded-r-3xl my-10">
                   <p className="text-white font-black italic text-2xl leading-tight">
                    "Hamboi isn't just an app. It's the friend I wish I had when things got loud in my head."
                  </p>
                </div>

                <p>
                  This journey led me to represent Team Nigeria at the <strong>FIRST Global Challenge</strong>, where we earned a <strong>Bronze Medal</strong> for international unity.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/about/article">
                <Button className="bg-hamboi-purple hover:bg-hamboi-purple/90 text-white font-black h-16 px-10 rounded-2xl shadow-xl transition-all hover:scale-105">
                  Read Full Story
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Column 2: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 opacity-60" />
              <Image
                src="/images/founder-story.webp"
                alt="Abiodun Abdul Hameed - Founder"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
              />

              {/* Achievement Card */}
              <motion.div
                className="absolute bottom-8 left-8 right-8 z-20 glass-morphism p-8 rounded-[2rem] border border-white/20 shadow-2xl"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-hamboi-purple flex items-center justify-center shadow-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-white uppercase tracking-tight">Bronze Medalist</h4>
                    <p className="text-[10px] text-hamboi-purple font-black uppercase tracking-widest">2025 FIRST Global</p>
                  </div>
                </div>
                <p className="text-sm text-white font-medium leading-relaxed">
                  Recognized for International Unity and Excellence in Student Innovation.
                </p>
              </motion.div>
            </div>

            {/* Decorative bits */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-hamboi-green/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-hamboi-purple/10 rounded-full blur-3xl animate-pulse" />
          </motion.div>
        </div>

        {/* Bottom Bento Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          {[
            { icon: Users, label: "Student-Led", desc: "Built by teens who understand the modern pressure.", color: "text-hamboi-green" },
            { icon: Globe, label: "African Built", desc: "From Lagos to the world, breaking cultural silence.", color: "text-blue-400" },
            { icon: Sparkles, label: "Innovation", desc: "Award-winning tech applied to social impact.", color: "text-hamboi-purple" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-morphism border-white/10 p-10 rounded-[2.5rem] text-center md:text-left group"
            >
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-hamboi-purple/20 transition-all">
                <item.icon className={`w-7 h-7 ${item.color}`} />
              </div>
              <h4 className="text-xl font-black text-white uppercase tracking-tight mb-3">{item.label}</h4>
              <p className="text-hamboi-text-muted text-sm font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
