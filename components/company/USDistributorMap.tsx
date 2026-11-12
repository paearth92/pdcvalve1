'use client';

import type { KeyboardEvent } from 'react';
import { usStateMap } from '@/data/company/us-state-map';

type USDistributorMapProps = {
  coveredStateCodes: string[];
  selectedState: string | null;
  onSelectState: (code: string) => void;
};

export default function USDistributorMap({
  coveredStateCodes,
  selectedState,
  onSelectState,
}: USDistributorMapProps) {
  const covered = new Set(coveredStateCodes);

  function handleKeyDown(event: KeyboardEvent<SVGPathElement>, code: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelectState(code);
    }
  }

  return (
    <svg
      viewBox={`0 0 ${usStateMap.width} ${usStateMap.height}`}
      role="group"
      aria-label="Interactive United States map showing distributor coverage"
      className="h-auto w-full overflow-visible"
    >
      {usStateMap.states.map(({ code, name, path }) => {
        const hasListing = covered.has(code);
        const isSelected = selectedState === code;

        return (
          <path
            key={code}
            d={path}
            role={hasListing ? 'button' : undefined}
            tabIndex={hasListing ? 0 : undefined}
            aria-label={hasListing ? `${name}: show distributor listings` : `${name}: no distributor listing`}
            aria-pressed={hasListing ? isSelected : undefined}
            onClick={hasListing ? () => onSelectState(code) : undefined}
            onKeyDown={hasListing ? (event) => handleKeyDown(event, code) : undefined}
            className={hasListing ? 'cursor-pointer outline-none hover:fill-[#2e6f3e] focus-visible:fill-[#1c5b35] focus-visible:stroke-[#163f27] focus-visible:stroke-[3px]' : 'cursor-default'}
            fill={isSelected ? '#1c5b35' : hasListing ? '#4a8a54' : '#e6ebe7'}
            stroke={isSelected ? '#17472c' : '#ffffff'}
            strokeWidth={isSelected ? 2.5 : 1.5}
            vectorEffect="non-scaling-stroke"
            style={{ transition: 'fill 160ms ease, stroke 160ms ease' }}
          >
            <title>{hasListing ? `${name} — view distributor listings` : `${name} — no listing shown`}</title>
          </path>
        );
      })}
    </svg>
  );
}
