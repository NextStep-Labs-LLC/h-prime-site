// H-Prime Appliance Repair - Customer Reviews
// Placeholder reviews for Denver area

export interface Review {
  author: string;
  text: string;
  rating: 5;
  date: string;
  link?: string;
}

export const reviews: Review[] = [
  {
    author: 'Michelle K.',
    text: 'Our Samsung refrigerator stopped cooling overnight. Called H-Prime and they sent someone out same day. The technician was professional, explained everything clearly, and had us back up and running in under 2 hours. Highly recommend!',
    rating: 5,
    date: '2 weeks ago'
  },
  {
    author: 'David R.',
    text: 'Washer was making a horrible noise. The tech arrived on time, diagnosed the issue quickly (worn bearing), and completed the repair efficiently. Very knowledgeable and reasonably priced. Will definitely use them again for any appliance issues.',
    rating: 5,
    date: '1 month ago'
  },
  {
    author: 'Sarah L.',
    text: 'Had an issue with our Bosch dishwasher not draining. H-Prime came out the next day, fixed it within an hour, and cleaned up everything. The technician was courteous and explained what caused the problem. Great service in the Denver area!',
    rating: 5,
    date: '1 month ago'
  },
  {
    author: 'James T.',
    text: 'Our LG dryer stopped heating. Called H-Prime Appliance Repair and they were able to fit us in the same day. The repair was done professionally and the price was exactly what they quoted over the phone. Very satisfied with the service.',
    rating: 5,
    date: '2 months ago'
  },
  {
    author: 'Amanda W.',
    text: 'Excellent service! Our Whirlpool refrigerator was leaking water. The technician arrived within the scheduled window, quickly identified the problem, and had the parts needed in his truck. Fixed it on the spot. Very pleased with H-Prime!',
    rating: 5,
    date: '2 months ago'
  },
  {
    author: 'Robert J.',
    text: 'Called them for our Maytag washer that wouldn\'t spin. They came out same day, tech was friendly and professional. Fixed the issue and gave us maintenance tips to prevent future problems. Fair pricing too. Would recommend to anyone in Denver!',
    rating: 5,
    date: '3 months ago'
  },
  {
    author: 'Lisa P.',
    text: 'Our KitchenAid oven stopped working right before a big dinner party. H-Prime saved the day! Same-day service, professional technician, and reasonable rates. EPA certified and Whirlpool trained — these guys know their stuff.',
    rating: 5,
    date: '4 months ago'
  },
  {
    author: 'Chris M.',
    text: 'Had them fix our Sub-Zero wine cooler. Not every company works on high-end brands, but H-Prime handled it perfectly. Professional, on time, and the repair has held up great. Our go-to for all appliance repairs now.',
    rating: 5,
    date: '5 months ago'
  },
  {
    author: 'Patricia H.',
    text: 'Very responsive and professional. Our freezer stopped working and they came out within hours. The technician was knowledgeable and explained everything clearly. Repair was done quickly and hasn\'t had any issues since. Serving the whole Denver metro area!',
    rating: 5,
    date: '6 months ago'
  }
];
