'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const STEPS = [
  {
    num: "01",
    title: "LINK",
    desc: "Sync your game IDs (Riot, Steam, Epic) through our secure gateway."
  },
  {
    num: "02",
    title: "SYNTH",
    desc: "Select your visual core and customize your identity widgets."
  },
  {
    num: "03",
    title: "LIVE",
    desc: "Deploy your living profile to the multiverse with one link."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-40 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <div className="space-y-4">
            <div className="text-lime text-[10px] font-black tracking-[0.4em] uppercase">Deployment Process</div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Protocol</h2>
          </div>
          <p className="text-gray-500 max-w-xs font-medium text-sm leading-relaxed">
            Establishing your digital presence across the gaming multiverse in three synchronized stages.
          </p>
        </div>

        <div className="grid md:grid-cols-3 border border-white/5 rounded-[3rem] overflow-hidden glass divide-y md:divide-y-0 md:divide-x divide-white/5">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              viewport={{ margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              className="group p-12 relative flex flex-col justify-between min-h-[400px] hover:bg-white/[0.02] transition-colors"
            >
              {/* Background Number - Outlined */}
              <div className="absolute top-10 right-10 text-8xl font-black text-transparent stroke-white/5 opacity-20 transition-all group-hover:opacity-40" 
                   style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
                {step.num}
              </div>

              <div className="space-y-4 relative z-10">
                <div className="w-10 h-1 bg-lime/30 group-hover:w-16 group-hover:bg-lime transition-all duration-500" />
                <h3 className="text-4xl font-black tracking-tighter group-hover:text-lime transition-colors">{step.title}</h3>
              </div>

              <div className="space-y-6 relative z-10">
                <p className="text-gray-500 font-medium leading-relaxed group-hover:text-gray-300 transition-colors">
                  {step.desc}
                </p>
                <div className="flex items-center gap-2 text-white/20 group-hover:text-lime transition-colors">
                  <span className="text-[10px] font-black tracking-widest uppercase">Initiate</span>
                  <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
