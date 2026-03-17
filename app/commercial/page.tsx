import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import { Metadata } from 'next';
import { Building2, Clock, Wrench, ShieldCheck, PhoneCall, AlertTriangle } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_NUMBER } from '@/lib/utils';
import { generateLocalBusinessSchema, generateFAQSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: 'Commercial Appliance Repair in Denver | H-Prime',
  description:
    'Professional commercial appliance repair in Denver Metro — restaurants, hotels, laundromats. Same-day service for commercial refrigerators, dishwashers, ice machines, ovens, walk-in coolers and more. EPA certified technicians.',
  alternates: { canonical: 'https://www.h-prime-co.com/commercial' },
};

const commercialServices = [
  {
    slug: 'commercial-refrigerator',
    title: 'Commercial Refrigerator Repair',
    description:
      'Reach-in and under-counter commercial refrigerators for restaurants, cafes, and retail. We restore temperature stability fast to protect your inventory.',
    image: '/assets/appliances/reach-in-refrigerator.jpg',
    issues: ['Not cooling', 'Compressor failure', 'Door gasket replacement', 'Thermostat issues', 'Condenser cleaning'],
  },
  {
    slug: 'commercial-freezer',
    title: 'Commercial Freezer Repair',
    description:
      'Upright and chest commercial freezers. We handle refrigerant issues, fan failures, and temperature fluctuations — fast, to prevent product loss.',
    image: '/assets/appliances/freezer.jpg',
    issues: ['Not freezing', 'Excessive frost buildup', 'Door seal issues', 'Noisy operation', 'Temperature inconsistency'],
  },
  {
    slug: 'walk-in-cooler',
    title: 'Walk-In Cooler & Freezer Repair',
    description:
      'On-site diagnostics and repair of walk-in coolers and walk-in freezers. Minimize downtime and product loss with our priority response service.',
    image: '/assets/appliances/walk-in-cooler.jpg',
    issues: ['Compressor failure', 'Evaporator coil icing', 'Door heater issues', 'Refrigerant leak', 'Condenser unit repair'],
  },
  {
    slug: 'commercial-dishwasher',
    title: 'Commercial Dishwasher Repair',
    description:
      'High-volume undercounter and rack dishwashers for restaurants and commercial kitchens. We restore full wash and sanitize cycles quickly.',
    image: '/assets/appliances/commercial-dishwasher.jpg',
    issues: ['Not draining', 'Poor wash results', 'Sanitizing cycle failure', 'Pump issues', 'Water inlet problems'],
  },
  {
    slug: 'commercial-ice-machine',
    title: 'Commercial Ice Machine Repair',
    description:
      'Modular, undercounter, and countertop commercial ice makers. We fix low ice production, leaks, and dirty ice — same day when possible.',
    image: '/assets/appliances/commercial-ice-machine.jpg',
    issues: ['Low ice production', 'Leaking water', 'Ice quality issues', 'Machine not cycling', 'Water line cleaning'],
  },
  {
    slug: 'commercial-oven-range',
    title: 'Commercial Oven & Range Repair',
    description:
      'Gas and electric commercial ovens, ranges, and combination ovens for restaurant kitchens. Fast repairs to keep your kitchen running without interruption.',
    image: '/assets/appliances/commercial-cooking.jpg',
    issues: ['Uneven heating', 'Igniter failure', 'Temperature control issues', 'Convection fan repair', 'Door hinge repair'],
  },
  {
    slug: 'commercial-laundry',
    title: 'Commercial Laundry Equipment Repair',
    description:
      'Front-load and top-load commercial washers and dryers for laundromats, hotels, and multi-unit buildings. Reliable repairs with minimal downtime.',
    image: '/assets/appliances/commercial-washer.jpg',
    issues: ['Not draining or spinning', 'Control board issues', 'Door lock failure', 'Drum bearing replacement', 'Heating element repair'],
  },
  {
    slug: 'deli-display-case',
    title: 'Deli Display Case Repair',
    description:
      'Refrigerated display cases for delis, grocery stores, and cafeterias. We restore proper cooling and lighting to keep your products looking great.',
    image: '/assets/appliances/deli-display-case.jpg',
    issues: ['Not maintaining temperature', 'Condensation on glass', 'Lighting failure', 'Fan motor issues', 'Defrost cycle problems'],
  },
  {
    slug: 'dryer-duct-cleaning',
    title: 'Dryer Duct Cleaning',
    description:
      'Professional dryer vent and duct cleaning for homes and commercial laundry facilities. Prevent fire hazards, improve dryer efficiency, and reduce energy costs.',
    image: '/assets/appliances/dryer-duct-cleaning.jpg',
    issues: ['Lint buildup removal', 'Vent blockage clearing', 'Fire hazard prevention', 'Airflow restoration', 'Energy efficiency improvement'],
  },
];

