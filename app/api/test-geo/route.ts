import { NextRequest, NextResponse } from "next/server";
import { geolocation } from "@vercel/edge";
import { cities } from "@/lib/data/cities";

export const runtime = "edge";

const CITY_NAME_TO_SLUG: Record<string, string> = {};
for (const city of cities) {
  CITY_NAME_TO_SLUG[city.name] = city.slug;
}
// Test cities
CITY_NAME_TO_SLUG["Tel Aviv"] = "tel-aviv";
CITY_NAME_TO_SLUG["Tel Aviv-Yafo"] = "tel-aviv";
CITY_NAME_TO_SLUG["Holon"] = "holon";
CITY_NAME_TO_SLUG["Limassol"] = "limassol";

export function GET(request: NextRequest) {
  const geo = geolocation(request);
  const rawCityName = geo.city || null;
  const cityName = rawCityName ? decodeURIComponent(rawCityName) : null;

  let citySlug: string | null = null;
  let cityFound = false;

  if (cityName) {
    citySlug = CITY_NAME_TO_SLUG[cityName] || null;
    if (!citySlug) {
      const cityNameLower = cityName.toLowerCase();
      const matchedKey = Object.keys(CITY_NAME_TO_SLUG).find(
        (key) => key.toLowerCase() === cityNameLower
      );
      if (matchedKey) {
        citySlug = CITY_NAME_TO_SLUG[matchedKey] ?? null;
      }
    }
    if (citySlug) {
      cityFound = cities.some((c) => c.slug === citySlug);
    }
  }

  const testUrls = [
    `/services/refrigerator-repair?utm_source=google&utm_medium=cpc&utm_campaign=test`,
    `/services/washer-repair?utm_source=google&utm_medium=cpc&utm_campaign=test`,
    `/services/dryer-repair?utm_source=google&utm_medium=cpc&utm_campaign=test`,
    `/brands/samsung-repair/services/refrigerator-repair?utm_source=google&utm_medium=cpc&utm_campaign=test`,
  ];

  return NextResponse.json({
    city: cityName,
    slug: citySlug,
    cityFound,
    testUrls,
    debug: {
      geoCity: geo.city,
      geoRegion: geo.region,
      geoCountry: geo.country,
      geoLatitude: geo.latitude,
      geoLongitude: geo.longitude,
    },
  });
}
