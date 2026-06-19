'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const LINES = [
  { text: "I'm a Shopify developer who", green: false },
  { text: 'partners with founders', green: true },
  { text: 'to turn ideas into', green: false },
  { text: 'real products.', green: true },
  { text: 'I focus on clean code,', green: false },
  { text: 'fast execution, and', green: false },
  { text: 'stores that sell.', green: false },
]

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <section
      id="manifesto"
      ref={ref}
      data-theme="light"
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-page)' }}
      aria-label="Manifesto statement"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Large editorial statement */}
        <div
          className="font-display font-black leading-[1.05] mb-16"
          style={{
            fontSize: 'clamp(36px, 6vw, 86px)',
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
          }}
          role="blockquote"
        >
          {LINES.map((line, i) => (
            <motion.div
              key={i}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={{
                hidden: { clipPath: 'inset(0 100% 0 0)' },
                visible: {
                  clipPath: 'inset(0 0% 0 0)',
                  transition: {
                    duration: 0.8,
                    delay: i * 0.15,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  },
                },
              }}
            >
              <span style={{ color: line.green ? '#00FF7F' : 'var(--text-primary)' }}>
                {line.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Secondary text + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8"
        >
          <p
            className="font-body text-base lg:text-lg leading-relaxed max-w-[560px]"
            style={{ color: 'var(--text-secondary)' }}
          >
            Bringing your Shopify vision to life quickly and efficiently—
            whether it&apos;s a new store, custom theme, or full rebuild.
          </p>
          <motion.a
            href="#projects"
            className="group btn-badge flex-shrink-0 cursor-none"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {/* Subtle shiny background gradient sweep */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent-glow)] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-0" />
            
            {/* Content container */}
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-0.5">
              See My Work
            </span>

            {/* Circular badge arrow */}
            <span className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full border border-[var(--border-color)] group-hover:border-[#00FF7F] group-hover:bg-[#00FF7F] group-hover:text-black transition-all duration-300 shadow-sm group-hover:shadow-[0_0_12px_rgba(0,255,127,0.5)]">
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
