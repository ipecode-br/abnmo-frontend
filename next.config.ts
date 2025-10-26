import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  swcMinify: true,
  // Optimize HMR performance in development
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  images: {
    remotePatterns: [
      new URL('https://cdn.jsdelivr.net/**'),
      new URL('https://avatars.githubusercontent.com/**'),
    ],
  },
}

export default nextConfig
