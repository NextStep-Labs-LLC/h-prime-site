import { MetadataRoute } from 'next';
import { appliances } from '@/lib/data/appliances';
import { brands } from '@/lib/data/brands';
import { cities } from '@/lib/data/cities';

/**
 * PHASE 2 SITEMAP (Month 3-4)
 * ~1,500 pages: All cities, City+Appliance for top 50 cities, All brands
 * 
 * Strategy: Submit after Phase 1 is 90%+ indexed
 * Focus on local expansion
 */
export async function GET() {
  const baseUrl = 'https://www.h-prime-co.com';
  const now = new Date().toISOString();

  // Top 50 cities for City+Appliance combinations
  const topCities = cities.slice(0, 50);

  const routes: MetadataRoute.Sitemap = [
    // All remaining city pages (312 pages: cities 51-362)
    ...cities.slice(50).map((city) => ({
      url: `${baseUrl}/cities/${city.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })),

    // All remaining brand pages (50 pages: brands 21-70)
    ...brands.slice(20).map((brand) => ({
      url: `${baseUrl}/brands/${brand.slug}-repair`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),

    // City + Appliance for TOP 50 cities (550 pages)
    ...topCities.flatMap((city) =>
      appliances.map((appliance) => ({
        url: `${baseUrl}/cities/${city.slug}/services/${appliance.slug}-repair`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.85,
      }))
    ),
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
