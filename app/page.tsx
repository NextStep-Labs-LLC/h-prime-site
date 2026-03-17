import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import BrandsSection from '@/components/BrandsSection';
import { appliances } from '@/lib/data/appliances';
import { cities } from '@/lib/data/cities';
import { CheckCircle, Clock, Users, Wrench } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { generateLocalBusinessSchema, generateFAQSchema } from '@/lib/seo/schema';

const homepageFaqs = [
  { q: 'Why is my washer not washing properly?', a: 'Common reasons include clogged filters, faulty water inlet valves, detergent buildup, or worn-out agitators. Overloading the washer can also negatively impact its performance.' },
  { q: 'Why is my washer not spinning properly?', a: 'This can be caused by a worn-out drive belt, faulty motor coupler, or unbalanced loads.' },
  { q: 'Why is my washer not draining properly?', a: 'This typically occurs due to a clogged drain hose, a blocked pump filter, or a faulty drain pump.' },
  { q: 'Why is my dryer not drying properly?', a: 'The most common causes are a clogged vent system or faulty sensors inside the dryer.' },
  { q: 'How long do refrigerators typically last?', a: 'On average, a refrigerator lasts around 15–20 years, depending on maintenance. Regular cleaning of condenser coils and timely service can extend its lifespan.' },
  { q: 'How do I know if my washer needs repair?', a: 'Common signs include leaks, unusual noises, or stopping mid-cycle.' },
  { q: 'Are your technicians certified?', a: 'Yes, our technicians are certified, professionally trained, and receive monthly training to stay up to date.' },
];

export default function HomePage() {
  const localBusinessSchema = generateLocalBusinessSchema({});
  const faqSchema = generateFAQSchema(homepageFaqs);

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

      {/* Hero Section */}
      <Hero
        title="Denver Appliance Repair Services – Fast & Reliable!"
        subtitle="Appliance Trouble? We Will Fix It — Fast and Easy!"
      />

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose H-Prime Appliance Repair?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF8E0' }}>
                  <CheckCircle className="w-10 h-10" style={{ color: '#1B2A4A' }} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">EPA Certified</h3>
              <p className="text-gray-600">
                EPA certified and Whirlpool factory-trained technicians. Professional service you can trust for all major appliance brands.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF8E0' }}>
                  <Clock className="w-10 h-10" style={{ color: '#1B2A4A' }} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Same-Day Service</h3>
              <p className="text-gray-600">
                Same-day or next-day appointments available across the Denver Metro area. We know you can't wait — we respond fast.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF8E0' }}>
                  <Users className="w-10 h-10" style={{ color: '#1B2A4A' }} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">$69 Diagnostic Fee</h3>
              <p className="text-gray-600">
                Only $69 for a complete diagnostic — credited toward your repair if you proceed. No hidden fees, no surprises.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF8E0' }}>
                  <Wrench className="w-10 h-10" style={{ color: '#1B2A4A' }} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">All Major Brands</h3>
              <p className="text-gray-600">
                We service 60+ appliance brands including Sub-Zero, Viking, Wolf, Thermador, and all standard brands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Certified & Trained Professionals
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="w-64">
                <Image src="/certificates/epa.jpg" alt="EPA Certification" width={400} height={308} className="rounded-lg shadow-md" />
                <p className="text-sm text-gray-600 mt-2">EPA Certification</p>
              </div>
              <div className="w-64">
                <Image src="/certificates/whirlpool-training.jpg" alt="Whirlpool Training Certificate" width={400} height={309} className="rounded-lg shadow-md" />
                <p className="text-sm text-gray-600 mt-2">Whirlpool Training Certificate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Same-Day Appliance Repair in Denver, CO
            </h2>

            <div className="text-gray-700 space-y-4">
              <p className="text-base md:text-lg leading-relaxed">
                Your fridge stopped cooling? Washer won't spin? We've got you covered. <strong>H-Prime Appliance Repair Services</strong> provides
                fast, reliable repairs on all major brands — LG, Samsung, Whirlpool, GE, Maytag, Sub-Zero, Viking, and 60+ more.
              </p>

              <p className="text-base md:text-lg leading-relaxed">
                Our EPA certified and Whirlpool factory-trained technicians provide <strong>same-day service</strong> across the Denver Metro area —
                Denver, Aurora, Lakewood, Arvada, and 30+ surrounding cities. Only $69 diagnostic fee, credited toward your repair.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section id="our-services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600">
              We repair all major appliance brands
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appliances.map((appliance) => (
              <Link
                key={appliance.slug}
                href={`/services/${appliance.slug}-repair`}
                prefetch={false}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden group"
              >
                {appliance.image && (
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={appliance.image}
                      alt={appliance.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {appliance.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{appliance.description}</p>
                  <span className="font-semibold hover:underline" style={{ color: '#398ffc' }}>
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brands We Service */}
      <BrandsSection />

      {/* Service Areas */}
      <section id="service-area" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Service Areas in Denver Metro
            </h2>
            <p className="text-xl text-gray-600">
              We serve Denver and 30+ surrounding cities across 6 counties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Denver County', slug: 'denver', description: 'Denver, Cherry Creek, Stapleton, Lowry' },
              { name: 'Arapahoe County', slug: 'arapahoe', description: 'Aurora, Centennial, Englewood, Littleton' },
              { name: 'Jefferson County', slug: 'jefferson', description: 'Lakewood, Arvada, Golden, Wheat Ridge' },
              { name: 'Adams County', slug: 'adams', description: 'Westminster, Thornton, Commerce City' },
              { name: 'Douglas County', slug: 'douglas', description: 'Castle Rock, Highlands Ranch, Parker' },
              { name: 'Boulder County', slug: 'boulder', description: 'Broomfield' }
            ].map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas#${area.slug}`}
                prefetch={false}
                className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition border border-gray-200 cursor-pointer"
                style={{ ['--tw-shadow-color' as any]: '#FFC704' }}
              >
                <h3 className="font-bold text-xl text-gray-900 mb-2">{area.name}</h3>
                <p className="text-sm text-gray-600">{area.description}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/service-areas"
              prefetch={false}
              className="inline-block font-semibold text-lg hover:underline"
              style={{ color: '#398ffc' }}
            >
              View all {cities.length} cities we serve →
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <Reviews />

      {/* Watch Our Latest Work Tips */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Watch Our Latest Work Tips
            </h2>
            <p className="text-lg text-gray-600">
              Our work is transparent — here, you can see how we are working to do the best for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <div className="relative pb-[56.25%]">
                <iframe
                  src="https://www.youtube.com/embed/x4Ftt6rVNQQ"
                  title="How to Replace a Washing Machine Door Gasket"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="p-4 bg-gray-50">
                <h3 className="font-semibold text-gray-900">How to Replace a Washing Machine Door Gasket</h3>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg">
              <div className="relative pb-[56.25%]">
                <iframe
                  src="https://www.youtube.com/embed/I-6kq0phckg"
                  title="Samsung Washer 3E Error Repair"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="p-4 bg-gray-50">
                <h3 className="font-semibold text-gray-900">Impossible Access! Samsung Washer 3E Error Repair</h3>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <a
              href="https://www.youtube.com/@MeToTarass"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-semibold text-lg hover:underline"
              style={{ color: '#398ffc' }}
            >
              Watch more on our YouTube channel →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Denver Appliance Repair: Common Questions & Answers
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {homepageFaqs.map((faq, i) => (
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
    </>
  );
}
