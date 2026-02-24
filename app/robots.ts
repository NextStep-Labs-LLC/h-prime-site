import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://h-prime.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/keystatic/',
          '/_next/',
          '/admin/',
          '/test-geo/',
        ],
        crawlDelay: 1, // 1 second between requests (prevents server overload)
      },
      // Specific rules for major search engines
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/keystatic/',
          '/_next/',
          '/admin/',
        ],
        crawlDelay: 0.5, // Google can crawl faster
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/keystatic/',
          '/_next/',
          '/admin/',
          '/test-geo/',
        ],
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
