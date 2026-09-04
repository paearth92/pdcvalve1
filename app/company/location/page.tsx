import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight, Building2, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import CompanyNav from '@/components/company/CompanyNav';
import Reveal from '@/components/products/Reveal';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Find PDC | Location & Directions',
  description: 'Find Process Development & Control LLC in Coraopolis, Pennsylvania, with published address, phone, email, and Google Maps directions.',
  alternates: { canonical: 'https://pdcvalve.com/company/location' },
};

const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=1075+Montour+West+Industrial+Park%2C+Coraopolis%2C+PA+15108';
const placeUrl = 'https://www.google.com/maps/search/?api=1&query=1075+Montour+West+Industrial+Park%2C+Coraopolis%2C+PA+15108';

export default function LocationPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-green-dark pb-16 pt-14 text-white sm:pb-20 sm:pt-16">
        <div className="blueprint-grid absolute inset-0 opacity-[0.15]" />
        <div className="absolute right-[-120px] top-[-120px] h-[420px] w-[420px] rounded-full border border-white/[0.055]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3"><span className="h-px w-8 bg-brand-green" /><span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-green">Find PDC</span></div>
            <h1 className="mt-5 text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl lg:text-[3.65rem]">Location & Directions</h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/[0.62]">PDC’s published U.S. location is in Montour West Industrial Park in Coraopolis, Pennsylvania, serving the greater Pittsburgh area.</p>
          </div>
        </div>
      </section>

      <CompanyNav />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
            <Reveal className="h-full">
              <aside className="flex h-full min-h-[500px] flex-col rounded-[26px] bg-brand-green-dark p-7 text-white sm:p-8">
                <div className="inline-flex w-fit rounded-xl bg-white p-3 shadow-lg">
                  <Image src="/images/pdc-logo.png" alt="PDC Valve & Actuators" width={138} height={54} className="h-auto w-[126px] object-contain" />
                </div>

                <div className="mt-auto pt-14">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-green">Process Development & Control LLC</span>
                  <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.035em]">PDC Headquarters</h2>

                  <div className="mt-7 space-y-5 border-t border-white/10 pt-6">
                    <div className="flex gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0 text-brand-green" /><p className="text-sm leading-6 text-white/[0.68]">1075 Montour West Industrial Park<br />Coraopolis, PA 15108</p></div>
                    <a href="tel:+17246953440" className="flex items-center gap-3 text-sm text-white/[0.68] hover:text-white"><Phone className="h-4 w-4 text-brand-green" />724-695-3440</a>
                    <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-sm text-white/[0.68] hover:text-white"><Mail className="h-4 w-4 text-brand-green" />{siteConfig.email}</a>
                  </div>

                  <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="group mt-8 flex items-center justify-between rounded-xl bg-brand-green px-4 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-green/[0.85]">
                    Get directions <Navigation className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </aside>
            </Reveal>

            <Reveal delay={90} className="h-full">
              <div className="relative min-h-[500px] overflow-hidden rounded-[26px] border border-brand-green-dark/10 bg-[#edf4ef]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(7,61,43,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(7,61,43,0.035)_1px,transparent_1px)] bg-[size:36px_36px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_63%_48%,rgba(22,132,71,0.12),transparent_24%)]" />

                {/* Route network, intentionally native so no iframe can fail in Bolt preview. */}
                <div className="absolute left-[-8%] top-[25%] h-3 w-[78%] rotate-[9deg] rounded-full border border-brand-green-dark/[0.07] bg-white" />
                <div className="absolute left-[38%] top-[-10%] h-3 w-[76%] rotate-[69deg] rounded-full border border-brand-green-dark/[0.07] bg-white" />
                <div className="absolute left-[2%] top-[68%] h-2.5 w-[105%] -rotate-[11deg] rounded-full border border-brand-green-dark/[0.06] bg-white/90" />
                <div className="absolute left-[66%] top-[24%] h-2.5 w-[58%] rotate-[89deg] rounded-full bg-white/90" />
                <div className="absolute left-[19%] top-[52%] h-2 w-[47%] rotate-[34deg] rounded-full bg-white/75" />

                <div className="absolute left-[9%] top-[11%] text-[9px] font-bold uppercase tracking-[0.18em] text-brand-green-dark/30">Pittsburgh Area</div>
                <div className="absolute bottom-[12%] left-[10%] text-[9px] font-bold uppercase tracking-[0.18em] text-brand-green-dark/30">Coraopolis</div>
                <div className="absolute right-[8%] top-[14%] text-[9px] font-bold uppercase tracking-[0.18em] text-brand-green-dark/30">Montour West</div>

                <div className="absolute left-[59%] top-[48%] -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-brand-green/10 [animation-duration:2.8s]" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-[8px] border-white bg-brand-green text-white shadow-[0_16px_32px_rgba(7,61,43,0.18)]"><MapPin className="h-6 w-6" /></div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/[0.85] bg-white/[0.94] p-5 shadow-[0_14px_36px_rgba(7,61,43,0.10)] backdrop-blur-md sm:left-auto sm:w-[390px]">
                  <div className="flex items-start gap-3.5"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green-dark text-white"><Building2 className="h-4 w-4" /></div><div><span className="text-[9px] font-bold uppercase tracking-[0.17em] text-brand-green">PDC Valve & Actuators</span><p className="mt-1 text-sm font-bold leading-5 text-brand-green-dark">1075 Montour West Industrial Park</p><p className="text-xs text-brand-graphite/50">Coraopolis, PA 15108</p></div></div>
                  <a href={placeUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-brand-green hover:text-brand-green-dark">Open location in Google Maps <ArrowUpRight className="h-3.5 w-3.5" /></a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}