const whyChooseUs = [
  {
    icon: <Clock className="w-10 h-10" style={{ color: '#1B2A4A' }} />,
    title: 'Priority Response',
    description:
      'Commercial clients get priority scheduling. Same-day or next-day service to minimize downtime and lost revenue.',
  },
  {
    icon: <Wrench className="w-10 h-10" style={{ color: '#1B2A4A' }} />,
    title: 'Commercial-Grade Expertise',
    description:
      'Our EPA certified technicians are trained on commercial equipment — not just residential. We carry the right parts for major commercial brands.',
  },
  {
    icon: <ShieldCheck className="w-10 h-10" style={{ color: '#1B2A4A' }} />,
    title: 'Fully Insured',
    description:
      'We are fully licensed and insured for commercial work. All repairs come with a service warranty — parts and labor.',
  },
  {
    icon: <Building2 className="w-10 h-10" style={{ color: '#1B2A4A' }} />,
    title: 'We Come to You',
    description:
      'On-site service at your restaurant, hotel, laundromat, or retail location. No need to transport heavy commercial equipment.',
  },
];

const faqs = [
  {
    q: 'Do you repair commercial appliances the same day?',
    a: 'Yes — commercial clients receive priority scheduling. In most cases we can dispatch a technician the same day or next day across the Denver Metro area.',
  },
  {
    q: 'What types of businesses do you serve?',
    a: 'We service restaurants, cafes, hotels, laundromats, grocery stores, delis, office buildings, and any other commercial establishment that relies on commercial appliances.',
  },
  {
    q: 'Do you work on all commercial appliance brands?',
    a: 'We repair most major commercial brands including Hobart, True, Beverage-Air, Manitowoc, Hoshizaki, Continental, Turbo Air, Speed Queen, Electrolux Professional, and many others.',
  },
  {
    q: 'What is the diagnostic fee for commercial appliances?',
    a: 'Our diagnostic fee for commercial appliances is $99 and is credited toward the repair cost if you proceed. We provide a clear estimate before starting any work — no hidden fees.',
  },
  {
    q: 'Do you offer service contracts for commercial clients?',
    a: 'Yes, we offer preventive maintenance plans for restaurants and commercial kitchens. Regular service extends equipment life and reduces the risk of unexpected breakdowns during peak hours.',
  },
  {
    q: 'How quickly can you get parts for commercial equipment?',
    a: 'We stock common commercial parts and can source most others within 1–2 business days through our supplier network. We always inform you of lead times upfront.',
  },
];

export default function CommercialPage() {
  const localBusinessSchema = generateLocalBusinessSchema({});
  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <Hero
        title="Commercial Appliance Repair in Denver"
        subtitle="Priority service for restaurants, hotels, laundromats & more"
      />

      {/* Urgent CTA Banner */}
      <div className="w-full py-4 text-white text-center text-lg font-semibold" style={{ backgroundColor: '#1B2A4A' }}>
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" style={{ color: '#FFC704' }} />
            <span>Equipment down? Call now for priority response</span>
          </div>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-gray-900 transition"
            style={{ backgroundColor: '#FFC704' }}
          >
            <PhoneCall className="w-5 h-5" />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Denver Businesses Choose H-Prime
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We understand that equipment downtime costs money. That's why commercial clients always come first.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {whyChooseUs.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF8E0' }}>
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Commercial Appliance Services
            </h2>
            <p className="text-xl text-gray-600">
              Expert repair for all commercial kitchen and laundry equipment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commercialServices.map((service) => (
              <div
                key={service.slug}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden group border border-gray-100"
              >
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                  <ul className="space-y-1 mb-4">
                    {service.issues.map((issue, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FFC704' }} />
                        {issue}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="inline-block text-sm font-semibold hover:underline"
                    style={{ color: '#398ffc' }}
                  >
                    Call for service →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Commercial Appliance Repair — Denver Metro
            </h2>
            <div className="text-gray-700 space-y-4 text-left">
              <p className="text-base md:text-lg leading-relaxed">
                When commercial equipment fails, every hour of downtime directly impacts your revenue and reputation.
                <strong> H-Prime Appliance Repair Services</strong> provides fast, professional commercial appliance repair across Denver, Aurora,
                Lakewood, Arvada, and 30+ surrounding cities.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Our EPA certified technicians are trained on commercial-grade equipment from brands like Hobart, True, Manitowoc, Hoshizaki,
                Speed Queen, and more. We stock common commercial parts to complete most repairs in a single visit — so your business gets back
                to full operation quickly.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                From a restaurant walk-in cooler that stopped holding temperature to a laundromat washer mid-cycle failure, we handle it all.
                Call us now for same-day commercial service or schedule online — no long waits, no runaround.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <Reviews />

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Commercial Appliance Repair — FAQ
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-lg shadow-sm border border-gray-200">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-gray-900 hover:text-blue-600 transition">
                  {faq.q}
                  <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 text-white" style={{ backgroundColor: '#1B2A4A' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Commercial Appliance Repair Today?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Call now for priority scheduling. Same-day service available across Denver Metro.
            EPA certified technicians, fully insured, $99 commercial diagnostic fee credited toward repair.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold text-xl text-gray-900 transition hover:brightness-90"
              style={{ backgroundColor: '#FFC704' }}
            >
              <PhoneCall className="w-6 h-6" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
