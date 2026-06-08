import Image from 'next/image';
import type { Metadata } from 'next';
import { BUSINESSES } from '@/lib/data/businesses';
import HubCard from '@/components/HubCard';

export const metadata: Metadata = {
  title: 'H-Prime Service & Repair | Choose a Service',
  description:
    'H-Prime — appliance repair, fitness equipment repair and more in the Denver Metro area. Pick the service you need.',
  // Utility router page reached via QR — keep it out of the index, no canonical duplication.
  robots: { index: false, follow: true },
  openGraph: {
    title: 'H-Prime Service & Repair',
    description: 'One company, multiple home & equipment services. Choose what you need.',
    type: 'website',
  },
};

export default function StartPage() {
  return (
    <section
      className="flex min-h-screen flex-col items-center px-4 py-12"
      style={{ background: 'linear-gradient(160deg, #1B2A4A 0%, #0F1A30 100%)' }}
    >
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="rounded-2xl bg-white px-5 py-3 shadow-lg">
            <Image
              src="/logo-new.png"
              alt="H-Prime Service & Repair"
              width={344}
              height={121}
              className="h-14 w-auto"
              priority
            />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-white">H-Prime Service &amp; Repair</h1>
          <p className="mt-2 text-sm text-white/70">
            One company, multiple services. Choose what you need below.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {BUSINESSES.map((b) => (
            <HubCard key={b.key} business={b} />
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-white/40">
          © {new Date().getFullYear()} H-Prime · Denver, CO
        </p>
      </div>
    </section>
  );
}
