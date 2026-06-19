'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Clock, Copy, Check, ArrowUpRight, MessageSquare, Send } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useTheme } from '@/components/global/ThemeProvider'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
  { label: 'About', href: '#about', num: '01' },
  { label: 'Work', href: '#projects', num: '02' },
  { label: 'Services', href: '#services', num: '03' },
  { label: 'Contact', href: '#contact', num: '04' },
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const [currentTime, setCurrentTime] = useState('')
  const [copied, setCopied] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const { isDark } = useTheme()

  // India Live Local Clock (GMT+5:30)
  useEffect(() => {
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }
      setCurrentTime(new Date().toLocaleTimeString('en-US', options))
    }
    updateClock()
    const timer = setInterval(updateClock, 1000)
    return () => clearInterval(timer)
  }, [])

  // GSAP Wave Reveal Animation on scroll (ScrollTrigger-controlled)
  useEffect(() => {
    if (!footerRef.current) return
    
    const wavePathEl = document.getElementById('wave-path')
    if (!wavePathEl) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 95%',
          once: true,
        }
      })

      // Morph the SVG clipPath from flat bottom, to wavy middle, to flat top (reveal all)
      tl.to(wavePathEl, {
        attr: { d: 'M 0,1 L 1,1 L 1,0.3 Q 0.5,-0.15 0,0.3 Z' },
        duration: 0.65,
        ease: 'power2.inOut',
      }).to(wavePathEl, {
        attr: { d: 'M 0,1 L 1,1 L 1,0 Q 0.5,0 0,0 Z' },
        duration: 0.55,
        ease: 'power2.out',
      })
    })

    return () => ctx.revert()
  }, [])

  // Copy Email handler
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Smooth scroll back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Mouse move tracker for interactive corner light glow
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!footerRef.current) return
    const rect = footerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <>
      <footer
        id="footer"
        ref={footerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-theme="dark"
        className="bg-[#0A0A0A] border-t border-[#121212] overflow-hidden relative pt-20 pb-6 select-none transition-colors duration-300"
        style={{
          clipPath: 'url(#wave-clip)',
          WebkitClipPath: 'url(#wave-clip)',
        }}
        aria-label="Footer"
      >
        {/* Interactive mouse-tracking radial ambient glow */}
        {isHovered && (
          <div
            style={{
              position: 'absolute',
              left: mousePos.x,
              top: mousePos.y,
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(0, 255, 127, 0.06) 0%, rgba(0, 255, 127, 0) 70%)',
              transform: 'translate(-50%, -50%)',
              borderRadius: '9999px',
              pointerEvents: 'none',
              zIndex: 0,
              filter: 'blur(30px)',
              transition: 'left 0.15s ease-out, top 0.15s ease-out',
            }}
          />
        )}

        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col justify-between h-full relative z-10">
          
          {/* Top Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start mb-20">
            
            {/* Left Block — Availability, Local Clock & Info */}
            <div className="lg:col-span-7 flex flex-col gap-8 max-w-[540px]">
              {/* Status Indicator */}
              <div className="flex flex-col gap-2.5">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-[0.25em]">CURRENT STATUS</span>
                <div className="flex items-center gap-3 bg-neutral-900/50 border border-neutral-800/60 rounded-full px-4 py-2 w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF7F] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF7F]"></span>
                  </span>
                  <span className="font-mono text-[10px] md:text-xs text-neutral-300 tracking-wide font-medium">
                    Available for custom Shopify & React contracts
                  </span>
                </div>
              </div>

              {/* Local Clock */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-[0.25em]">LOCAL ZONE</span>
                <div className="flex items-baseline gap-3">
                  <Clock className="text-[#00FF7F]" size={14} />
                  <span className="font-mono text-base md:text-lg text-white font-medium tracking-tight">
                    Rajkot, IN — {currentTime || '00:00:00 AM'}
                  </span>
                  <span className="font-mono text-[10px] text-neutral-500 tracking-wider">
                    (GMT+5:30)
                  </span>
                </div>
              </div>

              {/* Email copying widget */}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-[0.25em]">START A CONVERSATION</span>
                <div className="flex items-center gap-2 group/email w-fit">
                  <a 
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="font-display font-bold text-xl md:text-2xl text-white group-hover/email:text-[#00FF7F] transition-colors duration-300 cursor-none underline decoration-neutral-800 hover:decoration-[#00FF7F] underline-offset-4"
                  >
                    {SITE_CONFIG.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition-all duration-300 cursor-none relative"
                    aria-label="Copy email to clipboard"
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.6, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Check size={14} className="text-[#00FF7F]" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.6, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Copy size={14} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {/* Tooltip */}
                    {copied && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-900 border border-neutral-800 text-[10px] text-[#00FF7F] font-mono px-2 py-0.5 rounded shadow-xl whitespace-nowrap">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Block — Elegant Minimal Navigation */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-8 w-full">
              <div className="flex flex-col gap-5">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-[0.25em]">NAVIGATION</span>
                <nav aria-label="Footer navigation">
                  <ul className="flex flex-col gap-3.5">
                    {NAV_LINKS.map((link) => (
                      <li key={link.href}>
                        <button
                          onClick={() => {
                            const target = document.getElementById(link.href.replace('#', ''))
                            target?.scrollIntoView({ behavior: 'smooth' })
                          }}
                          className="group flex items-center gap-3 text-left font-body text-sm text-neutral-400 hover:text-white transition-colors duration-300 cursor-none"
                        >
                          <span className="font-mono text-[10px] text-neutral-600 group-hover:text-[#00FF7F] transition-colors duration-300">
                            {link.num}
                          </span>
                          <span className="relative">
                            {link.label}
                            <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#00FF7F] group-hover:w-full transition-all duration-300" />
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="flex flex-col gap-5">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-[0.25em]">SOCIALS</span>
                <ul className="flex flex-col gap-3.5">
                  <li>
                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors duration-300 cursor-none"
                    >
                      <MessageSquare size={13} className="text-neutral-500 group-hover:text-[#00FF7F] transition-colors" />
                      <span>WhatsApp</span>
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-neutral-500" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/prince-ranpariya"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors duration-300 cursor-none"
                    >
                      <Send size={13} className="text-neutral-500 group-hover:text-[#00FF7F] transition-colors" />
                      <span>GitHub</span>
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-neutral-500" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com/in/prince-ranpariya"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors duration-300 cursor-none"
                    >
                      <span className="font-mono text-[10px] text-neutral-500 group-hover:text-[#00FF7F] transition-colors">IN</span>
                      <span>LinkedIn</span>
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-neutral-500" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Giant Kinetic Brand Mark Signature (Serves as Back to Top trigger) */}
          <div className="w-full text-center mb-10 overflow-hidden">
            <motion.h2
              onClick={scrollToTop}
              className={cn(
                "font-display font-black text-[12vw] leading-none tracking-[-0.05em] uppercase transition-all duration-700 ease-out cursor-pointer select-none relative",
                isDark 
                  ? "text-[#121212] hover:text-[#00FF7F] hover:shadow-green-glow-sm" 
                  : "text-neutral-200/50 hover:text-[#00FF7F]"
              )}
              style={{
                lineHeight: 0.85,
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              aria-label="Prince Ranpariya - back to top"
            >
              PRINCE
            </motion.h2>
          </div>

          {/* Fine divider */}
          <div className="w-full h-[1px] bg-neutral-900 mb-8" />

          {/* Bottom copyright metadata row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <span>© {new Date().getFullYear()} Prince Ranpariya.</span>
              <span className="text-neutral-700 hidden sm:inline">|</span>
              <span className="font-mono text-[10px] text-neutral-600 hidden sm:inline">Build Smart. Deploy Fast.</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#about" className="hover:text-white transition-colors cursor-none">Developer</a>
              <a href="#projects" className="hover:text-white transition-colors cursor-none">Portfolio</a>
            </div>
          </div>
        </div>
      </footer>

      {/* SVG clipPath wave definition used for the wave transition reveal */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <clipPath id="wave-clip" clipPathUnits="objectBoundingBox">
            <path id="wave-path" d="M 0,1 L 1,1 L 1,1 Q 0.5,1 0,1 Z" />
          </clipPath>
        </defs>
      </svg>
    </>
  )
}
