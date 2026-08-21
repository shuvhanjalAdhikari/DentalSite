import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTABand } from '@/components/CTABand';
import { Prose } from '@/components/Prose';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import { team, getClinician } from '@/content/team';
import { breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export async function generateStaticParams() {
  return team.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const c = getClinician(params.slug);
  if (!c) return {};
  return {
    title: `${c.name} — ${c.role}`,
    description: `${c.name}, ${c.credentials}. ${c.detail}`,
    alternates: { canonical: `/team/${c.slug}/` },
  };
}

export default function ClinicianPage({ params }: { params: { slug: string } }) {
  const c = getClinician(params.slug);
  if (!c) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Team', url: '/team/' },
            { name: c.name, url: `/team/${c.slug}/` },
          ]),
        )}
      />
      <Section surface="mist" padded={false} className="pt-12 pb-24 md:pt-16 md:pb-32">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Team', href: '/team/' },
            { name: c.name },
          ]}
        />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <ResponsiveImage
              dir="team"
              base={c.image}
              widths={c.imageWidths}
              sizes="(min-width: 1024px) 40vw, 100vw"
              alt={`Portrait of ${c.name}, ${c.role.toLowerCase()}.`}
              aspect="4 / 5"
              intrinsicWidth={640}
              intrinsicHeight={800}
              priority
            />
          </div>
          <div className="lg:col-span-7">
            <Eyebrow>{c.role}</Eyebrow>
            <h1 className="mt-3 font-display text-4xl">{c.name}</h1>
            <p className="mt-3 text-muted">{c.credentials}</p>

            <div className="mt-8">
              <Prose>
                {c.bio.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </Prose>
            </div>

            <dl className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div>
                <dt className="eyebrow mb-2">Languages</dt>
                <dd className="text-ink">{c.languages.join(', ')}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-2">Treats most</dt>
                <dd className="text-ink">{c.specialties.join(', ')}</dd>
              </div>
            </dl>

            <div className="mt-12">
              <Link
                href="/book/"
                className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-md bg-petrol text-white font-medium hover:bg-petrol-deep transition-colors duration-150"
              >
                Book a visit
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
