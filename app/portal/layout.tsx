import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: { default: 'PDC Customer Portal', template: '%s | PDC Customer Portal' },
  robots: { index: false, follow: false },
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
