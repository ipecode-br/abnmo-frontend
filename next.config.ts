import type { NextConfig } from 'next'

import { env } from '@/config/env'

const nextConfig: NextConfig = {
  devIndicators: false,
  // Optimize HMR performance in development
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  images: {
    remotePatterns:
      env.NODE_ENV === 'production'
        ? [
            { protocol: 'https', hostname: '**.abnmo.org' },
            { protocol: 'https', hostname: 'd2q3o9ng2mw15p.cloudfront.net' },
            { protocol: 'https', hostname: 'd3esvuqs2o4gq9.cloudfront.net' },
          ]
        : [
            { protocol: 'https', hostname: '**.abnmo.org' },
            { protocol: 'https', hostname: 'd2q3o9ng2mw15p.cloudfront.net' },
            { protocol: 'https', hostname: 'd3esvuqs2o4gq9.cloudfront.net' },
            { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
            { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
          ],
  },
}

export default nextConfig
