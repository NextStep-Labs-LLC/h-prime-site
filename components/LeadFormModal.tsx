'use client';

import { X } from 'lucide-react';

const WORKIZ_BOOKING_URL =
  'https://online-booking.workiz.com/?ac=83c5b14b03e62f92f919b8b4eeb24b5d79e56eebb87e646lf45b9b3a4f852d4e';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadFormModal({ isOpen, onClose }: LeadFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
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
        <iframe
          src={WORKIZ_BOOKING_URL}
          width="100%"
          height="700"
          style={{ border: 'none' }}
          title="Book H-Prime Appliance Repair Service"
        />
      </div>
    </div>
  );
}
