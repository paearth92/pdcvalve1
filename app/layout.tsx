import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
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
      <body className={`${montserrat.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
