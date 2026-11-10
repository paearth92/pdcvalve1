import type { IndustryRef } from '@/types/content';

/** Standard industry labels approved in Jon's actuator page review decks. */
export const actuatorIndustryCoverage: IndustryRef[] = [
  { slug: 'automotive', title: 'Automotive' },
  { slug: 'chemical', title: 'Chemical' },
  { slug: 'downstream-hydrocarbons', title: 'Downstream Hydrocarbons' },
  { slug: 'food-and-beverage', title: 'Food & Beverage' },
  { slug: 'energy-and-onsite-utilities', title: 'Energy & Utilities' },
  { slug: 'life-sciences-and-medical', title: 'Life Sciences' },
  { slug: 'mining-minerals-and-metals', title: 'Mining, Minerals & Metals' },
  { slug: 'water-and-wastewater', title: 'Water & Wastewater' },
  { slug: 'oem-and-engineered-solution-providers', title: 'OEM & Engineered Systems' },
  { slug: 'marine', title: 'Marine' },
  { slug: 'oil-and-gas', title: 'Oil & Gas' },
  { slug: 'power-generation', title: 'Power Generation' },
  { slug: 'pulp-and-paper', title: 'Pulp & Paper' },
  { slug: 'air-management', title: 'Air Management' },
  { slug: 'petrochemical', title: 'Petrochemical' },
];

export const actuatorIndustryTitles = actuatorIndustryCoverage.map(
  (industry) => industry.title,
);
