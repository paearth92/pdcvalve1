import type { ComponentType } from 'react';
import {
  CarFront,
  Cog,
  Droplets,
  Factory,
  FlaskConical,
  Fuel,
  HeartPulse,
  Mountain,
  Ship,
  UtensilsCrossed,
  Wind,
  Zap,
} from 'lucide-react';
import type {
  ProductApplicationGroup,
  ProductApplicationIndustry,
} from '@/types/site';
import { IndustryIcon } from '@/components/icons/IndustryIcons';

type IconComponent = ComponentType<{ className?: string }>;

const lucideIndustryIcons: Record<string, IconComponent> = {
  automotive: CarFront,
  chemical: FlaskConical,
  'downstream-hydrocarbons': Fuel,
  'food-and-beverage': UtensilsCrossed,
  'energy-and-onsite-utilities': Zap,
  'life-sciences-and-medical': HeartPulse,
  'mining-minerals-and-metals': Mountain,
  marine: Ship,
  'oem-and-engineered-solution-providers': Cog,
  'pulp-and-paper': Factory,
  default: Factory,
};

function ApplicationIcon({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const shared = [
    'power-generation',
    'air-management',
    'oil-and-gas',
    'chemical',
    'petrochemical',
    'water-and-wastewater',
  ];

  if (shared.includes(slug)) {
    return <IndustryIcon slug={slug} className={className} />;
  }

  if (slug === 'water-wastewater') {
    return <Droplets className={className} />;
  }

  if (slug === 'air-management') {
    return <Wind className={className} />;
  }

  const Icon = lucideIndustryIcons[slug] ?? lucideIndustryIcons.default;
  return <Icon className={className} />;
}

export default function ApplicationGroups({
  groups,
  industries,
}: {
  groups: ProductApplicationGroup[];
  industries?: ProductApplicationIndustry[];
}) {
  const singleGroup = groups.length === 1 ? groups[0] : undefined;

  return (
    <div className="space-y-7">
      {industries && industries.length > 0 && (
        <div className="relative overflow-hidden rounded-[28px] border border-[#d6e2d9] bg-[#f1f6f2] p-4 shadow-[0_18px_48px_rgba(18,55,34,0.075)] sm:p-5 lg:p-6">
          <div
            className="pointer-events-none absolute inset-0 opacity-75"
            style={{
              backgroundImage:
                'radial-gradient(circle at 85% 10%, rgba(22,132,71,0.10), transparent 32%), linear-gradient(rgba(22,132,71,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(22,132,71,0.03) 1px, transparent 1px)',
              backgroundSize: '100% 100%, 34px 34px, 34px 34px',
            }}
          />

          <div className="relative mb-4 flex flex-col gap-3 rounded-2xl border border-[#d8e4db] bg-white/85 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#168447]">
                Industries served
              </span>
              <h4 className="mt-1 text-lg font-extrabold tracking-[-0.02em] text-[#123823]">
                Proven across demanding industrial markets
              </h4>
            </div>
            <span className="w-fit rounded-full border border-[#cbd9ce] bg-[#f6f9f6] px-3 py-1.5 font-mono text-[10px] font-black tracking-[0.12em] text-[#4a6255]">
              {String(industries.length).padStart(2, '0')} INDUSTRIES
            </span>
          </div>

          <div className="relative grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {industries.map((ind, index) => (
              <div
                key={ind.title}
                className="group flex min-h-[92px] items-center gap-3 rounded-2xl border border-[#d8e3da] bg-white px-3.5 py-3.5 shadow-[0_5px_16px_rgba(18,55,34,0.045)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9fc2aa] hover:shadow-[0_10px_24px_rgba(18,55,34,0.085)] sm:px-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#c9dccf] bg-[#edf6ef] text-[#168447] transition-transform duration-300 group-hover:scale-105">
                  <ApplicationIcon slug={ind.iconSlug} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[8px] font-black tracking-[0.10em] text-[#89a095]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-0.5 block text-[11px] font-bold leading-4 text-[#274537] sm:text-xs">
                    {ind.title}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {singleGroup ? (
        <div className="overflow-hidden rounded-[26px] border border-[#d6e1d8] bg-white shadow-[0_16px_42px_rgba(18,55,34,0.07)]">
          <div className="flex flex-col gap-3 border-b border-[#dce6de] bg-[#f5f8f5] px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
            <div>
              <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#168447]">
                Application range
              </span>
              <h4 className="mt-1 text-lg font-extrabold tracking-[-0.02em] text-[#123823]">
                {singleGroup.heading}
              </h4>
            </div>
            <span className="font-mono text-[10px] font-black tracking-[0.12em] text-[#73887c]">
              {String(singleGroup.items.length).padStart(2, '0')} USE CASES
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {singleGroup.items.map((item, index) => (
              <div
                key={item}
                className="group/item relative flex min-h-[68px] items-center gap-3 border-b border-[#e0e8e2] px-5 py-4 transition-colors hover:bg-[#f5faf6] sm:border-r lg:[&:nth-child(3n)]:border-r-0"
              >
                <span className="flex h-7 min-w-7 items-center justify-center rounded-lg bg-[#eaf4ec] px-1.5 font-mono text-[9px] font-black text-[#168447]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[13px] font-semibold leading-5 text-[#40584c]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : groups.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, groupIndex) => (
            <div
              key={group.heading}
              className="overflow-hidden rounded-[22px] border border-[#d7e2d9] bg-white shadow-[0_10px_28px_rgba(18,55,34,0.06)]"
            >
              <div className="border-b border-[#e0e8e2] bg-[#f4f8f4] px-5 py-4">
                <span className="font-mono text-[9px] font-black tracking-[0.1em] text-[#168447]">
                  {String(groupIndex + 1).padStart(2, '0')}
                </span>
                <h4 className="mt-1 text-sm font-extrabold text-[#123823]">
                  {group.heading}
                </h4>
              </div>
              <ul className="divide-y divide-[#e6ece7]">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 px-5 py-3.5 text-[13px] leading-5 text-[#50665a]"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#168447]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}