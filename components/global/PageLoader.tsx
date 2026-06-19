'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[99999] bg-[#0A0A0A] flex items-center justify-center"
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-center"
          >
            {/* Animated text reveal */}
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="font-display font-bold text-[#00FF7F]"
                style={{ fontSize: 'clamp(48px, 8vw, 96px)', letterSpacing: '-0.02em' }}
              >
                Prince.
              </span>
            </motion.div>
            {/* Loading bar */}
            <motion.div
              className="mt-6 h-[2px] bg-[#1E1E1E] rounded-full overflow-hidden mx-auto"
              style={{ width: 'clamp(120px, 20vw, 200px)' }}
            >
              <motion.div
                className="h-full bg-[#00FF7F]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
