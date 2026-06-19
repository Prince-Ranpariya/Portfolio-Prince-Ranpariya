'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const STATS = [
  { number: '2+', label: 'Years Experience' },
  { number: '20+', label: 'Projects Delivered' },
  { number: '100%', label: 'Client Satisfaction' },
]

interface CounterProps {
  value: string
  duration?: number
  delay?: number
  trigger: boolean
}

function Counter({ value, duration = 1.2, delay = 0, trigger }: CounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!trigger) return

    const numericMatch = value.match(/\d+/)
    if (!numericMatch) {
      return
    }

    const target = parseInt(numericMatch[0], 10)
    const startTime = Date.now() + delay * 1000

    let animationFrameId: number

    const updateCounter = () => {
      const now = Date.now()
      if (now < startTime) {
        animationFrameId = requestAnimationFrame(updateCounter)
        return
      }

      const elapsed = now - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      
      // Easing out quadratic (starts fast, slows down at the end)
      const easeProgress = progress * (2 - progress)
      
      const current = Math.floor(easeProgress * target)
      setCount(current)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter)
      }
    }

    animationFrameId = requestAnimationFrame(updateCounter)

    return () => cancelAnimationFrame(animationFrameId)
  }, [value, duration, delay, trigger])

  const suffix = value.replace(/\d+/, '')
  
  return <>{count}{suffix}</>
}

export default function HeroStats() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect() // Only trigger once
        }
      },
      { threshold: 0.15 } // Trigger when 15% of the stats component is visible
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="hero-stats"
      ref={containerRef}
      data-theme="light"
      aria-label="Quick stats"
    >
      <div
        className="max-w-[900px] mx-auto px-6 py-8"
        style={{ borderTop: '1px solid var(--border-color)' }}
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-1"
            >
              <span
                className="font-display font-black leading-none"
                style={{
                  fontSize: 'clamp(24px, 3.5vw, 38px)',
                  color: 'var(--text-primary)',
                }}
              >
                <Counter value={stat.number} delay={i * 0.1} trigger={isInView} />
              </span>
              <span
                className="font-body text-xs sm:text-sm"
                style={{ color: 'var(--text-muted)' }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
