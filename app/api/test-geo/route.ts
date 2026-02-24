// API route for geolocation testing
// Edge Runtime for fast IP-based geolocation

import { geolocation } from '@vercel/edge';
import { NextRequest, NextResponse } from 'next/server';
import { cities } from '@/lib/data/cities';

export const runtime = 'edge';

// Build city mapping
const buildCityMapping = () => {
  const mapping: Record<string, string> = {};
  cities.forEach(city => {
    mapping[city.name] = city.slug;
  });
  return mapping;
};

const CITY_NAME_TO_SLUG = buildCityMapping();

export async function GET(request: NextRequest) {
  // Get geolocation from Vercel Edge
  const geo = geolocation(request);
  
  const cityName = geo.city;
  const region = geo.region;
  const country = geo.country;
  
  // Try to map city to slug (NO REGION CHECK!)
  let citySlug: string | null = null;
  let cityFound = false;
  let searchAttempts: string[] = [];
  
  if (cityName) {
    // Direct lookup
    searchAttempts.push(`Direct: "${cityName}"`);
    citySlug = CITY_NAME_TO_SLUG[cityName] || null;
    
    // If not found, try case-insensitive
    if (!citySlug) {
      const cityNameLower = cityName.toLowerCase();
      searchAttempts.push(`Case-insensitive: "${cityNameLower}"`);
      const matchedKey = Object.keys(CITY_NAME_TO_SLUG).find(
        key => key.toLowerCase() === cityNameLower
      );
      if (matchedKey) {
        citySlug = CITY_NAME_TO_SLUG[matchedKey];
        searchAttempts.push(`✅ Found via: "${matchedKey}"`);
      }
    } else {
      searchAttempts.push(`✅ Found direct match`);
    }
    
    // Validate city exists in database
    if (citySlug) {
      cityFound = cities.some(c => c.slug === citySlug);
    }
  }
  
  // Get matching cities from database for debugging
  const allTestCities = cities.filter(c => c.county === 'TEST');
  const telAvivCities = cities.filter(c => 
    c.name.toLowerCase().includes('tel aviv') || 
    c.name.toLowerCase().includes('telaviv')
  );
  
  // Build test URLs
  const baseUrl = request.nextUrl.origin;
  const testUrls = {
    basic: `${baseUrl}/services/refrigerator-repair?utm_source=google&utm_medium=cpc&utm_campaign=test`,
    withBrand: `${baseUrl}/brands/samsung/services/refrigerator-repair?utm_source=google&utm_medium=cpc&utm_campaign=test`,
    noBrand: `${baseUrl}/services/dryer-repair?utm_source=google&utm_medium=cpc&utm_campaign=test`,
  };
  
  // Return debug data
  return NextResponse.json({
    city: cityName || null,
    region: region || null,
    country: country || null,
    citySlug,
    cityFound,
    timestamp: new Date().toISOString(),
    requestUrl: request.url,
    testUrls,
    // DEBUG INFO
    debug: {
      searchAttempts,
      totalCitiesInDatabase: cities.length,
      testCitiesCount: allTestCities.length,
      testCities: allTestCities.map(c => ({ name: c.name, slug: c.slug })),
      telAvivMatches: telAvivCities.map(c => ({ name: c.name, slug: c.slug })),
      cityNameInMapping: cityName ? (cityName in CITY_NAME_TO_SLUG) : false,
      mappingKeys: Object.keys(CITY_NAME_TO_SLUG).filter(k => 
        k.toLowerCase().includes('tel') || k.toLowerCase().includes('aviv')
      ),
    }
  });
}
