import { MetadataRoute } from 'next';
import { appliances } from '@/lib/data/appliances';
import { brands } from '@/lib/data/brands';
import { cities } from '@/lib/data/cities';

/**
 * PHASE 3 SITEMAP (Month 5-6)
 * ~4,200 pages: All City+Appliance, All Brand+Appliance
 * 
 * Strategy: Submit after Phase 2 is 80%+ indexed
 * Full site launch
 */
export async function GET() {
  const baseUrl = 'https://h-prime.vercel.app';
  const now = new Date().toISOString();

  // Remaining cities for City+Appliance (cities 51-362)
  const remainingCities = cities.slice(50);

  const routes: MetadataRoute.Sitemap = [
    // City + Appliance for remaining 312 cities (3,432 pages)
    ...remainingCities.flatMap((city) =>
      appliances.map((appliance) => ({
        url: `${baseUrl}/cities/${city.slug}/services/${appliance.slug}-repair`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.75,
      }))
    ),

    // Brand + Appliance for ALL brands (770 pages)
    ...brands.flatMap((brand) =>
      appliances.map((appliance) => ({
        url: `${baseUrl}/brands/${brand.slug}-repair/services/${appliance.slug}-repair`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
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
