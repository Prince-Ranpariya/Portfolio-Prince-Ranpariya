'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

type Mode = 'light' | 'dark'

interface ThemeContextType {
  mode: Mode
  toggle: (event?: React.MouseEvent) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggle: () => {},
  isDark: false,
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>('light')

  useEffect(() => {
    // Read saved preference or system preference
    const saved = localStorage.getItem('theme') as Mode | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial: Mode = saved ?? (prefersDark ? 'dark' : 'light')

    setMode(initial)
    // Apply class to <html> — this is what CSS .dark selector targets
    if (initial === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggle = (event?: React.MouseEvent) => {
    const isSupported = typeof document !== 'undefined' && 'startViewTransition' in document

    const updateDOM = () => {
      setMode((prev) => {
        const next: Mode = prev === 'light' ? 'dark' : 'light'
        if (next === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('theme', next)
        return next
      })
    }

    if (!isSupported || !event) {
      updateDOM()
      return
    }

    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    document.documentElement.style.setProperty('--click-x', `${x}px`)
    document.documentElement.style.setProperty('--click-y', `${y}px`)
    document.documentElement.style.setProperty('--max-radius', `${endRadius}px`)

    ;(document as any).startViewTransition(() => {
      flushSync(() => {
        updateDOM()
      })
    })
  }

  return (
    <ThemeContext.Provider value={{ mode, toggle, isDark: mode === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

