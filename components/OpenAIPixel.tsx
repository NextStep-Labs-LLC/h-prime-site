'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { measurePageView, measurePhoneCall } from '@/lib/oaiq';

/**
 * Boots the ChatGPT Ads pixel and reports a page_viewed on every route change —
 * the SDK does not auto-track page views.
 *
 * Phone clicks are captured with one delegated listener instead of wiring every
 * CTA: tel: links live in six components (Header, Footer, HeroCTAButtons,
 * StickyMobileBar, HubCard, SEOContent) and each already pushes its own GTM
 * dataLayer event — duplicating oaiq calls in all of them would drift the two
 * trackers apart the first time someone adds a new tel: link.
 */
export default function OpenAIPixel() {
  const pathname = usePathname();

  useEffect(() => {
    measurePageView();
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest?.('a[href^="tel:"]')) measurePhoneCall();
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
