import { MetadataRoute } from 'next';

// Single source of truth for blocked paths.
// A crawler obeys ONLY its own most-specific group, so every named group below
// must repeat this exact list — a path missing from the Googlebot group is
// crawlable by Google no matter what the `*` group says.
// NB: never disallow /_next/. Next/Image serves every optimised image
// from /_next/image, so blocking it removes the whole site from Google
// Images and strips thumbnails out of the local pack and AI answers.
const DISALLOW = [
  '/api/',
  '/keystatic/',
  '/admin/',
  '/test-geo/',
];

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.h-prime-co.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOW,
        crawlDelay: 1, // 1 second between requests (prevents server overload)
      },
      // Specific rules for major search engines — same disallow list, different pace
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: DISALLOW,
        crawlDelay: 0.5, // Google can crawl faster
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: DISALLOW,
        crawlDelay: 1,
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-phase1.xml`,
      `${baseUrl}/sitemap-phase2.xml`,
      `${baseUrl}/sitemap-phase3.xml`,
    ],
  };
}
