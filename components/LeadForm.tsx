'use client';

const WORKIZ_BOOKING_URL =
  'https://online-booking.workiz.com/?ac=83c5b14b03e62f92f919b8b4eeb24b5d79e56eebb87e6461f45b9b3a4f852d4e&ad_group=Appliance%20Repair';

export default function LeadForm() {
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
            <iframe
              src={WORKIZ_BOOKING_URL}
              width="100%"
              height="700"
              style={{ border: 'none' }}
              title="Book H-Prime Appliance Repair Service"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
