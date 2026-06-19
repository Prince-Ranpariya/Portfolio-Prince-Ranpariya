import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Variants } from 'framer-motion'

// ── Tailwind class merger ──────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ── Easing presets ────────────────────────────────────────────
export const easings = {
  spring: [0.16, 1, 0.3, 1] as [number, number, number, number],
  smooth: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  snappy: [0.23, 1, 0.32, 1] as [number, number, number, number],
  lenis: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
}

// ── Shared animation variants ─────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easings.spring },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easings.spring },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easings.spring },
  },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easings.spring },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easings.spring },
  },
}

export const clipWipe: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.8, ease: easings.spring },
  },
}

export const letterStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
}

export const letterVariant: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easings.spring },
  },
}

// ── Counter animation helper ──────────────────────────────────
export function animateCounter(
  from: number,
  to: number,
  duration: number,
  onUpdate: (val: number) => void,
  onComplete?: () => void
) {
  const startTime = performance.now()

  const tick = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    // easeOut cubic
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = Math.round(from + (to - from) * eased)
    onUpdate(current)
    if (progress < 1) {
      requestAnimationFrame(tick)
    } else {
      onComplete?.()
    }
  }

  requestAnimationFrame(tick)
}

// ── Parse stat number (handles "2+", "100%", etc.) ──────────
export function parseStatNumber(stat: string): number {
  return parseInt(stat.replace(/[^0-9]/g, ''), 10) || 0
}

// ── Scroll to section helper ──────────────────────────────────
export function scrollToSection(href: string) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
