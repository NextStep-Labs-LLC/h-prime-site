'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, Calendar, MapPin } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_NUMBER, BUSINESS_ADDRESS } from '@/lib/utils';
import { useModal } from '@/contexts/ModalContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useModal();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar - Service Call Fee */}
      <div className="hidden md:block w-full py-1.5 text-sm text-white" style={{ backgroundColor: '#1B2A4A' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>{BUSINESS_ADDRESS}</span>
          </div>
          <span className="font-semibold">Service call – $69 | SAVE $20 ON YOUR FIRST REPAIR!</span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center -my-2">
            <Image
              src="/logo-original.jpg"
              alt="H-Prime Appliance Repair Services"
              width={280}
              height={80}
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
              <div className="text-center text-sm font-semibold py-2" style={{ color: '#FFC704' }}>
                Service call – $69 | SAVE $20!
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
