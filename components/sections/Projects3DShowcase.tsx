'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'

// Projects data loaded with local images
const PROJECTS_DATA = [
  {
    id: 1,
    title: 'Sephani Nightwear',
    handle: 'sephani_nightwear',
    image: 'https://raw.githubusercontent.com/Prince-Ranpariya/Portfolio-Prince-Ranpariya/refs/heads/main/public/images/sephani.jpg',
    tags: ['Custom Theme', 'Liquid', 'SEO'],
    description: 'Premium nightwear storefront built on custom Shopify Liquid architecture. Engineered for high conversion rates, responsive styling, and custom section customizer setups.',
    url: 'https://www.sephani.co.in/',
  },
  {
    id: 2,
    title: 'Glissberry Store',
    handle: 'https://raw.githubusercontent.com/Prince-Ranpariya/Portfolio-Prince-Ranpariya/refs/heads/main/public/images/glissberry.png',
    image: '/images/glissberry.png',
    tags: ['E-commerce', 'App Integration', 'GraphQL'],
    description: 'A multi-variant e-commerce marketplace featuring deep app integrations, advanced inventory synchronization, and custom product configuration features.',
    url: 'https://glissberry.com/',
  },
  {
    id: 3,
    title: 'Tropic Skincare',
    handle: 'tropic_skincare',
    image: 'https://raw.githubusercontent.com/Prince-Ranpariya/Portfolio-Prince-Ranpariya/refs/heads/main/public/images/tropic-skincare.png',
    tags: ['Subscription', 'Tailwind', 'UX Optimization'],
    description: 'A premium skincare brand layout focused on recurring subscription models and custom checkout integrations. Deployed automated post-purchase email and analytics scripts.',
    url: 'https://tropicskincare.com',
  },
  {
    id: 4,
    title: 'Wooden Bazar',
    handle: 'wooden_bazar',
    image: 'https://raw.githubusercontent.com/Prince-Ranpariya/Portfolio-Prince-Ranpariya/refs/heads/main/public/images/wooden-bazar.jpg,
    tags: ['Theme Setup', 'AR Integration', 'UX Design'],
    description: 'Furniture storefront integrating 3D product view models and WebXR Augmented Reality tools, allowing clients to preview wood finishes and dimensions live in their rooms.',
    url: 'https://woodenbazar.com/',
  },
  {
    id: 5,
    title: 'Spall Sport',
    handle: 'spall_sport',
    image: 'https://raw.githubusercontent.com/Prince-Ranpariya/Portfolio-Prince-Ranpariya/refs/heads/main/public/images/spall-sport.png',
    tags: ['Mobile UX', 'Theme Setup', 'Speed'],
    description: 'A custom, performance-optimized athletic apparel storefront focusing on mobile-first navigation and smooth checkout layouts.',
    url: 'https://spallsport.co/',
  },
  {
    id: 6,
    title: 'Stellarisme Jewellery',
    handle: 'stellarisme_jewellery',
    image: 'https://raw.githubusercontent.com/Prince-Ranpariya/Portfolio-Prince-Ranpariya/refs/heads/main/public/images/stellarisme-jewellery.png',
    tags: ['Luxury UX', 'Custom Sections', 'Animations'],
    description: 'E-commerce platform designed for a high-end luxury jewellery brand, offering custom typography, responsive design, and smooth scroll effects.',
    url: 'https://www.stellarisme.com',
  },
]

