import { CheckCircle, Clock, Users, Wrench } from 'lucide-react';
import { BUSINESS_NAME } from '@/lib/utils';

const reasons = [
  { icon: CheckCircle, title: 'Certified Technicians', text: 'Factory-trained technicians for all major appliance brands. Professional service you can trust.' },
  { icon: Clock, title: 'Same-Day Service', text: "Same-day or next-day appointments available. We know you can't wait — we respond fast." },
  { icon: Users, title: 'Trusted by Neighbors', text: 'Denver families trust us for fast, reliable repairs. We fix it right the first time.' },
  { icon: Wrench, title: 'Upfront Pricing', text: 'Transparent pricing with no hidden fees. Fully insured for your peace of mind.' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose {BUSINESS_NAME}?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {reasons.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                  <Icon className="w-10 h-10 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
              <p className="text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
