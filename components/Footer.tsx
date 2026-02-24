import Link from 'next/link';
import { PHONE_DISPLAY, PHONE_NUMBER, BUSINESS_EMAIL, BUSINESS_NAME, BUSINESS_ADDRESS } from '@/lib/utils';
import { appliances } from '@/lib/data/appliances';

export default function Footer() {
  const majorAppliances = appliances.slice(0, 15);

  const serviceAreas = [
    { name: 'Denver County', slug: 'denver' },
    { name: 'Arapahoe County', slug: 'arapahoe' },
    { name: 'Jefferson County', slug: 'jefferson' },
    { name: 'Adams County', slug: 'adams' },
    { name: 'Douglas County', slug: 'douglas' },
    { name: 'Boulder County', slug: 'boulder' }
  ];

  return (
    <footer className="text-gray-300" style={{ backgroundColor: '#1B2A4A' }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">{BUSINESS_NAME}</h3>
            <p className="text-sm mb-2">Serving Denver Metro Area</p>
            <p className="mb-2">
              <a href={`tel:${PHONE_NUMBER}`} className="hover:text-white transition">
                {PHONE_DISPLAY}
              </a>
            </p>
            <p className="mb-2">
              <a href={`mailto:${BUSINESS_EMAIL}`} className="hover:text-white transition text-sm">
                {BUSINESS_EMAIL}
              </a>
            </p>
            <p className="text-sm mt-4">EPA Certified Technicians</p>
            <p className="text-sm">Whirlpool Trained</p>
            <p className="text-sm">$69 Diagnostic Fee (credited toward repair)</p>
            <p className="text-sm mt-2">Mon-Fri: 8AM-6PM</p>
            <p className="text-sm">Sat: 10AM-4PM</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {majorAppliances.map((appliance) => (
                <li key={appliance.slug}>
                  <Link
                    href={`/services/${appliance.slug}-repair`}
                    className="hover:text-white transition text-sm"
                  >
                    {appliance.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-white font-semibold mb-4">Service Areas</h4>
            <ul className="space-y-2">
              {serviceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/service-areas#${area.slug}`}
                    className="hover:text-white transition text-sm"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/service-areas"
                  className="hover:text-white transition text-sm font-semibold"
                >
                  View All 45+ Cities →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get Free Quote</h4>
            <p className="text-sm mb-4">Same-day service available</p>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="text-gray-900 px-6 py-3 rounded-lg transition font-semibold inline-block mb-6 text-center"
              style={{ backgroundColor: '#FFC704' }}
            >
              {PHONE_DISPLAY}
            </a>

            <h4 className="text-white font-semibold mb-3 mt-6">Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="hover:text-white transition">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="max-w-4xl mx-auto text-xs text-gray-400 text-center space-y-2">
            <p>
              <strong className="text-gray-300">Independent Service Disclaimer:</strong> {BUSINESS_NAME} is an independent appliance repair service provider and is not affiliated with, authorized by, or endorsed by any of the appliance brands or manufacturers mentioned on this website.
            </p>
            <p>
              We provide independent, out-of-warranty repair services for all major appliance brands. All brand names, logos, and trademarks displayed on this website are the property of their respective owners and are used for informational purposes only to indicate the types of appliances we service.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 text-sm text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
