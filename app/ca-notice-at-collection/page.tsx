import Link from 'next/link';
import { BUSINESS_NAME, PHONE_DISPLAY, BUSINESS_EMAIL } from '@/lib/utils';

export const metadata = {
  title: 'California Notice at Collection | H-Prime Appliance Repair Services',
  description: 'California Consumer Privacy Act (CCPA) notice for California residents.',
  robots: 'noindex, nofollow',
};

export default function CANoticeAtCollectionPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            California Notice at Collection
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-sm text-gray-500">
              <strong>Effective Date:</strong> January 9, 2026<br />
              <strong>Last Updated:</strong> January 9, 2026
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Notice for California Residents</h2>
              <p>
                This California Notice at Collection applies to California residents and supplements 
                our <Link href="/privacy-policy" className="text-orange-600 hover:underline">Privacy Policy</Link>. 
                It describes how {BUSINESS_NAME}, operated by H-Prime Appliance Repair Services LLC, collects, uses, and 
                discloses personal information as required by the California Consumer Privacy Act (CCPA).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Categories of Personal Information We Collect</h2>
              <p>
                We collect the following categories of personal information from California residents:
              </p>
              
              <div className="space-y-4 mt-4">
                <div className="border-l-4 border-orange-600 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900">A. Identifiers</h3>
                  <p className="text-sm">
                    Real name, alias, postal address, unique personal identifier, online identifier, 
                    Internet Protocol address, email address, account name, or other similar identifiers.
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Examples:</strong> Name, address, email, phone number, IP address
                  </p>
                </div>

                <div className="border-l-4 border-orange-600 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900">B. Customer Records Information</h3>
                  <p className="text-sm">
                    Personal information categories listed in California Customer Records statute 
                    (Cal. Civ. Code § 1798.80(e)).
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Examples:</strong> Name, address, telephone number, payment information, 
                    service history
                  </p>
                </div>

                <div className="border-l-4 border-orange-600 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900">C. Commercial Information</h3>
                  <p className="text-sm">
                    Records of services purchased or considered, purchasing or consuming histories or tendencies.
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Examples:</strong> Appliance repair history, service quotes, invoices
                  </p>
                </div>

                <div className="border-l-4 border-orange-600 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900">D. Internet or Network Activity</h3>
                  <p className="text-sm">
                    Browsing history, search history, information on interaction with website or advertisement.
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Examples:</strong> Pages visited, clicks, time spent on site
                  </p>
                </div>

                <div className="border-l-4 border-orange-600 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900">E. Geolocation Data</h3>
                  <p className="text-sm">
                    Physical location or movements.
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Examples:</strong> Service address, general geographic area
                  </p>
                </div>

                <div className="border-l-4 border-orange-600 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900">F. Inferences</h3>
                  <p className="text-sm">
                    Profile reflecting preferences, characteristics, behavior, or attitudes.
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Examples:</strong> Service preferences, communication preferences
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Sources of Personal Information</h2>
              <p>We collect this information from:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Directly from you when you request services, contact us, or use our website</li>
                <li>Automatically through cookies and tracking technologies</li>
                <li>From third-party service providers (payment processors, scheduling platforms)</li>
                <li>Publicly available sources</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Business or Commercial Purposes for Collection</h2>
              <p>We use personal information for the following business purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing appliance repair services</li>
                <li>Processing payments and transactions</li>
                <li>Communicating with customers about services and appointments</li>
                <li>Customer service and support</li>
                <li>Marketing and advertising (with consent)</li>
                <li>Website analytics and improvement</li>
                <li>Security and fraud prevention</li>
                <li>Legal compliance and protection of rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Disclosure of Personal Information</h2>
              <p>
                We may disclose your personal information to service providers, payment processors, 
                and other third parties for business purposes. We do not sell personal information 
                to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your California Privacy Rights</h2>
              <p>California residents have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Right to Know:</strong> Request disclosure of categories and specific pieces of personal information collected</li>
                <li><strong>Right to Delete:</strong> Request deletion of personal information</li>
                <li><strong>Right to Opt-Out:</strong> Opt out of the sale of personal information (we do not sell personal information)</li>
                <li><strong>Right to Non-Discrimination:</strong> Not be discriminated against for exercising privacy rights</li>
                <li><strong>Right to Correct:</strong> Request correction of inaccurate personal information</li>
                <li><strong>Right to Limit:</strong> Limit use and disclosure of sensitive personal information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How to Exercise Your Rights</h2>
              <p>
                To exercise your California privacy rights, please contact us:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Phone: <a href={`tel:${PHONE_DISPLAY.replace(/\D/g, '')}`} className="text-orange-600 hover:underline">{PHONE_DISPLAY}</a></li>
                <li>
                  Submit a request via our{' '}
                  <Link href="/do-not-sell" className="text-orange-600 hover:underline">
                    Do Not Sell My Personal Information
                  </Link>
                  {' '}page
                </li>
              </ul>
              <p className="mt-4">
                We will verify your identity before processing your request. We will respond to 
                verifiable requests within 45 days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Authorized Agent</h2>
              <p>
                You may designate an authorized agent to make a request on your behalf. The authorized 
                agent must provide proof of authorization, and we may require you to verify your identity 
                directly with us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Retention Period</h2>
              <p>
                We retain personal information for as long as necessary to fulfill the purposes outlined 
                in this notice, unless a longer retention period is required or permitted by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Information</h2>
              <p>
                If you have questions about this California Notice at Collection, please contact us:
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
