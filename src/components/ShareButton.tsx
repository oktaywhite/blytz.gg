'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Share2, Copy, Check, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ShareButtonProps {
  username: string
}

export default function ShareButton({ username }: ShareButtonProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const profileUrl = `https://blytz.lol/${username}`

  // Ensure portal only renders client-side
  useEffect(() => setMounted(true), [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const el = document.createElement('textarea')
      el.value = profileUrl
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])



  const modal = (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
          />

          {/* Modal centered on full screen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center z-[9999] px-4"
          >
            <div
              ref={modalRef}
              className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 relative"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-lime-500/60 to-transparent" />

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Profili Paylaş</h2>
                  <p className="text-zinc-500 text-sm mt-0.5">@{username}</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Copy Link */}
              <div className="mb-6">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Profil Linki</p>
                <button
                  onClick={handleCopy}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-black/50 border border-zinc-800 hover:border-lime-500/50 rounded-xl group transition-all duration-200"
                >
                  <span className="text-zinc-300 text-sm font-mono truncate group-hover:text-white transition-colors">
                    {profileUrl}
                  </span>
                  <div className="shrink-0 text-zinc-500 group-hover:text-lime-400 transition-colors">
                    {copied ? (
                      <Check className="w-4 h-4 text-lime-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </div>
                </button>
                {copied && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lime-400 text-xs mt-2 ml-1"
                  >
                    ✓ Link kopyalandı!
                  </motion.p>
                )}
              </div>


            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white"
        title="Profili Paylaş"
      >
        <Share2 className="w-5 h-5" />
      </button>

      {/* Portal — renders directly to document.body, outside all overflow:hidden parents */}
      {mounted && createPortal(modal, document.body)}
    </>
  )
}