export default function Projects3DShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const lastWheelTime = useRef(0)

  // Mouse wheel scroll to slide project index
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now()
    if (now - lastWheelTime.current < 700) return
    lastWheelTime.current = now

    if (e.deltaY > 0) {
      setActiveIndex((prev) => (prev + 1) % PROJECTS_DATA.length)
    } else if (e.deltaY < 0) {
      setActiveIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length)
    }
  }

  // Stack swiper index helper
  const getStackPosition = (idx: number) => {
    const length = PROJECTS_DATA.length
    return (idx - activeIndex + length) % length
  }

  return (
    <section
      id="projects"
      className="relative py-24 lg:py-32 overflow-hidden select-none transition-colors duration-350 ease-out"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      aria-label="Interactive Projects Showcase"
    >
      {/* Background space glow highlights */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00FF7F]/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Header */}
        <div className="mb-14 text-center md:text-left">
          <p className="eyebrow text-[#00FF7F] mb-3">SELECTED WORK</p>
          <h2 className="font-display font-black leading-tight text-[var(--text-primary)] text-5xl md:text-7xl tracking-tight">
            Featured
            <br />
            <span className="italic font-bold text-[var(--text-secondary)]">Projects Showcase</span>
          </h2>
        </div>

        {/* Horizontal Accordion Layout (Hidden on Mobile) */}
        <div 
          className="hidden md:flex flex-row w-full h-[520px] gap-3 relative px-4"
          onWheel={handleWheel}
        >
          {/* Previous Arrow Button */}
          <button
            onClick={() => setActiveIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length)}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[var(--bg-card)]/90 border border-[var(--border-color)] text-[var(--text-primary)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-none shadow-lg hover:border-[#00FF7F]"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next Arrow Button */}
          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % PROJECTS_DATA.length)}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[var(--bg-card)]/90 border border-[var(--border-color)] text-[var(--text-primary)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-none shadow-lg hover:border-[#00FF7F]"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {PROJECTS_DATA.map((project, idx) => (
            <AccordionCard
              key={project.id}
              project={project}
              isActive={idx === activeIndex}
              onMouseEnter={() => setActiveIndex(idx)}
            />
          ))}
        </div>

        {/* Mobile Stack Swiper Carousel */}
        <div className="md:hidden relative w-full h-[430px] flex items-center justify-center overflow-hidden py-4">
          {PROJECTS_DATA.map((project, idx) => {
            const relativeIdx = getStackPosition(idx)
            const isFront = relativeIdx === 0
            const isMiddle = relativeIdx === 1
            const isBack = relativeIdx === 2
            const isVisible = relativeIdx <= 2

            if (!isVisible) return null

            return (
              <motion.div
                key={project.id}
                style={{
                  zIndex: 10 - relativeIdx,
                }}
                animate={{
                  scale: isFront ? 1 : isMiddle ? 0.93 : 0.86,
                  y: isFront ? 0 : isMiddle ? 16 : 32,
                  opacity: isFront ? 1 : isMiddle ? 0.75 : 0.45,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                }}
                drag={isFront ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={isFront ? (e, info) => {
                  const swipeThreshold = 80
                  if (info.offset.x < -swipeThreshold) {
                    setActiveIndex((prev) => (prev + 1) % PROJECTS_DATA.length)
                  } else if (info.offset.x > swipeThreshold) {
                    setActiveIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length)
                  }
                } : undefined}
                whileDrag={{ scale: 1.02 }}
                className="absolute w-[300px] h-[390px] rounded-[28px] overflow-hidden border border-[var(--border-color)] shadow-2xl bg-[var(--bg-card)] touch-none"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Gradient Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

                {/* Details overlay (Front card only) */}
                {isFront && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/95 via-black/75 to-transparent flex flex-col gap-2 rounded-b-[28px] pointer-events-none"
                  >
                    <span className="font-display font-black text-lg text-white">
                      {project.title}
                    </span>
                    <p className="font-body text-[11px] text-neutral-300 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="mt-1 flex justify-end pointer-events-auto">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 cursor-none inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 hover:bg-[#00FF7F] hover:text-black hover:border-[#00FF7F] px-4 py-2 text-xs font-semibold text-white transition-all duration-300 shadow-md"
                      >
                        <span>View Store</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Progress bar below (Desktop and Mobile) */}
        <div className="flex flex-col items-center mt-12 gap-3">
          <div className="w-48 h-1 bg-[var(--border-color)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#00FF7F] rounded-full"
              animate={{ width: `${((activeIndex + 1) / PROJECTS_DATA.length) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <span className="font-mono text-[10px] text-[var(--text-secondary)] font-bold tracking-widest uppercase">
            0{activeIndex + 1} / 0{PROJECTS_DATA.length}
          </span>
        </div>

      </div>
    </section>
  )
}

// 3D Parallax Tilt Accordion Card for Desktop
function AccordionCard({
  project,
  isActive,
  onMouseEnter,
}: {
  project: any
  isActive: boolean
  onMouseEnter: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, px: 0, py: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5 // -0.5 to 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5 // -0.5 to 0.5

    setTilt({
      rx: py * -8,  // rotation X
      ry: px * 8,   // rotation Y
      px: px * -12, // parallax translation X
      py: py * -12, // parallax translation Y
    })
  }

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, px: 0, py: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={onMouseEnter}
      onClick={onMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative h-full rounded-[28px] overflow-hidden border cursor-none transition-[border-color,box-shadow,background-color] duration-500 ease-out shadow-xl ${
        isActive
          ? 'flex-[4.5] border-[#00FF7F]/40 shadow-[0_0_30px_rgba(0,255,127,0.06)]'
          : 'flex-[0.8] border-[var(--border-color)] hover:border-[var(--text-muted)] bg-[var(--bg-card)]/60'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: tilt.rx === 0 
          ? 'transform 0.5s ease-out, flex 0.7s cubic-bezier(0.16, 1, 0.3, 1)' 
          : 'flex 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Background Project Image with Parallax */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover origin-center transition-[transform,opacity,filter] duration-700 ease-out ${
            isActive ? 'scale-110 opacity-100 blur-0' : 'scale-100 opacity-40 blur-[0.5px]'
          }`}
          style={{
            transform: isActive ? `scale(1.1) translateX(${tilt.px}px) translateY(${tilt.py}px)` : 'scale(1)',
            transition: tilt.px === 0 ? 'transform 0.5s ease-out' : 'none',
          }}
        />
      </div>

      {/* Dark gradient overlay covering the image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 pointer-events-none" />

      {/* Active State: Rich editorial text layout and View button */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-8 flex flex-col md:flex-row md:items-end justify-between gap-4 z-20 pointer-events-none"
          >
            <div className="max-w-[80%] flex flex-col gap-2.5">
              {/* Title & Short Description */}
              <div>
                <h3 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight leading-none mb-2">
                  {project.title}
                </h3>
                <p className="font-body text-xs md:text-sm text-neutral-300 max-w-xl leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pointer-events-auto flex-shrink-0">
              <motion.a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 cursor-none inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 hover:bg-[#00FF7F] hover:text-black hover:border-[#00FF7F] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 shadow-md"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>View Store</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
