import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
        ],
      },
      {
        // Cache static assets
        source: '/brands/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects from old H-Prime WordPress site
  async redirects() {
    return [
      // Old service pages → New service pages
      {
        source: '/services/refrigerator-repair-service',
        destination: '/services/refrigerator-repair',
        permanent: true,
      },
      {
        source: '/services/washer-repair-service',
        destination: '/services/washer-repair',
        permanent: true,
      },
      {
        source: '/services/dryer-repair-service',
        destination: '/services/dryer-repair',
        permanent: true,
      },
      {
        source: '/services/dishwasher-repair-service',
        destination: '/services/dishwasher-repair',
        permanent: true,
      },
      {
        source: '/services/oven-repair-service',
        destination: '/services/oven-repair',
        permanent: true,
      },
      {
        source: '/services/freezer-repair-service',
        destination: '/services/freezer-repair',
        permanent: true,
      },
      // Contact page
      {
        source: '/contacts',
        destination: '/#contact',
        permanent: true,
      },
    ];
  },

  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
