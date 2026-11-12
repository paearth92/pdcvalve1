'use client';

import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Building2,
  Mail,
  MapPin,
  Phone,
  Search,
  X,
} from 'lucide-react';
import USDistributorMap from '@/components/company/USDistributorMap';
import { usStateMap } from '@/data/company/us-state-map';

type DirectoryFilter = 'all' | 'south-central' | 'western-pa' | 'northern-illinois' | 'upstream';

type DistributorListing = {
  id: string;
  company: string;
  territory?: string;
  contact?: string;
  phone: string;
  email: string[];
  market?: string;
  website?: string;
  stateCodes: string[];
  filters: DirectoryFilter[];
  searchTerms?: string[];
};

const listings: DistributorListing[] = [
  {
    id: 'automation-x-northeast-570',
    company: 'Automation-X',
    territory: 'Northeast',
    stateCodes: ['pa', 'ky', 'mi', 'va', 'oh'],
    phone: '570-589-0110',
    email: ['northeast.sales@automation-x.com'],
    market: 'Upstream Products / Choke Valves',
    website: 'https://automation-x.com',
    filters: ['upstream'],
    searchTerms: ['northeastern'],
  },
  {
    id: 'automation-x-northeast-412',
    company: 'Automation-X',
    territory: 'Northeast',
    stateCodes: ['wv'],
    phone: '412-329-7672',
    email: ['northeast.sales@automation-x.com'],
    market: 'Upstream Products / Choke Valves',
    website: 'https://automation-x.com',
    filters: ['upstream'],
    searchTerms: ['northeastern'],
  },
  {
    id: 'automation-x-arklatex',
    company: 'Automation-X',
    territory: 'Ark-La-Tex',
    stateCodes: ['la', 'ms', 'al'],
    phone: '318-532-7047',
    email: ['arklatex.sales@automation-x.com'],
    market: 'Upstream Products / Choke Valves',
    website: 'https://automation-x.com',
    filters: ['upstream'],
    searchTerms: ['arkansas', 'louisiana', 'texas', 'oklahoma', 'ar', 'la', 'tx', 'ok'],
  },
  {
    id: 'automation-x-west-texas',
    company: 'Automation-X',
    territory: 'West Texas',
    stateCodes: ['tx'],
    phone: '432-366-4702',
    email: ['wtexas.sales@automation-x.com'],
    market: 'Upstream Products / Choke Valves',
    website: 'https://automation-x.com',
    filters: ['upstream'],
    searchTerms: ['tx', 'texas'],
  },
  {
    id: 'automation-x-north-texas',
    company: 'Automation-X',
    territory: 'North Texas',
    stateCodes: ['tx'],
    phone: '682-261-4864',
    email: ['ntexas.sales@automation-x.com'],
    market: 'Upstream Products / Choke Valves',
    website: 'https://automation-x.com',
    filters: ['upstream'],
    searchTerms: ['tx', 'texas'],
  },
  {
    id: 'automation-x-south-texas',
    company: 'Automation-X',
    territory: 'South Texas',
    stateCodes: ['tx'],
    phone: '210-680-5732',
    email: ['stexas.sales@automation-x.com'],
    market: 'Upstream Products / Choke Valves',
    website: 'https://automation-x.com',
    filters: ['upstream'],
    searchTerms: ['tx', 'texas'],
  },
  {
    id: 'automation-x-midcon',
    company: 'Automation-X',
    territory: 'Mid-Continent',
    stateCodes: ['ok', 'al', 'ks', 'mo', 'ar'],
    phone: '405-286-4332',
    email: ['midcon.sales@automation-x.com'],
    market: 'Upstream Products / Choke Valves',
    website: 'https://automation-x.com',
    filters: ['upstream'],
    searchTerms: ['midcon'],
  },
  {
    id: 'automation-x-northern-rockies',
    company: 'Automation-X',
    territory: 'Northern Rockies',
    stateCodes: ['nd', 'sd', 'wy', 'mt'],
    phone: '701-204-0962',
    email: ['nrockies.sales@automation-x.com'],
    market: 'Upstream Products / Choke Valves',
    website: 'https://automation-x.com',
    filters: ['upstream'],
    searchTerms: ['north rockies', 'rockies'],
  },
  {
    id: 'automation-x-rockies-970',
    company: 'Automation-X',
    territory: 'Rockies',
    stateCodes: ['co'],
    phone: '970-812-0900',
    email: ['rockies.sales@automation-x.com'],
    market: 'Upstream Products / Choke Valves',
    website: 'https://automation-x.com',
    filters: ['upstream'],
  },
  {
    id: 'automation-x-rockies-505',
    company: 'Automation-X',
    territory: 'Rockies',
    stateCodes: ['nm', 'ca', 'az', 'ut'],
    phone: '505-564-2059',
    email: ['rockies.sales@automation-x.com'],
    market: 'Upstream Products / Choke Valves',
    website: 'https://automation-x.com',
    filters: ['upstream'],
  },
  {
    id: 'automation-x-carlsbad',
    company: 'Automation-X',
    territory: 'Carlsbad',
    stateCodes: ['nm'],
    phone: '575-361-0846',
    email: ['carlsbad.sales@automation-x.com', 'eastregion@winn-marion.com'],
    market: 'Upstream Products / Choke Valves',
    website: 'https://automation-x.com',
    filters: ['upstream'],
  },
  {
    id: 'lambda-process',
    company: 'Lambda Process',
    contact: 'Mike Murphy',
    territory: 'Texas, Oklahoma, Arkansas, Louisiana, and Mississippi',
    stateCodes: ['tx', 'ok', 'ar', 'la', 'ms'],
    phone: '972-482-1086',
    email: ['mmurphy@lambdaprocess.com'],
    website: 'https://lambdaprocess.com',
    filters: ['south-central'],
    searchTerms: ['tx', 'ok', 'ar', 'la', 'ms'],
  },
  {
    id: 'davis-controls',
    company: 'Davis Controls',
    contact: 'David Toth',
    stateCodes: ['pa'],
    phone: '412-262-5633',
    email: ['dtoth@daviscc.com'],
    website: 'https://daviscc.com',
    filters: [],
  },
  {
    id: 'dorner-company',
    company: 'Dorner Company',
    contact: 'Jason Stenz',
    territory: 'Northern Illinois',
    stateCodes: ['wi', 'mi', 'il'],
    phone: '262-239-9099',
    email: ['JStenz@dornerco.com'],
    website: 'https://dornerco.com',
    filters: ['northern-illinois'],
    searchTerms: ['il', 'illinois'],
  },
  {
    id: 'generaction',
    company: 'Generaction',
    contact: 'Jim Liossis',
    territory: 'Western Pennsylvania',
    stateCodes: ['oh', 'in', 'ky', 'wv', 'pa'],
    phone: '330-284-1201',
    email: ['jl@generactioninc.com'],
    website: 'https://generactioninc.com',
    filters: ['western-pa'],
    searchTerms: ['western pa', 'pa', 'pennsylvania'],
  },
  {
    id: 'winn-marion',
    company: 'Winn-Marion',
    contact: 'Dan McIntosh',
    stateCodes: ['pa', 'oh', 'wv'],
    phone: '412-319-7392',
    email: ['eastregion@winn-marion.com'],
    market: 'Upstream Products / Choke Valves',
    filters: ['upstream'],
  },
];

