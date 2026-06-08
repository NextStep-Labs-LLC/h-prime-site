// H-Prime business directory — powers the universal hub page at /start.
// One QR code on business cards / car branding leads here; visitors pick a service.
// To add a new business: append an entry below and flip `enabled` to true. No CMS, code-only.

export type Business = {
  /** Stable key used for analytics (hub_click event) */
  key: string;
  /** Lucide icon name, mapped to a component in HubCard */
  icon: 'WashingMachine' | 'Dumbbell' | 'Wind' | 'Building2';
  name: string;
  tagline: string;
  /** Destination site. Internal route ("/") or absolute URL for separate sites. */
  url: string;
  phone: string; // tel: value, E.164
  phoneDisplay: string;
  /** Hex accent for the card */
  accent: string;
  enabled: boolean;
};

export const BUSINESSES: Business[] = [
  {
    key: 'appliance',
    icon: 'WashingMachine',
    name: 'Appliance Repair',
    tagline: 'Refrigerators, washers, dryers, ovens & more — same-day service',
    url: 'https://www.h-prime-co.com',
    phone: '+17207846766',
    phoneDisplay: '(720) 784-6766',
    accent: '#1B2A4A',
    enabled: true,
  },
  {
    key: 'gym',
    icon: 'Dumbbell',
    name: 'Fitness Equipment Repair',
    tagline: 'Treadmills, ellipticals & gym machines — home and commercial',
    url: 'https://www.hprime-gym.com',
    phone: '+17207066650',
    phoneDisplay: '(720) 706-6650',
    accent: '#1B2A4A',
    enabled: true,
  },
  {
    key: 'vent-cleaning',
    icon: 'Wind',
    name: 'Air Duct & Vent Cleaning',
    tagline: 'Coming soon',
    url: '',
    phone: '',
    phoneDisplay: '',
    accent: '#64748B',
    enabled: false,
  },
  {
    key: 'commercial',
    icon: 'Building2',
    name: 'Commercial Repair',
    tagline: 'Coming soon',
    url: '',
    phone: '',
    phoneDisplay: '',
    accent: '#64748B',
    enabled: false,
  },
];
