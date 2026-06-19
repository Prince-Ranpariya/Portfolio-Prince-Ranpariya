'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { WORD_REEL } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

export default function WordReel() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const reelRef = useRef<HTMLDivElement>(null)

  const WORD_HEIGHT = 120 // px per word slot

  useEffect(() => {
    if (!wrapperRef.current || !reelRef.current) return

    const wordElements = reelRef.current.querySelectorAll<HTMLDivElement>('.word-item')
    const totalWords = WORD_REEL.length

    // Create GSAP timeline for scroll pinning and animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top top',
        end: `+=${WORD_HEIGHT * totalWords * 8}`, // scroll distance (~600vh equivalent)
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const focusIndex = progress * (totalWords - 1)
          const activeIndex = Math.round(focusIndex)

          // 1. Update progress dots on the right edge
          const dots = wrapperRef.current?.querySelectorAll('[data-dot]')
          dots?.forEach((dot, idx) => {
            const el = dot as HTMLElement
            if (idx === activeIndex) {
              el.style.backgroundColor = '#00FF7F'
              el.style.width = '8px'
              el.style.height = '8px'
            } else {
              el.style.backgroundColor = '#333333'
              el.style.width = '6px'
              el.style.height = '6px'
            }
          })

          // 2. Update active word classes for CSS transitions
          wordElements.forEach((wordEl, idx) => {
            const el = wordEl as HTMLElement
            el.classList.remove('word-active', 'word-near', 'word-far', 'word-hidden')

            const distance = Math.abs(idx - activeIndex)
            if (distance === 0) el.classList.add('word-active')
            else if (distance === 1) el.classList.add('word-near')
            else if (distance === 2) el.classList.add('word-far')
            else el.classList.add('word-hidden')
          })
        },
      },
    })

    // Move the reel container vertically
    tl.to(reelRef.current, {
      y: -WORD_HEIGHT * (totalWords - 1),
      ease: 'none',
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <section
      id="word-reel"
      ref={wrapperRef}
      data-theme="dark"
      className="relative bg-[#0A0A0A] overflow-hidden"
      style={{ height: '100vh' }}
      aria-label="Shopify specialties"
    >
      {/* Gradient fade top and bottom */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0A0A0A] to-transparent z-10 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10 pointer-events-none" aria-hidden="true" />

      {/* Center highlight line */}
      <div
        className="absolute left-0 right-0 z-20 pointer-events-none"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          height: `${WORD_HEIGHT}px`,
          background: 'linear-gradient(to right, transparent, rgba(0,255,127,0.03), transparent)',
          borderTop: '1px solid rgba(0,255,127,0.1)',
          borderBottom: '1px solid rgba(0,255,127,0.1)',
        }}
        aria-hidden="true"
      />

      {/* Left arrow indicator */}
      <div
        className="absolute left-8 lg:left-16 top-1/2 -translate-y-1/2 z-20 text-white select-none pointer-events-none"
        style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
        aria-hidden="true"
      >
        →
      </div>

      {/* Fixed progress dots at right edge */}
      <div
        className="absolute right-8 lg:right-16 z-20 flex flex-col gap-3"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
        aria-hidden="true"
      >
        {WORD_REEL.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i === 0 ? '#00FF7F' : '#333333',
              width: i === 0 ? '8px' : '6px',
              height: i === 0 ? '8px' : '6px',
            }}
            data-dot={i}
          />
        ))}
      </div>

      {/* Word reel viewport */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={reelRef}
          className="flex flex-col items-center word-reel-container"
          style={{ top: '50%', marginTop: `-${WORD_HEIGHT / 2}px` }}
          role="list"
          aria-label="Skills reel"
        >
          {WORD_REEL.map((word, i) => {
            // Compute initial classes for seamless server render
            const initialClass =
              i === 0
                ? 'word-active'
                : i === 1
                ? 'word-near'
                : i === 2
                ? 'word-far'
                : 'word-hidden'

            return (
              <div
                key={i}
                className={`word-item flex items-center justify-center transition-all duration-500 ease-out ${initialClass}`}
                style={{ height: `${WORD_HEIGHT}px` }}
                role="listitem"
              >
                <span
                  className="font-display font-black text-center select-none"
                  style={{
                    fontSize: 'clamp(52px, 9vw, 108px)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}
                >
                  {word}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
