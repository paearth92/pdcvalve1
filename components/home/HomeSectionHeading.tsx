type HomeSectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  headingLevel?: 1 | 2;
  tone?: 'light' | 'dark';
};

/** Shared centered heading treatment for homepage sections. */
export default function HomeSectionHeading({
  eyebrow,
  title,
  description,
  headingLevel = 2,
  tone = 'light',
}: HomeSectionHeadingProps) {
  const Heading = headingLevel === 1 ? 'h1' : 'h2';
  const isDark = tone === 'dark';

  return (
    <header className="mx-auto max-w-3xl text-center">
      <span
        className={`text-[11px] font-bold uppercase tracking-[0.19em] sm:text-xs ${isDark ? 'text-white/65' : 'text-[#40564a]'}`}
      >
        {eyebrow}
      </span>
      <Heading
        className={`mt-3 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.04em] sm:text-[2.3rem] lg:text-[2.4rem] ${isDark ? 'text-white' : 'text-[#168447]'}`}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={`mx-auto mt-4 max-w-[42rem] text-[15px] leading-7 sm:text-base ${isDark ? 'text-white/65' : 'text-[#4a5e53]'}`}
        >
          {description}
        </p>
      )}
    </header>
  );
}
