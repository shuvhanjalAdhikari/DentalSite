import type { Metadata } from 'next';
import ReactDOM from 'react-dom';
import { Hero, HERO_SIZES, HERO_WIDTHS } from '@/components/Hero';
import { StatRow } from '@/components/StatRow';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { TreatmentMenu } from '@/components/TreatmentMenu';
import { VisitTimeline } from '@/components/VisitTimeline';
import { TeamGrid } from '@/components/TeamGrid';
import { Testimonials } from '@/components/Testimonials';
import { ArticleCard } from '@/components/ArticleCard';
import { CTABand } from '@/components/CTABand';
import { Reveal } from '@/components/Reveal';
import { getAllPosts } from '@/lib/blog';
import { siteConfig } from '@/site.config';
import { dentistSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = {
  title: `${siteConfig.name || '[Practice name]'} — Calm, careful dentistry`,
  description:
    'A single-chair dental practice with published prices, named clinicians, and a written estimate before any work begins.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  const webpSrcSet = HERO_WIDTHS.map((w) => `/images/hero/hero-${w}.webp ${w}w`).join(', ');
  ReactDOM.preload('/images/hero/hero-960.webp', {
    as: 'image',
    type: 'image/webp',
    imageSrcSet: webpSrcSet,
    imageSizes: HERO_SIZES,
    fetchPriority: 'high',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(dentistSchema())}
      />

      <Hero />

      <StatRow />

      <Section surface="mist" id="treatments">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <Eyebrow>Treatments</Eyebrow>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">The treatment menu.</h2>
          </div>
          <p className="text-muted max-w-prose">
            Every price below is a starting figure. You get a written estimate for what you actually need before we book the work in.
          </p>
        </div>
        <Reveal>
          <TreatmentMenu />
        </Reveal>
      </Section>

      <Section surface="enamel" id="visit">
        <div className="max-w-2xl">
          <Eyebrow>The first visit</Eyebrow>
          <h2 id="timeline-heading" className="mt-3 font-display text-3xl md:text-4xl">
            What a first visit looks like.
          </h2>
          <p className="mt-6 text-muted max-w-prose">
            About fifty minutes, start to finish. This is what happens and roughly when.
          </p>
        </div>
        <div className="mt-12">
          <Reveal>
            <VisitTimeline />
          </Reveal>
        </div>
      </Section>

      <Section surface="mist" id="team">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <Eyebrow>The team</Eyebrow>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">You will meet a named person.</h2>
          </div>
          <p className="text-muted max-w-prose">
            Every clinician who might treat you is listed here — with what they trained in and how long they have been at the practice.
          </p>
        </div>
        <Reveal>
          <TeamGrid />
        </Reveal>
      </Section>

      <Section surface="enamel" id="voices">
        <div className="max-w-2xl mb-12">
          <Eyebrow>Patients</Eyebrow>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">In their words.</h2>
        </div>
        <Reveal>
          <Testimonials limit={2} />
        </Reveal>
      </Section>

      {posts.length > 0 && (
        <Section surface="mist" id="articles">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <Eyebrow>Articles</Eyebrow>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">Reading, not marketing.</h2>
            </div>
            <p className="text-muted max-w-prose">
              Answers to the things patients ask most, written by the clinicians here.
            </p>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((p) => (
              <li key={p.slug}>
                <Reveal>
                  <ArticleCard post={p} />
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CTABand />
    </>
  );
}
