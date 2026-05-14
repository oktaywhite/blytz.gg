'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export default function MouseTrail() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    setMounted(true);
    
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(isClickable);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Dynamic Glow Aura - Lime */}
      <motion.div
        className="absolute top-0 left-0 w-32 h-32 bg-lime/10 rounded-full blur-[50px]"
        animate={{ scale: isHovering ? 1.15 : 1 }}
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      
      {/* Dynamic Glow Aura - Magenta */}
      <motion.div
        className="absolute top-0 left-0 w-16 h-16 bg-magenta/5 rounded-full blur-[30px]"
        animate={{ scale: isHovering ? 1.25 : 1 }}
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Main Cursor Dot */}
      <motion.div
        className="absolute top-0 left-0 w-1.5 h-1.5 bg-white rounded-full z-10 shadow-[0_0_10px_#CCFF00]"
        animate={{ scale: isHovering ? 1.5 : 1 }}
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </div>
  );
}
