// Edge Middleware for Google Ads Geolocation
// File: /middleware.ts (root of project)
// Purpose: Intercept ad traffic and rewrite URLs to add city-specific path

import { NextRequest, NextResponse } from 'next/server';
import { geolocation } from '@vercel/edge';

export const config = {
  matcher: [
    '/services/:path*',
    '/brands/:path*',
  ],
};

// ============================================
// CITY MAPPING (Denver Metro Area - CO)
// ============================================
const CITY_NAME_TO_SLUG: Record<string, string> = {
  // Denver County
  'Denver': 'denver',

  // Arapahoe County
  'Aurora': 'aurora',
  'Centennial': 'centennial',
  'Englewood': 'englewood',
  'Littleton': 'littleton',
  'Greenwood Village': 'greenwood-village',
  'Cherry Hills Village': 'cherry-hills-village',
  'Sheridan': 'sheridan',
  'Glendale': 'glendale',

  // Jefferson County
  'Lakewood': 'lakewood',
  'Arvada': 'arvada',
  'Wheat Ridge': 'wheat-ridge',
  'Golden': 'golden',
  'Edgewater': 'edgewater',
  'Morrison': 'morrison',
  'Evergreen': 'evergreen',
  'Conifer': 'conifer',

  // Adams County
  'Westminster': 'westminster',
  'Thornton': 'thornton',
  'Northglenn': 'northglenn',
  'Federal Heights': 'federal-heights',
  'Commerce City': 'commerce-city',
  'Brighton': 'brighton',
  'Henderson': 'henderson',
  'Bennett': 'bennett',

  // Douglas County
  'Castle Rock': 'castle-rock',
  'Highlands Ranch': 'highlands-ranch',
  'Parker': 'parker',
  'Lone Tree': 'lone-tree',
  'Castle Pines': 'castle-pines',
  'Roxborough': 'roxborough',

  // Boulder County
  'Boulder': 'boulder',
  'Broomfield': 'broomfield',
  'Louisville': 'louisville',
  'Lafayette': 'lafayette',
  'Superior': 'superior',
  'Erie': 'erie',
  'Longmont': 'longmont',
  'Niwot': 'niwot',

  // Weld County
  'Frederick': 'frederick',
  'Firestone': 'firestone',
  'Dacono': 'dacono',

  // Elbert County
  'Elizabeth': 'elizabeth',
  'Kiowa': 'kiowa',
};

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const utmSource = searchParams.get('utm_source');
  const utmMedium = searchParams.get('utm_medium');

  // If NOT ad traffic → pass through
  if (utmSource !== 'google' || utmMedium !== 'cpc') {
    return NextResponse.next();
  }

  const geo = geolocation(request);
  const cityName = geo.city;

  console.log('[GEO-MIDDLEWARE] Detected location:', {
    city: cityName,
    region: geo.region,
    country: geo.country,
  });

  // Default to Denver if no city detected
  if (!cityName) {
    console.log('[GEO-MIDDLEWARE] No city detected, using Denver as default');
    const url = request.nextUrl.clone();

    if (pathname.match(/^\/services\/.+/)) {
      const servicePath = pathname.replace('/services/', '');
      url.pathname = `/cities/denver/services/${servicePath}`;
      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  }

  let citySlug = CITY_NAME_TO_SLUG[cityName];

  // Try case-insensitive if not found
  if (!citySlug) {
    const cityNameLower = cityName.toLowerCase();
    const matchedKey = Object.keys(CITY_NAME_TO_SLUG).find(
      key => key.toLowerCase() === cityNameLower
    );
    if (matchedKey) {
      citySlug = CITY_NAME_TO_SLUG[matchedKey];
    }
  }

  // If city not found → use Denver as default
  if (!citySlug) {
    console.log('[GEO-MIDDLEWARE] City not in service area, using Denver as default');
    citySlug = 'denver';
  }

  let newPathname = pathname;

  // Pattern 1: /services/[appliance]-repair → /cities/[city]/services/[appliance]-repair
  if (pathname.match(/^\/services\/.+/)) {
    const servicePath = pathname.replace('/services/', '');
    newPathname = `/cities/${citySlug}/services/${servicePath}`;
  }

  // Pattern 2: /brands/[brand]/services/[appliance]-repair
  else if (pathname.match(/^\/brands\/[^\/]+\/services\/.+/)) {
    const brandAndService = pathname.replace('/brands/', '');
    const [brand, , ...rest] = brandAndService.split('/');
    const servicePath = rest.join('/');
    newPathname = `/cities/${citySlug}/brands/${brand}/services/${servicePath}`;
  }

  if (newPathname === pathname) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = newPathname;

  console.log('[GEO-MIDDLEWARE] Rewrite:', {
    from: pathname,
    to: newPathname,
    city: cityName,
    slug: citySlug,
  });

  return NextResponse.rewrite(url);
}
