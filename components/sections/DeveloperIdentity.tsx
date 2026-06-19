'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { FILE_TREE } from '@/lib/constants'

function useTypewriter(lines: typeof FILE_TREE, shouldStart: boolean) {
  const [revealed, setRevealed] = useState(0)

  useEffect(() => {
    if (!shouldStart || revealed >= lines.length) return
    const t = setTimeout(() => setRevealed((r) => r + 1), 120)
    return () => clearTimeout(t)
  }, [shouldStart, revealed, lines.length])

  return revealed
}

export default function DeveloperIdentity() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const revealed = useTypewriter(FILE_TREE, inView)

  const CHECKLIST = [
    'Shopify Store Setup',
    'Theme Customization',
    'Liquid Development',
    'App Integration',
    'Performance Optimization',
    'SEO & Speed',
    'Maintenance & Support',
  ]

  return (
    <section
      id="developer-identity"
      ref={ref}
      data-theme="dark"
      className="relative bg-[#0A0A0A] py-20 lg:py-28 overflow-hidden"
      aria-label="Developer identity section"
    >
      {/* Subtle green radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,255,127,0.05) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── LEFT — File tree terminal ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="terminal-card"
            aria-label="File tree"
          >
            <div className="terminal-header">
              <span className="terminal-dot bg-[#FF5F57]" />
              <span className="terminal-dot bg-[#FEBC2E]" />
              <span className="terminal-dot bg-[#28C840]" />
              <span className="font-mono text-[#00FF7F] text-[10px] ml-2 tracking-wider">CTRL + DEPLOY</span>
            </div>
            <div className="p-5 font-mono text-[12px] leading-7 min-h-[280px]" aria-live="polite">
              {FILE_TREE.slice(0, revealed).map((line, i) => (
                <div key={i}>
                  <span className={line.active ? 'text-[#00FF7F] font-semibold' : 'text-[#888888]'}>
                    {line.name}
                  </span>
                </div>
              ))}
              {revealed < FILE_TREE.length && (
                <span className="text-[#00FF7F] animate-blink">▌</span>
              )}
            </div>
          </motion.div>

          {/* ── CENTER — Developer photo with poster ──────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center"
          >
            {/* Poster / developer photo */}
            <div className="relative w-full max-w-[320px] lg:max-w-full rounded-[24px] overflow-hidden">
              <img
                src="https://prince-ranpariya.github.io/Portfolio-Prince-Ranpariya/WhatsApp%20Image%202025-12-19%20at%204.37.43%20PM.jpeg"
                alt="Prince Ranpariya — Shopify Expert poster"
                className="w-full object-cover"
                style={{ filter: 'grayscale(30%)', minHeight: '380px', objectFit: 'cover', objectPosition: 'top' }}
              />
              {/* Blue gradient overlay from bottom */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,119,255,0.35) 0%, transparent 50%)' }}
                aria-hidden="true"
              />
            </div>

            {/* Floating badge — 100% Dedication */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: -8 } : {}}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="absolute top-4 right-2 lg:-right-4"
              aria-hidden="true"
            >
              <span className="inline-block px-3 py-2 rounded-full bg-[#00FF7F] text-[#0A0A0A] font-mono font-black text-[10px] tracking-wider uppercase shadow-green-glow-sm">
                ✦ 100% DEDICATION
              </span>
            </motion.div>

            {/* Floating Shopify icon */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, type: 'spring' }}
              className="absolute top-4 -left-2 lg:-left-6 terminal-card p-3 flex items-center gap-2 animate-spin-slow origin-center"
              style={{ animationDuration: '20s' }}
              aria-hidden="true"
            >
              <div className="w-8 h-8 rounded-lg bg-[#00FF7F]/10 flex items-center justify-center">
                <span className="text-[#00FF7F] text-lg">🛍</span>
              </div>
            </motion.div>

            {/* </> Code floating card */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ delay: 0.7, type: 'spring' }}
              className="absolute bottom-8 -left-2 lg:-left-6 terminal-card px-4 py-2.5 flex items-center gap-2"
              aria-hidden="true"
            >
              <span className="font-mono text-[#00FF7F] font-bold">&lt;/&gt;</span>
              <span className="font-mono text-[#888] text-xs">Code</span>
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Terminal checklist ────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="terminal-card"
            aria-label="What I do"
          >
            <div className="terminal-header">
              <span className="terminal-dot bg-[#FF5F57]" />
              <span className="terminal-dot bg-[#FEBC2E]" />
              <span className="terminal-dot bg-[#28C840]" />
              <span className="font-mono text-[#00FF7F] text-[10px] ml-2 tracking-wider">CTRL + DEPLOY</span>
            </div>
            <div className="p-5 font-mono text-[12px] leading-6">
              <p className="text-[#F5F5F5] text-sm mb-1">Clean Code.</p>
              <p className="text-[#F5F5F5] text-sm mb-1">Smart Solutions.</p>
              <p className="text-[#F5F5F5] text-sm mb-4">Seamless Stores.</p>
              <div className="border-t border-[#1E1E1E] pt-4 mb-4">
                <p className="text-[#888888] text-xs mb-3">I build Shopify stores that not only look great but sell more.</p>
                <p className="text-[#00FF7F] font-bold">Build Smart.</p>
                <p className="text-[#00FF7F] font-bold">Customize Better.</p>
                <p className="text-[#00FF7F] font-bold mb-4">Grow Together.</p>
              </div>
              <div className="border-t border-[#1E1E1E] pt-4">
                <p className="text-[#888888] text-[10px] uppercase tracking-widest mb-3">WHAT I DO:</p>
                {CHECKLIST.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-2 mb-2"
                  >
                    <span className="text-[#00FF7F] text-[10px]">✅</span>
                    <span className="text-[#888888]">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────── */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: WhatsApp */}
          <a
            href="https://wa.me/916353898827"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 rounded-2xl backdrop-blur-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 via-zinc-900/60 to-zinc-950/80 shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/50 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-98 transition-all duration-500 ease-out overflow-hidden flex items-center justify-between gap-4 cursor-pointer"
            aria-label="Contact Prince Ranpariya on WhatsApp"
          >
            {/* Glassy Shine Slider Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
            
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 via-emerald-500/10 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 flex items-center gap-4 min-w-0">
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 group-hover:from-emerald-500/20 group-hover:to-emerald-500/10 text-[#00FF7F] group-hover:text-emerald-300 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 border border-emerald-500/10 group-hover:border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-current transition-transform duration-300 group-hover:scale-110"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.488 2.01 14.07 1.01 11.458 1.01c-5.44 0-9.866 4.372-9.87 9.802 0 1.763.486 3.486 1.41 5.005l-.997 3.637 3.737-.971zm11.233-6.52c-.3-.149-1.772-.864-2.046-.964-.275-.1-.475-.149-.675.15-.2.298-.773.964-.948 1.162-.175.199-.35.223-.65.075-.3-.15-1.264-.46-2.408-1.47-.89-.785-1.492-1.753-1.667-2.052-.175-.299-.019-.461.13-.61.135-.133.3-.349.45-.523.15-.174.2-.298.3-.497.1-.2.05-.374-.025-.524-.075-.15-.675-1.602-.925-2.195-.243-.584-.489-.505-.675-.515-.175-.01-.375-.01-.575-.01s-.525.075-.8.374c-.275.299-1.05 1.016-1.05 2.479 0 1.462 1.075 2.872 1.225 3.071.15.199 2.115 3.2 5.125 4.489.715.307 1.273.49 1.708.627.718.226 1.37.194 1.887.118.577-.085 1.772-.715 2.022-1.406.25-.69.25-1.284.175-1.406-.075-.124-.275-.199-.575-.349z" />
                </svg>
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-display font-bold text-white text-base leading-snug tracking-wide group-hover:text-emerald-300 transition-colors duration-300">
                  Let's Build
                </p>
                <p className="font-display text-xs text-[#888888] group-hover:text-emerald-100/70 transition-colors duration-300 mt-0.5 truncate">
                  Something Amazing
                </p>
                <span className="font-mono text-[10px] text-[#00FF7F] group-hover:text-emerald-400 font-medium block mt-1 transition-colors duration-300">
                  WhatsApp: +91 6353898827
                </span>
              </div>
            </div>
            <div className="text-emerald-500/40 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </a>

          {/* Card 2: Shopify Ideas */}
          <a
            href="#contact"
            className="group relative p-6 rounded-2xl backdrop-blur-xl border border-violet-500/20 bg-gradient-to-br from-violet-950/20 via-zinc-900/60 to-zinc-950/80 shadow-2xl hover:shadow-violet-500/10 hover:border-violet-500/50 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-98 transition-all duration-500 ease-out overflow-hidden flex items-center justify-between gap-4 cursor-pointer"
            aria-label="Submit a Shopify store idea"
          >
            {/* Glassy Shine Slider Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-400/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
            
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/5 via-violet-500/10 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 flex items-center gap-4 min-w-0">
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-violet-500/10 to-violet-600/5 group-hover:from-violet-500/20 group-hover:to-violet-500/10 text-violet-400 group-hover:text-violet-300 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 border border-violet-500/10 group-hover:border-violet-500/30 flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-current transition-transform duration-300 group-hover:scale-110"
                >
                  <path d="M19.23 7.02c-.15-.22-.38-.36-.64-.4h-2.12c-.14-2.18-1.74-3.95-3.97-3.95s-3.83 1.77-3.97 3.95H6.41c-.26.04-.49.18-.64.4L1.08 13.56c-.1.15-.15.32-.15.5 0 .04.01.07.01.11L2.3 22.04c.12.82.83 1.43 1.66 1.43h16.08c.83 0 1.54-.61 1.66-1.43l1.36-7.87c0-.04.01-.07.01-.11 0-.18-.05-.35-.15-.5L19.23 7.02zm-6.73-2.37c1.15 0 2 .95 2.08 2.22H9.42c.08-1.27.93-2.22 2.08-2.22zM4.33 21.47l-1-5.75h17.34l-1-5.75H4.33zm16.14-7.75H3.53l3-4.32h10.94l3 4.32z" />
                </svg>
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-display font-bold text-white text-base leading-snug tracking-wide group-hover:text-violet-300 transition-colors duration-300">
                  Shopify Store Idea?
                </p>
                <p className="font-display text-xs text-[#888888] group-hover:text-violet-100/70 transition-colors duration-300 mt-0.5 truncate">
                  Let's turn your ideas into a
                </p>
                <span className="font-mono text-[10px] text-violet-400 group-hover:text-violet-300 font-medium block mt-1 transition-colors duration-300 truncate">
                  powerful Shopify store
                </span>
              </div>
            </div>
            <div className="text-violet-500/40 group-hover:text-violet-400 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </a>

          {/* Card 3: Freelance Projects */}
          <a
            href="https://theboxux.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 rounded-2xl backdrop-blur-xl border border-amber-500/20 bg-gradient-to-br from-amber-950/20 via-zinc-900/60 to-zinc-950/80 shadow-2xl hover:shadow-amber-500/10 hover:border-amber-500/50 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-98 transition-all duration-500 ease-out overflow-hidden flex items-center justify-between gap-4 cursor-pointer"
            aria-label="Visit the boxux.studio website"
          >
            {/* Glassy Shine Slider Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
            
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 flex items-center gap-4 min-w-0">
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 group-hover:from-amber-500/20 group-hover:to-amber-500/10 text-amber-400 group-hover:text-amber-300 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 border border-amber-500/10 group-hover:border-amber-500/30 flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="2" y1="20" x2="22" y2="20" />
                  <line x1="12" y1="17" x2="12" y2="20" />
                </svg>
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-display font-bold text-white text-base leading-snug tracking-wide group-hover:text-amber-300 transition-colors duration-300">
                  Available for
                </p>
                <p className="font-display text-xs text-[#888888] group-hover:text-amber-100/70 transition-colors duration-300 mt-0.5 truncate">
                  Freelance Projects
                </p>
                <span className="font-mono text-[10px] text-amber-400 group-hover:text-amber-300 font-medium block mt-1 transition-colors duration-300 truncate">
                  the boxux.studio
                </span>
              </div>
            </div>
            <div className="text-amber-500/40 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
