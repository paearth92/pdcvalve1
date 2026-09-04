interface IconProps {
  className?: string;
}

/** Power Generation — cooling tower with steam */
export function PowerGenerationIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Cooling tower silhouette */}
      <path d="M14 40 L16 18 Q16 14 24 14 Q32 14 32 18 L34 40 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.6" />
      {/* Steam lines */}
      <path d="M20 12 Q18 10 20 8 Q22 6 20 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M28 12 Q26 10 28 8 Q30 6 28 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      {/* Base ground line */}
      <line x1="10" y1="40" x2="38" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

/** Air Management — duct with airflow */
export function AirManagementIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Duct body */}
      <rect x="8" y="16" width="32" height="16" rx="2" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      {/* Duct flange */}
      <line x1="8" y1="14" x2="8" y2="34" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <line x1="40" y1="14" x2="40" y2="34" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      {/* Airflow arrows */}
      <path d="M16 24 L30 24 M26 20 L30 24 L26 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  );
}

/** Oil & Gas — derrick silhouette */
export function OilAndGasIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Derrick structure */}
      <path d="M16 40 L22 8 L26 8 L32 40" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.6" />
      {/* Cross braces */}
      <line x1="18" y1="30" x2="30" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <line x1="19" y1="22" x2="29" y2="22" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <line x1="20" y1="14" x2="28" y2="14" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <line x1="18" y1="30" x2="28" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="30" y1="30" x2="20" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      {/* Ground */}
      <line x1="10" y1="40" x2="38" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

/** Chemical — flask with reaction */
export function ChemicalIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Flask */}
      <path d="M18 8 L18 18 L12 36 Q12 40 16 40 L32 40 Q36 40 36 36 L30 18 L30 8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.6" />
      {/* Flask top */}
      <line x1="16" y1="8" x2="32" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      {/* Liquid level */}
      <path d="M14 30 Q18 28 24 30 Q30 32 34 30" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      {/* Bubbles */}
      <circle cx="20" cy="34" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="26" cy="36" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="23" cy="32" r="1.2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

/** Petrochemical — refinery tower */
export function PetrochemicalIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Fractionation tower */}
      <rect x="18" y="6" width="12" height="34" rx="1" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      {/* Trays */}
      {[12, 18, 24, 30, 36].map((y) => (
        <line key={y} x1="18" y1={y} x2="30" y2={y} stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      ))}
      {/* Top cap */}
      <path d="M18 6 L24 2 L30 6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.6" />
      {/* Side pipe */}
      <path d="M30 20 L38 20 L38 40" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.5" />
      <path d="M18 28 L10 28 L10 40" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.5" />
      {/* Ground */}
      <line x1="6" y1="40" x2="42" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

/** Water & Wastewater — water drop with waves */
export function WaterWastewaterIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Water drop */}
      <path d="M24 6 Q16 18 16 26 Q16 34 24 34 Q32 34 32 26 Q32 18 24 6 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.6" />
      {/* Inner drop highlight */}
      <path d="M22 22 Q20 26 22 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      {/* Wave lines below */}
      <path d="M8 40 Q12 38 16 40 Q20 42 24 40 Q28 38 32 40 Q36 42 40 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M8 44 Q12 42 16 44 Q20 46 24 44 Q28 42 32 44 Q36 46 40 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

/** Automotive — gear and assembly line */
export function AutomotiveIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="18" cy="28" r="6" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      <circle cx="34" cy="28" r="6" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      <path d="M10 28 L10 22 L16 22 L20 16 L32 16 L36 22 L42 22 L42 28" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.5" />
      <line x1="6" y1="40" x2="42" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

/** Downstream Hydrocarbons — refinery with storage tanks */
export function DownstreamHydrocarbonsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="16" y="8" width="10" height="28" rx="1" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      {[14, 20, 26, 32].map((y) => (
        <line key={y} x1="16" y1={y} x2="26" y2={y} stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      ))}
      <path d="M16 8 L21 4 L26 8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.6" />
      <rect x="30" y="22" width="10" height="14" rx="5" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <line x1="6" y1="40" x2="42" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

/** Food & Beverage — container with liquid */
export function FoodAndBeverageIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 10 L16 38 Q16 42 20 42 L28 42 Q32 42 32 38 L32 10" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.6" />
      <line x1="14" y1="10" x2="34" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M16 26 Q20 24 24 26 Q28 28 32 26" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <line x1="6" y1="42" x2="42" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

/** Energy & Utilities — lightning bolt with circle */
export function EnergyAndUtilitiesIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <path d="M26 8 L16 26 L22 26 L20 40 L32 20 L26 20 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.6" />
    </svg>
  );
}

/** Life Sciences — cross/plus in circle */
export function LifeSciencesIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <path d="M24 14 L24 34 M14 24 L34 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

/** Mining & Metals — pickaxe and mountain */
export function MiningMetalsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 40 L16 20 L26 40 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.6" />
      <path d="M22 40 L32 24 L42 40 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.5" />
      <path d="M14 14 Q18 10 24 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="4" y1="40" x2="44" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

/** OEM — gear with circuit */
export function OemIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.4" />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45) * (Math.PI / 180);
        const x1 = 24 + Math.cos(angle) * 10;
        const y1 = 24 + Math.sin(angle) * 10;
        const x2 = 24 + Math.cos(angle) * 14;
        const y2 = 24 + Math.sin(angle) * 14;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />;
      })}
    </svg>
  );
}

/** Marine — ship/wave */
export function MarineIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 28 L40 28 L36 36 L12 36 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.6" />
      <path d="M24 28 L24 12 M20 16 L24 12 L28 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <path d="M4 40 Q8 38 12 40 Q16 42 20 40 Q24 38 28 40 Q32 42 36 40 Q40 38 44 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

/** Pulp & Paper — roll/paper */
export function PulpAndPaperIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="14" y="8" width="20" height="32" rx="2" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      <circle cx="24" cy="18" r="5" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <circle cx="24" cy="30" r="5" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <line x1="6" y1="40" x2="42" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

const industryIconMap = {
  'power-generation': PowerGenerationIcon,
  'air-management': AirManagementIcon,
  'oil-and-gas': OilAndGasIcon,
  'chemical': ChemicalIcon,
  'petrochemical': PetrochemicalIcon,
  'water-and-wastewater': WaterWastewaterIcon,
  'automotive': AutomotiveIcon,
  'downstream-hydrocarbons': DownstreamHydrocarbonsIcon,
  'food-and-beverage': FoodAndBeverageIcon,
  'energy-and-utilities': EnergyAndUtilitiesIcon,
  'life-sciences': LifeSciencesIcon,
  'mining-metals': MiningMetalsIcon,
  'oem': OemIcon,
  'marine': MarineIcon,
  'pulp-and-paper': PulpAndPaperIcon,
} as const;

export function IndustryIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = industryIconMap[slug as keyof typeof industryIconMap];
  if (!Icon) return <DefaultIndustryIcon className={className} />;
  return <Icon className={className} />;
}

/** Fallback icon for industries without a specific icon */
function DefaultIndustryIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2" opacity="0.6" />
    </svg>
  );
}
