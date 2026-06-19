import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/global/ThemeProvider'
import LenisProvider from '@/components/global/LenisProvider'
import Navbar from '@/components/global/Navbar'
import CustomCursor from '@/components/global/CustomCursor'
import PageLoader from '@/components/global/PageLoader'
import ScrollProgress from '@/components/global/ScrollProgress'

// ── Font loading ───────────────────────────────────────────
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

// ── SEO Metadata ───────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Prince Ranpariya | Shopify Web Developer & E-commerce Expert',
  description:
    'Expert Shopify developer with 2+ years building high-converting stores. Custom themes, Liquid development, app integration, and speed optimization. Based in Rajkot, India.',
  keywords: [
    'Shopify developer',
    'Shopify expert India',
    'custom Shopify theme',
    'Liquid development',
    'e-commerce developer',
    'Rajkot',
    'the boxux studio',
    'Prince Ranpariya',
    'Shopify store setup',
  ],
  authors: [
    { name: 'Prince Ranpariya', url: 'https://prince-ranpariya.github.io' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    title: 'Prince Ranpariya | Shopify Web Developer',
    description: 'Building high-converting, scalable Shopify stores.',
    siteName: 'Prince Ranpariya Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prince Ranpariya | Shopify Developer',
    description: 'Expert Shopify developer — custom themes, Liquid, app integration.',
  },
  robots: { index: true, follow: true },
}

// ── JSON-LD Schema ─────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'Prince Ranpariya',
      url: 'https://prince-ranpariya.github.io',
      email: 'princeranpariya00@gmail.com',
      telephone: '+91-8490941007',
      jobTitle: 'Shopify Web Developer',
      worksFor: { '@type': 'Organization', name: 'the boxux.studio' },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Rajkot',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
      },
    },
    {
      '@type': 'WebSite',
      name: 'Prince Ranpariya Portfolio',
      url: 'https://prince-ranpariya.github.io',
      description: 'Portfolio of Prince Ranpariya, Shopify Web Developer.',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Prevent flash of wrong theme on load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var saved = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (saved === 'dark' || (!saved && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="font-body antialiased overflow-x-hidden">
        {/* Skip navigation */}
        <a href="#main-content" className="skip-link">Skip to main content</a>

        <ThemeProvider>
          {/* Global overlays */}
          <PageLoader />
          <CustomCursor />
          <ScrollProgress />
          <Navbar />

          {/* Smooth scroll wrapper */}
          <LenisProvider>
            <main id="main-content">{children}</main>
          </LenisProvider>

          {/* SVG liquid distortion filter for theme transitions */}
          <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
            <filter id="liquid-wave">
              <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </svg>
        </ThemeProvider>
      </body>
    </html>
  )
}
