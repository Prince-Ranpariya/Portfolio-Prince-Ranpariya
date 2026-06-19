'use client'

import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { useTheme } from '@/components/global/ThemeProvider'

interface BrandItemProps {
  text: string
  styleKey: string
}

function BrandTextItem({ text, styleKey }: BrandItemProps) {
  const { isDark } = useTheme()
  let styleClass = ""
  let color = ""

  switch (styleKey) {
    case 'daily-objects':
      styleClass = "font-sans font-semibold"
      color = isDark ? '#d4d4d4' : '#262626'
      break
    case 'murzban':
      styleClass = "font-mono font-black uppercase tracking-tight text-2xl"
      color = isDark ? '#ffffff' : '#0a0a0a'
      break
    case 'sephani':
      styleClass = "font-serif italic font-extralight tracking-widest"
      color = isDark ? '#e5e5e5' : '#171717'
      break
    case 'minitpe':
      styleClass = "font-sans font-extrabold"
      color = isDark ? '#e5e5e5' : '#171717'
      break
    case 'glissbery':
      styleClass = "font-sans font-black tracking-wider uppercase"
      color = isDark ? '#ffffff' : '#0a0a0a'
      break
    case 'twinleave':
      styleClass = "font-sans font-medium uppercase tracking-widest text-sm"
      color = isDark ? '#d4d4d4' : '#262626'
      break
    case 'plutoze':
      styleClass = "font-sans font-extrabold italic"
      color = isDark ? '#e5e5e5' : '#171717'
      break
    case 'laxery':
      styleClass = "font-sans font-light uppercase tracking-[0.3em]"
      color = isDark ? '#e5e5e5' : '#171717'
      break
    case 'sparsco':
      styleClass = "font-sans font-extrabold italic uppercase tracking-[0.02em]"
      color = isDark ? '#e5e5e5' : '#111111'
      break
    case 'street9':
      styleClass = "font-sans font-normal uppercase tracking-[0.2em] text-sm"
      color = isDark ? '#d4d4d4' : '#262626'
      break
    default:
      styleClass = "font-sans"
      color = isDark ? '#d4d4d4' : '#262626'
  }

  return (
    <span 
      className={`brand-text text-xl md:text-2xl transition-all duration-500 ease-out select-none cursor-none ${styleClass}`}
      style={{ color }}
    >
      {text}
    </span>
  )
}

export default function TrustedBy() {
  const row1 = [
    { text: "Daily Objects", style: "daily-objects" },
    { text: "MURZBAN", style: "murzban" },
    { text: "Sephani", style: "sephani" },
    { text: "minitpe.", style: "minitpe" },
    { text: "GLISSBERY", style: "glissbery" }
  ]

  const row2 = [
    { text: "^ TWINLEAVE", style: "twinleave" },
    { text: "Plutoze", style: "plutoze" },
    { text: "LAXERY", style: "laxery" },
    { text: "SPARSCO", style: "sparsco" },
    { text: "STREET9", style: "street9" }
  ]
  const displayRow1 = [...row1, ...row1, ...row1]
  const displayRow2 = [...row2, ...row2, ...row2]

  return (
    <section
      id="trusted-by"
      data-theme="light"
      className="bg-[#f8f8f8] dark:bg-[#0c0c0c] py-16 md:py-24 overflow-hidden relative border-y border-neutral-200/40 dark:border-neutral-800/40 transition-colors duration-300"
      aria-label="Powering growth for companies like"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-12 text-center">
        <h2 className="text-[10px] md:text-[11px] font-bold text-neutral-600 dark:text-neutral-400 tracking-[0.25em] uppercase">
          POWERING GROWTH FOR COMPANIES LIKE
        </h2>
      </div>

      <div className="relative w-full flex flex-col gap-4 md:gap-12">
        {/* Row 1 — Left to Right */}
        <div className="group/row">
          <InfiniteSlider
            duration={35}
            gap={120}
            reverse={true}
            className="flex items-center py-2 cursor-none"
          >
            {displayRow1.map((item, i) => (
              <div
                key={`r1-${i}`}
                className="opacity-75 dark:opacity-40 grayscale hover:opacity-100 hover:grayscale-0 hover:scale-110 transition-all duration-500 ease-out flex items-center justify-center h-12"
              >
                <BrandTextItem text={item.text} styleKey={item.style} />
              </div>
            ))}
          </InfiniteSlider>
        </div>

        {/* Row 2 — Right to Left */}
        <div className="group/row">
          <InfiniteSlider
            duration={35}
            gap={120}
            reverse={false}
            className="flex items-center py-2 cursor-none"
          >
            {displayRow2.map((item, i) => (
              <div
                key={`r2-${i}`}
                className="opacity-75 dark:opacity-40 grayscale hover:opacity-100 hover:grayscale-0 hover:scale-110 transition-all duration-500 ease-out flex items-center justify-center h-12"
              >
                <BrandTextItem text={item.text} styleKey={item.style} />
              </div>
            ))}
          </InfiniteSlider>
        </div>

        {/* Progressive Blur Overlays for soft camera-like blur fade */}
        <ProgressiveBlur
          className="pointer-events-none absolute top-0 left-0 h-full hidden md:block md:w-[260px] z-10"
          direction="left"
          blurIntensity={1.5}
          blurLayers={8}
        />
        <ProgressiveBlur
          className="pointer-events-none absolute top-0 right-0 h-full hidden md:block md:w-[260px] z-10"
          direction="right"
          blurIntensity={1.5}
          blurLayers={8}
        />
      </div>
    </section>
  )
}
