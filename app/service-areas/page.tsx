import { cities } from '@/lib/data/cities';
import { counties } from '@/lib/data/counties';
import { MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Service Areas | Appliance Repair in Denver Metro - Denver, Arapahoe, Jefferson, Adams, Douglas, Boulder, Weld, Elbert Counties',
  description: 'H-Prime Appliance Repair Services covers 45+ cities in Denver Metro area. Same-day appliance repair in Denver, Arapahoe, Jefferson, Adams, Douglas, Boulder, Weld, and Elbert counties.',
};

export default function ServiceAreasPage() {
  // Group cities by county
  const citiesByCounty: Record<string, typeof cities> = {};
  
  cities.forEach((city) => {
    if (!citiesByCounty[city.county]) {
      citiesByCounty[city.county] = [];
    }
    citiesByCounty[city.county].push(city);
  });

  return (
    <>
      {/* Hero Section */}
      <section className="py-16" style={{ background: 'linear-gradient(to bottom right, #ffffff, #1B2A4A)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(75, 48, 112, 0.2)' }}>
                <MapPin className="w-12 h-12" style={{ color: '#1B2A4A' }} />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#1f2937' }}>
              We Serve 45+ Cities in Denver Metro Area
            </h1>
            <p className="text-xl md:text-2xl mb-8" style={{ color: '#374151' }}>
              Same-day appliance repair service available in Denver, Arapahoe, Jefferson, Adams, Douglas, Boulder, Weld, and Elbert counties
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:+17207846766"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg shadow-xl transition cursor-pointer"
                style={{ backgroundColor: '#1B2A4A' }}
              >
                <Phone className="w-6 h-6" />
                (720) 784-6766
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Professional Appliance Repair Throughout Denver Metro
            </h2>
            <div className="text-gray-700 space-y-4">
              <p className="text-base md:text-lg leading-relaxed">
                For over 20 years, <strong>H-Prime Appliance Repair Services</strong> has been the trusted choice for appliance 
                repair in Denver Metro area. Our factory-trained technicians provide same-day service to homes and businesses 
                in Denver, Arapahoe, Jefferson, Adams, Douglas, Boulder, Weld, and Elbert counties.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                We repair all major brands — LG, Samsung, Whirlpool, GE, Maytag, Bosch, KitchenAid, and more. 
                Upfront pricing, solid warranty, fully insured. Most customers come from referrals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Major Service Areas Overview */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Service Regions
            </h2>
            <p className="text-xl text-gray-600">
              Serving 8 counties in Denver Metro area
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-8">
            {counties.map((county) => {
              const countyCount = citiesByCounty[county.slug]?.length || 0;
              return (
                <a
                  key={county.slug}
                  href={`#${county.slug}`}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition border-2 border-transparent hover:border-orange-600"
                >
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{county.name}</h3>
                  <p className="text-sm text-gray-600">{countyCount} cities</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cities by Region */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cities We Serve by Region
            </h2>
            <p className="text-xl text-gray-600">
              Click on any city to see available appliance repair services
            </p>
          </div>

          <div className="space-y-12 max-w-7xl mx-auto">
            {counties.map((county) => {
              const countyCities = citiesByCounty[county.slug] || [];
              return (
                <div 
                  key={county.slug} 
                  id={county.slug}
                  className="bg-gray-50 rounded-lg shadow-lg p-6 md:p-8 scroll-mt-32"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-orange-600">
                    {county.name} <span className="text-gray-500 text-xl">({countyCities.length} cities)</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {countyCities.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/cities/${city.slug}`}
                        prefetch={false}
                        className="bg-white p-3 rounded-lg hover:bg-orange-50 hover:shadow-md transition text-center border border-gray-200 cursor-pointer"
                      >
                        <span className="text-sm md:text-base font-medium text-gray-900">{city.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Can't Find Your City?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              We serve all areas within Denver Metro, Denver, and surrounding Colorado regions. Call us to confirm service availability in your area.
            </p>
            <a
              href="tel:+17207846766"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg shadow-xl transition cursor-pointer"
              style={{ backgroundColor: '#1B2A4A' }}
            >
              <Phone className="w-6 h-6" />
              Call (720) 784-6766
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
