'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyMobileBar from '@/components/StickyMobileBar';
import PromoPopup from '@/components/PromoPopup';

// Standalone brand routes that should NOT show the appliance-specific chrome.
const BARE_ROUTES = ['/start'];

export function ChromeTop() {
  const pathname = usePathname();
  if (BARE_ROUTES.includes(pathname)) return null;
  return <Header />;
}

export function ChromeBottom() {
  const pathname = usePathname();
  if (BARE_ROUTES.includes(pathname)) return null;
  return (
    <>
      <Footer />
      <StickyMobileBar />
      <PromoPopup />
    </>
  );
}
