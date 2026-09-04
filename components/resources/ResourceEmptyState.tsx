import { FileQuestion, Mail, Phone } from 'lucide-react';
import { contactData } from '@/data/contact';
import RFQButton from '@/components/rfq/RFQButton';

interface ResourceEmptyStateProps {
  title?: string;
  message?: string;
}

export default function ResourceEmptyState({
  title = 'No documents available in this category yet',
  message = 'Our engineering team is continuously adding technical documentation. Contact us directly to request specific documents or drawings.',
}: ResourceEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-brand-green-dark/15 bg-brand-light-bg/50 px-6 py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-green-dark/10 bg-white text-brand-steel/40">
        <FileQuestion className="h-8 w-8" />
      </span>
      <p className="mt-6 text-base font-bold text-brand-green-dark">{title}</p>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-brand-steel/60">
        {message}
      </p>
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-3">
        <RFQButton size="md" />
        <a
          href={`mailto:${contactData.generalEmail}`}
          className="inline-flex items-center gap-2 rounded-md border border-brand-green-dark/15 bg-white px-5 py-3 text-sm font-semibold text-brand-steel transition-colors hover:border-brand-green/30 hover:text-brand-green-dark"
        >
          <Mail className="h-4 w-4 text-brand-green" />
          Email Engineering
        </a>
      </div>
      <a
        href={`tel:${contactData.phone}`}
        className="mt-6 inline-flex items-center gap-2 text-sm text-brand-steel/60 transition-colors hover:text-brand-green-dark"
      >
        <Phone className="h-4 w-4 text-brand-green" />
        {contactData.phone}
      </a>
    </div>
  );
}
