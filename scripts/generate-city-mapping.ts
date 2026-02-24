// Script to generate full CITY_NAME_TO_SLUG mapping for middleware.ts
// Run: npx tsx scripts/generate-city-mapping.ts

import { cities } from '../lib/data/cities';

const mapping: Record<string, string> = {};

cities.forEach(city => {
  mapping[city.name] = city.slug;
});

console.log('// Auto-generated city mapping from cities.ts');
console.log('// Total cities:', cities.length);
console.log('const CITY_NAME_TO_SLUG: Record<string, string> = {');

Object.entries(mapping)
  .sort(([a], [b]) => a.localeCompare(b))
  .forEach(([name, slug]) => {
    console.log(`  '${name}': '${slug}',`);
  });

console.log('};');
