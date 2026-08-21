import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { HoursCard } from '@/components/HoursCard';
import { ContactForm } from '@/components/ContactForm';
import { Placeholder } from '@/components/Placeholder';
import { siteConfig } from '@/site.config';
import { breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Visit the practice',
  description:
    'Address, hours, and how to get in touch. The practice is open six days a week.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Contact', url: '/contact/' },
          ]),
        )}
      />
      <Section surface="mist" padded={false} className="pt-12 pb-16 md:pt-16 md:pb-24">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Contact' }]} />
        <div className="mt-6">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-3 font-display text-4xl">Come and see us.</h1>
          <p className="mt-6 text-lg text-muted max-w-prose">
            The practice is a short walk from the main road. Two-wheeler parking on site; four-wheelers use the public lot next door.
          </p>
        </div>
      </Section>

      <Section surface="mist" padded={false} className="pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-8">
            <div>
              <p className="eyebrow mb-3">Address</p>
              <address className="not-italic text-ink leading-snug">
                {siteConfig.address.street && <div>{siteConfig.address.street}</div>}
                {(siteConfig.address.city || siteConfig.address.postal) && (
                  <div>
                    {siteConfig.address.city}
                    {siteConfig.address.postal ? ` ${siteConfig.address.postal}` : ''}
                  </div>
                )}
                {siteConfig.address.country && <div>{siteConfig.address.country}</div>}
              </address>
            </div>

            <div>
              <p className="eyebrow mb-3">Phone</p>
              <ul className="text-ink space-y-1">
                {siteConfig.phone && (
                  <li>
                    <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="text-link">
                      {siteConfig.phone}
                    </a>
                  </li>
                )}
                {siteConfig.emergencyPhone && (
                  <li className="text-sm text-muted">
                    Emergency line{' '}
                    <a
                      href={`tel:${siteConfig.emergencyPhone.replace(/\s/g, '')}`}
                      className="text-link"
                    >
                      {siteConfig.emergencyPhone}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {siteConfig.email && (
              <div>
                <p className="eyebrow mb-3">Email</p>
                <a href={`mailto:${siteConfig.email}`} className="text-link">
                  {siteConfig.email}
                </a>
              </div>
            )}

            <HoursCard variant="block" />
          </div>

          <div className="lg:col-span-8">
            <div className="rounded-md overflow-hidden border border-line bg-white">
              {siteConfig.mapEmbedUrl ? (
                <iframe
                  src={siteConfig.mapEmbedUrl}
                  title="Map showing the practice location"
                  loading="lazy"
                  className="w-full h-[420px] border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <Placeholder
                  label="Client-supplied Google Maps embed"
                  aspect="16 / 9"
                  className="rounded-none"
                />
              )}
            </div>
            <div className="mt-6">
              <Placeholder
                label="Client photo — exterior with signage"
                aspect="16 / 9"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section surface="enamel">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Eyebrow>Get in touch</Eyebrow>
            <h2 className="mt-3 font-display text-3xl">Send us a message.</h2>
            <p className="mt-6 text-muted max-w-prose">
              For anything that is not urgent. We reply within one working day. If it is urgent, please call the practice.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
