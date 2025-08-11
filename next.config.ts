import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://cdn.jsdelivr.net/**'),
      new URL('https://avatars.githubusercontent.com/**'),
    ],
  },
}

export default nextConfig
