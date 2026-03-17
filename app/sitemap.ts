import { MetadataRoute } from 'next';

/**
 * MAIN SITEMAP INDEX
 * Points to 3 phased sitemaps for gradual indexation
 * 
 * Phase 1: ~200 pages (Core + Top cities/brands)
 * Phase 2: ~1,500 pages (All cities + Local expansion)
 * Phase 3: ~4,200 pages (Full site)
 * 
 * Total: ~5,900 pages (down from 43,700)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.h-prime-co.com';

  // SITEMAP INDEX - Points to all 3 phased sitemaps
  const routes: MetadataRoute.Sitemap = [
    // Phase 1: Core pages, top cities, top brands (~200 pages)
    {
      url: `${baseUrl}/sitemap-phase1.xml`,
      lastModified: new Date(),
    },
    // Phase 2: All cities, City+Appliance for top 50 cities (~1,500 pages)
    {
      url: `${baseUrl}/sitemap-phase2.xml`,
      lastModified: new Date(),
    },
    // Phase 3: All City+Appliance, Brand+Appliance, Commercial (~4,200 pages)
    {
      url: `${baseUrl}/sitemap-phase3.xml`,
      lastModified: new Date(),
    },
  ];

  return routes;
}
