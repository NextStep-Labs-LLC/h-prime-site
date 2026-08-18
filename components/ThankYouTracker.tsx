'use client';

import { useEffect } from 'react';
import { measureLead } from '@/lib/oaiq';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export default function ThankYouTracker() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'thank_you' });
    measureLead();
  }, []);

  return null;
}
