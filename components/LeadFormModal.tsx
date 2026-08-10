'use client';

import { X } from 'lucide-react';
import { getWorkizBookingUrl } from '@/lib/utm';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadFormModal({ isOpen, onClose }: LeadFormModalProps) {
  if (!isOpen) return null;

  // Modal only mounts on user click (client-side), safe to read sessionStorage here
  const bookingUrl = getWorkizBookingUrl();

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
            src={bookingUrl}
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
