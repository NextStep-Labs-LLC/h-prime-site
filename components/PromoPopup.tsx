'use client';

import { useState, useEffect } from 'react';
import { X, Tag } from 'lucide-react';
import { useModal } from '@/contexts/ModalContext';

const CURRENT_MONTH = new Date().toLocaleString('en-US', { month: 'long' });

export default function PromoPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { openModal } = useModal();

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem('promo-popup-dismissed')) {
      setIsDismissed(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('promo-popup-dismissed', 'true');
  };

  const handleClaim = () => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'promo_popup_click',
        label: 'save_35_march',
      });
    }
    handleDismiss();
    openModal();
  };

  if (isDismissed || !isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[60] animate-slide-up max-w-sm w-full mx-4 md:mx-0">
      <div
        className="rounded-xl shadow-2xl overflow-hidden border border-gray-200"
        style={{ backgroundColor: '#1B2A4A' }}
      >
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-white/60 hover:text-white transition p-1 z-10"
          aria-label="Close promotion"
        >
          <X size={18} />
        </button>

        <div className="p-5">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-3">
            <Tag size={16} style={{ color: '#FFC704' }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#FFC704' }}>
              {CURRENT_MONTH} Special
            </span>
          </div>

          {/* Offer */}
          <div className="mb-3">
            <span className="text-3xl font-bold text-white">SAVE $35</span>
            <p className="text-sm text-gray-300 mt-1">
              on any appliance repair service this {CURRENT_MONTH}!
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={handleClaim}
            className="w-full py-3 rounded-lg font-bold text-base cursor-pointer transition hover:brightness-90"
            style={{ backgroundColor: '#FFC704', color: '#1B2A4A' }}
          >
            Claim Your Discount
          </button>

          <p className="text-xs text-gray-400 mt-2 text-center">
            Mention this offer when booking. Limited time only.
          </p>
        </div>
      </div>
    </div>
  );
}
