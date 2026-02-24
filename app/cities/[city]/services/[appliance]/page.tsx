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
    appliance: string;
  }>;
}

// Dynamic rendering enabled - pages generated on-demand like ColdCommerce
export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug, appliance: applianceSlug } = await params;
  // Remove -repair suffix from appliance
  const cleanApplianceSlug = applianceSlug.replace('-repair', '');
  const city = cities.find(c => c.slug === citySlug);
  const appliance = appliances.find(a => a.slug === cleanApplianceSlug);
  if (!city || !appliance) return {};
  
  return generatePageMetadata({ city: citySlug, appliance: cleanApplianceSlug });
}

export default async function CityApplianceRepairPage({ params }: PageProps) {
  const { city: citySlug, appliance: applianceSlug } = await params;
  // Remove -repair suffix from appliance
  const cleanApplianceSlug = applianceSlug.replace('-repair', '');
  const city = cities.find(c => c.slug === citySlug);
  const appliance = appliances.find(a => a.slug === cleanApplianceSlug);
  
  if (!city || !appliance) {
    notFound();
  }
  
  const nearbyCities = getCitiesByCounty(city.county).filter(c => c.slug !== city.slug).slice(0, 8);
  
  const localBusinessSchema = generateLocalBusinessSchema({ city: citySlug, appliance: cleanApplianceSlug, county: city.county });
  const serviceSchema = generateServiceSchema({ city: citySlug, appliance: cleanApplianceSlug });
  const breadcrumbSchema = generateBreadcrumbSchema({ city: citySlug, appliance: cleanApplianceSlug });
  
  return (
    <>
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
        title={`Same-Day ${appliance.name} Repair in ${city.name}`}
        subtitle="Certified technicians, all major brands, professional service"
        city={city.name}
        appliance={appliance.name}
        applianceImage={appliance.image}
      />
      
      <SEOContent city={citySlug} appliance={cleanApplianceSlug} county={city.county} />
      
      <BrandsSection />
      
      {nearbyCities.length > 0 && (
        <section id="service-area" className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              {appliance.name} Repair in Nearby Cities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {nearbyCities.map((nearbyCity) => (
                <Link
                  key={nearbyCity.slug}
                  href={`/cities/${nearbyCity.slug}/services/${cleanApplianceSlug}-repair`}
                  prefetch={false}
                  className="text-center p-4 bg-white rounded-lg hover:shadow-md transition"
                >
                  <span className="text-gray-900 font-medium">{nearbyCity.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      <Reviews />
    </>
  );
}

