// ============================================================
// SITE CONSTANTS — All data for the portfolio
// ============================================================

export const SITE_CONFIG = {
  name: 'Prince Ranpariya',
  tagline: 'Shopify Web Developer & E-commerce Specialist',
  email: 'princeranpariya00@gmail.com',
  phone: '+91 6353898827',
  whatsapp: '+916353898827',
  location: 'Rajkot, Gujarat, India',
  studio: 'the boxux.studio',
  cvUrl: 'https://prince-ranpariya.github.io/Portfolio-Prince-Ranpariya/Prince%20Ranpariya-CV%201.pdf.pdf',
  avatarUrl: 'https://prince-ranpariya.github.io/Portfolio-Prince-Ranpariya/WhatsApp%20Image%202025-12-19%20at%204.37.43%20PM.jpeg',
  heroImageUrl: 'https://prince-ranpariya.github.io/Portfolio-Prince-Ranpariya/WhatsApp%20Image%202025-12-19%20at%204.37.43%20PM.jpeg',
}

export const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export const STATS = [
  { number: '2+', label: 'Years', sub: 'Experience' },
  { number: '20+', label: 'Projects', sub: 'Delivered' },
  { number: '100%', label: 'Client', sub: 'Satisfaction' },
  { number: '3+', label: 'Live', sub: 'Stores' },
]

export const SKILLS_TICKER = [
  'Shopify Development',
  'Custom Themes',
  'Liquid Code',
  'App Integration',
  'Performance Optimization',
  'SEO & Speed',
  'Conversion Rate Optimization',
  'E-commerce',
  'Store Setup',
  'Theme Customization',
  'Maintenance & Support',
  'Shopify Development',
  'Custom Themes',
  'Liquid Code',
  'App Integration',
  'Performance Optimization',
  'SEO & Speed',
  'Conversion Rate Optimization',
  'E-commerce',
  'Store Setup',
  'Theme Customization',
  'Maintenance & Support',
]

export const SERVICES = [
  {
    id: 1,
    icon: 'code',
    title: 'Custom Shopify Theme Development',
    description:
      'Bespoke themes built from scratch to perfectly match your brand. Mobile-responsive, conversion-optimized, and blazing fast. Every pixel designed to convert visitors into buyers.',
    tag: 'THEMES / DESIGN',
    number: '01',
  },
  {
    id: 2,
    icon: 'shopping-bag',
    title: 'Shopify Store Setup from Scratch',
    description:
      'Complete store build from zero to launch. Product configuration, payment gateway setup, shipping rules, and full go-live support. Your store ready to sell in days.',
    tag: 'SETUP / LAUNCH',
    number: '02',
  },
  {
    id: 3,
    icon: 'zap',
    title: 'App & Payment Gateway Integration',
    description:
      'Seamless third-party integrations — payment processors, inventory management, review systems, and marketing tools. Clean API work, zero conflicts.',
    tag: 'INTEGRATION / API',
    number: '03',
  },
  {
    id: 4,
    icon: 'trending-up',
    title: 'Store Speed & SEO Optimization',
    description:
      'Technical performance optimization for sub-2s load times. Core Web Vitals improvement, image compression, lazy loading, and Shopify SEO best practices.',
    tag: 'PERFORMANCE / SEO',
    number: '04',
  },
  {
    id: 5,
    icon: 'palette',
    title: 'Theme Customization & Redesign',
    description:
      'Transform any existing Shopify theme into something uniquely yours. Custom sections, Liquid template edits, and UX improvements that lift conversion rates.',
    tag: 'REDESIGN / UX',
    number: '05',
  },
  {
    id: 6,
    icon: 'wrench',
    title: 'Maintenance & Ongoing Support',
    description:
      'Monthly retainer plans for bug fixes, feature additions, speed monitoring, and security updates. Your store in safe hands, always.',
    tag: 'MAINTENANCE / SUPPORT',
    number: '06',
  },
]

