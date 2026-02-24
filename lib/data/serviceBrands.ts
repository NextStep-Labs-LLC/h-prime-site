// Mapping of appliances to brands that manufacture them
export const applianceBrandMapping: Record<string, string[]> = {
  'refrigerator': ['whirlpool', 'lg', 'samsung', 'ge-appliances', 'ge-profile', 'frigidaire', 'kitchenaid', 'maytag', 'bosch', 'electrolux', 'kenmore', 'amana', 'sub-zero', 'thermador', 'viking', 'jenn-air', 'haier', 'cafe', 'monogram', 'fisher-paykel', 'liebherr', 'marvel', 'true-residential', 'dacor'],
  'washer': ['whirlpool', 'lg', 'samsung', 'ge-appliances', 'ge-profile', 'maytag', 'bosch', 'electrolux', 'kenmore', 'amana', 'frigidaire', 'speed-queen', 'kitchenaid', 'haier', 'cafe', 'fisher-paykel', 'asko', 'bertazzoni', 'miele'],
  'dryer': ['whirlpool', 'lg', 'samsung', 'ge-appliances', 'ge-profile', 'maytag', 'bosch', 'electrolux', 'kenmore', 'amana', 'frigidaire', 'speed-queen', 'kitchenaid', 'haier', 'cafe', 'fisher-paykel', 'asko', 'bertazzoni', 'miele'],
  'dishwasher': ['whirlpool', 'lg', 'samsung', 'ge-appliances', 'ge-profile', 'bosch', 'kitchenaid', 'maytag', 'frigidaire', 'electrolux', 'kenmore', 'amana', 'thermador', 'miele', 'viking', 'jenn-air', 'cafe', 'fisher-paykel', 'asko', 'bertazzoni', 'dacor', 'gaggenau'],
  'oven': ['whirlpool', 'lg', 'samsung', 'ge-appliances', 'ge-profile', 'frigidaire', 'kitchenaid', 'maytag', 'bosch', 'electrolux', 'kenmore', 'amana', 'thermador', 'viking', 'jenn-air', 'wolf', 'cafe', 'monogram', 'fisher-paykel', 'bertazzoni', 'dacor', 'gaggenau', 'bluestar', 'capital', 'dcs', 'lynx'],
  'oven/stove': ['whirlpool', 'lg', 'samsung', 'ge-appliances', 'ge-profile', 'frigidaire', 'kitchenaid', 'maytag', 'bosch', 'electrolux', 'kenmore', 'amana', 'thermador', 'viking', 'jenn-air', 'wolf', 'cafe', 'monogram', 'fisher-paykel', 'bertazzoni', 'dacor', 'gaggenau', 'bluestar', 'capital', 'dcs', 'lynx'],
  'range': ['whirlpool', 'lg', 'samsung', 'ge-appliances', 'ge-profile', 'frigidaire', 'kitchenaid', 'maytag', 'bosch', 'electrolux', 'kenmore', 'amana', 'thermador', 'viking', 'jenn-air', 'wolf', 'cafe', 'monogram', 'fisher-paykel', 'bertazzoni', 'dacor', 'gaggenau', 'bluestar', 'capital', 'dcs', 'lynx', 'summit'],
  'cooktop': ['whirlpool', 'lg', 'samsung', 'ge-appliances', 'ge-profile', 'frigidaire', 'kitchenaid', 'maytag', 'bosch', 'electrolux', 'kenmore', 'amana', 'thermador', 'viking', 'jenn-air', 'wolf', 'cafe', 'monogram', 'fisher-paykel', 'bertazzoni', 'dacor', 'gaggenau', 'bluestar', 'miele'],
  'microwave': ['whirlpool', 'lg', 'samsung', 'ge-appliances', 'ge-profile', 'frigidaire', 'kitchenaid', 'maytag', 'bosch', 'electrolux', 'kenmore', 'amana', 'sharp', 'panasonic', 'cafe', 'haier'],
  'freezer': ['whirlpool', 'lg', 'samsung', 'ge-appliances', 'ge-profile', 'frigidaire', 'kitchenaid', 'maytag', 'kenmore', 'amana', 'sub-zero', 'thermador', 'haier', 'summit', 'danby', 'avanti', 'midea'],
  'ice-maker': ['whirlpool', 'lg', 'samsung', 'ge-appliances', 'ge-profile', 'frigidaire', 'kitchenaid', 'maytag', 'kenmore', 'scotsman', 'manitowoc', 'u-line', 'marvel'],
  'range-hood': ['whirlpool', 'ge-appliances', 'frigidaire', 'kitchenaid', 'maytag', 'bosch', 'broan', 'zephyr', 'thermador', 'viking', 'dacor', 'lynx', 'best', 'elica'],
  'double-oven': ['whirlpool', 'lg', 'samsung', 'ge-appliances', 'ge-profile', 'bosch', 'kitchenaid', 'frigidaire', 'thermador', 'wolf', 'viking', 'jenn-air', 'cafe', 'monogram', 'electrolux', 'fisher-paykel', 'bertazzoni', 'dacor', 'gaggenau', 'miele', 'bluestar'],
  'garbage-disposal': ['insinkerator', 'ge-appliances', 'whirlpool', 'kitchenaid', 'waste-king', 'moen'],
  'trash-compactor': ['whirlpool', 'ge-appliances', 'kitchenaid', 'broan'],
  'wine-cooler': ['sub-zero', 'u-line', 'marvel', 'thermador', 'viking', 'samsung', 'lg', 'whirlpool', 'kitchenaid', 'ge-appliances', 'frigidaire', 'haier', 'dacor', 'electrolux', 'avanti', 'danby', 'summit'],
};

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

