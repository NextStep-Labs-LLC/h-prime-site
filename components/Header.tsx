'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, Calendar, MapPin } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_NUMBER, BUSINESS_ADDRESS } from '@/lib/utils';

const SocialIcon = ({ type, size = 16 }: { type: 'facebook' | 'instagram' | 'youtube'; size?: number }) => {
  const icons = {
    facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
    instagram: <><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></>,
    youtube: <><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></>,
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[type]}
    </svg>
  );
};

const SOCIAL_LINKS = [
  { href: 'https://www.facebook.com/HPrimeApplaincerepaire', type: 'facebook' as const, label: 'Facebook' },
  { href: 'https://www.instagram.com/_hprime_', type: 'instagram' as const, label: 'Instagram' },
  { href: 'https://www.youtube.com/@MeToTarass', type: 'youtube' as const, label: 'YouTube' },
];
import { useModal } from '@/contexts/ModalContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useModal();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="hidden md:block w-full py-1.5 text-sm text-white" style={{ backgroundColor: '#1B2A4A' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>{BUSINESS_ADDRESS}</span>
          </div>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ href, type, label }) => (
              <a key={type} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-white/80 hover:text-white transition">
                <SocialIcon type={type} size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center -my-2">
            <Image
              src="/logo-new.png"
              alt="H-Prime Appliance Repair Services"
              width={344}
              height={121}
              className="h-14 md:h-20 w-auto"
              priority
              quality={95}
            />
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
        <Link href="/#our-services" className="text-gray-900 hover:text-blue-400 transition font-medium">
          Services
        </Link>
        <Link href="/commercial" className="text-gray-900 hover:text-blue-400 transition font-medium">
          Commercial
        </Link>
        <Link href="/#brands" className="text-gray-900 hover:text-blue-400 transition font-medium">
          Brands
        </Link>
            <Link href="/#service-area" className="text-gray-900 hover:text-blue-400 transition font-medium">
              Service Area
            </Link>
            <Link href="#reviews" className="text-gray-900 hover:text-blue-400 transition font-medium">
              Reviews
            </Link>
            <button
            onClick={() => {
               if (typeof window !== 'undefined' && (window as any).dataLayer) {
                  (window as any).dataLayer.push({
                    event: 'open_lead_form',
                    label: 'header_button'
                  });
               }
               openModal();
            }}
            className="flex items-center gap-2 text-gray-900 px-6 py-2 rounded-lg transition font-semibold cursor-pointer"
            style={{ backgroundColor: '#FFC704' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6b300'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC704'}
          >
            <Calendar size={18} />
            Book a Service
          </button>
          <a
            href={`tel:${PHONE_NUMBER}`}
            onClick={() => {
               if (typeof window !== 'undefined' && (window as any).dataLayer) {
                  (window as any).dataLayer.push({
                    event: 'phone_click',
                    label: 'header_button'
                  });
               }
            }}
            className="flex items-center gap-2 text-white px-6 py-2 rounded-lg transition font-semibold"
            style={{ backgroundColor: '#1B2A4A' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#162240'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1B2A4A'}
          >
            <Phone size={18} />
            {PHONE_DISPLAY}
          </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition text-gray-900"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-3">
              <Link
                href="/#our-services"
                className="text-gray-900 hover:text-blue-400 transition py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/commercial"
                className="text-gray-900 hover:text-blue-400 transition py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Commercial
              </Link>
              <Link
                href="/#brands"
                className="text-gray-900 hover:text-blue-400 transition py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Brands
              </Link>
              <Link
                href="/#service-area"
                className="text-gray-900 hover:text-blue-400 transition py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Service Area
              </Link>
              <Link
                href="#reviews"
                className="text-gray-900 hover:text-blue-400 transition py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Reviews
              </Link>
              <a
              href={`tel:${PHONE_NUMBER}`}
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).dataLayer) {
                    (window as any).dataLayer.push({
                      event: 'phone_click',
                      label: 'mobile_menu'
                    });
                }
              }}
              className="flex items-center gap-2 text-white px-6 py-3 rounded-lg transition font-semibold justify-center"
              style={{ backgroundColor: '#1B2A4A' }}
            >
              <Phone size={18} />
              {PHONE_DISPLAY}
            </a>
              <div className="flex items-center gap-4 justify-center py-2 border-t mt-2 pt-2">
                {SOCIAL_LINKS.map(({ href, type, label }) => (
                  <a key={type} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-gray-500 hover:text-gray-900 transition">
                    <SocialIcon type={type} size={20} />
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-2 text-gray-600 justify-center py-2 text-sm border-t mt-2 pt-2">
                <MapPin size={16} />
                <span className="text-center">{BUSINESS_ADDRESS}</span>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
