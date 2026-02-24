import { Metadata } from 'next';

interface SEOParams {
  city?: string;
  appliance?: string;
  brand?: string;
  county?: string;
}

const SITE_NAME = 'H-Prime Appliance Repair Services';
const SITE_URL = 'https://h-prime.vercel.app';
const PHONE = '(720) 784-6766';

export function generatePageMetadata(params: SEOParams): Metadata {
  const { city, appliance, brand, county } = params;

  let title = '';
  let description = '';

  if (city && brand && appliance) {
    const cityName = formatCityName(city);
    const brandName = formatBrandName(brand);
    const applianceName = formatApplianceName(appliance);
    title = `Expert ${brandName} ${applianceName} Repair in ${cityName}, CO | Same-Day Service`;
    description = `Professional ${brandName} ${applianceName} repair in ${cityName}, CO. Certified technicians, same-day service, upfront pricing. Call ${PHONE} for ${brandName} appliance repairs!`;
  } else if (city && brand) {
    const cityName = formatCityName(city);
    const brandName = formatBrandName(brand);
    title = `${brandName} Appliance Repair in ${cityName}, CO | Expert ${brandName} Service`;
    description = `Trusted ${brandName} appliance repair in ${cityName}, CO. Factory-trained technicians for all ${brandName} appliances. Same-day service available. Call ${PHONE} now!`;
  } else if (city && appliance) {
    const cityName = formatCityName(city);
    const applianceName = formatApplianceName(appliance);
    title = `${cityName} ${applianceName} Repair | Same-Day Service | ${SITE_NAME}`;
    description = `Expert ${applianceName} repair in ${cityName}, CO. Same-day service, certified technicians, upfront pricing. Call ${PHONE} for professional ${applianceName} repair!`;
  } else if (brand && appliance) {
    const brandName = formatBrandName(brand);
    const applianceName = formatApplianceName(appliance);
    title = `${brandName} ${applianceName} Repair Denver Metro | Expert ${brandName} Service`;
    description = `Professional ${brandName} ${applianceName} repair in the Denver Metro area. Factory-trained technicians, same-day service. Call ${PHONE}!`;
  } else if (city) {
    const cityName = formatCityName(city);
    title = `Appliance Repair ${cityName}, CO | Same-Day Service | ${SITE_NAME}`;
    description = `Professional appliance repair in ${cityName}, CO. Expert service for refrigerators, washers, dryers, ovens & more. Same-day service available. Call ${PHONE}!`;
  } else if (brand) {
    const brandName = formatBrandName(brand);
    title = `${brandName} Appliance Repair Denver Metro | ${SITE_NAME}`;
    description = `Expert ${brandName} appliance repair across the Denver Metro area. Factory-trained technicians, all major ${brandName} appliances. Same-day service. Call ${PHONE}!`;
  } else if (appliance) {
    const applianceName = formatApplianceName(appliance);
    title = `${applianceName} Repair Denver Metro | Same-Day Service | ${SITE_NAME}`;
    description = `Expert ${applianceName} repair in the Denver Metro area. Certified technicians, same-day service, all major brands. Call ${PHONE} for professional ${applianceName} repair!`;
  } else {
    title = `${SITE_NAME} | Expert Appliance Repair in Denver, CO`;
    description = `Professional appliance repair in the Denver Metro area. Same-day service, certified technicians, $69 diagnostic fee. Repair all major brands - refrigerators, washers, dryers & more. Call ${PHONE}!`;
  }

  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      type: 'website',
      locale: 'en_US',
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    alternates: {
      canonical: buildCanonicalUrl(params),
    },
  };
}

function formatCityName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatBrandName(slug: string): string {
  const brandMap: { [key: string]: string } = {
    'lg': 'LG',
    'ge': 'GE',
    'kitchenaid': 'KitchenAid',
    'sub-zero': 'Sub-Zero',
    'jennair': 'JennAir',
    'u-line': 'U-Line',
    'fisher-paykel': 'Fisher & Paykel',
    'ice-o-matic': 'Ice-O-Matic',
    'black-decker': 'Black & Decker',
  };

  if (brandMap[slug]) return brandMap[slug];

  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatApplianceName(slug: string): string {
  const applianceMap: { [key: string]: string } = {
    'refrigerator': 'Refrigerator',
    'washer': 'Washer',
    'dryer': 'Dryer',
    'dishwasher': 'Dishwasher',
    'oven': 'Oven',
    'cooktop': 'Cooktop',
    'freezer': 'Freezer',
    'garbage-disposal': 'Garbage Disposal',
    'gas-dryer': 'Gas Dryer',
    'grill': 'Grill & BBQ',
    'ice-machine': 'Ice Machine',
    'microwave': 'Microwave',
    'vent-hood': 'Vent Hood',
    'wine-cooler': 'Wine Cooler',
    'trash-compactor': 'Trash Compactor',
  };

  return applianceMap[slug] || slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function buildCanonicalUrl(params: SEOParams): string {
  const { city, appliance, brand } = params;

  let path = '';

  if (city && brand && appliance) {
    path = `/${city}/${brand}/${appliance}-repair`;
  } else if (city && brand) {
    path = `/${city}/${brand}-repair`;
  } else if (city && appliance) {
    path = `/${city}/${appliance}-repair`;
  } else if (brand && appliance) {
    path = `/${brand}/${appliance}-repair`;
  } else if (city) {
    path = `/${city}`;
  } else if (brand) {
    path = `/${brand}-repair`;
  } else if (appliance) {
    path = `/${appliance}-repair`;
  } else {
    path = '/';
  }

  return `${SITE_URL}${path}`;
}
