'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import ThreeScene from './ThreeScene';
import InteractiveGrid2D from './InteractiveGrid2D';

export default function Hero() {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    currentTarget.style.setProperty("--mouse-x", `${x}px`);
    currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden group"
    >
      {/* 2D Interactive Grid (Canvas) */}
      <InteractiveGrid2D />

      {/* 3D Tech Artifact */}
      <ThreeScene />

      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-lime/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-magenta/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto z-10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-block px-4 py-1.5 glass rounded-full text-lime text-sm font-medium tracking-wider uppercase mb-4 border border-lime/20">
              Next-Gen Gaming Identity
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight">
              YOUR GAMING <br />
              <span className="text-gradient-lime drop-shadow-[0_0_15px_rgba(204,255,0,0.3)]">IDENTITY</span>, <br />
              <span className="text-gradient-magenta italic">EVOLVED.</span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Claim your living gaming profile. Connect your stats, showcase your ranks, and build your digital legacy in the multiverse.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto">
              <div className="relative w-full group">
                <input
                  type="text"
                  placeholder="username"
                  className="w-full glass bg-black/40 border border-white/10 rounded-xl py-4 pl-28 pr-4 outline-none focus:border-lime/50 transition-all text-white font-medium backdrop-blur-md"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none z-10">blytz.lol/</span>
              </div>
              <button className="w-full sm:w-auto bg-lime text-black font-bold px-8 py-4 rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 group whitespace-nowrap glow-lime shadow-[0_0_30px_rgba(204,255,0,0.2)]">
                CLAIM URL
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
