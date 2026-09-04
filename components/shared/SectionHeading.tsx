/** Shared section heading used across product family and product detail pages. */
export default function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
        {eyebrow}
      </span>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-brand-green-dark sm:text-3xl">
        {title}
      </h2>
      <div className="mt-3 h-px w-12 bg-brand-green/40" />
    </div>
  );
}
