import { Inbox } from 'lucide-react';

/** Polished placeholder for sections awaiting verified content. */
export default function ContentPlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-brand-green-dark/15 bg-white px-6 py-12 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-green-dark/10 bg-brand-light-bg text-brand-steel/50">
        <Inbox className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-base font-bold tracking-tight text-brand-green-dark">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-brand-graphite/55">
        {description}
      </p>
    </div>
  );
}
