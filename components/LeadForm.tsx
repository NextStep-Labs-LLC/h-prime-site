'use client';

import { useEffect, useState } from 'react';
import { getWorkizBookingUrl } from '@/lib/utm';

export default function LeadForm() {
  // Resolved on the client so ad_group reflects the visitor's ads campaign
  const [bookingUrl, setBookingUrl] = useState<string | null>(null);

  useEffect(() => {
    setBookingUrl(getWorkizBookingUrl());
  }, []);

  return (
    <section id="lead-form" className="py-16 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Request Service Today
            </h2>
            <p className="text-lg text-gray-600">
              Book online and we&apos;ll confirm your appointment shortly
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {bookingUrl ? (
              <iframe
                src={bookingUrl}
                width="100%"
                height="700"
                style={{ border: 'none' }}
                title="Book H-Prime Appliance Repair Service"
                loading="lazy"
              />
            ) : (
              <div style={{ height: 700 }} aria-hidden="true" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
