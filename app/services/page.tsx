import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { TreatmentMenu } from '@/components/TreatmentMenu';
import { CTABand } from '@/components/CTABand';
import { breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Treatments and prices',
  description:
    'The full treatment menu with starting prices. Every plan is written down with the cost before we book the work in.',
  alternates: { canonical: '/services/' },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Treatments', url: '/services/' },
          ]),
        )}
      />

      <Section surface="mist" padded={false} className="pt-12 pb-16 md:pt-16 md:pb-24">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Treatments' }]} />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <Eyebrow>Treatments</Eyebrow>
            <h1 className="mt-3 font-display text-4xl">
              What we treat, and what it costs.
            </h1>
            <p className="mt-6 text-muted text-lg max-w-prose">
              Prices below are starting figures. We give you a written estimate for your specific case before anything is booked. If a treatment is not right for you, we say so and offer the alternative.
            </p>
          </div>
        </div>
      </Section>

      <Section surface="mist" padded={false} className="pb-24 md:pb-32">
        <TreatmentMenu />
      </Section>

      <CTABand />
    </>
  );
}
