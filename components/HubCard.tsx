'use client';

import Image from 'next/image';
import { Phone, ArrowRight } from 'lucide-react';
import type { Business } from '@/lib/data/businesses';

function track(event: string, business: string) {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({ event, business, label: 'hub_start' });
  }
}

// Attach attribution so Google Ads / GA4 can credit visits from the QR / business card.
function withUtm(url: string, business: string) {
  if (!url) return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}utm_source=qr&utm_medium=hub&utm_campaign=business_card&utm_content=${business}`;
}

export default function HubCard({ business }: { business: Business }) {
  if (!business.enabled) {
    return (
      <div className="flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 opacity-60">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl grayscale">
          <Image src={business.image} alt="" fill sizes="64px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-white">{business.name}</h2>
          <span className="mt-1 inline-block rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-white/60">
            Coming soon
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-lg transition hover:shadow-xl">
      <div className="flex items-center gap-4 p-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
          <Image src={business.image} alt={business.name} fill sizes="80px" className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold leading-tight" style={{ color: business.accent }}>
            {business.name}
          </h2>
          <p className="mt-1 text-sm text-gray-600">{business.tagline}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 px-4 pb-4">
        {business.showCall && (
          // Number is rendered as VISIBLE TEXT so the AWCC tag can swap it and track the call.
          <a
            href={`tel:${business.phone}`}
            onClick={() => track('hub_call', business.key)}
            className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-base font-bold transition"
            style={{ backgroundColor: '#FFC704', color: '#1B2A4A' }}
          >
            <Phone className="h-5 w-5" />
            {business.phoneDisplay}
          </a>
        )}
        <a
          href={withUtm(business.url, business.key)}
          onClick={() => track('hub_click', business.key)}
          className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white transition"
          style={{ backgroundColor: business.accent }}
        >
          Open site
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}
