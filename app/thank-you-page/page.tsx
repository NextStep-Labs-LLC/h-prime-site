import { CheckCircle, Phone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PHONE_NUMBER, PHONE_DISPLAY, BUSINESS_NAME } from '@/lib/utils';
import ThankYouTracker from '@/components/ThankYouTracker';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Thank You | ${BUSINESS_NAME}`,
  description: 'Your service request has been received. Our team will contact you shortly.',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="py-20 bg-gray-50 min-h-[60vh] flex items-center">
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

          <p className="text-lg text-gray-600 mb-8">
            Your service request has been received. Our team will contact you
            shortly to confirm the appointment details.
          </p>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              What Happens Next?
            </h2>
            <ul className="text-left text-gray-600 space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#1B2A4A' }} />
                <span>Our dispatcher will call you to confirm the time slot</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#1B2A4A' }} />
                <span>A certified technician will arrive at the scheduled time</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#1B2A4A' }} />
                <span>Diagnostic fee is only $69 — waived if you proceed with the repair</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-colors"
              style={{ backgroundColor: '#1B2A4A' }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors"
              style={{ backgroundColor: '#FFD700', color: '#1B2A4A' }}
            >
              <Phone className="w-5 h-5" />
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
