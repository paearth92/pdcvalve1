import type { Metadata } from 'next';
import { Download, ExternalLink } from 'lucide-react';
import CompanyHero from '@/components/company/CompanyHero';

const termsDocument = '/documents/legal/pdc-terms-and-conditions-of-sale-v007.pdf';

export const metadata: Metadata = {
  title: 'Terms and Conditions of Sale | PDC Valve & Actuators',
  description: 'Read or download PDC’s Terms and Conditions of Sale.',
  alternates: { canonical: 'https://pdcvalve.com/terms-and-conditions' },
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <CompanyHero
        eyebrow="Legal"
        title="Terms and Conditions of Sale"
        description="Review the supplied terms below, or open or download the original PDF."
        variant="legal"
      />

      <main className="bg-[#f3f7f4] py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section aria-labelledby="terms-document-heading" className="overflow-hidden rounded-2xl border border-brand-green-dark/10 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-brand-green-dark/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-green">Document</p>
                <h2 id="terms-document-heading" className="mt-1 text-lg font-extrabold tracking-tight text-brand-green-dark">
                  Terms and Conditions of Sale (Rev 2022)
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={termsDocument}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-brand-green-dark/15 px-4 py-2 text-xs font-bold text-brand-green-dark transition-colors hover:bg-brand-light-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                >
                  <ExternalLink aria-hidden="true" className="h-4 w-4" />
                  Open PDF
                </a>
                <a
                  href={termsDocument}
                  download
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-brand-green-dark px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                >
                  <Download aria-hidden="true" className="h-4 w-4" />
                  Download PDF
                </a>
              </div>
            </div>

            <iframe
              title="PDC Terms and Conditions of Sale PDF"
              src={`${termsDocument}#view=FitH`}
              className="h-[78vh] min-h-[560px] w-full bg-white sm:min-h-[680px]"
            />
            <p className="border-t border-brand-green-dark/10 px-5 py-3 text-xs leading-5 text-brand-graphite/60 sm:px-7">
              If the document does not display in your browser, use Open PDF or Download PDF above.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
