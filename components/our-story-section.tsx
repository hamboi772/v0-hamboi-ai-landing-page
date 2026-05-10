"use client"

import { Award, Globe, Sparkles, Users, ArrowRight, Heart, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function OurStorySection() {
  return (
    <section className="relative py-24 lg:py-32 bg-background overflow-hidden" id="our-story">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-hamboi-green/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-hamboi-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          {/* Column 1: Personal Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-hamboi-green text-[10px] font-black uppercase tracking-[0.2em] mb-10">
                <Star className="w-3.5 h-3.5 fill-hamboi-green" />
                The Origin Story
              </div>
              <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-10">
                A mission <br/>born from <span className="text-hamboi-green">necessity.</span>
              </h2>
              <div className="space-y-8 text-xl text-hamboi-text-muted leading-relaxed font-medium">
                <p className="border-l-2 border-white/10 pl-8">
                  "I'm <span className="text-white">Abiodun Abdul Hameed</span>. At 15, I noticed a silence in my classroom that was louder than any conversation. It was the silence of students struggling with things they didn't know how to name."
                </p>
                <p>
                  Growing up in Lagos, mental health wasn't something we talked about. I wanted to build the bridge I needed—a space that felt like a friend, not a clinic.
                </p>

                <div className="relative group">
                   <div className="absolute -inset-4 bg-gradient-to-r from-hamboi-purple/20 to-hamboi-green/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                   <div className="relative bg-white/5 border border-white/10 p-10 rounded-[2.5rem] overflow-hidden">
                      <p className="text-white font-black italic text-2xl leading-tight relative z-10">
                        "We earned a Bronze Medal at the FIRST Global Challenge, but the real prize is every student who feels less alone."
                      </p>
                      <Award className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 rotate-12" />
                   </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <Link href="/about/article">
                <Button className="bg-white text-black hover:bg-white/90 font-black h-20 px-12 rounded-[2rem] shadow-2xl transition-all hover:scale-105 active:scale-95 text-lg">
                  Read the full story
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Column 2: Visual Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Main Image Container with Abstract Frame */}
            <div className="relative z-10">
               <div className="absolute -inset-1 bg-gradient-to-tr from-hamboi-purple to-hamboi-green rounded-[4rem] blur opacity-20" />
               <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl group">
                  <Image
                    src="/images/founder-story.webp"
                    alt="Abiodun Abdul Hameed - Founder"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />

                  {/* Overlay Info */}
                  <div className="absolute bottom-12 left-12 right-12">
                     <div className="flex items-center gap-4 mb-6">
                        <div className="px-4 py-2 bg-hamboi-purple rounded-full text-white text-[10px] font-black uppercase tracking-widest">
                           Founder @ 15
                        </div>
                        <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-widest">
                           Lagos, Nigeria
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Floating Achievement Badge */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -right-8 top-1/4 z-20 glass-morphism p-8 rounded-[2.5rem] border border-white/20 shadow-2xl max-w-[240px]"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-black text-white text-lg uppercase tracking-tight leading-none mb-2">Bronze Medal</h4>
              <p className="text-[10px] text-hamboi-text-muted font-bold uppercase tracking-widest leading-relaxed">
                FIRST Global Challenge <br/>Innovation Award
              </p>
            </motion.div>

            {/* Decorative Geometric Shapes */}
            <div className="absolute -top-12 -left-12 w-32 h-32 border-2 border-hamboi-purple/20 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute -bottom-8 -right-8 w-24 h-24 border-2 border-hamboi-green/20 rounded-[2rem] rotate-45" />
          </motion.div>
        </div>

        {/* Impact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          {[
            {
              icon: Users,
              label: "Student-Led",
              desc: "By students, for students. No clinical disconnected vibes.",
              gradient: "from-hamboi-purple/10 to-transparent"
            },
            {
              icon: Globe,
              label: "Global Vision",
              desc: "From Lagos classrooms to an international stage for change.",
              gradient: "from-hamboi-green/10 to-transparent"
            },
            {
              icon: Sparkles,
              label: "Impact First",
              desc: "Mental health support shouldn't be a luxury. It's a right.",
              gradient: "from-blue-500/10 to-transparent"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden glass-morphism border-white/10 p-12 rounded-[3rem] group hover:border-white/20 transition-all duration-500`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="w-8 h-8 text-white group-hover:text-hamboi-green" />
                </div>
                <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-4">{item.label}</h4>
                <p className="text-hamboi-text-muted text-base font-medium leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
