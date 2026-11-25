import { Mail, Phone, MapPin, ArrowRight, Wrench } from 'lucide-react';
import Breadcrumbs from '@/components/products/ProductBreadcrumbs';
import Reveal from '@/components/products/Reveal';
import ContactForm from '@/components/contact/ContactForm';
import RFQButton from '@/components/rfq/RFQButton';
import { contactData } from '@/data/contact';

export function generateMetadata() {
  const title = 'Contact PDC Valve | PDC Valve & Actuators';
  const description =
    'Connect with PDC for product information, engineering assistance, application support, documentation, or quotation requests.';

  return {
    title,
    description,
    alternates: { canonical: '/contact' },
    openGraph: {
      title,
      description,
      url: '/contact',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function ContactPage() {
  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact PDC Valve',
    description:
      'Connect with PDC for product information, engineering assistance, application support, documentation, or quotation requests.',
    url: 'https://www.pdcvalve.com/contact',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Contact', href: '/contact' },
        ]}
      />

      {/* Hero */}
      <section className="pdc-green-texture relative overflow-hidden bg-brand-green-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(22,132,71,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(57,117,138,0.12),transparent_50%)]" />
        <div className="blueprint-grid absolute inset-0 opacity-50" />
        <div className="noise-overlay absolute inset-0 opacity-[0.035] mix-blend-overlay" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              Contact
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl">
              Contact PDC Valve
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/65">
              Connect with PDC for product information, application support,
              technical documentation, or quotation requests. Most inquiries
              begin with PDC Sales, with Engineering joining when additional
              technical review is needed.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-graphite/70">
            Get in Touch
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-brand-green sm:text-3xl">
            Contact Information
          </h2>
          <div className="mt-4 h-px w-16 bg-brand-green/40" />

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Phone */}
            <div className="flex flex-col rounded-xl border border-brand-green-dark/10 bg-white p-6 transition-all hover:border-brand-green/30 hover:shadow-lg hover:shadow-brand-green-dark/5">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-brand-green-dark/15 bg-brand-light-bg text-brand-green-dark">
                <Phone className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold tracking-tight text-brand-green-dark">
                Phone
              </h3>
              <p className="mt-2 text-sm text-brand-graphite/60">
                Speak with our team during business hours.
              </p>
              <a
                href={`tel:${contactData.phone}`}
                className="mt-4 text-sm font-semibold text-brand-green-dark transition-colors hover:text-brand-green"
              >
                {contactData.phone}
              </a>
            </div>

            {/* Email */}
            <div className="flex flex-col rounded-xl border border-brand-green-dark/10 bg-white p-6 transition-all hover:border-brand-green/30 hover:shadow-lg hover:shadow-brand-green-dark/5">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-brand-green-dark/15 bg-brand-light-bg text-brand-green-dark">
                <Mail className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold tracking-tight text-brand-green-dark">
                Email
              </h3>
              <p className="mt-2 text-sm text-brand-graphite/60">
                Send us your questions and we&apos;ll respond promptly.
              </p>
              <a
                href={`mailto:${contactData.generalEmail}`}
                className="mt-4 text-sm font-semibold text-brand-green-dark transition-colors hover:text-brand-green"
              >
                {contactData.generalEmail}
              </a>
            </div>

            {/* Request a Quote */}
            <div className="flex flex-col rounded-xl border border-brand-green-dark/10 bg-white p-6 transition-all hover:border-brand-green/30 hover:shadow-lg hover:shadow-brand-green-dark/5">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-brand-green-dark/15 bg-brand-light-bg text-brand-green-dark">
                <ArrowRight className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold tracking-tight text-brand-green-dark">
                Request a Quote
              </h3>
              <p className="mt-2 text-sm text-brand-graphite/60">
                Submit a detailed request for quotation with project
                specifications.
              </p>
              <div className="mt-4">
                <RFQButton size="sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* General Inquiry Form */}
      <section className="bg-brand-light-bg py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left: intro */}
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-graphite/70">
                General Inquiry
              </span>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-brand-green sm:text-3xl">
                Send Us a Message
              </h2>
              <div className="mt-4 h-px w-16 bg-brand-green/40" />
              <p className="mt-4 text-[15px] leading-relaxed text-brand-graphite/70">
                Most product, availability, quotation, and general application
                questions can be handled by PDC Sales. Engineering supports
                the review when an inquiry needs additional technical detail.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-green" />
                  <div>
                    <p className="text-sm font-bold text-brand-green-dark">
                      Email
                    </p>
                    <a
                      href={`mailto:${contactData.generalEmail}`}
                      className="text-sm text-brand-steel transition-colors hover:text-brand-green"
                    >
                      {contactData.generalEmail}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-green" />
                  <div>
                    <p className="text-sm font-bold text-brand-green-dark">
                      Phone
                    </p>
                    <a
                      href={`tel:${contactData.phone}`}
                      className="text-sm text-brand-steel transition-colors hover:text-brand-green"
                    >
                      {contactData.phone}
                    </a>
                  </div>
                </div>
                {contactData.streetAddress && (
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-green" />
                    <div>
                      <p className="text-sm font-bold text-brand-green-dark">
                        Address
                      </p>
                      <p className="text-sm text-brand-steel">
                        {contactData.streetAddress}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: form */}
            <div className="rounded-xl border border-brand-green-dark/10 bg-white p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Assistance */}
      <Reveal>
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-graphite/70">
                <Wrench className="h-4 w-4" />
                Application Assistance
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-green sm:text-4xl">
                Need Application Support?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-brand-graphite/70">
                PDC Sales can help with product selection, valve and actuator
                sizing, materials and seats, custom configurations, drawings,
                technical documentation, and actuation accessories. Engineering
                can provide additional application review when needed.
              </p>
              <div className="mx-auto mt-6 h-px w-16 bg-brand-green/40" />
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-3">
                <RFQButton size="md" />
                <a
                  href={`mailto:${contactData.generalEmail}`}
                  className="inline-flex items-center gap-2 rounded-md border border-brand-green-dark/15 bg-white px-5 py-3 text-sm font-semibold text-brand-steel transition-colors hover:border-brand-green/30 hover:text-brand-green-dark"
                >
                  <Mail className="h-4 w-4 text-brand-green" />
                  Contact PDC Sales
                </a>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

    </>
  );
}
