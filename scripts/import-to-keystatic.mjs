import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import data from lib/data
const appliances = [
  { slug: 'refrigerator', name: 'Refrigerator', title: 'Refrigerator Repair', description: 'Expert refrigerator repair services in New Jersey', services: ['Not cooling properly', 'Ice maker not working', 'Water dispenser issues', 'Strange noises', 'Leaking water', 'Door seal replacement', 'Compressor repair', 'Thermostat issues'] },
  { slug: 'washer', name: 'Washer', title: 'Washer Repair', description: 'Professional washer repair services', services: ['Won\'t spin or drain', 'Leaking water', 'Won\'t turn on', 'Making loud noises', 'Door won\'t lock', 'Not dispensing detergent', 'Unbalanced load issues', 'Control panel problems'] },
  { slug: 'dryer', name: 'Dryer', title: 'Dryer Repair', description: 'Fast and reliable dryer repair', services: ['Not heating', 'Won\'t start', 'Takes too long to dry', 'Making unusual noises', 'Door won\'t stay closed', 'Vent cleaning', 'Thermostat replacement', 'Belt replacement'] },
  { slug: 'dishwasher', name: 'Dishwasher', title: 'Dishwasher Repair', description: 'Dishwasher repair and maintenance', services: ['Not cleaning dishes', 'Not draining', 'Leaking water', 'Not filling with water', 'Unusual noises', 'Door latch problems', 'Spray arm issues', 'Heating element repair'] },
  { slug: 'oven', name: 'Oven/Stove', title: 'Oven/Stove Repair', description: 'Oven and stove repair services', services: ['Not heating properly', 'Temperature issues', 'Door won\'t close', 'Self-cleaning problems', 'Igniter replacement', 'Thermostat repair', 'Control panel issues', 'Gas leak repair'] },
  { slug: 'range', name: 'Range', title: 'Range Repair', description: 'Range repair services', services: ['Burners not working', 'Oven not heating', 'Igniter problems', 'Temperature control issues', 'Gas smell', 'Electric element replacement', 'Control board repair', 'Door hinge problems'] },
  { slug: 'cooktop', name: 'Cooktop', title: 'Cooktop Repair', description: 'Cooktop repair and service', services: ['Burners not igniting', 'Electric elements not working', 'Control knob issues', 'Gas smell', 'Spark module problems', 'Surface scratches repair', 'Wiring issues', 'Touch control problems'] },
  { slug: 'freezer', name: 'Freezer', title: 'Freezer Repair', description: 'Freezer repair services', services: ['Not freezing', 'Too much frost buildup', 'Unusual noises', 'Door seal problems', 'Temperature fluctuations', 'Compressor issues', 'Defrost system repair', 'Ice buildup'] },
  { slug: 'range-hood', name: 'Range Hood', title: 'Range Hood Repair', description: 'Range hood repair and maintenance', services: ['Fan not working', 'Light not working', 'Poor ventilation', 'Unusual noises', 'Filter replacement', 'Motor issues', 'Control switch problems', 'Duct cleaning'] },
  { slug: 'ice-maker', name: 'Ice Maker', title: 'Ice Maker Repair', description: 'Ice maker repair services', services: ['Not making ice', 'Slow ice production', 'Ice tastes bad', 'Water leak', 'Ice cubes too small', 'Dispenser issues', 'Water filter replacement', 'Valve problems'] },
  { slug: 'coffee-machine', name: 'Coffee Machine', title: 'Coffee Machine Repair', description: 'Coffee machine repair services', services: ['Not brewing', 'Water not heating', 'Leaking water', 'Grinder not working', 'Milk frother issues', 'Descaling needed', 'Display problems', 'Pump issues'] },
];

const cities = [
  { slug: 'newark', name: 'Newark', county: 'Essex', zipCodes: ['07102', '07103', '07104', '07105', '07106', '07107', '07108', '07112', '07114'] },
  { slug: 'jersey-city', name: 'Jersey City', county: 'Hudson', zipCodes: ['07302', '07304', '07305', '07306', '07307', '07310'] },
  { slug: 'paterson', name: 'Paterson', county: 'Passaic', zipCodes: ['07501', '07502', '07503', '07504', '07505', '07522', '07524'] },
  { slug: 'elizabeth', name: 'Elizabeth', county: 'Union', zipCodes: ['07201', '07202', '07206', '07208'] },
  { slug: 'edison', name: 'Edison', county: 'Middlesex', zipCodes: ['08817', '08820', '08837', '08899'] },
  { slug: 'clifton', name: 'Clifton', county: 'Passaic', zipCodes: ['07011', '07012', '07013', '07014'] },
  { slug: 'trenton', name: 'Trenton', county: 'Mercer', zipCodes: ['08608', '08609', '08610', '08611', '08618', '08619', '08629', '08638'] },
  { slug: 'camden', name: 'Camden', county: 'Camden', zipCodes: ['08101', '08102', '08103', '08104', '08105'] },
];

const contentDir = join(__dirname, '..', 'content');

// Create appliances
appliances.forEach(appliance => {
  const dir = join(contentDir, 'appliances', appliance.slug);
  mkdirSync(dir, { recursive: true });
  
  const yaml = `name: ${appliance.slug}
title: ${appliance.title}
description: ${appliance.description}
services:
${appliance.services.map(s => `  - ${s.replace(/'/g, "''")}`).join('\n')}
icon: Wrench
`;
  
  writeFileSync(join(dir, 'index.yaml'), yaml);
  console.log(`✅ Created appliance: ${appliance.name}`);
});

// Create cities
cities.forEach(city => {
  const dir = join(contentDir, 'cities', city.slug);
  mkdirSync(dir, { recursive: true });
  
  const yaml = `name: ${city.slug}
displayName: ${city.name}
county: ${city.county}
zipCodes:
${city.zipCodes.map(z => `  - '${z}'`).join('\n')}
`;
  
  writeFileSync(join(dir, 'index.yaml'), yaml);
  console.log(`✅ Created city: ${city.name}`);
});

console.log('\n🎉 Import complete! Now you can add brands manually via /keystatic');


