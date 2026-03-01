// Denver Metro Area cities - H-Prime Appliance Repair service area
// Service radius: ~30 miles from Denver, CO

export interface City {
  slug: string;
  name: string;
  county: string;
  zipCodes?: string[];
}

export const cities: City[] = [
  // Denver County
  { slug: 'denver', name: 'Denver', county: 'denver', zipCodes: ['80201', '80202', '80203', '80204', '80205', '80206', '80207', '80209', '80210', '80211', '80212', '80214', '80216', '80218', '80219', '80220', '80221', '80222', '80223', '80224', '80227', '80230', '80231', '80235', '80236', '80237', '80238', '80239', '80246', '80247', '80249', '80264'] },
  { slug: 'cherry-creek', name: 'Cherry Creek', county: 'denver', zipCodes: ['80206', '80209', '80246'] },
  { slug: 'stapleton', name: 'Stapleton / Central Park', county: 'denver', zipCodes: ['80238', '80239', '80249'] },
  { slug: 'lowry', name: 'Lowry', county: 'denver', zipCodes: ['80230', '80247'] },

  // Arapahoe County
  { slug: 'aurora', name: 'Aurora', county: 'arapahoe', zipCodes: ['80010', '80011', '80012', '80013', '80014', '80015', '80016', '80017', '80018', '80019'] },
  { slug: 'centennial', name: 'Centennial', county: 'arapahoe', zipCodes: ['80015', '80016', '80111', '80112', '80121', '80122'] },
  { slug: 'englewood', name: 'Englewood', county: 'arapahoe', zipCodes: ['80110', '80111', '80112', '80113'] },
  { slug: 'littleton', name: 'Littleton', county: 'arapahoe', zipCodes: ['80120', '80121', '80122', '80123', '80125', '80126', '80127', '80128', '80129', '80130'] },
  { slug: 'greenwood-village', name: 'Greenwood Village', county: 'arapahoe', zipCodes: ['80111', '80121'] },
  { slug: 'cherry-hills-village', name: 'Cherry Hills Village', county: 'arapahoe', zipCodes: ['80113'] },
  { slug: 'sheridan', name: 'Sheridan', county: 'arapahoe', zipCodes: ['80110'] },
  { slug: 'glendale', name: 'Glendale', county: 'arapahoe', zipCodes: ['80246'] },
  { slug: 'foxfield', name: 'Foxfield', county: 'arapahoe', zipCodes: ['80016'] },

  // Jefferson County
  { slug: 'lakewood', name: 'Lakewood', county: 'jefferson', zipCodes: ['80214', '80215', '80226', '80227', '80228', '80232', '80235'] },
  { slug: 'arvada', name: 'Arvada', county: 'jefferson', zipCodes: ['80001', '80002', '80003', '80004', '80005', '80006', '80007'] },
  { slug: 'wheat-ridge', name: 'Wheat Ridge', county: 'jefferson', zipCodes: ['80033', '80034'] },
  { slug: 'golden', name: 'Golden', county: 'jefferson', zipCodes: ['80401', '80402', '80403'] },
  { slug: 'morrison', name: 'Morrison', county: 'jefferson', zipCodes: ['80465'] },
  { slug: 'ken-caryl', name: 'Ken Caryl', county: 'jefferson', zipCodes: ['80127', '80128'] },

  // Adams County
  { slug: 'westminster', name: 'Westminster', county: 'adams', zipCodes: ['80003', '80020', '80021', '80023', '80030', '80031', '80234', '80260'] },
  { slug: 'thornton', name: 'Thornton', county: 'adams', zipCodes: ['80023', '80229', '80233', '80241', '80260', '80602'] },
  { slug: 'northglenn', name: 'Northglenn', county: 'adams', zipCodes: ['80233', '80234', '80241', '80260'] },
  { slug: 'federal-heights', name: 'Federal Heights', county: 'adams', zipCodes: ['80221', '80260'] },
  { slug: 'commerce-city', name: 'Commerce City', county: 'adams', zipCodes: ['80022', '80037', '80603', '80640'] },

  // Douglas County
  { slug: 'castle-rock', name: 'Castle Rock', county: 'douglas', zipCodes: ['80104', '80108', '80109'] },
  { slug: 'highlands-ranch', name: 'Highlands Ranch', county: 'douglas', zipCodes: ['80126', '80129', '80130', '80163'] },
  { slug: 'parker', name: 'Parker', county: 'douglas', zipCodes: ['80134', '80138'] },
  { slug: 'lone-tree', name: 'Lone Tree', county: 'douglas', zipCodes: ['80124', '80163'] },
  { slug: 'castle-pines', name: 'Castle Pines', county: 'douglas', zipCodes: ['80108'] },
  { slug: 'roxborough-park', name: 'Roxborough Park', county: 'douglas', zipCodes: ['80125'] },
  { slug: 'columbine-valley', name: 'Columbine Valley', county: 'douglas', zipCodes: ['80123'] },

  // Boulder County (Broomfield only)
  { slug: 'broomfield', name: 'Broomfield', county: 'boulder', zipCodes: ['80020', '80021', '80023', '80038'] },
];

export function getCitiesByCounty(county: string): City[] {
  return cities.filter(city => city.county === county);
}

export function getCityBySlug(slug: string): City | undefined {
  return cities.find(city => city.slug === slug);
}

export function getTotalCitiesCount(): number {
  return cities.length;
}
