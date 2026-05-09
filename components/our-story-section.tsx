"use client"

import { Award, Globe, Heart, Sparkles, Users, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function OurStorySection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="relative py-24 lg:py-32 bg-hamboi-dark-bg overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-hamboi-purple/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-hamboi-green/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Column 1: Personal Narrative */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-hamboi-green/10 rounded-full text-hamboi-green text-sm font-bold border border-hamboi-green/20 mb-6">
                <Award className="w-4 h-4" />
                Founder's Journey
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                From Nigeria to the World Stage 🇳🇬
              </h2>
              <div className="space-y-6 text-lg text-hamboi-text-muted leading-relaxed">
                <p>
                  "I'm Abiodun Abdul Hameed. At 15, while most kids were just gaming, I was obsessing over how to solve a silence that was hurting my friends."
                </p>
                <p>
                  Growing up in Lagos, I saw how mental health was often ignored or misunderstood. I wanted to build something that felt like a friend, not a clinical tool.
                </p>
                <p className="text-white font-medium italic border-l-4 border-hamboi-purple pl-6 py-2">
                  "Hamboi isn't just an app. It's the friend I wish I had when things got loud in my head."
                </p>
                <p>
                  This journey led me to represent Team Nigeria at the <strong>FIRST Global Challenge</strong>, where we earned a <strong>Bronze Medal</strong> for international unity. It proved one thing: student innovation has no borders.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <Link href="/about/article">
                <Button className="bg-hamboi-purple hover:bg-hamboi-purple/90 text-white font-bold py-6 px-8 rounded-2xl shadow-lg shadow-hamboi-purple/20 transition-all hover:scale-105">
                  Read the Full Story
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Column 2: Visual Placeholder / Impact Section */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="relative aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-hamboi-dark-bg via-transparent to-transparent z-10 opacity-60" />
              <Image
                src="/images/founder-story.webp"
                alt="Abiodun Abdul Hameed - Founder of Hamboi Mindcare"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Floating Achievement Card */}
              <motion.div
                className="absolute bottom-8 left-8 right-8 z-20 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-hamboi-purple flex items-center justify-center shadow-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Bronze Medalist</h4>
                    <p className="text-xs text-white/70">2025 FIRST Global Challenge</p>
                  </div>
                </div>
                <p className="text-sm text-white/90 leading-relaxed">
                  Recognized for International Unity and Excellence in Innovation.
                </p>
              </motion.div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-hamboi-green/20 rounded-full blur-3xl animate-pulse-soft" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-hamboi-purple/20 rounded-full blur-3xl animate-pulse-soft" />
          </motion.div>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 pt-16 border-t border-white/5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              icon: Users,
              label: "Student-Led",
              desc: "Built by teens who understand the modern pressure.",
              color: "text-hamboi-green",
              bg: "bg-hamboi-green/10"
            },
            {
              icon: Globe,
              label: "Global Impact",
              desc: "From Lagos to the world, breaking mental health stigmas.",
              color: "text-hamboi-cyan",
              bg: "bg-hamboi-cyan/10"
            },
            {
              icon: Sparkles,
              label: "Real Innovation",
              desc: "Bronze Medal recognized technology for social good.",
              color: "text-hamboi-purple",
              bg: "bg-hamboi-purple/10"
            }
          ].map((stat, i) => (
            <motion.div key={i} variants={itemVariants} className="text-center md:text-left space-y-4">
              <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mb-4 ${stat.color} mx-auto md:mx-0 shadow-inner`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-white">{stat.label}</h4>
              <p className="text-hamboi-text-muted leading-relaxed">{stat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
