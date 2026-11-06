import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { footerNav, siteConfig } from '@/data/site';

export default function Footer() {
  return (
    <footer className="pdc-green-texture bg-brand-green-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:gap-10">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-x-8">
            {/* Brand and address */}
            <div className="col-span-2">
              <Link href="/" className="inline-block">
                <Image
                  src="/images/pdc-logo.png"
                  alt="PDC Valves & Actuators"
                  width={140}
                  height={52}
                  className="h-12 w-auto brightness-0 invert"
                />
              </Link>
              <p className="mt-4 max-w-sm text-sm text-white/70">
                {siteConfig.description}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/80">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-brand-steel" />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="hover:text-white"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-brand-steel" />
                  <a href={`tel:${siteConfig.phone}`} className="hover:text-white">
                    {siteConfig.phone}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-steel" />
                  <span>{siteConfig.address}</span>
                </li>
              </ul>
            </div>

            {/* Product and company links */}
            {footerNav.slice(0, 2).map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <section
              aria-labelledby="footer-quality-title"
              className="col-span-full grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] sm:items-center lg:gap-6"
            >
              <div className="max-w-sm">
                <h3
                  id="footer-quality-title"
                  className="text-sm font-bold text-white"
                >
                  ISO 9001:2015 Certified
                </h3>
                <a
                  href="/documents/certifications/pdc-valve-iso-9001-2015.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex text-xs font-semibold text-white/80 underline decoration-white/40 underline-offset-4 transition-colors hover:text-white"
                >
                  View current ISO 9001:2015 certificate (PDF)
                </a>
              </div>

              <div className="grid w-full grid-cols-[1fr_1fr_0.48fr] items-center gap-3 rounded-xl border border-white/70 bg-white p-3 shadow-sm sm:gap-4 sm:p-4">
                <Image
                  src="/images/company/iso-9001-2015-badge.png"
                  alt="TCB Audit Services ISO 9001 badge"
                  width={300}
                  height={184}
                  className="h-auto max-h-[84px] w-full object-contain"
                />
                <Image
                  src="/images/company/iaf-multilateral-recognition-arrangement.png"
                  alt="IAF Multilateral Recognition Arrangement mark"
                  width={504}
                  height={316}
                  className="h-auto max-h-[84px] w-full object-contain"
                />
                <Image
                  src="/images/company/ias-accredited-management-systems-certification-body.png"
                  alt="IAS Accredited Management Systems Certification Body mark"
                  width={239}
                  height={420}
                  className="mx-auto h-[84px] w-auto max-w-full object-contain"
                />
              </div>
            </section>
          </div>

          {/* Long industry links stay in a separate column beside the certification row. */}
          <div className="grid grid-cols-2 gap-8 lg:gap-x-8">
            {footerNav.slice(2).map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-white/60">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
