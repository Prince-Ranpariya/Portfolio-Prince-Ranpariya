'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Zap, ArrowRight } from 'lucide-react'
import { animateCounter } from '@/lib/utils'

// ── Updated skill tags ────────────────────────────────────
const SKILL_TAGS = [
  'SHOPIFY',
  'CUSTOM SECTIONS',
  'PREMIUM DESIGN',
  'RESPONSIVE',
  'SEO OPTIMISED',
  'PREMIUM VISUALS',
]

function AnimatedCount({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) animateCounter(0, target, 1200, setCount)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function BentoAbout() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  const cellVariant = (delay: number) => ({
    hidden: { opacity: 0, scale: 0.96, y: 20 },
    visible: {
      opacity: 1, scale: 1, y: 0,
      transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  })

  return (
    <section
      id="about"
      ref={ref}
      data-theme="light"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-page)' }}
      aria-label="About Prince Ranpariya"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-10"
        >
          <p className="eyebrow text-[#00CC60] mb-3">ABOUT ME</p>
          <h2 className="section-heading font-display" style={{ color: 'var(--text-primary)' }}>
            The Developer<br />Behind the Code.
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Cell A — Main focus (spans 2 cols) */}
          <motion.div
            variants={cellVariant(0.1)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-2 rounded-[20px] p-8 flex flex-col gap-4 border card-hover"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            <p className="eyebrow" style={{ color: 'var(--text-muted)' }}>FOCUS</p>
            <h3 className="font-display font-bold text-2xl leading-tight" style={{ color: 'var(--text-primary)' }}>
              Shopify Web Development
            </h3>
            <p className="font-body text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Crafting e-commerce stores that blend aesthetics with sales performance.
              From pixel-perfect themes to blazing-fast page speeds — every project is built to convert.
            </p>
            {/* Mini project previews */}
            <div className="flex gap-3 mt-2">
              {[
                'https://prince-ranpariya.github.io/Portfolio-Prince-Ranpariya/PC%20%20.HERO%20BANNER.jpg',
                'https://prince-ranpariya.github.io/Portfolio-Prince-Ranpariya/Screenshot%202026-05-10%20113256.png',
              ].map((src, i) => (
                <div key={i} className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border" style={{ borderColor: 'var(--border-color)' }}>
                  <img src={src} alt="" className="w-full h-full object-cover" aria-hidden="true" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cell B — Skill tags (UPDATED) */}
          <motion.div
            variants={cellVariant(0.18)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="rounded-[20px] p-8 flex flex-col gap-4 border"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            <p className="eyebrow" style={{ color: 'var(--text-muted)' }}>STACK</p>
            <div className="flex flex-wrap gap-2">
              {SKILL_TAGS.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 12px rgba(0,255,127,0.2)' }}
                  className="px-3 py-1.5 rounded-full font-mono text-[11px] font-semibold tracking-wide transition-all duration-200"
                  style={{
                    background: 'var(--bg-page)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Cell C — CTA (dark) */}
          <motion.div
            variants={cellVariant(0.22)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="bento-cta-dark rounded-[20px] p-8 flex flex-col justify-between group transition-all duration-300"
            style={{ backgroundColor: '#0A0A0A' }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            role="button"
            tabIndex={0}
            aria-label="Navigate to contact section"
            onKeyDown={(e) => { if (e.key === 'Enter') document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            <motion.div
              className="w-12 h-12 flex items-center justify-center"
              whileHover={{ x: 6 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <ArrowRight size={32} className="text-white group-hover:text-[#0A0A0A] transition-colors" />
            </motion.div>
            <h3 className="font-display font-bold text-2xl leading-tight transition-colors"
              style={{ color: 'inherit' }}
            >
              <span className="text-white group-hover:text-[#0A0A0A] transition-colors">
                Let&apos;s Work Together
              </span>
            </h3>

            <style>{`
              .bento-cta-dark:hover { background-color: #00FF7F !important; }
            `}</style>
          </motion.div>

          {/* Cell D — Experience counter */}
          <motion.div
            variants={cellVariant(0.28)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="rounded-[20px] p-8 flex flex-col justify-center items-center text-center border"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            <div className="font-display font-black leading-none" style={{ fontSize: '72px', color: 'var(--text-primary)' }}>
              <AnimatedCount target={2} suffix="+" />
            </div>
            <p className="font-body text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>Years of Experience</p>
          </motion.div>

          {/* Cell E — Location */}
          <motion.div
            variants={cellVariant(0.34)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="rounded-[20px] p-8 flex flex-col justify-center gap-3 border"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00FF7F] animate-pulse-dot flex-shrink-0" />
              <span className="font-display font-semibold text-xl" style={{ color: 'var(--text-primary)' }}>
                Based in Rajkot, India
              </span>
            </div>
            <p className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>
              Available for global remote work
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin size={14} style={{ color: 'var(--text-muted)' }} />
              <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>Gujarat, India · GMT+5:30</span>
            </div>
          </motion.div>

          {/* Cell F — Performance bar */}
          <motion.div
            variants={cellVariant(0.38)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="sm:col-span-2 lg:col-span-2 rounded-[20px] p-8 flex flex-col gap-4 border card-hover"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            <p className="eyebrow" style={{ color: 'var(--text-muted)' }}>PERFORMANCE</p>
            <div className="flex items-end justify-between">
              <h3 className="font-display font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>Optimized for Speed</h3>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-[#00FF7F]" />
                <span className="font-mono text-[#00CC60] text-sm font-semibold">97 Lighthouse</span>
              </div>
            </div>
            <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
              <motion.div
                className="h-full bg-[#00FF7F] rounded-full"
                initial={{ width: '0%' }}
                animate={inView ? { width: '97%' } : { width: '0%' }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <p className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>Sub-2s page loads, 97+ Core Web Vitals score</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
