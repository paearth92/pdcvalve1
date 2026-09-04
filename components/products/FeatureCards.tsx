import { Check, ChevronDown } from 'lucide-react';
import type { ProductFeature } from '@/types/site';

export default function FeatureCards({
  features,
}: {
  features: ProductFeature[];
}) {
  if (!features || features.length === 0) {
    return (
      <p className="text-sm text-[#617268]">
        Feature information is being prepared.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-[22px] border border-[#d8e2db] bg-white shadow-[0_12px_34px_rgba(18,55,34,0.06)]">
      {/* ============================================================
          DESKTOP / TABLET
          Compact engineering matrix instead of oversized cards.
         ============================================================ */}
      <div className="hidden md:block">
        <div className="grid grid-cols-[58px_minmax(210px,0.75fr)_minmax(0,1.35fr)_42px] items-center border-b border-[#d8e2db] bg-[#f3f7f4] px-5 py-3.5 lg:px-6">
          <span className="font-mono text-[9px] font-black uppercase tracking-[0.14em] text-[#6b7d72]">
            No.
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#476052]">
            Design feature
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#476052]">
            Engineering purpose
          </span>
          <span className="sr-only">Verified feature</span>
        </div>

        <div className="divide-y divide-[#e3e9e5]">
          {features.map((feature, index) => (
            <div
              key={`${feature.title}-${index}`}
              className="group relative grid grid-cols-[58px_minmax(210px,0.75fr)_minmax(0,1.35fr)_42px] items-center px-5 py-4 transition-colors duration-300 hover:bg-[#f7faf8] lg:px-6 lg:py-[18px]"
            >
              <span className="absolute bottom-0 left-0 top-0 w-[3px] origin-center scale-y-0 bg-[#168447] transition-transform duration-300 group-hover:scale-y-100" />

              <span className="font-mono text-[11px] font-black tracking-[0.10em] text-[#168447]">
                {String(index + 1).padStart(2, '0')}
              </span>

              <h4 className="pr-6 text-[14px] font-extrabold leading-5 tracking-[-0.01em] text-[#153a25] lg:text-[14.5px]">
                {feature.title}
              </h4>

              <div className="border-l border-[#e1e8e3] pl-6">
                {feature.description ? (
                  <p className="max-w-[52rem] text-[13px] leading-[1.55] text-[#5b6e63] lg:text-[13.5px]">
                    {feature.description}
                  </p>
                ) : (
                  <span className="text-[13px] text-[#839188]">
                    Product design feature
                  </span>
                )}
              </div>

              <span className="ml-auto flex h-7 w-7 items-center justify-center rounded-full border border-[#cfe0d4] bg-[#f1f7f3] text-[#168447] transition-all duration-300 group-hover:border-[#168447]/40 group-hover:bg-[#e8f4ec]">
                <Check className="h-3.5 w-3.5" />
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-[#d8e2db] bg-[#fbfcfb] px-5 py-2.5 lg:px-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7a8b80]">
            Product design summary
          </span>
          <span className="font-mono text-[10px] font-black tracking-[0.10em] text-[#168447]">
            {String(features.length).padStart(2, '0')} FEATURES
          </span>
        </div>
      </div>

      {/* ============================================================
          MOBILE
          Scan titles quickly; expand only the detail you want.
         ============================================================ */}
      <div className="md:hidden">
        <div className="flex items-center justify-between border-b border-[#d8e2db] bg-[#f3f7f4] px-4 py-3">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#476052]">
            Design features
          </span>
          <span className="font-mono text-[9px] font-black tracking-[0.10em] text-[#168447]">
            {String(features.length).padStart(2, '0')}
          </span>
        </div>

        <div className="divide-y divide-[#e3e9e5]">
          {features.map((feature, index) => (
            <details
              key={`${feature.title}-${index}`}
              className="group/details bg-white open:bg-[#f8fbf9]"
            >
              <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-4 [&::-webkit-details-marker]:hidden">
                <span className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-[#cfe0d4] bg-[#f1f7f3] font-mono text-[9px] font-black tracking-[0.08em] text-[#168447]">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h4 className="min-w-0 flex-1 text-[13.5px] font-extrabold leading-5 tracking-[-0.01em] text-[#153a25]">
                  {feature.title}
                </h4>

                <ChevronDown className="h-4 w-4 shrink-0 text-[#6f8176] transition-transform duration-300 group-open/details:rotate-180 group-open/details:text-[#168447]" />
              </summary>

              {feature.description && (
                <div className="px-4 pb-4 pl-[60px]">
                  <p className="border-l-2 border-[#168447]/25 pl-4 text-[13px] leading-5.5 text-[#5b6e63]">
                    {feature.description}
                  </p>
                </div>
              )}
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}