"use client"

import { Heart, Sparkles, Zap, ShieldCheck } from "lucide-react"

export function ShareGraphicsGenerator() {
  return (
    <div className="container mx-auto px-4 py-24 text-white selection:bg-hamboi-purple/30">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black mb-4">Share Graphics</h1>
        <p className="text-hamboi-text-muted font-bold uppercase tracking-widest text-sm">Visuals to spread the word</p>
      </div>

      {/* Instagram Post */}
      <div className="mb-24">
        <h2 className="text-xs font-black text-white/30 uppercase tracking-[0.3em] mb-8 text-center">Instagram Post (1:1)</h2>
        <div className="max-w-2xl mx-auto aspect-square bg-background border border-white/10 rounded-[4rem] p-16 flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-hamboi-purple/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-hamboi-green/10 rounded-full blur-[100px]" />

          <div className="relative z-10">
            <div className="w-16 h-16 bg-hamboi-purple rounded-2xl flex items-center justify-center mb-10 shadow-xl">
               <Heart className="w-8 h-8 text-white fill-white" />
            </div>
            <h3 className="text-6xl font-black text-white mb-6 leading-tight uppercase tracking-tighter">You're not <br/><span className="text-hamboi-purple">alone.</span></h3>
            <p className="text-2xl text-hamboi-text-muted font-medium">Free, private mental health support for students.</p>
          </div>

          <div className="relative z-10">
            <div className="glass-morphism border-white/10 rounded-3xl p-8 mb-8">
               <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-xl font-bold">
                     <Zap className="w-6 h-6 text-hamboi-green" /> 24/7 AI Companion
                  </li>
                  <li className="flex items-center gap-4 text-xl font-bold">
                     <ShieldCheck className="w-6 h-6 text-hamboi-purple" /> 100% Anonymous
                  </li>
               </ul>
            </div>
            <div className="flex items-center justify-between">
               <p className="text-2xl font-black tracking-tighter">hamboimindcare.site</p>
               <Sparkles className="w-8 h-8 text-hamboi-green" />
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp / Stories */}
      <div className="mb-24">
        <h2 className="text-xs font-black text-white/30 uppercase tracking-[0.3em] mb-8 text-center">Stories / Status (9:16)</h2>
        <div className="max-w-md mx-auto aspect-[9/16] bg-background border border-white/10 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-b from-hamboi-purple/20 via-transparent to-hamboi-green/10" />

          <div className="relative z-10 mb-12">
            <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-center mb-8 mx-auto shadow-2xl">
               <Heart className="w-12 h-12 text-hamboi-purple fill-current" />
            </div>
            <h3 className="text-5xl font-black text-white mb-4 uppercase tracking-tighter">HAMBOI</h3>
            <p className="text-hamboi-text-muted font-black tracking-[0.3em] uppercase text-xs">MindCare</p>
          </div>

          <div className="relative z-10 glass-morphism border-white/10 rounded-[2rem] p-8 mb-12 w-full">
            <p className="text-2xl font-black text-white mb-2 leading-tight uppercase">Safe Space</p>
            <p className="text-sm font-medium text-hamboi-text-muted">For students who get it.</p>
          </div>

          <div className="relative z-10 mt-auto">
             <p className="text-sm font-black text-white uppercase tracking-widest mb-4">Scan or visit link</p>
             <div className="h-1 w-20 bg-hamboi-green mx-auto rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
