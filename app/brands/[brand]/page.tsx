import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Shield, Wrench, Users } from 'lucide-react';
import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import SEOContent from '@/components/SEOContent';
import { brands } from '@/lib/data/brands';
import { appliances } from '@/lib/data/appliances';
import { getAppliancesForBrand } from '@/lib/data/serviceBrands';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateLocalBusinessSchema, generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';

interface PageProps {
  params: Promise<{
    brand: string;
  }>;
}

export async function generateStaticParams() {
  // Only generate top 20 featured brands statically
  return brands.filter(b => b.logo).slice(0, 20).map((brand) => ({
    brand: `${brand.slug}-repair`,
  }));
}

// Enable dynamic rendering for other brands
export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  // Remove -repair suffix to find brand
  const cleanSlug = brandSlug.replace('-repair', '');
  const brand = brands.find(b => b.slug === cleanSlug);
  if (!brand) return {};
  
  return generatePageMetadata({ brand: cleanSlug });
}

export default async function BrandRepairPage({ params }: PageProps) {
  const { brand: brandSlug } = await params;
  // Remove -repair suffix to find brand
  const cleanSlug = brandSlug.replace('-repair', '');
  const brand = brands.find(b => b.slug === cleanSlug);
  
  if (!brand) {
    notFound();
  }
  
  // Get appliances that this brand manufactures
  const relevantApplianceSlugs = getAppliancesForBrand(cleanSlug);
  const relevantAppliances = appliances.filter(a => relevantApplianceSlugs.includes(a.slug));
  
  const localBusinessSchema = generateLocalBusinessSchema({ brand: cleanSlug });
  const serviceSchema = generateServiceSchema({ brand: cleanSlug });
  const breadcrumbSchema = generateBreadcrumbSchema({ brand: cleanSlug });
  
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
        title={`Expert ${brand.name} Appliance Repair in Denver Metro area`}
        subtitle="Factory-trained technicians • Genuine parts • Same-day service"
        brand={brand.name}
        brandLogo={brand.logo}
      />
      
      {/* Appliances Section - Filtered */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            {brand.name} Appliances We Service
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {relevantAppliances.map((appliance) => (
              <Link
                key={appliance.slug}
                href={`/brands/${brandSlug}/services/${appliance.slug}-repair`}
                prefetch={false}
                className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition text-center border border-gray-200"
              >
                <h3 className="font-semibold text-gray-900 text-lg">{appliance.name}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  {brand.name} {appliance.name} Repair
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us for {brand.name} Repairs?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <Wrench className="w-10 h-10 text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{brand.name} Specialists</h3>
              <p className="text-gray-600">Factory-trained on all {brand.name} appliances</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="w-10 h-10 text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Same-Day Service</h3>
              <p className="text-gray-600">Fast appointments throughout NJ</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <Shield className="w-10 h-10 text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Genuine Parts</h3>
              <p className="text-gray-600">Only authentic {brand.name} replacement parts</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Fully Insured</h3>
              <p className="text-gray-600">Insured for your peace of mind</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* SEO Content */}
      <SEOContent brand={cleanSlug} />
      
      {/* Reviews Section */}
      <Reviews />
    </>
  );
}

