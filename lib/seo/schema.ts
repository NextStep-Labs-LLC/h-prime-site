interface SchemaParams {
  city?: string;
  appliance?: string;
  brand?: string;
  county?: string;
}

const SITE_URL = 'https://h-prime.vercel.app';
const BUSINESS_NAME = 'H-Prime Appliance Repair Services';
const PHONE = '+17207846766';
const PHONE_DISPLAY = '(720) 784-6766';
const GOOGLE_RATING = 5.0;
const REVIEW_COUNT = 10;

export function generateLocalBusinessSchema(params: SchemaParams) {
  const { city, appliance, brand, county } = params;

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}#business`,
    name: BUSINESS_NAME,
    description: generateBusinessDescription(params),
    url: SITE_URL,
    telephone: PHONE,
    priceRange: '$$',
    image: `${SITE_URL}/logo-original.jpg`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: GOOGLE_RATING.toString(),
      reviewCount: REVIEW_COUNT.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Denver',
      addressRegion: 'CO',
      addressCountry: 'US',
    },
    areaServed: generateAreaServed(params),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '16:00',
      },
    ],
  };

  return schema;
}

export function generateServiceSchema(params: SchemaParams) {
  const { city, appliance, brand } = params;

  const serviceName = generateServiceName(params);
  const serviceDescription = generateServiceDescription(params);

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS_NAME,
      telephone: PHONE,
      url: SITE_URL,
    },
    areaServed: generateAreaServed(params),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${serviceName} Services`,
      itemListElement: generateServiceList(params),
    },
  };

  return schema;
}

export function generateBreadcrumbSchema(params: SchemaParams) {
  const { city, appliance, brand } = params;

  const items: any[] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
  ];

  let position = 2;

  if (city) {
    items.push({
      '@type': 'ListItem',
      position: position++,
      name: formatCityName(city),
      item: `${SITE_URL}/${city}`,
    });
  }

  if (brand && !appliance) {
    items.push({
      '@type': 'ListItem',
      position: position++,
      name: `${formatBrandName(brand)} Repair`,
      item: city ? `${SITE_URL}/${city}/${brand}-repair` : `${SITE_URL}/${brand}-repair`,
    });
  }

  if (appliance && !brand) {
    items.push({
      '@type': 'ListItem',
      position: position++,
      name: `${formatApplianceName(appliance)} Repair`,
      item: city ? `${SITE_URL}/${city}/${appliance}-repair` : `${SITE_URL}/${appliance}-repair`,
    });
  }

  if (brand && appliance) {
    items.push({
      '@type': 'ListItem',
      position: position++,
      name: `${formatBrandName(brand)} ${formatApplianceName(appliance)} Repair`,
      item: city
        ? `${SITE_URL}/${city}/${brand}/${appliance}-repair`
        : `${SITE_URL}/${brand}/${appliance}-repair`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

// Helper functions

function generateBusinessDescription(params: SchemaParams): string {
  const { city, appliance, brand } = params;

  if (city && brand && appliance) {
    return `Professional ${formatBrandName(brand)} ${formatApplianceName(appliance)} repair in ${formatCityName(city)}, CO. Same-day service, certified technicians.`;
  } else if (city && appliance) {
    return `Expert ${formatApplianceName(appliance)} repair in ${formatCityName(city)}, CO. Same-day service available.`;
  } else if (city) {
    return `Professional appliance repair services in ${formatCityName(city)}, CO. All major brands and appliances. Same-day service.`;
  } else {
    return `Expert appliance repair in the Denver Metro area. EPA certified, same-day service, $69 diagnostic fee for all major brands.`;
  }
}

function generateServiceName(params: SchemaParams): string {
  const { city, appliance, brand } = params;

  if (brand && appliance) {
    return `${formatBrandName(brand)} ${formatApplianceName(appliance)} Repair`;
  } else if (appliance) {
    return `${formatApplianceName(appliance)} Repair`;
  } else if (brand) {
    return `${formatBrandName(brand)} Appliance Repair`;
  } else {
    return 'Appliance Repair';
  }
}

function generateServiceDescription(params: SchemaParams): string {
  const { city, appliance, brand } = params;

  if (city && brand && appliance) {
    return `Professional ${formatBrandName(brand)} ${formatApplianceName(appliance)} repair services in ${formatCityName(city)}, CO. Factory-trained technicians, same-day service, upfront pricing.`;
  } else if (city && appliance) {
    return `Expert ${formatApplianceName(appliance)} repair in ${formatCityName(city)}, CO. Certified technicians, same-day service, all major brands.`;
  } else if (brand && appliance) {
    return `Professional ${formatBrandName(brand)} ${formatApplianceName(appliance)} repair in the Denver Metro area. Factory-trained technicians.`;
  } else {
    return `Professional appliance repair services in the Denver Metro area. All major brands and appliances. Same-day service available.`;
  }
}

function generateAreaServed(params: SchemaParams): any {
  const { city } = params;

  if (city) {
    return {
      '@type': 'City',
      name: formatCityName(city),
      containedInPlace: {
        '@type': 'State',
        name: 'Colorado',
        '@id': 'https://en.wikipedia.org/wiki/Colorado',
      },
    };
  } else {
    return {
      '@type': 'State',
      name: 'Colorado',
      '@id': 'https://en.wikipedia.org/wiki/Colorado',
    };
  }
}

function generateServiceList(params: SchemaParams): any[] {
  const { appliance } = params;

  if (appliance === 'refrigerator') {
    return [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Refrigerator Not Cooling' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ice Maker Repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Water Dispenser Repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Compressor Replacement' } },
    ];
  } else if (appliance === 'washer') {
    return [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Washer Won\'t Spin' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Washer Leaking' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Washer Not Draining' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Control Panel Repair' } },
    ];
  } else if (appliance === 'dryer') {
    return [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dryer Not Heating' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dryer Won\'t Start' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dryer Takes Too Long' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Belt Replacement' } },
    ];
  } else {
    return [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Appliance Diagnostic' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Appliance Repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Maintenance Service' } },
    ];
  }
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
