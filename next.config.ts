import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://github.com/**'),
      new URL('https://avatars.githubusercontent.com/**'),
    ],
  },
}

export default nextConfig
