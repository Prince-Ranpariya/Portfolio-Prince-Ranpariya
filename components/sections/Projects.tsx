'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { PROJECTS, PROJECT_FILTERS } from '@/lib/constants'

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter || p.tags.includes(activeFilter))

  return (
    <section
      id="projects"
      ref={ref}
      data-theme="light"
      className="py-24 lg:py-32"
      style={{ backgroundColor: 'var(--bg-page)' }}
      aria-label="Featured projects"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="eyebrow text-[#00CC60] mb-3"
            >
              SELECTED WORK
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-display font-black leading-tight"
              style={{
                fontSize: 'clamp(44px, 7vw, 90px)',
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
              }}
            >
              Featured
              <br />
              <span className="italic font-bold" style={{ color: 'var(--text-muted)' }}>Projects</span>
            </motion.h2>
          </div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {PROJECT_FILTERS.map((f) => (
              <motion.button
                key={f}
                onClick={() => setActiveFilter(f)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                role="tab"
                aria-selected={activeFilter === f}
                style={
                  activeFilter === f
                    ? { backgroundColor: 'var(--text-primary)', color: 'var(--bg-page)', border: '1px solid var(--text-primary)' }
                    : { backgroundColor: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }
                }
                className="px-4 py-2 rounded-full font-mono text-[12px] font-semibold tracking-wide transition-all duration-200"
              >
                {f}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Projects grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20, scale: 0.96 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <div
      data-project-card
      className="project-card group relative rounded-[20px] overflow-hidden border card-hover transition-all duration-400"
      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
    >
      {/* Image */}
      <div className="project-card-img relative h-48" style={{ backgroundColor: 'var(--border-color)' }}>
        <img
          src={project.image}
          alt={`${project.title} project preview`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/10 transition-colors duration-300" aria-hidden="true" />

        {/* View Project slide-up */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#00FF7F] px-5 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex items-center justify-between">
          <span className="font-display font-semibold text-[#0A0A0A] text-sm">View Project</span>
          <ExternalLink size={14} className="text-[#0A0A0A]" />
        </div>
      </div>

      {/* Card body */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full font-mono text-[10px] font-semibold uppercase tracking-wide"
              style={{ background: 'var(--bg-page)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display font-bold text-xl mb-2 leading-tight" style={{ color: 'var(--text-primary)' }}>
          {project.title}
        </h3>
        <p className="font-body text-sm leading-relaxed line-clamp-2 mb-4" style={{ color: 'var(--text-secondary)' }}>
          {project.description}
        </p>

        {/* Metric badge */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,255,127,0.1)', border: '1px solid rgba(0,255,127,0.3)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF7F]" aria-hidden="true" />
            <span className="font-mono text-[#00CC60] text-[11px] font-bold">{project.metric}</span>
          </span>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = 'var(--text-primary)'
              el.style.color = 'var(--bg-page)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = 'transparent'
              el.style.color = 'var(--text-primary)'
            }}
            aria-label={`Visit ${project.title} website`}
          >
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  )
}
