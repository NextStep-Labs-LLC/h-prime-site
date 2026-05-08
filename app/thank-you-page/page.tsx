import { CheckCircle, Phone, ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';
import { PHONE_NUMBER, PHONE_DISPLAY, BUSINESS_NAME } from '@/lib/utils';
import ThankYouTracker from '@/components/ThankYouTracker';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Thank You | ${BUSINESS_NAME}`,
  description: 'Your repair appointment is confirmed.',
  robots: { index: false, follow: false },
};

const formatDate = (iso?: string) => {
  if (!iso) return null;
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; time?: string }>;
}) {
  const params = await searchParams;
  const date = formatDate(params.date);
  const time = params.time;
  const hasAppointment = Boolean(date && time);

  return (
    <section className="py-16 bg-gray-50 min-h-[60vh] flex items-center">
      <ThankYouTracker />
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#FFF8E0' }}
            >
              <CheckCircle className="w-12 h-12" style={{ color: '#1B2A4A' }} />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Thank You for Booking!
          </h1>

          {hasAppointment ? (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-center gap-2 text-gray-600 mb-3">
                <Clock className="w-5 h-5" style={{ color: '#1B2A4A' }} />
                <span className="text-sm uppercase tracking-wide font-semibold">
                  Your appointment
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{date}</p>
              <p className="text-xl text-gray-700 mb-4">{time}</p>
              <p className="text-sm text-gray-500">
                A certified technician will arrive within this time window.
              </p>
            </div>
          ) : (
            <p className="text-lg text-gray-600 mb-6">
              Your service request is confirmed. A certified technician will arrive at the time you selected during booking.
            </p>
          )}

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Have questions before we arrive?
            </h2>
            <p className="text-gray-600 mb-4">Call us any time:</p>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-lg transition-colors"
              style={{ backgroundColor: '#FFD700', color: '#1B2A4A' }}
            >
              <Phone className="w-5 h-5" />
              Call {PHONE_DISPLAY}
            </a>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Transparent pricing — no hidden fees or surprises.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