const filters: { id: DirectoryFilter; label: string }[] = [
  { id: 'all', label: 'All listings' },
  { id: 'south-central', label: 'Lambda Process territory' },
  { id: 'western-pa', label: 'Western PA' },
  { id: 'northern-illinois', label: 'Northern Illinois' },
  { id: 'upstream', label: 'Upstream & choke valves' },
];

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

export default function DistributorFinder() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<DirectoryFilter>('all');
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const normalizedQuery = query.trim().toLowerCase();
  const selectedStateName = usStateMap.states.find((state) => state.code === selectedState)?.name;
  const coveredStateCodes = useMemo(
    () => Array.from(new Set(listings.flatMap((listing) => listing.stateCodes))),
    [],
  );

  const filteredListings = useMemo(
    () =>
      listings.filter((listing) => {
        const matchesFilter =
          activeFilter === 'all' || listing.filters.includes(activeFilter);
        const matchesState = !selectedState || listing.stateCodes.includes(selectedState);
        const searchText = [
          listing.company,
          listing.territory,
          listing.contact,
          listing.phone,
          ...listing.email,
          listing.market,
          ...(listing.searchTerms ?? []),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return matchesFilter && matchesState && (!normalizedQuery || searchText.includes(normalizedQuery));
      }),
    [activeFilter, normalizedQuery, selectedState],
  );

  return (
    <section
      id="distributors"
      aria-labelledby="distributors-heading"
      className="scroll-mt-24 bg-[#f3f7f4] py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green">
              PDC Sales Network
            </span>
            <h2
              id="distributors-heading"
              className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-brand-green-dark sm:text-4xl"
            >
              Distributor Coverage
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-graphite/70 sm:text-base sm:leading-7">
              Select a state on the map or search by distributor, territory, contact, or product market to find regional support.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-brand-green-dark/10 bg-white px-4 py-3 shadow-sm lg:min-w-[250px]">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
              <MapPin aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-graphite/55">
                Need help?
              </p>
              <a
                href="tel:+17246953440"
                className="mt-1 inline-flex text-sm font-bold text-brand-green-dark hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              >
                Call PDC Sales · 724-695-3440
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-brand-green-dark/10 bg-white p-4 shadow-sm sm:p-5">
          <label
            htmlFor="distributor-search"
            className="text-xs font-bold text-brand-green-dark"
          >
            Search the directory
          </label>
          <div className="relative mt-2 max-w-2xl">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-graphite/45"
            />
            <input
              id="distributor-search"
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setSelectedState(null);
              }}
              placeholder="Try a state, region, company, or market"
              className="h-12 w-full rounded-lg border border-brand-green-dark/15 bg-[#fbfcfb] pl-11 pr-11 text-sm text-brand-green-dark outline-none transition placeholder:text-brand-graphite/40 focus:border-brand-green focus:ring-2 focus:ring-brand-green/15"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear distributor search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-brand-graphite/55 hover:bg-brand-green/10 hover:text-brand-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="mt-4">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-graphite/50">
              Quick filters
            </p>
            <div role="group" aria-label="Filter distributor listings" className="flex flex-wrap gap-2">
              {filters.map((filter) => {
                const selected = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      setActiveFilter(filter.id);
                      setSelectedState(null);
                    }}
                    className={`min-h-9 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 ${
                      selected
                        ? 'border-brand-green-dark bg-brand-green-dark text-white'
                        : 'border-brand-green-dark/15 bg-white text-brand-green-dark hover:border-brand-green/45 hover:bg-brand-light-bg'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(16rem,0.8fr)]">
          <div id="distributor-map" className="scroll-mt-24 rounded-2xl border border-brand-green-dark/10 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold tracking-tight text-brand-green-dark">Distributor coverage map</h3>
                <p className="mt-1 text-xs leading-5 text-brand-graphite/60">Select a highlighted state to see its listings.</p>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-semibold text-brand-graphite/65" aria-label="Map legend">
                <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-[#4a8a54]" />Listed</span>
                <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-[#e6ebe7] ring-1 ring-brand-green-dark/10" />No listing</span>
              </div>
            </div>
            <div className="mx-auto mt-3 max-w-4xl">
              <USDistributorMap
                coveredStateCodes={coveredStateCodes}
                selectedState={selectedState}
                onSelectState={(code) => {
                  setSelectedState((current) => (current === code ? null : code));
                  setQuery('');
                  setActiveFilter('all');
                }}
              />
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-brand-green-dark/10 bg-white p-5 shadow-sm sm:p-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-green">Interactive directory</span>
              <h3 className="mt-2 text-xl font-extrabold tracking-tight text-brand-green-dark">
                {selectedStateName ? `${selectedStateName} distributors` : 'Find regional support'}
              </h3>
              <p className="mt-2 text-sm leading-6 text-brand-graphite/65">
                {selectedStateName
                  ? `Showing distributor listings that serve ${selectedStateName}. Select the state again or clear the selection to return to all listings.`
                  : 'Highlighted states have at least one distributor listing. Choose a state on the map, or use the search and filters above.'}
              </p>
            </div>
            {selectedStateName && (
              <button
                type="button"
                onClick={() => setSelectedState(null)}
                className="mt-5 inline-flex min-h-10 w-fit items-center rounded-lg border border-brand-green-dark/15 px-3.5 text-xs font-bold text-brand-green-dark transition-colors hover:bg-brand-light-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              >
                Clear state selection
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
          <p aria-live="polite" className="text-xs font-semibold text-brand-graphite/65">
            {filteredListings.length} {filteredListings.length === 1 ? 'listing' : 'listings'}
            {activeFilter !== 'all' || normalizedQuery || selectedState ? ' found' : ' available'}
          </p>
          <p className="text-xs text-brand-graphite/50">
            Territory and market details reflect the PDC directory.
          </p>
        </div>

        {filteredListings.length > 0 ? (
          <div className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredListings.map((listing) => (
              <article
                key={listing.id}
                className="group flex h-full flex-col rounded-2xl border border-brand-green-dark/10 bg-white p-5 shadow-[0_8px_28px_rgba(20,55,37,0.04)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-brand-green/30 hover:shadow-lg sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-light-bg text-brand-green">
                      <Building2 aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="text-base font-extrabold tracking-tight text-brand-green-dark">
                        {listing.company}
                      </h3>
                      {listing.territory && (
                        <p className="mt-1 flex items-start gap-1.5 text-xs leading-5 text-brand-graphite/65">
                          <MapPin aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green" />
                          <span>{listing.territory}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  {listing.website && (
                    <a
                      href={listing.website}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Visit ${listing.company} website`}
                      className="rounded-md p-2 text-brand-graphite/45 transition-colors hover:bg-brand-light-bg hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                    >
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                    </a>
                  )}
                </div>

                {listing.market && (
                  <span className="mt-4 inline-flex w-fit max-w-full rounded-md bg-[#f1f5f2] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-brand-green-dark/75">
                    {listing.market}
                  </span>
                )}

                {listing.contact && (
                  <p className="mt-4 text-xs text-brand-graphite/65">
                    Contact <span className="font-semibold text-brand-green-dark">{listing.contact}</span>
                  </p>
                )}

                <div className="mt-auto grid gap-2 pt-5">
                  <a
                    href={telHref(listing.phone)}
                    className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-brand-green-dark/10 bg-white px-3 text-xs font-semibold text-brand-green-dark transition-colors hover:border-brand-green/30 hover:bg-brand-light-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                  >
                    <Phone aria-hidden="true" className="h-3.5 w-3.5 text-brand-green" />
                    {listing.phone}
                  </a>
                  {listing.email.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="inline-flex min-h-10 min-w-0 items-center gap-2 rounded-lg border border-brand-green-dark/10 bg-white px-3 text-xs font-semibold text-brand-green-dark transition-colors hover:border-brand-green/30 hover:bg-brand-light-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                    >
                      <Mail aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-brand-green" />
                      <span className="truncate">{email}</span>
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-3 rounded-2xl border border-dashed border-brand-green-dark/20 bg-white px-5 py-10 text-center">
            <p className="text-base font-bold text-brand-green-dark">No listings match that search</p>
            <p className="mt-2 text-sm text-brand-graphite/65">Try another area, company name, or product market.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setActiveFilter('all');
                setSelectedState(null);
              }}
              className="mt-4 rounded-full border border-brand-green-dark/20 px-4 py-2 text-xs font-bold text-brand-green-dark transition-colors hover:bg-brand-light-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            >
              Show all listings
            </button>
          </div>
        )}

        <div className="mt-7 flex flex-col gap-4 rounded-2xl bg-brand-green-dark px-5 py-6 text-white sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div>
            <h3 className="text-lg font-extrabold tracking-tight">Need help finding the right contact?</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-white/70">
              PDC Sales can help connect you with the appropriate distributor or discuss your application directly.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <a
              href="mailto:sales@pdcvalve.com"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-bold text-brand-green-dark transition-colors hover:bg-[#eaf1eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green-dark"
            >
              <Mail aria-hidden="true" className="h-3.5 w-3.5" />
              Email PDC Sales
            </a>
            <a
              href="tel:+17246953440"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/30 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Phone aria-hidden="true" className="h-3.5 w-3.5" />
              724-695-3440
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
