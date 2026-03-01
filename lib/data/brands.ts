// H-Prime Appliance Repair - Brand list
// Source: h-prime-co.com brand pages
// All logos downloaded as SVG from original site

export const FEATURED_BRANDS = [
  'whirlpool', 'lg', 'bosch', 'maytag',
  'frigidaire', 'kitchenaid', 'ge', 'electrolux', 'sub-zero',
  'thermador', 'viking', 'wolf', 'miele', 'jennair',
  'fisher-paykel', 'speed-queen', 'panasonic', 'hotpoint', 'sharp'
];

export interface Brand {
  slug: string;
  name: string;
  logo?: string;
}

export const brands: Brand[] = [
  // Top 20 Featured Brands
  { slug: 'whirlpool', name: 'Whirlpool', logo: '/brands/whirlpool.svg' },
  { slug: 'lg', name: 'LG', logo: '/brands/lg.svg' },
  { slug: 'bosch', name: 'Bosch', logo: '/brands/bosch.svg' },
  { slug: 'maytag', name: 'Maytag', logo: '/brands/maytag.svg' },
  { slug: 'frigidaire', name: 'Frigidaire', logo: '/brands/frigidaire.svg' },
  { slug: 'kitchenaid', name: 'KitchenAid', logo: '/brands/kitchenaid.svg' },
  { slug: 'ge', name: 'GE', logo: '/brands/ge.svg' },
  { slug: 'electrolux', name: 'Electrolux', logo: '/brands/electrolux.svg' },
  { slug: 'sub-zero', name: 'Sub-Zero', logo: '/brands/sub-zero.svg' },
  { slug: 'thermador', name: 'Thermador', logo: '/brands/thermador.svg' },
  { slug: 'viking', name: 'Viking', logo: '/brands/viking.svg' },
  { slug: 'wolf', name: 'Wolf', logo: '/brands/wolf.svg' },
  { slug: 'miele', name: 'Miele', logo: '/brands/miele.svg' },
  { slug: 'jennair', name: 'JennAir', logo: '/brands/jennair.svg' },
  { slug: 'fisher-paykel', name: 'Fisher & Paykel', logo: '/brands/fisher-paykel.svg' },
  { slug: 'speed-queen', name: 'Speed Queen', logo: '/brands/speed-queen.svg' },
  { slug: 'panasonic', name: 'Panasonic', logo: '/brands/panasonic.svg' },
  { slug: 'hotpoint', name: 'Hotpoint', logo: '/brands/hotpoint.svg' },
  { slug: 'sharp', name: 'Sharp', logo: '/brands/sharp.svg' },

  // Other brands (alphabetically) - from H-Prime site
  { slug: 'alfresco', name: 'Alfresco', logo: '/brands/alfresco.svg' },
  { slug: 'amana', name: 'Amana', logo: '/brands/amana.svg' },
  { slug: 'ariston', name: 'Ariston', logo: '/brands/ariston.svg' },
  { slug: 'asko', name: 'ASKO', logo: '/brands/asko.svg' },
  { slug: 'badger', name: 'Badger', logo: '/brands/badger.svg' },
  { slug: 'bertazzoni', name: 'Bertazzoni', logo: '/brands/bertazzoni.svg' },
  { slug: 'black-decker', name: 'Black & Decker', logo: '/brands/black-decker.svg' },
  { slug: 'capital', name: 'Capital', logo: '/brands/capital.svg' },
  { slug: 'carrier', name: 'Carrier', logo: '/brands/carrier.svg' },
  { slug: 'commercial-chef', name: 'Commercial Chef', logo: '/brands/commercial-chef.svg' },
  { slug: 'cove', name: 'Cove', logo: '/brands/cove.svg' },
  { slug: 'dacor', name: 'Dacor', logo: '/brands/dacor.svg' },
  { slug: 'danby', name: 'Danby', logo: '/brands/danby.svg' },
  { slug: 'dynasty', name: 'Dynasty', logo: '/brands/dynasty.svg' },
  { slug: 'emerson', name: 'Emerson', logo: '/brands/emerson.svg' },
  { slug: 'equator', name: 'Equator', logo: '/brands/equator.svg' },
  { slug: 'faber', name: 'Faber', logo: '/brands/faber.svg' },
  { slug: 'friedrich', name: 'Friedrich', logo: '/brands/friedrich.svg' },
  { slug: 'garland', name: 'Garland', logo: '/brands/garland.svg' },
  { slug: 'haier', name: 'Haier', logo: '/brands/haier.svg' },
  { slug: 'hoshizaki', name: 'Hoshizaki', logo: '/brands/hoshizaki.svg' },
  { slug: 'ice-o-matic', name: 'Ice-O-Matic', logo: '/brands/ice-o-matic.svg' },
  { slug: 'imperia', name: 'Imperia', logo: '/brands/imperia.svg' },
  { slug: 'jura', name: 'Jura', logo: '/brands/jura.svg' },
  { slug: 'liebherr', name: 'Liebherr', logo: '/brands/liebherr.svg' },
  { slug: 'lynx', name: 'Lynx', logo: '/brands/lynx.svg' },
  { slug: 'marcato', name: 'Marcato', logo: '/brands/marcato.svg' },
  { slug: 'monogram', name: 'Monogram', logo: '/brands/monogram.svg' },
  { slug: 'roper', name: 'Roper', logo: '/brands/roper.svg' },
  { slug: 'saeco', name: 'Saeco', logo: '/brands/saeco.svg' },
  { slug: 'scotsman', name: 'Scotsman', logo: '/brands/scotsman.svg' },
  { slug: 'siemens', name: 'Siemens', logo: '/brands/siemens.svg' },
  { slug: 'sirius', name: 'Sirius', logo: '/brands/sirius.svg' },
  { slug: 'smeg', name: 'Smeg', logo: '/brands/smeg.svg' },
  { slug: 'traulsen', name: 'Traulsen', logo: '/brands/traulsen.svg' },
  { slug: 'turbo-air', name: 'Turbo Air', logo: '/brands/turbo-air.svg' },
  { slug: 'u-line', name: 'U-Line', logo: '/brands/u-line.svg' },
  { slug: 'vinotemp', name: 'Vinotemp', logo: '/brands/vinotemp.svg' },
  { slug: 'vulcan', name: 'Vulcan', logo: '/brands/vulcan.svg' },
  { slug: 'westinghouse', name: 'Westinghouse', logo: '/brands/westinghouse.svg' },
  { slug: 'wine-enthusiast', name: 'Wine Enthusiast', logo: '/brands/wine-enthusiast.svg' },
  { slug: 'wine-guardian', name: 'Wine Guardian', logo: '/brands/wine-guardian.svg' },
  { slug: 'york', name: 'York', logo: '/brands/york.svg' },
  { slug: 'zephyr', name: 'Zephyr', logo: '/brands/zephyr.svg' },
];

export const getFeaturedBrands = () => brands.filter(b => FEATURED_BRANDS.includes(b.slug));
export const getOtherBrands = () => brands.filter(b => !FEATURED_BRANDS.includes(b.slug));
