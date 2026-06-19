/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prince-ranpariya.github.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Performance: enable compression
  compress: true,
  // Strict mode for catching issues
  reactStrictMode: true,
}

export default nextConfig
