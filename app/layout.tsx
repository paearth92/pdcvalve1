import './globals.css';
import type { Metadata } from 'next';
import { Manrope, Playfair_Display } from 'next/font/google';
import Header from '@/components/layout/Header';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import Footer from '@/components/layout/Footer';
import { RFQProvider } from '@/components/rfq/RFQProvider';
import RFQDialog from '@/components/rfq/RFQDialog';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['700', '900'],
  display: 'swap',
});

const isProduction =
  process.env.NODE_ENV === 'production' &&
  (!process.env.NEXT_PUBLIC_VERCEL_ENV ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production');

export const metadata: Metadata = {
  metadataBase: new URL('https://www.pdcvalve.com'),
  title: 'PDC Valve & Actuators | Precision Flow Control Solutions',
  description:
    'PDC Valve & Actuators designs and manufactures high-performance valves and actuators for industrial flow control applications worldwide.',
  icons: {
    icon: '/images/pdc-logo.png',
    shortcut: '/images/pdc-logo.png',
    apple: '/images/pdc-logo.png',
  },
  openGraph: {
    title: 'PDC Valve & Actuators | Precision Flow Control Solutions',
    description:
      'High-performance valves and actuators for industrial flow control applications worldwide.',
    type: 'website',
    images: ['/images/pdc-logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDC Valve & Actuators | Precision Flow Control Solutions',
    description:
      'High-performance valves and actuators for industrial flow control applications worldwide.',
    images: ['/images/pdc-logo.png'],
  },
  robots: isProduction
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${playfair.variable} font-sans antialiased`}>
        <RFQProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pb-16 sm:pb-0">{children}</main>
            <div className="pb-16 sm:pb-0">
              <Footer />
            </div>
            <MobileBottomNav />
          </div>
          <RFQDialog />
        </RFQProvider>
      </body>
    </html>
  );
}
