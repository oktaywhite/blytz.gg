'use client';

import { motion } from 'framer-motion';
import { Trophy, Swords, Target, TrendingUp } from 'lucide-react';
import Image from 'next/image';

export default function StatsCard() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4">LIVE <span className="text-lime">STATS</span> PREVIEW</h2>
          <p className="text-gray-500 max-w-2xl">Connect your favorite games via API. Your rank, your mastery, your glory—automatically updated in real-time.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-[2.5rem] overflow-hidden border-white/5 relative group"
          >
            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-magenta/10 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-magenta/20 transition-all duration-700" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-lime/10 rounded-full blur-[80px] -ml-32 -mb-32 group-hover:bg-lime/20 transition-all duration-700" />

            <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
              {/* Profile Image & Rank Section */}
              <div className="md:col-span-4 flex flex-col items-center space-y-6">
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0 bg-gradient-to-tr from-lime to-magenta rounded-full animate-spin-slow opacity-20 blur-xl" />
                  <div className="w-full h-full rounded-full border-2 border-lime/30 p-2">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                      <div className="text-5xl font-black text-lime">NR</div>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-black border border-white/10 rounded-xl px-3 py-1 flex items-center gap-1.5 shadow-2xl">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-bold tracking-widest">LIVE</span>
                  </div>
                </div>
                
                <div className="text-center space-y-1">
                  <h3 className="text-2xl font-bold">NeoPlayerOne</h3>
                  <p className="text-lime font-medium text-sm tracking-widest">CHALLENGER</p>
                </div>

                <div className="flex gap-3">
                   <div className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:border-lime/40 transition-colors">
                      <TrendingUp className="w-5 h-5 text-lime" />
                   </div>
                   <div className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:border-magenta/40 transition-colors">
                      <Trophy className="w-5 h-5 text-magenta" />
                   </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass bg-white/5 p-6 rounded-2xl border-white/5 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-lime/10 rounded-lg">
                        <Swords className="w-5 h-5 text-lime" />
                      </div>
                      <span className="font-bold text-sm text-gray-400">WIN RATE</span>
                    </div>
                    <span className="text-lime font-black">68.4%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-lime w-[68.4%] glow-lime" />
                  </div>
                </div>

                <div className="glass bg-white/5 p-6 rounded-2xl border-white/5 space-y-4">
                   <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-magenta/10 rounded-lg">
                        <Target className="w-5 h-5 text-magenta" />
                      </div>
                      <span className="font-bold text-sm text-gray-400">MASTERY</span>
                    </div>
                    <span className="text-magenta font-black">1.2M</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-white/10" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 self-center">+12 More</span>
                  </div>
                </div>

                <div className="glass bg-white/10 p-6 rounded-2xl border-white/10 sm:col-span-2 flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-xl font-black italic">LoL</div>
                    <div>
                      <h4 className="font-bold">League of Legends</h4>
                      <p className="text-xs text-gray-500 font-medium tracking-wider uppercase">Region: EUW</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-black tracking-tighter">LP 1,420</span>
                    <span className="text-[10px] text-gray-500 font-bold">TOP 0.01% GLOBAL</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
