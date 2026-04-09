import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import WhyChooseUs from "@/components/WhyChooseUs";
import BrandsSection from "@/components/BrandsSection";
import SEOContent from '@/components/SEOContent';
import { cities, getCitiesByCounty } from '@/lib/data/cities';
import { brands } from '@/lib/data/brands';
import { appliances } from '@/lib/data/appliances';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateLocalBusinessSchema, generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';

interface PageProps {
  params: Promise<{
    city: string;
    brand: string;
    appliance: string;
  }>;
}

// Dynamic rendering enabled - pages generated on-demand like ColdCommerce  
export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug, brand: brandSlug, appliance: applianceSlug } = await params;
  // Remove -repair suffix from brand and appliance
  const cleanBrandSlug = brandSlug.replace('-repair', '');
  const cleanApplianceSlug = applianceSlug.replace('-repair', '');
  const city = cities.find(c => c.slug === citySlug);
  const brand = brands.find(b => b.slug === cleanBrandSlug);
  const appliance = appliances.find(a => a.slug === cleanApplianceSlug);
  if (!city || !brand || !appliance) return {};
  
  return generatePageMetadata({ 
    city: citySlug, 
    brand: cleanBrandSlug, 
    appliance: cleanApplianceSlug 
  });
}

export default async function CityBrandApplianceRepairPage({ params }: PageProps) {
  const { city: citySlug, brand: brandSlug, appliance: applianceSlug } = await params;
  // Remove -repair suffix from brand and appliance
  const cleanBrandSlug = brandSlug.replace('-repair', '');
  const cleanApplianceSlug = applianceSlug.replace('-repair', '');
  const city = cities.find(c => c.slug === citySlug);
  const brand = brands.find(b => b.slug === cleanBrandSlug);
  const appliance = appliances.find(a => a.slug === cleanApplianceSlug);
  
  if (!city || !brand || !appliance) {
    notFound();
  }
  
  const nearbyCities = getCitiesByCounty(city.county).filter(c => c.slug !== city.slug).slice(0, 6);
  
  const localBusinessSchema = generateLocalBusinessSchema({ 
    city: citySlug, 
    brand: cleanBrandSlug, 
    appliance: cleanApplianceSlug,
    county: city.county 
  });
  const serviceSchema = generateServiceSchema({ 
    city: citySlug, 
    brand: cleanBrandSlug, 
    appliance: cleanApplianceSlug 
  });
  const breadcrumbSchema = generateBreadcrumbSchema({ 
    city: citySlug, 
    brand: cleanBrandSlug, 
    appliance: cleanApplianceSlug 
  });
  
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
        title={`Same-Day ${brand.name} ${appliance.name} Repair in ${city.name} & Surrounding Areas`}
        subtitle="Factory-trained technicians • Genuine parts • Professional service"
        city={city.name}
        brand={brand.name}
        brandLogo={brand.logo}
        appliance={appliance.name}
      />
      
      {/* Services Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            {brand.name} {appliance.name} Problems We Fix in {city.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {appliance.services.map((service, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg flex items-center gap-3">
                <div className="text-orange-600 text-xl font-bold flex-shrink-0">✓</div>
                <h3 className="font-semibold text-gray-900">{service}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* SEO Content */}
      <SEOContent 
        city={citySlug} 
        brand={cleanBrandSlug} 
        appliance={cleanApplianceSlug}
        county={city.county}
      />
      
      {/* Why Choose Us Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose Us for {brand.name} {appliance.name} Repair in {city.name}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{brand.name} Specialists</h3>
              <p className="text-gray-600">Factory-trained on {brand.name} {appliance.name.toLowerCase()} models</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Local to {city.name}</h3>
              <p className="text-gray-600">Fast response times in your area</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Genuine {brand.name} Parts</h3>
              <p className="text-gray-600">Only authentic replacement parts</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Same-Day Service</h3>
              <p className="text-gray-600">Available for {city.name} residents</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Nearby Cities */}
      {nearbyCities.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              {brand.name} {appliance.name} Repair in Nearby Cities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {nearbyCities.map((nearbyCity) => (
                <Link
                  key={nearbyCity.slug}
                  href={`/cities/${nearbyCity.slug}/brands/${brandSlug}/services/${applianceSlug}-repair`}
                  className="text-center p-4 bg-gray-50 rounded-lg hover:shadow-md transition"
                >
                  <span className="text-gray-900 font-medium">{nearbyCity.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Reviews Section */}
      <WhyChooseUs />
      <BrandsSection />
      <Reviews />
    </>
  );
}

