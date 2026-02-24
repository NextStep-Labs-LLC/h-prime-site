import { Zap, Award, Shield, DollarSign } from 'lucide-react';
import Image from 'next/image';
import GoogleRating from './GoogleRating';
import HeroCTAButtons from './HeroCTAButtons';

interface HeroProps {
  title: string;
  subtitle?: string;
  city?: string;
  appliance?: string;
  brand?: string;
  brandLogo?: string;
  applianceImage?: string;
}

export default function Hero({ title, subtitle = 'Same-day service, certified technicians', brand, brandLogo, applianceImage }: HeroProps) {
  const backgroundImage = applianceImage || "/hero-bg.webp";

  return (
    <section className="relative h-[calc(100vh-5rem)] md:h-auto md:py-20 overflow-hidden" style={{ backgroundColor: '#1B2A4A' }}>
      {/* Background Image - Mobile only */}
      <div className="absolute inset-0 z-0 md:hidden">
        <Image
          src={backgroundImage}
          alt="Professional Appliance Repair Service"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={85}
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white/70"></div>
      </div>

      {/* Background Image - Desktop only */}
      <div className="hidden md:block absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Professional Appliance Repair Service"
          fill
          className="object-cover object-center opacity-30"
          priority
          sizes="100vw"
          quality={90}
        />
      </div>

      {/* Desktop Layout */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 h-full md:h-auto">
        <div className="h-full md:h-auto md:grid md:grid-cols-2 md:gap-8 md:items-center flex flex-col py-4 pb-6 md:py-0">
          {/* Left Column - Content */}
          <div className="flex flex-col h-full md:h-auto md:pl-4 lg:pl-8">
            {/* Top Section */}
            <div className="text-center md:text-left mb-[50px] md:mt-0 md:mb-8">
              {/* Google Rating and Brand Logo */}
              <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-4 mb-4 md:mb-6">
                <GoogleRating />
                {brandLogo && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                    <Image
                      src={brandLogo}
                      alt={brand ? `${brand} Logo` : 'Brand Logo'}
                      width={120}
                      height={48}
                      className="h-10 md:h-12 w-auto object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 md:text-white mb-3 md:mb-4">
                {title}
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-700 md:text-gray-200 mb-2 md:mb-0">
                {subtitle}
              </p>

              {/* Promo Banner */}
              <div className="inline-block mt-3 px-4 py-2 rounded-lg font-bold text-lg" style={{ backgroundColor: '#FFC704', color: '#1B2A4A' }}>
                SAVE $20 ON YOUR FIRST REPAIR!
              </div>
            </div>

            {/* Bottom Section - Badges & Buttons */}
            <div className="w-full mt-auto md:mt-0 flex flex-col">
              {/* Trust Badges */}
              <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-x-8 md:gap-y-3 mb-4 md:mb-0 order-1 md:order-2 md:mt-8">
                <div className="bg-white/80 md:bg-white/10 backdrop-blur-sm p-2 md:p-2 rounded shadow-md md:shadow-none text-center md:text-left flex md:flex-row flex-col md:items-center md:gap-3">
                  <Zap className="w-6 h-6 mx-auto md:mx-0 mb-1 md:mb-0" style={{ color: '#FFC704' }} />
                  <div className="font-semibold text-xs md:text-base text-gray-900 md:text-white">Same-Day Service</div>
                </div>
                <div className="bg-white/80 md:bg-white/10 backdrop-blur-sm p-2 md:p-2 rounded shadow-md md:shadow-none text-center md:text-left flex md:flex-row flex-col md:items-center md:gap-3">
                  <Award className="w-6 h-6 mx-auto md:mx-0 mb-1 md:mb-0" style={{ color: '#FFC704' }} />
                  <div className="font-semibold text-xs md:text-base text-gray-900 md:text-white">EPA Certified</div>
                </div>
                <div className="bg-white/80 md:bg-white/10 backdrop-blur-sm p-2 md:p-2 rounded shadow-md md:shadow-none text-center md:text-left flex md:flex-row flex-col md:items-center md:gap-3">
                  <Shield className="w-6 h-6 mx-auto md:mx-0 mb-1 md:mb-0" style={{ color: '#FFC704' }} />
                  <div className="font-semibold text-xs md:text-base text-gray-900 md:text-white">Fully Insured</div>
                </div>
                <div className="bg-white/80 md:bg-white/10 backdrop-blur-sm p-2 md:p-2 rounded shadow-md md:shadow-none text-center md:text-left flex md:flex-row flex-col md:items-center md:gap-3">
                  <DollarSign className="w-6 h-6 mx-auto md:mx-0 mb-1 md:mb-0" style={{ color: '#FFC704' }} />
                  <div className="font-semibold text-xs md:text-base text-gray-900 md:text-white">$69 Diagnostic Fee</div>
                </div>
              </div>

              {/* CTA Buttons - Client Component */}
              <HeroCTAButtons />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
