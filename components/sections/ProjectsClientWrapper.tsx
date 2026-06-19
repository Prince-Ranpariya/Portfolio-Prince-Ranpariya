'use client'

import dynamic from 'next/dynamic'

const Projects3DShowcase = dynamic(() => import('@/components/sections/Projects3DShowcase'), { ssr: false })

export default function ProjectsClientWrapper() {
  return <Projects3DShowcase />
}