export const WORD_REEL = [
  'Shopify',
  'Themes',
  'Performance',
  'Conversion',
  'Liquid',
  'Integration',
  'Speed',
  'SEO',
  'Growth',
]

export const PROJECTS = [
  {
    id: 1,
    title: 'Sephani Nightwear',
    description: 'Premium nightwear brand with custom Shopify theme built for conversion.',
    image: '/images/sephani.jpg',
    tags: ['Custom Theme', 'Performance'],
    metric: '+35% Conversion Rate',
    url: 'https://www.sephani.co.in/',
    category: 'Custom Theme',
  },
  {
    id: 2,
    title: 'Glissberry Store',
    description: 'Multi-variant marketplace with advanced app integrations and smooth UX.',
    image: '/images/glissberry.png',
    tags: ['E-commerce', 'App Integration'],
    metric: 'Multi-variant Store',
    url: 'https://glissberry.com/',
    category: 'E-commerce',
  },
  {
    id: 3,
    title: 'Tropic Skincare',
    description: 'Skincare brand with subscription model and email marketing automation.',
    image: '/images/tropic-skincare.png',
    tags: ['E-commerce', 'Integration'],
    metric: '50% Repeat Customers',
    url: 'https://tropicskincare.com',
    category: 'E-commerce',
  },
  {
    id: 4,
    title: 'Wooden Bazar',
    description: 'Furniture store with AR integration and 3D product viewer reducing returns.',
    image: '/images/wooden-bazar.jpg',
    tags: ['Custom Theme', 'Integration'],
    metric: '-25% Return Rate',
    url: 'https://woodenbazar.com/',
    category: 'Integration',
  },
  {
    id: 5,
    title: 'Spall Sport',
    description: 'Mobile-first sports store with deep product customization capabilities.',
    image: '/images/spall-sport.png',
    tags: ['Performance', 'Custom Theme'],
    metric: 'Sports Performance Store',
    url: 'https://spallsport.co/',
    category: 'Performance',
  },
  {
    id: 6,
    title: 'Stellarisme Jewellery',
    description: 'Luxury jewellery brand with premium UX and deep Shopify customization.',
    image: '/images/stellarisme-jewellery.png',
    tags: ['Custom Theme', 'E-commerce'],
    metric: 'Premium Jewelry Store',
    url: 'https://www.stellarisme.com',
    category: 'Custom Theme',
  },
]

export const PROJECT_FILTERS = ['All', 'Custom Theme', 'E-commerce', 'Performance', 'Integration']

export const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'Prince understood our brand vision clearly and delivered a clean, premium Shopify website. Great attention to detail, smooth communication, and quick revisions. Very professional work.',
    name: 'Yogesh Varsani',
    company: 'Aura Silver Jewels',
    stars: 5,
  },
  {
    id: 2,
    quote:
      'Excellent experience working with Prince. The website perfectly matches our brand identity and feels conversion-focused. He knows Shopify well and gives practical suggestions that actually work.',
    name: 'Nikhil Vadi',
    company: 'Jagira Organic Perfumes',
    stars: 5,
  },
  {
    id: 3,
    quote:
      'Prince builds websites with a business mindset. Clean design, fast performance, and no unnecessary complexity. Reliable and easy to work with throughout the project.',
    name: 'Salman Baleli',
    company: 'Stellarisme Jewellery — CEO',
    stars: 5,
  },
]

export const FILE_TREE = [
  { name: '📁 Files', indent: 0, isDir: true },
  { name: '├── assets/', indent: 1, active: false },
  { name: '├── config/', indent: 1, active: false },
  { name: '├── layout/', indent: 1, active: false },
  { name: '├── sections/', indent: 1, active: false },
  { name: '├── snippets/', indent: 1, active: false },
  { name: '├── templates/', indent: 1, active: false },
  { name: '├── theme.liquid', indent: 1, active: true },
  { name: '├── README.md', indent: 1, active: false },
  { name: '└── settings_data.json', indent: 1, active: false },
]

export const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey: 'YOUR_PUBLIC_KEY',
}
