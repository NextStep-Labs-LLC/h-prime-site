import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Wrench, Clock, CheckCircle, Users } from 'lucide-react';
import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import WhyChooseUs from "@/components/WhyChooseUs";
import BrandsSection from "@/components/BrandsSection";
import SEOContent from '@/components/SEOContent';
import { brands } from '@/lib/data/brands';
import { appliances } from '@/lib/data/appliances';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateLocalBusinessSchema, generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';

// Dynamic rendering enabled - pages generated on-demand like ColdCommerce
export const dynamicParams = true;

interface PageProps {
  params: Promise<{
    brand: string;
    appliance: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand: brandSlug, appliance: applianceSlug } = await params;
  // Remove -repair suffix
  const cleanBrandSlug = brandSlug.replace('-repair', '');
  const cleanApplianceSlug = applianceSlug.replace('-repair', '');
  const brand = brands.find(b => b.slug === cleanBrandSlug);
  const appliance = appliances.find(a => a.slug === cleanApplianceSlug);
  if (!brand || !appliance) return {};
  
  return generatePageMetadata({ brand: cleanBrandSlug, appliance: cleanApplianceSlug });
}

export default async function BrandApplianceRepairPage({ params }: PageProps) {
  const { brand: brandSlug, appliance: applianceSlug } = await params;
  // Remove -repair suffix
  const cleanBrandSlug = brandSlug.replace('-repair', '');
  const cleanApplianceSlug = applianceSlug.replace('-repair', '');
  const brand = brands.find(b => b.slug === cleanBrandSlug);
  const appliance = appliances.find(a => a.slug === cleanApplianceSlug);
  
  if (!brand || !appliance) {
    notFound();
  }
  
  const localBusinessSchema = generateLocalBusinessSchema({ brand: cleanBrandSlug, appliance: cleanApplianceSlug });
  const serviceSchema = generateServiceSchema({ brand: cleanBrandSlug, appliance: cleanApplianceSlug });
  const breadcrumbSchema = generateBreadcrumbSchema({ brand: cleanBrandSlug, appliance: cleanApplianceSlug });
  
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
        title={`Same-Day ${brand.name} ${appliance.name} Repair in Denver Metro area`}
        subtitle={`Professional ${brand.name} ${appliance.name.toLowerCase()} repair services. Same-day service available.`}
        appliance={appliance.name}
        brand={brand.name}
        brandLogo={brand.logo}
        applianceImage={appliance.image}
      />

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us for {brand.name} {appliance.name} Repair?
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
              <p className="text-gray-600">Factory-trained on all {brand.name} {appliance.name.toLowerCase()} models</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="w-10 h-10 text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Same-Day Service</h3>
              <p className="text-gray-600">Fast appointments in Denver Metro</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Genuine {brand.name} Parts</h3>
              <p className="text-gray-600">Only authentic replacement parts used</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">20+ Years Experience</h3>
              <p className="text-gray-600">Trusted by thousands of Denver Metro homeowners</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <SEOContent brand={cleanBrandSlug} appliance={cleanApplianceSlug} />

      {/* Reviews Section */}
      <WhyChooseUs />
      <BrandsSection />
      <Reviews />
    </>
  );
}

