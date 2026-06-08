// H-Prime business directory — powers the universal hub page at /start.
// One QR code on business cards / car branding leads here; visitors pick a service.
// To add a new business: append an entry below and flip `enabled` to true. No CMS, code-only.

export type Business = {
  /** Stable key used for analytics (hub_click event) */
  key: string;
  name: string;
  tagline: string;
  /** Thumbnail under /public, e.g. /assets/hub/appliance.jpg */
  image: string;
  /** Destination site. Absolute URL for separate sites. */
  url: string;
  phone: string; // tel: value, E.164
  phoneDisplay: string;
  /**
   * Show the Call button with the visible number.
   * Only true when this number's AWCC (call-conversion) tag is loaded on THIS site,
   * so calls are actually tracked. Appliance AWCC lives in the main-site GTM; the gym
   * number's AWCC lives in the separate gym GTM (not on this domain) — so gym = false.
   */
  showCall: boolean;
  /** Hex accent for the card */
  accent: string;
  enabled: boolean;
};

export const BUSINESSES: Business[] = [
  {
    key: 'appliance',
    name: 'Appliance Repair',
    tagline: 'Refrigerators, washers, dryers, ovens & more — same-day service',
    image: '/assets/hub/appliance.jpg',
    url: 'https://www.h-prime-co.com',
    phone: '+17207846766',
    phoneDisplay: '(720) 784-6766',
    showCall: true,
    accent: '#1B2A4A',
    enabled: true,
  },
  {
    key: 'gym',
    name: 'Fitness Equipment Repair',
    tagline: 'Treadmills, ellipticals & gym machines — home and commercial',
    image: '/assets/hub/gym.webp',
    url: 'https://www.hprime-gym.com',
    phone: '+17207066650',
    phoneDisplay: '(720) 706-6650',
    showCall: false, // gym AWCC is not on this domain; calls happen on hprime-gym.com
    accent: '#1B2A4A',
    enabled: true,
  },
  {
    key: 'vent-cleaning',
    name: 'Air Duct & Vent Cleaning',
    tagline: 'Coming soon',
    image: '/assets/hub/vent.jpg',
    url: '',
    phone: '',
    phoneDisplay: '',
    showCall: false,
    accent: '#64748B',
    enabled: false,
  },
  {
    key: 'commercial',
    name: 'Commercial Repair',
    tagline: 'Coming soon',
    image: '/assets/hub/commercial.jpg',
    url: '',
    phone: '',
    phoneDisplay: '',
    showCall: false,
    accent: '#64748B',
    enabled: false,
  },
];
