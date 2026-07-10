// Mapping of appliances to brands that manufacture them.
// Slugs MUST match lib/data/appliances.ts and lib/data/brands.ts exactly —
// this mapping drives the brand lists on service pages, the appliance lists
// on brand pages, and the phase-3 sitemap (only real brand+appliance pairs).
export const applianceBrandMapping: Record<string, string[]> = {
  'refrigerator': ['whirlpool', 'samsung', 'lg', 'bosch', 'maytag', 'frigidaire', 'kitchenaid', 'ge', 'electrolux', 'sub-zero', 'thermador', 'viking', 'miele', 'jennair', 'fisher-paykel', 'hotpoint', 'amana', 'ariston', 'haier', 'liebherr', 'monogram', 'dacor', 'danby', 'smeg', 'siemens', 'equator', 'westinghouse', 'roper', 'traulsen', 'turbo-air', 'u-line', 'hoshizaki'],
  'washer': ['whirlpool', 'samsung', 'lg', 'bosch', 'maytag', 'frigidaire', 'kitchenaid', 'ge', 'electrolux', 'miele', 'fisher-paykel', 'speed-queen', 'hotpoint', 'amana', 'ariston', 'asko', 'haier', 'smeg', 'siemens', 'equator', 'westinghouse', 'roper'],
  'dryer': ['whirlpool', 'samsung', 'lg', 'bosch', 'maytag', 'frigidaire', 'kitchenaid', 'ge', 'electrolux', 'miele', 'fisher-paykel', 'speed-queen', 'hotpoint', 'amana', 'ariston', 'asko', 'haier', 'smeg', 'siemens', 'equator', 'westinghouse', 'roper'],
  'gas-dryer': ['whirlpool', 'samsung', 'lg', 'maytag', 'frigidaire', 'ge', 'electrolux', 'fisher-paykel', 'speed-queen', 'hotpoint', 'amana', 'westinghouse', 'roper'],
  'dishwasher': ['whirlpool', 'samsung', 'lg', 'bosch', 'maytag', 'frigidaire', 'kitchenaid', 'ge', 'electrolux', 'thermador', 'viking', 'miele', 'jennair', 'fisher-paykel', 'hotpoint', 'amana', 'ariston', 'asko', 'cove', 'dacor', 'smeg', 'siemens', 'sharp', 'equator', 'bertazzoni', 'monogram'],
  'oven': ['whirlpool', 'samsung', 'lg', 'bosch', 'maytag', 'frigidaire', 'kitchenaid', 'ge', 'electrolux', 'thermador', 'viking', 'wolf', 'miele', 'jennair', 'fisher-paykel', 'hotpoint', 'amana', 'ariston', 'dacor', 'monogram', 'smeg', 'siemens', 'bertazzoni', 'capital', 'garland', 'vulcan', 'dynasty', 'westinghouse', 'roper'],
  'cooktop': ['whirlpool', 'samsung', 'lg', 'bosch', 'maytag', 'frigidaire', 'kitchenaid', 'ge', 'electrolux', 'thermador', 'viking', 'wolf', 'miele', 'jennair', 'fisher-paykel', 'amana', 'dacor', 'monogram', 'smeg', 'siemens', 'bertazzoni', 'capital', 'garland', 'vulcan', 'westinghouse'],
  'microwave': ['whirlpool', 'samsung', 'lg', 'bosch', 'maytag', 'frigidaire', 'kitchenaid', 'ge', 'electrolux', 'thermador', 'viking', 'wolf', 'jennair', 'amana', 'sharp', 'panasonic', 'haier', 'danby', 'dacor', 'monogram', 'commercial-chef', 'emerson', 'black-decker', 'westinghouse'],
  'freezer': ['whirlpool', 'samsung', 'lg', 'maytag', 'frigidaire', 'kitchenaid', 'ge', 'electrolux', 'sub-zero', 'thermador', 'viking', 'miele', 'jennair', 'fisher-paykel', 'amana', 'haier', 'liebherr', 'monogram', 'danby', 'smeg', 'westinghouse', 'traulsen', 'turbo-air', 'u-line', 'hoshizaki'],
  'ice-machine': ['whirlpool', 'kitchenaid', 'ge', 'sub-zero', 'viking', 'jennair', 'monogram', 'scotsman', 'hoshizaki', 'ice-o-matic', 'u-line'],
  'wine-cooler': ['whirlpool', 'samsung', 'lg', 'kitchenaid', 'ge', 'frigidaire', 'electrolux', 'sub-zero', 'thermador', 'viking', 'miele', 'jennair', 'haier', 'liebherr', 'monogram', 'dacor', 'danby', 'smeg', 'u-line', 'vinotemp', 'wine-enthusiast', 'wine-guardian'],
  'vent-hood': ['whirlpool', 'samsung', 'lg', 'bosch', 'frigidaire', 'kitchenaid', 'ge', 'electrolux', 'thermador', 'viking', 'wolf', 'miele', 'jennair', 'fisher-paykel', 'dacor', 'monogram', 'bertazzoni', 'zephyr', 'faber', 'sirius', 'smeg'],
  'grill': ['viking', 'wolf', 'kitchenaid', 'monogram', 'alfresco', 'lynx', 'capital', 'dynasty'],
  'garbage-disposal': ['whirlpool', 'kitchenaid', 'ge', 'badger', 'emerson'],
  'trash-compactor': ['whirlpool', 'kitchenaid', 'ge', 'jennair'],
};
// Brands intentionally not mapped to any appliance page (no matching service):
// carrier, friedrich, york (HVAC), jura, saeco (coffee), imperia, marcato (pasta equipment)

// Get brands that manufacture a specific appliance
export const getBrandsForAppliance = (applianceSlug: string): string[] => {
  return applianceBrandMapping[applianceSlug] || [];
};

// Get appliances that a brand manufactures
export const getAppliancesForBrand = (brandSlug: string): string[] => {
  const appliances: string[] = [];
  for (const [appliance, brands] of Object.entries(applianceBrandMapping)) {
    if (brands.includes(brandSlug)) {
      appliances.push(appliance);
    }
  }
  return appliances;
};

// Check if a brand manufactures a specific appliance
export const checkBrandApplianceMatch = (brandSlug: string, applianceSlug: string): boolean => {
  const brands = applianceBrandMapping[applianceSlug];
  return brands ? brands.includes(brandSlug) : false;
};
