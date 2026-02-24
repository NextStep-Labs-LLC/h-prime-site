import Link from 'next/link';
import { BUSINESS_NAME, PHONE_DISPLAY, BUSINESS_EMAIL } from '@/lib/utils';

export const metadata = {
  title: 'Privacy Policy | H-Prime Appliance Repair Services',
  description: 'Privacy policy for H-Prime Appliance Repair Services. Learn how we collect, use, and protect your personal information.',
  robots: 'noindex, nofollow',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-sm text-gray-500">
              <strong>Effective Date:</strong> January 9, 2026<br />
              <strong>Last Updated:</strong> January 9, 2026
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
              <p>
                {BUSINESS_NAME}, operated by H-Prime Appliance Repair Services LLC ("we," "us," or "our"), respects your 
                privacy and is committed to protecting your personal information. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you visit 
                our website or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Personal Information</h3>
              <p>We may collect personal information that you voluntarily provide to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and contact information (email address, phone number, mailing address)</li>
                <li>Service address (if different from contact address)</li>
                <li>Appliance information and service history</li>
                <li>Payment information (processed securely through our payment processor)</li>
                <li>Communications with us (emails, phone calls, text messages)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Automatically Collected Information</h3>
              <p>When you visit our website, we may automatically collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address and browser information</li>
                <li>Device information (type, operating system)</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referring website or source</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our appliance repair services</li>
                <li>Schedule appointments and dispatch technicians</li>
                <li>Process payments and send receipts</li>
                <li>Communicate with you about services, appointments, and updates</li>
                <li>Send service reminders and maintenance tips</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Analyze website usage and improve user experience</li>
                <li>Comply with legal obligations and protect our rights</li>
                <li>Send marketing communications (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. How We Share Your Information</h2>
              <p>We do not sell your personal information. We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Providers:</strong> Third-party companies that help us operate our business (payment processors, scheduling software, etc.)</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar technologies to enhance your browsing experience, analyze 
                website traffic, and understand user preferences. You can control cookies through your 
                browser settings, but disabling cookies may limit website functionality.
              </p>
              <p>Types of cookies we use:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Data Security</h2>
              <p>
                We implement reasonable administrative, technical, and physical security measures to 
                protect your personal information. However, no method of transmission over the internet 
                or electronic storage is 100% secure. We cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Your Privacy Rights</h2>
              <p>Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Opt-Out:</strong> Opt out of marketing communications</li>
                <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Non-Discrimination:</strong> You will not be discriminated against for exercising your rights</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. California Residents (CCPA)</h2>
              <p>
                If you are a California resident, you have additional rights under the California 
                Consumer Privacy Act (CCPA). Please see our{' '}
                <Link href="/ca-notice-at-collection" className="text-orange-600 hover:underline">
                  California Notice at Collection
                </Link>
                {' '}and{' '}
                <Link href="/do-not-sell" className="text-orange-600 hover:underline">
                  Do Not Sell My Personal Information
                </Link>
                {' '}pages for more information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Children's Privacy</h2>
              <p>
                Our website and services are not directed to children under 13 years of age. We do not 
                knowingly collect personal information from children under 13. If you believe we have 
                collected information from a child under 13, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Third-Party Websites</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the 
                privacy practices of these websites. We encourage you to review their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Contact Us</h2>
              <p>
                If you have questions or concerns about this Privacy Policy or our privacy practices, 
                please contact us:
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
