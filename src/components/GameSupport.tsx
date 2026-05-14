'use client';

import { motion } from 'framer-motion';

const GAMES = [
  'LEAGUE OF LEGENDS', 'VALORANT', 'CS:GO 2', 'DOTA 2', 'APEX LEGENDS', 
  'FORTNITE', 'OVERWATCH 2', 'ROCKET LEAGUE', 'MINECRAFT'
];

export default function GameSupport() {
  return (
    <section className="py-24 overflow-hidden border-y border-white/5 bg-black/20">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h2 className="text-sm font-bold tracking-[0.3em] text-gray-500 uppercase mb-4">Supporting Your Favorite Universes</h2>
      </div>
      
      <div className="flex relative">
        <motion.div 
          animate={{ x: [0, -1920] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-12"
        >
          {[...GAMES, ...GAMES].map((game, i) => (
            <span 
              key={i} 
              className="text-4xl md:text-6xl font-black text-white/10 hover:text-lime/40 transition-colors cursor-default"
            >
              {game}
            </span>
          ))}
        </motion.div>
        
        {/* Gradients for smooth fade at edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      </div>
    </section>
  );
}
