/**
 * Canonical URL Utilities
 * Prevents duplicate content issues by specifying the preferred URL
 */

const BASE_URL = 'https://www.h-prime-co.com';

/**
 * Generate canonical URL for a path
 */
export function getCanonicalUrl(path: string): string {
  // Remove trailing slash (except for root)
  const cleanPath = path === '/' ? path : path.replace(/\/$/, '');
  
  // Remove query parameters
  const pathWithoutQuery = cleanPath.split('?')[0];
  
  return `${BASE_URL}${pathWithoutQuery}`;
}

/**
 * Generate canonical metadata for Next.js
 */
export function generateCanonicalMetadata(path: string) {
  return {
    alternates: {
      canonical: getCanonicalUrl(path),
    },
  };
}

/**
 * Generate Open Graph metadata
 */
interface OpenGraphOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
}

export function generateOpenGraphMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
}: OpenGraphOptions) {
  const url = getCanonicalUrl(path);
  const ogImage = image || '/og-image.jpg';

  return {
    openGraph: {
      title,
      description,
      url,
      siteName: 'H-Prime Appliance Repair Services',
      images: [
        {
          url: `${BASE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}${ogImage}`],
    },
  };
}

/**
 * Generate full SEO metadata (canonical + OG + Twitter)
 */
interface SEOMetadataOptions extends OpenGraphOptions {
  keywords?: string[];
  noindex?: boolean;
}

export function generateSEOMetadata({
  title,
  description,
  path,
  image,
  type,
  keywords,
  noindex = false,
}: SEOMetadataOptions) {
  return {
    title,
    description,
    ...(keywords && { keywords: keywords.join(', ') }),
    ...(noindex && { robots: 'noindex, follow' }),
    ...generateCanonicalMetadata(path),
    ...generateOpenGraphMetadata({ title, description, path, image, type }),
  };
}
