'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { STATS } from '@/lib/constants'
import { animateCounter, parseStatNumber } from '@/lib/utils'

export default function StatsStrip() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section
      id="stats"
      ref={ref}
      data-theme="dark"
      className="relative bg-[#0D0D0D] py-12 overflow-hidden"
      style={{ borderTop: '1px solid rgba(0,255,127,0.2)' }}
      aria-label="Statistics"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} shouldStart={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatItem({
  stat, index, shouldStart,
}: {
  stat: typeof STATS[0]; index: number; shouldStart: boolean
}) {
  const [displayNum, setDisplayNum] = useState(0)
  const [suffix, setSuffix] = useState('')
  const target = parseStatNumber(stat.number)

  useEffect(() => {
    if (!shouldStart) return
    const s = stat.number.replace(/[0-9]/g, '')
    setSuffix(s)
    setTimeout(() => {
      animateCounter(0, target, 1500, setDisplayNum)
    }, index * 150)
  }, [shouldStart, index, target, stat.number])

  return (
    <div className="flex flex-col items-center gap-1" role="listitem">
      <div
        className="font-display font-black text-[#F5F5F5] leading-none"
        style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
        aria-label={`${stat.number} ${stat.label} ${stat.sub}`}
      >
        {shouldStart ? `${displayNum}${suffix}` : '0'}
      </div>
      <div className="font-body text-[#888888] text-sm mt-1">{stat.label}</div>
      <div className="font-mono text-[#00FF7F] text-xs font-semibold tracking-wider uppercase">{stat.sub}</div>
    </div>
  )
}
