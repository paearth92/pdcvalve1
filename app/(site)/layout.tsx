import Header from '@/components/layout/Header';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import Footer from '@/components/layout/Footer';
import { RFQProvider } from '@/components/rfq/RFQProvider';
import RFQDialog from '@/components/rfq/RFQDialog';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
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
  );
}
