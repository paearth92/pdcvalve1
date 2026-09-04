import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { footerNav, siteConfig } from '@/data/site';

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-6 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
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

          {/* Link columns */}
          {footerNav.map((col) => (
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
