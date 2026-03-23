import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
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
  }>;
}

// Dynamic rendering enabled - pages generated on-demand
export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug, brand: brandSlug } = await params;
  // Remove -repair suffix from brand
  const cleanBrandSlug = brandSlug.replace('-repair', '');
  const city = cities.find(c => c.slug === citySlug);
  const brand = brands.find(b => b.slug === cleanBrandSlug);
  if (!city || !brand) return {};

  return generatePageMetadata({ city: citySlug, brand: cleanBrandSlug });
}

export default async function CityBrandPage({ params }: PageProps) {
  const { city: citySlug, brand: brandSlug } = await params;
  // Remove -repair suffix from brand
  const cleanBrandSlug = brandSlug.replace('-repair', '');
  const city = cities.find(c => c.slug === citySlug);
  const brand = brands.find(b => b.slug === cleanBrandSlug);

  if (!city || !brand) {
    notFound();
  }

  const nearbyCities = getCitiesByCounty(city.county).filter(c => c.slug !== city.slug).slice(0, 6);

  const localBusinessSchema = generateLocalBusinessSchema({
    city: citySlug,
    brand: cleanBrandSlug,
    county: city.county,
  });
  const serviceSchema = generateServiceSchema({
    city: citySlug,
    brand: cleanBrandSlug,
  });
  const breadcrumbSchema = generateBreadcrumbSchema({
    city: citySlug,
    brand: cleanBrandSlug,
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
        title={`${brand.name} Appliance Repair in ${city.name} & Surrounding Areas`}
        subtitle={`Factory-trained ${brand.name} technicians \u2022 Genuine parts \u2022 Same-day service`}
        city={city.name}
        brand={brand.name}
        brandLogo={brand.logo}
      />

      {/* Appliances We Repair Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            {brand.name} Appliances We Repair in {city.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {appliances.map((appliance) => (
              <Link
                key={appliance.slug}
                href={`/cities/${citySlug}/brands/${brandSlug}/services/${appliance.slug}-repair`}
                prefetch={false}
                className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition text-center"
              >
                {appliance.image && (
                  <div className="relative w-16 h-16 mx-auto mb-3">
                    <Image
                      src={appliance.image}
                      alt={`${brand.name} ${appliance.name} Repair`}
                      fill
                      className="object-contain"
                      sizes="64px"
                    />
                  </div>
                )}
                <h3 className="font-semibold text-gray-900">{appliance.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{brand.name} {appliance.name} Repair</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <SEOContent city={citySlug} brand={cleanBrandSlug} county={city.county} />

      {/* Why Choose Us Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose Us for {brand.name} Repair in {city.name}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{brand.name} Specialists</h3>
              <p className="text-gray-600">Factory-trained on all {brand.name} appliance models</p>
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
              <p className="text-gray-600">Only authentic replacement parts used</p>
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
              {brand.name} Appliance Repair in Nearby Cities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {nearbyCities.map((nearbyCity) => (
                <Link
                  key={nearbyCity.slug}
                  href={`/cities/${nearbyCity.slug}/brands/${brandSlug}`}
                  prefetch={false}
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
      <Reviews />
    </>
  );
}
