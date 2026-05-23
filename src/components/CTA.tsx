'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Cpu, Globe, Lock, Shield, Zap } from 'lucide-react';
import { useRef } from 'react';

export default function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-60 px-6 relative overflow-hidden bg-black">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ rotate }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-20"
        >
          <div className="absolute inset-0 border-[1px] border-lime/20 rounded-full scale-100" />
          <div className="absolute inset-0 border-[1px] border-magenta/10 rounded-full scale-75 rotate-45" />
          <div className="absolute inset-0 border-[1px] border-white/5 rounded-full scale-50 -rotate-12" />
        </motion.div>
        
        {/* Floating Data Nodes */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { top: '20%', left: '15%' },
            { top: '75%', left: '85%' },
            { top: '45%', left: '40%' }
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: [0, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
              className="absolute"
              style={{
                top: pos.top,
                left: pos.left,
              }}
            >
              <div className="flex items-center gap-2 text-[8px] font-black text-lime tracking-widest uppercase bg-black/80 px-2 py-1 border border-lime/20">
                <Cpu className="w-2 h-2" />
                Data_Stream_{i}42
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div 
        style={{ scale, opacity }}
        className="container mx-auto relative z-10"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
          
          {/* Left Side: Abstract Typography */}
          <div className="flex-1 space-y-10 relative">
            <div className="absolute -left-10 top-0 w-1 h-32 bg-gradient-to-b from-lime via-transparent to-transparent opacity-50" />
            
            <div className="space-y-4">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="text-lime font-black text-sm tracking-[0.5em] uppercase flex items-center gap-3"
              >
                <div className="w-12 h-px bg-lime" />
                Finalizing_Protocol
              </motion.div>
              
              <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mix-blend-difference">
                SYNC <br />
                <span className="text-white/20 outline-text">OR BE</span> <br />
                <span className="text-lime italic drop-shadow-[0_0_30px_rgba(204,255,0,0.4)]">DELETED.</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-8 max-w-sm">
              {[
                { icon: Shield, label: "SECURE_ID" },
                { icon: Zap, label: "INSTANT_SYNC" },
                { icon: Globe, label: "MULTI_VERB" },
                { icon: Lock, label: "ENCRYPTED" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white/40 group cursor-crosshair">
                  <item.icon className="w-4 h-4 group-hover:text-lime transition-colors" />
                  <span className="text-[10px] font-black tracking-widest uppercase">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Holographic Interface (Redesigned) */}
          <div className="w-full max-w-xl relative perspective-[2000px]">
            <motion.div
              initial={{ rotateY: 20, rotateX: 10, opacity: 0 }}
              whileInView={{ rotateY: 15, rotateX: 5, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              {/* Technical Ornaments / Coordinates */}
              <div className="absolute -top-20 -left-10 text-[8px] font-mono text-lime/30 space-y-1">
                <div>X: 142.02</div>
                <div>Y: 884.11</div>
                <div>Z: BLYTZ_CORE</div>
              </div>

              {/* Main Holographic Slate */}
              <div className="relative">
                {/* Glowing Borders */}
                <div className="absolute inset-0 border-l-[1px] border-t-[1px] border-lime/30 w-32 h-32" />
                <div className="absolute bottom-0 right-0 border-r-[1px] border-b-[1px] border-magenta/30 w-32 h-32" />
                
                <div className="p-12 space-y-16 relative">
                  {/* Background Blur Shard */}
                  <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-md skew-x-[-12deg] -z-10 border border-white/5" />
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-lime">
                      <div className="w-2 h-2 bg-lime animate-ping" />
                      <span className="text-[10px] font-black tracking-[0.5em] uppercase">Identity_Extraction</span>
                    </div>
                    
                    <div className="relative group">
                      <input 
                        type="text"
                        placeholder="ENTER_ID"
                        className="w-full bg-transparent border-b border-lime/20 py-8 text-4xl md:text-5xl font-black text-white outline-none focus:border-lime transition-all placeholder:text-white/5 tracking-tighter"
                      />
                      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-lime group-focus-within:w-full transition-all duration-700" />
                      
                      {/* Floating Hostname */}
                      <div className="absolute -top-4 right-0 text-[10px] font-black text-gray-600 tracking-widest uppercase">
                        Protocol://blytz.lol/
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-10">
                    <button className="relative group/btn overflow-hidden">
                      <div className="flex items-center gap-6 px-10 py-5 bg-lime text-black font-black text-sm tracking-[0.3em] uppercase group-hover:bg-white transition-colors relative z-10">
                        INITIALIZE_CLAIM
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </div>
                      <div className="absolute -inset-1 bg-lime/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-[1px] bg-white/20" />
                        <span className="text-[9px] font-black text-white/40 tracking-widest uppercase">Encryption_Active</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-[1px] bg-lime/40" />
                        <span className="text-[9px] font-black text-lime/40 tracking-widest uppercase">Uplink_Established</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Deco Elements */}
              <motion.div 
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -right-12 top-1/4 w-32 h-px bg-gradient-to-r from-transparent via-lime to-transparent rotate-90"
              />
            </motion.div>
          </div>

        </div>
      </motion.div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </section>
  );
}
