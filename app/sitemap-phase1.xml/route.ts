import { MetadataRoute } from 'next';
import { appliances } from '@/lib/data/appliances';
import { brands } from '@/lib/data/brands';
import { cities } from '@/lib/data/cities';

/**
 * PHASE 1 SITEMAP (Month 1-2)
 * ~200 pages: Core pages, top services, top cities, top brands
 * 
 * Strategy: Submit to Google Search Console first
 * Wait for 90%+ indexation before moving to Phase 2
 */
export async function GET() {
  const baseUrl = 'https://www.h-prime-co.com';
  const now = new Date().toISOString();

  // All service area cities
  const topCities = cities.slice(0, 32);
  
  // Top 20 most popular brands
  const topBrands = brands.slice(0, 20);

  const routes: MetadataRoute.Sitemap = [
    // Core pages (highest priority)
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/service-areas`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },

    // All service pages (11 pages) - HIGH PRIORITY
    ...appliances.map((appliance) => ({
      url: `${baseUrl}/services/${appliance.slug}-repair`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),

    // Top 50 city pages (major cities)
    ...topCities.map((city) => ({
      url: `${baseUrl}/cities/${city.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),

    // Top 20 brand pages
    ...topBrands.map((brand) => ({
      url: `${baseUrl}/brands/${brand.slug}-repair`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    // Commercial page
    {
      url: `${baseUrl}/commercial`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // Legal pages (low priority, but included)
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: '2025-12-01T00:00:00.000Z',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-use`,
      lastModified: '2025-12-01T00:00:00.000Z',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${route.url}</loc>
    <lastmod>${route.lastModified}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
