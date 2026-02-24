import Link from 'next/link';
import { BUSINESS_NAME, PHONE_DISPLAY, BUSINESS_EMAIL } from '@/lib/utils';

export const metadata = {
  title: 'Do Not Sell or Share My Personal Information | H-Prime Appliance Repair Services',
  description: 'California residents can opt out of the sale or sharing of personal information.',
  robots: 'noindex, nofollow',
};

export default function DoNotSellPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Do Not Sell or Share My Personal Information
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-sm text-gray-500">
              <strong>Last Updated:</strong> January 9, 2026
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Right to Opt-Out</h2>
              <p>
                Under the California Consumer Privacy Act (CCPA) and other applicable privacy laws, 
                California residents have the right to opt out of the "sale" or "sharing" of their 
                personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Data Practices</h2>
              <div className="bg-orange-50 border-l-4 border-orange-600 p-6 my-6">
                <p className="text-lg font-semibold text-green-900 mb-2">
                  ✓ We Do NOT Sell Your Personal Information
                </p>
                <p className="text-green-800">
                  {BUSINESS_NAME} does not sell personal information to third parties for monetary 
                  or other valuable consideration.
                </p>
              </div>
              <p>
                We respect your privacy and are committed to protecting your personal information. 
                We only share information with service providers who help us operate our business 
                (such as payment processors and scheduling software) under strict confidentiality agreements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Does "Sale" Mean Under CCPA?</h2>
              <p>
                Under the CCPA, "sale" is broadly defined as sharing personal information with third 
                parties in exchange for monetary or other valuable consideration. This can include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Sharing data with advertising networks</li>
                <li>Allowing third parties to collect data through cookies for their own purposes</li>
                <li>Providing customer lists to data brokers</li>
              </ul>
              <p className="font-semibold text-green-900 mt-4">
                We do not engage in any of these practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Share</h2>
              <p>
                We only share personal information with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Service Providers:</strong> Companies that help us provide services 
                  (payment processing, scheduling, customer communications)
                </li>
                <li>
                  <strong>Legal Authorities:</strong> When required by law or to protect our legal rights
                </li>
                <li>
                  <strong>Business Transfers:</strong> In the event of a merger, acquisition, or asset sale
                </li>
              </ul>
              <p className="mt-4">
                These disclosures are <strong>not considered "sales"</strong> under the CCPA because 
                they are for business purposes only and covered by contractual protections.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cookies and Tracking Technologies</h2>
              <p>
                Our website uses cookies for essential functionality and analytics. We do not use 
                third-party advertising cookies that would constitute "sharing" under CCPA. You can 
                control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How to Submit an Opt-Out Request</h2>
              <p>
                Even though we do not sell personal information, California residents can submit an 
                opt-out request to ensure their information is not shared in ways they don't expect.
              </p>
              <p>To submit a request:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Call Us:</strong>{' '}
                  <a href={`tel:${PHONE_DISPLAY.replace(/\D/g, '')}`} className="text-orange-600 hover:underline font-semibold">
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li>
                  <strong>State Your Request:</strong> Tell us you want to opt out of the sale/sharing 
                  of your personal information
                </li>
              </ul>
              <p className="mt-4">
                We will process your request within 15 business days and confirm receipt within 10 days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">No Discrimination</h2>
              <p>
                You have the right to not be discriminated against for exercising your CCPA rights. 
                We will not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Deny you services</li>
                <li>Charge different prices or rates</li>
                <li>Provide a different level or quality of service</li>
                <li>Suggest that you will receive different prices or quality of service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Other Privacy Rights</h2>
              <p>
                California residents have additional privacy rights under the CCPA. For more information, 
                please see our:
              </p>
              <ul className="list-none space-y-2 mt-4">
                <li>
                  →{' '}
                  <Link href="/privacy-policy" className="text-orange-600 hover:underline font-semibold">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  →{' '}
                  <Link href="/ca-notice-at-collection" className="text-orange-600 hover:underline font-semibold">
                    California Notice at Collection
                  </Link>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Changes to This Policy</h2>
              <p>
                If our data practices change and we begin selling or sharing personal information, 
                we will update this page and provide notice as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
              <p>
                If you have questions about our data practices or want to exercise your privacy rights, 
                contact us:
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

          <div className="mt-12 pt-8 border-t border-gray-200 text-center space-x-4">
            <Link 
              href="/privacy-policy" 
              className="inline-block px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold"
            >
              Privacy Policy
            </Link>
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
