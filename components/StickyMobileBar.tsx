'use client';

import { useState, useEffect } from 'react';
import { Phone, Calendar } from 'lucide-react';
import { PHONE_NUMBER, PHONE_DISPLAY } from '@/lib/utils';
import { useModal } from '@/contexts/ModalContext';

export default function StickyMobileBar() {
  const [isVisible, setIsVisible] = useState(false);
  const { openModal, isModalOpen } = useModal();

  useEffect(() => {
    // Show sticky bar only when hero block is scrolled out of view
    const handleScroll = () => {
      const heroHeight = window.innerHeight; // Hero занимает 100vh
      const scrollY = window.scrollY;
      
      // Показываем, когда проскроллили больше 80% hero блока
      setIsVisible(scrollY > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    const handlePhoneClick = () => {
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'phone_click',
          label: 'mobile_sticky_bar'
        });
      }
    };

    return (
      <>
        {/* Sticky Bar - Mobile Only */}
        <div
          className={`md:hidden fixed bottom-0 left-0 right-0 z-[999] bg-white shadow-2xl border-t-2 border-gray-200 transition-transform duration-300 ${
            isVisible && !isModalOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="flex">
            {/* Call Button */}
            <a
              href={`tel:${PHONE_NUMBER}`}
              onClick={handlePhoneClick}
              className="flex-1 text-white py-4 text-center font-semibold text-base transition flex items-center justify-center gap-2"
              style={{ backgroundColor: '#1B2A4A' }}
            >
              <Phone size={20} />
              {PHONE_DISPLAY}
            </a>
  
            {/* Request Service Button */}
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).dataLayer) {
                  (window as any).dataLayer.push({
                    event: 'open_lead_form',
                    label: 'mobile_sticky_bar'
                  });
                }
                openModal();
              }}
              className="flex-1 text-gray-900 py-4 text-center font-semibold text-base transition flex items-center justify-center gap-2"
              style={{ backgroundColor: '#FFC704' }}
            >
            <Calendar size={20} />
            Request Service
          </button>
        </div>
      </div>
    </>
  );
}

