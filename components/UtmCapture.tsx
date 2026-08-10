'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { captureUtm } from '@/lib/utm';

// Invisible: stores Google Ads UTM params in sessionStorage on every navigation.
export default function UtmCapture() {
  const pathname = usePathname();

  useEffect(() => {
    captureUtm(window.location.search);
  }, [pathname]);

  return null;
}
