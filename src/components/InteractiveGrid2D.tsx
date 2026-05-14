'use client';

import React, { useRef, useEffect } from 'react';

export default function InteractiveGrid2D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const cellSize = 40;

  const gridDataRef = useRef<Float32Array | null>(null);
  const dimensionsRef = useRef({ cols: 0, rows: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const initGrid = (width: number, height: number) => {
      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);
      dimensionsRef.current = { cols, rows };
      gridDataRef.current = new Float32Array(cols * rows);
    };

    const render = () => {
      // Use parent container size or window size
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        initGrid(width, height);
      }

      ctx.clearRect(0, 0, width, height);

      const { cols, rows } = dimensionsRef.current;
      const gridData = gridDataRef.current;

      if (gridData) {
        // Update Mouse Cell
        if (mouseRef.current.x >= 0 && mouseRef.current.y >= 0) {
          const col = Math.floor(mouseRef.current.x / cellSize);
          const row = Math.floor(mouseRef.current.y / cellSize);
          if (col >= 0 && col < cols && row >= 0 && row < rows) {
            gridData[row * cols + col] = 1.0;
          }
        }

        // Draw and Decay
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const index = r * cols + c;
            const intensity = gridData[index];

            if (intensity > 0.005) {
              // Keeping the user's preferred subtle opacity (0.06)
              ctx.fillStyle = `rgba(204, 255, 0, ${intensity * 0.06})`;
              ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
              gridData[index] *= 0.94;
            }
          }
        }
      }

      // Draw Permanent Grid Lines
      ctx.strokeStyle = 'rgba(204, 255, 0, 0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= width; x += cellSize) {
        ctx.moveTo(x, 0); ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += cellSize) {
        ctx.moveTo(0, y); ctx.lineTo(width, y);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Calculate mouse position relative to the canvas
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ maskImage: 'radial-gradient(ellipse at center, black, transparent 95%)' }}
    />
  );
}
