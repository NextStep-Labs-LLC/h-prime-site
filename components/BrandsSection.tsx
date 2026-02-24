'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getFeaturedBrands, getOtherBrands } from '@/lib/data/brands';
import Link from 'next/link';

export default function BrandsSection() {
  const [showAllBrands, setShowAllBrands] = useState(false);
  
  const featuredBrands = getFeaturedBrands();
  const otherBrands = getOtherBrands();
  const displayedBrands = showAllBrands ? [...featuredBrands, ...otherBrands] : featuredBrands;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Brands We Service
          </h2>
          <p className="text-xl text-gray-600">
            Our certified technicians are trained to repair appliances from all major brands
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {displayedBrands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}-repair`}
              className="group bg-white border border-gray-200 rounded-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="p-6 flex flex-col items-center text-center gap-4">
                {brand.logo ? (
                  <div className="relative h-24 w-full flex items-center justify-center">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      width={200}
                      height={96}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      quality={85}
                    />
                  </div>
                ) : (
                  <div className="h-24 w-full flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-900 transition-colors" style={{ color: undefined }}>
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

        {!showAllBrands && otherBrands.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAllBrands(true)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-colors border border-gray-300"
            >
              Show more brands ({otherBrands.length})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

