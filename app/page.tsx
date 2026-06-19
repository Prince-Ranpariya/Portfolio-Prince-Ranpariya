import Hero from '@/components/sections/Hero'
import HeroStats from '@/components/sections/HeroStats'
import Manifesto from '@/components/sections/Manifesto'
import BentoAbout from '@/components/sections/BentoAbout'
import TrustedBy from '@/components/sections/TrustedBy'
import ShopifyInsights from '@/components/sections/ShopifyInsights'
import Services from '@/components/sections/Services'

import ProjectsClientWrapper from '@/components/sections/ProjectsClientWrapper'
import BrandOrbit from '@/components/sections/BrandOrbit'
import DeveloperIdentity from '@/components/sections/DeveloperIdentity'
import Testimonials from '@/components/sections/Testimonials'
import StatsStrip from '@/components/sections/StatsStrip'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

/**
 * Prince Ranpariya — Single-page Portfolio
 * Sections alternate dark/light backgrounds as user scrolls.
 * Color inversion detected by Navbar via data-theme attributes.
 */
export default function HomePage() {
  return (
    <>
      {/* 1. Hero — WHITE (light) */}
      <Hero />

      {/* 1b. Hero Stats — WHITE (light) */}
      <HeroStats />

      {/* 2. Manifesto Statement — WHITE (light) */}
      <Manifesto />

      {/* 3. Bento About / Stats Grid — WHITE (light) */}
      <BentoAbout />

      {/* 3a. Trusted By Brand Strip — LIGHT GRAY */}
      <TrustedBy />

      {/* 3b. Shopify Insights (Stacked Cards) — DARK */}
      <ShopifyInsights />

      {/* 5. Services — DARK */}
      <Services />



      {/* 7. Projects Gallery — DARK (3D Showcase) */}
      <ProjectsClientWrapper />

      {/* 7b. Interactive Brand Orbit Playground — LIGHT */}
      <BrandOrbit />

      {/* 8. CTRL+DEPLOY Developer Identity — BLACK (dark) */}
      <DeveloperIdentity />

      {/* 9. Testimonials — WHITE (light) */}
      <Testimonials />

      {/* 10. Stats Strip — DARK */}
      <StatsStrip />

      {/* 11. Contact — WHITE (light) */}
      <Contact />

      {/* 12. Footer — BLACK (dark) */}
      <Footer />
    </>
  )
}
