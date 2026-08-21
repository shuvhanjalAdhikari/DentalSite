import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTABand } from '@/components/CTABand';
import { FAQ } from '@/components/FAQ';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import { faqs } from '@/content/faqs';
import { siteConfig } from '@/site.config';
import { breadcrumbSchema, jsonLdScript } from '@/lib/schema';

const ABOUT_SIZES = '(min-width: 1024px) 45vw, 100vw';

export const metadata: Metadata = {
  title: 'About the practice',
  description:
    'A single-location dental practice with published prices, named clinicians, and generous appointment times.',
  alternates: { canonical: '/about/' },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'About', url: '/about/' },
          ]),
        )}
      />

      <Section surface="mist" padded={false} className="pt-12 pb-16 md:pt-16 md:pb-24">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'About' }]} />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <Eyebrow>About</Eyebrow>
            <h1 className="mt-3 font-display text-4xl">
              A quiet place to have your teeth looked after.
            </h1>
            <p className="mt-6 text-muted text-lg max-w-prose">
              {siteConfig.name || 'The practice'} has been at the same address for almost twenty years. One reception, three treatment rooms, and a team that knows most of the patients by name.
            </p>
          </div>
        </div>
      </Section>

      <Section surface="enamel">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <ResponsiveImage
              dir="blog"
              base="thespace"
              widths={[640]}
              sizes={ABOUT_SIZES}
              alt="The reception and waiting area at the practice, lit by natural daylight."
              aspect="4 / 3"
              intrinsicWidth={640}
              intrinsicHeight={480}
            />
          </div>
          <div>
            <Eyebrow>The space</Eyebrow>
            <h2 className="mt-3 font-display text-3xl">
              A room that does not feel like a clinic.
            </h2>
            <div className="mt-6 space-y-4 text-ink max-w-prose leading-base">
              <p>
                The waiting area is quiet. No television, no piped music, no leaflets about implants on every surface. If you need to make a call or read, you can.
              </p>
              <p>
                The treatment rooms have natural light and a chair that reclines slowly. We keep instruments out of view until we need them.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section surface="mist">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <Eyebrow>How we work</Eyebrow>
            <h2 className="mt-3 font-display text-3xl">Plain language, written estimates.</h2>
            <div className="mt-6 space-y-4 text-ink max-w-prose leading-base">
              <p>
                We tell you what we see and what the options are. If a tooth can be watched rather than treated, we say so. If you want a second opinion, we help you get one.
              </p>
              <p>
                Every treatment plan is written down with the cost before we book it in. There are no hidden fees and no packages you did not agree to.
              </p>
            </div>
          </div>
          <div>
            <ResponsiveImage
              dir="blog"
              base="procedure"
              widths={[640]}
              sizes={ABOUT_SIZES}
              alt="A clinician working at the treatment chair during a routine appointment."
              aspect="4 / 3"
              intrinsicWidth={640}
              intrinsicHeight={480}
            />
          </div>
        </div>
      </Section>

      <Section surface="enamel">
        <div className="max-w-2xl mb-8">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-3 font-display text-3xl">Things people ask.</h2>
        </div>
        <FAQ items={faqs} />
      </Section>

      <CTABand />
    </>
  );
}
