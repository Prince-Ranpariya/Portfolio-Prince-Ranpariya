'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ROW1_TESTIMONIALS = [
  {
    id: 1,
    name: 'Yogesh Varsani',
    handle: '@yogesh_aura',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80',
    quote: 'Prince understood our brand vision clearly and delivered a clean, premium Shopify website. Great attention to detail and smooth communication.',
  },
  {
    id: 2,
    name: 'Amara Vance',
    handle: '@amara_vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80',
    quote: 'The speed optimization Prince did for our Shopify theme is insane. Our conversion rate increased by 22% in the first week. Highly recommend!',
  },
  {
    id: 3,
    name: 'Nikhil Vadi',
    handle: '@nikhil_vadi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80',
    quote: 'Excellent experience working with Prince. The website perfectly matches our brand identity and feels conversion-focused. He knows Shopify well.',
  },
  {
    id: 4,
    name: 'Liam Carter',
    handle: '@liam_carter',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80',
    quote: 'Rebuilding our store from scratch was a breeze with Prince. He knows Shopify inside out and delivered way ahead of schedule.',
  },
]

const ROW2_TESTIMONIALS = [
  {
    id: 5,
    name: 'Jordan Lee',
    handle: '@jordan_devon',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&q=80',
    quote: 'Radiant made undercutting all of our competitors an absolute breeze. Fast execution and beautiful theme customisations.',
  },
  {
    id: 6,
    name: 'Salman Baleli',
    handle: '@salman_stellar',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&q=80',
    quote: 'Prince builds websites with a business mindset. Clean design, fast performance, and no unnecessary complexity. Highly recommended.',
  },
  {
    id: 7,
    name: 'Briar Martin',
    handle: '@briar_martin',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80',
    quote: 'Prince is a rare gem in e-commerce. Fast, communicative, and code quality is top-notch. Our store bounce rate dropped significantly.',
  },
  {
    id: 8,
    name: 'Sarah Connor',
    handle: '@sarah_connor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80',
    quote: 'Superb design execution. Set up our custom Shopify subscription flows cleanly. Easy to work with throughout.',
  },
]

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
  const [isHovered1, setIsHovered1] = useState(false)
  const [isHovered2, setIsHovered2] = useState(false)

  // Double list to create infinite marquee track loop
  const row1Items = [...ROW1_TESTIMONIALS, ...ROW1_TESTIMONIALS]
  const row2Items = [...ROW2_TESTIMONIALS, ...ROW2_TESTIMONIALS]

  useEffect(() => {
    const container = row1Ref.current
    if (!container || isHovered1) return

    let animationFrameId: number
    const speed = 0.65 // continuous speed pixels/frame

    const scroll = () => {
      // Row 1 slides left-to-right (visually: content moves right)
      container.scrollLeft -= speed
      if (container.scrollLeft <= 0) {
        container.scrollLeft = container.scrollWidth / 2
      }
      animationFrameId = requestAnimationFrame(scroll)
    }

    // Set initial scroll position to middle of duplicate list to scroll backward smoothly
    if (container.scrollLeft === 0) {
      container.scrollLeft = container.scrollWidth / 2
    }

    animationFrameId = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isHovered1])

  useEffect(() => {
    const container = row2Ref.current
    if (!container || isHovered2) return

    let animationFrameId: number
    const speed = 0.65 // continuous speed pixels/frame

    const scroll = () => {
      // Row 2 slides right-to-left (visually: content moves left)
      container.scrollLeft += speed
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0
      }
      animationFrameId = requestAnimationFrame(scroll)
    }

    animationFrameId = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isHovered2])

  const handleChevronClick = (direction: 'left' | 'right') => {
    const scrollAmount = 364 // card width (340px) + gap (24px)
    if (row1Ref.current) {
      row1Ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
    if (row2Ref.current) {
      row2Ref.current.scrollBy({
        left: direction === 'left' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section
      id="testimonials"
      ref={ref}
      data-theme="light"
      className="py-24 lg:py-32 overflow-hidden relative"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      aria-label="Client testimonials"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="eyebrow mb-3"
            style={{ color: 'var(--text-muted)' }}
          >
            OUR REVIEWS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display font-black leading-tight"
            style={{
              fontSize: 'clamp(36px, 5.5vw, 72px)',
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
            }}
          >
            What Our{' '}
            <span className="italic font-bold" style={{ color: 'var(--text-muted)' }}>
              Shopify
            </span>{' '}
            Clients Say
          </motion.h2>
        </div>

        <motion.a
          href="mailto:princeranpariya00@gmail.com?subject=Review for Prince Ranpariya"
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="btn-outline-dark flex-shrink-0 cursor-none"
          whileHover={{ scale: 1.02 }}
          aria-label="Write a review for Prince Ranpariya"
        >
          Write a Review
        </motion.a>
      </div>

      {/* Marquee slider container with chevrons */}
      <div className="relative w-full py-4 select-none px-4 md:px-12">
        {/* Left/Right blur edge overlays to fade items in and out */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[var(--bg-primary)] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[var(--bg-primary)] to-transparent pointer-events-none z-10" />

        {/* Left Chevron Button */}
        <button
          onClick={() => handleChevronClick('left')}
          className="absolute left-6 md:left-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/90 dark:bg-white/90 text-white dark:text-black border border-neutral-800 dark:border-neutral-200 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-none shadow-md"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Chevron Button */}
        <button
          onClick={() => handleChevronClick('right')}
          className="absolute right-6 md:right-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/90 dark:bg-white/90 text-white dark:text-black border border-neutral-800 dark:border-neutral-200 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-none shadow-md"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Row 1 (Continuous scroll from left to right) */}
        <div
          ref={row1Ref}
          onMouseEnter={() => setIsHovered1(true)}
          onMouseLeave={() => setIsHovered1(false)}
          className="flex overflow-x-auto scrollbar-none gap-6 mb-6 pb-2 scroll-smooth cursor-none"
        >
          {row1Items.map((t, idx) => (
            <TestimonialCard key={`row1-${t.id}-${idx}`} testimonial={t} />
          ))}
        </div>

        {/* Row 2 (Continuous scroll in opposite direction) */}
        <div
          ref={row2Ref}
          onMouseEnter={() => setIsHovered2(true)}
          onMouseLeave={() => setIsHovered2(false)}
          className="flex overflow-x-auto scrollbar-none gap-6 pb-2 scroll-smooth cursor-none"
        >
          {row2Items.map((t, idx) => (
            <TestimonialCard key={`row2-${t.id}-${idx}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <div className="flex-shrink-0 w-[340px] rounded-[28px] p-6 border transition-all duration-300 bg-neutral-50 dark:bg-[#161616] border-neutral-200 dark:border-[#1E1E1E] shadow-sm select-none hover:shadow-md hover:border-[#00FF7F] dark:hover:border-[#00FF7F]">
      <div className="flex items-center gap-3 mb-4">
        {/* Avatar */}
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
          loading="lazy"
        />
        {/* Author info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-bold text-[15px] text-[#0A0A0A] dark:text-[#F5F5F5] leading-none">
              {testimonial.name}
            </span>
            {/* Verified Badge */}
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#1DA1F2] text-white flex-shrink-0">
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </span>
          </div>
          <span className="font-body text-xs text-neutral-500 dark:text-[#AAAAAA] mt-1">
            {testimonial.handle}
          </span>
        </div>
      </div>

      {/* Quote */}
      <p className="font-body text-[14px] leading-relaxed text-[#555555] dark:text-[#CCCCCC]">
        {testimonial.quote}
      </p>
    </div>
  )
}
