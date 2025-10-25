import bundleAnalyzer from '@next/bundle-analyzer'
import type { NextConfig } from 'next'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-dialog',
      '@radix-ui/react-popover',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-select',
      '@radix-ui/react-slot',
      'date-fns',
      'clsx',
      'tailwind-merge',
    ],
  },
  images: {
    remotePatterns: [
      new URL('https://cdn.jsdelivr.net/**'),
      new URL('https://avatars.githubusercontent.com/**'),
    ],
  },
  webpack: (config) => {
    config.optimization.sideEffects = false
    return config
  },
}

export default withBundleAnalyzer(nextConfig)
