import type { Metadata } from 'next';
import CompanyHero from '@/components/company/CompanyHero';
import CompanyNav from '@/components/company/CompanyNav';
import CompanyCTA from '@/components/company/CompanyCTA';
import DistributorFinder from '@/components/company/DistributorFinder';

export const metadata: Metadata = {
  title: 'Find a Distributor | PDC Valve & Actuators',
  description:
    'Find PDC Valve & Actuator distributor support by state, territory, company, or product market.',
  alternates: { canonical: 'https://pdcvalve.com/company/find-a-distributor' },
};

export default function FindDistributorPage() {
  return (
    <>
      <CompanyHero
        eyebrow="PDC Sales Network"
        title="Find a Distributor"
        description="Connect with regional PDC distributor support. Select a state on the interactive map or search the directory by company, territory, contact, or product market."
        variant="distributors"
      />
      <CompanyNav />
      <DistributorFinder />
      <CompanyCTA />
    </>
  );
}
