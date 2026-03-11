'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const WORKIZ_BOOKING_URL =
  'https://online-booking.workiz.com/?ac=83c5b14b03e62f92f919b8b4eeb24b5d79e56eebb87e6461f45b9b3a4f852d4e';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadFormModal({ isOpen, onClose }: LeadFormModalProps) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      firedRef.current = false;
      return;
    }

    function handleMessage(e: MessageEvent) {
      if (!e.origin.includes('workiz.com')) return;
      if (firedRef.current) return;

      const data = typeof e.data === 'string' ? e.data : JSON.stringify(e.data);
      const isCompletion =
        /complet|success|done|confirm|thank|finish|book/i.test(data);

      if (isCompletion) {
        firedRef.current = true;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: 'thank_you' });
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900">
            Book Appliance Repair Service
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Workiz Booking iframe */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <iframe
            src={WORKIZ_BOOKING_URL}
            width="100%"
            height="700"
            style={{ border: 'none', minHeight: '700px' }}
            title="Book H-Prime Appliance Repair Service"
          />
        </div>
      </div>
    </div>
  );
}
