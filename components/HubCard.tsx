'use client';

import { WashingMachine, Dumbbell, Wind, Building2, Phone, ArrowRight } from 'lucide-react';
import type { Business } from '@/lib/data/businesses';

const ICONS = {
  WashingMachine,
  Dumbbell,
  Wind,
  Building2,
} as const;

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
  const Icon = ICONS[business.icon];

  if (!business.enabled) {
    return (
      <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 opacity-60">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
          <Icon className="h-6 w-6 text-white/70" />
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-white">{business.name}</h2>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-white/60">
              Coming soon
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group rounded-2xl border border-white/10 bg-white p-5 shadow-lg transition hover:shadow-xl">
      <div className="flex items-center gap-4">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: '#FFF8E0' }}
        >
          <Icon className="h-6 w-6" style={{ color: business.accent }} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold" style={{ color: business.accent }}>
            {business.name}
          </h2>
          <p className="mt-0.5 text-sm text-gray-600">{business.tagline}</p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <a
          href={withUtm(business.url, business.key)}
          onClick={() => track('hub_click', business.key)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white transition"
          style={{ backgroundColor: business.accent }}
        >
          Open site
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </a>
        <a
          href={`tel:${business.phone}`}
          onClick={() => track('hub_call', business.key)}
          aria-label={`Call ${business.name} at ${business.phoneDisplay}`}
          className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition"
          style={{ backgroundColor: '#FFC704', color: '#1B2A4A' }}
        >
          <Phone className="h-4 w-4" />
          <span className="hidden sm:inline">Call</span>
        </a>
      </div>
    </div>
  );
}
