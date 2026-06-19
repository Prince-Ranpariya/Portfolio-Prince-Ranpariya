'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Home, User, Briefcase, Cpu, Mail, Moon, Sun } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import { scrollToSection, cn } from '@/lib/utils'
import { useTheme } from '@/components/global/ThemeProvider'

const NAV_ITEMS = [
  { name: 'Home', url: '#hero', icon: Home },
  { name: 'About', url: '#about', icon: User },
  { name: 'Work', url: '#projects', icon: Briefcase },
  { name: 'Services', url: '#services', icon: Cpu },
  { name: 'Contact', url: '#contact', icon: Mail },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [sectionTheme, setSectionTheme] = useState<'dark' | 'light'>('light')
  const { toggle, isDark } = useTheme()
  const navRef = useRef<HTMLElement>(null)

  // Track scroll for blur background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Color inversion via IntersectionObserver on sections
  useEffect(() => {
    const sections = document.querySelectorAll('[data-theme]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const st = (entry.target as HTMLElement).dataset.theme as 'dark' | 'light'
            setSectionTheme(st || 'light')
          }
        })
      },
      { threshold: [0.3], rootMargin: '-72px 0px 0px 0px' }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const [activeSection, setActiveSection] = useState('#hero')

  // Track active section for nav indicators
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.querySelector(item.url)).filter(Boolean) as Element[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      { threshold: [0.15, 0.35, 0.6], rootMargin: '-80px 0px -30% 0px' }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string) => {
    scrollToSection(href)
  }

  // Text color: depends on section theme AND site mode
  const onDarkSection = sectionTheme === 'dark'
  const textColor = onDarkSection ? '#F5F5F5' : isDark ? '#F0F0F0' : '#0A0A0A'
  const borderColor = onDarkSection
    ? '#1E1E1E'
    : isDark
    ? '#2A2A2A'
    : '#E5E5E5'

  const activeColor = isDark ? '#FFFFFF' : '#00CC60'
  const glowColor = isDark ? '#00FF7F' : '#00CC60'

  return (
    <>
      <motion.nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[9990] h-[72px] flex items-center"
        style={{
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          backgroundColor: scrolled
            ? onDarkSection || isDark
              ? 'rgba(7,7,7,0.9)'
              : 'rgba(255,255,255,0.88)'
            : 'transparent',
          borderBottom: scrolled ? `1px solid ${borderColor}` : 'none',
          transition: 'background-color 0.35s, border-color 0.35s, backdrop-filter 0.35s',
        }}
        aria-label="Main navigation"
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#hero')}
            className="font-display font-bold text-2xl text-[#00FF7F] transition-opacity hover:opacity-80 cursor-none"
            style={{ letterSpacing: '-0.02em' }}
            aria-label="Prince Ranpariya — back to top"
          >
            Prince.
          </button>

          {/* Desktop nav links (Floating Capsule Pill in Center) */}
          <div className="hidden md:flex items-center gap-1.5 bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200/50 dark:border-neutral-800/80 backdrop-blur-lg py-1 px-1 rounded-full shadow-md">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.url
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.url)}
                  className={cn(
                    "relative cursor-none text-xs font-semibold px-5 py-2 rounded-full transition-colors duration-300",
                    "text-neutral-500 hover:text-[#00CC60] dark:text-neutral-400 dark:hover:text-[#00FF7F]",
                    isActive && "text-[#00CC60] dark:text-white font-bold"
                  )}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="lamp-desktop"
                      className="absolute inset-0 w-full bg-neutral-200/50 dark:bg-neutral-800/60 rounded-full -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-[#00CC60] dark:bg-white rounded-t-full">
                        {/* Glow layers */}
                        <div className="absolute w-12 h-6 bg-[#00FF7F]/20 dark:bg-white/20 rounded-full blur-md -top-2 -left-2" />
                        <div className="absolute w-8 h-6 bg-[#00FF7F]/20 dark:bg-white/20 rounded-full blur-md -top-1" />
                        <div className="absolute w-4 h-4 bg-[#00FF7F]/20 dark:bg-white/20 rounded-full blur-sm top-0 left-2" />
                      </div>
                    </motion.div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Right side CTA + Dark mode toggle */}
          <div className="flex items-center gap-3">
            {/* Hire Me CTA (Desktop only) */}
            <motion.a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex btn-green text-xs py-2.5 px-5 cursor-none"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Hire Prince on WhatsApp"
            >
              Hire Me →
            </motion.a>

            {/* Dark/Light mode toggle */}
            <motion.button
              onClick={(e) => toggle(e)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors relative overflow-hidden cursor-none"
              style={{
                background: isDark ? 'rgba(0,255,127,0.1)' : 'rgba(0,0,0,0.06)',
                border: `1.5px solid ${isDark ? 'rgba(0,255,127,0.3)' : borderColor}`,
                color: textColor,
              }}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={isDark}
            >
              {isDark ? (
                <Sun size={16} className="text-[#00FF7F]" aria-hidden="true" />
              ) : (
                <Moon size={16} style={{ color: textColor }} aria-hidden="true" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Floating Capsule Dock at bottom of screen */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[9990] w-[90%] max-w-[340px] bg-neutral-100/90 dark:bg-neutral-950/80 border border-neutral-200/50 dark:border-neutral-800/80 backdrop-blur-lg py-2 px-3 rounded-full shadow-2xl flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.url
          return (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.url)}
              className={cn(
                "relative cursor-none p-3 rounded-full transition-colors duration-300 flex items-center justify-center",
                "text-neutral-500 hover:text-[#00CC60] dark:text-neutral-400 dark:hover:text-[#00FF7F]",
                isActive && "text-[#00CC60] dark:text-white"
              )}
              aria-label={item.name}
            >
              <Icon size={20} strokeWidth={2.5} className="relative z-10" />
              {isActive && (
                <motion.div
                  layoutId="lamp-mobile"
                  className="absolute inset-0 w-full bg-neutral-200/50 dark:bg-neutral-800/60 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-[2.5px] bg-[#00CC60] dark:bg-white rounded-t-full">
                    {/* Glow layers */}
                    <div className="absolute w-10 h-4 bg-[#00FF7F]/20 dark:bg-white/20 rounded-full blur-md -top-1.5 -left-2" />
                  </div>
                </motion.div>
              )}
            </button>
          )
        })}
      </div>
    </>
  )
}
