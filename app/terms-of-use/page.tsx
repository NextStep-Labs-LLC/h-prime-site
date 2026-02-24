import Link from 'next/link';
import { BUSINESS_NAME, PHONE_DISPLAY, BUSINESS_EMAIL } from '@/lib/utils';

export const metadata = {
  title: 'Terms of Use | H-Prime Appliance Repair Services',
  description: 'Terms and conditions for using H-Prime Appliance Repair Services website and services.',
  robots: 'noindex, nofollow',
};

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Terms of Use
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-sm text-gray-500">
              <strong>Last Updated:</strong> January 9, 2026
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the website of {BUSINESS_NAME} ("we," "us," or "our"), 
                you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to these terms, please do not use this website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Services Description</h2>
              <p>
                {BUSINESS_NAME}, operated by H-Prime Appliance Repair Services LLC, provides appliance repair services 
                for residential and commercial customers. All services are subject to availability 
                and scheduling.
              </p>
              <p>
                We repair all major brands of appliances including refrigerators, washers, dryers, 
                dishwashers, ovens, and more. Service appointments, pricing, and availability are 
                subject to change.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Use of Website</h2>
              <p>You agree to use this website only for lawful purposes and in a way that does not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Infringe upon the rights of others</li>
                <li>Restrict or inhibit anyone else's use of the website</li>
                <li>Transmit any harmful or malicious code</li>
                <li>Collect or harvest personal data about other users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Service Appointments and Pricing</h2>
              <p>
                All service appointments are subject to technician availability. Pricing quoted is 
                an estimate and may vary based on actual diagnosis and parts required. Final pricing 
                will be provided before any repair work begins.
              </p>
              <p>
                We reserve the right to refuse service to any customer for any lawful reason, 
                including but not limited to unsafe working conditions or abusive behavior.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Warranty and Liability</h2>
              <p>
                All repairs performed by {BUSINESS_NAME} come with a warranty on parts and labor 
                as specified in your service agreement. We are not liable for pre-existing damage, 
                normal wear and tear, or damage caused by misuse after repair.
              </p>
              <p>
                Our liability is limited to the cost of the repair service provided. We are not 
                liable for consequential or incidental damages including loss of business, food 
                spoilage, or other indirect losses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Independent Service Provider</h2>
              <p>
                {BUSINESS_NAME} is an independent appliance repair service provider and is not 
                affiliated with, authorized by, or endorsed by any appliance brand or manufacturer 
                mentioned on this website. All brand names and trademarks are the property of their 
                respective owners and are used for informational purposes only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, images, and software, 
                is the property of {BUSINESS_NAME} or its content suppliers and is protected by 
                United States and international copyright laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Third-Party Links</h2>
              <p>
                This website may contain links to third-party websites. We are not responsible for 
                the content, privacy policies, or practices of any third-party websites. Your use 
                of such websites is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Your continued use of the 
                website after changes are posted constitutes your acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of the 
                State of Colorado, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Use, please contact us:
              </p>
              <p>
                <strong>{BUSINESS_NAME}</strong><br />
                H-Prime Appliance Repair Services LLC<br />
                CO<br />
                Phone: <a href={`tel:${PHONE_DISPLAY.replace(/\D/g, '')}`} className="text-orange-600 hover:underline">{PHONE_DISPLAY}</a><br />
                Email: <a href={`mailto:${BUSINESS_EMAIL}`} className="text-orange-600 hover:underline">{BUSINESS_EMAIL}</a>
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <Link 
              href="/" 
              className="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
