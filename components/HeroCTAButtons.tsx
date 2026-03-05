'use client';

import { Phone, Calendar } from 'lucide-react';
import { PHONE_NUMBER, PHONE_DISPLAY } from '@/lib/utils';
import { useModal } from '@/contexts/ModalContext';

export default function HeroCTAButtons() {
  const { openModal } = useModal();

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 order-2 md:order-1 md:mb-8">
      {/* Promo Banner Button */}
      <button
        onClick={openModal}
        className="flex items-center justify-center gap-2 px-6 py-3 md:py-4 rounded-lg font-bold text-lg cursor-pointer transition hover:brightness-90 w-full md:w-auto shadow-lg"
        style={{ backgroundColor: '#FFC704', color: '#1B2A4A' }}
      >
        SAVE $20 ON YOUR FIRST REPAIR!
      </button>
      <a
        href={`tel:${PHONE_NUMBER}`}
        className="flex items-center gap-2 md:gap-3 text-white px-6 md:px-10 py-3 md:py-5 rounded-lg transition font-semibold text-base md:text-xl shadow-lg hover:shadow-xl w-full md:w-auto justify-center"
        style={{ backgroundColor: '#1B2A4A' }}
      >
        <Phone size={20} className="md:w-7 md:h-7" />
        <span className="whitespace-nowrap">{PHONE_DISPLAY}</span>
      </a>
      <button
        onClick={openModal}
        className="flex items-center gap-2 md:gap-3 text-gray-900 px-6 md:px-10 py-3 md:py-5 rounded-lg transition font-semibold text-base md:text-xl shadow-lg hover:shadow-xl w-full md:w-auto justify-center cursor-pointer"
        style={{ backgroundColor: '#FFC704' }}
      >
        <Calendar size={20} className="md:w-7 md:h-7" />
        <span className="whitespace-nowrap">Book a Service</span>
      </button>
    </div>
  );
}
