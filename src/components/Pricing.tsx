'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, ArrowRight, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Pricing() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="pricing" className="py-40 px-6 bg-black relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="flex flex-col items-center mb-24">
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-lime to-transparent mb-10" />
          <div className="text-lime text-[10px] font-black tracking-[0.4em] uppercase mb-4">Level Selection</div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none text-center">
            SYSTEM ACCESS
          </h2>
        </div>

        <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16 perspective-[2000px]">

          {/* BASE PROTOCOL - Compact Node */}
          <motion.div
            initial={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, rotateX: 10, rotateY: -15, x: -100 }}
            whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, rotateX: 5, rotateY: -10, x: 0 }}
            exit={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, rotateX: 10, rotateY: -15, x: -100 }}
            whileHover={!isMobile ? { rotateY: -5, scale: 1.02 } : { scale: 1.02 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-[340px] relative group will-change-transform"
          >
            <div className={`glass rounded-[3rem] border-r-4 border-white/10 p-10 relative overflow-hidden ${isMobile ? 'backdrop-blur-xl' : 'backdrop-blur-3xl'}`}>
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 animate-scan pointer-events-none" />

              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <Shield className="w-6 h-6 text-gray-500" />
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] font-black text-gray-700 tracking-widest uppercase mb-1">Node_00</div>
                    <div className="text-[10px] font-black text-white/40 tracking-widest uppercase">Base</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-6xl font-black tracking-tighter">€0</div>
                  <div className="text-gray-600 text-[9px] font-black uppercase tracking-[0.3em]">Permanent_Access</div>
                </div>

                <div className="space-y-4">
                  {["1 ID Sync", "Basic Theme", "Live Stats"].map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-500 font-bold text-[11px] tracking-widest uppercase">
                      <div className="w-1.5 h-1.5 rounded-full border border-white/20" />
                      {f}
                    </div>
                  ))}
                </div>

                <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black tracking-[0.2em] uppercase rounded-2xl border border-white/10 transition-all">
                  Initialize Base
                </button>
              </div>
            </div>
          </motion.div>

          {/* ELITE MATRIX - Compact Slab */}
          <motion.div
            initial={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, rotateX: 10, rotateY: 15, x: 100 }}
            whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, rotateX: 5, rotateY: 10, x: 0 }}
            exit={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, rotateX: 10, rotateY: 15, x: 100 }}
            whileHover={!isMobile ? { rotateY: 5, scale: 1.05 } : { scale: 1.05 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-[380px] relative group will-change-transform"
          >
            {!isMobile && <div className="absolute inset-0 bg-lime/10 blur-[100px] opacity-10 pointer-events-none" />}

            <div className={`glass rounded-[3.5rem] border-l-4 border-lime p-12 relative overflow-hidden shadow-[0_0_50px_rgba(204,255,0,0.1)] ${isMobile ? 'backdrop-blur-xl' : 'backdrop-blur-3xl'}`}>
              <div className="absolute top-0 left-0 w-full h-[2px] bg-lime/40 animate-scan-fast pointer-events-none shadow-[0_0_10px_rgba(204,255,0,0.4)]" />

              <div className="space-y-10">
                <div className="flex justify-between items-start">
                  <div className="p-4 rounded-2xl bg-lime/10 border border-lime/30 shadow-[0_0_20px_rgba(204,255,0,0.1)]">
                    <Zap className="w-8 h-8 text-lime animate-pulse" />
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] font-black text-lime tracking-widest uppercase mb-1">Node_01</div>
                    <div className="text-[10px] font-black text-lime/40 tracking-widest uppercase">Elite</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <div className="text-7xl font-black tracking-tighter text-white">€5</div>
                    <div className="bg-lime text-black px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest uppercase">Lifetime</div>
                  </div>
                  <div className="text-lime/60 text-[9px] font-black uppercase tracking-[0.3em]">Elite_Sync_Active</div>
                </div>

                <div className="grid gap-6">
                  {["Unlimited Sync", "Pro Themes", "Custom URL", "Verified ID"].map((f, i) => (
                    <div key={i} className="flex items-center gap-4 group/item">
                      <div className="w-2.5 h-2.5 rounded-sm bg-lime shadow-[0_0_8px_rgba(204,255,0,0.6)] rotate-45" />
                      <span className="text-white font-black text-xs tracking-widest uppercase">{f}</span>
                      <Activity className="w-3 h-3 ml-auto text-lime/20 group-hover/item:text-lime transition-colors" />
                    </div>
                  ))}
                </div>

                <button className="w-full py-5 bg-lime text-black hover:bg-white text-[10px] font-black tracking-[0.3em] uppercase rounded-3xl shadow-[0_15px_40px_rgba(204,255,0,0.2)] transition-all flex items-center justify-center gap-3">
                  Upgrade to Elite
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
        .animate-scan-fast {
          animation: scan 2.5s linear infinite;
        }
      `}</style>
    </section>
  );
}
