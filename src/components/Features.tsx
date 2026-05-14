'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Cpu } from 'lucide-react';

const FEATURES = [
  {
    icon: Globe,
    title: "MULTIVERSE SYNC",
    desc: "Aggregating data nodes from all major gaming ecosystems into a single, high-fidelity profile.",
    pos: "top-0 left-0"
  },
  {
    icon: Zap,
    title: "LIVE TELEMETRY",
    desc: "Real-time performance tracking with sub-second latency from global gaming APIs.",
    pos: "top-0 right-0"
  },
  {
    icon: Shield,
    title: "ENCRYPTED ID",
    desc: "Cryptographic verification of ranks and achievements to eliminate identity fraud.",
    pos: "bottom-0 left-0"
  },
  {
    icon: Cpu,
    title: "WIDGET SYNTH",
    desc: "Customizable UI modules that allow you to build a profile that mirrors your unique playstyle.",
    pos: "bottom-0 right-0"
  }
];

export default function Features() {
  return (
    <section className="py-40 px-6 relative overflow-hidden bg-black">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-32 space-y-4">
          <div className="text-lime text-[10px] font-black tracking-[0.5em] uppercase">Architecture</div>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase">CORE<br />SYSTEMS</h2>
        </div>

        <div className="relative min-h-[800px] md:min-h-[600px]">
          {/* Central Connecting Lines (Schematic Style) */}
          <div className="absolute inset-0 hidden md:block">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5" />
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/5" />
            
            {/* Pulsing Central Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 glass rounded-full border border-lime/20 flex items-center justify-center">
              <div className="w-4 h-4 bg-lime rounded-full animate-ping shadow-[0_0_20px_rgba(204,255,0,1)]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                viewport={{ margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                className="group p-8 glass rounded-3xl border border-white/5 hover:border-lime/20 transition-all relative z-10"
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-lime/10 group-hover:text-lime transition-all">
                    <f.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-white/20 text-[10px] font-black tracking-widest mb-1">0{i + 1}</div>
                    <h3 className="text-2xl font-black tracking-tighter">{f.title}</h3>
                  </div>
                </div>
                <p className="text-gray-500 font-medium leading-relaxed group-hover:text-gray-300 transition-colors">
                  {f.desc}
                </p>
                
                {/* Decorative Schematic Corner */}
                <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-white/10 group-hover:border-lime/40 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
