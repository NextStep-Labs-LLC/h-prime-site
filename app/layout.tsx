import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ModalProvider } from '@/contexts/ModalContext';
import LeadFormModalWrapper from '@/components/LeadFormModalWrapper';
import StickyMobileBar from '@/components/StickyMobileBar';
import PromoPopup from '@/components/PromoPopup';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export const metadata: Metadata = {
  title: 'H-Prime Appliance Repair Services | Denver, CO | Same-Day Service',
  description: 'Professional appliance repair in the Denver Metro area. Same-day service, EPA certified technicians, $69 diagnostic fee. Repair all major brands - refrigerators, washers, dryers & more. Call (720) 784-6766!',
  keywords: 'appliance repair, Denver, Colorado, refrigerator repair, washer repair, dryer repair, same-day service, H-Prime',
  openGraph: {
    title: 'H-Prime Appliance Repair Services | Same-Day Service in Denver, CO',
    description: 'Professional appliance repair in the Denver Metro area. Same-day service, $69 diagnostic fee.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script id="gtm" strategy="afterInteractive">{`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-W3VTDPFL');
      `}</Script>
      <body className={inter.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W3VTDPFL"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ModalProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <LeadFormModalWrapper />
          <StickyMobileBar />
          <PromoPopup />
        </ModalProvider>
      </body>
    </html>
  );
}
