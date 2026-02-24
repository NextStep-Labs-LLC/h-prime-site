import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import SEOContent from '@/components/SEOContent';
import BrandsSection from '@/components/BrandsSection';
import { cities, getCitiesByCounty } from '@/lib/data/cities';
import { appliances } from '@/lib/data/appliances';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateLocalBusinessSchema, generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

// dynamicParams removed - we want to pre-generate all pages
// export const dynamicParams = true;

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = cities.find(c => c.slug === citySlug);
  if (!city) return {};
  
  return generatePageMetadata({ city: citySlug });
}

export default async function CityPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const city = cities.find(c => c.slug === citySlug);
  
  if (!city) {
    notFound();
  }
  
  const nearbyCities = getCitiesByCounty(city.county).filter(c => c.slug !== city.slug).slice(0, 8);
  
  const localBusinessSchema = generateLocalBusinessSchema({ city: citySlug, county: city.county });
  const serviceSchema = generateServiceSchema({ city: citySlug });
  const breadcrumbSchema = generateBreadcrumbSchema({ city: citySlug });
  
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <Hero 
        title={`Same-Day Appliance Repair in ${city.name}`}
        subtitle="Certified technicians, all major brands, professional service"
        city={city.name}
      />
      
      {/* Appliances Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Appliances We Repair in {city.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {appliances.map((appliance) => (
              <Link
                key={appliance.slug}
                href={`/cities/${citySlug}/services/${appliance.slug}-repair`}
                className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition text-center"
              >
                <h3 className="font-semibold text-gray-900">{appliance.name}</h3>
                <p className="text-sm text-gray-600 mt-2">Repair in {city.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* SEO Content */}
      <SEOContent city={citySlug} county={city.county} />
      
      {/* Brands Section */}
      <BrandsSection />
      
      {/* Nearby Cities */}
      {nearbyCities.length > 0 && (
        <section id="service-area" className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              We Also Serve Nearby Cities in {city.county} County
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {nearbyCities.map((nearbyCity) => (
                <Link
                  key={nearbyCity.slug}
                  href={`/${nearbyCity.slug}`}
                  className="text-center p-4 bg-white rounded-lg hover:shadow-md transition"
                >
                  <span className="text-gray-900 font-medium">{nearbyCity.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Reviews Section */}
      <Reviews />
    </>
  );
}

