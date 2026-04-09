import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Wrench, Users, CheckCircle } from 'lucide-react';
import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import WhyChooseUs from "@/components/WhyChooseUs";
import BrandsSection from "@/components/BrandsSection";
import SEOContent from '@/components/SEOContent';
import { appliances } from '@/lib/data/appliances';
import { brands } from '@/lib/data/brands';
import { getBrandsForAppliance } from '@/lib/data/serviceBrands';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateLocalBusinessSchema, generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';

interface PageProps {
  params: Promise<{
    appliance: string;
  }>;
}

export async function generateStaticParams() {
  return appliances.map((appliance) => ({
    appliance: `${appliance.slug}-repair`,
  }));
}

// Enable dynamic rendering for on-demand pages
export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { appliance: applianceSlug } = await params;
  // Remove -repair suffix to find appliance
  const cleanSlug = applianceSlug.replace('-repair', '');
  const appliance = appliances.find(a => a.slug === cleanSlug);
  if (!appliance) return {};
  
  return generatePageMetadata({ appliance: cleanSlug });
}

export default async function ApplianceRepairPage({ params }: PageProps) {
  const { appliance: applianceSlug } = await params;
  // Remove -repair suffix to find appliance
  const cleanSlug = applianceSlug.replace('-repair', '');
  const appliance = appliances.find(a => a.slug === cleanSlug);
  
  if (!appliance) {
    notFound();
  }
  
  // Get brands that manufacture this appliance
  const relevantBrandSlugs = getBrandsForAppliance(cleanSlug);
  const relevantBrands = brands.filter(b => relevantBrandSlugs.includes(b.slug));
  
  const localBusinessSchema = generateLocalBusinessSchema({ appliance: cleanSlug });
  const serviceSchema = generateServiceSchema({ appliance: cleanSlug });
  const breadcrumbSchema = generateBreadcrumbSchema({ appliance: cleanSlug });
  
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
        title={`Same-Day ${appliance.name} Repair in Denver Metro area`}
        subtitle="Expert repair service for all major brands • Same-day appointments available"
        applianceImage={appliance.image}
      />
      
      {/* Services Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Common {appliance.name} Issues We Fix
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {appliance.services.map((service, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex items-start gap-3">
                <div className="text-orange-600 text-xl font-bold flex-shrink-0 mt-0.5">✓</div>
                <h3 className="font-semibold text-gray-900 text-lg">{service}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose H-Prime Appliance Repair Services?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">20+ Years Experience</h3>
              <p className="text-gray-600">
                Over two decades repairing Denver Metro area's kitchen and laundry appliances. Factory-trained, certified technicians.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="w-10 h-10 text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Same-Day Service</h3>
              <p className="text-gray-600">
                Same-day or next-day appointments available. We know you can't wait — we respond fast.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Trusted by Neighbors</h3>
              <p className="text-gray-600">
                Most new customers come from referrals. We fix it right the first time, every time.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <Wrench className="w-10 h-10 text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Upfront Pricing</h3>
              <p className="text-gray-600">
                Transparent pricing and solid warranty on every repair. Fully insured for your peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* SEO Content */}
      <SEOContent appliance={cleanSlug} />
      
      {/* Brands Section - Filtered */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {appliance.name} Brands We Service
            </h2>
            <p className="text-xl text-gray-600">
              Our certified technicians are trained to repair all major {appliance.name.toLowerCase()} brands
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {relevantBrands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}-repair`}
                prefetch={false}
                className="group bg-gray-50 border border-gray-200 rounded-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="p-6 flex flex-col items-center text-center gap-4">
                  {brand.logo ? (
                    <div className="relative h-24 w-full flex items-center justify-center">
                      <img 
                        src={brand.logo} 
                        alt={`${brand.name} logo`}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-24 w-full flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-900 transition-colors">
                        {brand.name}
                      </span>
                    </div>
                  )}
                  <span className="text-sm font-medium group-hover:underline" style={{ color: '#1B2A4A' }}>
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Reviews Section */}
      <WhyChooseUs />
      <BrandsSection />
      <Reviews />
    </>
  );
}
