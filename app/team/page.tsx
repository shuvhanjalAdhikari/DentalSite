import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { TeamGrid } from '@/components/TeamGrid';
import { CTABand } from '@/components/CTABand';
import { breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'The team',
  description:
    'Every clinician who might treat you, with what they trained in and how long they have been at the practice.',
  alternates: { canonical: '/team/' },
};

export default function TeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Team', url: '/team/' },
          ]),
        )}
      />
      <Section surface="mist" padded={false} className="pt-12 pb-16 md:pt-16 md:pb-24">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Team' }]} />
        <div className="mt-6">
          <Eyebrow>The team</Eyebrow>
          <h1 className="mt-3 font-display text-4xl">You will meet a named person.</h1>
          <p className="mt-6 text-lg text-muted max-w-prose">
            No rotating faces, no locums we cannot name. This is who works here.
          </p>
        </div>
      </Section>

      <Section surface="mist" padded={false} className="pb-24 md:pb-32">
        <TeamGrid />
      </Section>

      <CTABand />
    </>
  );
}
