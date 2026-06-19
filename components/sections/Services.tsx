'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)
  const orbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !card1Ref.current || !card2Ref.current || !card3Ref.current) return

    gsap.registerPlugin(ScrollTrigger)

    // Set initial card states
    gsap.set(card2Ref.current, { y: '100vh', opacity: 0 })
    gsap.set(card3Ref.current, { y: '100vh', opacity: 0 })

    // Create GSAP timeline for scroll pinning and animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=120%', // Pin for 120% of viewport height (smooth and responsive)
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Move floating orb with scroll progress
          if (orbRef.current) {
            orbRef.current.style.transform = `translateY(${self.progress * 100}px)`
          }
        }
      }
    })

    // Segment 1: Card 2 slides up, Card 1 scales down/fades
    tl.to(card1Ref.current, {
      scale: 0.92,
      opacity: 0.3,
      duration: 1,
      ease: 'none'
    }, 0)

    tl.to(card2Ref.current, {
      y: '0vh',
      opacity: 1,
      duration: 1,
      ease: 'none'
    }, 0)

    // Segment 2: Card 3 slides up, Card 2 scales down/fades
    tl.to(card2Ref.current, {
      scale: 0.92,
      opacity: 0.3,
      duration: 1,
      ease: 'none'
    }, 1)

    tl.to(card3Ref.current, {
      y: '0vh',
      opacity: 1,
      duration: 1,
      ease: 'none'
    }, 1)

    return () => {
      // Clean up GSAP timelines and scroll triggers for this section
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === sectionRef.current) {
          st.kill()
        }
      })
    }
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      data-theme="dark"
      className="relative bg-[#0A0A0A] overflow-hidden w-full min-h-screen flex flex-col justify-center"
      aria-label="Services We Provide"
    >
      {/* Floating blurred circle orb in upper-right */}
      <div
        ref={orbRef}
        className="absolute top-24 right-10 md:right-24 w-[120px] h-[120px] rounded-full bg-[rgba(255,255,255,0.06)] pointer-events-none z-0"
        style={{ filter: 'blur(40px)' }}
        aria-hidden="true"
      />

      {/* Viewport wrapper */}
      <div className="h-screen w-full flex flex-col justify-center px-6 md:px-16 lg:px-24 xl:px-32 max-w-[1400px] mx-auto z-10">
        
        {/* Section Header */}
        <div className="mb-10 md:mb-14 text-left">
          <p className="font-mono text-xs font-semibold text-[#FF5500] tracking-widest uppercase mb-3">
            OUR EXPERTISE
          </p>
          <h2 className="font-display font-extrabold text-white text-3xl md:text-5xl leading-tight">
            Services We provide to help you grow.
          </h2>
        </div>

        {/* Cards Stacking Container */}
        <div className="relative w-full h-[450px] md:h-[380px] mx-auto">
          
          {/* Card 1 — Custom Web Development */}
          <div
            ref={card1Ref}
            className="absolute inset-0 w-full h-full rounded-[20px] bg-[#1A1A1A] border border-[#262626] p-8 md:p-12 lg:p-16 flex flex-col justify-between shadow-2xl hover:border-[#FF5500]/20 transition-colors duration-300 card-hover z-10"
            style={{
              transform: 'scale(1)',
              opacity: 1,
              transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="text-[#FF5500] w-fit" aria-hidden="true">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-3xl md:text-5xl leading-tight">
                Custom Web Development
              </h3>
            </div>
            <p className="font-body text-[#888888] text-base md:text-xl leading-relaxed max-w-[800px]">
              Tailored websites built with clean, modern code. I craft custom layouts, optimize database structures, and develop bespoke web solutions that are blazing-fast, secure, and uniquely designed for your brand.
            </p>
          </div>

          {/* Card 2 — WordPress Solutions */}
          <div
            ref={card2Ref}
            className="absolute inset-0 w-full h-full rounded-[20px] bg-[#1A1A1A] border border-[#262626] p-8 md:p-12 lg:p-16 flex flex-col justify-between shadow-2xl hover:border-[#FF5500]/20 transition-colors duration-300 card-hover z-20"
            style={{
              transform: 'translateY(100vh)',
              opacity: 0,
              transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="text-[#FF5500] w-fit" aria-hidden="true">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.523 3.654 1.432 5.168l4.47-12.235c.44-.06.877-.09 1.306-.09.916 0 1.832.13 2.7.382l-5.836 16c.16.035.322.06.485.08A9.95 9.95 0 0 0 12 22a9.95 9.95 0 0 0 5.568-1.693l-4.996-14.536a4.42 4.42 0 0 1 2.213-.585c.957 0 1.954.212 2.91.66A9.97 9.97 0 0 0 22 12c0-5.523-4.477-10-10-10zm.158 10.786l-2.698 7.84c.806.236 1.657.365 2.54.365a9.8 9.8 0 0 0 5.663-1.776l-5.505-6.429zM17.705 7.196a3.2 3.2 0 0 0-2.907 2.06c.038.742.072 1.258.072 1.775 0 .61-.1 1.257-.22 1.834l5.485-6.402a9.7 9.7 0 0 0-2.43-1.267z"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-3xl md:text-5xl leading-tight">
                WordPress Solutions
              </h3>
            </div>
            <p className="font-body text-[#888888] text-base md:text-xl leading-relaxed max-w-[800px]">
              Premium WordPress development from custom templates to full-scale enterprise setups. I build modular, easy-to-manage themes, implement robust plugin architectures, and ensure top-tier security and performance.
            </p>
          </div>

          {/* Card 3 — E-commerce with Shopify */}
          <div
            ref={card3Ref}
            className="absolute inset-0 w-full h-full rounded-[20px] bg-[#1A1A1A] border border-[#262626] p-8 md:p-12 lg:p-16 flex flex-col justify-between shadow-2xl hover:border-[#FF5500]/20 transition-colors duration-300 card-hover z-30"
            style={{
              transform: 'translateY(100vh)',
              opacity: 0,
              transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="text-[#FF5500] w-fit" aria-hidden="true">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-3xl md:text-5xl leading-tight">
                E-commerce with Shopify
              </h3>
            </div>
            <p className="font-body text-[#888888] text-base md:text-xl leading-relaxed max-w-[800px]">
              High-converting Shopify stores designed to turn visitors into loyal customers. Specializing in custom Liquid theme development, headless Shopify apps, seamless app integrations, and conversion rate optimization (CRO).
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
