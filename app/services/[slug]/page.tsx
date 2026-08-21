import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { VisitTimeline } from '@/components/VisitTimeline';
import { CTABand } from '@/components/CTABand';
import { FAQ } from '@/components/FAQ';
import { Prose } from '@/components/Prose';
import { services, getService } from '@/content/services';
import { formatPrice } from '@/lib/format';
import { breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const svc = getService(params.slug);
  if (!svc) return {};
  return {
    title: svc.name,
    description: svc.summary,
    alternates: { canonical: `/services/${svc.slug}/` },
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const svc = getService(params.slug);
  if (!svc) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Treatments', url: '/services/' },
            { name: svc.name, url: `/services/${svc.slug}/` },
          ]),
        )}
      />

      <Section surface="mist" padded={false} className="pt-12 pb-16 md:pt-16 md:pb-24">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Treatments', href: '/services/' },
            { name: svc.name },
          ]}
        />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <Eyebrow>Treatment</Eyebrow>
            <h1 className="mt-3 font-display text-4xl">{svc.name}</h1>
            <p className="mt-6 text-lg text-muted max-w-prose">{svc.summary}</p>
          </div>
          <dl className="lg:col-span-4 grid grid-cols-2 gap-6 text-sm">
            <div>
              <dt className="text-muted">Starting price</dt>
              <dd className="mt-1 font-display text-xl text-ink">
                {formatPrice(svc.priceFrom)}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Time in the chair</dt>
              <dd className="mt-1 font-display text-xl text-ink">{svc.duration}</dd>
            </div>
          </dl>
        </div>
      </Section>

      <Section surface="mist" padded={false} className="pb-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <Prose>
              {svc.body.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </Prose>
          </div>
          <aside className="lg:col-span-4">
            <div className="bg-white border border-line rounded-md p-6">
              <p className="eyebrow mb-3">Next step</p>
              <p className="text-ink">Book a visit and we&rsquo;ll take a look together.</p>
              <Link
                href="/book/"
                className="mt-6 inline-flex items-center justify-center min-h-[44px] w-full px-6 py-3 rounded-md bg-petrol text-white font-medium hover:bg-petrol-deep transition-colors duration-150"
              >
                Book a visit
              </Link>
              <Link
                href="/services/"
                className="mt-3 inline-flex items-center justify-center min-h-[44px] w-full px-6 py-3 rounded-md border border-petrol text-petrol hover:bg-petrol-tint transition-colors duration-150"
              >
                Back to treatments
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      <Section surface="enamel">
        <div className="max-w-2xl">
          <Eyebrow>The first visit</Eyebrow>
          <h2 id="timeline-heading" className="mt-3 font-display text-3xl">
            What to expect when you come in.
          </h2>
        </div>
        <div className="mt-12">
          <VisitTimeline />
        </div>
      </Section>

      {svc.faqs && svc.faqs.length > 0 && (
        <Section surface="mist">
          <div className="max-w-2xl mb-8">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-3 font-display text-3xl">About {svc.name.toLowerCase()}.</h2>
          </div>
          <FAQ items={svc.faqs} />
        </Section>
      )}

      <CTABand />
    </>
  );
}
