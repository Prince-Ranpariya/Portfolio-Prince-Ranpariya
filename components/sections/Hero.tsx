'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/utils'
import TubesCursor from '@/components/global/TubesCursor'
import DownloadCVButton from '@/components/ui/DownloadCVButton'

const FADE_UP = (delay: number) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
})

export default function Hero() {
  const ref = useRef<HTMLElement>(null)

  return (
    <section
      id="hero"
      ref={ref}
      data-theme="light"
      className="hero-grid-bg relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* WebGL Neon Tubes Cursor Effect (Dark theme only) */}
      <TubesCursor />

      {/* Top / bottom gradient fades to blend grid into sections */}
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, var(--bg-primary), transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }}
        aria-hidden="true"
      />

      {/* Main split layout container (padding aligns text at 8-10% from left on desktop) */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 pt-[120px] pb-12 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 min-h-[calc(100vh-120px)]">

        {/* Left Column — Text (55% width on desktop) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full md:w-[55%] flex flex-col items-center md:items-start gap-5 text-center md:text-left"
        >

          {/* LINE 1 — "Hi, I'm [AVATAR] Prince" */}
          <motion.div
            variants={FADE_UP(0.1)}
            className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 leading-none font-display font-black"
            style={{
              fontSize: 'clamp(44px, 6vw, 80px)',
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              lineHeight: 1.05,
            }}
          >
            <span>Hi, I&apos;m</span>

            {/* Avatar inline */}
            <span className="inline-flex items-center self-center" aria-hidden="true">
              <Image
                src="public/images/prince-poster.png"
                alt="Prince Ranpariya"
                width={80}
                height={80}
                priority
                className="rounded-full object-cover object-top"
                style={{
                  width: 'clamp(44px, 5.5vw, 80px)',
                  height: 'clamp(44px, 5.5vw, 80px)',
                  flexShrink: 0,
                  boxShadow: '0 0 0 3px #FF5500, 0 0 24px rgba(255,85,0,0.35)',
                  animation: 'pulse-avatar 3s ease-in-out infinite, float-avatar 4s ease-in-out infinite',
                }}
              />
            </span>

            <span>Prince</span>
          </motion.div>

          {/* LINE 2 — "I'm a Web Developer and" */}
          <motion.div
            variants={FADE_UP(0.2)}
            className="flex flex-wrap items-baseline justify-center md:justify-start gap-x-3 font-display"
            style={{
              fontSize: 'clamp(22px, 3.2vw, 44px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
            }}
          >
            <span
              className="italic"
              style={{ color: 'var(--text-muted)', fontWeight: 400 }}
            >
              I&apos;m a
            </span>
            <span
              className="font-black"
              style={{ color: 'var(--text-primary)' }}
            >
              Web Developer
            </span>
            <span
              className="italic"
              style={{ color: 'var(--text-muted)', fontWeight: 400 }}
            >
              and
            </span>
          </motion.div>

          {/* LINE 3 — "Shopify Expert." + available badge */}
          <motion.div
            variants={FADE_UP(0.3)}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4"
          >
            <span
              className="font-display font-black"
              style={{
                fontSize: 'clamp(22px, 3.2vw, 44px)',
                letterSpacing: '-0.025em',
                color: '#00FF7F',
                lineHeight: 1.1,
              }}
            >
              Shopify Expert.
            </span>

            <span
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'transparent',
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full bg-[#00FF7F] flex-shrink-0 animate-pulse-dot"
                aria-hidden="true"
              />
              <span
                className="font-body text-[13px] font-medium whitespace-nowrap text-secondary"
                style={{ color: 'var(--text-secondary)' }}
              >
                Available for Projects
              </span>
            </span>
          </motion.div>

          {/* LINE 4 — Supporting copy */}
          <motion.p
            variants={FADE_UP(0.42)}
            className="font-body leading-relaxed max-w-[480px]"
            style={{
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              color: 'var(--text-muted)',
              marginTop: '4px',
            }}
          >
            Feel free to explore my work and reach out —<br className="hidden sm:block" />
            I&apos;d love to connect and build something great together.
          </motion.p>

          {/* LINE 5 — CTA Row */}
          <motion.div
            variants={FADE_UP(0.54)}
            className="flex flex-row flex-nowrap items-center justify-center md:justify-start gap-3 md:gap-6 mt-3 w-full"
          >
            <motion.a
              href="#contact"
              className="bg-neutral-950 text-white border border-neutral-800 hover:border-[#00FF7F]/40 hover:shadow-[0_0_20px_rgba(0,255,127,0.15)] rounded-full px-10 py-4 font-display font-semibold text-base inline-flex items-center gap-2 group relative overflow-hidden isolate transition-all duration-300 shadow-lg cursor-none md:px-10 md:py-4 px-7 py-3 text-sm md:text-base"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              aria-label="Go to contact section"
            >
              {/* Subtle background glow sweep */}
              <span className="absolute inset-0 bg-gradient-to-r from-[#00FF7F]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />

              {/* Sliding Mail Icon */}
              <span className="absolute left-7 top-1/2 -translate-y-1/2 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10 text-white pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </span>

              {/* Text Label */}
              <span className="relative z-10 text-white transition-transform duration-300 ease-out group-hover:translate-x-3 pointer-events-none">
                Contact Me
              </span>
            </motion.a>

            <DownloadCVButton />
          </motion.div>
        </motion.div>

        {/* Right Column — Poster Image (40-45% width on desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -8, 0]
          }}
          transition={{ 
            opacity: { duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
            y: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="w-full md:w-[42%] flex items-center justify-center relative z-10"
        >
          <div
            className="relative w-full max-w-[400px] md:max-w-[450px] rounded-[24px] overflow-hidden shadow-2xl border"
            style={{
              borderColor: 'var(--border-color)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 20%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%)',
            }}
          >
            <Image
              src="public/images/prince-poster.jpg"
              alt="Prince Ranpariya - Shopify Web Developer"
              width={901}
              height={1599}
              priority
              className="w-full h-auto block"
              sizes="(max-w-768px) 100vw, 42vw"
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
