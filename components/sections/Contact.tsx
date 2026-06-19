'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Mail, Phone, MapPin, MessageCircle, CheckCircle, Loader2 } from 'lucide-react'
import { SITE_CONFIG, EMAILJS_CONFIG } from '@/lib/constants'
import { staggerContainer, staggerItem } from '@/lib/utils'

type FormData = {
  name: string
  email: string
  projectType: string
  budget: string
  message: string
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const emailjs = (await import('@emailjs/browser')).default
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: data.name,
          from_email: data.email,
          project_type: data.projectType,
          budget: data.budget,
          message: data.message,
        },
        EMAILJS_CONFIG.publicKey
      )
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      data-theme="light"
      className="py-24 lg:py-32"
      style={{ backgroundColor: 'var(--bg-page)' }}
      aria-label="Contact Prince Ranpariya"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* ── LEFT — Contact info ──────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col gap-8"
          >
            <div>
              <motion.p variants={staggerItem} className="eyebrow text-[#00CC60] mb-4">CONTACT</motion.p>
              <motion.h2
                variants={staggerItem}
                className="section-heading font-display"
                style={{ color: 'var(--text-primary)' }}
              >
                Ready to Transform
                <br />
                Your Shopify Store?
              </motion.h2>
            </div>

            {/* Contact info cards */}
            <motion.div variants={staggerItem} className="flex flex-col gap-3">
              {[
                { icon: <Mail size={18} className="text-[#00CC60]" />, label: 'Email', value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
                { icon: <Phone size={18} className="text-[#00CC60]" />, label: 'Phone', value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
                { icon: <MapPin size={18} className="text-[#00CC60]" />, label: 'Location', value: `${SITE_CONFIG.location} · Available worldwide`, href: null },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-4 rounded-[14px]"
                  style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,255,127,0.1)' }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-body text-sm transition-colors hover:text-[#00CC60]" style={{ color: 'var(--text-primary)' }}>
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-body text-sm" style={{ color: 'var(--text-primary)' }}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* WhatsApp CTA */}
            <motion.div variants={staggerItem}>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-green w-full justify-center text-base py-4"
                aria-label="Chat with Prince on WhatsApp"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </motion.div>

            {/* Availability badge */}
            <motion.div
              variants={staggerItem}
              className="flex items-center gap-3 p-4 rounded-[14px]"
              style={{ border: '1px solid rgba(0,255,127,0.3)', background: 'rgba(0,255,127,0.05)' }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#00FF7F] animate-pulse-dot flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Open to New Projects</p>
                <p className="font-body text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>Usually responds within 24 hours</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Contact form ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center gap-6 text-center py-20"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,255,127,0.1)' }}>
                  <CheckCircle size={32} className="text-[#00CC60]" />
                </div>
                <h3 className="font-display font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>Message Sent!</h3>
                <p className="font-body" style={{ color: 'var(--text-secondary)' }}>I&apos;ll reply within 24 hours ✓</p>
                <button onClick={() => setStatus('idle')} className="btn-outline-dark">Send another</button>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-7">
                {[
                  { id: 'name', label: 'Your Name', type: 'text', placeholder: 'Prince Ranpariya', reg: register('name', { required: 'Name is required' }), error: errors.name },
                  { id: 'email', label: 'Email Address', type: 'email', placeholder: 'hello@yourstore.com', reg: register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } }), error: errors.email },
                ].map((field) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.25 + (field.id === 'email' ? 0.07 : 0) }}
                  >
                    <label htmlFor={field.id} className="font-mono text-[11px] uppercase tracking-wider block mb-2" style={{ color: 'var(--text-muted)' }}>{field.label}</label>
                    <input
                      id={field.id}
                      type={field.type}
                      className={`form-input ${field.error ? 'border-red-400' : ''}`}
                      placeholder={field.placeholder}
                      {...field.reg}
                      aria-invalid={!!field.error}
                    />
                    {field.error && <p className="text-red-500 text-xs mt-1" role="alert">{field.error.message}</p>}
                  </motion.div>
                ))}

                {/* Project Type */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.39 }}>
                  <label htmlFor="projectType" className="font-mono text-[11px] uppercase tracking-wider block mb-2" style={{ color: 'var(--text-muted)' }}>Project Type</label>
                  <select id="projectType" className="form-select" {...register('projectType', { required: true })}>
                    <option value="">Select project type...</option>
                    <option value="New Store">New Store</option>
                    <option value="Redesign">Redesign</option>
                    <option value="Speed Optimization">Speed Optimization</option>
                    <option value="App Integration">App Integration</option>
                    <option value="Other">Other</option>
                  </select>
                </motion.div>

                {/* Budget */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.46 }}>
                  <label htmlFor="budget" className="font-mono text-[11px] uppercase tracking-wider block mb-2" style={{ color: 'var(--text-muted)' }}>Budget Range</label>
                  <select id="budget" className="form-select" {...register('budget')}>
                    <option value="">Select budget range...</option>
                    <option value="Under ₹20k">Under ₹20k</option>
                    <option value="₹20k–₹50k">₹20k–₹50k</option>
                    <option value="₹50k–₹1L">₹50k–₹1L</option>
                    <option value="₹1L+">₹1L+</option>
                    <option value="Let's Discuss">Let&apos;s Discuss</option>
                  </select>
                </motion.div>

                {/* Message */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.53 }}>
                  <label htmlFor="message" className="font-mono text-[11px] uppercase tracking-wider block mb-2" style={{ color: 'var(--text-muted)' }}>Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className={`form-input resize-none ${errors.message ? 'border-red-400' : ''}`}
                    placeholder="Tell me about your project..."
                    {...register('message', { required: 'Message is required' })}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1" role="alert">{errors.message.message}</p>}
                </motion.div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-send-fly flex items-center justify-center rounded-2xl bg-[#00FF7F] text-[#0A0A0A] text-lg font-bold w-full py-4 pl-[0.9em] overflow-hidden transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={20} className="animate-spin text-[#0A0A0A]" aria-hidden="true" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <div className="svg-wrapper-1 flex items-center">
                        <div className="svg-wrapper flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width={24}
                            height={24}
                            className="transition-transform duration-300 origin-center text-[#0A0A0A]"
                          >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                              fill="currentColor"
                              d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                            />
                          </svg>
                        </div>
                      </div>
                      <span className="ml-2 transition-transform duration-300 font-display">
                        {status === 'error' ? 'Try Again' : 'Send'}
                      </span>
                    </>
                  )}
                </button>

                {status === 'error' && (
                  <p className="text-red-500 text-sm text-center" role="alert">
                    Failed to send. Please try WhatsApp or email directly.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
